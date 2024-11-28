import { PermissionGuard } from '@adins/fe-core';
import { Injectable } from '@angular/core';
import { AdInsHelper } from '../AdInsHelper';
import { CommonConstant } from '../constant/CommonConstant';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard extends PermissionGuard {

  get redirectUrl(): string {
    return 'Forbidden';
  }

  get accessMenu(): any[] {
    const menuData = AdInsHelper.GetLocalStorage(CommonConstant.MENU);
    return JSON.parse(menuData);
  }

  get allow(): any {
    return {
      Paths: [
        "/Dashboard/*",
      ]
    }
  }
  
}
