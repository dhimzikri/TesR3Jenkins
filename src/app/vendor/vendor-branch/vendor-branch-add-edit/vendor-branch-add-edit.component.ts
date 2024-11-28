import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Validators, FormBuilder } from '@angular/forms';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { formatDate } from '@angular/common';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorBranchObj } from 'app/shared/model/vendor-branch-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { VendorAttrContentObj } from 'app/shared/model/vendor-attr-content-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';

import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-branch-add-edit',
  templateUrl: './vendor-branch-add-edit.component.html'
})
export class VendorBranchAddEditComponent implements OnInit {

  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  itemAssignmentType: any;
  itemCalcMethodType: any;

  result: any;
  check: any;
  inputLookupParentObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupATPMObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);

  MrVendorCategoryCode: string = CommonConstant.VENDOR_CATEGORY_GENERAL;
  MrVendorTypeCode: string;
  arrCrit: any;
  mode: string = "add";
  vendorBranchObj: any;
  VendorId: number;

  MRSupplierUpCalcMethod: any;
  itemTypeUpCalcMethod: any;
  itemSupplierClass: any;
  itemMaxRefundType: any;
  itemAssignmentTypeTele: any;
  businessDt: Date;

  isHidden: boolean = true;
  RsvField: string;
  RefMasterTypeCode: string;
  Registration: string;
  Code: string;
  Name: string;
  VendorAttrList: any;
  ListInputLookUpObj = new Array<any>();
  vendorAttrRequest = new Array<VendorAttrContentObj>();
  isFormReady: boolean = false;
  reqVendorAttrObj: { listVendorAttrContentObj: any[]; };
  ListVendorAttrContent: any;
  gradeCode: String;

  BpbkAgingDefaultVal: number;
  DaysAPDuePaymentAfterGoLiveDefaultVal: number;
  VatForPersonal: boolean = false;

  constructor(private regexService: RegexService, private fb: FormBuilder, private router: Router, 
    private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private cookieService: CookieService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
      }
      this.VendorId = queryParams['VendorId'];
      if (queryParams['mode'] != null) {
        this.mode = queryParams['mode'];
      }
    });
  }

  VendorForm = this.fb.group({
    MrVendorCategoryCode: [{ value: '', disabled: true }],
    VendorCode: ['', Validators.required],
    VendorName: ['', Validators.required],
    MrVendorTypeCode: ['', Validators.required],
    RegistrationNo: ['', Validators.required],
    LicenseNo: ['', Validators.required],
    MrIdTypeCode: [''],
    IdNo: [''],
    MobilePhnNo1: ['', Validators.pattern("^[0-9]+$")],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    VendorRating: [{ value: '', disabled: false }],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
    VendorParentId: [''],
    ReservedField2: [''], //Maximum Task load
    ReservedField3: [''],//Supplier calc up method
    ReservedField4: [''], //Supplier Class
    ReservedField5: [''], //BPKBAging
    ReservedField6: [''], //DaysPAfterGolive
    ReservedField9: [''], //ASSGMNT_TYPE tele, field
    MrTaxCalcMethodCode: ['', Validators.required],
    IsVat: [false, Validators.required],
    TaxIdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]],
    TaxpayerName: ['', Validators.required],
    MrAddrTypeCode: [''],
    Addr: [''],
    AreaCode2: [{ value: '', disabled: true }], //kelurahan
    AreaCode1: [{ value: '', disabled: true }], //kecamatan
    AreaCode3: [''],
    AreaCode4: [''],
    City: [{ value: '', disabled: true }],
    Province: [{ value: '', disabled: true }],
    RowVersionVendor: [''],
    RowVersionVendorAddr: [''],
    IsNpwpExist: [false],
    IsOneAffiliate: [false],
    VendorRatingAlias: ['']
  })

  MrVendorCategoryCode_ASSET_INSCO_BRANCH: string = CommonConstant.ASSET_INSCO_BRANCH;
  MrVendorCategoryCode_LIFE_INSCO_BRANCH: string = CommonConstant.LIFE_INSCO_BRANCH;
  HoTitle: string = "";
  SetTitleHoInfo() {
    switch (this.MrVendorCategoryCode) {
      case CommonConstant.SUPPLIER_HO:
        this.HoTitle = "Supplier ";
        break;
      case CommonConstant.SUPPLIER_HOLDING:
        this.HoTitle = "Supplier Holding ";
        break;
      case CommonConstant.SUPPLIER:
        this.HoTitle = "Supplier ";
        break;
      case CommonConstant.SURVEYOR_HO:
        this.HoTitle = "Surveyor HO ";
        break;
      case CommonConstant.SURVEYOR_BRANCH:
        this.HoTitle = "Surveyor Branch ";
        break;
      case CommonConstant.ASSET_INSCO_HO:
        this.HoTitle = "Insurance HO ";
        this.VendorForm.get("MrTaxCalcMethodCode").clearValidators();
        this.VendorForm.get("MrTaxCalcMethodCode").updateValueAndValidity();
        this.VendorForm.get("IsVat").clearValidators();
        this.VendorForm.get("IsVat").updateValueAndValidity();
        break;
      case CommonConstant.ASSET_INSCO_BRANCH:
        this.HoTitle = "Insurance Branch ";
        this.VendorForm.get("MrTaxCalcMethodCode").clearValidators();
        this.VendorForm.get("MrTaxCalcMethodCode").updateValueAndValidity();
        this.VendorForm.get("IsVat").clearValidators();
        this.VendorForm.get("IsVat").updateValueAndValidity();
        break;
      case CommonConstant.LIFE_INSCO_HO:
        this.HoTitle = "Life Insurance HO ";
        this.VendorForm.get("MrTaxCalcMethodCode").clearValidators();
        this.VendorForm.get("MrTaxCalcMethodCode").updateValueAndValidity();
        this.VendorForm.get("IsVat").clearValidators();
        this.VendorForm.get("IsVat").updateValueAndValidity();
        break;
      case CommonConstant.LIFE_INSCO_BRANCH:
        this.HoTitle = "Life Insurance Branch ";
        this.VendorForm.get("MrTaxCalcMethodCode").clearValidators();
        this.VendorForm.get("MrTaxCalcMethodCode").updateValueAndValidity();
        this.VendorForm.get("IsVat").clearValidators();
        this.VendorForm.get("IsVat").updateValueAndValidity();
        break;
      case CommonConstant.VENDOR_CATEGORY_GENERAL:
        this.HoTitle = "Vendor ";
        this.VendorForm.get("MrVendorCategoryCode").enable();
        this.VendorForm.get("MrVendorCategoryCode").setValidators([Validators.required]);
        this.VendorForm.get("MrVendorCategoryCode").updateValueAndValidity();
        break;
    }
    this.GetGeneralSetting();
  }

  DictDDLVendorAttr: { [id: string]: Array<any> } = {};
  async ngOnInit() {
    console.log("Mashino");
    console.log(this.MrVendorCategoryCode);
    this.SetTitleHoInfo();
    this.customPattern = new Array<CustomPatternObj>();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    if (this.mode == "edit") {
      this.VendorForm.controls.VendorCode.disable();
      await this.getData();
    }
    else {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.checkIsAutoFormNoFromSetting(CommonConstant.MASTER_AUTO_GNRT_CODE_SUPPLIER);
        this.VendorForm.controls.ReservedField5.setValidators([Validators.required]);
        this.VendorForm.controls.ReservedField5.updateValueAndValidity();
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY)
      {
        let master = this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL? CommonConstant.MASTER_AUTO_GNRT_CODE_AGENCY_PERSONAL : CommonConstant.MASTER_AUTO_GNRT_CODE_AGENCY_COMPANY;
        this.checkIsAutoFormNoFromSetting(master);
      }
      this.bindText()
      await this.setDropdown();
      this.setLookup();

      this.settingDefaultValue();
    }

    this.http.post(this.UrlConstantNew.GetListVendorAttrContentByVendorId, { Id: this.VendorId }).toPromise().then(
      (response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj]
        if (this.ListVendorAttrContent != null) {
          if (this.ListVendorAttrContent.length < 1) {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                let tempLookup = {};
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    var formGroupObject = new Object();
                    formGroupObject["VendorAttrContentId"] = [0];
                    formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
                    if (vendorAttr["AttrInputType"] == 'T') {
                      formGroupObject["VendorAttrValue"] = [''];
                    }
                    else if (vendorAttr["AttrInputType"] == 'L') {
                      var temp = vendorAttr["AttrValue"].split(";");
                      this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[0]];
                    }
                    else {
                      formGroupObject["VendorAttrValue"] = [''];
                    }
  
                    if (vendorAttr["AttrCode"] == "AP_DUE_AFTER_GLV") {
                      formGroupObject["VendorAttrValue"] = this.DaysAPDuePaymentAfterGoLiveDefaultVal;
                    }
  
                    parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
  
                    if (vendorAttr["AttrInputType"] == 'RM') {
                      tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                      tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                      tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                      var arrAddCrit = new Array();
                      var critAssetObj = new CriteriaObj();
                      critAssetObj.DataType = 'text';
                      critAssetObj.restriction = AdInsConstant.RestrictionEq;
                      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                      critAssetObj.value = vendorAttr.AttrValue;
                      arrAddCrit.push(critAssetObj);
                      tempLookup[vendorAttr["AttrCode"]].addCritInput = arrAddCrit;
                    }
                  }
                  this.ListInputLookUpObj.push(tempLookup);
                  this.VendorForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              }
            );
          }
          else {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            if(this.MrVendorCategoryCode === CommonConstant.VENDOR_CATEGORY_GENERAL || this.MrVendorCategoryCode === CommonConstant.CONSULTANT
              || this.MrVendorCategoryCode === CommonConstant.LOGISTIC || this.MrVendorCategoryCode === CommonConstant.COURIER 
              || this.MrVendorCategoryCode === CommonConstant.IT_INFRA_SOLUTION)
            {
              reqByAttrGroup.AttrGroup = CommonConstant.VENDOR_CATEGORY_GENERAL
            }
            this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    var item = this.ListVendorAttrContent.find(x => x.AttrCode == vendorAttr.AttrCode);
                    if (item == undefined) {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
  
                      if (vendorAttr["AttrInputType"] == 'L') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [temp[0]];
                      } else {
                        formGroupObject["VendorAttrValue"] = [''];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
  
                      if (vendorAttr["AttrInputType"] == 'RM') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        tempLookup[vendorAttr["AttrCode"]].jsonSelect = vendorAttr["AttrCode"];
  
                        var arrAddCrit = new Array();
                        var critAssetObj = new CriteriaObj();
                        critAssetObj.DataType = 'text';
                        critAssetObj.restriction = AdInsConstant.RestrictionEq;
                        critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                        critAssetObj.value = vendorAttr.AttrValue;
                        arrAddCrit.push(critAssetObj);
                        tempLookup[vendorAttr["AttrCode"]].addCritInput = arrAddCrit;
                      }
                    }
                    else {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
  
                      if (vendorAttr["AttrInputType"] == 'T') {
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'RM') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var arrAddCrit = new Array();
                        var critAssetObj = new CriteriaObj();
                        critAssetObj.DataType = 'text';
                        critAssetObj.restriction = AdInsConstant.RestrictionEq;
                        critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                        critAssetObj.value = vendorAttr.AttrValue;
                        arrAddCrit.push(critAssetObj);
                        tempLookup[vendorAttr["AttrCode"]].addCritInput = arrAddCrit;
                        let refMaster: ReqRefMasterByTypeCodeAndMasterCodeObj = {
                          RefMasterTypeCode: vendorAttr.AttrValue,
                          MasterCode: item["AttrContent"]
                        };
                        await this.http.post(this.UrlConstantNew.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).toPromise().then(
                          (response: KeyValueObj) => {
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = { Descr: response.Value }
                          });
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'L') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else {
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                    }
                    parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                  }
  
                  this.ListInputLookUpObj.push(tempLookup);
                  this.VendorForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              });
          }
        }

      }
    );
  }

  async getData() {
    await this.http.post(this.UrlConstantNew.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).toPromise().then(
      async (response) => {
        this.result = response;
        this.MrVendorTypeCode = this.result.VendorObj.MrVendorTypeCode;
        this.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        await this.setDropdown();
        this.bindText();
        this.VendorForm.patchValue({
          MrVendorCategoryCode: this.result.VendorObj.MrVendorCategoryCode,
          VendorCode: this.result.VendorObj.VendorCode,
          VendorName: this.result.VendorObj.VendorName,
          MrVendorTypeCode: this.result.VendorObj.MrVendorTypeCode,
          RegistrationNo: this.result.VendorObj.RegistrationNo,
          LicenseNo: this.result.VendorObj.LicenseNo,
          MrIdTypeCode: this.result.VendorObj.MrIdTypeCode,
          IdNo: this.result.VendorObj.IdNo,
          MobilePhnNo1: this.result.VendorObj.MobilePhnNo1,
          MobilePhnNo2: this.result.VendorObj.MobilePhnNo2,
          Email: this.result.VendorObj.Email,
          VendorRating: this.result.VendorObj.VendorRating,
          VendorRatingAlias: this.result.VendorObj.VendorRatingAlias,
          EstablishmentDt: formatDate(this.result.VendorObj['EstablishmentDt'], 'yyyy-MM-dd', 'en-US'),
          PartnershipDt: formatDate(this.result.VendorObj['PartnershipDt'], 'yyyy-MM-dd', 'en-US'),
          IsActive: this.result.VendorObj.IsActive,
          VendorParentId: this.result.VendorObj.VendorParentId,
          ReservedField2: this.result.VendorObj.ReservedField2,
          ReservedField3: this.result.VendorObj.ReservedField3,
          ReservedField4: this.result.VendorObj.ReservedField4,
          ReservedField5: this.result.VendorObj.ReservedField5,
          ReservedField6: this.result.VendorObj.ReservedField6,
          ReservedField9: this.result.VendorObj.ReservedField9,
          MrTaxCalcMethodCode: this.result.VendorObj.MrTaxCalcMethodCode,
          IsVat: this.result.VendorObj.IsVat,
          TaxIdNo: this.result.VendorObj.TaxIdNo,
          TaxpayerName: this.result.VendorObj.TaxpayerName,
          RowVersionVendor: this.result.VendorObj.RowVersion,
          MrAddrTypeCode: this.result.VendorObj.MrAddrTypeCode,
          Addr: this.result.VendorAddrObj.Addr,
          AreaCode2: this.result.VendorAddrObj.AreaCode2,
          AreaCode1: this.result.VendorAddrObj.AreaCode1,
          AreaCode3: this.result.VendorAddrObj.AreaCode3,
          AreaCode4: this.result.VendorAddrObj.AreaCode4,
          City: this.result.VendorAddrObj.City,
          Province: this.result.VendorAddrObj.Province,
          RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist,
          IsOneAffiliate: this.result.VendorObj.IsOneAffiliate,
        });
        this.setVAT();
        this.setLookup();
      }
    );
  }

  async setDropdown() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorCategory
    }
    if(this.MrVendorCategoryCode === CommonConstant.VENDOR_CATEGORY_GENERAL || this.MrVendorCategoryCode === CommonConstant.CONSULTANT
      || this.MrVendorCategoryCode === CommonConstant.LOGISTIC || this.MrVendorCategoryCode === CommonConstant.COURIER 
      || this.MrVendorCategoryCode === CommonConstant.IT_INFRA_SOLUTION)
    {
      refMasterCategoryObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeVendorCategoryGeneral
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterCategoryObj).toPromise().then(
      (response) => {
        this.itemCategoryType = response[CommonConstant.ReturnObj];
        if (this.itemCategoryType.length > 0) {
          if(this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY){
            this.VendorForm.patchValue({
              MrVendorCategoryCode: CommonConstant.NOTARY
            });
          }
          else if (this.MrVendorCategoryCode == CommonConstant.VENDOR_CATEGORY_GENERAL)
          {
            this.VendorForm.patchValue({
              MrVendorCategoryCode: this.itemCategoryType[0].Key
            });
          }
          else{
            this.VendorForm.patchValue({
              MrVendorCategoryCode: this.MrVendorCategoryCode
            });
          }
        }
      }
    );

    var refMaxRefundType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaxRefundType
    }

    var refAssignmentType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeAssgmntType
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refAssignmentType).toPromise().then(
      (response) => {
        this.itemAssignmentTypeTele = response[CommonConstant.ReturnObj];
        if (this.itemAssignmentTypeTele.length > 0) {
          this.VendorForm.patchValue({
            ReservedField9: this.itemAssignmentTypeTele[0].Key
          });
        }
      }
    );

    var refMrSupplierClass = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierClass
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMrSupplierClass).toPromise().then(
      (response) => {
        this.itemSupplierClass = response[CommonConstant.ReturnObj];
        if (this.itemSupplierClass.length > 0) {
          this.VendorForm.patchValue({
            ReservedField4: this.itemSupplierClass[0].Key
          });
        }
      }
    );

    var refMRSupplierUpCalcMethod = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierUpCalcMethod,
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMRSupplierUpCalcMethod).toPromise().then(
      (response) => {
        this.itemTypeUpCalcMethod = response[CommonConstant.ReturnObj];
        if (this.itemTypeUpCalcMethod.length > 0) {
          this.VendorForm.patchValue({
            ReservedField3: this.itemTypeUpCalcMethod[0].Key
          });
        }
      }
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorType,
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterTypeObj).toPromise().then(
      async (response) => {
        this.itemType = response[CommonConstant.ReturnObj];
        if (this.itemType.length > 0) {
          if (this.MrVendorCategoryCode == "AGENCY_PERSONAL") {
            var object = this.itemType.find(x => x.Key == CommonConstant.VENDOR_TYPE_PERSONAL);
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypePersonal
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } else if (this.MrVendorCategoryCode == "AGENCY_COMPANY") {
            var object = this.itemType.find(x => x.Key == CommonConstant.VENDOR_TYPE_COMPANY);
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypeCompany
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } else if (this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL) {
            var object = this.itemType.find(x => x.Key == CommonConstant.VENDOR_TYPE_PERSONAL);
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypePersonal
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } else if (this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY) {
            var object = this.itemType.find(x => x.Key == CommonConstant.VENDOR_TYPE_COMPANY);
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypeCompany
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } else if (this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY) {
            var object = this.itemType.find(x => x.Key == CommonConstant.VENDOR_TYPE_COMPANY);
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypeCompany
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } 
          else if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrVendorTypeCode: this.itemType[0].Key
            });
          }

          if (this.RsvField == CommonConstant.CustTypePersonal){
            this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendor
          }else if(this.RsvField == CommonConstant.CustTypeCompany){
            this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendorCompany            
          }
          this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: this.RefMasterTypeCode }).subscribe(
            (response) => {
              this.itemIdType = response[CommonConstant.ReturnObj];
              if (this.mode != "edit") {
                if (this.itemIdType.length > 0) {
                  this.VendorForm.patchValue({
                    MrIdTypeCode: this.itemIdType[0].Key
                  });
                }
              }
            }
          );
        }
        if (this.MrVendorCategoryCode == "AGENCY_PERSONAL" || this.MrVendorCategoryCode == "AGENCY_COMPANY") {
          this.VendorForm.controls.MrVendorTypeCode.disable();
        }
        if (this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY || this.MrVendorCategoryCode == CommonConstant.NOTARY || this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY) {
          this.VendorForm.controls.MrVendorTypeCode.disable();
        }
        await this.checkType();
      }
    );



    if (this.MrVendorCategoryCode == "SURVEYOR_HO" || this.MrVendorCategoryCode == "ASSET_INSCO_HO") {
      var refMasterAssignmentObj = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaskAssignmentType,
      }
      this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterAssignmentObj).subscribe(
        (response) => {
          this.itemAssignmentType = response[CommonConstant.ReturnObj];
          if (this.itemAssignmentType.length > 0) {
            this.VendorForm.patchValue({
              ReservedField1: this.itemAssignmentType[0].Key
            });
          }
        }
      );
    }

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaxCalcMethod,
    }
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response[CommonConstant.ReturnObj];
        if (this.itemCalcMethodType.length > 0) {
          if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
            });
          }
        }
      }
    );

    this.getInitPattern();
  }

  NpwpCheck(isGetData: boolean = false) {
    if (this.VendorForm.controls.IsNpwpExist.value == true) {
      this.isHidden = false;
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]);
      this.VendorForm.controls.TaxpayerName.setValidators(Validators.required);
    } else {
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]);
      this.VendorForm.controls.TaxpayerName.clearValidators();
      this.isHidden = true;
    }
    this.VendorForm.controls.TaxIdNo.updateValueAndValidity();
    this.VendorForm.controls.TaxpayerName.updateValueAndValidity();
  }

  getLookupParent(event) {
    this.VendorForm.patchValue({
      VendorParentId: event.VendorId
    });

  }
  getLookupZipcode(event) {
    this.VendorForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
  }

  updateValueAndValidityForm() {
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  async checkType(isInit: boolean = false) {
    if (this.VendorForm.controls.MrVendorTypeCode.value != "") {
      this.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
    }
    if (this.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_COMPANY) {

      this.RsvField = CommonConstant.CustTypeCompany

    } else if (this.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL) {

      this.RsvField = CommonConstant.CustTypePersonal

    }

    if (this.RsvField == CommonConstant.CustTypePersonal){
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendor
    }else if(this.RsvField == CommonConstant.CustTypeCompany){
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendorCompany            
    }
    this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: this.RefMasterTypeCode }).subscribe(
      (response) => {
        this.itemIdType = response[CommonConstant.ReturnObj];
        if (this.itemIdType.length > 0) {
          if (isInit || this.mode != "edit") {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.itemIdType[0].Key
            });
          } else {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.result.VendorObj.MrIdTypeCode
            });
          }
        }
      }
    );
    this.setValidatorPattern();
    this.setVAT();
  }

  onOptionsSelected(event) {
    if (this.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL)
      this.setValidatorPattern();
  }

  setLookup() {
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.isRequired = false;

    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
      this.inputLookupParentObj.isRequired = false;
    }
    this.inputLookupParentObj.addCritInput = new Array();

    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
      this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupSupplierHO.json";
      this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupSupplierHO.json";
      this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupSupplierHO.json";
      var critInput = new CriteriaObj();
      critInput.propName = "MR_VENDOR_CATEGORY_CODE";
      critInput.restriction = AdInsConstant.RestrictionEq;
      critInput.value = "SUPPLIER_HO";
      this.inputLookupParentObj.addCritInput.push(critInput);
      this.inputLookupParentObj.title = "Supplier HO";



      this.VendorForm.controls.ReservedField3.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField4.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField5.setValidators(Validators.required);
      this.UpdateValueAndValidity();
    }
    if (this.MrVendorCategoryCode == "SURVEYOR_BRANCH") {
      this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupSurveyorHO.json";
      this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupSurveyorHO.json";
      this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupSurveyorHO.json";
      var critObjSurveyor = new CriteriaObj();
      critObjSurveyor.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjSurveyor.restriction = AdInsConstant.RestrictionEq;
      critObjSurveyor.value = "SURVEYOR_HO";
      this.inputLookupParentObj.addCritInput.push(critObjSurveyor);
      this.inputLookupParentObj.title = "Surveyor HO";

    }
    if (this.MrVendorCategoryCode == "ASSET_INSCO_BRANCH") {
      this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupAssetInsHO.json";
      this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupAssetInsHO.json";
      this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupAssetInsHO.json";
      var critObjAssetInsurance = new CriteriaObj();
      critObjAssetInsurance.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjAssetInsurance.restriction = AdInsConstant.RestrictionEq;
      critObjAssetInsurance.value = "ASSET_INSCO_HO";
      this.inputLookupParentObj.addCritInput.push(critObjAssetInsurance);
      this.inputLookupParentObj.title = "Asset Insurance HO";

    }
    if (this.MrVendorCategoryCode == "LIFE_INSCO_BRANCH") {
      this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupLifeInsHO.json";
      this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupLifeInsHO.json";
      this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupLifeInsHO.json";
      var critObjLifeInsurance = new CriteriaObj();
      critObjLifeInsurance.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjLifeInsurance.restriction = AdInsConstant.RestrictionEq;
      critObjLifeInsurance.value = "LIFE_INSCO_HO";
      this.inputLookupParentObj.addCritInput.push(critObjLifeInsurance);
      this.inputLookupParentObj.title = "Life Insurance HO";

    }

    if (this.mode == "edit") {
      if (this.result.VendorObj.VendorParentId != null) {
        this.inputLookupParentObj.jsonSelect = { VendorName: this.result.VendorParentName };
      }
      if (this.result.VendorAddrObj != null) {
        this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
      }
    }


    var critVendorClass = new CriteriaObj();
    critVendorClass.propName = "MR_VENDOR_CLASS";
    critVendorClass.restriction = AdInsConstant.RestrictionEq;
    critVendorClass.value = CommonConstant.HeadOffice;
    this.inputLookupParentObj.addCritInput.push(critVendorClass);

    this.inputLookupZipcodeObj.isReady = true;
    this.inputLookupParentObj.isReady = true;

    this.NpwpCheck(true);
  }

  UpdateValueAndValidity() {
    this.VendorForm.controls.ReservedField3.updateValueAndValidity();
    this.VendorForm.controls.ReservedField4.updateValueAndValidity();
  }

  SaveForm() {
    if (Date.parse(this.VendorForm.controls.EstablishmentDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Establishment Date Must Be Lesser Than Business Date");
    }
    else if (Date.parse(this.VendorForm.controls.PartnershipDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Partnership Date Must Be Lesser Than Business Date");
    }
    else {
      this.vendorBranchObj = new VendorBranchObj();
      this.vendorBranchObj.VendorObj = new VendorObj();
      this.vendorBranchObj.VendorAddrObj = new VendorAddrObj();

      this.vendorBranchObj.VendorObj.MrVendorCategoryCode = this.VendorForm.controls.MrVendorCategoryCode.value;
      this.vendorBranchObj.VendorObj.VendorCode = this.VendorForm.controls.VendorCode.value;
      this.vendorBranchObj.VendorObj.VendorName = this.VendorForm.controls.VendorName.value;
      this.vendorBranchObj.VendorObj.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
      if (this.vendorBranchObj.VendorObj.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL) {
        this.vendorBranchObj.VendorObj.IdNo = this.VendorForm.controls.IdNo.value;
        this.vendorBranchObj.VendorObj.RegistrationNo = "";
        this.vendorBranchObj.VendorObj.LicenseNo = "";
      }
      else {
        this.vendorBranchObj.VendorObj.IdNo = "";
        this.vendorBranchObj.VendorObj.RegistrationNo = this.VendorForm.controls.RegistrationNo.value;
        this.vendorBranchObj.VendorObj.LicenseNo = this.VendorForm.controls.LicenseNo.value;
      }
      this.vendorBranchObj.VendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value;
      this.vendorBranchObj.VendorObj.MobilePhnNo1 = this.VendorForm.controls.MobilePhnNo1.value;
      this.vendorBranchObj.VendorObj.MobilePhnNo2 = this.VendorForm.controls.MobilePhnNo2.value;
      this.vendorBranchObj.VendorObj.Email = this.VendorForm.controls.Email.value;
      this.vendorBranchObj.VendorObj.VendorRating = this.VendorForm.controls.VendorRating.value;
      this.vendorBranchObj.VendorObj.VendorRatingAlias = this.VendorForm.controls.VendorRatingAlias.value;
      this.vendorBranchObj.VendorObj.EstablishmentDt = this.VendorForm.controls.EstablishmentDt.value;
      this.vendorBranchObj.VendorObj.PartnershipDt = this.VendorForm.controls.PartnershipDt.value;
      this.vendorBranchObj.VendorObj.IsActive = this.VendorForm.controls.IsActive.value;
      this.vendorBranchObj.VendorObj.VendorParentId = this.VendorForm.controls.VendorParentId.value;
      this.vendorBranchObj.VendorObj.ReservedField2 = "";
      this.vendorBranchObj.VendorObj.ReservedField3 = "";
      this.vendorBranchObj.VendorObj.ReservedField4 = "";
      this.vendorBranchObj.VendorObj.ReservedField5 = "";
      this.vendorBranchObj.VendorObj.ReservedField6 = "";
      this.vendorBranchObj.VendorObj.ReservedField9 = "";
      this.vendorBranchObj.VendorObj.MrTaxCalcMethodCode = this.VendorForm.controls.MrTaxCalcMethodCode.value;
      this.vendorBranchObj.VendorObj.IsVat = this.VendorForm.controls.IsVat.value;
      this.vendorBranchObj.VendorObj.IsNpwpExist = this.VendorForm.controls.IsNpwpExist.value;
      this.vendorBranchObj.VendorObj.IsOneAffiliate = this.VendorForm.controls.IsOneAffiliate.value;
    }

    if (this.vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
      this.vendorBranchObj.VendorObj.ReservedField3 = this.VendorForm.controls.ReservedField3.value;
      this.vendorBranchObj.VendorObj.ReservedField4 = this.VendorForm.controls.ReservedField4.value;
      this.vendorBranchObj.VendorObj.ReservedField5 = this.VendorForm.controls.ReservedField5.value;
      if (this.VendorForm.controls.VendorAttrList['controls'].AP_DUE_AFTER_GLV != null) {
        this.vendorBranchObj.VendorObj.ReservedField6 = this.VendorForm.controls.VendorAttrList['controls'].AP_DUE_AFTER_GLV.controls.VendorAttrValue.value;
      }
    }
    if (this.vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
      this.vendorBranchObj.VendorObj.ReservedField2 = this.VendorForm.controls.ReservedField2.value;
      this.vendorBranchObj.VendorObj.ReservedField9 = this.VendorForm.controls.ReservedField9.value;
    }

    if (this.VendorForm.controls.IsNpwpExist.value == true) {
      this.vendorBranchObj.VendorObj.TaxIdNo = this.VendorForm.controls.TaxIdNo.value;
      this.vendorBranchObj.VendorObj.TaxpayerName = this.VendorForm.controls.TaxpayerName.value;

      this.vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.vendorBranchObj.VendorAddrObj.Addr = this.VendorForm.controls.Addr.value;
      this.vendorBranchObj.VendorAddrObj.Zipcode = this.VendorForm.controls["Zipcode"]["controls"].value.value;
      this.vendorBranchObj.VendorAddrObj.AreaCode2 = this.VendorForm.controls.AreaCode2.value;
      this.vendorBranchObj.VendorAddrObj.AreaCode1 = this.VendorForm.controls.AreaCode1.value;
      this.vendorBranchObj.VendorAddrObj.AreaCode3 = this.VendorForm.controls.AreaCode3.value;
      this.vendorBranchObj.VendorAddrObj.AreaCode4 = this.VendorForm.controls.AreaCode4.value;
      this.vendorBranchObj.VendorAddrObj.City = this.VendorForm.controls.City.value;
      this.vendorBranchObj.VendorAddrObj.Province = this.VendorForm.controls.Province.value;
    } else if (this.result != null) {
      this.vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.vendorBranchObj.VendorAddrObj.Addr = this.result.VendorAddrObj.Addr;
      this.vendorBranchObj.VendorAddrObj.Zipcode = this.result.VendorAddrObj.Zipcode;
      this.vendorBranchObj.VendorAddrObj.AreaCode2 = this.result.VendorAddrObj.AreaCode2;
      this.vendorBranchObj.VendorAddrObj.AreaCode1 = this.result.VendorAddrObj.AreaCode1;
      this.vendorBranchObj.VendorAddrObj.AreaCode3 = this.result.VendorAddrObj.AreaCode3;
      this.vendorBranchObj.VendorAddrObj.AreaCode4 = this.result.VendorAddrObj.AreaCode4;
      this.vendorBranchObj.VendorAddrObj.City = this.result.VendorAddrObj.City;
      this.vendorBranchObj.VendorAddrObj.Province = this.result.VendorAddrObj.Province;
    }

    if (this.VendorForm['controls']['VendorAttrList'] != undefined) {
      var formValue = this.VendorForm['controls']['VendorAttrList'].value;

      if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
        for (const key in formValue) {
          if (formValue[key]["VendorAttrValue"] != null) {
            var vendorAttr = new VendorAttrContentObj();
            vendorAttr.VendorAttrContentId = formValue[key]["VendorAttrContentId"];
            vendorAttr.VendorId = this.VendorId;
            vendorAttr.AttrContent = formValue[key]["VendorAttrValue"];
            vendorAttr.AttrCode = formValue[key]["AttrCode"];
            this.vendorAttrRequest.push(vendorAttr);
          }
        }
        this.vendorBranchObj.VendorAttrContentObjs = this.vendorAttrRequest;
      }
    }

    if (this.mode == "edit") {
      if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY) {
        this.vendorBranchObj.VendorObj.MrVendorTypeCode = this.result.VendorObj.MrVendorTypeCode;
      }
      this.vendorBranchObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
      this.vendorBranchObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
      this.vendorBranchObj.VendorObj.VendorId = this.VendorId;
      this.vendorBranchObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
      this.vendorBranchObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
      this.vendorBranchObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

      this.http.post<GenericObj>(this.UrlConstantNew.EditVendorBranch, this.vendorBranchObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_BRANCH_REG], { "VendorId": response.Id, "mode": "edit" });
        });
    }
    else {
      this.http.post<GenericObj>(this.UrlConstantNew.AddVendorBranch, this.vendorBranchObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_BRANCH_REG], { "VendorId": response.Id });
        });
    }
  }

  Back() {
    if (this.mode == "edit") {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_BRANCH_REG], { "VendorId": this.VendorId, "MrVendorCategoryCode": this.MrVendorCategoryCode });
    } else {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
  }
  bindText() {
    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
      this.Registration = "SUPPLIER REGISTRATION";
      this.Code = "Supplier Code";
      this.Name = "Supplier Name";
    }
    else if(this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY || this.MrVendorCategoryCode == CommonConstant.NOTARY)
    {
      this.Registration = "NOTARY REGISTRATION";
      this.Code = "Notary Code";
      this.Name = "Notary Name";
    } 
    else if(this.MrVendorCategoryCode == CommonConstant.CUSTODY)
    {
      this.Registration = "CUSTODY REGISTRATION";
      this.Code = "Custody Code";
      this.Name = "Custody Name";
    } 
    else if(this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY)
    {
      this.Registration = "AUCTION COMPANY REGISTRATION";
      this.Code = "Auction Company Code";
      this.Name = "Auction Company Name";
    } 
    else if(this.MrVendorCategoryCode == CommonConstant.VENDOR_CATEGORY_GENERAL)
    {
      this.Registration = "VENDOR REGISTRATION";
      this.Code = "Vendor Code";
      this.Name = "Vendor Name";
    } 
    else {
      this.Registration = "BRANCH REGISTRATION";
      this.Code = "Branch Code";
      this.Name = "Branch Name";
    }
  }

  getLookUpAttr(e, VendorAttrCode) {
    this.VendorForm['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.MasterCode
    });
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
            this.VendorForm.patchValue({
              VendorCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

  //START URS-LOS-041
  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: Array<KeyValueObj>;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if (this.resultPattern != undefined) {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;

            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
            this.customPattern.push(patternObj);
          }
          this.setValidatorPattern();
        }
      }
    );
  }
  // setValidatorPattern(){
  //   let idTypeValue: string;

  //   idTypeValue = this.VendorForm.controls[this.controlNameIdType].value;

  //   if (this.resultPattern != undefined) {
  //     var result = this.resultPattern.find(x => x.Key == idTypeValue)

  //     if (result != undefined) {
  //       var pattern = result.Value;
  //       if (pattern != undefined) {
  //         this.setValidator(pattern);
  //       }
  //     }
  //   }
  // }

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.VendorForm.controls.MrIdTypeCode.value;
    var pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        var result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    if (this.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_COMPANY) {
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
    } else {
      if (pattern != undefined) {
        if (pattern != "") {
          this.VendorForm.controls.IdNo.setValidators([Validators.required, Validators.pattern(pattern)]);
        } else {
          this.VendorForm.controls.IdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
        }
        this.VendorForm.controls.RegistrationNo.clearValidators();
        this.VendorForm.controls.LicenseNo.clearValidators();
        this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      }
    }
    this.updateValueAndValidityForm();
  }

  // LoadGradingRule(vendorRating: number)
  // {
  //   this.http.post(this.UrlConstantNew.GetRuleVendorGrading, { VendorRating:  vendorRating}).subscribe(
  //     (response) => {
  //       // this.gradeCode = response["Key"];
  //       // this.VendorForm.patchValue({
  //       //   VendorGrade: response["Value"],
  //       //   VendorGradeCode : response["Key"]
  //       // });

  //       this.gradeCode = response["VendorGrade"];
  //       // this.VendorForm.patchValue({
  //       //   VendorGrade: response["Value"],
  //       //   VendorGradeCode : response["Key"]
  //       // });
  //     }
  //   );
  // }
  //END OF URS-LOS-041

  settingDefaultValue() {
    var generalSettingObj: GenericObj = new GenericObj();
    generalSettingObj.Codes = ["DEFAULT_BPKB_AGING", "DEFAULT_APDUEAFTGLV"];
    this.http.post(this.UrlConstantNew.GetListGeneralSettingByListGsCode, generalSettingObj).subscribe(
      (response) => {
        var tempResponse = response['ResGetListGeneralSettingObj'];
        let GSBpkpAgingDefaultValue = tempResponse.find(x => x.GsCode == "DEFAULT_BPKB_AGING");
        let GSDaysAPDuePaymentAfterGoLive = tempResponse.find(x => x.GsCode == "DEFAULT_APDUEAFTGLV");
        if (GSBpkpAgingDefaultValue != undefined || GSBpkpAgingDefaultValue != null) {
          if (GSBpkpAgingDefaultValue != "") {
            this.BpbkAgingDefaultVal = Number(GSBpkpAgingDefaultValue["GsValue"]);
            this.VendorForm.patchValue({
              ReservedField5: this.BpbkAgingDefaultVal,
            });
          }
        }
        if (GSDaysAPDuePaymentAfterGoLive != undefined || GSDaysAPDuePaymentAfterGoLive != null) {
          if (GSDaysAPDuePaymentAfterGoLive != "") {
            this.DaysAPDuePaymentAfterGoLiveDefaultVal = Number(GSDaysAPDuePaymentAfterGoLive["GsValue"]);
            this.VendorForm.patchValue({
              ReserveField6: this.DaysAPDuePaymentAfterGoLiveDefaultVal
            });
          }
        }
      }
    );
  }

  setVAT(){
    if (!this.VatForPersonal){
      if(this.VendorForm.controls.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL){
        this.VendorForm.controls.IsVat.disable();
        this.VendorForm.patchValue({
          IsVat : false
        });
      }else{
        this.VendorForm.controls.IsVat.enable();
      }
      this.VendorForm.controls.IsVat.updateValueAndValidity();
    }
  }

  GetGeneralSetting(){
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GSCodeVATForPersonal }).toPromise().then(
      (result: GeneralSettingObj) => {
        if (result.GeneralSettingId == 0 || result.GsValue == '1') {
          this.VatForPersonal = true;
        }
      }
    );
  }
}
