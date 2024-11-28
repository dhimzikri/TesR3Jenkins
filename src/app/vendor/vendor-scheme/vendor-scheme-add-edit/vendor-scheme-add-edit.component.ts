import { Component, OnInit } from '@angular/core';
import { VendorSchemeObj } from 'app/shared/model/vendor-scheme-obj.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-scheme-add-edit',
  templateUrl: './vendor-scheme-add-edit.component.html'
})
export class VendorSchemeAddEditComponent implements OnInit {
  vendorSchemeObj: VendorSchemeObj;
  VendorSchmId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  isActive: boolean = true;
  itemCategoryType: any;
  MrVendorCategoryCode: string;
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorSchmId = queryParams["VendorSchmId"];
      this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
      this.mode = queryParams["mode"];
    })
  }

  VendorSchmForm = this.fb.group({
    VendorSchmCode: ['', Validators.required],
    VendorSchmName: ['', Validators.required],
    VendorSchmDesc: [''],
    MrVendorCategoryCode: [{ value: '', disabled: true }],
    IsActive: [false],
    RowVersion: ['']
  })



  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "VENDOR_CATEGORY" }).subscribe(
      (response) => {
        this.itemCategoryType = response[CommonConstant.ReturnObj];
        if (this.itemCategoryType.length > 0) {
          this.VendorSchmForm.patchValue({
            MrVendorCategoryCode: this.MrVendorCategoryCode
          });
        }
      }
    );

    if (this.mode == "edit") {
      this.vendorSchemeObj = new VendorSchemeObj();
      this.vendorSchemeObj.VendorSchmId = this.VendorSchmId;
      this.VendorSchmForm.controls.MrVendorCategoryCode.disable();
      this.VendorSchmForm.controls.VendorSchmCode.disable();
      this.http.post(this.UrlConstantNew.GetVendorSchmByVendorSchmId, { Id: this.VendorSchmId }).subscribe(
        (response) => {
          this.result = response;
          this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
          this.VendorSchmForm.patchValue({
            VendorSchmCode: this.result.VendorSchmCode,
            VendorSchmName: this.result.VendorSchmName,
            VendorSchmDesc: this.result.VendorSchmDesc,
            MrVendorCategoryCode: this.result.MrVendorCategoryCode,
            IsActive: this.result.IsActive,
            RowVersion: this.result.RowVersion,
          });
        }
      );
    } else {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.checkIsAutoFormNoFromSetting('SS');
      }
    }
  }

  SaveForm() {
    this.vendorSchemeObj = new VendorSchemeObj();

    this.vendorSchemeObj = this.VendorSchmForm.value;
    this.vendorSchemeObj.MrVendorCategoryCode = this.MrVendorCategoryCode;
    if (this.mode == "edit") {
      this.vendorSchemeObj.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
      this.vendorSchemeObj.VendorSchmCode = this.result.VendorSchmCode;
      this.vendorSchemeObj.VendorSchmId = this.VendorSchmId;

      this.http.post(this.UrlConstantNew.EditVendorSchm, this.vendorSchemeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING], { "Type": "Scheme", "MrVendorCategoryCode": this.MrVendorCategoryCode });
        });
    }
    else {
      this.vendorSchemeObj.VendorSchmId = 0;
      this.http.post(this.UrlConstantNew.AddVendorSchm, this.vendorSchemeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING], { "Type": "Scheme", "MrVendorCategoryCode": this.MrVendorCategoryCode });
        });
    }
  }

  //check is automatic/not form no 4
  isAuto: boolean = false;
  checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      rowVersion: "",
      code: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).subscribe(
      (response) => {
        result = response;

        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true;
            this.VendorSchmForm.patchValue({
              VendorSchmCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4
}
