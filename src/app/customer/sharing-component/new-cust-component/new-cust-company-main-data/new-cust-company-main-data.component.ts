import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { CustCompanyObj } from 'app/shared/model/cust-company-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/new-cust/cust-company-mgmnt-shrholder-obj.model';
import { ReqCoyObj } from 'app/shared/model/new-cust/req-coy-obj.model';
import { CustFormExistingObj } from 'app/shared/model/new-cust/shareholder/shareholder-form-existing-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { CookieService } from 'ngx-cookie';
import { ShareholderFormComponent } from '../component/shareholder-form/shareholder-form.component';
import { NewCustSetData } from '../NewCustSetData.Service';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { ThirdPartyUploadService } from '../component/third-party-form/services/ThirdPartyUpload.Service';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { RegexService } from 'app/customer/regex.service';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-new-cust-company-main-data',
  templateUrl: './new-cust-company-main-data.component.html',
})
export class NewCustCompanyMainDataComponent implements OnInit {

  @ViewChild('ShareholderForm') shareholderForm: ShareholderFormComponent;
  @Input() listCustNoToExclude: Array<string> = new Array();
  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() ParentCustId: number = 0;
  @Input() tempTotalSharePrct: number = 0;
  @Input() isSubmit: boolean = false;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<ReqCoyObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();
  @Output() outputIsSubmit: EventEmitter<boolean> = new EventEmitter();

  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj(this.UrlConstantNew);
  inputFieldObj: InputFieldObj = new InputFieldObj(this.UrlConstantNew);
  inputLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  thirdPartyTrxNo: string = null;
  thirdPartyTrxGroupNo: string = null;
  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  pageFrom: string = CommonConstant.CustFromEditMainData;
  houseOwnershipObj: any;

