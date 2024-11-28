import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { CommonConstant } from "../constant/CommonConstant";
import { RefCoaObj } from "../model/common-setting/ref-coa-obj.model";
import { FormArray, FormGroup } from "@angular/forms";

export function submitCoa(formData: any, coaSchmId: any, listPayment: any[], listSelectedCurr: any[], Form: FormGroup, api:any, http: HttpClient, toastr: NGXToastrService, router: Router) {

  const url = enviConfig.FoundationR3Url + api;

  const coaSchmObj: Record<string, any> = {};
  const GetListCoaInfoDataCoaInfoCoaValue = (idxListCoa, idxDtCoa) => {
    let ListCoaInfo: FormArray = Form.get("ListCoa") as FormArray;
    let ListCoaInfoIdxAt = ListCoaInfo.get(idxListCoa.toString()) as FormGroup;
    let ListDataCoaInfo = ListCoaInfoIdxAt.get("DataCOA") as FormArray;
    let ListDataCoaInfoIxAt = ListDataCoaInfo.value[idxDtCoa.toString()].COA;

    return ListDataCoaInfoIxAt;
  };

  let CountCoaNull: number = 0;
  coaSchmObj['SchmCode'] = formData?.SchmCode;
  coaSchmObj['SchmName'] = formData?.SchmName;
  coaSchmObj['IsActive'] = formData?.IsActive;
  coaSchmObj['CoaSchmId'] = Number(coaSchmId);

  const ListRefCoaObj = new Array<RefCoaObj>();
  for (let i = 0; i < listSelectedCurr.length; i++) {
    for (let j = 0; j < listPayment.length; j++) {
      const refCoaObj = new RefCoaObj();
      refCoaObj.RefAcctBookId = 1;
      refCoaObj.MrEntityCode = CommonConstant.RefMasterTypeCodeEntityTypePayAlloc;
      refCoaObj.MrEntityType = CommonConstant.RefMasterTypeCodeEntityTypePayAlloc;
      refCoaObj.CurrCode = listSelectedCurr[i].newCurr;
      refCoaObj.PaymentAllocCode = listPayment[j].Key;
      refCoaObj.Coa = GetListCoaInfoDataCoaInfoCoaValue(j, i);
      if(refCoaObj.Coa === "" || refCoaObj.Coa === null)
      {
        CountCoaNull += 1;
      }
      ListRefCoaObj.push(refCoaObj);
    }
  }
  coaSchmObj.ListRefCoa = ListRefCoaObj;

    if(listSelectedCurr.length === 0 )
    {
      toastr.errorMessage("Can not Submit Coa Scheme, Please select Currency First!");
    }
    else if(CountCoaNull == listPayment.length * listSelectedCurr.length)
    {
      toastr.errorMessage("Can not Submit Coa Scheme, Please input at least one Coa!");
    }
    else
    {
      http.post(url, coaSchmObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_CS_COA_SCHM_PAGING]);

        }
      );
    }
}
