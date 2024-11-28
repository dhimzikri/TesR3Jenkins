import { Component, OnInit } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { RefEmployeeObj } from 'app/shared/model/ref-employee-obj';
import { RefUserObj } from 'app/shared/model/ref-user-obj.model';
import { EmpBankAccObj } from 'app/shared/model/emp-bank-acc-obj.model';
import { RefBankObj } from 'app/shared/model/ref-bank-obj.model';
import { Validators, FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { RegexService } from 'app/customer/regex.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { DatePipe } from '@angular/common';
import { ReqRefEmployeeObj } from 'app/shared/model/request/user-organization/ref-emp/req-ref-employee.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefUserRole } from 'app/shared/model/ref-user-role-obj.model';
import { BusinessUnitObj } from 'app/shared/model/business-unit-obj.model';
import { RefJobTitleObj } from 'app/shared/model/ref-job-title-obj.model';
import { OfficeObj } from 'app/shared/model/office-obj.model';
import { RefRoleObj } from 'app/shared/model/ref-role-obj.model';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-system-user-add',
  templateUrl: './system-user-add.component.html',
  providers: [/*NGXToastrService*/ RegexService]
})
export class SystemUserAddComponent implements OnInit {

  pageType: string = "add";
  RefEmpId: number;
  inputLookupBankObj: InputLookupObj;
  generalSettingObj: GeneralSettingObj;
  passwordPattern: string;
  refEmpObj: RefEmployeeObj;
  refUserObj: RefUserObj;
  empBankAccObj: EmpBankAccObj;
  refBankObj: RefBankObj;
  IdTypeList: any;
  businessDt: Date;

  inputPagingObjBusinessUnit: InputLookupObj;
  inputPagingObjJobTitle: InputLookupObj;
  inputPagingObjOffice: InputLookupObj;
  inputPagingObjRole: InputLookupObj;

  userRole = new RefUserRole;

  RefEmpForm = this.fb.group({
    RefUserId: [0, [Validators.required]],
    Username: ['', [Validators.required]],
    IsLockedOut: [false],
    LoggedInMethod: ['DB'],
    RefEmpId: [0, [Validators.required]],
    EmpNo: ['', [Validators.required]],
    EmpName: ['', [Validators.required]],
    JoinDt: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    IsExt: [false],
    IsActive: [true],
    IsLeave: [false],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
    MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
    Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    RowVersion: [''],
    EmpBankAccId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: ['', [Validators.required]],
    BankBranchRegCode: [''],
    BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    BankAccName: ['', [Validators.required]],
    APIKey:[''],
    IsActiveEmpBusinessUnit :[true]
  });
  inputFieldAddr: InputFieldObj = new InputFieldObj(this.UrlConstantNew);
  addressObj: UcAddressObj;
  inputAddressObj: InputAddressObj;
  
