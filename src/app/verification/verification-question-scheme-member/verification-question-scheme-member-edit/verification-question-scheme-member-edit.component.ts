import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VerfSchemeDObj } from 'app/shared/model/verf-scheme-d-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-scheme-member-edit',
  templateUrl: './verification-question-scheme-member-edit.component.html'
})
export class VerificationQuestionSchemeMemberEditComponent implements OnInit {
  verfSchemeDObj: VerfSchemeDObj;
  VerfSchemeHId: any;
  VerfSchemeDId: any;
  VerfQuestionGrpHId: any;
  SeqNo: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  isActive: boolean = true;
  verfQuestionGroup: any;

  VerfQuestionGrpCode: any;
  VerfQuestionGrpName: any;

  readonly CancelLink: string = NavigationConstant.VERIF_QA_SCHM_MBR_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfSchemeHId = queryParams["VerfSchemeHId"];
      this.VerfSchemeDId = queryParams["VerfSchemeDId"];
      this.VerfQuestionGrpHId = queryParams["VerfQuestionGrpHId"];
      this.SeqNo = queryParams["SeqNo"];
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
    IsActive: [false],
    RowVersion: ['']
  })

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById, {Id : this.VerfSchemeDId}).subscribe(
      (response) => {
        this.verfQuestionGroup = response[CommonConstant.ReturnObj];
        this.QuestionGroupForm.patchValue({
          VerfQuestionGrpDId: this.verfQuestionGroup.VerfQuestionGrpDId,
          VerfQuestionGrpHId: this.verfQuestionGroup.VerfQuestionGrpHId,
          VerfQuestionAnswerId: this.verfQuestionGroup.VerfQuestionAnswerId,
          SeqNo: this.verfQuestionGroup.SeqNo,
          RowVersion: this.verfQuestionGroup.RowVersion
        });
        this.VerfQuestionGrpCode = this.verfQuestionGroup.VerfQuestionGrpCode;
        this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName;
      }
    );
  }

  SaveForm() {
    this.verfSchemeDObj = new VerfSchemeDObj();
    this.verfSchemeDObj = this.QuestionGroupForm.value;
    this.verfSchemeDObj.VerfSchemeHId = this.VerfSchemeHId;
    this.verfSchemeDObj.VerfSchemeDId = this.VerfSchemeDId;
    this.http.post(this.UrlConstantNew.EditVerfSchemeD, this.verfSchemeDObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_SCHM_MBR_PAGING],{ "VerfSchemeHId": this.VerfSchemeHId });
      });
  }
}