import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpHObj } from 'app/shared/model/verf-question-grp-h-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { VerfQuestionGrpDObj } from 'app/shared/model/verf-question-grp-d-obj.model';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-group-member-add',
  templateUrl: './verification-question-group-member-add.component.html'
})
export class VerificationQuestionGroupMemberAddComponent implements OnInit {
  viewObj: any;
  listSelectedId: Array<number> = new Array<number>();
  verfQuestionGrpHObj: VerfQuestionGrpHObj;
  verfQuestionGrpDObj: VerfQuestionGrpDObj;
  VerfQuestionGrpHId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.VERIF_QA_GRP_MBR_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfQuestionGrpHId = queryParams["VerfQuestionGrpHId"];
    })
  }

  QuestionGroupForm = this.fb.group({
  })

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVerifQuestGrpMbr.json";
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/verifQuestionGrpMbrTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/verifQuestionGrpMbrTempPaging.json";

    this.GetListVerfQuestionGrpDByVerfQuestionGrpHId();
  }

  GetListVerfQuestionGrpDByVerfQuestionGrpHId() {
    this.http.post(this.UrlConstantNew.GetVerfQuestionGrpDByGrpHId, { Id: this.VerfQuestionGrpHId }).subscribe(
      (response) => {
        var arrMemberList = new Array();

        for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].VerfQuestionAnswerId)
        }

        if (arrMemberList.length != 0) {
          const addCritListVerfQuestionAnswerId = new CriteriaObj();
          addCritListVerfQuestionAnswerId.DataType = "numeric";
          addCritListVerfQuestionAnswerId.propName = "VERF_QUESTION_ANSWER_ID";
          addCritListVerfQuestionAnswerId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVerfQuestionAnswerId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListVerfQuestionAnswerId);
        }
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveQuestionGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    this.verfQuestionGrpDObj = new VerfQuestionGrpDObj();
    this.verfQuestionGrpDObj.VerfQuestionGrpHId = this.VerfQuestionGrpHId;
    this.verfQuestionGrpDObj.VerfQuestionGrpDId = 0;
    this.verfQuestionGrpDObj.ListVerfQuestionAnswerId = this.listSelectedId;

    this.http.post(this.UrlConstantNew.AddListVerfQuestionGrpD, this.verfQuestionGrpDObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_GRP_MBR_PAGING],{ "VerfQuestionGrpHId": this.VerfQuestionGrpHId });
      }
    );
  }
}
