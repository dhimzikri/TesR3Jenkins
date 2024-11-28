import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustBankAccObj } from 'app/shared/model/cust-bank-acc-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { CustBankStmntObj } from 'app/shared/model/cust-bank-stmnt-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-cust-bank-acc-detail-section-findata',
  templateUrl: './cust-bank-acc-detail-section-findata.component.html'
})
export class CustBankAccDetailSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  @Input() pageType: string;
  @Input() modalTitle: string;
  @Input() isAddBankStatement: boolean;
  @Input() CustBankAccId: number;
  monthOfYear: Array<string>;
  rowCustBankStmnt: number;
  inputLookupBank: InputLookupObj;
  maxYear: number;
  bankName: string;
  IsActive: boolean;
  begBalance: number;
  isAlreadyCalc: boolean = false;

  private custBankStmnt: CustBankStmntObj;//yang dipakai tanpa H&D

  CustBankAccForm = this.fb.group({
    CustBankAccId: [0, [Validators.required]],
    CustId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: ['', [Validators.required]],
    BankAccNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    BankAccName: ['', [Validators.required]],
    IsBankStmnt: [false],
    BankBranchRegRptCode: [''],
    BalanceAmt: [0],
    IsDefault: [false],
    IsActive: [false],
    BegBalanceAmt: [0],
    RowVersion: [''],
    CustBankStmnts: this.fb.array([])
  });

  constructor(private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal, 
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew) {
    moment.locale('en');
    this.monthOfYear = new Array(...moment.months());
    this.rowCustBankStmnt = 0;
    this.maxYear = moment().year();
    this.custBankStmnt = new CustBankStmntObj();
  }

  ngOnInit() {
    this.inputLookupBank = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupBank.urlJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.inputLookupBank.pagingJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.inputLookupBank.genericJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    let criteriaList = new Array();
    let criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'IS_ACTIVE';
    criteriaObj.value = CommonConstant.TRUE_CONDITION;
    criteriaList.push(criteriaObj);
    this.inputLookupBank.addCritInput = criteriaList;

    this.CustBankAccForm.patchValue({
      CustId: this.CustId
    });

    if (this.pageType == "edit") {
      let custBankAcc = new CustBankAccObj();
      custBankAcc.CustBankAccId = this.CustBankAccId;
      this.http.post(this.UrlConstantNew.GetCustBankAccByCustBankAccIdWithRefBank, { Id: this.CustBankAccId }).subscribe(
        (response: any) => {
          this.inputLookupBank.nameSelect = response.RefBankObj.BankName;
          this.inputLookupBank.jsonSelect = response.RefBankObj;
          this.CustBankAccForm.patchValue({
            CustBankAccId: response.CustBankAccObj.CustBankAccId,
            CustId: response.CustBankAccObj.CustId,
            RefBankId: response.CustBankAccObj.RefBankId,
            BankBranch: response.CustBankAccObj.BankBranch,
            BankAccNo: response.CustBankAccObj.BankAccNo,
            BankAccName: response.CustBankAccObj.BankAccName,
            IsBankStmnt: response.CustBankAccObj.IsBankStmnt,
            BankBranchRegRptCode: response.CustBankAccObj.BankBranchRegRptCode,
            BalanceAmt: parseFloat(response.CustBankAccObj.BalanceAmt),
            IsDefault: response.CustBankAccObj.IsDefault,
            IsActive: response.CustBankAccObj.IsActive,
            RowVersion: response.CustBankAccObj.RowVersion
          });
          this.CheckDefault(this.CustBankAccForm.controls.IsDefault.value);
        }
      );
    }
    else if (this.pageType == "editStmnt") {
      // let custBankAcc = new CustBankAccObj();
      // custBankAcc.CustBankAccId = this.CustBankAccId;

      let ReqCustBankAcc = {
        Id: this.CustBankAccId
      }

      this.CustBankAccForm.controls['BegBalanceAmt'].setValidators([Validators.required]);

      this.http.post(this.UrlConstantNew.GetCBAForCustFinDataEditModeByCustBankAccId, ReqCustBankAcc).subscribe(
        (response: any) => {
          this.bankName = response.RefBankObj.BankName;
          this.CustBankAccForm.patchValue({
            CustBankAccId: response.CustBankAccObj.CustBankAccId,
            CustId: response.CustBankAccObj.CustId,
            RefBankId: response.CustBankAccObj.RefBankId,
            BankBranch: response.CustBankAccObj.BankBranch,
            BankAccNo: response.CustBankAccObj.BankAccNo,
            BankAccName: response.CustBankAccObj.BankAccName,
            IsBankStmnt: true,
            BankBranchRegRptCode: response.CustBankAccObj.BankBranchRegRptCode,
            BalanceAmt: parseFloat(response.CustBankAccObj.BalanceAmt),
            IsDefault: response.CustBankAccObj.IsDefault,
            IsActive: response.CustBankAccObj.IsActive,
            //BegBalanceAmt: response.CustBankStmntHObj.BegBalanceAmt,
            RowVersion: response.CustBankAccObj.RowVersion
          });
          this.CheckDefault(this.CustBankAccForm.controls.IsDefault.value);
          if (response.CustBankAccObj.IsBankStmnt) {
            // if(response.CustBankStmntObjs != undefined){ //perubahan cara baca ke cust bank stmnt obj bukan dari H&D
            //   if(response.CustBankStmntObjs.length > 0)
            //   {  
            //     //get min year
            //     let listyear = response.CustBankStmntObjs.map(function(a){
            //       return a.Year;
            //     });
            //     let minyear = listyear.reduce(function (a, b) { return a < b ? a : b; }); 
            //     //get min month in year

            //     let listmonth = response.CustBankStmntObjs.filter(x => x.Year == minyear).map(function(a){
            //       return a.Month;
            //     });
            //     let listmonthidx: Array<number> = new Array();

            //     listmonth.forEach(element => {
            //       listmonthidx.push(this.monthOfYear.indexOf(element));
            //     });

            //     let minmonthidx = listmonthidx.reduce(function (a, b) { return a < b ? a : b; });

            //     if(minmonthidx != undefined)
            //     {
            //       let minmonth = this.monthOfYear[minmonthidx];
            //       let minObj = response.CustBankStmntObjs.filter(function(a){
            //         return a.Year == minyear && a.Month == minmonth;
            //       });

            //       if (minObj[0] != undefined) {
            //         if (minObj[0].BegBalanceAmt != undefined) {
            //           //ambil cust bank statement yang terawal
            //           this.CustBankAccForm.patchValue({
            //             BegBalanceAmt: minObj[0].BegBalanceAmt,
            //           });
            //         }
            //       }
            //     }
            //   }
            // }

            this.CustBankAccForm.patchValue({
              BegBalanceAmt: response.CustBankAccObj.BegBalanceAmt,
            });

            //tidak dipakai
            let formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
            for (const item of response.CustBankStmntObjs) {
              let formGroup = this.fb.group({
                CustBankStmntId: [item.CustBankStmntId, [Validators.required]],
                Month: [this.monthOfYear.indexOf(item.Month), [Validators.required]],
                Year: [item.Year, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(4)]],
                DebitTrxCount: [(item.DebitTrxCount == undefined ? 0 : item.DebitTrxCount), [Validators.required, Validators.min(0), Validators.max(9999)]],
                CreditTrxCount: [(item.CreditTrxCount == undefined ? 0 : item.CreditTrxCount), [Validators.required, Validators.min(0), Validators.max(9999)]],
                DebitAmt: [item.DebitAmt, [Validators.required]],
                CreditAmt: [item.CreditAmt, [Validators.required]],
                BalanceAmt: [parseFloat(item.BalanceAmt)],
                RowVersion: [item.RowVersion]
              });
              formArray.push(formGroup);
              this.rowCustBankStmnt++;
            }
          }
        }
      );
    }
  }

  addRowCustBankStmnt() {
    if (this.rowCustBankStmnt == 12) {
      return false;
    }

    let formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    let formGroup = this.fb.group({
      CustBankStmntId: [this.custBankStmnt.CustBankStmntId, [Validators.required]],
      Month: ['', [Validators.required]],
      Year: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(4)]],
      DebitTrxCount: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      CreditTrxCount: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      DebitAmt: [0, [Validators.required]],
      CreditAmt: [0, [Validators.required]],
      BalanceAmt: [''],
      RowVersion: ['']
    });
    formArray.push(formGroup);
    this.rowCustBankStmnt++;

    this.isAlreadyCalc = false;
  }

  ChangeTrxCountDebit(i) {
    let formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    let controlDebitAmt = formArray.at(i).get('DebitAmt');
    let controlDebitTrxCount = formArray.at(i).value.DebitTrxCount;
    if (controlDebitTrxCount != undefined) {
      if (controlDebitTrxCount > 0) {
        controlDebitAmt.setValidators([Validators.required, Validators.min(0.01)]);
        controlDebitAmt.updateValueAndValidity();
      } else if (controlDebitTrxCount == 0) {
        controlDebitAmt.clearValidators();
        controlDebitAmt.updateValueAndValidity();
      }
    }
  }

  ChangeTrxCountCredit(i) {
    let formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    let controlCreditAmt = formArray.at(i).get('CreditAmt');
    let controlCreditTrxCount = formArray.at(i).value.CreditTrxCount;
    if (controlCreditTrxCount != undefined) {
      if (controlCreditTrxCount > 0) {
        controlCreditAmt.setValidators([Validators.required, Validators.min(0.01)]);
        controlCreditAmt.updateValueAndValidity();
      } else if (controlCreditTrxCount == 0) {
        controlCreditAmt.clearValidators();
        controlCreditAmt.updateValueAndValidity();
      }
    }
  }

  removeCustBankStmnt(i) {
    let confirmation = confirm(ExceptionConstant.DELETE_CONFIRMATION);
    if (confirmation == true) {
      let formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
      formArray.removeAt(i);
      this.rowCustBankStmnt--;
    }
  }

  getLookupRefBankResponse(e) {
    this.CustBankAccForm.patchValue({
      RefBankId: e.RefBankId,
      BankBranchRegRptCode: e.RegRptCode
    });
  }

  calculate() {
    this.begBalance = this.CustBankAccForm.controls['BegBalanceAmt'].value;

    let startBegBalance = this.begBalance;
    let arrayControl = this.CustBankAccForm.get('CustBankStmnts') as FormArray;

    for (let i = 0; i < arrayControl.length; i++) {
      const bankStmntD = arrayControl.at(i).value;

      bankStmntD.BalanceAmt = startBegBalance - bankStmntD.DebitAmt + bankStmntD.CreditAmt;
      startBegBalance = bankStmntD.BalanceAmt;
    }

    this.isAlreadyCalc = true;
  }

  onBegBalanceAmtChange(e) {
    this.isAlreadyCalc = false;
  }
  onDebitAmtChange(e) {
    this.isAlreadyCalc = false;
  }

  onCreditAmtChange(e) {
    this.isAlreadyCalc = false;
  }

  onMonthChange() {
    this.isAlreadyCalc = false;
  }

  Save(enjiForm) {
    let formData = this.CustBankAccForm.getRawValue();
    let custBankAccObj = new CustBankAccObj();
    custBankAccObj.CustBankAccId = formData.CustBankAccId;
    custBankAccObj.CustId = formData.CustId;
    custBankAccObj.RefBankId = formData.RefBankId;
    custBankAccObj.BankBranch = formData.BankBranch;
    custBankAccObj.BankAccNo = formData.BankAccNo;
    custBankAccObj.BankAccName = formData.BankAccName;
    custBankAccObj.IsBankStmnt = formData.IsBankStmnt;
    custBankAccObj.BankBranchRegRptCode = formData.BankBranchRegRptCode;
    custBankAccObj.BalanceAmt = parseFloat(formData.BalanceAmt);
    custBankAccObj.IsDefault = formData.IsDefault;
    custBankAccObj.RowVersion = formData.RowVersion;
    custBankAccObj.IsActive = this.IsActive;
    custBankAccObj.BegBalanceAmt = formData.BegBalanceAmt;

    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddCustBankAcc, custBankAccObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.activeModal.close(response);
        }
      );
    }
    else {
      if (this.pageType == "edit") {
        let custBankData = this.CustBankAccForm.getRawValue();
        this.http.post(this.UrlConstantNew.EditCustBankAcc, custBankData, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.activeModal.close(response);
          }
        );
      }
      else if (this.pageType == "editStmnt") {
        if (this.isAlreadyCalc == false) {
          this.toastr.warningMessage(ExceptionConstant.CALC_FIRST);
          return false;
        }
        let formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
        let listCustBankStmnt = new Array<CustBankStmntObj>();
        let totalBalance = 0;

        if (formArray.length == 0) {
          this.toastr.warningMessage("Please input at least one bank account statement");
          return false;
        }

        for (let i = 0; i < formArray.length; i++) {
          const bankStmnt = formArray.at(i).value;
          for (let j = 0; j < formArray.length; j++) {
            if (i == j) {
              continue;
            }
            const bankStmntCompare = formArray.at(j).value;
            if (bankStmnt.Month == bankStmntCompare.Month && bankStmnt.Year == bankStmntCompare.Year) {
              this.toastr.warningMessage(ExceptionConstant.STATEMENT_WITH_SAME_MONTH_AND_YEAR);
              return false;
            }
          }
          let custBankStmnt = new CustBankStmntObj();
          custBankStmnt.CustBankStmntId = bankStmnt.CustBankStmntId;
          custBankStmnt.RowVersion = bankStmnt.RowVersion;
          custBankStmnt.Month = this.monthOfYear[bankStmnt.Month];
          custBankStmnt.Year = bankStmnt.Year;
          custBankStmnt.DebitTrxCount = bankStmnt.DebitTrxCount == "" ? null : bankStmnt.DebitTrxCount;
          custBankStmnt.DebitAmt = bankStmnt.DebitAmt;
          custBankStmnt.CreditTrxCount = bankStmnt.CreditTrxCount == "" ? null : bankStmnt.CreditTrxCount;
          custBankStmnt.CreditAmt = bankStmnt.CreditAmt;
          custBankStmnt.BalanceAmt = parseFloat(bankStmnt.BalanceAmt);
          listCustBankStmnt.push(custBankStmnt);
          totalBalance += parseFloat(bankStmnt.BalanceAmt);
        }

        custBankAccObj.StartPeriod = "";
        custBankAccObj.EndPeriod = "";

        let reqObj = { "custBankAccObj": custBankAccObj, "custBankStmntObjs": listCustBankStmnt };
        this.http.post(this.UrlConstantNew.EditCBAForCustFinData, reqObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.activeModal.close(response);
          }
        );
      }
    }
  }
  
  CheckDefault(ev) {
    if (ev) {
      this.CustBankAccForm.patchValue({
        IsActive: true
      });
      this.IsActive = true;
      this.CustBankAccForm.controls.IsActive.disable();
    }
    else {
      this.IsActive = false;
      this.CustBankAccForm.controls.IsActive.enable();
    }
  }
}