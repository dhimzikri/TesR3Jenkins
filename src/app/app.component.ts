import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AdInsHelper } from './shared/AdInsHelper';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import {NavigationEnd, Router} from '@angular/router';
import { CommonConstant } from './shared/constant/CommonConstant';
import { URLConstant } from './shared/constant/URLConstant';
import { NavigationConstant } from './shared/NavigationConstant';
import { UrlConstantNew } from './shared/constant/URLConstantNew';
import { AdInsConstant } from './shared/AdInstConstant';
import { EnviConfigService } from './shared/services/enviConfig.service';
import Swal from 'sweetalert2';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { NgxRouterService } from '@adins/fe-core';
// import * as signalR from '@aspnet/signalr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private _hubConnection: HubConnection;
    private Identity: string;
    private env;

    // TEST PUSH MASTER 5
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, public configEnv: EnviConfigService,
                private UrlConstantNew: UrlConstantNew, private elementRef: ElementRef, private renderer: Renderer2,
                private ngxRouter: NgxRouterService) {
      this.env = this.configEnv.getConfig();
      AdInsHelper.ngxRouter = this.ngxRouter;
    }

    ngOnInit(): void {
        this.setIdentity(this.cookieService.get(CommonConstant.USER_ACCESS));
        Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
        if (AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) != null) {
            // this.checkisEODforlogout();
            // this.validateIp(); // force logout saat ada yg login di IP berbeda
        }
        const appVersion = require('../../package.json').version;
        localStorage.setItem('Version', appVersion);

        /**
         * Nendi: 20 Des 2024 | Bugfix session override after change role
         * Invalidate current session after change role event
         * Prevent form submission due on invalid session
         */
        const invalidIdentityDialog = (formValue?: any) => {
          const msgr = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary-2',
              cancelButton: 'btn btn-link-2'
            },
            buttonsStyling: true
          });

          msgr.fire({
            title: 'Session Identity Invalid',
            text: 'Your session identity has been changed, please refresh your current page!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Refresh',
            cancelButtonText: 'Cancel',
            reverseButtons: true
          }).then(result => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        };

        const validateIdentity = () => {
          // Validate Identity for the latest change
          const latestIdentity = this.cookieService.get('UserAccess');

          // Nendi: 21 Des 2023 | Ignore when user has logout
          if (!latestIdentity) {
            return this.clearSession();
          }

          // User has already login
          if (latestIdentity && !this.Identity) {
            this.setIdentity(latestIdentity);
            this.router.navigate([NavigationConstant.DASHBOARD]);
            return;
          }

          if (this.Identity !== latestIdentity) {
            const containerElement   = this.elementRef.nativeElement.querySelector('.content-wrapper') as HTMLElement;

            if (containerElement) {
              const buttons = containerElement.querySelectorAll('button'); // formElement.querySelector('button');
              console.log('buttons', buttons);
              buttons.forEach((button: HTMLButtonElement) => {
                if (button.type === 'button') {
                  button.setAttribute('disabled', 'disabled');
                } else {
                  this.renderer.listen(button, 'click', (event: Event) => {
                    // Stop form from default submission and run custom event handler
                    event.preventDefault();
                    invalidIdentityDialog();
                  });
                }
              });
            }

            invalidIdentityDialog();
          }
        };

        // Listen for user change role
        window.addEventListener('user:logout', () => {
          this.Identity = null;
        });

        // Listen for user logout
        window.addEventListener('change:user', event => {
          this.setIdentity(event['detail']['Identity']);
        });

        // Listen for change browser tab
        document.addEventListener('visibilitychange', () => {
          // let routeChangeSub: Subscription;
          if (document.hidden) {
            console.log('Identity', this.Identity);
          } else {
            validateIdentity();
            this.router.events.subscribe(next => {
              if (next instanceof NavigationEnd) {
                setTimeout(() => {
                  validateIdentity();
                }, 2 * 1000);
              }
            });
          }
        });
    }

    checkisEODforlogout() {
        this.http.post(this.UrlConstantNew.GetSysCtrlCoyBySysKey, {Code: CommonConstant.IsEodRun}).subscribe(
            (response) => {
              if (response['SysValue'] == '1') {
                localStorage.setItem('IsEod', response['SysValue'] );
                this.logout();
              }
            }
          );
    }

    validateIp() {
        const context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.http.post(this.UrlConstantNew.GetRefUserByUsername, {Username: context[CommonConstant.USER_NAME]}).subscribe(
            (response) => {
              if (response['LastIpAddress'] != localStorage.getItem('LocalIp')) {
                const version = localStorage.getItem(CommonConstant.VERSION);
                localStorage.clear();
                localStorage.setItem('Version', version);
                this.cookieService.removeAll();
                window.location.reload();
              }
            }
          );
    }

    logout() {
        const url = this.env.FoundationR3Url + '/v1' + '/Authenticate/Logout';
        this.http.post(url, {}).subscribe();
        AdInsHelper.ClearAllLog(this.cookieService);
        this.cookieService.removeAll();
        sessionStorage.clear();
        this.router.navigate([NavigationConstant.PAGES_LOGIN]);
    }

    setIdentity(identity: string) {
      this.Identity = identity;
      sessionStorage.setItem('Identity', this.Identity);
    }

    clearSession() {
      this.Identity = null;
      sessionStorage.clear();

      const url = location.href;
      if (!url.includes('Login') && !url.includes('RequestPassword') && !url.includes('ChangePassword')) {
        this.router.navigate([NavigationConstant.PAGES_LOGIN]);
      }
    }
}
