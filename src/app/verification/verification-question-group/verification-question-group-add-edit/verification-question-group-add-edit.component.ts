import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VerfQuestionGrpHObj } from 'app/shared/model/verf-question-grp-h-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-group-add-edit',
  templateUrl: './verification-question-group-add-edit.component.html'
})
export class VerificationQuestionGroupAddEditComponent implements OnInit {
  verfQuestionGrpHObj: VerfQuestionGrpHObj = new VerfQuestionGrpHObj();
  VerfQuestionGrpHId: number;
  mode: string = "add";
  isActive: boolean = true;

  readonly CancelLink: string = NavigationConstant.VERIF_QA_GRP_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfQuestionGrpHId = queryParams["VerfQuestionGrpHId"];
      this.mode = queryParams["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionGroupForm = this.fb.group({
    VerfQuestionGrpCode: ['', Validators.required],
    VerfQuestionGrpName: ['', Validators.required],
    IsActive: [true],
    RowVersion: ['']
  })

  ngOnInit() {
    if (this.mode == "edit") {
      this.http.post<VerfQuestionGrpHObj>(this.UrlConstantNew.GetQuestionGrpHById, {Id : this.VerfQuestionGrpHId}).subscribe(
        (response) => {
          this.verfQuestionGrpHObj = response;
          this.QuestionGroupForm.patchValue({
            VerfQuestionGrpHId: this.verfQuestionGrpHObj.VerfQuestionGrpHId,
            VerfQuestionGrpCode: this.verfQuestionGrpHObj.VerfQuestionGrpCode,
            VerfQuestionGrpName: this.verfQuestionGrpHObj.VerfQuestionGrpName,
            IsActive: this.verfQuestionGrpHObj.IsActive,
            RowVersion: this.verfQuestionGrpHObj.RowVersion
          });
        }
      );
    }
  }

  SaveForm() {
    this.verfQuestionGrpHObj.VerfQuestionGrpCode = this.QuestionGroupForm.value.VerfQuestionGrpCode;
    this.verfQuestionGrpHObj.VerfQuestionGrpName = this.QuestionGroupForm.value.VerfQuestionGrpName;
    this.verfQuestionGrpHObj.IsActive = this.QuestionGroupForm.value.IsActive;
    if (this.mode == "edit") {
      this.http.post(this.UrlConstantNew.EditVerfQuestionGrpH, this.verfQuestionGrpHObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_GRP_PAGING],{});
        });
    }
    else {
      this.verfQuestionGrpHObj.VerfQuestionGrpHId = 0;
      this.http.post(this.UrlConstantNew.AddVerfQuestionGrpH, this.verfQuestionGrpHObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_GRP_PAGING],{});
        });
    }
  }
}
