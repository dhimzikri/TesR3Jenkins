import { FormDropDownListService } from '@adins/ucform';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-self-custom-vendor-branch-add-edit-x',
  templateUrl: './self-custom-vendor-branch-add-edit-x.component.html'
})
export class SelfCustomVendorBranchAddEditXComponent implements OnInit {
  pageName: string;
  MrVendorCategoryCode: string;
  Type: string = "Default";
  MrIdTypeCode: string;
  navigationSubscription;
  VatForPersonal: boolean = false;
  isReady = false;
  MrVendorTypeCode: string = "COMPANY";
  RefMasterTypeCode: string;
  Form: FormGroup = this.fb.group({});
  itemIdType: Array<KeyValueObj>;
  VendorId: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ddlSvc: FormDropDownListService, private fb: FormBuilder, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
      }

      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }
    });

    this.pageName = "SupplierregistrationV2XCNAF";

    this.selectPage();
  }

  async ngOnInit() {
    if (this.VendorId > 0) {
      let ReqGetVendorAndVendorAddr: GenericObj = new GenericObj();
      ReqGetVendorAndVendorAddr.Id = this.VendorId;
      await this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, ReqGetVendorAndVendorAddr).toPromise().then(
        (response: any) => {
          this.MrIdTypeCode = response.VendorObj.MrIdTypeCode;
          this.MrVendorTypeCode = response.VendorObj.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL ? "PERSONAL" : "COMPANY"
        });
    }
    else {
      await this.callback("MrVendorTypeCode")
    }

    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GSCodeVATForPersonal }).toPromise().then(
      (result: GeneralSettingObj) => {
        if (result.GeneralSettingId == 0 || result.GsValue == '1') {
          this.VatForPersonal = true;
        }
      });
    this.getDdlIdType();
  }

  selectPage() {
    this.isReady = false;
    if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.pageName = 'SupplierregistrationV2XCNAF'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH
        || this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY || this.MrVendorCategoryCode == CommonConstant.COLL_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY
        || this.MrVendorCategoryCode == CommonConstant.CRD_INSCO_BRANCH
        || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
        this.pageName = "VendorbranchregistrationV2XCNAF"
      }
      else if(this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH){
        this.pageName = "Vendorinscobranchregistrationxcnaf"
      }
      else if(this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY){
        this.pageName = "VendorbranchregistrationV2XCNAFNotary"
      }
      // else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.CUSTODY) {
      else {
        this.pageName = 'BranchaddV2XCNAF'
      }
    }


    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }

  onFormCreate(ev) {
    this.Form = ev;
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  waitFor(conditions) {
    const vote = resolve => {
      if (conditions()) resolve();
      else setTimeout(_ => vote(resolve), 250);
    }

    return new Promise(vote);
  }

  async callback(ev) {

    if (ev == "MrVendorTypeCode" || ev == "MrVendorCategoryCode") {
      await this.waitFor(_ => this.Form.controls.MrVendorTypeCode != undefined);
      this.MrVendorTypeCode = this.Form.controls.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL ? "PERSONAL" : "COMPANY"

      this.getDdlIdType();

    }

    if (ev == "MrIdTypeCode") {
      this.setValidatorIdNo();
    }

    if (ev == "SetEmailRestriction") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
      await this.waitFor(_ => this.Form.controls.MrVendorCategoryCode != undefined);
      }else{
        await this.waitFor(_ => this.Form.controls.MrVendorCategoryCode != undefined);
        this.setValidatorEmail();
      }
    }
  }

  setValidatorEmail() {
    if (this.Form.controls.MrVendorCategoryCode.value === CommonConstant.NOTARY_PERSONAL || this.Form.controls.MrVendorCategoryCode.value === CommonConstant.NOTARY_COMPANY || this.Form.controls.MrVendorCategoryCode.value === CommonConstant.NOTARY) {
      this.Form.controls.Email.setValidators([Validators.required, Validators.pattern(CommonConstant.regexMultipleEmail)]);
    }
    else {
      this.Form.controls.Email.setValidators([Validators.required, Validators.pattern(CommonConstant.regexEmail)]);
    }
    this.Form.controls.IdNo.updateValueAndValidity();
  }

  setValidatorIdNo() {
    this.Form.controls.IdNo.clearValidators();

    if (this.Form.controls.MrIdTypeCode.value == CommonConstant.MrIdTypeCodeEKTP) {
      this.Form.controls.IdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(16), Validators.maxLength(16)])
      this.Form.controls.IdNo.updateValueAndValidity();
      return
    }

    if (this.Form.controls.MrVendorTypeCode.value == 'P') {
      this.Form.controls.IdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$")])
    }

    this.Form.controls.IdNo.updateValueAndValidity();
  }

  getDdlIdType() {
    if (this.MrVendorTypeCode == CommonConstant.CustTypePersonal) {
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendor
    } else if (this.MrVendorTypeCode == CommonConstant.CustTypeCompany) {
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendorCompany
    }
    this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: this.RefMasterTypeCode }).subscribe(
      (response) => {
        this.itemIdType = new Array<KeyValueObj>();
        this.itemIdType = response[CommonConstant.ReturnObj];

        this.ddlSvc.SetDictDDL('MrIdTypeCode', this.itemIdType)

        let res = this.itemIdType.filter((x) => { return x.Key == this.MrIdTypeCode })

        this.Form.patchValue({
          MrIdTypeCode: this.VendorId == 0 || res.length == 0 ? this.itemIdType[0].Key : this.MrIdTypeCode
        })

        this.setValidatorIdNo();
      }
    );

    if (!this.VatForPersonal) {
      if (this.MrVendorTypeCode == "PERSONAL") {
        this.Form.get("IsVat").disable();
        this.Form.patchValue({
          IsVat: false
        })
      }
      else {
        this.Form.get("IsVat").enable();
      }
    }
  }
}
