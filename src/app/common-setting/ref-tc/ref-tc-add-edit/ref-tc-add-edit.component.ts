import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { RefTcObj } from 'app/shared/model/ref-tc.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-ref-tc-add-edit',
  templateUrl: './ref-tc-add-edit.component.html'
})
export class RefTcAddEditComponent implements OnInit {

  pageType: string = 'add';
  refTcId: number;
  refTcObj: RefTcObj = new RefTcObj();
  resultData: RefTcObj = new RefTcObj();
  RefTcForm = this.fb.group({
    TcCode: ['', [Validators.required, Validators.maxLength(50)]],
    TcName: ['', [Validators.required, Validators.maxLength(100)]],
    TcDataType: ['C'],
    IsMandatory: [false],
    IsActive: [true],
    TcType: ['', Validators.required]
  })

  readonly CancelLink: string = NavigationConstant.CS_REF_TC_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["refTcId"] != null) {
        this.refTcId = queryParams["refTcId"];
      }
    });
  }

  ngOnInit() {
    if(this.pageType == "edit") {
      this.RefTcForm.controls["TcCode"].disable();
      let reqByIdObj: GenericObj = new GenericObj;
      reqByIdObj.Id = this.refTcId;
      this.http.post(this.UrlConstantNew.GetRefTcById, reqByIdObj).subscribe(
        (response: RefTcObj) => {
          this.resultData = response;
          this.RefTcForm.patchValue({
            TcCode: this.resultData.TcCode,
            TcName: this.resultData.TcName,
            TcType: this.resultData.TcType,
            IsMandatory: this.resultData.IsMandatory,
            IsActive: this.resultData.IsActive
          });
        }
      )

    }
  }

  SaveForm(){
    if(this.pageType == "add") {
      this.refTcObj = new RefTcObj();
      this.refTcObj.TcCode = this.RefTcForm.controls["TcCode"].value;
      this.refTcObj.TcName = this.RefTcForm.controls["TcName"].value;
      this.refTcObj.TcDataType = this.RefTcForm.controls["TcDataType"].value;
      this.refTcObj.TcType = this.RefTcForm.controls["TcType"].value;
      this.refTcObj.IsMandatory = this.RefTcForm.controls["IsMandatory"].value;
      this.refTcObj.IsActive = this.RefTcForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.AddRefTc, this.refTcObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REF_TC_PAGING],{});
        }
      );
    }
    else {
      this.refTcObj = this.resultData;
      this.refTcObj.RefTcId = this.refTcId;
      this.refTcObj.TcName = this.RefTcForm.controls["TcName"].value;
      this.refTcObj.TcType = this.RefTcForm.controls["TcType"].value;
      this.refTcObj.IsMandatory = this.RefTcForm.controls["IsMandatory"].value;
      this.refTcObj.IsActive = this.RefTcForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditRefTc, this.refTcObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REF_TC_PAGING],{});
        }
      );
    }
  }

}
