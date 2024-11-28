import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { RefIndustryTypeObj } from 'app/shared/model/ref-industry-type-obj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { RefProfessionObj } from 'app/shared/model/ref-profession-obj.model';
import { RequestCustPersonalJobDataObj } from 'app/shared/model/request-cust-personal-job-data-obj.model';
import { CookieService } from 'ngx-cookie';
import { NewCustSetData } from '../new-cust-component/NewCustSetData.Service';
import { JobAddrSectionComponent } from './job-addr-section/job-addr-section.component';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-cust-personal-job-data',
  templateUrl: './cust-personal-job-data.component.html',
})
export class CustPersonalJobDataComponent implements OnInit {

  @ViewChild('JobAddrForm') jobAddrForm: JobAddrSectionComponent;
  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  CustomerJobForm: FormGroup = this.fb.group({});
  DictCustAddr: { [Id: string]: CustAddrObj } = {};

  readonly RefMasterTypeCodeJobStat: string = CommonConstant.RefMasterTypeCodeJobStat;
  readonly RefMasterTypeCodeCoyScale: string = CommonConstant.RefMasterTypeCodeCoyScale;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel; //mapping code CommonConstant.CustTypePersonal
  readonly RefMasterTypeCodeInvestmentType: string = CommonConstant.RefMasterTypeCodeInvestmentType;

