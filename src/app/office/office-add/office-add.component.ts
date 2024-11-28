import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/office-obj.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
 // providers: [NGXToastrService]
})
export class OfficeAddComponent implements OnInit {

  // @ViewChild(UcAddressComponent) ucAddr;
  // @ViewChild(UcContactInfoComponent) ucContact;
  // @ViewChild('ParentId') test: ElementRef;
  inputFieldAddr: InputFieldObj = new InputFieldObj(this.UrlConstantNew);
  pageType: string = "add";
  mrKonvenSyariah = 'KON';
  isDisabledState: boolean = false;
  isHO: boolean = true;
  RefOfficeId: number = 0;
  allOfficeType: any;
  allOfficeClass: any;
  allRefOrg: any;
  allOrgMdl: any;
  allKonSya: any;
  allOfficeParent: any;
  allRefOfficeArea: any;
  allHolidaySchm: any;
  allWorkingHourSchm: any;
  allRefTaxOffice: any;
  allCgType: any;
  lookupOfficeType: any;
  mrCgType: any;
  MrOfficeClassCode: any;
  mrOfficeType: any;
  refOrgId: any;
  orgMdlId: any;
  parentId: any;
  refOfficeAreaId: any = '';
  holidaySchmHId: any;
  workingHourSchmHId: any;
  hierarchyNo: any;
  officeCode: any;
  officeName: any;
  officeShortName: any;
  resultData: any;
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  officeObj: OfficeObj;
  arrCrit: any;
  
  resultDataLawCourt: any;

  cbIsNationalCourt: boolean;

