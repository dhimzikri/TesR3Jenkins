import { NgxRouterService } from '@adins/fe-core';
import { FormDropDownListService } from '@adins/ucform';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';

@Component({
  selector: 'app-self-custom-vendor-atpm-add-edit',
  templateUrl: './self-custom-vendor-atpm-add-edit.component.html'
})
export class SelfCustomVendorATPMAddEditComponent implements OnInit {
  pageName: string;
  MrIdTypeCode: string;
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
      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }
    });
      
    this.pageName = 'AtpmRegistration'
  }

  async ngOnInit() {
    if (this.VendorId > 0)
    {
      let ReqGetVendorAndVendorAddr : GenericObj = new GenericObj();
      ReqGetVendorAndVendorAddr.Id = this.VendorId;
      await this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, ReqGetVendorAndVendorAddr).toPromise().then(
        (response: any) => {
        this.MrIdTypeCode = response.VendorObj.MrIdTypeCode;
        this.MrVendorTypeCode = response.VendorObj.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL? "PERSONAL" : "COMPANY"
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
    this.getDdlIdType();
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

    if (ev == "MrVendorTypeCode" || ev == "MrVendorCategoryCode")
    {
      await this.waitFor(_ => this.Form.controls.MrVendorTypeCode != undefined);
      this.MrVendorTypeCode = this.Form.controls.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL? "PERSONAL" : "COMPANY"

      this.getDdlIdType();
      
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

  getDdlIdType(){
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
