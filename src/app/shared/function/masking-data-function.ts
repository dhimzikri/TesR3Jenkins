import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from "@angular/router";
import enviConfig from "assets/config/enviConfig.json";

export function saveListMaskingItemForm(RoleCode: string, ListTemp: any[], ApiUrl: any, http: HttpClient, toastr: NGXToastrService, router: Router) 
{
  var listMaskedItem:Array<string> = [];
  for (var i = 0; i < ListTemp.length; i++) 
  {
    if (ListTemp[i] && ListTemp[i]['ItemCode']) listMaskedItem.push(ListTemp[i].ItemCode);
  }
  if (!listMaskedItem) return;

  var reqObj = {
    "RoleCode": RoleCode,
    "ListMaskingDataItemCode": listMaskedItem,
  }
  http.post(enviConfig.FoundationR3Url + ApiUrl, reqObj, AdInsConstant.SpinnerOptions).subscribe(
    response => {
      toastr.successMessage(response['message']);
      AdInsHelper.RedirectUrl(router,[NavigationConstant.CS_MASKING_WHITELIST_DETAIL],{ "RoleCode": RoleCode });
    }
  );
}