import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NgxRouterService } from '@adins/fe-core';
import { CommonConstantX } from 'app/impl/shared/constant/CommonConstantX';

@Component({
  selector: 'app-self-custom-container-vendor-branch-info-x',
  templateUrl: './self-custom-container-vendor-branch-info-x.component.html'
})
export class SelfCustomContainerVendorBranchInfoXComponent implements OnInit {

  @Input() MrVendorCategoryCode: string;
  @Input() parentForm: FormGroup;

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  enjiForm: NgForm;

  result: any;
  ListVendorAttrContent = new Array<any>();
  VendorAttrList = new Array<any>();
  ListInputLookUpObj = new Array<any>();

  VendorId: number = 0;
  MrVendorTypeCode: string = "C";
  inputLookupParentObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);

  DictDDLVendorAttr: { [id: string]: Array<any> } = {};

  isFormReady: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient,
    private toastr: NGXToastrService, private modalService: NgbModal, private spinner: NgxSpinnerService,
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }
    });
  }

  async ngOnInit() {
    this.SetTitleHoInfo();
    if (this.MrVendorCategoryCode == "" || this.MrVendorCategoryCode == null || this.MrVendorCategoryCode == "MrVendorCategoryCode"
      || this.MrVendorCategoryCode == CommonConstantX.GENERAL
    ) {
      this.MrVendorCategoryCode = CommonConstant.VENDOR_CATEGORY_GENERAL;
    }

    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING || this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
      this.parentForm.addControl("VendorParentId", this.fb.control(''));
      this.parentForm.addControl("ReservedField3", this.fb.control(''));
      this.parentForm.addControl("ReservedField4", this.fb.control(''));
      this.parentForm.addControl("ReservedField5", this.fb.control(''));
    }

    if (this.VendorId > 0) {
      await this.getData();
    }
    else {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.parentForm.controls.ReservedField5.setValidators([Validators.required]);
        this.parentForm.controls.ReservedField5.updateValueAndValidity();
      }

      await this.setDropdown();
      this.setLookup();
      this.settingDefaultValue();
    }

    await this.http.post(this.UrlConstantNew.GetListVendorAttrContentByVendorId, { Id: this.VendorId }).toPromise().then(
      async (response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj]
        if (this.ListVendorAttrContent != null) {
          if (this.ListVendorAttrContent.length < 1) {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            await this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).toPromise().then(
              async (response: any) => {
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                let tempLookup = {};
                if (this.VendorAttrList != null) {
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
                    else if (vendorAttr["AttrCode"] == "PLAFOND_VENDOR") {
                      formGroupObject["VendorAttrValue"] = ['0'];
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
                  this.parentForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              }
            );
          }
          else {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            if (this.MrVendorCategoryCode === CommonConstant.VENDOR_CATEGORY_GENERAL || this.MrVendorCategoryCode === CommonConstant.CONSULTANT
              || this.MrVendorCategoryCode === CommonConstant.LOGISTIC || this.MrVendorCategoryCode === CommonConstant.COURIER
              || this.MrVendorCategoryCode === CommonConstant.IT_INFRA_SOLUTION || this.MrVendorCategoryCode === CommonConstantX.GENERAL) {
              reqByAttrGroup.AttrGroup = CommonConstant.VENDOR_CATEGORY_GENERAL
            }
            await this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).toPromise().then(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                if (this.VendorAttrList != null) {
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
                  this.parentForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              });
          }
        }
      });

    for (const vendorAttr of this.VendorAttrList) {
      if (vendorAttr["IsMandatory"] == true) {
        this.parentForm.controls.VendorAttrList['controls'][vendorAttr["AttrCode"]]['controls'].VendorAttrValue.setValidators(Validators.required);
      }
      if(vendorAttr["AttrCode"] == 'PROPORTIONAL_DAYS_PER_YEAR'){
        this.parentForm.controls.VendorAttrList['controls'][vendorAttr["AttrCode"]]['controls'].VendorAttrValue.setValidators(Validators.max(366));
        
      }
    }
      
  }

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
      case CommonConstant.ASSET_INSCO_BRANCH:
        this.HoTitle = "Insurance Branch ";
        break;
      case CommonConstant.VENDOR_CATEGORY_GENERAL:
        this.HoTitle = "Vendor ";
        break;
        case CommonConstantX.GENERAL:
          this.HoTitle = "Vendor ";
          break;
    }
  }

  setLookup() {
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

    if (this.VendorId > 0) {
      if (this.result.VendorObj.VendorParentId != null) {
        this.inputLookupParentObj.jsonSelect = { VendorName: this.result.VendorParentName };
      }
    }


    var critVendorClass = new CriteriaObj();
    critVendorClass.propName = "MR_VENDOR_CLASS";
    critVendorClass.restriction = AdInsConstant.RestrictionEq;
    critVendorClass.value = CommonConstant.HeadOffice;
    this.inputLookupParentObj.addCritInput.push(critVendorClass);
    this.inputLookupParentObj.isReady = true;
  }

  itemTypeUpCalcMethod: any;
  itemSupplierClass: any;
  async setDropdown() {
    var refMRSupplierUpCalcMethod = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierUpCalcMethod,
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMRSupplierUpCalcMethod).toPromise().then(
      (response) => {
        this.itemTypeUpCalcMethod = response[CommonConstant.ReturnObj];
        if (this.itemTypeUpCalcMethod.length > 0) {
          this.parentForm.patchValue({
            ReservedField3: this.itemTypeUpCalcMethod[0].Key
          });
        }
      });

    var refMrSupplierClass = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierClass
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMrSupplierClass).toPromise().then(
      (response) => {
        this.itemSupplierClass = response[CommonConstant.ReturnObj];
        if (this.itemSupplierClass.length > 0) {
          this.parentForm.patchValue({
            ReservedField4: this.itemSupplierClass[0].Key
          });
        }
      });
  }

  BpbkAgingDefaultVal: number;
  DaysAPDuePaymentAfterGoLiveDefaultVal: number;
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
            this.parentForm.patchValue({
              ReservedField5: this.BpbkAgingDefaultVal,
            });
          }
        }
        if (GSDaysAPDuePaymentAfterGoLive != undefined || GSDaysAPDuePaymentAfterGoLive != null) {
          if (GSDaysAPDuePaymentAfterGoLive != "") {
            this.DaysAPDuePaymentAfterGoLiveDefaultVal = Number(GSDaysAPDuePaymentAfterGoLive["GsValue"]);
            this.parentForm.patchValue({
              ReserveField6: this.DaysAPDuePaymentAfterGoLiveDefaultVal
            });
          }
        }
      });
  }

  async getData() {
    await this.http.post(this.UrlConstantNew.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).toPromise().then(
      async (response) => {
        this.result = response;
        this.MrVendorTypeCode = this.result.VendorObj.MrVendorTypeCode;
        this.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        if (this.MrVendorCategoryCode == CommonConstant.NOTARY) {
          this.MrVendorCategoryCode = this.MrVendorTypeCode == 'P' ? CommonConstant.NOTARY_PERSONAL : CommonConstant.NOTARY_COMPANY;
        }
        await this.setDropdown();
        this.parentForm.patchValue({
          VendorParentId: this.result.VendorObj.VendorParentId,
          ReservedField3: this.result.VendorObj.ReservedField3,
          ReservedField4: this.result.VendorObj.ReservedField4,
          ReservedField5: this.result.VendorObj.ReservedField5,
        });
        this.setLookup();
      }
    );
  }


  async checkAssetSold(isInit: boolean = false) {
    if (this.MrVendorCategoryCode != CommonConstant.SUPPLIER) {
      return;
    }
    if (this.parentForm.controls.ReservedField4.value != "") {
      let reqMasterObj: ReqRefMasterByTypeCodeAndMasterCodeObj = {
        MasterCode: this.parentForm.controls.ReservedField4.value,
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierClass,
      };
      await this.http
        .post(
          this.UrlConstantNew.GetRefMasterByRefMasterTypeCodeAndMasterCode,
          reqMasterObj
        )
        .subscribe((response) => {
          let result2: any;
          result2 = response;
          // Find the object with AttrCode === "ASSET_SOLD"
          if (result2.ReserveField1 != null) {
            this.DictDDLVendorAttr["ASSET_SOLD"]=[result2.ReserveField1];
          }
          if (result2.ReserveField3 != null) {
            this.DictDDLVendorAttr["ASSET_SOLD"].push(result2.ReserveField3);
          }
          if (result2.ReserveField4 != null) {
            this.DictDDLVendorAttr["ASSET_SOLD"].push(result2.ReserveField4);
          }
          if (result2.ReserveField5 != null) {
            this.DictDDLVendorAttr["ASSET_SOLD"].push(result2.ReserveField5);
          }
          if(this.parentForm.controls.ReservedField4.value === "MD" ||this.parentForm.controls.ReservedField4.value === "AD" || this.parentForm.controls.ReservedField4.value === "SD"){
            this.parentForm.controls.VendorAttrList['controls']["ASSET_SOLD"]['controls'].VendorAttrValue.setValue(result2.ReserveField1);
          }
          else{
            this.parentForm.controls.VendorAttrList['controls']["ASSET_SOLD"]['controls'].VendorAttrValue.setValue(result2.ReserveField3);
          }
        });
    }
  }

  getLookupParent(event) {
    this.parentForm.patchValue({
      VendorParentId: event.VendorId
    });
  }

  getLookUpAttr(e, VendorAttrCode) {
    this.parentForm['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.MasterCode
    });
  }

}