  private ucLookupProfession: UclookupgenericComponent;
  @ViewChild('LookupProfession') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupProfession = content;
    }
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew, private newCustService: NewCustSetData) { }

  async ngOnInit() {
    this.InitData();
    await this.GetExisting();
    // this.PatchCriteriaLookupProfession();
    this.professionLookUpObj.isReady = true;
    this.companyLookupObj.isReady = true;
    this.industryLookUpObj.isReady = false;
    this.jobPositionLookupObj.isReady = true;
  }

  //#region Get
  businessDtMin: Date;
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  InitData() {
    this.BindLookupProfession();
    this.BindLookupCompany();
    this.BindLookupIndustry();
    this.BindLookupJobPosition();

    this.DictUcDDLObj[this.RefMasterTypeCodeJobStat] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeJobStat);
    this.DictUcDDLObj[this.RefMasterTypeCodeCoyScale] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCoyScale);
    this.DictUcDDLObj[this.RefMasterTypeCodeInvestmentType] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeInvestmentType);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel].ddlType = UcDropdownListConstant.DDL_TYPE_BLANK;

    this.ResetForm();

    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
  }

  ResetForm() {
    this.CustomerJobForm = this.fb.group({
      MrCustModelCode: ['', Validators.required],
      RefProfessionId: [0, Validators.required],
      CoyName: [''],
      MrJobPositionCode: [''],
      RefIndustryTypeId: [0],
      MrJobStatCode: [''],
      ProfessionalNo: [''],
      JobTitleName: [''],
      EmploymentEstablishmentDt: [''],
      IsMfEmp: [false],
      IsWellknownCoy: [false],
      MrWellknownCoyCode: [''],
      MrCoyScaleCode: [''],
      NoOfEmploy: [''],
      MrInvestmentTypeCode: [''],
      EmpNo: [''],
      RowVersion: [''],
      RefSectorEconomySlikId: [0],
    });
  }

  //#region Bind lookup
  professionLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupProfession() {
    this.professionLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.professionLookUpObj.isRequired = true;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
  }

  companyLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupCompany() {
    this.companyLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.companyLookupObj.urlJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.pagingJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.genericJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.isRequired = true;

    this.companyLookupObj.addCritInput = new Array();
    let ArrAddCritCoy = new Array<CriteriaObj>();
    let critCoyObj = new CriteriaObj();
    critCoyObj.DataType = "text";
    critCoyObj.propName = 'REF_MASTER_TYPE_CODE';
    critCoyObj.restriction = AdInsConstant.RestrictionEq;
    critCoyObj.value = "WELLKNOWN_COY";
    ArrAddCritCoy.push(critCoyObj);

    let critCoyObj1 = new CriteriaObj();
    critCoyObj1.DataType = "text";
    critCoyObj1.propName = 'IS_ACTIVE';
    critCoyObj1.restriction = AdInsConstant.RestrictionEq;
    critCoyObj1.value = "1";
    ArrAddCritCoy.push(critCoyObj1);
    this.companyLookupObj.addCritInput = ArrAddCritCoy;
  }

  industryLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupIndustry() {
    this.industryLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.industryLookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.isRequired = false;
  }

  jobPositionLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupJobPosition() {
    this.jobPositionLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.jobPositionLookupObj.isRequired = false;
    this.jobPositionLookupObj.urlJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.pagingJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.genericJson = "./assets/uclookup/Customer/lookupJobPosition.json";
  }
  //#endregion
  //#endregion

  tempCustPersonalJobDataObj: CustPersonalJobDataObj = new CustPersonalJobDataObj();
  async GetExisting() {
    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }).subscribe(
      async (response: CustObj) => {
        this.CustomerJobForm.patchValue({
          MrCustModelCode: response.MrCustModelCode,
        });
        this.changeCustModel();
      }
    )
    await this.http.post(this.UrlConstantNew.GetCustPersonalJobDataByCustId, { Id: this.CustId }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        if (response.CustPersonalJobDataId != 0) {
          this.tempCustPersonalJobDataObj = response;
          let datePipe = new DatePipe("en-US");
          this.CustomerJobForm.patchValue({
            IsWellknownCoy: response.IsWellknownCoy == null ? false : response.IsWellknownCoy,
            IsMfEmp: response.IsMfEmp == null ? false : response.IsMfEmp,
            ProfessionalNo: response.ProfessionalNo,
            JobTitleName: response.JobTitleName,
            MrJobStatCode: response.MrJobStatCode,
            MrCoyScaleCode: response.MrCoyScaleCode,
            MrJobPositionCode: response.MrJobPositionCode,
            NoOfEmploy: response.NoOfEmploy,
            EmploymentEstablishmentDt: datePipe.transform(response.EmploymentEstablishmentDt, 'yyyy-MM-dd'),
            MrWellknownCoyCode: response.MrWellknownCoyCode,
            CoyName: response.CoyName,
          });
          this.companyLookupObj.nameSelect = this.tempCustPersonalJobDataObj.CoyName;
          this.companyLookupObj.jsonSelect = { Descr: this.tempCustPersonalJobDataObj.CoyName };

          if (response.RefProfessionId != null) {
            if (!response.RefProfessionId) return;
            this.CustomerJobForm.patchValue({
              RefProfessionId: response.RefProfessionId,
            });
            this.http.post(this.UrlConstantNew.GetRefProfessionByRefProfessionId, { Id: response.RefProfessionId }).subscribe(
              (response: RefProfessionObj) => {
                this.professionLookUpObj.nameSelect = response.ProfessionName;
                this.professionLookUpObj.jsonSelect = response;
              });
          }

          if (response.RefIndustryTypeId != null) {
            if (!response.RefIndustryTypeId) return;
            this.CustomerJobForm.patchValue({
              RefIndustryTypeId: response.RefIndustryTypeId,
            });
            this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: response.RefIndustryTypeId }).subscribe(
              (response: RefIndustryTypeObj) => {
                this.industryLookUpObj.nameSelect = response.IndustryTypeName;
                this.industryLookUpObj.jsonSelect = response;
              }
            );
          }

          this.CustomerJobForm.patchValue({
            MrJobPositionCode: response.MrJobPositionCode,
          });
          let tempDesc: string = await this.PatchValueDesc(response.MrJobPositionCode, CommonConstant.RefMasterTypeCodeJobPosition);
          this.jobPositionLookupObj.nameSelect = tempDesc;
          this.jobPositionLookupObj.jsonSelect = { JobDesc: tempDesc };
        }
      }
    );
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

  //#region Change
  dictIsShow: { [Id: string]: boolean } = {};
  changeCustModel() {
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;

    let tempForm: FormGroup = this.CustomerJobForm as FormGroup;
    this.ClearValidatorAllForm(tempForm);
    switch (tempCustModel) {
      case CommonConstant.CUST_MODEL_EMP:
        this.requiredInEmp(tempForm);
        this.CheckRequiredCompanyName();
        break;
      case CommonConstant.CUST_MODEL_SME:
        this.requiredInSme(tempForm);
        this.CheckRequiredCompanyName();
        break;
      case CommonConstant.CUST_MODEL_PROF:
        this.requiredInProf();
        break;
      case CommonConstant.CUST_MODEL_NONPROF:
        this.requiredInNonProf(tempForm);
        break;
    }
    tempForm.get("RefIndustryTypeId").updateValueAndValidity();
    tempForm.get("EmploymentEstablishmentDt").updateValueAndValidity();
    tempForm.get("MrCoyScaleCode").updateValueAndValidity();
    tempForm.get("MrInvestmentTypeCode").updateValueAndValidity();

    this.PatchCriteriaLookupProfession();
  }

  //#region change validator
  CheckRequiredCompanyName() {
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;
    let tempMrWellknownCoyCode = this.CustomerJobForm.get("MrWellknownCoyCode");
    let tempCoyName = this.CustomerJobForm.get("CoyName");
    let tempIsWellknownCoy: boolean = this.CustomerJobForm.get("IsWellknownCoy").value;

    if (tempIsWellknownCoy) {
      if (tempCustModel == CommonConstant.CUST_MODEL_EMP || tempCustModel == CommonConstant.CUST_MODEL_SME) {
        this.companyLookupObj.isRequired = true;
        tempMrWellknownCoyCode.setValidators(Validators.required);
        tempCoyName.setValidators(Validators.required);
        tempMrWellknownCoyCode.updateValueAndValidity();
        tempCoyName.updateValueAndValidity();
        return;
      }
    }
    tempMrWellknownCoyCode.patchValue("");
    tempMrWellknownCoyCode.clearValidators();
    tempCoyName.clearValidators();
    this.companyLookupObj.isRequired = false;
    tempMrWellknownCoyCode.updateValueAndValidity();
    tempCoyName.updateValueAndValidity();
  }

  ClearValidatorAllForm(tempForm: FormGroup) {
    this.dictIsShow["RefIndustryTypeId"] = true;
    this.dictIsShow["JobTitleName"] = true;
    this.dictIsShow["IsShowJobAddr"] = true;

    this.dictIsShow["MrJobStatCode"] = false;
    this.dictIsShow["IsWellknownCoy"] = false;
    this.dictIsShow["MrJobPositionCode"] = false;
    this.dictIsShow["IsMfEmp"] = false;
    this.dictIsShow["NoOfEmploy"] = false;
    this.dictIsShow["MrWellknownCoyCode"] = false;
    this.dictIsShow["EmploymentEstablishmentDt"] = false;
    this.dictIsShow["MrCoyScaleCode"] = false;
    this.dictIsShow["MrInvestmentTypeCode"] = false;
    this.dictIsShow["ProfessionalNo"] = false;

    tempForm.get("MrWellknownCoyCode").clearValidators();
    tempForm.get("EmploymentEstablishmentDt").clearValidators();
    tempForm.get("MrCoyScaleCode").clearValidators();
    tempForm.get("MrInvestmentTypeCode").clearValidators();
    tempForm.get("RefIndustryTypeId").setValidators(Validators.required);
  }

  requiredInEmp(tempForm: FormGroup) {
    tempForm.get("EmploymentEstablishmentDt").setValidators(Validators.required);
    tempForm.get("MrCoyScaleCode").setValidators(Validators.required);
    this.dictIsShow["MrWellknownCoyCode"] = true;
    this.dictIsShow["MrCoyScaleCode"] = true;
    this.dictIsShow["EmploymentEstablishmentDt"] = true;
    this.dictIsShow["NoOfEmploy"] = true;
    this.dictIsShow["IsMfEmp"] = true;
    this.dictIsShow["MrJobPositionCode"] = true;
    this.dictIsShow["IsWellknownCoy"] = true;
    this.dictIsShow["MrJobStatCode"] = true;
  }
  requiredInSme(tempForm: FormGroup) {
    tempForm.get("MrCoyScaleCode").setValidators(Validators.required);
    tempForm.get("MrInvestmentTypeCode").setValidators(Validators.required);
    this.dictIsShow["MrWellknownCoyCode"] = true;
    this.dictIsShow["MrCoyScaleCode"] = true;
    this.dictIsShow["MrInvestmentTypeCode"] = true;
    this.dictIsShow["NoOfEmploy"] = true;
    this.dictIsShow["MrJobPositionCode"] = true;
    this.dictIsShow["IsWellknownCoy"] = true;
  }
  requiredInProf() {
    this.dictIsShow["ProfessionalNo"] = true;
  }
  requiredInNonProf(tempForm: FormGroup) {
    tempForm.get("RefIndustryTypeId").clearValidators();
    this.dictIsShow["RefIndustryTypeId"] = false;
    this.dictIsShow["JobTitleName"] = false;
    this.dictIsShow["IsShowJobAddr"] = false;
  }
  //#endregion

  PatchCriteriaLookupProfession() {
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;

    if (tempCustModel != "") {
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
  }

  getLookUpProfession(event) {
    this.CustomerJobForm.patchValue({
      RefProfessionId: event.RefProfessionId,
    });
  }

  getLookUpIndustryType(event) {
    this.CustomerJobForm.patchValue({
      RefIndustryTypeId: event.RefIndustryTypeId,
    });
  }

  getLookUpJobPosition(ev) {
    this.CustomerJobForm.patchValue({
      MrJobPositionCode: ev.JobCode,
    });
  }

  getLookUpCompanyName(ev: RefMasterObj) {
    this.CustomerJobForm.patchValue({
      MrWellknownCoyCode: ev.MasterCode,
      CoyName: ev.Descr,
    });
  }
  //#endregion

  SaveForm() {
    // console.log(this.CustomerJobForm);
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;
    let reqObjSave: RequestCustPersonalJobDataObj = new RequestCustPersonalJobDataObj();
    reqObjSave.CustPersonalJobData = this.SetReqObjPersonalJobSave(tempCustModel);

    if (tempCustModel != CommonConstant.CUST_MODEL_NONPROF) {
      reqObjSave.JobAddr = this.SetAddrObj(CommonConstant.CustAddrTypeJob);
      reqObjSave.OthBizAddr = this.SetAddrObj(CommonConstant.CustAddrTypeOthBiz);
      reqObjSave.PreJobAddr = this.SetAddrObj(CommonConstant.CustAddrTypePreJob);
    }
    // console.log(reqObjSave);
    let urlSave: string = this.UrlConstantNew.AddCustPersonalJobData;
    if (this.tempCustPersonalJobDataObj.CustPersonalJobDataId != 0) urlSave = this.UrlConstantNew.EditCustPersonalJobData;
    this.http.post(urlSave, reqObjSave, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.outputTab.emit({ stepMode: "next" });
      }
    );
  }

  SetReqObjPersonalJobSave(CustModel: string): CustPersonalJobDataObj {
    let tempForm = this.CustomerJobForm.getRawValue();
    let tempPersonalJob: CustPersonalJobDataObj = new CustPersonalJobDataObj();
    tempPersonalJob.CustPersonalJobDataId = this.tempCustPersonalJobDataObj.CustPersonalJobDataId;
    tempPersonalJob.RowVersion = this.tempCustPersonalJobDataObj.RowVersion;
    tempPersonalJob.CustId = this.CustId;
    tempPersonalJob.RefProfessionId = tempForm["RefProfessionId"];
    if (CustModel != CommonConstant.CUST_MODEL_NONPROF) {
      tempPersonalJob.RefIndustryTypeId = tempForm["RefIndustryTypeId"];
      tempPersonalJob.JobTitleName = tempForm["JobTitleName"];
      tempPersonalJob.PrevCoyName = tempForm["PrevCoyName"];
      tempPersonalJob.PrevEmploymentDt = tempForm["PrevEmploymentDt"];
      tempPersonalJob.OthBizName = tempForm["OthBizName"];
      tempPersonalJob.OthBizIndustryTypeCode = tempForm["OthBizIndustryTypeCode"];
      tempPersonalJob.OthBizEstablishmentDt = tempForm["OthBizEstablishmentDt"];
      tempPersonalJob.OthBizType = tempForm["OthBizType"];
      tempPersonalJob.OthBizJobPosition = tempForm["OthBizJobPosition"];

      if (CustModel == CommonConstant.CUST_MODEL_PROF) {
        tempPersonalJob.ProfessionalNo = tempForm["ProfessionalNo"];
      } else {
        tempPersonalJob.IsWellknownCoy = tempForm["IsWellknownCoy"];
        tempPersonalJob.MrWellknownCoyCode = tempForm["MrWellknownCoyCode"];
        tempPersonalJob.CoyName = tempForm["CoyName"];
        tempPersonalJob.MrJobPositionCode = tempForm["MrJobPositionCode"];
        tempPersonalJob.MrCoyScaleCode = tempForm["MrCoyScaleCode"];
        tempPersonalJob.NoOfEmploy = tempForm["NoOfEmploy"];

        if (CustModel == CommonConstant.CUST_MODEL_SME) {
          tempPersonalJob.MrInvestmentTypeCode = tempForm["MrInvestmentTypeCode"];
        }
        if (CustModel == CommonConstant.CUST_MODEL_EMP) {
          tempPersonalJob.EmploymentEstablishmentDt = tempForm["EmploymentEstablishmentDt"];
          tempPersonalJob.MrJobStatCode = tempForm["MrJobStatCode"];
          tempPersonalJob.IsMfEmp = tempForm["IsMfEmp"];
        }
      }
    }
    return tempPersonalJob;
  }

  SetAddrObj(addrTypeCode: string): CustAddrObj {
    let tempAddrObj: CustAddrObj = new CustAddrObj();
    let tempJobForm = this.CustomerJobForm.get(addrTypeCode + 'UcAddress') as FormGroup;
    let tempJobZipCodeForm = this.CustomerJobForm.get(addrTypeCode + 'UcAddressZipcode') as FormGroup;
    let tempJobValue = tempJobForm.getRawValue();
    let tempJobZipCodeValue = tempJobZipCodeForm.getRawValue();
    tempAddrObj.CustAddrId = this.DictCustAddr[addrTypeCode].CustAddrId;
    tempAddrObj.CustId = this.CustId;
    tempAddrObj.RowVersion = this.DictCustAddr[addrTypeCode].RowVersion;
    tempAddrObj.MrCustAddrTypeCode = addrTypeCode;
    tempAddrObj.Addr = tempJobValue.Addr;
    tempAddrObj.FullAddr = tempJobValue.Addr + " RT: " + tempJobValue.AreaCode4 + " RW: " + tempJobValue.AreaCode3 + " " + tempJobValue.AreaCode2 + ", " + tempJobValue.AreaCode1 + " " + tempJobZipCodeValue.value;
    tempAddrObj.AreaCode3 = tempJobValue.AreaCode3;
    tempAddrObj.AreaCode4 = tempJobValue.AreaCode4;
    tempAddrObj.Zipcode = tempJobZipCodeValue.value;
    tempAddrObj.AreaCode1 = tempJobValue.AreaCode1;
    tempAddrObj.AreaCode2 = tempJobValue.AreaCode2;
    tempAddrObj.City = tempJobValue.City;
    tempAddrObj.PhnArea1 = tempJobValue.PhnArea1;
    tempAddrObj.Phn1 = tempJobValue.Phn1;
    tempAddrObj.PhnExt1 = tempJobValue.PhnExt1;
    tempAddrObj.PhnArea2 = tempJobValue.PhnArea2;
    tempAddrObj.Phn2 = tempJobValue.Phn2;
    tempAddrObj.PhnExt2 = tempJobValue.PhnExt2;
    tempAddrObj.PhnArea3 = tempJobValue.PhnArea3;
    tempAddrObj.Phn3 = tempJobValue.Phn3;
    tempAddrObj.PhnExt3 = tempJobValue.PhnExt3;
    tempAddrObj.FaxArea = tempJobValue.FaxArea;
    tempAddrObj.Fax = tempJobValue.Fax;
    tempAddrObj.MrBuildingOwnershipCode = tempJobValue.MrHouseOwnershipCode;
    
    return tempAddrObj
  }

  getFormValidationErrors() {
    const invalid = [];
    const controls = this.CustomerJobForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name);
      }
    }
    console.log(invalid);
  }
}
