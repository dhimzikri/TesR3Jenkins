import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html'
})
export class AttributeDetailComponent implements OnInit {

 
  pageType: string;
  refAttrId: number;
  attrInputTypeList: any;
  attrTypeCodeList: any;
  patternCodeList: any;
  patternValueList: any;
  attributeGroupList: any;
  isTextBox: boolean = false;
  inputLookupRefMasterType: InputLookupObj;
  RefAttrForm = this.fb.group({
    RefAttrId: [0, [Validators.required]],
    AttrCode: ['', [Validators.required]],
    AttrName: ['', [Validators.required]],
    AttrTypeCode: ['', [Validators.required]],
    AttrInputType: ['', [Validators.required]],
    AttrGroup: ['', [Validators.required]],
    IsActive: [true],
    DefaultValue: [''],
    IsMandatory: [true],
    RowVersion: ['']
  });
  readonly AttrInputTypeDate = CommonConstant.AttrInputTypeDate;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.pageType = queryParams['mode'];
      }
      else {
        this.pageType = "add";
      }

      if (queryParams['refAttrId'] != null) {
        this.refAttrId = queryParams['refAttrId'];
      }
    });

  }

  ngOnInit() {
    this.inputLookupRefMasterType = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupRefMasterType.urlJson = "./assets/lookup/lookupRefMasterType.json";
    this.inputLookupRefMasterType.pagingJson = "./assets/lookup/lookupRefMasterType.json";
    this.inputLookupRefMasterType.genericJson = "./assets/lookup/lookupRefMasterType.json";
    this.inputLookupRefMasterType.isRequired = false;
    var datePipe = new DatePipe("en-US");
    let getAttrType = this.http.post(this.UrlConstantNew.GetListActiveRefAttrType, new Object()).pipe(first());
    var RefMasterInputType = new RefMasterObj();
    RefMasterInputType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAttrInputType;
    let getRefMasterInputType = this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterInputType);

    var RefMasterPatternCode = new RefMasterObj();
    RefMasterPatternCode.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeRegularExpression;
    let getRefMasterPatternCode = this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterPatternCode);

    var RefMasterAttributeGroup = new RefMasterObj();
    RefMasterAttributeGroup.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAttributeGroup;
    let getRefMasterAttributeGroup = this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterAttributeGroup);




    
    if (this.pageType == "edit") {
      let getRefAttr = this.http.post(this.UrlConstantNew.GetRefAttrById, {Id: this.refAttrId }).pipe(first());
      forkJoin([getRefAttr, getAttrType, getRefMasterInputType, getRefMasterPatternCode, getRefMasterAttributeGroup]).subscribe(
        (response) => {
          var refAttr = response[0];
          var attrTypeList = response[1];
          this.attrTypeCodeList = [...attrTypeList[CommonConstant.ReturnObj]];
          this.RefAttrForm.patchValue({ ...refAttr });
          this.attrInputTypeList = response[2][CommonConstant.ReturnObj];
          this.patternCodeList = response[3][CommonConstant.ReturnObj];
          this.attributeGroupList = response[4][CommonConstant.ReturnObj];
          switch (refAttr["AttrInputType"]) {
            case CommonConstant.AttrInputTypeList:
              var valueList = refAttr["AttrValue"].split(";");
              console.log("ValueList: " + JSON.stringify(valueList));
              var formArray = this.fb.array([]);
              for (const item of valueList) {
                formArray.push(this.fb.control(item, [Validators.required]));
              }
              this.RefAttrForm.addControl("AttrValue", formArray);
              break;

            case CommonConstant.AttrInputTypeRefMaster:
              this.RefAttrForm.addControl("AttrValue", this.fb.control(refAttr["AttrValue"], [Validators.required]));
              this.inputLookupRefMasterType.nameSelect = refAttr["AttrValueDescr"];
              this.inputLookupRefMasterType.jsonSelect = { Descr: refAttr["AttrValueDescr"] };
              this.inputLookupRefMasterType.isRequired = true;
              break;

            case CommonConstant.AttrInputTypeText:
              this.isTextBox = true;
              this.RefAttrForm.addControl("PatternCode", this.fb.control(''));
              this.RefAttrForm.addControl("PatternValue", this.fb.control(''));
              this.RefAttrForm.addControl("AttrLength", this.fb.control('', [Validators.required, Validators.max(4000)]));
              this.RefAttrForm.patchValue({
                PatternCode: refAttr["PatternCode"],
                PatternValue: refAttr["PatternValue"],
                AttrLength: refAttr["AttrLength"],
              });
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.checkIsAutoFormNoFromSetting('AR');

      forkJoin([getAttrType, getRefMasterInputType, getRefMasterPatternCode, getRefMasterAttributeGroup]).subscribe(
        (response) => {
          this.attrTypeCodeList = response[0][CommonConstant.ReturnObj];
          this.attrInputTypeList = response[1][CommonConstant.ReturnObj];
          this.patternCodeList = response[2][CommonConstant.ReturnObj];
          this.attributeGroupList = response[3][CommonConstant.ReturnObj];
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  AttrInputTypeHandler() {
    var type = this.RefAttrForm.controls["AttrInputType"].value;
    if (this.RefAttrForm.contains("AttrValue")) {
      this.RefAttrForm.removeControl("AttrValue");
    }
    if (type == CommonConstant.AttrInputTypeText) {
      this.isTextBox = true;
      this.RefAttrForm.addControl("PatternCode", this.fb.control(''));
      this.RefAttrForm.addControl("PatternValue", this.fb.control(''));
      this.RefAttrForm.addControl("AttrLength", this.fb.control('', [Validators.required,  Validators.max(4000)]));
    }
    else if (type != CommonConstant.AttrInputTypeText) {
      this.RefAttrForm.removeControl("AttrLength");
      this.RefAttrForm.removeControl("PatternCode");
      this.RefAttrForm.removeControl("PatternValue");
      this.isTextBox = false;
    }
    if (type == CommonConstant.AttrInputTypeRefMaster) {
      this.RefAttrForm.addControl('AttrValue', this.fb.control('', [Validators.required]));
      this.inputLookupRefMasterType.isRequired = true;
    }
    else if (type != CommonConstant.AttrInputTypeRefMaster) {
      this.inputLookupRefMasterType.isRequired = false;
    }
    if (type == CommonConstant.AttrInputTypeList) {
      this.RefAttrForm.addControl("AttrValue", this.fb.array([]));
    }

    if(type == this.AttrInputTypeDate){
      this.RefAttrForm.patchValue({
        DefaultValue: ''
      });
    }
  }

  AttrValueRowHandler() {
    var formArray = this.RefAttrForm.get("AttrValue") as FormArray;
    formArray.push(this.fb.control('', [Validators.required]));
  }

  RemoveAttrValueRow(idx) {
    var formArray = this.RefAttrForm.get("AttrValue") as FormArray;
    formArray.removeAt(idx);
  }

  Back() {
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYSTEM_SETTING_ATTR_MSTR_PAGING],{});
  }

  Save() {
    var formValue = this.RefAttrForm.value;
    var url = this.pageType == "add" ? this.UrlConstantNew.AddRefAttr : this.UrlConstantNew.EditRefAttr;

    if (formValue["AttrInputType"] == CommonConstant.AttrInputTypeList) {
      if (formValue["AttrValue"].length < 1) {
        this.toastr.warningMessage(ExceptionConstant.MIN_1_ATTR_VALUE);
        return;
      }

      var duplicates = formValue["AttrValue"].reduce(function(acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
      }, []);

      if(duplicates.length > 0){
        this.toastr.warningMessage(ExceptionConstant.DUPL_ATTR_VALUE);
        return;
      }

      formValue["AttrValue"] = formValue["AttrValue"].join(";");
    }

    this.http.post(url, formValue, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYSTEM_SETTING_ATTR_PAGING],{ });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  patternCodeChange(e) {
    this.RefAttrForm.controls.PatternCode
    var temp = this.patternCodeList.find(x => x.Key == e.target.value)

    if(temp != undefined){
      this.RefAttrForm.patchValue({
        PatternValue: temp.Value
      });
    }else{
      this.RefAttrForm.patchValue({
        PatternValue: ""
      });
    }
  }
  getLookupAttrValue(e) {
    this.RefAttrForm.patchValue({
      AttrValue: e.RefMasterTypeCode
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
            this.RefAttrForm.patchValue({
              AttrCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4
}
