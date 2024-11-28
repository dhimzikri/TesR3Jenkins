import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";

export function addRefOfficeAreaMember(RefOfficeAreaId: any, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
  var listSelectedId = [];
  var officeAreaMemberId = new Number;

  for (const temp of listTemp) {
    officeAreaMemberId = new Number();
    officeAreaMemberId = temp.RefOfficeId;
    listSelectedId.push(officeAreaMemberId);
  }

  var RequestItem = {
    RefOfficeAreaId : RefOfficeAreaId,
    RefOfficeId: listSelectedId
  }

  let url = enviConfig.FoundationR3Url + api;
  http.post(url, RequestItem, AdInsConstant.SpinnerOptions).subscribe(
    response => {
      toastr.successMessage(response['message']);
      AdInsHelper.RedirectUrl(router,[NavigationConstant.OFFICE_MEMBER_PAGING_TEST],{ "RefOfficeAreaId": RefOfficeAreaId });
    }
  );
}
