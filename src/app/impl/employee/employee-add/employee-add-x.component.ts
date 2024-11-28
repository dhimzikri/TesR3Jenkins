import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { RefEmpObj } from "app/shared/model/ref-emp-obj.model";
import { FormBuilder, Validators } from "@angular/forms";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { DatePipe } from "@angular/common";
import { RefBankObj } from "app/shared/model/ref-bank-obj.model";
import { InputLookupObj } from "app/shared/model/input-lookup-obj.model";
import { NgxSpinnerService } from "ngx-spinner";
import { RefUserObj } from "app/shared/model/ref-user-obj.model";
import { EmpBankAccObj } from "app/shared/model/emp-bank-acc-obj.model";
import { GeneralSettingObj } from "app/shared/model/general-setting-obj.model";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { UcAddressObj } from "app/shared/model/uc-address-obj.model";
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { AdInsHelper } from "app/shared/AdInsHelper";
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CookieService } from "ngx-cookie";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { RefEmployeeObj } from "app/shared/model/ref-employee-obj";
import { ReqRefEmployeeObj } from "app/shared/model/request/user-organization/ref-emp/req-ref-employee.model";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NgxRouterService } from "@adins/fe-core";

@Component({
  selector: 'app-employee-add-x',
  templateUrl: './employee-add-x.component.html'
})
export class EmployeeAddXComponent implements OnInit {

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
    IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(16)]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]],
    IsExt: [false],
    IsActive: [true],
    IsLeave: [false],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
    MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
    Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    RowVersion: [''],
    // EmpBankAccId: [0, [Validators.required]],
    // RefBankId: [0, [Validators.required]],
    // BankBranch: ['', [Validators.required]],
    // BankBranchRegCode: [''],
    // BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    // BankAccName: ['', [Validators.required]]
  });
  inputFieldAddr: InputFieldObj = new InputFieldObj(this.UrlConstantNew);
  addressObj: UcAddressObj = new UcAddressObj();

  inputAddressObj: InputAddressObj;
  
  readonly CancelLink: string = NavigationConstant.EMP_PAGING_X;
  constructor(
    private regexService: RegexService, 
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
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
    this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, {Code: CommonConstant.GsCodePasswordRegex}).subscribe(
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
        IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(16)]],
        TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]],
        IsExt: [false],
        IsActive: [true],
        IsLeave: [false],
        MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
        Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
        RowVersion: [''],
        // EmpBankAccId: [0, [Validators.required]],
        // RefBankId: [0, [Validators.required]],
        // BankBranch: ['', [Validators.required]],
        // BankBranchRegCode: [''],
        // BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        // BankAccName: ['', [Validators.required]]
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
        IdNo: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(16)]],
        TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]],
        IsExt: [false],
        IsActive: [true],
        IsLeave: [false],
        MobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        MobilePhnNo2: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
        Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
        Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
        RowVersion: [''],
        // EmpBankAccId: [0],
        // RefBankId: [0, [Validators.required]],
        // BankBranch: ['', [Validators.required]],
        // BankBranchRegCode: [''],
        // BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        // BankAccName: ['', [Validators.required]]
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
            // EmpBankAccId: this.empBankAccObj.EmpBankAccId,
            // RefBankId: this.empBankAccObj.RefBankId,
            // BankBranch: this.empBankAccObj.BankBranch,
            // BankBranchRegCode: this.empBankAccObj.BankBranchRegCode,
            // BankAccNo: this.empBankAccObj.BankAccNo,
            // BankAccName: this.empBankAccObj.BankAccName
          });
          // this.inputLookupBankObj.jsonSelect = this.refBankObj;
          // this.inputLookupBankObj.idSelect = this.refBankObj.RefBankId;
          // this.inputLookupBankObj.nameSelect = this.refBankObj.BankName;
          // this.inputLookupBankObj.jsonSelect = { BankName: this.refBankObj.BankName };

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

    refEmpData.EmpBankAccObj = null;
    // refEmpData.EmpBankAccObj = new EmpBankAccObj();
    // refEmpData.EmpBankAccObj.EmpBankAccId = refEmpFormData.EmpBankAccId;
    // refEmpData.EmpBankAccObj.RefBankId = refEmpFormData.RefBankId;
    // refEmpData.EmpBankAccObj.BankBranch = refEmpFormData.BankBranch;
    // refEmpData.EmpBankAccObj.BankBranchRegCode = refEmpFormData.BankBranchRegCode
    // refEmpData.EmpBankAccObj.BankAccNo = refEmpFormData.BankAccNo;
    // refEmpData.EmpBankAccObj.BankAccName = refEmpFormData.BankAccName;
    // refEmpData.EmpBankAccObj.RefEmpId = refEmpFormData.RefEmpId;

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddRefEmp, refEmpData, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_PAGING_X],{});
        }
      );
    }
    else {
      // refEmpData.EmpBankAccObj.RowVersion = this.empBankAccObj.RowVersion;
      refEmpData.RefUserObj.RowVersion = this.refUserObj.RowVersion;
      this.http.post(this.UrlConstantNew.EditRefEmp, refEmpData, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_PAGING_X],{});
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
      this.RefEmpForm.controls[this.controlNameIdNo].setValidators([Validators.required, Validators.pattern(pattern), Validators.maxLength(16)]);
      this.RefEmpForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
}
