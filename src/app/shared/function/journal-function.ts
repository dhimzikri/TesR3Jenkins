import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { ExceptionConstant } from '../constant/ExceptionConstant';
import { URLConstant } from "../constant/URLConstant";

export function rerunJournal(listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
  var req = [];
    if(listTemp.length == 0) {
      toastr.warningMessage(ExceptionConstant.SELECT_ONE_JOURNAL);
      return
    }
    for (let i = 0; i < listTemp.length; i++) {
      if (!req.some(x => x == listTemp[i].JrNo)) {
        req.push(listTemp[i].JrNo)
      }
    }

    let url = enviConfig.FoundationR3Url + api;
    http.post(URLConstant.RerunJournal, {
      ListTransactionNo: req
    }, AdInsConstant.SpinnerOptions).subscribe(
      res => {
        toastr.warningMessage('Rerun journal success, Process may take several time');
        router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(router,[NavigationConstant.SELF_CUSTOM_FAILED_JOURNAL_RESULT_LIST_PAGING],{});
        });
      },
      err => {
        toastr.errorMessage(ExceptionConstant.RERUN_JOURNAL_FAILED)
      }
    )
}


export function saveJrMHeaderFact(JrMHeaderId: Number, form: any, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, ListJrMEntity: any) {
  for(let i =0;i<form.ListJrMHeaderFact.length;i++){
    let string = form.ListJrMHeaderFact[i].HFactProperty.split('.')[0];
    let dotIdx = form.ListJrMHeaderFact[i].HFactProperty.indexOf(".");
    let lastdotIdx = form.ListJrMHeaderFact[i].HFactProperty.lastIndexOf(".");
    const message = " For Alias " + form.ListJrMHeaderFact[i].HFactAlias;
    let temp = ListJrMEntity.find(x => {
      return x.EntityType == string
    });

    let temp2 = form.ListJrMHeaderFact.filter(x => {
      return x.HFactAlias == form.ListJrMHeaderFact[i].HFactAlias
    });

    if (lastdotIdx >= form.ListJrMHeaderFact[i].HFactProperty.length - 1 || dotIdx <= 0) {
      toastr.warningMessage('Invalid Fact Property format' + message)
      return;
    }

    if (temp == undefined) {
      toastr.warningMessage('Entity Type not found' + message)
      return;
    }

    if (temp2.length > 1) {
      toastr.warningMessage('Alias is duplicated' + message)
      return;
    }
  }


  let request = {
    JrMHeaderId: JrMHeaderId,
    ListJrMHeaderFact: form.ListJrMHeaderFact
  }

    const url = enviConfig.FoundationR3Url + api;
    http.post(url, request, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_JOURNAL_MEDIA_PAGING],{});
      }
    );

}

export function saveJrMGroupDFact(JrMGroupId: Number, form: any, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, ListJrMEntity: any, JrMHeaderId: number) {
  for(let i =0;i<form.ListJrMGroupDFact.length;i++){
    let string = form.ListJrMGroupDFact[i].DFactProperty.split('.')[0];
    let dotIdx = form.ListJrMGroupDFact[i].DFactProperty.indexOf(".");
    let lastdotIdx = form.ListJrMGroupDFact[i].DFactProperty.lastIndexOf(".");
    const message = " For Alias " + form.ListJrMGroupDFact[i].DFactAlias;
    let temp = ListJrMEntity.find(x => {
      return x.EntityType == string
    });

    let temp2 = form.ListJrMGroupDFact.filter(x => {
      return x.DFactAlias == form.ListJrMGroupDFact[i].DFactAlias
    });

    if (lastdotIdx >= form.ListJrMGroupDFact[i].DFactProperty.length - 1 || dotIdx <= 0) {
      toastr.warningMessage('Invalid Fact Property format' + message)
      return;
    }

    if (temp == undefined) {
      toastr.warningMessage('Entity Type not found' + message)
      return;
    }

    if (temp2.length > 1) {
      toastr.warningMessage('Alias is duplicated' + message)
      return;
    }
  }


  let request = {
    JrMGroupId: JrMGroupId,
    ListJrMGroupDFact: form.ListJrMGroupDFact
  }

    const url = enviConfig.FoundationR3Url + api;
    http.post(url, request, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_JOURNAL_MEDIA_GROUP],{ "JrMHeaderId" : JrMHeaderId, "mode" : "edit"});
      }
    );

}
