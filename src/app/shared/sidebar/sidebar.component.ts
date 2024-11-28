import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Params, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { environment } from 'environments/environment';
import { CommonConstant } from '../constant/CommonConstant';
import { AdInsHelper } from '../AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from '../NavigationConstant';
import { AdInsConstant } from '../AdInstConstant';
import { StorageService } from '../services/StorageService';
import { UrlConstantNew } from '../constant/URLConstantNew';
import { ROUTES } from './sidebar-routes.config';

declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public menu: any[];
    private url: string;
    version: string;
    jsFunc: any = import('../../../assets/js/auto-scroll.js');
    readonly URLHome: string = NavigationConstant.DASHBOARD;
    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

    constructor(private router: Router,
        private strService: StorageService, public translate: TranslateService, private http: HttpClient, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) {
        this.version = localStorage.getItem(CommonConstant.VERSION);

    }

    public getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }

    async ngOnInit() {
        // this.url = "./assets/menu.json";
        // this.getJSON(this.url).subscribe
        //     (data => {
        //         this.menuItems = data;
        //     }
        //     );
        // if (environment.production == false) {
        //     this.menuItems = ROUTES.filter(menuItem => menuItem);
        //     return;
        // }
        const currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        if (currentUserContext) {
            await this.http.post(this.UrlConstantNew.GetAllActiveRefFormByRoleCodeAndModuleCode, {
              RoleCode: currentUserContext.RoleCode, ModuleCode: environment.Module
            }, { withCredentials: true }).toPromise().then(
                (response) => {
                    AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
                    this.menuItems = JSON.parse(AdInsHelper.GetLocalStorage(CommonConstant.MENU));
                    $.getScript('./assets/js/app-sidebar.js');
                    setTimeout(() => {
                        this.jsFunc.then(v => v.clickRoute());
                    }, 10);
                });
        }
        else {
            this.menuItems = JSON.parse(AdInsHelper.GetLocalStorage(CommonConstant.MENU));
        }

        this.menuItems = this.queryParamGenerator(this.menuItems);
    }

    queryParamGenerator(menuItems)
    {
        menuItems.forEach(x => {
            if(x.Submenu.length > 0)
            {
                this.queryParamGenerator(x.Submenu);
            }
            x.GeneratedParam = this.genParam(x.Params);
        })

        return menuItems
    }

    setMenu() {
        this.menuItems = JSON.parse(AdInsHelper.GetLocalStorage(CommonConstant.MENU));
        this.strService.set(AdInsConstant.WatchRoleState, false);
    }

    genParam(params: [{ 'Attr': string, 'Value': string }]) {
        const arrList: Params = {};
        if (params != undefined) {
            for (let i = 0; i < params.length; i++) {
                arrList[params[i].Attr] = params[i].Value;
            }
        }
        return arrList;
    }

    //NGX Wizard - skip url change
    ngxWizardFunction(path: string) {
        if (path.indexOf('forms/ngx') != -1)
            this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: true });
    }

    navigateSkipLocationChange(ev) {
        // sementara Sementara begini dulu, belum ketemu solusi lain
        // problem : ketika di 'click' halaman memasuki halaman /dashboard/dash-empty terlebih dahulu
        AdInsHelper.RedirectUrl(this.router, [ev.Path], this.genParam(ev.Params), false);
        // this.router.navigateByUrl(NavigationConstant.DASHEMPTY, { skipLocationChange: true }).then(() => {
        // });
    }
}