  readonly CancelLink: string = NavigationConstant.SYS_USER_PAGING;
  constructor(
    private UrlConstantNew: UrlConstantNew,
    private regexService: RegexService, 
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient, 
    private ngxRouter: NgxRouterService,
    private cookieService: CookieService
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["RefEmpId"] != null) {
        this.RefEmpId = queryParams["RefEmpId"];
      }
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
    });

    this.generalSettingObj = new GeneralSettingObj();
    this.generalSettingObj.GsCode = CommonConstant.GsCodePasswordRegex;
    httpClient.post(this.UrlConstantNew.GetGeneralSettingValueByCode, {Code: CommonConstant.GsCodePasswordRegex}).subscribe(
      (response: {GsValue}) => {
        this.passwordPattern = response.GsValue;
      }
    );
  }

  ngOnInit() {

    if(this.pageType == 'edit'){
      this.RefEmpForm = this.fb.group({
        RefUserId: [0, [Validators.required]],
        Username: ['', [Validators.required]],
        IsLockedOut: [false],
        LoggedInMethod: ['DB'],
        RefEmpId: [0, [Validators.required]],
        EmpNo: ['', [Validators.required]],
        EmpName: ['', [Validators.required]],
        JoinDt: ['', [Validators.required]],
        MrIdTypeCode: ['', [Validators.required]],
        IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        TaxIdNo: [''],
        IsExt: [false],
        IsActive: [true],
        IsLeave: [false],
        MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
        Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
        RowVersion: [''],
        EmpBankAccId: [0, [Validators.required]],
        RefBankId: [0, [Validators.required]],
        BankBranch: ['', [Validators.required]],
        BankBranchRegCode: [''],
        BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        BankAccName: ['', [Validators.required]],
        APIKey:['',[Validators.required]],
        IsActiveEmpBusinessUnit : true
      });
    }else{
      this.RefEmpForm = this.fb.group({
        RefUserId: [0],
        Username: ['', [Validators.required]],
        IsLockedOut: [false],
        LoggedInMethod: ['DB'],
        RefEmpId: [0],
        EmpNo: ['', [Validators.required]],
        EmpName: ['', [Validators.required]],
        JoinDt: ['', [Validators.required]],
        MrIdTypeCode: ['', [Validators.required]],
        IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        TaxIdNo: [''],
        IsExt: [false],
        IsActive: [true],
        IsLeave: [false],
        MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
        Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
        RowVersion: [''],
        EmpBankAccId: [0],
        RefBankId: [0, [Validators.required]],
        BankBranch: ['', [Validators.required]],
        BankBranchRegCode: [''],
        BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        BankAccName: ['', [Validators.required]],
        APIKey:[''],
        IsActiveEmpBusinessUnit : true
      });
    }

    this.customPattern = new Array<CustomPatternObj>();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    this.addressObj = new UcAddressObj();

    var RefMasterIdType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
    }
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterIdType).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.IdTypeList = response[CommonConstant.ReturnObj];
          if (this.pageType != "edit") {
            this.RefEmpForm.patchValue({
              MrIdTypeCode: this.IdTypeList[0].Key
            });
          }
          if(this.IdTypeList != undefined)
          {
            this.getInitPattern();
          }
        }
      }
    );

    this.inputLookupBankObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupBankObj.urlJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.pagingJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.genericJson = "./assets/uclookup/Bank/lookupBank.json";
    this.initLookUp();

    if (this.pageType == "edit") 
    {
      var empObj = new RefEmpObj();
      empObj.RefEmpId = this.RefEmpId;

      this.http.post(this.UrlConstantNew.GetEmpForUpdateById, {Id : this.RefEmpId}).subscribe(
        (response) => {
          this.refEmpObj = response['RefEmpObj'];
          this.refUserObj = response['RefUserObj'];
          this.empBankAccObj = response['EmpBankAccObj'];
          this.refBankObj = response['RefBankObj'];
          this.userRole = response['RefUserRoleObj'];

          var datePipe = new DatePipe("en-US");
          var joinDt = datePipe.transform(this.refEmpObj.JoinDt, 'yyyy-MM-dd');
          this.RefEmpForm.patchValue({
            RefUserId: this.refUserObj.RefUserId,
            Username: this.refUserObj.Username,
            IsLockedOut: this.refUserObj.IsLockedOut,
            LoggedInMethod: this.refUserObj.LoggedInMethod,
            RefEmpId: this.refEmpObj.RefEmpId,
            EmpNo: this.refEmpObj.EmpNo,
            EmpName: this.refEmpObj.EmpName,
            JoinDt: joinDt,
            MrIdTypeCode: this.refEmpObj.MrIdTypeCode,
            IdNo: this.refEmpObj.IdNo,
            TaxIdNo: this.refEmpObj.TaxIdNo,
            IsExt: this.refEmpObj.IsExt,
            IsActive: this.refEmpObj.IsActive,
            IsLeave: this.refEmpObj.IsLeave,   
            MobilePhnNo1: this.refEmpObj.MobilePhnNo1,
            MobilePhnNo2: this.refEmpObj.MobilePhnNo2,
            Email1: this.refEmpObj.Email1,
            Email2: this.refEmpObj.Email2,
            RowVersion: this.refEmpObj.RowVersion,
            EmpBankAccId: this.empBankAccObj.EmpBankAccId,
            RefBankId: this.empBankAccObj.RefBankId,
            BankBranch: this.empBankAccObj.BankBranch,
            BankBranchRegCode: this.empBankAccObj.BankBranchRegCode,
            BankAccNo: this.empBankAccObj.BankAccNo,
            BankAccName: this.empBankAccObj.BankAccName,
            APIKey : this.refUserObj.Token,
            IsActiveEmpBusinessUnit : this.userRole.IsActive
          });
          this.inputLookupBankObj.jsonSelect = this.refBankObj;
          this.inputLookupBankObj.idSelect = this.refBankObj.RefBankId;
          this.inputLookupBankObj.nameSelect = this.refBankObj.BankName;
          this.inputLookupBankObj.jsonSelect = { BankName: this.refBankObj.BankName };

          this.addressObj.Addr = this.refEmpObj.Addr;
          this.addressObj.AreaCode4 = this.refEmpObj.AreaCode4;
          this.addressObj.AreaCode3 = this.refEmpObj.AreaCode3;
          this.addressObj.AreaCode2 = this.refEmpObj.AreaCode2;
          this.addressObj.AreaCode1 = this.refEmpObj.AreaCode1;
          this.addressObj.City = this.refEmpObj.City;
          this.addressObj.PhnArea1 = this.refEmpObj.PhnArea1;
          this.addressObj.Phn1 = this.refEmpObj.Phn1;
          this.addressObj.PhnExt1 = this.refEmpObj.PhnExt1;
          this.addressObj.PhnArea2 = this.refEmpObj.PhnArea2;
          this.addressObj.Phn2 = this.refEmpObj.Phn2;
          this.addressObj.PhnExt2 = this.refEmpObj.PhnExt2;
          this.addressObj.PhnArea3 = this.refEmpObj.PhnArea3;
          this.addressObj.Phn3 = this.refEmpObj.Phn3;
          this.addressObj.PhnExt3 = this.refEmpObj.PhnExt3;
          this.addressObj.FaxArea = this.refEmpObj.FaxArea;
          this.addressObj.Fax = this.refEmpObj.Fax;
          this.inputFieldAddr.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
          this.inputFieldAddr.inputLookupObj.jsonSelect = { Zipcode: this.refEmpObj.Zipcode };
          this.inputFieldAddr.inputLookupObj.nameSelect = this.refEmpObj.Zipcode;

          var BizUnit = new BusinessUnitObj();
          
          BizUnit.RefBizUnitId = this.userRole.RefBizUnitId;

          this.http.post(this.UrlConstantNew.GetRefBizUnit, {Id : BizUnit.RefBizUnitId}).subscribe(
            (response) => {
              this.inputPagingObjBusinessUnit.nameSelect = response["BizUnitName"];
            }
          )

          var JobTitle = new RefJobTitleObj();
          JobTitle.RefJobTitleId = this.userRole.RefJobTitleId;

          this.http.post(this.UrlConstantNew.GetRefJobTitleById, {Id: JobTitle.RefJobTitleId}).subscribe(
            (response) => {
              this.inputPagingObjJobTitle.nameSelect = response["JobTitleName"];
            }
          )

          var Office = new OfficeObj();
          if(this.userRole.RefOfficeId != 0){
            Office.RefOfficeId = this.userRole.RefOfficeId;
            console.log("office",Office);
            this.http.post(this.UrlConstantNew.GetRefOfficeByRefOfficeId, {Id : Office.RefOfficeId}).subscribe(
              (response) => {
                this.inputPagingObjOffice.nameSelect = response["OfficeName"];
              }
            )
          }

          var Role = new RefRoleObj();
          Role.RefRoleId = this.userRole.RefRoleId;
          this.http.post(this.UrlConstantNew.GetRefRoleByRefRoleId, {Id : Role.RefRoleId}).subscribe(
            (response) => {
              this.inputPagingObjRole.nameSelect = response["RoleName"];
            }
          )

        }
      );
    }
    this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputAddressObj.requiredPhn1 = true;
    this.inputAddressObj.default = this.addressObj;
    this.inputAddressObj.inputField = this.inputFieldAddr;
  }

  getLookupBankResponse(e) {
    this.RefEmpForm.patchValue({
      RefBankId: e.RefBankId,
      BankBranchRegCode: e.RegRptCode
    });
  }

  validateDate() {
    let date = new Date(this.RefEmpForm.controls.JoinDt.value);
    let localDt = this.convertToMMddyyyy(date);
    let localBizDt = this.convertToMMddyyyy(this.businessDt)
    if(localDt > localBizDt) {
      this.toastr.warningMessage("Join Date Cannot Exceed Business Date");
      this.RefEmpForm.patchValue({
        JoinDt: ''
      });
      return false;
    }
    return true;
  }

  convertToMMddyyyy(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  SaveForm() {
    if(!this.validateDate()) {
      return;
    }
    this.spinner.show();
    var refEmpFormData = this.RefEmpForm.value;

    var refEmpData = new ReqRefEmployeeObj();
    refEmpData.RefEmployeeObj.RefEmpId = refEmpFormData.RefEmpId;
    refEmpData.RefEmployeeObj.EmpNo = refEmpFormData.EmpNo;
    refEmpData.RefEmployeeObj.EmpName = refEmpFormData.EmpName;
    refEmpData.RefEmployeeObj.JoinDt = refEmpFormData.JoinDt;
    refEmpData.RefEmployeeObj.MrIdTypeCode = refEmpFormData.MrIdTypeCode;
    refEmpData.RefEmployeeObj.IdNo = refEmpFormData.IdNo;
    refEmpData.RefEmployeeObj.TaxIdNo = refEmpFormData.TaxIdNo;
    refEmpData.RefEmployeeObj.IsExt = refEmpFormData.IsExt;
    refEmpData.RefEmployeeObj.IsActive = refEmpFormData.IsActive;
    refEmpData.RefEmployeeObj.IsLeave = refEmpFormData.IsLeave;
    refEmpData.RefEmployeeObj.Addr = refEmpFormData.UcAddress.Addr;
    refEmpData.RefEmployeeObj.Zipcode = refEmpFormData.UcAddressZipcode.value;
    refEmpData.RefEmployeeObj.AreaCode1 = refEmpFormData.UcAddress.AreaCode1;
    refEmpData.RefEmployeeObj.AreaCode2 = refEmpFormData.UcAddress.AreaCode2;
    refEmpData.RefEmployeeObj.AreaCode3 = refEmpFormData.UcAddress.AreaCode3;
    refEmpData.RefEmployeeObj.AreaCode4 = refEmpFormData.UcAddress.AreaCode4;
    refEmpData.RefEmployeeObj.City = refEmpFormData.UcAddress.City;
    refEmpData.RefEmployeeObj.PhnArea1 = refEmpFormData.UcAddress.PhnArea1;
    refEmpData.RefEmployeeObj.Phn1 = refEmpFormData.UcAddress.Phn1;
    refEmpData.RefEmployeeObj.PhnExt1 = refEmpFormData.UcAddress.PhnExt1;
    refEmpData.RefEmployeeObj.PhnArea2 = refEmpFormData.UcAddress.PhnArea2;
    refEmpData.RefEmployeeObj.Phn2 = refEmpFormData.UcAddress.Phn2;
    refEmpData.RefEmployeeObj.PhnExt2 = refEmpFormData.UcAddress.PhnExt2;
    refEmpData.RefEmployeeObj.PhnArea3 = refEmpFormData.UcAddress.PhnArea3;
    refEmpData.RefEmployeeObj.Phn3 = refEmpFormData.UcAddress.Phn3;
    refEmpData.RefEmployeeObj.PhnExt3 = refEmpFormData.UcAddress.PhnExt3;
    refEmpData.RefEmployeeObj.FaxArea = refEmpFormData.UcAddress.FaxArea;
    refEmpData.RefEmployeeObj.Fax = refEmpFormData.UcAddress.Fax;
    refEmpData.RefEmployeeObj.MobilePhnNo1 = refEmpFormData.MobilePhnNo1;
    refEmpData.RefEmployeeObj.MobilePhnNo2 = refEmpFormData.MobilePhnNo2;
    refEmpData.RefEmployeeObj.Email1 = refEmpFormData.Email1;
    refEmpData.RefEmployeeObj.Email2 = refEmpFormData.Email2;
    refEmpData.RefEmployeeObj.RowVersion = refEmpFormData.RowVersion;

    refEmpData.RefUserObj = new RefUserObj();
    refEmpData.RefUserObj.RefUserId = refEmpFormData.RefUserId;
    refEmpData.RefUserObj.Username = refEmpFormData.Username;
    refEmpData.RefUserObj.IsLockedOut = refEmpFormData.IsLockedOut;
    refEmpData.RefUserObj.RefEmpId = refEmpFormData.RefEmpId;
    refEmpData.RefUserObj.LoggedInMethod = refEmpFormData.LoggedInMethod;
    refEmpData.RefUserObj.IsActive = refEmpFormData.IsActive;
    refEmpData.RefUserObj.Password = "-";
    refEmpData.RefUserObj.APIKey = refEmpFormData.APIKey;
    refEmpData.RefUserObj.IsSystemUser = true;

    refEmpData.EmpBankAccObj = new EmpBankAccObj();
    refEmpData.EmpBankAccObj.EmpBankAccId = refEmpFormData.EmpBankAccId;
    refEmpData.EmpBankAccObj.RefBankId = refEmpFormData.RefBankId;
    refEmpData.EmpBankAccObj.BankBranch = refEmpFormData.BankBranch;
    refEmpData.EmpBankAccObj.BankBranchRegCode = refEmpFormData.BankBranchRegCode
    refEmpData.EmpBankAccObj.BankAccNo = refEmpFormData.BankAccNo;
    refEmpData.EmpBankAccObj.BankAccName = refEmpFormData.BankAccName;
    refEmpData.EmpBankAccObj.RefEmpId = refEmpFormData.RefEmpId;

    this.userRole.IsActive = this.RefEmpForm.controls.IsActiveEmpBusinessUnit.value;
    this.userRole.RowVersion = "";
    if (this.pageType == "edit") {
      this.userRole.RefUserId = refEmpFormData.RefUserId;
    }else{
      this.userRole.RefUserId = 1;
    }
    
    refEmpData.RefUserRoleObj = this.userRole;

    if (this.pageType == "add") {
      this.httpClient.post(this.UrlConstantNew.AddRefEmp, refEmpData).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYS_USER_PAGING],{});
        }
      );
    }
    else {
      refEmpData.EmpBankAccObj.RowVersion = this.empBankAccObj.RowVersion;
      refEmpData.RefUserObj.RowVersion = this.refUserObj.RowVersion;
      this.httpClient.post(this.UrlConstantNew.EditRefEmp, refEmpData).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYS_USER_PAGING],{});
        }
      );
    }
  }
  //START URS-LOS-041

  onOptionsSelected(event){  
    this.setValidatorPattern();
  }

  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if(this.resultPattern != undefined)
        {
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
    );
  }

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.RefEmpForm.controls[this.controlNameIdType].value;
    var pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        var result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    if (pattern != undefined) {
      this.RefEmpForm.controls[this.controlNameIdNo].setValidators([Validators.required, Validators.pattern(pattern)]);
      this.RefEmpForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }

  regenetate(){
    var refEmpFormData = this.RefEmpForm.value;
    
    this.httpClient.post(this.UrlConstantNew.GenerateAPIKey, {Username : refEmpFormData.Username, TimeToLive : 365}).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        window.location.reload();
      }
    );
  }

  revoke(){
    var refEmpFormData = this.RefEmpForm.value;
    this.httpClient.post(this.UrlConstantNew.RevokeAPIKey, {UserName : refEmpFormData.Username}).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        window.location.reload();
      }
    );
  }

  initLookUp() {
    this.inputPagingObjBusinessUnit = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjBusinessUnit.urlJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";
    this.inputPagingObjBusinessUnit.pagingJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";
    this.inputPagingObjBusinessUnit.genericJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";

    this.inputPagingObjJobTitle = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjJobTitle.urlJson = "./assets/lookup/lookupEmployeeJobTitle.json";
    this.inputPagingObjJobTitle.pagingJson = "./assets/lookup/lookupEmployeeJobTitle.json";
    this.inputPagingObjJobTitle.genericJson = "./assets/lookup/lookupEmployeeJobTitle.json";

    this.inputPagingObjOffice = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjOffice.urlJson = "./assets/lookup/lookupEmployeeOffice.json";
    this.inputPagingObjOffice.pagingJson = "./assets/lookup/lookupEmployeeOffice.json";
    this.inputPagingObjOffice.genericJson = "./assets/lookup/lookupEmployeeOffice.json";

    this.inputPagingObjRole = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjRole.urlJson = "./assets/lookup/lookupEmployeeRole.json";
    this.inputPagingObjRole.pagingJson = "./assets/lookup/lookupEmployeeRole.json";
    this.inputPagingObjRole.genericJson = "./assets/lookup/lookupEmployeeRole.json";

  }

  //#region getLookup
  getBizUnitId(ev) {
    this.userRole.RefBizUnitId = ev.RefBizUnitId;

  }
  getJobTitleId(ev) {
    this.userRole.RefJobTitleId = ev.RefJobTitleId;

  }
  getOfficeId(ev) {
    this.userRole.RefOfficeId = ev.RefOfficeId;

  }
  getRoleId(ev) {
    this.userRole.RefRoleId = ev.RefRoleId;

  }
  //#endregion

}
