import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UpdateCustCompanyFinDataObj } from 'app/shared/model/update-master-cust/update-cust-company-fin-data-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-update-customer-company-fin-data',
  templateUrl: './update-customer-company-fin-data.component.html',
  styles: [],
 // providers: [NGXToastrService]
})
export class UpdateCustomerCompanyFinDataComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppCompanyFinData: UpdateCustCompanyFinDataObj;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  MainCustBankAcc: Array<any>;
  AppCustBankAcc: Array<any>;
  ArrayNum: Array<number>;
  num: number;
  IsCopyAll: boolean;
  CustBankAccToDelete: Array<number>;
  MonthNames: Array<string>;

  CustomerCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0],
    CustCompanyId: [0],
    GrossMonthlyIncomeAmt: [0, [Validators.required]],
    GrossProfitAmt: [0],
    ReturnOfInvestmentPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    ReturnOfEquityPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    ReturnOfAssetPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    ProfitMarginPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    CurrentRatioPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    DebtEquityRatioPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    InvTurnOverPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    ArTurnOverPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    GrowthPrcnt: [0, [Validators.min(0.00), Validators.max(100.00)]],
    WorkingCapitalAmt: [0],
    OthMonthlyInstAmt: [0],
    DateAsOf: [''],
    Revenue: [0],
    OprCost: [0],
    ProfitBeforeTax: [0],
    CurrAsset: [0],
    NetFixedAsset: [0],
    TotalAsset: [0],
    CurrLiablts: [0],
    LongTemrLiablts: [0],
    ShareholderEquity: [0],
    CurrRatio: [0],
    RowVersion: ['']
  });

  readonly CurrencyMaskPrct = CommonConstant.CurrencyMaskPrct;
  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.ResponseTab = new EventEmitter<any>();
    this.MainCustBankAcc = new Array<any>();
    this.AppCustBankAcc = new Array<any>();
    this.ArrayNum = new Array<number>();
    this.IsCopyAll = false;
    this.CustBankAccToDelete = new Array<number>();
    this.MonthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    this.http.post(this.UrlConstantNew.GetFinDataForUpdateMasterCustCompanyFinData, this.ReqCustDataTrxIdObj).toPromise().then(
      (response) => {
        response["AppCompanyFinData"]["DateAsOf"] = datePipe.transform(response["AppCompanyFinData"]["DateAsOf"], "yyyy-MM-dd");
        response["MasterCompanyFinData"]["DateAsOf"] = datePipe.transform(response["MasterCompanyFinData"]["DateAsOf"], "yyyy-MM-dd");
        this.AppCompanyFinData = response["AppCompanyFinData"];
        this.CustomerCompanyFinDataForm.patchValue({...response["MasterCompanyFinData"]});

        this.MainCustBankAcc = response["MasterCompanyFinData"]["CustBankAccList"];
        this.AppCustBankAcc = response["AppCompanyFinData"]["CustBankAccList"];
        for (const item of this.MainCustBankAcc) {
          item["IsMasterData"] = true;
          item["IsMasterStmnt"] = true;
          item["CustBankStmntList"].sort((a, b) => {
            if(a["Year"] < b["Year"]) return -1;
            if(a["Year"] > b["Year"]) return 1;
            if(a["Month"] < b["Month"]) return -1;
            if(a["Month"] > b["Month"]) return 1;
          });
        }
        for (const item of this.AppCustBankAcc) {
          var isMasterData = false;
          var isMasterStmnt = false;
          var isAddedBankAcc = false;
          var isAddedBankStmnt = false;
          item["CustBankStmntList"].sort((a, b) => {
            if(a["Year"] < b["Year"]) return -1;
            if(a["Year"] > b["Year"]) return 1;
            if(a["Month"] < b["Month"]) return -1;
            if(a["Month"] > b["Month"]) return 1;
          });
          for (const main of this.MainCustBankAcc) {
            if(item["RefBankId"] == main["RefBankId"] &&
                item["BankAccNo"] == main["BankAccNo"] &&
                item["BankAccName"] == main["BankAccName"]){
                isMasterData = true;

                if(item["CustBankStmntList"].length == main["CustBankStmntList"].length){
                  for (let i = 0; i < item["CustBankStmntList"].length; i++) {
                    for (const key in item["CustBankStmntList"][i]) {
                      if(key == "Month"){
                        item["CustBankStmntList"][i][key] = this.MonthNames[item["CustBankStmntList"][i][key]-1];
                        if(!isNaN(main["CustBankStmntList"][i][key]) && !isNaN(parseInt(main["CustBankStmntList"][i][key]))){
                          var monthIdx = parseInt(main["CustBankStmntList"][i][key]) - 1;
                          main["CustBankStmntList"][i][key] = this.MonthNames[monthIdx];
                        }
                      }
                      if(item["CustBankStmntList"][i][key] == main["CustBankStmntList"][i][key]){
                        isMasterStmnt = true;
                      }
                      else{
                        isMasterData = false;
                        isMasterStmnt = false;
                        break;
                      }
                    }
                  }
                }
                else{
                  isMasterData = false;
                  isMasterStmnt = false;
                }
                break;
            }
          }
          item["IsMasterData"] = isMasterData;
          item["IsMasterStmnt"] = isMasterStmnt;
          item["IsAddedBankAcc"] = isAddedBankAcc;
          item["IsAddedBankStmnt"] = isAddedBankStmnt;
        }
        if(this.MainCustBankAcc.length > this.AppCustBankAcc.length){
          this.num = this.MainCustBankAcc.length;
          for (let i = 0; i < this.MainCustBankAcc.length - this.AppCustBankAcc.length; i++) {
            this.AppCustBankAcc.push(new Object());
          }
        }
        else if(this.MainCustBankAcc.length < this.AppCustBankAcc.length){
          this.num = this.AppCustBankAcc.length;
          for (let i = 0; i < this.AppCustBankAcc.length - this.MainCustBankAcc.length; i++) {
            this.MainCustBankAcc.push(new Object());
          }
        }
        else{
          this.num = this.MainCustBankAcc.length;
        }
        this.ArrayNum = new Array<number>(this.num).fill(1);
        this.MainCustBankAcc.sort((a, b) => (a["IsDefault"]) ? -1 : 1);
        this.AppCustBankAcc.sort((a, b) => (a["IsDefault"]) ? -1 : 1);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  CopyAllHandler(){
    var obj = new Object();
    for (const key in this.AppCompanyFinData) {
      if(key == "CustCompanyFinDataId" || key == "CustCompanyId" || key == "RowVersion"){
        continue;
      }
      else{
        // if(this.AppCompanyFinData[key]){
          obj[key] = this.AppCompanyFinData[key];
        // }
      }
    }
    this.CustomerCompanyFinDataForm.patchValue(obj);
    this.MainCustBankAcc = new Array<any>();
    for (let i = 0; i < this.AppCustBankAcc.length; i++) {
      this.AddNewBankAcc(i);
    }
    this.IsCopyAll = true;
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCompanyFinData[formControlName];
    this.CustomerCompanyFinDataForm.patchValue(obj);
  }

  AddNewBankAcc(idx){
    this.AppCustBankAcc[idx]["IsAddedBankAcc"] = true;
    this.AppCustBankAcc[idx]["IsAddedBankStmnt"] = true;
    var idxToDelete = 0;
    var isDelete = false;
    for (var i = 0; i < this.MainCustBankAcc.length; i++) {
      if(this.MainCustBankAcc[i]["RefBankId"] == this.AppCustBankAcc[idx]["RefBankId"] &&
          this.MainCustBankAcc[i]["BankName"] == this.AppCustBankAcc[idx]["BankName"] &&
          this.MainCustBankAcc[i]["BankBranch"] == this.AppCustBankAcc[idx]["BankBranch"] &&
          this.MainCustBankAcc[i]["BankAccNo"] == this.AppCustBankAcc[idx]["BankAccNo"] &&
          this.MainCustBankAcc[i]["BankAccName"] == this.AppCustBankAcc[idx]["BankAccName"]){
        this.CustBankAccToDelete.push(this.MainCustBankAcc[i]["CustBankAccId"]);
        idxToDelete = i;
        isDelete = true;
        break;
      }
    }
    if(isDelete){
      this.MainCustBankAcc.splice(idxToDelete, 1);
    }
    else{
      this.AppCustBankAcc.push(new Object());
      this.ArrayNum.push(1);
    }
    var obj = new Object();
    obj["RefBankId"] = this.AppCustBankAcc[idx]["RefBankId"];
    obj["BankName"] = this.AppCustBankAcc[idx]["BankName"];
    obj["BankBranch"] = this.AppCustBankAcc[idx]["BankBranch"];
    obj["BankAccNo"] = this.AppCustBankAcc[idx]["BankAccNo"];
    obj["BankAccName"] = this.AppCustBankAcc[idx]["BankAccName"];
    obj["IsDefault"] = this.AppCustBankAcc[idx]["IsDefault"];
    obj["CustBankStmntList"] = this.AppCustBankAcc[idx]["CustBankStmntList"];
    obj["IsMasterData"] = this.AppCustBankAcc[idx]["IsMasterData"];
    obj["IsMasterStmnt"] = this.AppCustBankAcc[idx]["IsMasterStmnt"];
    obj["IsAddedBankAcc"] = this.AppCustBankAcc[idx]["IsAddedBankAcc"];
    obj["IsAddedBankStmnt"] = this.AppCustBankAcc[idx]["IsAddedBankStmnt"];
    this.MainCustBankAcc.push(obj);
    this.MainCustBankAcc.sort((a, b) => (a["IsDefault"]) ? -1 : 1);
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue(){
    var formValue = this.CustomerCompanyFinDataForm.value;
    var requestBankAcc = new Array<any>();
    for (const item of this.MainCustBankAcc) {
      if(!item["IsMasterData"]){
        for (const stmnt of item["CustBankStmntList"]) {
          stmnt["Month"] = this.MonthNames.findIndex(x => x == stmnt["Month"]) + 1;
        }
        requestBankAcc.push(item);
      }
    }
    formValue["CustBankAccList"] = requestBankAcc;
    formValue["IsCopyAll"] = this.IsCopyAll;
    formValue["CustBankAccIdToDelete"] = this.CustBankAccToDelete;
    this.http.post(this.UrlConstantNew.UpdateMasterCustCompanyFinData, formValue, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
