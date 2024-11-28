import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { VerfSchemeDObj } from 'app/shared/model/verf-scheme-d-obj.model';
import { VerfQuestionGrpDObj } from 'app/shared/model/verf-question-grp-d-obj.model';

export function addListVerfSchemeD(VerfSchemeHId: any, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
    let listSelectedId: Array<number> = new Array<number>();
    for (let i=0; i<listTemp.length; i++) {
        listSelectedId.push(listTemp[i].VerfQuestionGrpHId);
    }

    let verfSchemeDObj = new VerfSchemeDObj();
    verfSchemeDObj.VerfSchemeHId = VerfSchemeHId;
    verfSchemeDObj.VerfSchemeDId = "0";
    verfSchemeDObj.ListVerfQuestionGrpHId = listSelectedId;

    const url = enviConfig.FoundationR3Url + api;
    http.post(url, verfSchemeDObj, AdInsConstant.SpinnerOptions)
    .subscribe(response => {
            toastr.successMessage(response['message']);
            AdInsHelper.RedirectUrl(router,[NavigationConstant.SELF_CUSTOM_VERIF_QA_SCHM_MBR_PAGING],{ "VerfSchemeHId": VerfSchemeHId });
        }
    );
}

export function addListVerfQuestionGrpD(VerfQuestionGrpHId: any, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
    let listSelectedId: Array<number> = new Array<number>();
    for (let i=0; i<listTemp.length; i++) {
        listSelectedId.push(listTemp[i].VerfQuestionAnswerId);
    }

    let verfQuestionGrpDObj = new VerfQuestionGrpDObj();
    verfQuestionGrpDObj.VerfQuestionGrpHId = VerfQuestionGrpHId;
    verfQuestionGrpDObj.VerfQuestionGrpDId = 0;
    verfQuestionGrpDObj.ListVerfQuestionAnswerId = listSelectedId;

    const url = enviConfig.FoundationR3Url + api;
    http.post(url, verfQuestionGrpDObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(router,[NavigationConstant.SELF_CUSTOM_VERIF_QA_GRP_MBR_PAGING],{ "VerfQuestionGrpHId": VerfQuestionGrpHId });
      }
    );
}