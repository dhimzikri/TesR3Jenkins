import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VerfSchemeHObj } from 'app/shared/model/verf-scheme-h-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-verification-question-scheme-add-edit',
  templateUrl: './verification-question-scheme-add-edit.component.html'
})
export class VerificationQuestionSchemeAddEditComponent implements OnInit {
  verfSchemeHObj: VerfSchemeHObj;
  VerfSchemeHId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  isActive: boolean = true;
  verfQuestionScheme: any;

  readonly CancelLink: string = NavigationConstant.VERIF_QA_SCHM_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VerfSchemeHId = queryParams["VerfSchemeHId"];
      this.mode = queryParams["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionSchemeForm = this.fb.group({
    VerfSchemeHId: [''],
    VerfSchemeCode: ['', Validators.required],
    VerfSchemeName: ['', Validators.required],
    IsActive : [true],
    RowVersion: ['']
  })

  ngOnInit() {
    if (this.mode == "edit") {
      this.http.post(this.UrlConstantNew.GetVerfSchemeHForUpdateById, {Id : this.VerfSchemeHId}).subscribe(
        (response) => {
          this.verfQuestionScheme = response;
          this.QuestionSchemeForm.patchValue({
            VerfSchemeHId: this.verfQuestionScheme.VerfSchemeHId,
            VerfSchemeCode: this.verfQuestionScheme.VerfSchemeCode,
            VerfSchemeName: this.verfQuestionScheme.VerfSchemeName,
            IsActive : this.verfQuestionScheme.IsActive,
            RowVersion: this.verfQuestionScheme.RowVersion
          });
        }
      );
    }
  }

  SaveForm() {
    this.verfSchemeHObj = new VerfSchemeHObj();
    this.verfSchemeHObj = this.QuestionSchemeForm.value;
    if (this.mode == "edit") {
      this.verfSchemeHObj.RowVersion = this.verfSchemeHObj.RowVersion;
      this.http.post(this.UrlConstantNew.EditVerfSchemeH, this.verfSchemeHObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_SCHM_PAGING],{ });
        });
    }
    else {
      this.verfSchemeHObj.VerfSchemeHId = "0";
      this.http.post(this.UrlConstantNew.AddVerfSchemeH, this.verfSchemeHObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.VERIF_QA_SCHM_PAGING],{ });
        });
    }
  }

}
