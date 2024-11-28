import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefReasonObj } from 'app/shared/model/ref-reason-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-reason-add-edit',
  templateUrl: './reason-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class ReasonAddEditComponent implements OnInit {

  pageType: string = "add";
  refReasonId: number;
  resultData: RefReasonObj;
  allRefReasonType: Array<KeyValueObj>;
  refReasonTypeCode: string;
  RefReasonForm = this.fb.group({
    ReasonCode: ['', [Validators.required, Validators.maxLength(50)]],
    ReasonDescr: ['', [Validators.required, Validators.maxLength(100)]],
    RefReasonTypeCode: ['', [Validators.required, Validators.maxLength(50)]],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.CS_REASON_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["refReasonId"] != null) {
        this.refReasonId = queryParams["refReasonId"];
      }
    });
  }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetValueReasonType, null).subscribe(
      (response) => {
        this.allRefReasonType = response[CommonConstant.ReturnObj];
        if (this.allRefReasonType.length > 0) {
          this.RefReasonForm.patchValue({ RefReasonTypeCode: response[CommonConstant.ReturnObj][0]['Key'] });
        }
      });

    if (this.pageType == "edit") {
      this.RefReasonForm.controls["ReasonCode"].disable();
      var refReasonObj = new RefReasonObj();
      refReasonObj.RefReasonId = this.refReasonId;
      this.http.post<RefReasonObj>(this.UrlConstantNew.GetRefReasonById, {Id : this.refReasonId}).subscribe(
        response => {
          this.resultData = response;
          this.RefReasonForm.patchValue({
            ReasonCode: this.resultData.ReasonCode,
            ReasonDescr: this.resultData.ReasonDescr,
            RefReasonTypeCode: this.resultData.RefReasonTypeCode,
            IsActive: this.resultData.IsActive
          });
        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      var refReasonObj = new RefReasonObj();
      refReasonObj.ReasonCode = this.RefReasonForm.controls["ReasonCode"].value;
      refReasonObj.ReasonDescr = this.RefReasonForm.controls["ReasonDescr"].value;
      refReasonObj.RefReasonTypeCode = this.RefReasonForm.controls["RefReasonTypeCode"].value;
      refReasonObj.IsActive = this.RefReasonForm.controls["IsActive"].value;
      refReasonObj.IsSystem = false;

      this.http.post(this.UrlConstantNew.AddRefReason, refReasonObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REASON_PAGING],{});
        }
      );
    } else {
      var refReasonObj = this.resultData;
      refReasonObj.ReasonDescr = this.RefReasonForm.controls["ReasonDescr"].value;
      refReasonObj.RefReasonTypeCode = this.RefReasonForm.controls["RefReasonTypeCode"].value;
      refReasonObj.IsActive = this.RefReasonForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditRefReason, refReasonObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REASON_PAGING],{});
        }
      );
    }
  }
}
