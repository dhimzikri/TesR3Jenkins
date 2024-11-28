import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { CommonConstant } from "../constant/CommonConstant";
import { ExceptionConstant } from "../constant/ExceptionConstant";
import { AdInsConstant } from "../AdInstConstant";
import { AdInsHelper } from "../AdInsHelper";
import enviConfig from "assets/config/enviConfig.json";

export function addeditAttributeMaster(dicts: Record<string, any>, api: any, next: string, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = enviConfig.FoundationR3Url + api;

    if (dicts.formRaw.AttrInputType == CommonConstant.AttrInputTypeList) {
        if (dicts.formRaw.AttrValueList.length < 1) {
          toastr.warningMessage(ExceptionConstant.MIN_1_ATTR_VALUE);
          return;
        }
  
        var duplicates = dicts.formRaw.AttrValueList.reduce(function(acc, el, i, arr) {
          if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        }, []);
  
        if(duplicates.length > 0){
          toastr.warningMessage(ExceptionConstant.DUPL_ATTR_VALUE);
          return;
        }
        
        let attrValueList = new Array<string>();
        dicts.formRaw.AttrValueList.forEach(x => {
            attrValueList.push(x.AttrValue)
        });
        dicts.formRaw.AttrValue = attrValueList.join(";");
    }

    http.post(url, dicts.formRaw, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(router,[next],{ });
        },
        (error) => {
          console.log(error);
        });
}
