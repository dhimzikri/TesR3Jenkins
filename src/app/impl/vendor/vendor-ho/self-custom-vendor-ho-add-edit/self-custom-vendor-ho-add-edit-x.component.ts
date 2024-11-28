import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { FormDropDownListService } from '@adins/ucform';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-self-custom-vendor-ho-add-edit-x',
  templateUrl: './self-custom-vendor-ho-add-edit-x.component.html'
})
export class SelfCustomVendorHoAddEditXComponent implements OnInit {
  pageName: string;
  MrVendorCategoryCode: string;
  MrIdTypeCode: string;
  itemIdType: Array<KeyValueObj>;
  MrVendorTypeCode: string;
  RefMasterTypeCode: string;
  VendorId: number = 0;

  VatForPersonal: boolean = false;

  Form: FormGroup = this.fb.group({});

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

    this.pageName = 'VendorHoRegistrationV2'
    if (this.MrVendorCategoryCode != CommonConstant.SUPPLIER_HO && this.MrVendorCategoryCode != CommonConstant.ASSET_INSCO_HO)
    {
      this.pageName = 'VendorHoRegistrationV2'
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO)
    {
      this.pageName = 'SupplierhoregistrationV2XCNAF'
    }
  }

  async ngOnInit() {
    if (this.VendorId > 0)
    {
      let ReqGetVendorAndVendorAddr : GenericObj = new GenericObj();
      ReqGetVendorAndVendorAddr.Id = this.VendorId;
      await this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, ReqGetVendorAndVendorAddr).toPromise().then(
        (response: any) => {
        this.MrIdTypeCode = response.VendorObj.MrIdTypeCode;
        this.MrVendorTypeCode = response.VendorObj.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL? "PERSONAL" : "COMPANY"
      });
    }
    else
    {
      await this.callback("MrVendorTypeCode")
    }

    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GSCodeVATForPersonal }).toPromise().then(
      (result: GeneralSettingObj) => {
        if (result.GeneralSettingId == 0 || result.GsValue == '1') {
          this.VatForPersonal = true;
        }
      });
      this.GetDdlIdType();
  }

  onFormCreate(fg: FormGroup)
  {
    this.Form = fg;

  }

  async manageCbLookupManual(ev: any)
  {
    await this.http.post(this.UrlConstantNew.GetZipcodeDataByZipCode, {"Zipcode": this.Form.controls.Zipcode.value}).toPromise().then(
      (response: any) => {
        this.Form.patchValue(
          {
            AreaCode2: response["AreaCode2"],
            AreaCode1: response["AreaCode1"],
            City: response["City"],
            Province: response["ProvDistrictName"]
          });
    });
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

    if (ev == "MrVendorTypeCode" || ev == "MrVendorCategoryCode")
    {
      await this.waitFor(_ => this.Form.controls.MrVendorTypeCode != undefined);
      this.MrVendorTypeCode = this.Form.controls.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL? "PERSONAL" : "COMPANY"
  
      this.GetDdlIdType();

    }

    if (ev == "MrIdTypeCode")
    {
      this.setValidatorIdNo();
    }
  }

  setValidatorIdNo()
  {
    this.Form.controls.IdNo.clearValidators();
    
    if(this.Form.controls.MrIdTypeCode.value == CommonConstant.MrIdTypeCodeEKTP)
    {
      this.Form.controls.IdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(16), Validators.maxLength(16)])
      this.Form.controls.IdNo.updateValueAndValidity();
      return
    }
  
    if(this.Form.controls.MrVendorTypeCode.value == 'P')
    {
      this.Form.controls.IdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$")])
    }
  
    this.Form.controls.IdNo.updateValueAndValidity();
  }

  GetDdlIdType(){
    if (this.MrVendorTypeCode == CommonConstant.CustTypePersonal){
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendor
    }else if(this.MrVendorTypeCode == CommonConstant.CustTypeCompany){
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendorCompany            
    }
    this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: this.RefMasterTypeCode }).subscribe(
      (response) => {
        this.itemIdType = new Array<KeyValueObj>();
        this.itemIdType = response[CommonConstant.ReturnObj];

        this.ddlSvc.SetDictDDL('MrIdTypeCode', this.itemIdType)

        let res = this.itemIdType.filter((x) => {return x.Key == this.MrIdTypeCode})
        
        this.Form.patchValue({
          MrIdTypeCode: this.VendorId == 0 || res.length == 0? this.itemIdType[0].Key : this.MrIdTypeCode
        })

        this.setValidatorIdNo();
      }
    ); 

    if (!this.VatForPersonal){
      if(this.MrVendorTypeCode == "PERSONAL")
      {
        this.Form.get("IsVat").disable();
        this.Form.patchValue({
          IsVat : false
        })
      }
      else
      {
        this.Form.get("IsVat").enable();
      }
    }
  }

}
