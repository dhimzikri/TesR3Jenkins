import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VerfQuestionGrpDObj } from 'app/shared/model/verf-question-grp-d-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-group-member-edit',
  templateUrl: './verification-question-group-member-edit.component.html'
})
export class VerificationQuestionGroupMemberEditComponent implements OnInit {
  verfQuestionGrpDObj: VerfQuestionGrpDObj;
  VerfQuestionGrpHId: any;
  VerfQuestionGrpDId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  isActive: boolean = true;
  verfQuestionGroup: any;
  answerTypeValue: any = "DDL";

  VerfQuestionCode: any;
  VerfQuestionGrpName: any;
  VerfAnswerTypeDescr: any;
  VerfQuestionText: any;
  VerfAnswer: any;

  readonly CancelLink: string = NavigationConstant.VERIF_QA_GRP_MBR_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfQuestionGrpDId = queryParams["VerfQuestionGrpDId"];
      this.VerfQuestionGrpHId = queryParams["VerfQuestionGrpHId"];
      this.mode = queryParams["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionGroupForm = this.fb.group({
    VerfQuestionGrpDId: [''],
    VerfQuestionGrpHId: [''],
    VerfQuestionAnswerId: [''],
    SeqNo: ['',Validators.required],
    IsActive: [true],
    RowVersion: ['']
  })

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetVerfQuestionGrpDForUpdateById, {Id : this.VerfQuestionGrpDId}).subscribe(
      (response) => {
        this.verfQuestionGroup = response[CommonConstant.ReturnObj];
        this.QuestionGroupForm.patchValue({
          VerfQuestionGrpDId: this.verfQuestionGroup.VerfQuestionGrpDId,
          VerfQuestionGrpHId: this.verfQuestionGroup.VerfQuestionGrpHId,
          VerfQuestionAnswerId: this.verfQuestionGroup.VerfQuestionAnswerId,
          SeqNo: this.verfQuestionGroup.SeqNo,
          IsActive: this.verfQuestionGroup.IsActive,
          RowVersion: this.verfQuestionGroup.RowVersion
        });
        this.answerTypeValue = this.verfQuestionGroup.VerfAnswerTypeCode;
        this.VerfQuestionCode = this.verfQuestionGroup.VerfQuestionCode;
        this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName;
        this.VerfAnswerTypeDescr = this.verfQuestionGroup.VerfAnswerTypeDescr;
        this.VerfQuestionText = this.verfQuestionGroup.VerfQuestionText;
        this.VerfAnswer = this.verfQuestionGroup.VerfAnswer;
      }
    );
  }

  SaveForm() {
    this.verfQuestionGrpDObj = new VerfQuestionGrpDObj();
    this.verfQuestionGrpDObj = this.QuestionGroupForm.value;
    this.verfQuestionGrpDObj.IsActive = this.verfQuestionGrpDObj.IsActive;
      this.verfQuestionGrpDObj.RowVersion = this.verfQuestionGrpDObj.RowVersion;
      this.http.post(this.UrlConstantNew.EditVerfQuestionGrpD, this.verfQuestionGrpDObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_GRP_MBR_PAGING],{ "VerfQuestionGrpHId": this.VerfQuestionGrpHId });
        });
    
  }

}
