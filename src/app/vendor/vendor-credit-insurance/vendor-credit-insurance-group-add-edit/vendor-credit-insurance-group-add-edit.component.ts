import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorGroupObj } from 'app/shared/model/vendor-group-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-credit-insurance-group-add-edit',
  templateUrl: './vendor-credit-insurance-group-add-edit.component.html'
})
export class VendorCreditInsuranceGroupAddEditComponent implements OnInit {

  pageType: string = "add";
  VendorGrpId: any;


  VendorGroupFrom = this.fb.group({
    VendorGrpCode: ['', Validators.required],
    VendorGrpName: ['', Validators.required],
    VendorGrpDesc: [''],
    MrVendorCategoryCode: [{ value: '', disabled: true }],
    IsActive: false,
  })
  refMasterObj: RefMasterObj;
  refMasterOfficeType: RefMasterObj;
  allVendorCategory: any;
  vendorGrpObj: VendorGroupObj;
  resultData: any;
  MrVendorCategoryCode: string;

  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.pageType = queryParams['mode'];
      }
      if (queryParams['VendorGrpId'] != null) {
        this.VendorGrpId = queryParams['VendorGrpId'];
      }
      
    });
  }



  ngOnInit() {
    this.MrVendorCategoryCode = 'CRD_INSCO_BRANCH';
    this.refMasterObj = new RefMasterObj();
    this.refMasterObj.RefMasterTypeCode = 'VENDOR_CATEGORY';

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
        (response) => {
          this.allVendorCategory = response[CommonConstant.ReturnObj];
          if (this.allVendorCategory.length > 0) {
            this.VendorGroupFrom.patchValue({
              MrVendorCategoryCode: this.MrVendorCategoryCode
            });
          }
        })
    }
    else if (this.pageType == "edit") {
      this.VendorGroupFrom.controls["VendorGrpCode"].disable();
      this.vendorGrpObj = new VendorGroupObj();
      this.vendorGrpObj.VendorGrpId = this.VendorGrpId;

      this.http.post(this.UrlConstantNew.GetVendorGrpByVendorGrpId, {Id : this.VendorGrpId}).subscribe(
        (response) => {
          this.resultData = response;
          this.MrVendorCategoryCode = this.resultData.MrVendorCategoryCode;
          this.VendorGroupFrom.patchValue({

            VendorGrpCode: this.resultData.VendorGrpCode,
            VendorGrpName: this.resultData.VendorGrpName,
            VendorGrpDesc: this.resultData.VendorGrpDesc,
            MrVendorCategoryCode: this.resultData.MrVendorCategoryCode,
            IsActive: this.resultData.IsActive
          })

          this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
            (response) => {
              this.allVendorCategory = response[CommonConstant.ReturnObj];
              if (this.allVendorCategory.length > 0) {
                this.VendorGroupFrom.patchValue({
                  MrVendorCategoryCode: this.resultData.MrVendorCategoryCode
                });
              }
            })
        })
    }
  }
  SaveForm(): void {
    this.vendorGrpObj = new VendorGroupObj();
    this.vendorGrpObj = this.VendorGroupFrom.value;
    this.vendorGrpObj.MrVendorCategoryCode = this.MrVendorCategoryCode;
    this.vendorGrpObj.RowVersion = "";

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddVendorGrp, this.vendorGrpObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CREDIT_INS_GROUP_PAGING]);
        }
      );
    }
    else {
      this.vendorGrpObj.VendorGrpId = this.resultData.VendorGrpId;
      this.vendorGrpObj.RowVersion = this.resultData.RowVersion;

      this.http.post(this.UrlConstantNew.EditVendorGrp, this.vendorGrpObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CREDIT_INS_GROUP_PAGING]);
        }
      );
    }
  }
}
