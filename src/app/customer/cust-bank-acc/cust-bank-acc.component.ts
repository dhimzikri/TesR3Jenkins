import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, NgForm, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CustBankStmntObj } from 'app/shared/model/cust-bank-stmnt-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { CustBankAccObj } from 'app/shared/model/cust-bank-acc-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-cust-bank-acc',
  templateUrl: './cust-bank-acc.component.html'
})
export class CustBankAccComponent implements OnInit {
  @Input() CustId: number;
  @Output() OutputObj: EventEmitter<any> = new EventEmitter();
  Mode: string = "Add";
  Title: string = "Add Bank Account"
  DefaultMonth: string;
  IsDetail: boolean = false;
  BankAccObj: CustBankAccObj = new CustBankAccObj();
  BankStmntObj: CustBankStmntObj = new CustBankStmntObj();
  MonthObj: Array<KeyValueObj> = new Array();
  CustListBankStmntObj: Array<CustBankStmntObj> = new Array();
  BankStmntList: Array<CustBankStmntObj> = new Array();
  InputLookupBankObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  CustBankAccList: Array<CustBankAccObj> = new Array<CustBankAccObj>();

  BankAccStmntForm = this.fb.group({
    BankCode: [''],
    BankBranch: ['', Validators.required],
    BankAccName: ['', Validators.required],
    BankAccNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    IsDefault: [false],
    IsActive: [false],
    BankStmntObjs: this.fb.array([])
  })

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMonth }).subscribe(
      (response) => {
        this.MonthObj = response[CommonConstant.ReturnObj];
        if (this.MonthObj.length > 0) {
          this.DefaultMonth = this.MonthObj[0].Value;
        }
      }
    );

    this.InputLookupBankObj.urlJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.InputLookupBankObj.pagingJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.InputLookupBankObj.genericJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.InputLookupBankObj.isReady = true;

    this.GetCustBankAccList();
    this.FormValidity(this.IsDetail, true);
  }

  GetCustBankAccList() {
    this.http.post(this.UrlConstantNew.GetCBAForCustFinDataByCustId, {Id : this.CustId}).subscribe(
      (response: any) => {
        this.CustBankAccList = response.ListCBAForCustFinData;
      }
    );
  }

  GetBank(event) {
    this.BankAccObj.RefBankId = event.refBankId;
  }

  CustBankHandler(Mode: string, BankAccAndStmntObj: CustBankAccObj = undefined) {
    this.ClearForm();

    switch (Mode) {
      case "Add":
        this.IsDetail = true;
        this.Mode = "Add";
        this.CheckDefault();
        break;
      case "Edit":
        this.IsDetail = true;
        this.Mode = "Edit";
        this.Title = "Edit Bank Account";
        this.SetForEdit(BankAccAndStmntObj);
        break;
      case "Delete":
        this.IsDetail = false;
        this.DeleteBankAcc(BankAccAndStmntObj.CustBankAccId);
        break;
      case "Cancel":
        this.IsDetail = false;
        break;
    }
    this.FormValidity(this.IsDetail);
    this.OutputObj.emit({ Key: 'IsDetail', Value: this.IsDetail });
  }

  SetForEdit(BankAccAndStmntObj) {
    this.InputLookupBankObj.nameSelect = BankAccAndStmntObj.BankName;
    this.InputLookupBankObj.jsonSelect = { bankName: BankAccAndStmntObj.BankName };
    this.BankAccObj.CustBankAccId = BankAccAndStmntObj.CustBankAccId;
    this.BankAccObj.RefBankId = BankAccAndStmntObj.RefBankId;
    this.BankAccObj.RowVersion = BankAccAndStmntObj.RowVersion;

    this.BankAccStmntForm.patchValue({
      BankBranch: BankAccAndStmntObj.BankBranch,
      BankAccName: BankAccAndStmntObj.BankAccName,
      BankAccNo: BankAccAndStmntObj.BankAccNo,
      IsDefault: BankAccAndStmntObj.IsDefault,
      IsActive: BankAccAndStmntObj.IsActive,
    })
    
    this.CheckDefault();

    if (BankAccAndStmntObj.BankStmntList != undefined) {
      var bankStmnObjs = this.BankAccStmntForm.controls['BankStmntObjs'] as FormArray;
      for (let i = 0; i < BankAccAndStmntObj.BankStmntList.length; i++) {
        bankStmnObjs.push(this.AddGroup(BankAccAndStmntObj.BankStmntList[i]));
      }
    }

    this.CustListBankStmntObj = BankAccAndStmntObj.BankStmntList;
  }

  ClearForm() {
    this.BankAccStmntForm.patchValue({
      BankCode: "",
      BankBranch: "",
      BankAccName: "",
      BankAccNo: "",
      IsDefault: false,
      IsActive: false
    })

    this.InputLookupBankObj.nameSelect = "";
    this.InputLookupBankObj.jsonSelect = { bankName: "" };

    //reset bank statement
    var bankStmnObjs = this.BankAccStmntForm.controls['BankStmntObjs'] as FormArray;
    bankStmnObjs.reset();
    while (bankStmnObjs.length !== 0) bankStmnObjs.removeAt(0)
  }

  FormValidity(IsDetail: boolean, IsFirstInit: boolean = false) {
    if (IsDetail) {
      this.InputLookupBankObj.isRequired = true;
      this.BankAccStmntForm.controls.BankBranch.setValidators([Validators.required]);
      this.BankAccStmntForm.controls.BankAccName.setValidators([Validators.required]);
      this.BankAccStmntForm.controls.BankAccNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
      for (let i = 0; i < this.BankAccStmntForm.controls.BankStmntObjs["controls"].length; i++) {
        this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["Month"].setValidators([Validators.required]);
        this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["Year"].setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(4)]);
        this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["DebitAmt"].setValidators([Validators.required]);
        this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["CreditAmt"].setValidators([Validators.required]);
        this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["BalanceAmt"].setValidators([Validators.required]);
      }
    } else {
      this.InputLookupBankObj.isRequired = false;
      this.BankAccStmntForm.controls.BankBranch.clearValidators();
      this.BankAccStmntForm.controls.BankAccName.clearValidators();
      this.BankAccStmntForm.controls.BankAccNo.clearValidators();
      if (!IsFirstInit) {
        for (let i = 0; i < this.BankAccStmntForm.controls.BankStmntObjs["controls"].length; i++) {
          this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["Month"].clearValidators();
          this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["Year"].clearValidators();
          this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["DebitAmt"].clearValidators();
          this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["CreditAmt"].clearValidators();
          this.BankAccStmntForm.controls.BankStmntObjs["controls"][i]["controls"]["BalanceAmt"].clearValidators();
        }
      }
    }
    this.BankAccStmntForm.updateValueAndValidity();
  }

  CheckDefault(){
    if(this.BankAccStmntForm.controls.IsDefault.value){
      this.BankAccStmntForm.patchValue({
        IsActive : true
      });
      this.BankAccStmntForm.controls.IsActive.disable();
    }
    else{
      this.BankAccStmntForm.controls.IsActive.enable();
    }
  }

  AddRowCustBankStmnt() {
    var bankStmnObjs = this.BankAccStmntForm.controls['BankStmntObjs'] as FormArray;
    bankStmnObjs.push(this.AddGroup(undefined));
    this.FormValidity(this.IsDetail);
  }

  AddGroup(bankStmntObj) {
    if (bankStmntObj == undefined) {
      var dateYear = 0;
      if (this.BankAccStmntForm.value['BankStmntObjs'].length > 0)
        dateYear = this.BankAccStmntForm.value['BankStmntObjs'][0].Year;
      else {
        var userAcc = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        var month = new Date(userAcc.BusinessDt).getMonth();
        dateYear = new Date(userAcc.BusinessDt).getFullYear();
        if (month == 0) dateYear--;
      }

      return this.fb.group({
        Month: [this.DefaultMonth, [Validators.required, Validators.maxLength(2)]],
        Year: [dateYear, [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
        DebitAmt: [0, Validators.required],
        CreditAmt: [0, Validators.required],
        BalanceAmt: [0, Validators.required]
      })
    } else {
      return this.fb.group({
        Month: [bankStmntObj.Month, [Validators.required, Validators.maxLength(2)]],
        Year: [bankStmntObj.Year, [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
        DebitAmt: [bankStmntObj.DebitAmt, Validators.required],
        CreditAmt: [bankStmntObj.CreditAmt, Validators.required],
        BalanceAmt: [bankStmntObj.BalanceAmt, Validators.required]
      })
    }
  }

  DeleteBankAcc(CustBankAccId: number) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      let reqObj: GenericObj = new GenericObj();
      reqObj.Id = CustBankAccId;
      this.http.post(this.UrlConstantNew.DeleteCustBankAccAndStmnt, reqObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.GetCustBankAccList();
        });
    }
  }

  RemoveCustBankStmnt(i) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      var bankStmnObjs = this.BankAccStmntForm.controls['BankStmntObjs'] as FormArray;
      bankStmnObjs.removeAt(i);
    }
  }

  SaveForm(enjiForm: NgForm) {
    this.BankStmntList = new Array();
    this.BankAccObj.CustId = this.CustId;
    this.BankAccObj.BankBranch = this.BankAccStmntForm.controls.BankBranch.value;
    this.BankAccObj.BankAccName = this.BankAccStmntForm.controls.BankAccName.value;
    this.BankAccObj.BankAccNo = this.BankAccStmntForm.controls.BankAccNo.value;
    this.BankAccObj.IsDefault = this.BankAccStmntForm.controls.IsDefault.value;
    this.BankAccObj.IsActive = this.BankAccStmntForm.controls.IsActive.value;
    this.BankAccObj.ListBankStmntObj = this.BankAccStmntForm.controls.BankStmntObjs.value;

    for (let i = 0; i < this.BankAccObj.ListBankStmntObj.length; i++) {
      for (let j = i + 1; j < this.BankAccObj.ListBankStmntObj.length; j++) {
        if (this.BankAccObj.ListBankStmntObj[i]["Month"] == this.BankAccObj.ListBankStmntObj[j]["Month"] && this.BankAccObj.ListBankStmntObj[i]["Year"] == this.BankAccObj.ListBankStmntObj[j]["Year"]) {
          this.toastr.errorMessage(ExceptionConstant.STATEMENT_WITH_SAME_MONTH_AND_YEAR);
          return;
        }
      }
    }

    if (this.Mode != "Edit") {
      this.http.post(this.UrlConstantNew.AddCustBankAcc, this.BankAccObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.OutputObj.emit({ Key: 'IsDetail', Value: false });
          this.GetCustBankAccList();
          enjiForm.resetForm();
        });
    } else {
      this.http.post(this.UrlConstantNew.EditCustBankAcc, this.BankAccObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.OutputObj.emit({ Key: 'IsDetail', Value: false });
          this.GetCustBankAccList();
          enjiForm.resetForm();
        });
    }
    this.IsDetail = false
  }
}
