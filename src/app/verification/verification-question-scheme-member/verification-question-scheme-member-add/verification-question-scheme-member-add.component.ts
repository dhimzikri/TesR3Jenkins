import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfSchemeDObj } from 'app/shared/model/verf-scheme-d-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-scheme-member-add',
  templateUrl: './verification-question-scheme-member-add.component.html'
})
export class VerificationQuestionSchemeMemberAddComponent implements OnInit {
  viewObj: any;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  verfSchemeDObj: VerfSchemeDObj;
  VerfSchemeHId: number;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.VERIF_QA_SCHM_MBR_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfSchemeHId = queryParams["VerfSchemeHId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVerifQuestSchmMbr.json";
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/verifQuestionSchmMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/verifQuestionSchmMbrTempPaging.json";

    this.GetListVerfQuestionGrpHByVerfSchemeDId();
  }

  GetListVerfQuestionGrpHByVerfSchemeDId() {
    this.http.post(this.UrlConstantNew.GetVerfSchemeDsByVerfSchemeHId, {Id : this.VerfSchemeHId}).subscribe(
      (response) => {
        if(response[CommonConstant.ReturnObj] != null){
          var arrMemberList = new Array();
          for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
            arrMemberList.push(response[CommonConstant.ReturnObj][index].VerfQuestionGrpHId)
          }
  
          if (arrMemberList.length != 0) {
            const addCritListVerfQuestionGrpHId = new CriteriaObj();
            addCritListVerfQuestionGrpHId.DataType = "numeric";
            addCritListVerfQuestionGrpHId.propName = "VERF_QUESTION_GRP_H_ID";
            addCritListVerfQuestionGrpHId.restriction = AdInsConstant.RestrictionNotIn;
            addCritListVerfQuestionGrpHId.listValue = arrMemberList;
            this.tempPagingObj.addCritInput.push(addCritListVerfQuestionGrpHId);
          }
        }
        
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveQuestionSchemeMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    this.verfSchemeDObj = new VerfSchemeDObj();
    this.verfSchemeDObj.VerfSchemeHId = this.VerfSchemeHId;
    this.verfSchemeDObj.VerfSchemeDId = "0";
    this.verfSchemeDObj.ListVerfQuestionGrpHId = this.listSelectedId;

    this.http.post(this.UrlConstantNew.AddListVerfSchemeD, this.verfSchemeDObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_SCHM_MBR_PAGING],{ "VerfSchemeHId": this.VerfSchemeHId });
      }
    );
  }
}
