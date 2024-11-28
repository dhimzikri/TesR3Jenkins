import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from '../NavigationConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private previousUrl;
  private currentUrl;

  constructor(private router: Router, private toastr: NGXToastrService, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUrl = state.url;

    AdInsHelper.InsertLog(this.cookieService, this.currentUrl,"PAGE");


    const authenticated = this.authenticated();
    if (!authenticated) {
      this.router.navigate([NavigationConstant.PAGES_LOGIN])
      return false;
    }
    else {
      return true;
    }
  }

  authenticated(): boolean {
    const UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    // Check active session
    if (!UserAccess) {
      return false;
    }
    const Token   = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
    const isValid = Token === UserAccess?.Token;
    if (!isValid) {
      this.toastr.errorMessage('Your session identity has been changed!');
      this.clearSession();
    }
    return isValid;
  }

  // Remove active session, due the active session has been tempered.
  clearSession() {
    const event: CustomEvent = new CustomEvent<any>('user:logout');
    window.dispatchEvent(event);
    AdInsHelper.ClearAllLog(this.cookieService);
    this.cookieService.removeAll();
  }

}
