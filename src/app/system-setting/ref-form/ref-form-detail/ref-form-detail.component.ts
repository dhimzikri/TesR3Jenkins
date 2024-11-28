import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { RefFormObj } from 'app/shared/model/ref-form-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ParameterObj } from 'app/shared/model/parameter-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ref-form-detail',
  templateUrl: './ref-form-detail.component.html',
  styleUrls: ['./ref-form-detail.component.scss'],
 // providers: [NGXToastrService]
})
export class RefFormDetailComponent implements OnInit {
  itemModuleType: Array<KeyValueObj> = new Array();
  itemClassType: Array<KeyValueObj> = new Array();
  inputLookupParentObj: any;
  mode: string = "add";
  refFormObj: RefFormObj = new RefFormObj;
  RefFormId: number;
  checkClass: boolean = false;
  parameterObj: Array<ParameterObj> = new Array<ParameterObj>();
  ddlTemplateIcon: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  // IsTextMode: boolean = false;

  private ucLookupParentForm: UclookupgenericComponent;
  @ViewChild('LookupExistingParent') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupParentForm = content;
    }
  }
  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_REF_FORM_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['RefFormId'] != null) this.RefFormId = queryParams['RefFormId'];
      if (queryParams['mode'] != null) this.mode = queryParams['mode'];
    });
  }

  RefForm = this.fb.group({
    RefModuleId: [''],
    Class: [''],
    FormCode: ['', Validators.required],
    Title: ['', Validators.required],
    Path: ['', Validators.required],
    Icon: [''],
    OrderNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    HierarchyNo: [1, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.max(3)]],
    IsHidden: false,
    IsExternalLink: false,
    RowVersion: ['']
  });
  ParamForm = this.fb.group({
    ParameterValue: [''],
    ParameterAttribute: ['']
  });
  async ngOnInit() { 
    this.checkIsAutoFormNoFromSetting("FR");
    this.ddlTemplateIcon.apiUrl = this.UrlConstantNew.GetTemplateIcon;
    this.ddlTemplateIcon.requestObj = {};
    this.ddlTemplateIcon.ddlType = UcDropdownListConstant.DDL_TYPE_NONE;

    await this.http.post(this.UrlConstantNew.GetListRefModuleKeyValue, {}).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.itemModuleType = response[CommonConstant.ReturnObj];
          if (this.mode == "add") {
            this.RefForm.patchValue({
              RefModuleId: this.itemModuleType[0].Key
            });
          }
        }
      }
    );


    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeFormClass }).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.itemClassType = response[CommonConstant.ReturnObj];
          if (this.mode == "add") {
            this.RefForm.patchValue({
              Class: this.itemClassType[0].Key
            });
            this.CheckClass();
          }
        }
      }
    );

    if (this.mode == "edit") {
      this.http.post<RefFormObj>(this.UrlConstantNew.GetRefFormDataByRefFormId, { Id: this.RefFormId }).subscribe(
        (response) => {
          this.refFormObj = response;
          this.refFormObj.RefFormId = this.RefFormId;
          this.parameterObj = this.refFormObj.ParameterList;
          this.refFormObj.RowVersion = this.refFormObj.RowVersion;
          this.RefForm.patchValue({
            RefModuleId: this.refFormObj.RefModuleId,
            Class: this.refFormObj.Class,
            FormCode: this.refFormObj.FormCode,
            Title: this.refFormObj.Title,
            Path: this.refFormObj.Path,
            Icon: this.refFormObj.Icon,
            OrderNo: this.refFormObj.OrderNo,
            HierarchyNo: this.refFormObj.HierarchyNo,
            IsHidden: this.refFormObj.IsHidden,
            IsExternalLink: this.refFormObj.IsExternalLink,
            RowVersion: this.refFormObj.RowVersion,
          });
          this.RefForm.controls.FormCode.disable();
          this.setLookup();
          this.CheckClass();
          this.setClassCheck();
        }
      );
    } else {
      this.mode = "add";
      this.setLookup();
    }
  }

  // changeTextMode(ev: MatSlideToggleChange) {
  //   this.IsTextMode = ev.checked;
  // }

  AddParam() {
    if (this.ParamForm.controls.ParameterAttribute.value == "" || this.ParamForm.controls.ParameterValue.value == "") {
      this.toastr.errorMessage("Parameter Attribute and Parameter Value cannot be empty.")
      return;
    }
    var paramObj = new ParameterObj();
    paramObj.Attr = this.ParamForm.controls.ParameterAttribute.value;
    paramObj.Value = this.ParamForm.controls.ParameterValue.value;
    this.parameterObj.push(paramObj);
    this.ParamForm.reset();

  }

  CheckClass() {
    if (this.RefForm.controls.Class.value == "has-sub") {
      this.RefForm.patchValue({
        Path: ""
      });
      if (this.refFormObj.IsHaveChild) this.RefForm.controls.Class.disable();
      this.RefForm.controls.Path.clearValidators();
      this.RefForm.controls.Path.disable();
      this.checkClass = false;
    } else {
      if (this.refFormObj.IsHaveChild) {
        this.RefForm.patchValue({
          Class: "has-sub"
        });
        this.RefForm.controls.Class.disable();
        this.toastr.warningMessage("This form have lower hierarchy in this form.");
        return;
      }
      this.RefForm.controls.Path.setValidators(Validators.required);
      this.RefForm.controls.Path.enable();
      this.checkClass = true;
    }
    this.RefForm.controls.Path.updateValueAndValidity();
    this.RefForm.controls.Class.updateValueAndValidity();
  }

  setLookup(isNew: boolean = true) {
    let tempHierachyNo = 1;
    let tempListHierachyNo = [1, 2];
    if (isNew) {
      this.inputLookupParentObj = new InputLookupObj(this.UrlConstantNew);
      this.inputLookupParentObj.urlJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
      this.inputLookupParentObj.pagingJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
      this.inputLookupParentObj.genericJson = "./assets/uclookup/refForm/lookupRefFormParent.json";
      this.inputLookupParentObj.isRequired = false;
    }
    if (this.refFormObj.IsHaveChild) {
      this.inputLookupParentObj.isRequired = true;
      tempHierachyNo = this.refFormObj.HierarchyNo;
      if (tempHierachyNo == 1) {
        this.inputLookupParentObj.isRequired = false;
        this.inputLookupParentObj.isDisable = true;
      } else if (tempHierachyNo == 2) {
        tempListHierachyNo = [1];
      }
    }
    this.inputLookupParentObj.addCritInput = new Array();

    var critInput = new CriteriaObj();
    critInput.propName = "RF.CLASS";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = "has-sub";
    this.inputLookupParentObj.addCritInput.push(critInput);

    critInput = new CriteriaObj();
    critInput.propName = "RF.HIERARCHY_NO";
    critInput.restriction = AdInsConstant.RestrictionIn;
    critInput.listValue = tempListHierachyNo;
    this.inputLookupParentObj.addCritInput.push(critInput);

    critInput = new CriteriaObj();
    critInput.propName = "RF.REF_MODULE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefForm.get("RefModuleId").value;
    this.inputLookupParentObj.addCritInput.push(critInput);

    this.setClassCheck();
    if (!isNew) {
      this.inputLookupParentObj.nameSelect = "";
      this.inputLookupParentObj.jsonSelect = { Title: "" };
      this.refFormObj.ParentId = null;
      this.refFormObj.HierarchyNo = tempHierachyNo;
      this.RefForm.patchValue({
        HierarchyNo: tempHierachyNo
      });
      this.ucLookupParentForm.setAddCritInput();
      // this.ucLookupParentForm.initiateForm();
    }
    this.inputLookupParentObj.isReady = true;

    if (this.refFormObj.ParentTitle != "") {
      this.inputLookupParentObj.jsonSelect = { Title: this.refFormObj.ParentTitle }
    }
  }

  getLookupParent(ev) {
    this.refFormObj.ParentId = ev.RefFormId;
    this.refFormObj.HierarchyNo = ev.HierarchyNo + 1;
    this.RefForm.patchValue({
      HierarchyNo: ev.HierarchyNo + 1
    });

    this.setClassCheck();
  }

  setClassCheck() {
    if (this.refFormObj.HierarchyNo == 3) {
      this.RefForm.patchValue({
        Class: "no-sub"
      });
      this.RefForm.get("Class").disable();
      this.RefForm.get("Path").setValidators(Validators.required);
      this.RefForm.get("Path").enable();
      this.RefForm.get("Path").updateValueAndValidity();
      this.checkClass = true;
    } else {
      if (this.refFormObj.IsHaveChild) this.RefForm.get("Class").disable();
      else this.RefForm.get("Class").enable();
    }
    this.RefForm.get("Class").updateValueAndValidity();
  }

  DeleteParam(i: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.parameterObj.splice(i, 1)
    }
  }

  SaveForm() {
    this.refFormObj.RefModuleId = this.RefForm.controls.RefModuleId.value;
    this.refFormObj.Class = this.RefForm.controls.Class.value;
    this.refFormObj.FormCode = this.RefForm.controls.FormCode.value;
    this.refFormObj.Title = this.RefForm.controls.Title.value;
    this.refFormObj.Icon = this.RefForm.controls.Icon.value;
    this.refFormObj.OrderNo = this.RefForm.controls.OrderNo.value;
    this.refFormObj.HierarchyNo = this.RefForm.controls.HierarchyNo.value;
    this.refFormObj.IsHidden = this.RefForm.controls.IsHidden.value;
    this.refFormObj.IsExternalLink = this.RefForm.controls.IsExternalLink.value;
    this.refFormObj.ParameterList = this.parameterObj;

    if (this.refFormObj.Class == "has-sub") {
      this.refFormObj.Path = "";
    } else if (this.refFormObj.Class == "no-sub") {
      this.refFormObj.Path = this.RefForm.controls.Path.value;
    }

    if (this.mode == "edit") {
      this.refFormObj.RowVersion = this.RefForm.controls.RowVersion.value;
      this.http.post(this.UrlConstantNew.EditRefFormData, this.refFormObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SYSTEM_SETTING_REF_FORM_PAGING], {});

        });
    } else {
      this.http.post(this.UrlConstantNew.AddRefFormData, this.refFormObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SYSTEM_SETTING_REF_FORM_PAGING], {});
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
            this.RefForm.patchValue({
              FormCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}
