import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/new-cust/cust-company-mgmnt-shrholder-obj.model';
import { CustFormExistingObj as CustFormExistingObj } from 'app/shared/model/new-cust/shareholder/shareholder-form-existing-obj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { RefProfessionObj } from 'app/shared/model/ref-profession-obj.model';
import { CookieService } from 'ngx-cookie';
import { NewCustSetData } from '../../NewCustSetData.Service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ActivatedRoute } from '@angular/router';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-shareholder-form',
  templateUrl: './shareholder-form.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ShareholderFormComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() ParentCustId: number = 0;
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() CustType: string;
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Output() outputExisting: EventEmitter<CustFormExistingObj> = new EventEmitter();
  @Output() outputChange: EventEmitter<{ Key: string, Code: string }> = new EventEmitter();

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCompany: string = CommonConstant.CustomerCompany;

  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  private ucLookupProfession: UclookupgenericComponent;
  @ViewChild('LookupProfession') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupProfession = content;
    }
  }
  readonly CurrencyMaskPrct = CommonConstant.CurrencyMaskPrct;
  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService,  
    private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private newCustService: NewCustSetData,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.ParentCustId = queryParams["IdCust"];
      }
    });
  }

  onChangeIsOwnerInput(isOwner: boolean) {
    if (isOwner) {
      this.parentForm.get('SharePrcnt').setValidators([Validators.required, Validators.min(0.01), Validators.max(100)]);
    } else {
      this.parentForm.get('SharePrcnt').setValidators([Validators.min(0), Validators.max(100)]);
    }
    this.parentForm.get('SharePrcnt').updateValueAndValidity();
  }

  UserAccess: CurrentUserContext;
  MaxDate: Date;
  businessDtMin: Date;
  tempExisting: CustFormExistingObj = new CustFormExistingObj();
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  isShareholderReady : boolean = false;
  async ngOnInit() {
    await this.getGsJobPostIsOwner();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.MaxDate = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);

    this.InitData();
    await this.GetExistingShareholder();
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCustModel, this.CustType, true);
    await this.GetExistingJobData();
    this.jobPositionLookupObj.isReady = true;
    this.positionSlikLookUpObj.isReady = true;
    this.professionLookUpObj.isReady = true;
    this.outputExisting.emit(this.tempExisting);
    this.CheckJobPostionIsOwner();
    this.isShareholderReady = true;
  }

  positionSlikLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  InitData() {
    this.parentForm.addControl("MrPositionSlikCode", this.fb.control(''));
    this.parentForm.get("MrPositionSlikCode").setValidators([Validators.required]);
    this.parentForm.get("MrPositionSlikCode").updateValueAndValidity();
    this.parentForm.addControl("SharePrcnt", this.fb.control(0));
    this.parentForm.get("SharePrcnt").setValidators([Validators.min(0), Validators.max(100)]);
    this.parentForm.get("SharePrcnt").updateValueAndValidity();
    this.parentForm.addControl("IsActive", this.fb.control(true));
    this.parentForm.addControl("IsOwner", this.fb.control(false));
    this.parentForm.addControl("BusinessStartDt", this.fb.control(''));
    if (this.CustType == this.CustTypePersonal) {
      this.parentForm.addControl("MrJobPositionCode", this.fb.control(''));
      this.parentForm.addControl("IsSigner", this.fb.control(false));
      this.parentForm.addControl("EstablishmentDt", this.fb.control(''));
      this.parentForm.addControl("RefProfessionId", this.fb.control(0));
      this.parentForm.addControl("MrJobProfessionCode", this.fb.control(''));
      this.parentForm.addControl("SignerEndDt", this.fb.control(''));
    }
    this.positionSlikLookUpObj = this.newCustService.BindLookupPositionSlik();
    this.BindLookupProfession();
    this.BindLookupJobPosition();

    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.MaxDate = new Date(this.UserAccess.BusinessDt);
    this.MaxDate.setDate(this.MaxDate.getDate() - 1);
  }

  jobPositionLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupJobPosition() {
    this.jobPositionLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.jobPositionLookupObj.isRequired = true;
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

  async GetExistingShareholder(custCompanyMgmntShrholderId: number = this.CustCompanyMgmntShrholderId) {
    if (custCompanyMgmntShrholderId == 0) return;
    await this.http.post(this.UrlConstantNew.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdV2, { Id: custCompanyMgmntShrholderId }).toPromise().then(
      async (response: CustCompanyMgmntShrholderObj) => {
        this.parentForm.patchValue({
          MrPositionSlikCode: response.MrPositionSlikCode,
          SharePrcnt: response.SharePrcnt,
          IsActive: response.IsActive,
          IsOwner: response.IsOwner
        });
        let tempDesc: string = await this.PatchValueDesc(response.MrPositionSlikCode, CommonConstant.RefMasterTypeCodePositionSlik);
        this.positionSlikLookUpObj.nameSelect = tempDesc;
        this.positionSlikLookUpObj.jsonSelect = { Jabatan: tempDesc };
        if (this.CustType == this.CustTypePersonal) {
          let datePipe = new DatePipe("en-US");
          this.parentForm.patchValue({
            IsSigner: response.IsSigner,
            EstablishmentDt: datePipe.transform(response.EstablishmentDt, 'yyyy-MM-dd'),
            SignerEndDt: datePipe.transform(response.SignerEndDt, 'yyyy-MM-dd'),
          });
        }else if(this.CustType == this.CustTypeCompany){
          let datePipe = new DatePipe("en-US");
          this.parentForm.patchValue({
            BusinessStartDt: datePipe.transform(response.BusinessStartDt, 'yyyy-MM-dd'),
          });
        }
        this.tempExisting.CustCompanyMgmntShrholder = response;
        if (this.ParentCustId == 0) {
          this.ParentCustId = response.CustId
        }
      }
    )
  }

  async GetExistingJobData(shareholderId: number = this.CustId) {
    if (this.CustType != this.CustTypePersonal || shareholderId == 0) return;
    await this.http.post(this.UrlConstantNew.GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId, { Ids: [this.ParentCustId, shareholderId] }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        if (!response.CustId) return;
        this.tempExisting.CustPersonalJob = response;
        this.parentForm.patchValue({
          MrJobPositionCode: response.MrJobPositionCode,
          RefProfessionId: response.RefProfessionId,
        });
        let tempDesc: string = await this.PatchValueDesc(response.MrJobPositionCode, CommonConstant.RefMasterTypeCodeJobPosition);
        this.jobPositionLookupObj.nameSelect = tempDesc;
        this.jobPositionLookupObj.jsonSelect = { JobDesc: tempDesc };
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

  getLookUpSlik(ev) {
    let tempMrPositionSlikCode = this.parentForm.get("MrPositionSlikCode");
    tempMrPositionSlikCode.patchValue(ev.Code);
    this.CheckJobPostionIsOwner();
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

  changeCustModel() {
    this.ResetLookupProfession();
    this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: "" });
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
    setTimeout(() => { this.ucLookupProfession.setAddCritInput(); }, 100);
  }

  ListJobPostIsOwner : Array<string> = new Array<string>();
  async getGsJobPostIsOwner(){
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GS_SHAREHOLDER_JOB_POSITION_IS_OWNER }).toPromise().then(
      (response: GeneralSettingObj) => {
        let x = response.GsValue;
        this.ListJobPostIsOwner = x.split(';');
      }
    )
  }

  CheckJobPostionIsOwner(){
    let x = this.ListJobPostIsOwner.find(f=>f == this.parentForm.controls.MrPositionSlikCode.value);
    console.log(x);
    if(x!= null){
      this.parentForm.patchValue({
        IsOwner: true,
      });
      this.parentForm.get("IsOwner").disable();
      this.onChangeIsOwnerInput(true);
    }
    else{
      this.parentForm.patchValue({
        IsOwner: false,
      });
      this.parentForm.get("IsOwner").disable();
      this.onChangeIsOwnerInput(false);
    }
  }
}
