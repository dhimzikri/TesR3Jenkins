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
  selector: 'app-employee-bank-information-edit-x',
  templateUrl: './employee-bank-information-edit-x.component.html'
})
export class EmployeeBankInformationEditXComponent implements OnInit {

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
  username: any;
  empName: any;
  empNo: any;
  isActive : any;

  RefEmpForm = this.fb.group({
    RefUserId: [0, [Validators.required]],
    Username: ['', [Validators.required]],
    LoggedInMethod: ['DB'],
    RefEmpId: [0, [Validators.required]],
    EmpNo: ['', [Validators.required]],
    EmpName: ['', [Validators.required]],
    RowVersion: [''],
    EmpBankAccId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: ['', [Validators.required]],
    BankBranchRegCode: [''],
    BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    BankAccName: ['', [Validators.required]]
  });
  inputFieldAddr: InputFieldObj = new InputFieldObj(this.UrlConstantNew);
  addressObj: UcAddressObj;
  inputAddressObj: InputAddressObj;
  
  readonly CancelLink: string = NavigationConstant.EMP_BANK_ACCOUNT_X;
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
        RefEmpId: [0, [Validators.required]],
        EmpNo: ['', [Validators.required]],
        EmpName: ['', [Validators.required]],
        IdNo: [''],
        RowVersion: [''],
        EmpBankAccId: [0, [Validators.required]],
        RefBankId: [0, [Validators.required]],
        BankBranch: ['', [Validators.required]],
        BankBranchRegCode: [''],
        BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        BankAccName: ['', [Validators.required]]
      });
    }else{
      this.RefEmpForm = this.fb.group({
        EmpBankAccId: [0],
        RefBankId: [0, [Validators.required]],
        BankBranch: ['', [Validators.required]],
        BankBranchRegCode: [''],
        BankAccNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        BankAccName: ['', [Validators.required]]
      });
    }

    this.customPattern = new Array<CustomPatternObj>();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    this.addressObj = new UcAddressObj();

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

          this.username = this.refUserObj.Username;
          this.empNo = this.refEmpObj.EmpNo;
          this.empName = this.refEmpObj.EmpName;
          this.isActive= this.refEmpObj.IsActive;

          this.RefEmpForm.patchValue({
            RefUserId: this.refUserObj.RefUserId,
            Username: this.refUserObj.Username,
            LoggedInMethod: this.refUserObj.LoggedInMethod,
            RefEmpId: this.refEmpObj.RefEmpId,
            EmpNo: this.refEmpObj.EmpNo,
            EmpName: this.refEmpObj.EmpName,
            IdNo: this.refEmpObj.IdNo,
            RowVersion: this.refEmpObj.RowVersion,
            EmpBankAccId: this.empBankAccObj.EmpBankAccId,
            RefBankId: this.empBankAccObj.RefBankId,
            BankBranch: this.empBankAccObj.BankBranch,
            BankBranchRegCode: this.empBankAccObj.BankBranchRegCode,
            BankAccNo: this.empBankAccObj.BankAccNo,
            BankAccName: this.empBankAccObj.BankAccName
          });
          this.inputLookupBankObj.jsonSelect = this.refBankObj;
          this.inputLookupBankObj.idSelect = this.refBankObj.RefBankId;
          this.inputLookupBankObj.nameSelect = this.refBankObj.BankName;
          this.inputLookupBankObj.jsonSelect = { BankName: this.refBankObj.BankName };
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

  convertToMMddyyyy(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  SaveForm() {
    this.spinner.show();
    var refEmpFormData = this.RefEmpForm.value;

    var refEmpData = new ReqRefEmployeeObj();
    refEmpData.RefEmployeeObj.RefEmpId = refEmpFormData.RefEmpId;
    refEmpData.RefEmployeeObj.EmpNo = refEmpFormData.EmpNo;
    refEmpData.RefEmployeeObj.EmpName = refEmpFormData.EmpName;
    refEmpData.RefUserObj.RefUserId = refEmpFormData.RefUserId;
    refEmpData.RefUserObj.Username = refEmpFormData.Username;
    refEmpData.RefUserObj.LoggedInMethod = refEmpFormData.LoggedInMethod;

    refEmpData.EmpBankAccObj = new EmpBankAccObj();
    refEmpData.EmpBankAccObj.EmpBankAccId = refEmpFormData.EmpBankAccId;
    refEmpData.EmpBankAccObj.RefBankId = refEmpFormData.RefBankId;
    refEmpData.EmpBankAccObj.BankBranch = refEmpFormData.BankBranch;
    refEmpData.EmpBankAccObj.BankBranchRegCode = refEmpFormData.BankBranchRegCode
    refEmpData.EmpBankAccObj.BankAccNo = refEmpFormData.BankAccNo;
    refEmpData.EmpBankAccObj.BankAccName = refEmpFormData.BankAccName;
    refEmpData.EmpBankAccObj.RefEmpId = refEmpFormData.RefEmpId;

    refEmpData.EmpBankAccObj.RowVersion = this.empBankAccObj.RowVersion;
    this.http.post(this.UrlConstantNew.EditEmpBankAccX, refEmpData.EmpBankAccObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_BANK_ACCOUNT_X]);
      }
    );
    
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

}
