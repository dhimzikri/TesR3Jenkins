import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { AuthFormObj } from "app/shared/model/auth-form-obj.model";
import { ListAuthFormObj } from "app/shared/model/list-auth-form-obj.model";
import { NgxRouterService } from "@adins/fe-core";


export function saveListAuthForm_Form(RefFormId: Number, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
    let reqObj = new ListAuthFormObj();
    reqObj.ListAuthFormObj = new Array();
    let AuthObj = new AuthFormObj();

    for (var i = 0; i < listTemp.length; i++) {
        AuthObj = new AuthFormObj;
        AuthObj.RefFormId = RefFormId;
        AuthObj.RefRoleId = listTemp[i].RefRoleId
        reqObj.ListAuthFormObj.push(AuthObj);
    }

    const url = enviConfig.FoundationR3Url + api;
    http.post(url, reqObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_SYSTEM_SETTING_FORM_ROLE],{ "RefFormId": RefFormId });
      }
    );
    
}