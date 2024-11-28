import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AttrContent } from 'app/shared/model/attr-content.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { RefAttr } from 'app/shared/model/ref-attr.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { ReqCustAttrContentByCustIdAndAttrGroupObj } from 'app/shared/model/request/cust-attr-content/req-cust-attr-content-by-cust-id-and-attr-group-obj.model';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-cust-attr-list',
  templateUrl: './cust-attr-list.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CustAttrListComponent implements OnInit {
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() identifier: any;
  @Input() attrGroup: string;
  @Input() attrGroups: Array<string>;
  @Input() CustId: any;
  @Input() title: any;
  @Output() IncomeAmt: EventEmitter<{Index: number, Amount: number}> = new EventEmitter();
  @Output() ExpenseAmt: EventEmitter<{Index: number, Amount: number}> = new EventEmitter();

  ListAttrContent: Array<any> = new Array<any>();
  tempLookup = {};
  RefAttrList:  Array<RefAttr> = new Array<RefAttr>();
  ReqByIdAndAttrObj: ReqCustAttrContentByCustIdAndAttrGroupObj = new ReqCustAttrContentByCustIdAndAttrGroupObj();
  ListInputLookUpObj = new Array();
  isFormReady: boolean = false;
  AttrContent: AttrContent;
  AmountList: Array<{Index: number, Amount: number}> = new Array<{Index: number, Amount: number}>();

  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  
  dictMultiOptions: { [key: string]: Array<{ item_id: string, item_text: string }>; } = {};
  selectedMultiDDLItems: { [key: string]: Array<{ item_id: string, item_text: string }>; } = {};

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.CustId = queryParams["Page"];
      }
    });
  }

  async ngOnInit() {
    if(this.attrGroup !== undefined) {
      let custGrp: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
      custGrp.AttrGroup = this.attrGroup;

      this.ReqByIdAndAttrObj.CustId = this.CustId;
      this.ReqByIdAndAttrObj.AttrGroup = this.attrGroup;
      await this.http.post<Array<AttrContent>>(this.UrlConstantNew.GetListCustAttrContentByCustIdAndAttrGroup, this.ReqByIdAndAttrObj).toPromise().then(
        (response) => {
          this.ListAttrContent = response[CommonConstant.ReturnObj];
          let parentFormGroup = new Object();

          this.http.post<Array<RefAttr>>(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
            async (response: any) => {
              this.RefAttrList = response[CommonConstant.ReturnObj];

              if(this.RefAttrList != null) {
                for (const refAttr of this.RefAttrList) {
                  this.AttrContent = new AttrContent();
                  let isUpdateValue = false;
                  if (this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId)) {
                    this.AttrContent = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                    isUpdateValue = true;
                  } 
                  var formGroupObject = new Object();
                  formGroupObject["RefAttrId"] = [refAttr.RefAttrId];
                  formGroupObject["IsMandatory"] = [refAttr.IsMandatory];
                  formGroupObject["AttrGroup"] = this.attrGroup;
                  this.setFormGroupValue(refAttr, formGroupObject, parentFormGroup, isUpdateValue);
                } 
                this.ListInputLookUpObj.push(this.tempLookup);
                this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
                this.isFormReady = true;
              }
            }
          );
        }
      );
    }
    else if(this.attrGroups !== undefined) {
      await this.http.post<Array<AttrContent>>(this.UrlConstantNew.GetListCustFinDataAttrContentByCustIdAndListAttrGroup, { CustId: this.CustId, AttrGroups: this.attrGroups }).toPromise().then(
        (response) => {
          this.ListAttrContent = response[CommonConstant.ReturnObj];
          let parentFormGroup = new Object();

          this.http.post<Array<RefAttr>>(this.UrlConstantNew.GetListActiveRefAttrByListAttrGroup, { AttrGroups: this.attrGroups }).subscribe(
            async (response: any) => {
              this.RefAttrList = response[CommonConstant.ReturnObj];

              if(this.RefAttrList != null) {
                let index = 0;
                for (const refAttr of this.RefAttrList) {
                  this.AttrContent = new AttrContent();
                  let isUpdateValue = false;
                  let findListAttrContentObj = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                  if (findListAttrContentObj !== undefined) {
                    this.AttrContent = findListAttrContentObj;
                    isUpdateValue = true;
                  } 
                  var formGroupObject = new Object();
                  formGroupObject["RefAttrId"] = [refAttr.RefAttrId];
                  formGroupObject["IsMandatory"] = [refAttr.IsMandatory];
                  formGroupObject["AttrGroup"] = [refAttr.AttrGroup];
                  this.setFormGroupValueForAttrGroups(refAttr, formGroupObject, parentFormGroup, isUpdateValue, index);
                  index++;
                } 
                this.ListInputLookUpObj.push(this.tempLookup);
                this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
                this.isFormReady = true;
              }
            }
          );
        }
      );
    }
  }

  SplitAttrListValue(value: string) {
    return value.split(";").sort();
  }

  getLookUp(e, AttrCode) {
    this.parentForm['controls'][this.identifier]["controls"][AttrCode].patchValue({
      AttrValue: e.MasterCode
    });
  }

  readonly AttrInputTypeSearchList: string = CommonConstant.AttrInputTypeSearchList;
  setFormGroupValue(refAttr: RefAttr, formGroupObject: object, parentFormGroup, isUpdateValue: boolean) {
    if (isUpdateValue == false) {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = ['', [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr.PatternValue)]];
        }
      }
      else if (refAttr.AttrInputType == 'L') {
        let temp = refAttr.AttrValue.split(";");
        if(refAttr.IsMandatory == false){
        formGroupObject["AttrValue"] = [temp[0]];
        }
        else{
          formGroupObject["AttrValue"] = [""];
        }
      }
      else if (refAttr.AttrInputType == 'P' || refAttr.AttrInputType == 'N') {
        formGroupObject["AttrValue"] = [0];
      }
      else {
        formGroupObject["AttrValue"] = [''];
      }
      if (refAttr["DefaultValue"] != null && refAttr["DefaultValue"].trim() != '') {
        formGroupObject["AttrValue"] = [refAttr.DefaultValue];
      }
    }
    else {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = [this.AttrContent.AttrValue, [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = [this.AttrContent["AttrValue"], [Validators.pattern(refAttr['PatternValue'])]];
        }
      }
      else {
        formGroupObject["AttrValue"] = [this.AttrContent.AttrValue];
      }
    }
    if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
      formGroupObject["AttrValue"].push(Validators.required);
    }
    if (refAttr.AttrInputType == this.AttrInputTypeSearchList) {
      this.setAttrInputTypeSearchList(refAttr.AttrCode, refAttr.AttrValue);
    }
    parentFormGroup[refAttr.AttrCode] = this.fb.group(formGroupObject);
    if (refAttr["AttrInputType"] == 'RM') {
      this.tempLookup[refAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
      this.tempLookup[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
      if (refAttr["IsMandatory"] == true) {
        this.tempLookup[refAttr["AttrCode"]].isRequired = true;
      }
      else {
        this.tempLookup[refAttr["AttrCode"]].isRequired = false;
      }
      if (isUpdateValue == false) {
        if (refAttr["DefaultValue"] != null) {
          let refMaster: ReqRefMasterByTypeCodeAndMasterCodeObj = {
            RefMasterTypeCode: refAttr.AttrValue,
            MasterCode: refAttr.DefaultValue
          };
          this.http.post(this.UrlConstantNew.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).subscribe(
            (response: KeyValueObj) => {
              this.tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response.Value };
            });
        }
      }
      else {
        this.tempLookup[this.AttrContent.AttrCode].jsonSelect = { Descr: this.AttrContent.Descr }
      }
      let arrAddCrit = new Array();
      let critAssetObj = new CriteriaObj();
      critAssetObj.DataType = 'text';
      critAssetObj.restriction = AdInsConstant.RestrictionEq;
      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
      isUpdateValue == false ? critAssetObj.value = refAttr.AttrValue : critAssetObj.value = this.AttrContent.MasterCode;
      arrAddCrit.push(critAssetObj);
      this.tempLookup[refAttr["AttrCode"]].addCritInput = arrAddCrit;
    }
  }

  setFormGroupValueForAttrGroups(refAttr: RefAttr, formGroupObject: object, parentFormGroup, isUpdateValue: boolean, index: number) {
    if (isUpdateValue == false) {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = ['', [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr.PatternValue)]];
        }
      }
      else if (refAttr.AttrInputType == 'L') {
        let temp = refAttr.AttrValue.split(";");
        if(refAttr.IsMandatory == false){
          formGroupObject["AttrValue"] = [temp[0]];
        }
        else{
            formGroupObject["AttrValue"] = [""];
        }
      }
      else if (refAttr.AttrInputType == 'P' || refAttr.AttrInputType == 'N') {
        formGroupObject["AttrValue"] = [0];
      }
      else {
        formGroupObject["AttrValue"] = [''];
      }
      if (refAttr["DefaultValue"] != null && refAttr["DefaultValue"].trim() != '') {
        formGroupObject["AttrValue"] = [refAttr.DefaultValue];
      }
    }
    else {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = [this.AttrContent.AttrValue, [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = [this.AttrContent["AttrValue"], [Validators.pattern(refAttr['PatternValue'])]];
        }
      }
      else {
        formGroupObject["AttrValue"] = [this.AttrContent.AttrValue];
        this.CalculateAmt(refAttr.AttrGroup, this.AttrContent.AttrValue, index);
      }
    }
    if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
      formGroupObject["AttrValue"].push(Validators.required)
    }
    if (refAttr.AttrInputType == this.AttrInputTypeSearchList) {
      this.setAttrInputTypeSearchList(refAttr.AttrCode, refAttr.AttrValue);
    }
    parentFormGroup[refAttr.AttrCode] = this.fb.group(formGroupObject);
    if (refAttr["AttrInputType"] == 'RM') {
      this.tempLookup[refAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
      this.tempLookup[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
      if (refAttr["IsMandatory"] == true) {
        this.tempLookup[refAttr["AttrCode"]].isRequired = true;
      }
      else {
        this.tempLookup[refAttr["AttrCode"]].isRequired = false;
      }
      if (isUpdateValue == false) {
        if (refAttr["DefaultValue"] != null) {
          let refMaster: ReqRefMasterByTypeCodeAndMasterCodeObj = {
            RefMasterTypeCode: refAttr.AttrValue,
            MasterCode: refAttr.DefaultValue
          };
          this.http.post(this.UrlConstantNew.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).subscribe(
            (response: KeyValueObj) => {
              this.tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response.Value };
            });
        }
      }
      else {
        this.tempLookup[this.AttrContent.AttrCode].jsonSelect = { Descr: this.AttrContent.Descr }
      }
      let arrAddCrit = new Array();
      let critAssetObj = new CriteriaObj();
      critAssetObj.DataType = 'text';
      critAssetObj.restriction = AdInsConstant.RestrictionEq;
      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
      isUpdateValue == false ? critAssetObj.value = refAttr.AttrValue : critAssetObj.value = this.AttrContent.MasterCode;
      arrAddCrit.push(critAssetObj);
      this.tempLookup[refAttr["AttrCode"]].addCritInput = arrAddCrit;
    }
  }

  dictRuleSetName: { [Id: string]: string } = {};
  tempExistingValueSelected: { [Id: string]: string } = {};
  setAttrInputTypeSearchList(AttrCode: string, ruleSetName: string) {
    this.dictRuleSetName[AttrCode] = ruleSetName;
    this.selectedMultiDDLItems[AttrCode] = new Array();
    this.tempExistingValueSelected[AttrCode] = "";
    if (this.AttrContent.AttrValue) {
      this.tempExistingValueSelected[AttrCode] = this.AttrContent.AttrValue;
    }
  }

  SetSearchListInputType(attrCode: string, ProfessionCode: string) {
    this.http.post(this.UrlConstantNew.GetRuleForAttrContent, { RuleSetName: this.dictRuleSetName[attrCode], Code: ProfessionCode }).subscribe(
      (response: GenericListObj) => {
        let tempList: Array<KeyValueObj> = response.ReturnObject;
        this.dictMultiOptions[attrCode] = new Array();
        if (tempList) {
          for (let index = 0; index < tempList.length; index++) {
            const element = tempList[index];
            if (element.Key == this.tempExistingValueSelected[attrCode]) {
              this.selectedMultiDDLItems[attrCode] = new Array();
              this.selectedMultiDDLItems[attrCode].push({ item_id: element.Key, item_text: element.Value });
              this.onMultiDDLChangeEvent(attrCode);
              this.tempExistingValueSelected[attrCode] = "";
            }
            this.dictMultiOptions[attrCode].push({ item_id: element.Key, item_text: element.Value });
          }
        }
      }
    )
  }

  onMultiDDLChangeEvent(attrCode: string) {
    if (this.selectedMultiDDLItems[attrCode] && this.selectedMultiDDLItems[attrCode].length > 0) {
      let selectedId = this.selectedMultiDDLItems[attrCode].map(x => x.item_id);
      // let selectedText = this.selectedMultiDDLItems[attrCode].map(x => x.item_text);
      let tempArray = this.parentForm.get(this.identifier) as FormArray;
      let tempFb = tempArray.get(attrCode) as FormGroup;
      tempFb.get("AttrValue").patchValue(selectedId[0]);
    }
  }

  CalculateAmt(attrGroup: string, amount: string, index: number) {
    if(attrGroup === CommonConstant.AttrGroupCustPersonalFinDataIncome) {
      this.IncomeAmt.emit({Index: index, Amount: parseFloat(amount.replace(/,/g, ''))});
    }
    else if(attrGroup === CommonConstant.AttrGroupCustPersonalFinDataExpense) {
      this.ExpenseAmt.emit({Index: index, Amount: parseFloat(amount.replace(/,/g, ''))});
    }
  }
}