  custObj: CustObj = new CustObj();
  isReady: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService,
    private cookieService: CookieService, private thirdPartyUploadService: ThirdPartyUploadService,
    private route: ActivatedRoute, private newCustService: NewCustSetData, private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew, private regexService: RegexService) { 
      this.route.queryParams.subscribe(params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams["From"] != null) {        
          this.pageFrom = queryParams["From"];
        }
      });
    }

  //#region Readonly
  readonly RefMasterTypeCodeIdTypeCompany: string = CommonConstant.RefMasterTypeCodeIdTypeCompany;
  readonly RefMasterTypeCodeCompanyType: string = CommonConstant.RefMasterTypeCodeCompanyType;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  readonly CustFromEditMainData: string = CommonConstant.CustFromEditMainData;
  //#endregion

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.getPatternTaxIdNo();
    this.ClearCustForm();
    this.BindLookupExistingCust();
    this.InitCustMainDataMode();
    await this.InitCustAddr();
    this.buildingOwnership();
    this.BindLookupSupplier();
    this.DictUcDDLObj[this.RefMasterTypeCodeIdTypeCompany] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeIdTypeCompany);
    this.DictUcDDLObj[this.RefMasterTypeCodeCompanyType] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCompanyType);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, false, this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll);
    await this.GetExistingData();
    this.GetCustAddrToCopy();
    this.existingCustomerLookUpObj.isReady = true;
  }

  async InitCustAddr(){
    this.inputAddressObj = await this.newCustService.BindSetLegalAddr();
    this.isReady = true;
  }

  //#region Set Data
  //#region UcLookup
  BindLookupSupplier() {
    this.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupObj.isReady = false;
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.isReady = true;
    this.inputLookupObj.isRequired = false;
  }
  //#endregion

  CustNameLabel: string = "Debtor";
  InitCustMainDataMode() {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        this.CustNameLabel = "Debtor";
        break;
      case this.CustDataModeShareholder:
        this.CustNameLabel = "Share Legal";
        break;
      default:
    }
  }

  existingCustomerLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  BindLookupExistingCust() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.existingCustomerLookUpObj = this.newCustService.BindLookupExistingCust(this.ParentCustId, this.listCustNoToExclude, CommonConstant.CustomerCompany);
    if (this.CustId != 0) this.existingCustomerLookUpObj.isDisable = true;
  }

  ClearCustForm() {
    this.CustomerForm = this.fb.group({
      MrCustModelCode: ['', [Validators.required]],
      CustName: ['', [Validators.required, Validators.maxLength(500)]],
      MrCompanyTypeCode: ['', [Validators.required]],
      TaxIdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
      MrIdTypeCode : ['', [Validators.required]],
      IdNo : ['', [Validators.required]],
      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: ['']
    });
    if (this.CustDataMode != this.CustDataModeMain) {
      this.CustomerForm.get("CustName").disable();
    }
    if (this.CustDataMode == this.CustDataModeShareholder || this.pageFrom == CommonConstant.CustFromCustShareholder) {
      this.CustomerForm.get("MrCustModelCode").clearValidators();
      this.CustomerForm.get("MrCustModelCode").updateValueAndValidity();
    }
  }
  //#endregion

  //#region Change

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
      });

    this.http.post(this.UrlConstantNew.GetVendorAddrByVendorCodeAndMrAddrTypeCode, { VendorCode: e.VendorCode, MrAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      (response: VendorAddrObj) => {
        this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
      }
    );
  }

  ExistingShareholderObj: CustFormExistingObj = new CustFormExistingObj();
  async GetExistingShareholder() {
    if (this.CustCompanyMgmntShrholderId == 0) return;
    await this.http.post(this.UrlConstantNew.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId, { Id: this.CustCompanyMgmntShrholderId }).toPromise().then(
      async (response: CustCompanyMgmntShrholderObj) => {
        this.ExistingShareholderObj.CustCompanyMgmntShrholder = response;
        if (this.ParentCustId == 0) {
          this.ParentCustId = response.CustId;
        }
      }
    )
  }

  async getLookUpCustomer(ev: { CustId: number, CustCompanyMgmntShrholderId: number }) {
    await this.GetCustData(ev.CustId);
    this.GetCustAddr(ev.CustId);
    await this.GetCustCompanyData(ev.CustId);
    if (ev.CustCompanyMgmntShrholderId) this.shareholderForm.GetExistingShareholder(ev.CustCompanyMgmntShrholderId);

    this.IsLockEdit();
  }

  IsLockEdit() {
    this.existingCustomerLookUpObj.isReadonly = true;
    this.inputAddressObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isDisable = true;

    this.CustomerForm.get("CustName").disable();
    this.CustomerForm.get("MrCustModelCode").disable();
    this.CustomerForm.get("MrCompanyTypeCode").disable();
    this.CustomerForm.get("TaxIdNo").disable();
    this.CustomerForm.get("MrIdTypeCode").disable();
    this.CustomerForm.get("IdNo").disable();
    this.IsLockCopyAddrBtn = true;
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
  //#endregion

  //#region Get

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
    this.GetCustCompanyData();

    if (this.CustDataMode != CommonConstant.CustMainDataModeCust) {
      this.IsLockEdit();
    }
    this.IsLockCopyAddrBtn = true;
  }

  async GetCustData(custId: number = this.CustId) {
    await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: custId }).toPromise().then(
      (response: CustObj) => {
        this.custObj = response;
        this.thirdPartyTrxNo = this.custObj.ThirdPartyTrxNo;
        this.IsCustLoaded = true;
        this.CustomerForm.patchValue({
          CustName: this.custObj.CustName,
          MrCustTypeCode: this.custObj.MrCustTypeCode,
          TaxIdNo: this.custObj.TaxIdNo,
          MrCustModelCode: this.custObj.MrCustModelCode,
          MrIdTypeCode: this.custObj.MrIdTypeCode,
          IdNo: this.custObj.IdNo
        });
        this.existingCustomerLookUpObj.nameSelect = response.CustName;
        this.existingCustomerLookUpObj.jsonSelect = { CustName: response.CustName };
        this.existingCustomerLookUpObj.isReady = true;
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
        this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
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
        this.inputAddressObj.inputField = this.inputFieldObj;

        if (this.CustDataMode == CommonConstant.CustMainDataModeCust) {
          this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
        }
      }
    );
  }

  tempCustCompanyObj: CustCompanyObj = new CustCompanyObj();
  GetCustCompanyData(custId: number = this.CustId) {
    this.http.post(this.UrlConstantNew.GetCustCompanyByCustId, { Id: custId }).subscribe(
      (response: CustCompanyObj) => {
        this.tempCustCompanyObj = response;
        this.CustomerForm.patchValue({
          MrCompanyTypeCode: response.MrCompanyTypeCode
        });
      }
    );
  }

  //#endregion
  //#endregion
  Cancel() {
    this.outputCancel.emit();
  }

  async SaveForm() {
    if(this.thirdPartyTrxNo != null && !this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)){
      return;
    }

    let tempForm = this.CustomerForm.getRawValue();
    let reqSubmitObj: ReqCoyObj = new ReqCoyObj();

    reqSubmitObj.CustObj = this.custObj;
    reqSubmitObj.CustObj.CustName = tempForm["CustName"];
    reqSubmitObj.CustObj.TaxIdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.IdNo = tempForm["IdNo"];
    reqSubmitObj.CustObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
    reqSubmitObj.CustObj.MrCustModelCode = tempForm["MrCustModelCode"];
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustTypeCompany;
    reqSubmitObj.CustObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;
    reqSubmitObj.CustObj.ThirdPartyGroupTrxNo = this.thirdPartyTrxGroupNo;

    reqSubmitObj.CustCompanyObj = this.tempCustCompanyObj;
    reqSubmitObj.CustCompanyObj.MrCompanyTypeCode = tempForm["MrCompanyTypeCode"];

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

    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqSubmitObj.CustObj.CustName = tempForm["ExistingCustName"].value;
      reqSubmitObj.CustCompanyMgmntShrholderObj = this.SetCustMgmntShareholder();

      if (reqSubmitObj.CustCompanyMgmntShrholderObj.IsActive) {
        let tempTotalSharePrctTobeAdd = this.tempTotalSharePrct + reqSubmitObj.CustCompanyMgmntShrholderObj.SharePrcnt;
        if (tempTotalSharePrctTobeAdd > 100) {
          this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_CAN_NOT_100);
          this.toastr.warningMessage("Total Share now is " + this.tempTotalSharePrct + "%");
          return;
        }
      }
    }

    reqSubmitObj = this.SetCustomerDataMode(reqSubmitObj);

    reqSubmitObj.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
    this.isSubmit = true;
    this.outputIsSubmit.emit(this.isSubmit);
    this.outputAfterSave.emit(reqSubmitObj);
  }
  private SetCustomerDataMode(reqSubmitObj: ReqCoyObj) {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        this.SetIsTypeDataMode(reqSubmitObj);
        break;
      case this.CustDataModeShareholder:
        reqSubmitObj.CustObj.IsShareholder = true;
        break;
    }
    return reqSubmitObj;
  }
  private SetIsTypeDataMode(reqSubmitObj: ReqCoyObj) {
    if (this.pageFrom == CommonConstant.CustFromEditMainData) reqSubmitObj.CustObj.IsCustomer = true;
    if (this.pageFrom == CommonConstant.CustFromCustShareholder) reqSubmitObj.CustObj.IsShareholder = true;
  }

  SetCustMgmntShareholder(): CustCompanyMgmntShrholderObj {
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustCompanyMgmntShrholderObj = this.ExistingShareholderObj.CustCompanyMgmntShrholder;
    tempReqObj.CustId = this.ParentCustId;
    tempReqObj.ShareholderId = this.CustId;

    tempReqObj.SharePrcnt = tempForm["SharePrcnt"];
    tempReqObj.MrPositionSlikCode = tempForm["MrPositionSlikCode"];
    tempReqObj.IsActive = tempForm["IsActive"];
    tempReqObj.IsOwner = tempForm["IsOwner"];
    tempReqObj.BusinessStartDt = tempForm["BusinessStartDt"];
    tempReqObj.SignerEndDt = tempForm["SignerEndDt"];
    return tempReqObj
  }

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
              
              this.CustomerForm.controls.TaxIdNo.setValidators([Validators.required, Validators.pattern(patternObjTaxIdNo.pattern)]);
              this.CustomerForm.controls.TaxIdNo.updateValueAndValidity();
            }
          }
        }
      });
  }

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
}
