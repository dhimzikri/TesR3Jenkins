import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RegexService } from 'app/customer/regex.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CustAttrContentObj } from 'app/shared/model/new-cust/cust-attr-content-obj.model';
import { CustCompanyMgmntShrholderObj, ResCustCompanyMgmntShrholderObj } from 'app/shared/model/new-cust/cust-company-mgmnt-shrholder-obj.model';
import { CustPersonalFamilyObj } from 'app/shared/model/new-cust/cust-personal-family-obj.model';
import { ReqPersonalObj } from 'app/shared/model/new-cust/req-personal-obj.model';
import { CustFormExistingObj } from 'app/shared/model/new-cust/shareholder/shareholder-form-existing-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { CookieService } from 'ngx-cookie';
import { CustAttrFormComponent } from 'app/customer/sharing-component/new-cust-component/component/cust-attr-form/cust-attr-form.component';
import { FamilyFormComponent } from 'app/customer/sharing-component/new-cust-component/component/family-form/family-form.component';
import { ShareholderFormComponent } from 'app/customer/sharing-component/new-cust-component/component/shareholder-form/shareholder-form.component';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { ThirdPartyUploadService } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { ActivatedRoute } from '@angular/router';
import { ThirdPartyFormComponent } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/third-party-form.component';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { String } from 'typescript-string-operations';
import { ValidatorPattern } from '@adins/uc-show-errors/lib/model/validator-pattern.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-new-cust-personal-main-data-x',
  templateUrl: './new-cust-personal-main-data-x.component.html',
  providers: [NewCustSetData]
})
export class NewCustPersonalMainDataXComponent implements OnInit {

