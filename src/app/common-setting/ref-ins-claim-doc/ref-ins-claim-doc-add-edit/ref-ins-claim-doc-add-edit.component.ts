import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefAssetDocObj } from 'app/shared/model/ref-asset-doc-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { RefInsClaimDocObj } from 'app/shared/model/ref-ins-claim-doc-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ref-ins-claim-doc-add-edit',
  templateUrl: './ref-ins-claim-doc-add-edit.component.html'
})
export class RefInsClaimDocAddEditComponent implements OnInit {
  pageType: string = 'add';
  RefInsClaimDocCode: string;
  result: RefInsClaimDocObj = new RefInsClaimDocObj();
  refAssetObj: RefInsClaimDocObj = new RefInsClaimDocObj();

  RefInsClaimDocForm = this.fb.group({
    RefInsClaimDocCode: ['', [Validators.required, Validators.maxLength(50)]],
    RefInsClaimDocName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["code"] != null) {
        this.RefInsClaimDocCode = queryParams["code"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.RefInsClaimDocForm.controls.RefInsClaimDocCode.disable();
      this.http.post(this.UrlConstantNew.GetRefInsClaimDocByRefInsClaimDocCode, {Code: this.RefInsClaimDocCode }).subscribe(
        (response: RefInsClaimDocObj) => {
          this.result = response;
          this.RefInsClaimDocForm.patchValue({
            RefInsClaimDocCode: this.result.RefInsClaimDocCode,
            RefInsClaimDocName: this.result.RefInsClaimDocName,
            IsActive: this.result.IsActive
          })
        });
    }else{
      //this.checkIsAutoFormNoFromSetting('AD')
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refAssetObj = new RefInsClaimDocObj();
      this.refAssetObj.RefInsClaimDocCode = this.RefInsClaimDocForm.controls["RefInsClaimDocCode"].value;
      this.refAssetObj.RefInsClaimDocName = this.RefInsClaimDocForm.controls["RefInsClaimDocName"].value;
      this.refAssetObj.IsActive = this.RefInsClaimDocForm.controls["IsActive"].value;

      //url
      this.http.post(this.UrlConstantNew.AddRefInsClaimDoc, this.refAssetObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REF_INS_CLAIM_DOC_PAGING],{});
        }
      );
    }
    else {
      this.refAssetObj = this.result;
      this.refAssetObj.RefInsClaimDocCode = this.RefInsClaimDocForm.controls["RefInsClaimDocCode"].value;
      this.refAssetObj.RefInsClaimDocName = this.RefInsClaimDocForm.controls["RefInsClaimDocName"].value;
      this.refAssetObj.IsActive = this.RefInsClaimDocForm.controls["IsActive"].value;

      //Url
      this.http.post(this.UrlConstantNew.EditRefInsClaimDoc, this.refAssetObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_REF_INS_CLAIM_DOC_PAGING],{});
        });
    }
  }

  //check is automatic/not form no 4
  // isAuto: boolean = false;
  // checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
  //   var generalSettingObj = {
  //     rowVersion: "",
  //     code: "MASTER_AUTO_GNRT_CODE"
  //   }
  //   var result: any;
  //   this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).subscribe(
  //     (response) => {
  //       result = response;

  //       if (result.GsValue != undefined && result.GsValue != "") {
  //         if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
  //           this.isAuto = true;
  //           //patch value form no
  //           this.RefInsClaimDocForm.patchValue({
  //             RefInsClaimDocCode: '-'
  //           });
  //         }
  //       }
  //     });
  // }
  //check is automatic/not form no 4

}
