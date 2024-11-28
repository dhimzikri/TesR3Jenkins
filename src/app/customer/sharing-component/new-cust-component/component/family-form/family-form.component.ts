import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustFormExistingObj } from 'app/shared/model/new-cust/shareholder/shareholder-form-existing-obj.model';
import { RefCountry } from 'app/shared/model/ref-country.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { RefProfessionObj } from 'app/shared/model/ref-profession-obj.model';
import { CookieService } from 'ngx-cookie';
import { NewCustSetData } from '../../NewCustSetData.Service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FamilyFormComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Output() outputExisting: EventEmitter<CustFormExistingObj> = new EventEmitter();
  @Output() outputChange: EventEmitter<{ Key: string, Code: string }> = new EventEmitter();

  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;
  readonly RefMasterTypeCodeNationality: string = CommonConstant.RefMasterTypeCodeNationality;
  private ucLookupProfession: UclookupgenericComponent;
  @ViewChild('LookupProfession') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupProfession = content;
    }
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew, private newCustService: NewCustSetData) { }

  tempExisting: CustFormExistingObj = new CustFormExistingObj();
  CountryCode: string = "";
  CountryName: string = "";
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    await this.InitData();
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    this.DictUcDDLObj[this.RefMasterTypeCodeNationality] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeNationality, null, true);
    await this.GetExistingJobData();
    this.jobPositionLookupObj.isReady = true;
    this.lookUpObjCountry.isReady = true;
    this.professionLookUpObj.isReady = true;
    this.outputExisting.emit(this.tempExisting);
  }

  businessDtMin: Date;
  async InitData() {
    this.parentForm.addControl("EmploymentEstablishmentDt", this.fb.control(''));
    this.parentForm.addControl("MrNationalityCode", this.fb.control(CommonConstant.NationalityCodeLocal));
    this.parentForm.addControl("WnaCountryCode", this.fb.control(''));
    this.parentForm.addControl("MrJobPositionCode", this.fb.control(''));
    this.parentForm.addControl("RefProfessionId", this.fb.control(0));
    this.parentForm.addControl("MrJobProfessionCode", this.fb.control(''));

    this.BindLookupProfession();
    this.BindLookupJobPosition();
    await this.BindLookupCountry();
    this.GetListRefCountry();

    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
  }

  jobPositionLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupJobPosition() {
    this.jobPositionLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.jobPositionLookupObj.isRequired = false;
    this.jobPositionLookupObj.urlJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.pagingJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.genericJson = "./assets/uclookup/Customer/lookupJobPosition.json";
  }

  professionLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupProfession() {
    this.professionLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = "";
    listCriteriaObj.push(criteriaCustObj);
    this.professionLookUpObj.addCritInput = listCriteriaObj;
  }

  lookUpObjCountry: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  async BindLookupCountry() {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).toPromise().then(
      (response: GeneralSettingObj) => {
        this.lookUpObjCountry = new InputLookupObj(this.UrlConstantNew);
        this.lookUpObjCountry.urlJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObjCountry.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObjCountry.genericJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObjCountry.isRequired = false;

        let splitCodeDesc = response.GsValue.split(';');
        this.CountryCode = splitCodeDesc[0];
        this.CountryName = splitCodeDesc[1];
        let criteriaList = new Array();
        let criteriaObj = new CriteriaObj();
        criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        criteriaObj.propName = 'COUNTRY_CODE';
        criteriaObj.value = this.CountryCode;
        criteriaList.push(criteriaObj);
        this.lookUpObjCountry.addCritInput = criteriaList;
        this.parentForm.patchValue({
          WnaCountryCode: this.CountryCode
        });
        this.IsLocal = true;
      }
    );
  }

  

  GetRefCountry(code: string, isLocal: boolean = false) {
    this.http.post(this.UrlConstantNew.GetRefCountryByCountryCode, { Code: code }).subscribe(
      (response: RefCountry) => {
        if (isLocal) {
          this.CountryName = this.CountryName;
          this.IsLocal = true;
        }
        else {
          this.IsLocal = false;
          this.lookUpObjCountry.nameSelect = response.CountryName;
          this.lookUpObjCountry.jsonSelect = response;
        }
      }
    );
  }

  ListNationality: Array<RefMasterObj> = new Array();
  GetListRefCountry() {
    this.http.post(this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeNationality }).subscribe(
      (response) => {
        this.ListNationality = response["RefMasterObjs"];
      }
    );
  }

  async GetExistingJobData(custId: number = this.CustId) {
    if (custId == 0) return;
    await this.http.post(this.UrlConstantNew.GetCustPersonalJobDataByCustId, { Id: custId }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        if (!response.CustId) return;
        this.tempExisting.CustPersonalJob = response;
        let datePipe = new DatePipe("en-US");
        this.parentForm.patchValue({
          EmploymentEstablishmentDt: datePipe.transform(response.EmploymentEstablishmentDt, 'yyyy-MM-dd'),
          MrJobPositionCode: response.MrJobPositionCode,
          RefProfessionId: response.RefProfessionId,
        });
        let tempDesc: string = await this.PatchValueDesc(response.MrJobPositionCode, CommonConstant.RefMasterTypeCodeJobPosition);
        this.jobPositionLookupObj.nameSelect = tempDesc;
        this.jobPositionLookupObj.jsonSelect = { JobDesc: tempDesc };
        this.jobPositionLookupObj.isReady = true;
        if (!response.RefProfessionId) return;
        await this.http.post(this.UrlConstantNew.GetRefProfessionByRefProfessionId, { Id: response.RefProfessionId }).subscribe(
          (response: RefProfessionObj) => {
            this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: response.ProfessionCode });
            this.professionLookUpObj.nameSelect = response.ProfessionName;
            this.professionLookUpObj.jsonSelect = response;
          });
      }
    )
  }

  PatchExistingPersonalData(tempData: CustPersonalObj) {
    this.parentForm.patchValue({
      WnaCountryCode: tempData.WnaCountryCode,
      MrNationalityCode: tempData.MrNationalityCode ? tempData.MrNationalityCode : "",
    });
    if (tempData.WnaCountryCode) this.GetRefCountry(tempData.WnaCountryCode, tempData.WnaCountryCode == this.CountryCode);
  }

  async PatchValueDesc(MasterCode: string, refMasterTypeCode: string) {
    let reqMasterObj: ReqRefMasterByTypeCodeAndMasterCodeObj = {
      MasterCode: MasterCode,
      RefMasterTypeCode: refMasterTypeCode
    };
    let tempDesc: string = "";
    await this.http.post(this.UrlConstantNew.GetRefMasterByRefMasterTypeCodeAndMasterCode, reqMasterObj).toPromise().then(
      (response: RefMasterObj) => {
        tempDesc = response.Descr;
      }
    );
    return tempDesc;
  }

  getLookUpProfession(event: RefProfessionObj) {
    this.parentForm.patchValue({
      RefProfessionId: event.RefProfessionId,
    });
    this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: event.ProfessionCode });
  }

  getLookUpJobPosition(ev) {
    this.parentForm.patchValue({
      MrJobPositionCode: ev.JobCode,
    });
  }

  ResetLookupProfession(valueCode: string = null, valueDesc: string = "") {
    this.parentForm.patchValue({
      RefProfessionId: valueCode,
    });
    this.professionLookUpObj.nameSelect = valueDesc;
    this.professionLookUpObj.jsonSelect = { JobDesc: valueDesc };
    this.PatchCriteriaLookupProfession();
  }

  PatchCriteriaLookupProfession() {
    let tempCustModel: string = this.parentForm.get("MrCustModelCode").value;

    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = tempCustModel;
    listCriteriaObj.push(criteriaCustObj);

    this.professionLookUpObj.addCritInput = listCriteriaObj;
    this.ucLookupProfession.setAddCritInput();
  }

  getLookUpCountry(ev) {
    this.parentForm.patchValue({
      WnaCountryCode: ev.CountryCode,
    });
  }

  changeCustModel() {
    this.ResetLookupProfession();
    this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: "" });
  }

  IsLocal: boolean = true;
  onOptionsSelected(event: { selectedIndex: number, selectedObj: KeyValueObj, selectedValue: string }) {
    if (event.selectedValue == CommonConstant.NationalityCodeLocal) {
      this.IsLocal = true;
      this.lookUpObjCountry.isRequired = false;
      this.parentForm.patchValue({
        WnaCountryCode: this.CountryCode
      });
    } else {
      this.IsLocal = false;
      this.lookUpObjCountry.isRequired = true;
    }
  }
}