  OfficeForm = this.fb.group({
    OfficeCode: ['', Validators.required],
    OfficeName: ['', Validators.required],
    OfficeShortName: [''],
    OfficeType: ['', Validators.required],
    OfficeParent: ['', Validators.required],
    KonSya: ['', Validators.required],
    MrOfficeClassCode: ['', Validators.required],
    HolidayScheme: ['', Validators.required],
    WorkingHourScheme: ['', Validators.required],
    MrCenterGrpTypeCode: ['', Validators.required],
    CntctPersonName: ['', Validators.required],
    CntctPersonJobTitle: ['', Validators.required],
    CntctPersonEmail1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    CntctPersonEmail2: ['', Validators.pattern(CommonConstant.regexEmail)],
    CntctPersonMobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    CntctPersonMobilePhnNo2: ['', [Validators.pattern('^[0-9]+$')]],
    HierarchyLvl: ['', Validators.required],
    IsActive: false,
    IsHaveCashier: false,
    OfficeClose: false,
    AllowAppCreated: false,
    IsNationalCourt: false,
    NationalCourtOffice: [''],
    RefTaxOfficeId: [null]
  })
  InputLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  addressObj: UcAddressObj = new UcAddressObj();
  inputAddressObj: InputAddressObj = new InputAddressObj(this.UrlConstantNew);
  InputLookupTaxOfficeObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  readonly CancelLink: string = NavigationConstant.OFFICE_PAGING;
  responseRefOfficeX: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.pageType = queryParams['mode'];
      }
      if (queryParams['RefOfficeId'] != null) {
        this.RefOfficeId = queryParams['RefOfficeId'];
      }
    });
  }
  async ngOnInit() {
    this.InputLookupObj.urlJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupObj.isRequired = true;
    this.InputLookupObj.addCritInput = new Array();

    this.InputLookupTaxOfficeObj.urlJson = "./assets/lookup/lookupTaxOffice.json";
    this.InputLookupTaxOfficeObj.addCritInput = new Array();
    
    await this.GetGsMaxHierarchyLvl();

    await this.GetMasterData();
    if (this.pageType == "edit") {
      this.OfficeForm.controls["OfficeCode"].disable();
      this.OfficeForm.controls["OfficeType"].disable();
      this.OfficeForm.controls["MrCenterGrpTypeCode"].disable();
      this.isDisabledHierarchyLvlDdl = "true";
      this.officeObj = new OfficeObj();
      this.addressObj = new UcAddressObj();
      this.officeObj.RefOfficeId = this.RefOfficeId;
      await this.http.post(this.UrlConstantNew.GetRefOfficeDetailByRefOfficeId, { Id: this.RefOfficeId }).toPromise().then(
        (response) => {
          this.resultData = response;
          
          this.InputLookupObj.jsonSelect = { OfficeCode: this.resultData.ParentOfficeCode, RefOfficeId: this.resultData.ParentId };
          this.InputLookupObj.nameSelect = this.resultData["ParentOfficeCode"];
          this.InputLookupObj.jsonSelect = { OfficeCode: this.resultData["ParentOfficeCode"] };
          
          this.InputLookupTaxOfficeObj.jsonSelect = { TaxOfficeName: this.resultData.TaxOfficeName};
          this.InputLookupTaxOfficeObj.nameSelect = this.resultData.TaxOfficeName;

          this.OfficeForm.patchValue({
            OfficeCode: this.resultData.OfficeCode,
            OfficeName: this.resultData.OfficeName,
            OfficeParent: this.resultData.ParentId,
            OfficeType: this.resultData.MrOfficeTypeCode,
            OfficeShortName: this.resultData.OfficeShortName,
            MrCenterGrpTypeCode: this.resultData.MrCenterGrpTypeCode,
            MrOfficeClassCode: this.resultData.MrOfficeClassCode,
            KonSya: this.resultData.MrKonvenSyariahCode,
            HolidayScheme: this.resultData.HolidaySchmHId,
            WorkingHourScheme: this.resultData.WorkingHourSchmHId,
            IsActive: this.resultData.IsActive,
            IsHaveCashier: this.resultData.IsHaveCashier,
            OfficeClose: this.resultData.IsOfficeClose,
            AllowAppCreated: this.resultData.IsAllowAppCreated,
            CntctPersonName: this.resultData.CntctPersonName,
            CntctPersonJobTitle: this.resultData.CntctPersonJobTitle,
            CntctPersonEmail1: this.resultData.CntctPersonEmail1,
            CntctPersonEmail2: this.resultData.CntctPersonEmail2,
            CntctPersonMobilePhnNo1: this.resultData.CntctPersonMobilePhnNo1,
            CntctPersonMobilePhnNo2: this.resultData.CntctPersonMobilePhnNo2,
            HierarchyLvl: this.resultData.HierarchyLvl.toString(),
            RefTaxOfficeId: this.resultData.RefTaxOfficeId,
            // IsNationalCourt: this.resultData.IsNationalCourt,
            // NationalCourtOffice: this.resultData.NationalCourtOffice
          });

          this.addressObj.Addr = this.resultData.OfficeAddr;
          this.addressObj.AreaCode4 = this.resultData.AreaCode4;
          this.addressObj.AreaCode3 = this.resultData.AreaCode3;
          this.addressObj.AreaCode2 = this.resultData.AreaCode2;
          this.addressObj.AreaCode1 = this.resultData.AreaCode1;
          this.addressObj.City = this.resultData.City;
          this.addressObj.PhnArea1 = this.resultData.PhnArea1;
          this.addressObj.Phn1 = this.resultData.Phn1;
          this.addressObj.PhnExt1 = this.resultData.PhnExt1
          this.addressObj.PhnArea2 = this.resultData.PhnArea2
          this.addressObj.Phn2 = this.resultData.Phn2
          this.addressObj.PhnExt2 = this.resultData.PhnExt2
          this.addressObj.PhnArea3 = this.resultData.PhnArea3
          this.addressObj.Phn3 = this.resultData.Phn3
          this.addressObj.PhnExt3 = this.resultData.PhnExt3
          this.addressObj.FaxArea = this.resultData.FaxArea
          this.addressObj.Fax = this.resultData.Fax
          this.inputFieldAddr.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
          this.inputFieldAddr.inputLookupObj.jsonSelect = { Zipcode: this.resultData.Zipcode };
          this.inputFieldAddr.inputLookupObj.nameSelect = this.resultData.Zipcode;

          this.cbIsNationalCourt = this.resultData.IsNationalCourt;

          if (this.cbIsNationalCourt == true) {
            this.OfficeForm.controls.NationalCourtOffice.enable()
            this.OfficeForm.controls.NationalCourtOffice.clearValidators();
            this.OfficeForm.controls.NationalCourtOffice.setValidators([Validators.required]);
          } else {
            this.OfficeForm.controls.NationalCourtOffice.disable()
            this.OfficeForm.controls.NationalCourtOffice.clearValidators();
          }
          this.OfficeForm.controls.NationalCourtOffice.updateValueAndValidity();
        })
    }
    this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputAddressObj.default = this.addressObj;
    this.inputAddressObj.inputField = this.inputFieldAddr;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
    this.HierarchyLvlDdl.isCustomList = true;
    this.HierarchyLvlDdl.isSelectOutput = true;
    this.HierarchyLvlDdl.isReady = true;
    this.InputLookupObj.isReady = true;
    this.checkType();
    if (this.pageType == "edit") {
      setTimeout(() => {
        let tempObj: KeyValueObj = new KeyValueObj();
        tempObj.Key = this.resultData.HierarchyLvl;
        tempObj.Value = this.resultData.HierarchyLvl;
        this.changeHierarchy(tempObj);
      }, 500);
    }
  }

  async GetMasterData() {
    let isAdd: boolean = this.pageType == "add";

    await this.http.post(this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeOfficeType }).toPromise().then(
      (response) => {
        if (response['RefMasterObjs'].length > 0) {
          this.lookupOfficeType = response['RefMasterObjs'];
        }
      });

    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeOfficeClass}).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allOfficeClass = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              MrOfficeClassCode: this.allOfficeClass[0].Key
            });
          }
        }
      });

    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCenterGrpType}).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allCgType = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              MrCenterGrpTypeCode: this.allCgType[0].Key
            });
          }
        }

      });

    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeKonvenSyariah}).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allKonSya = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              KonSya: this.allKonSya[0].Key
            });
          }
        }
      });

    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeOfficeType}).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allOfficeType = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              OfficeType: this.allOfficeType[0].Key
            });
          }
        }
      });

    await this.http.post(this.UrlConstantNew.GetListActiveHolidaySchemeH, null).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allHolidaySchm = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              HolidayScheme: this.allHolidaySchm[0].HolidaySchmHId
            });
          }
        }
      });

    await this.http.post(this.UrlConstantNew.GetListActiveWorkingSchmH, null).toPromise().then(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allWorkingHourSchm = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              WorkingHourScheme: this.allWorkingHourSchm[0].WorkingHourSchmHId
            });
          }
        }
      });
  }

  MaxHierarchyLvl: number = 0;
  HierarchyLvlDdl: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  isDisabledHierarchyLvlDdl: string = '';
  listMaxHierarchyLvl: Array<KeyValueObj> = new Array();
  async GetGsMaxHierarchyLvl() {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeMaxHierarchyLvlOffice }).toPromise().then(
      (response: {GsValue: string}) => {
        this.MaxHierarchyLvl = +response.GsValue;
      }
    )
  }

  SetListMaxHierarchyLvl() {
    let isHo: boolean = this.OfficeForm.get("OfficeType").value == CommonConstant.HeadOffice;
    this.listMaxHierarchyLvl = new Array();
    let tempHierarchyLvl: AbstractControl = this.OfficeForm.get("HierarchyLvl");
    if (this.CekCgHierarchyLvl(tempHierarchyLvl)) return;
    if (isHo) {
      this.listMaxHierarchyLvl.push(this.SetKeyValueObjHierarchyLvl(1));
      if (this.pageType != "edit") setTimeout(() => {
        tempHierarchyLvl.setValue("1");
      }, 500);
      return;
    }
    for (let index = 2; index <= this.MaxHierarchyLvl; index++) {
      this.listMaxHierarchyLvl.push(this.SetKeyValueObjHierarchyLvl(index));
    }
    if (this.pageType != "edit") tempHierarchyLvl.setValue("");
  }

  CekCgHierarchyLvl(tempHierarchyLvl: AbstractControl): boolean {
    if (this.OfficeForm.get("OfficeType").value != CommonConstant.CollectionGroup) return false;
    this.listMaxHierarchyLvl.push(this.SetKeyValueObjHierarchyLvl(2));
    if (this.pageType != "edit") setTimeout(() => {
      tempHierarchyLvl.setValue("2");
      
      let tempObj: KeyValueObj = new KeyValueObj();
      tempObj.Key = "2";
      tempObj.Value = "2";
      this.changeHierarchy(tempObj);
    }, 500);
    return true;
  }

  SetKeyValueObjHierarchyLvl(HierarchyLvl: number): KeyValueObj {
    let tempKeyValueObj: KeyValueObj = new KeyValueObj();
    tempKeyValueObj.Key = HierarchyLvl.toString();
    tempKeyValueObj.Value = HierarchyLvl.toString();
    return tempKeyValueObj;
  }
  
  private ucLookupParent: UclookupgenericComponent;
  @ViewChild('LookupParent') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupParent = content;
    }
  }

  changeHierarchy(ev: KeyValueObj) {
    let selectedLvl: number = +ev.Key;
    let listTempCritObj: Array<CriteriaObj> = new Array();
    
    //#region REF_OFFICE_ID criteria
    if (this.RefOfficeId != 0) {
      let critRefOfficeIdObj = new CriteriaObj();
      critRefOfficeIdObj.restriction = AdInsConstant.RestrictionNeq;
      critRefOfficeIdObj.propName = 'A.REF_OFFICE_ID';
      critRefOfficeIdObj.value = this.RefOfficeId.toString();
      listTempCritObj.push(critRefOfficeIdObj);
    } else {
      //#region resetValue parent
      this.InputLookupObj.nameSelect = "";
      this.InputLookupObj.jsonSelect = { OfficeCode: "" };
      this.OfficeForm.patchValue({ OfficeParent: 0 });
      //#endregion
    }
    //#endregion

    //#region MR_OFFICE_TYPE_CODE criteria
    let critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionIn;
    critObj.propName = 'MR_OFFICE_TYPE_CODE';
    critObj.listValue = new Array();
    let officeType: string = this.OfficeForm.get("OfficeType").value;
    if (officeType == CommonConstant.CollectionGroup) {
      critObj.listValue.push(CommonConstant.HeadOffice);
    }
    if (officeType == CommonConstant.Branch) {
      if (selectedLvl == 2) critObj.listValue.push(CommonConstant.HeadOffice);
      else critObj.listValue.push(CommonConstant.Branch);
    }
    // this.lookupOfficeType.forEach(element => {
    //   critObj.listValue.push(element.MasterCode);
    // });
    listTempCritObj.push(critObj);
    //#endregion

    //#region HIERARCHY_LVL criteria
    critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'A.HIERARCHY_LVL';
    critObj.value = selectedLvl - 1;
    listTempCritObj.push(critObj);
    //#endregion

    this.InputLookupObj.addCritInput = listTempCritObj;
    this.ucLookupParent.setAddCritInput();
  }

  SaveForm(): void {
    this.officeObj = new OfficeObj();
    this.officeObj.RowVersion = "";

    let tempOfficeForm = this.OfficeForm.getRawValue();
    console.log(tempOfficeForm);
    this.officeObj.OfficeCode = tempOfficeForm.OfficeCode;
    this.officeObj.OfficeShortName = tempOfficeForm.OfficeShortName;
    this.officeObj.OfficeName = tempOfficeForm.OfficeName;
    this.officeObj.MrOfficeClassCode = tempOfficeForm.MrOfficeClassCode;
    this.officeObj.IsActive = tempOfficeForm.IsActive;
    this.officeObj.IsHaveCashier = tempOfficeForm.IsHaveCashier;
    this.officeObj.IsAllowAppCreated = tempOfficeForm.AllowAppCreated;
    this.officeObj.HolidaySchmHId = tempOfficeForm.HolidayScheme;
    this.officeObj.WorkingHourSchmHId = tempOfficeForm.WorkingHourScheme;
    this.officeObj.MrKonvenSyariahCode = tempOfficeForm.KonSya;
    this.officeObj.MrOfficeTypeCode = tempOfficeForm.OfficeType;
    this.officeObj.IsOfficeClose = tempOfficeForm.OfficeClose;
    this.officeObj.CntctPersonName = tempOfficeForm.CntctPersonName;
    this.officeObj.CntctPersonJobTitle = tempOfficeForm.CntctPersonJobTitle;
    
    this.officeObj.ParentId = tempOfficeForm.OfficeParent;
    this.officeObj.HierarchyLvl = tempOfficeForm.HierarchyLvl;
    if (this.officeObj.MrOfficeTypeCode == CommonConstant.HeadOffice) {
      this.officeObj.ParentId = null;
      this.officeObj.HierarchyLvl = 1;
    }

    this.officeObj.MrCenterGrpTypeCode = "";
    if (this.officeObj.MrOfficeTypeCode == CommonConstant.CollectionGroup) {
      this.officeObj.MrCenterGrpTypeCode = tempOfficeForm.MrCenterGrpTypeCode;
    }

    this.officeObj.CntctPersonEmail1 = tempOfficeForm.CntctPersonEmail1;
    this.officeObj.CntctPersonEmail2 = tempOfficeForm.CntctPersonEmail2;
    this.officeObj.CntctPersonMobilePhnNo1 = tempOfficeForm.CntctPersonMobilePhnNo1;
    this.officeObj.CntctPersonMobilePhnNo2 = tempOfficeForm.CntctPersonMobilePhnNo2;

    this.officeObj.OfficeAddr = tempOfficeForm.UcAddress.Addr;
    this.officeObj.AreaCode4 = tempOfficeForm.UcAddress.AreaCode4;
    this.officeObj.AreaCode3 = tempOfficeForm.UcAddress.AreaCode3;
    this.officeObj.AreaCode2 = tempOfficeForm.UcAddress.AreaCode2;
    this.officeObj.AreaCode1 = tempOfficeForm.UcAddress.AreaCode1;
    this.officeObj.City = tempOfficeForm.UcAddress.City;
    this.officeObj.ZipCode = tempOfficeForm.UcAddressZipcode.value;
    this.officeObj.PhnArea1 = tempOfficeForm.UcAddress.PhnArea1;
    this.officeObj.Phn1 = tempOfficeForm.UcAddress.Phn1;
    this.officeObj.PhnExt1 = tempOfficeForm.UcAddress.PhnExt1;
    this.officeObj.PhnArea2 = tempOfficeForm.UcAddress.PhnArea2;
    this.officeObj.Phn2 = tempOfficeForm.UcAddress.Phn2;
    this.officeObj.PhnExt2 = tempOfficeForm.UcAddress.PhnExt2;
    this.officeObj.PhnArea3 = tempOfficeForm.UcAddress.PhnArea3;
    this.officeObj.Phn3 = tempOfficeForm.UcAddress.Phn2;
    this.officeObj.PhnExt2 = tempOfficeForm.UcAddress.PhnExt3;
    this.officeObj.FaxArea = tempOfficeForm.UcAddress.FaxArea;
    this.officeObj.Fax = tempOfficeForm.UcAddress.Fax;
    this.officeObj.RefTaxOfficeId = tempOfficeForm.RefTaxOfficeId;

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddRefOfficeV2_1, this.officeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);

          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.OFFICE_PAGING], {});
        }
      );
    }
    else {
      this.officeObj.OfficeCode = this.resultData.OfficeCode;
      this.officeObj.MrOfficeTypeCode = this.resultData.MrOfficeTypeCode
      this.officeObj.RefOfficeId = this.resultData.RefOfficeId;
      this.officeObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.UrlConstantNew.EditRefOfficeV2_1, this.officeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);

          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.OFFICE_PAGING], {});
        }
      );

    }
  }
  checkType() {
    this.InputLookupTaxOfficeObj.isReady = false;
    if (this.OfficeForm.controls.OfficeType.value == CommonConstant.HeadOffice) {
      this.OfficeForm.patchValue({
        OfficeParent: null
      });
      this.InputLookupObj.isRequired = false;
      this.InputLookupTaxOfficeObj.isRequired = true;
      this.OfficeForm.controls.OfficeParent.clearValidators();
      this.OfficeForm.controls.OfficeParent.updateValueAndValidity();
    }
    else {
      this.InputLookupObj.isRequired = true;
      if(this.OfficeForm.controls.OfficeType.value == CommonConstant.Branch){
        this.InputLookupTaxOfficeObj.isRequired = true;
      }else if(this.OfficeForm.controls.OfficeType.value == CommonConstant.CollectionGroup) {
        this.InputLookupTaxOfficeObj.isRequired = false;
      }
      this.OfficeForm.controls.OfficeParent.setValidators([Validators.required]);
      this.OfficeForm.controls.OfficeParent.updateValueAndValidity();
    }
    
    this.SetListMaxHierarchyLvl();
    this.InputLookupTaxOfficeObj.isReady = true;
  }
  toggleActive(e) {
    this.isActive = e.target.checked;
  }

  toggleAllowAppCreated(e) {
    this.isAllowAppCreated = e.target.checked;
  }
  getLookUp(ev) {
    this.OfficeForm.patchValue({
      OfficeParent: ev.RefOfficeId
    })
  }

  IsNationalCourtChange() {
    if (this.cbIsNationalCourt === true) {
      this.OfficeForm.controls.NationalCourtOffice.enable()
      this.OfficeForm.controls.NationalCourtOffice.clearValidators();
      this.OfficeForm.controls.NationalCourtOffice.setValidators([Validators.required]);
    } else {
      this.OfficeForm.controls.NationalCourtOffice.setValue("");
      this.OfficeForm.controls.NationalCourtOffice.disable()
      this.OfficeForm.controls.NationalCourtOffice.clearValidators();
    }
    this.OfficeForm.controls.NationalCourtOffice.updateValueAndValidity();
  }

  getLookUpTaxOffice(ev) {
    this.OfficeForm.patchValue({
      RefTaxOfficeId: ev.RefTaxOfficeId
    })
  }

}