  @ViewChild('ShareholderForm') shareholderForm: ShareholderFormComponent;
  @ViewChild('FamilyForm') familyForm: FamilyFormComponent;
  @ViewChild('CustAttrForm') custAttrForm: CustAttrFormComponent;
  private ucLookupExistingCust: UclookupgenericComponent;
  @ViewChild('LookupExistingCust') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupExistingCust = content;
    }
  }
  @Input() listCustNoToExclude: Array<string> = new Array();
  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() CustPersonalFamilyId: number = 0;
  @Input() ParentCustId: number = 0;
  @Input() tempTotalSharePrct: number = 0;
  @Input() isMarried: boolean = false;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Input() isSubmit: boolean = false;
  @Input() IsAddSpouse: boolean = false;
  @Input() SelectedCustSpouseId: number = 0;
  @Output() outputAfterSave: EventEmitter<ReqPersonalObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();
  @Output() outputIsSubmit: EventEmitter<boolean> = new EventEmitter();


  custObj: CustObj = new CustObj();
  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj(this.UrlConstantNew);
  inputLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  thirdPartyTrxNo: string = null;
  thirdPartyTrxGroupNo: string = null;
  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  pageFrom: string = CommonConstant.CustFromEditMainData;
  isReady: boolean = false;
  houseOwnershipObj: any;
  @ViewChild(ThirdPartyFormComponent) child : ThirdPartyFormComponent;

  constructor(private regexService: RegexService, private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService,
    private thirdPartyUploadService: ThirdPartyUploadService,
    private route: ActivatedRoute, private newCustService: NewCustSetData, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
      this.route.queryParams.subscribe(params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams["From"] != null) {        
          this.pageFrom = queryParams["From"];
        }
      });
  }

  //#region Readonly
  readonly RefMasterTypeCodeIdType: string = CommonConstant.RefMasterTypeCodeIdType;
  readonly RefMasterTypeCodeGender: string = CommonConstant.RefMasterTypeCodeGender;
  readonly RefMasterTypeCodeMaritalStat: string = CommonConstant.RefMasterTypeCodeMaritalStat;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly AttrGroupCustPersonalOther: string = CommonConstant.AttrGroupCustPersonalOther;
  readonly listAttrCodes: Array<string> = [CommonConstant.AttrCodeDeptAml, CommonConstant.AttrCodeAuthAml];

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]

  readonly CustFromEditMainData: string = CommonConstant.CustFromEditMainData;
  readonly CustFromCustShareholder: string = CommonConstant.CustFromCustShareholder;
  readonly CustFromCustFamily: string = CommonConstant.CustFromCustFamily;

  readonly GsCodeIdTypeExpDtRequired: string = CommonConstant.GsCodeIdTypeExpDtRequired;
  readonly GsCodeIdTypeExpDtReadonly: string = CommonConstant.GsCodeIdTypeExpDtReadonly;
  //#endregion

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    this.getPatternTaxIdNo();
    this.InitData();
    this.buildingOwnership();
    this.GetGeneralSetting(this.GsCodeIdTypeExpDtRequired);
    this.GetGeneralSetting(this.GsCodeIdTypeExpDtReadonly);
    this.InitCustMainDataMode();
    this.BindLookupSupplier();
    this.BindLookupExistingCust();
    this.GetCustRelationship();
    this.ClearCustForm();
    this.getInitPattern();
    this.DictUcDDLObj[this.RefMasterTypeCodeIdType] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeIdType, null, true);
    this.onOptionsSelected();
    this.DictUcDDLObj[this.RefMasterTypeCodeGender] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeGender);
    if(this.IsAddSpouse)
    {
      this.DictUcDDLObj[this.RefMasterTypeCodeMaritalStat] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeMaritalStat, null, true, this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCodeAndMasterCode, CommonConstant.MaritalStatusMarried);
    }else{
      this.DictUcDDLObj[this.RefMasterTypeCodeMaritalStat] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeMaritalStat, null, true);
    }
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    await this.GetExistingData();
    this.GetCustAddrToCopy();
    this.existingCustomerLookUpObj.isReady = true;
  }

  //#region Set Data
  businessDtMin: Date;
  businessDtMax: Date;
  MaxDate: Date;
  MaxDtValidate: string;
  async InitData() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setFullYear(this.businessDtMin.getFullYear() - 17);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);
    this.MaxDate = new Date(context.BusinessDt);
    this.MaxDate.setDate(this.MaxDate.getDate() - 1);
    var datePipe = new DatePipe("en-US");
    this.MaxDtValidate = datePipe.transform(this.MaxDate, "yyyy-MM-dd");

    this.inputAddressObj = await this.newCustService.BindSetLegalAddr();
    this.isReady = true;
  }

  CustNameLabel: string = "Customer";
  InitCustMainDataMode() {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        this.CustNameLabel = "Customer";
        break;
      case this.CustDataModeFamily:
        this.CustNameLabel = "Family";
        break;
      case this.CustDataModeShareholder:
        this.CustNameLabel = "Share Legal";
        break;
      default:
    }
  }

  //#region UcLookup
  BindLookupSupplier() {
    this.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupObj.isReady = false;
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.isReady = true;
    this.inputLookupObj.isRequired = false;
  }

  existingCustomerLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupExistingCust() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.existingCustomerLookUpObj = this.newCustService.BindLookupExistingCust(this.ParentCustId, this.listCustNoToExclude, CommonConstant.CustomerPersonal);
    if (this.CustId != 0) this.existingCustomerLookUpObj.isDisable = true;
  }
  //#endregion

  //#region UcDDL
  MrCustRelationshipCodeObj: Array<KeyValueObj> = new Array<KeyValueObj>();
  readonly RefMasterTypeCodeCustPersonalRelationship: string = CommonConstant.RefMasterTypeCodeCustPersonalRelationship;
  async GetCustRelationship() {
    this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship] = new UcDropdownListObj(this.UrlConstantNew);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship].isSelectOutput = true;
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    tempReq.RefMasterTypeCode = this.RefMasterTypeCodeCustPersonalRelationship;
    this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, tempReq).subscribe(
      async (response) => {
        this.MrCustRelationshipCodeObj = response[CommonConstant.ReturnObj];
        if (!this.isMarried) await this.removeSpouse();
        this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship].isReady = true;
      }
    );
  }


  removeSpouse() {
    let idxSpouse = this.MrCustRelationshipCodeObj.findIndex(x => x.Key == CommonConstant.MasteCodeRelationshipSpouse);
    this.MrCustRelationshipCodeObj.splice(idxSpouse, 1)
  }
  //#endregion

  ClearCustForm() {
    this.CustomerForm = this.fb.group({
      CustName: ['', [Validators.required, Validators.maxLength(500)]],
      MrGenderCode: ['', [Validators.required]],
      MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
      BirthPlace: ['', [Validators.required]],
      BirthDt: ['', [Validators.required]],
      IdNo: ['', [Validators.required, Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED)]],
      TaxIdNo: ['', [Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED)]],
      IdExpiredDt: [''],
      MrMaritalStatCode: ['', Validators.required],
      MotherMaidenName: ['', [Validators.required, Validators.maxLength(500)]],
      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: [''],
      MrCustRelationship: [''],
      MrCustModelCode: ['', [Validators.required]],
      MobilePhnNo1: ['', [Validators.required, Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED)]],
      MobilePhnNo2: ['', [Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED)]],
      MobilePhnNo3: ['', [Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED)]],
      IsWaMobilePhnNo1: [false],
      IsWaMobilePhnNo2: [false],
      IsWaMobilePhnNo3: [false],
      Email1: ['', [Validators.required, Validators.pattern(ValidatorPattern.EMAIL_ALL_CASE)]]
    });

    if (this.CustDataMode != this.CustDataModeMain) {
      this.CustomerForm.get("CustName").disable();
    }
    if (this.CustDataMode == this.CustDataModeShareholder || this.pageFrom == CommonConstant.CustFromCustShareholder) {
      this.CustomerForm.get("Email1").setValidators(Validators.pattern(ValidatorPattern.EMAIL_ALL_CASE));
      this.CustomerForm.get("Email1").updateValueAndValidity();
      this.CustomerForm.get("MrMaritalStatCode").clearValidators();
      this.CustomerForm.get("MrMaritalStatCode").updateValueAndValidity();
      this.CustomerForm.get("MrCustModelCode").clearValidators();
      this.CustomerForm.get("MrCustModelCode").updateValueAndValidity();
    }
    if(this.CustDataMode == this.CustDataModeFamily || this.pageFrom == CommonConstant.CustFromCustFamily){
      this.CustomerForm.get("Email1").setValidators(Validators.pattern(ValidatorPattern.EMAIL_ALL_CASE));
      this.CustomerForm.get("Email1").updateValueAndValidity();
      this.CustomerForm.get("MrCustRelationship").setValidators(Validators.required);
      this.CustomerForm.get("MrCustRelationship").updateValueAndValidity();
    }
  }
  //#endregion

  //#region Get Data
  customPattern: Array<CustomPatternObj> = new Array<CustomPatternObj>();
  getInitPattern() {
    this.customPattern = new Array<CustomPatternObj>();
    this.regexService.getListPattern().subscribe(
      (response) => {
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
    )
  }

  dictListGsValue: { [GsCode: string]: Array<string> } = {};
  GetGeneralSetting(Code: string) {
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { code: Code }).subscribe(
      (response: { GsValue: string }) => {
        let listStringSplit: Array<string> = response.GsValue.split(";");
        this.dictListGsValue[Code] = listStringSplit;
      });
  }

  readonly identifierMrIdTypeCode: string ="MrIdTypeCode";
  get GetIdTypeValue(): string {
    return this.CustomerForm.get(this.identifierMrIdTypeCode).value;
  }
  get IsExpDtRequired(): Boolean {
    let IdType: string = this.GetIdTypeValue;
    if (!this.dictListGsValue[this.GsCodeIdTypeExpDtRequired]) return false;
    return this.dictListGsValue[this.GsCodeIdTypeExpDtRequired].includes(IdType);
  }

  get IsExpDtReadonly(): Boolean {
    let IdType: string = this.GetIdTypeValue;
    if (!this.dictListGsValue[this.GsCodeIdTypeExpDtReadonly]) return false;
    return this.dictListGsValue[this.GsCodeIdTypeExpDtReadonly].includes(IdType);
  }

  //#region GetExisting / mode edit
  IsLockCopyAddrBtn: boolean = false;
  IsCustLoaded: boolean = false;
  async GetExistingData() {
    if (this.CustId == 0){
      this.custObj.IsCustomer = true;
      this.IsCustLoaded = true;
      return;
    } 
    await this.GetCustData();
    this.GetCustAddr();
    await this.GetCustPersonalData();
    this.GetMrRelationship();

    if (this.CustDataMode != CommonConstant.CustMainDataModeCust) {
      this.IsLockEdit();
    }
    this.IsLockCopyAddrBtn = true;
  }

  async GetCustData(custId: number = this.CustId) {
    let datePipe = new DatePipe("en-US");
    await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: custId }).toPromise().then(
      (response: CustObj) => {
        this.custObj = response;
        this.thirdPartyTrxNo = this.custObj.ThirdPartyTrxNo;
        this.IsCustLoaded = true;
        this.CustomerForm.patchValue({
          CustName: this.custObj.CustName,
          MrCustTypeCode: this.custObj.MrCustTypeCode,
          MrIdTypeCode: this.custObj.MrIdTypeCode,
          IdNo: this.custObj.IdNo,
          IdExpiredDt: datePipe.transform(this.custObj.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.custObj.TaxIdNo,
          MrCustModelCode: response.MrCustModelCode ? response.MrCustModelCode : "",
        });
        if (this.CustDataMode != this.CustDataModeMain) {
          if (this.CustDataMode == this.CustDataModeFamily) this.familyForm.PatchCriteriaLookupProfession();
          if (this.CustDataMode == this.CustDataModeShareholder) this.shareholderForm.PatchCriteriaLookupProfession();
        }
        this.existingCustomerLookUpObj.nameSelect = response.CustName;
        this.existingCustomerLookUpObj.jsonSelect = { CustName: response.CustName };
        this.existingCustomerLookUpObj.isReady = true;
        this.onOptionsSelected();
      }
    );
  }

  tempCustAddr: CustAddrObj = new CustAddrObj();
  async GetCustAddr(custId: number = this.CustId) {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = custId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    await this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.tempCustAddr = response;
        let inputFieldObj = new InputFieldObj(this.UrlConstantNew);
        inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;

        var isContain = this.checkBuildingOwnership(response.MrBuildingOwnershipCode)
        tempUcAddObj.MrHouseOwnershipCode = isContain? response.MrBuildingOwnershipCode : '';

        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = inputFieldObj;

        if (this.CustDataMode == CommonConstant.CustMainDataModeCust) {
          this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
        }
      }
    );
  }

  tempCustAddrToCopy: CustAddrObj = new CustAddrObj();
  async GetCustAddrToCopy() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.ParentCustId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    await this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.tempCustAddrToCopy = response;
      }
    );
  }

  tempCustPersonalObj: CustPersonalObj = new CustPersonalObj();
  async GetCustPersonalData(custId: number = this.CustId) {
    let datePipe = new DatePipe("en-US");
    await this.http.post<CustPersonalObj>(this.UrlConstantNew.GetCustPersonalbyCustIdV2, { Id: custId }).toPromise().then(
      (response) => {
        this.tempCustPersonalObj = response;
        this.CustomerForm.patchValue({
          MrGenderCode: response.MrGenderCode,
          BirthPlace: response.BirthPlace,
          BirthDt: datePipe.transform(response.BirthDt, 'yyyy-MM-dd'),
          MotherMaidenName: response.MotherMaidenName,
          IsRestInPeace: response.IsRestInPeace,
          MrMaritalStatCode: response.MrMaritalStatCode,
          MobilePhnNo1: response.MobilePhnNo1,
          MobilePhnNo2: response.MobilePhnNo2,
          MobilePhnNo3: response.MobilePhnNo3,
          IsWaMobilePhnNo1: response.IsWaMobilePhnNo1,
          IsWaMobilePhnNo2: response.IsWaMobilePhnNo2,
          IsWaMobilePhnNo3: response.IsWaMobilePhnNo3,
          Email1: response.Email1
        });
        if (this.CustDataMode == this.CustDataModeFamily) this.familyForm.PatchExistingPersonalData(response);
      }
    );
  }

  tempCustPersonalFamilyObj: CustPersonalFamilyObj = new CustPersonalFamilyObj();
  GetMrRelationship(custPersonalFamilyId: number = this.CustPersonalFamilyId) {
    if (this.CustDataMode != this.CustDataModeFamily) return;
    this.http.post(this.UrlConstantNew.GetCustPersonalFamilyByCustPersonalFamilyId, { Id: custPersonalFamilyId }).subscribe(
      (response: CustPersonalFamilyObj) => {
        this.tempCustPersonalFamilyObj = response;
        this.CustomerForm.patchValue({
          MrCustRelationship: response.MrCustRelationship,
        });
        if (this.ParentCustId == 0) {
          this.ParentCustId = response.CustId
        }
      }
    );
  }
  //#endregion
  //#endregion

  //#region Change Data
  onOptionsSelected() {
    this.CheckIdExpDt();
    this.onChangeIdType();
  }

  private CheckIdExpDt(){
    let tempIdExpiredDt = this.CustomerForm.get("IdExpiredDt");
    tempIdExpiredDt.clearValidators();
    if (this.IsExpDtReadonly) {
      tempIdExpiredDt.setValue("");
      tempIdExpiredDt.updateValueAndValidity();
      return;
    } 
    if (this.IsExpDtRequired) {
      tempIdExpiredDt.setValidators(Validators.required);
    }
    tempIdExpiredDt.updateValueAndValidity();
  }

  onChangeIdType() {
    let idType: string = this.CustomerForm.get("MrIdTypeCode").value;

    let tempIdNo = this.CustomerForm.get("IdNo");
    tempIdNo.clearValidators();
    if (idType == CommonConstant.MrIdTypeCodeEKTP) {
      tempIdNo.setValidators([Validators.required, Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED), Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      tempIdNo.setValidators([Validators.required, Validators.pattern(ValidatorPattern.NUMBER_ONLY_REQUIRED)]);
    }
    tempIdNo.updateValueAndValidity();

    this.setValidatorPattern();
  }

  resultPattern: Array<KeyValueObj> = new Array();
  setValidatorPattern() {
    let idTypeValue: string = this.CustomerForm.get("MrIdTypeCode").value;
    let pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        let result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    let tempIdNo = this.CustomerForm.get("IdNo");
    if (pattern != undefined) {
      tempIdNo.setValidators([Validators.required, Validators.pattern(pattern)]);
      tempIdNo.updateValueAndValidity();
    }
  }

  SetSupplier(e: VendorObj) {
    this.CustomerForm.patchValue({
      SupplCode: e.VendorCode,
      SupplName: e.VendorName,
      SupplId: e.VendorId
    });

    this.http.post(this.UrlConstantNew.GetVendorByVendorCode, { Code: e.VendorCode }).subscribe(
      (response: VendorObj) => {
        this.CustomerForm.patchValue({
          CustName: e.VendorName,
          MrIdTypeCode: response.MrIdTypeCode,
          IdNo: response.IdNo,
          TaxIdNo: response.TaxIdNo,
        });

        // ini kondisi apaan?
        if (response.MrIdTypeCode) {
          this.onOptionsSelected()
        }
      });

    this.http.post(this.UrlConstantNew.GetVendorAddrByVendorCodeAndMrAddrTypeCode, { VendorCode: e.VendorCode, MrAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      (response: VendorAddrObj) => {
        let inputFieldObj = new InputFieldObj(this.UrlConstantNew);
        inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        inputFieldObj.inputLookupObj.isReadonly = false;
        inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = inputFieldObj;
      }
    );
  }

  ExistingFormObj: CustFormExistingObj = new CustFormExistingObj();
  GetExistingFormObj(ev: CustFormExistingObj) {
    this.ExistingFormObj = ev;
  }

  CopyLegalAddr() {
    let inputFieldObj = new InputFieldObj(this.UrlConstantNew);
    inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    inputFieldObj.inputLookupObj.isReadonly = false;
    inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddrToCopy.Zipcode;
    inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddrToCopy.Zipcode };
    let tempUcAddObj: UcAddressObj = new UcAddressObj();
    tempUcAddObj.AreaCode1 = this.tempCustAddrToCopy.AreaCode1;
    tempUcAddObj.AreaCode2 = this.tempCustAddrToCopy.AreaCode2;
    tempUcAddObj.AreaCode3 = this.tempCustAddrToCopy.AreaCode3;
    tempUcAddObj.AreaCode4 = this.tempCustAddrToCopy.AreaCode4;
    tempUcAddObj.Addr = this.tempCustAddrToCopy.Addr;
    tempUcAddObj.City = this.tempCustAddrToCopy.City;

    var isContain = this.checkBuildingOwnership(this.tempCustAddrToCopy.MrBuildingOwnershipCode)
    tempUcAddObj.MrHouseOwnershipCode = isContain? this.tempCustAddrToCopy.MrBuildingOwnershipCode : '';
    
    this.inputAddressObj.default = tempUcAddObj;
    this.inputAddressObj.inputField = inputFieldObj;
  }

  async getLookUpCustomer(ev: { CustId: number}) {
    await this.GetCustData(ev.CustId);
    this.GetCustAddr(ev.CustId);
    await this.GetCustPersonalData(ev.CustId);
    if (this.CustDataMode == this.CustDataModeShareholder) {
      this.shareholderForm.GetExistingJobData(ev.CustId);
    }
    if (this.CustDataMode == this.CustDataModeFamily) {
      this.familyForm.GetExistingJobData(ev.CustId);
    }
    this.custAttrForm.GetQuestion(ev.CustId);

    this.IsLockEdit();
  }

  IsLockEdit() {
    this.existingCustomerLookUpObj.isReadonly = true;
    this.inputAddressObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isDisable = true;

    this.CustomerForm.get("CustName").disable();
    this.CustomerForm.get("MrGenderCode").disable();
    this.CustomerForm.get("MrIdTypeCode").disable();
    this.CustomerForm.get("BirthPlace").disable();
    this.CustomerForm.get("BirthDt").disable();
    this.CustomerForm.get("IdNo").disable();
    this.CustomerForm.get("TaxIdNo").disable();
    this.CustomerForm.get("IdExpiredDt").disable();
    this.CustomerForm.get("MrMaritalStatCode").disable();
    this.CustomerForm.get("MotherMaidenName").disable();
    this.CustomerForm.get("MobilePhnNo1").disable();
    this.CustomerForm.get("MobilePhnNo2").disable();
    this.CustomerForm.get("MobilePhnNo3").disable();
    this.CustomerForm.get("IsWaMobilePhnNo1").disable();
    this.CustomerForm.get("IsWaMobilePhnNo2").disable();
    this.CustomerForm.get("IsWaMobilePhnNo3").disable();
    this.CustomerForm.get("Email1").disable();
    this.IsLockCopyAddrBtn = true;
  }

  RelationshipChange(ev: string) {
    let tempMaritalStat = this.CustomerForm.get("MrMaritalStatCode");
    let isMarried: boolean = false;
    if (ev == CommonConstant.MasteCodeRelationshipSpouse) {
      isMarried = true;
      tempMaritalStat.patchValue(CommonConstant.MR_MARITAL_STAT_CODE_MARRIED);
      if (this.CustId == 0) tempMaritalStat.disable();
    } else {
      if (this.CustId == 0) {
        tempMaritalStat.enable();
      } else {
        tempMaritalStat.patchValue(this.tempCustPersonalObj.MrMaritalStatCode);
      }
    }
    this.existingCustomerLookUpObj.addCritInput = this.newCustService.ResetCriteriaExisting(this.ParentCustId, this.listCustNoToExclude, CommonConstant.CustomerPersonal, isMarried);
    this.ucLookupExistingCust.setAddCritInput();
  }

  outputChangeReceived(ev: { Key: string, Code: string }) {
    switch (ev.Key) {
      case CommonConstant.CUST_CHANGE_PROFESSION:
        this.ChangeProfession(ev.Code);
        break;
    }
  }

  changeCustModel() {
    console.log("meong");
    if (this.CustDataMode == this.CustDataModeShareholder) {
      this.shareholderForm.ResetLookupProfession();
    }
    if (this.CustDataMode == this.CustDataModeFamily) {
      this.familyForm.ResetLookupProfession();
    }
    this.ChangeProfession("");
  }

  changeCustMaritalStat(){
    this.child.setDocFormCustMaritalTypeChanged();
  }

  //profession
  ChangeProfession(code: string) {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.custAttrForm.SetSearchListInputType(CommonConstant.AttrCodeDeptAml, code);
    this.custAttrForm.ResetValueFromAttrCode(CommonConstant.AttrCodeDeptAml);
  }

  //#endregion

  //#region Save
  Cancel() {
    this.outputCancel.emit();
  }

  async SaveForm() {
    if(this.thirdPartyTrxNo != null && !this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)){
      return;
    }

    let tempForm = this.CustomerForm.getRawValue();
    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();
    reqSubmitObj.CustObj = this.custObj;
    reqSubmitObj.CustObj.CustName = tempForm["CustName"];
    reqSubmitObj.CustObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
    reqSubmitObj.CustObj.IdNo = tempForm["IdNo"];
    reqSubmitObj.CustObj.IdExpiredDt = tempForm["IdExpiredDt"];
    reqSubmitObj.CustObj.TaxIdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustomerPersonal;
    reqSubmitObj.CustObj.MrCustModelCode = tempForm["MrCustModelCode"];
    reqSubmitObj.CustObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;
    reqSubmitObj.CustObj.ThirdPartyGroupTrxNo = this.thirdPartyTrxGroupNo;
    
    reqSubmitObj.CustPersonalObj = this.tempCustPersonalObj;
    reqSubmitObj.CustPersonalObj.CustFullName = tempForm["CustName"];
    reqSubmitObj.CustPersonalObj.MrGenderCode = tempForm["MrGenderCode"];
    reqSubmitObj.CustPersonalObj.BirthPlace = tempForm["BirthPlace"];
    reqSubmitObj.CustPersonalObj.BirthDt = tempForm["BirthDt"];
    reqSubmitObj.CustPersonalObj.MotherMaidenName = tempForm["MotherMaidenName"];
    reqSubmitObj.CustPersonalObj.MrMaritalStatCode = tempForm["MrMaritalStatCode"];
    reqSubmitObj.CustPersonalObj.Email1 = tempForm["Email1"];
    reqSubmitObj.CustPersonalObj.MobilePhnNo1 = tempForm["MobilePhnNo1"];
    reqSubmitObj.CustPersonalObj.MobilePhnNo2 = tempForm["MobilePhnNo2"];
    reqSubmitObj.CustPersonalObj.MobilePhnNo3 = tempForm["MobilePhnNo3"];
    reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo1 = tempForm["IsWaMobilePhnNo1"];
    reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo2 = tempForm["IsWaMobilePhnNo2"];
    reqSubmitObj.CustPersonalObj.IsWaMobilePhnNo3 = tempForm["IsWaMobilePhnNo3"];
    if (this.CustDataMode == this.CustDataModeFamily) {
      reqSubmitObj.CustPersonalObj.MrNationalityCode = tempForm["MrNationalityCode"];
      reqSubmitObj.CustPersonalObj.WnaCountryCode = tempForm["WnaCountryCode"];
      reqSubmitObj.CustPersonalFamilyObj = this.SetCustPersonalFamilyData(this.ParentCustId, this.CustId);
    }

    if (this.CustDataMode == this.CustDataModeShareholder && this.IsAddSpouse) {
      // reqSubmitObj.CustPersonalObj.MrNationalityCode = tempForm["MrNationalityCode"];
      // reqSubmitObj.CustPersonalObj.WnaCountryCode = tempForm["WnaCountryCode"];
      reqSubmitObj.IsAddSpouse = true;
      reqSubmitObj.CustPersonalFamilyObj = this.SetCustPersonalFamilyData(this.SelectedCustSpouseId, this.CustId);
    }

    reqSubmitObj.CustAddr = this.tempCustAddr;
    reqSubmitObj.CustAddr.CustId = this.CustId;
    reqSubmitObj.CustAddr.Addr = tempForm["UcAddress"]["Addr"];
    reqSubmitObj.CustAddr.AreaCode1 = tempForm["UcAddress"]["AreaCode1"];
    reqSubmitObj.CustAddr.AreaCode2 = tempForm["UcAddress"]["AreaCode2"];
    reqSubmitObj.CustAddr.AreaCode3 = tempForm["UcAddress"]["AreaCode3"];
    reqSubmitObj.CustAddr.AreaCode4 = tempForm["UcAddress"]["AreaCode4"];
    reqSubmitObj.CustAddr.City = tempForm["UcAddress"]["City"];
    reqSubmitObj.CustAddr.MrBuildingOwnershipCode = tempForm["UcAddress"]["MrHouseOwnershipCode"];
    reqSubmitObj.CustAddr.Zipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustAddr.SubZipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

    if (this.CustDataMode != this.CustDataModeMain) {
      reqSubmitObj.CustObj.CustName = tempForm["ExistingCustName"].value;
      reqSubmitObj.CustPersonalObj.CustFullName = tempForm["ExistingCustName"].value;
      reqSubmitObj.CustPersonalJobObj = this.SetCustPersonalJobData();
      reqSubmitObj.CustAttrContentObjs = this.SetCustAttrContent();
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqSubmitObj.CustCompanyMgmntShrholderObj = await this.SetCustMgmntShareholder();

      if (reqSubmitObj.CustCompanyMgmntShrholderObj.IsActive) {
        let tempTotalSharePrctTobeAdd = this.tempTotalSharePrct + reqSubmitObj.CustCompanyMgmntShrholderObj.SharePrcnt;
        if (tempTotalSharePrctTobeAdd > 100) {
          this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_CAN_NOT_100);
          this.toastr.warningMessage("Total Share now is " + this.tempTotalSharePrct + "%");
          return;
        }
      }

      if(reqSubmitObj.CustCompanyMgmntShrholderObj.EstablishmentDt != null){
        if(reqSubmitObj.CustCompanyMgmntShrholderObj.EstablishmentDt.toString() > this.MaxDtValidate){
          this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
          return false;
        }
      }
      
    }

    reqSubmitObj = this.SetCustomerDataMode(reqSubmitObj);

    reqSubmitObj.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
    this.isSubmit = true;
    this.outputIsSubmit.emit(this.isSubmit);
    this.outputAfterSave.emit(reqSubmitObj);
  }

  private SetCustomerDataMode(reqSubmitObj: ReqPersonalObj) {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        this.SetIsTypeDataMode(reqSubmitObj);
        break;
      case this.CustDataModeFamily:
        reqSubmitObj.CustObj.IsFamily = true;
        break;
      case this.CustDataModeShareholder:
        reqSubmitObj.CustObj.IsShareholder = true;
        if(this.IsAddSpouse){
          reqSubmitObj.CustObj.IsFamily = true;
        }
        break;
    }
    return reqSubmitObj;
  }

  private SetIsTypeDataMode(reqSubmitObj: ReqPersonalObj) {
    if (this.pageFrom == CommonConstant.CustFromEditMainData) reqSubmitObj.CustObj.IsCustomer = true;
    if (this.pageFrom == CommonConstant.CustFromCustFamily) reqSubmitObj.CustObj.IsFamily = true;
    if (this.pageFrom == CommonConstant.CustFromCustShareholder) reqSubmitObj.CustObj.IsShareholder = true;
  }

  async SetCustMgmntShareholder(): Promise<CustCompanyMgmntShrholderObj>  {
    let CustCompanyMgmntShrholder : ResCustCompanyMgmntShrholderObj = new ResCustCompanyMgmntShrholderObj();
    await this.http.post(this.UrlConstantNew.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId, { Id: this.CustCompanyMgmntShrholderId }).toPromise().then(
      async (response: CustCompanyMgmntShrholderObj) => {
        if (this.ParentCustId == 0) {
          this.ParentCustId = response.CustId
        }
      }
    )
    await this.http.post<ResCustCompanyMgmntShrholderObj>(this.UrlConstantNew.GetCustCompanyMgmntShrholderByCustIdAndShrholderId, { CustId: this.ParentCustId, ShrholderId: this.CustId }).toPromise().then(
      async (response) => {
        CustCompanyMgmntShrholder = response;
      }
    )
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    tempReqObj.CustId = this.ParentCustId;
    tempReqObj.ShareholderId = this.CustId;

    tempReqObj.SharePrcnt = tempForm["SharePrcnt"];
    tempReqObj.MrPositionSlikCode = tempForm["MrPositionSlikCode"];
    tempReqObj.IsActive = tempForm["IsActive"];
    tempReqObj.IsOwner = tempForm["IsOwner"];
    tempReqObj.IsSigner = tempForm["IsSigner"];
    tempReqObj.EstablishmentDt = tempForm["EstablishmentDt"];
    tempReqObj.MrJobPositionCode = tempForm["MrJobPositionCode"];
    tempReqObj.BusinessStartDt = tempForm["BusinessStartDt"];
    tempReqObj.SignerEndDt = tempForm["SignerEndDt"];
    tempReqObj.RowVersion = CustCompanyMgmntShrholder.RowVersion;

    return tempReqObj
  }

  SetCustPersonalJobData(): CustPersonalJobDataObj {
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustPersonalJobDataObj = this.ExistingFormObj.CustPersonalJob;
    tempReqObj.CustId = this.CustId;

    tempReqObj.RefProfessionId = tempForm["RefProfessionId"] != 0 ? tempForm["RefProfessionId"] : null;
    tempReqObj.MrJobPositionCode = tempForm["MrJobPositionCode"];
    if (this.CustDataMode == this.CustDataModeFamily) {
      tempReqObj.EmploymentEstablishmentDt = tempForm["EmploymentEstablishmentDt"];
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode && !tempReqObj.EmploymentEstablishmentDt) tempReqObj = null;
    } else {
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode) tempReqObj = null;
    }
    return tempReqObj
  }

  identifierCustAttr: string = "CustAttrForm";
  SetCustAttrContent(): Array<CustAttrContentObj> {
    let tempAttr: Array<CustAttrContentObj> = new Array();
    let tempFormArray = this.CustomerForm.get(this.identifierCustAttr) as FormArray;
    for (let index = 0; index < tempFormArray.length; index++) {
      const element = tempFormArray.get(index.toString()).value;
      let tempAttrToPush: CustAttrContentObj = new CustAttrContentObj();
      tempAttrToPush.RefAttrId = element["RefAttrId"];
      tempAttrToPush.CustId = element["CustId"];
      tempAttrToPush.AttrValue = element["AttrValue"];
      tempAttr.push(tempAttrToPush);
    }
    return tempAttr;
  }

  SetCustPersonalFamilyData(ParentCustId: number, CustId: number): CustPersonalFamilyObj {
    let tempFamilyData: CustPersonalFamilyObj = this.tempCustPersonalFamilyObj;
    tempFamilyData.CustId = ParentCustId;
    tempFamilyData.FamilyId = CustId;
    if(this.IsAddSpouse)
    {
      tempFamilyData.MrCustRelationship = CommonConstant.MasteCodeRelationshipSpouse;
    }else{
      tempFamilyData.MrCustRelationship = this.CustomerForm.get("MrCustRelationship").value;
    }

    return tempFamilyData;
  }
  
  //#endregion
  
  SetThirdPartyTrxNo(e){
    this.thirdPartyTrxNo = e;
  }

  SetThirdPartyTrxNoAndRowVersion(e){
    this.thirdPartyTrxGroupNo = e.ThirdPartyGroupTrxNo;
    this.thirdPartyTrxNo = e.ThirdPartyTrxNo;
    if (this.custObj.CustId > 0) this.custObj.RowVersion = e.RowVersion;
  }

  SetCustFileFormObjs(e){
    this.CustDocFileFormObjs = e;
  }

  async buildingOwnership()
  {
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "BUILDING_OWNERSHIP" }).toPromise().then(
      (response) => {
        this.houseOwnershipObj = response["ReturnObject"];
      }
    );
  }

  checkBuildingOwnership(event: any)
  {
    var isContain = this.houseOwnershipObj.some(x => x.Key == event)
    return isContain;
  }

  customPatternTaxIdNo: Array<CustomPatternObj> = new Array();
  resultPatternTaxIdNo: Array<KeyValueObj> = new Array();
  taxIdNoValue: string = "TAXIDNO";
  getPatternTaxIdNo() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPatternTaxIdNo = response[CommonConstant.ReturnObj];
        if (this.resultPatternTaxIdNo != undefined) {
          for (let i = 0; i < this.resultPatternTaxIdNo.length; i++) {
            if (this.resultPatternTaxIdNo[i].Key == this.taxIdNoValue) {
              let patternObjTaxIdNo: CustomPatternObj = new CustomPatternObj();
              let patternValue: string = this.resultPatternTaxIdNo[i].Value;
  
              patternObjTaxIdNo.pattern = patternValue;
              patternObjTaxIdNo.invalidMsg = this.regexService.getErrMessage(patternValue);
              this.customPatternTaxIdNo.push(patternObjTaxIdNo);
              
              this.CustomerForm.controls.TaxIdNo.setValidators([Validators.pattern(patternObjTaxIdNo.pattern)]);
              this.CustomerForm.controls.TaxIdNo.updateValueAndValidity();
            }
          }
        }
      });
  }
}
