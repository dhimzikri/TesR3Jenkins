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
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UpdateCustPersonalFinDataObj } from 'app/shared/model/update-master-cust/update-cust-personal-fin-data-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-custom-update-customer-fin-data',
  templateUrl: './custom-update-customer-fin-data.component.html',
})

export class CustomUpdateCustomerFinDataComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Input() WfTaskListId: any;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  SourceIncomeList: Array<any>;
  AppCustFinData: UpdateCustPersonalFinDataObj;
  MainCustBankAcc: Array<any>;
  AppCustBankAcc: Array<any>;
  ArrayNum: Array<number>;
  num: number;
  IsCopyAll: boolean;
  CustBankAccToDelete: Array<number>;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  MonthNames: Array<string>;

  CustomerFinDataForm = this.fb.group({
    CustPersonalFinDataId: [0],
    CustPersonalId: [0],
    CustId: [0],
    MonthlyIncomeAmt: [0, [Validators.required, Validators.min(1)]],
    MonthlyExpenseAmt: [0],
    MonthlyInstallmentAmt: [0],
    MrSourceOfIncomeCode: [''],
    SpouseMonthlyIncomeAmt: [0],
    IsJoinIncome: [false],
    TotalIncomeAmt: [0],
    NettIncomeAmt: [0],
    TaskListId: [0]
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.SourceIncomeList = new Array<any>();
    this.AppCustFinData = new UpdateCustPersonalFinDataObj();
    this.MainCustBankAcc = new Array<any>();
    this.AppCustBankAcc = new Array<any>();
    this.ResponseTab = new EventEmitter<any>();
    this.ArrayNum = new Array<number>();
    this.IsCopyAll = false;
    this.CustBankAccToDelete = new Array<number>();
    this.MonthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  }

  ngOnInit() {
    this.CustomerFinDataForm.patchValue({
      TaskListId: this.WfTaskListId
    });
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    let getDetail = this.http.post(this.UrlConstantNew.GetCustFinDataForUpdateMasterCustFinData, this.ReqCustDataTrxIdObj);
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSourceIncome, MappingCode: null };
    let getSourceIncome = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReq);
    forkJoin([getDetail, getSourceIncome]).toPromise().then(
      (response) => {
        this.AppCustFinData = response[0]["AppCustFinData"];
        this.SourceIncomeList = response[1][CommonConstant.ReturnObj];
        this.CustomerFinDataForm.patchValue({
          CustPersonalFinDataId: response[0]["MasterCustFinData"]["CustPersonalFinDataId"],
          CustPersonalId: response[0]["MasterCustFinData"]["CustPersonalId"],
          CustId: response[0]["MasterCustFinData"]["CustId"],
          MonthlyIncomeAmt: response[0]["MasterCustFinData"]["MonthlyIncomeAmt"],
          MonthlyExpenseAmt: response[0]["MasterCustFinData"]["MonthlyExpenseAmt"],
          MonthlyInstallmentAmt: response[0]["MasterCustFinData"]["MonthlyInstallmentAmt"],
          MrSourceOfIncomeCode: response[0]["MasterCustFinData"]["MrSourceOfIncomeCode"],
          SpouseMonthlyIncomeAmt: response[0]["MasterCustFinData"]["SpouseMonthlyIncomeAmt"],
          IsJoinIncome: response[0]["MasterCustFinData"]["IsJoinIncome"],
          TotalIncomeAmt: response[0]["MasterCustFinData"]["TotalIncomeAmt"],
          NettIncomeAmt: response[0]["MasterCustFinData"]["NettIncomeAmt"]
        });
        this.MainCustBankAcc = response[0]["MasterCustFinData"]["CustBankAccList"];
        this.AppCustBankAcc = response[0]["AppCustFinData"]["CustBankAccList"];
        for (const item of this.MainCustBankAcc) {
          item["IsMasterData"] = true;
          item["IsMasterStmnt"] = true;
          item["CustBankStmntList"].sort((a, b) => {
            if (a["Year"] < b["Year"]) return -1;
            if (a["Year"] > b["Year"]) return 1;
            if (a["Month"] < b["Month"]) return -1;
            if (a["Month"] > b["Month"]) return 1;
          });
        }
        for (const item of this.AppCustBankAcc) {
          var isMasterData = false;
          var isMasterStmnt = false;
          var isAddedBankAcc = false;
          var isAddedBankStmnt = false;
          item["CustBankStmntList"].sort((a, b) => {
            if (a["Year"] < b["Year"]) return -1;
            if (a["Year"] > b["Year"]) return 1;
            if (a["Month"] < b["Month"]) return -1;
            if (a["Month"] > b["Month"]) return 1;
          });
          for (const main of this.MainCustBankAcc) {
            if (item["RefBankId"] == main["RefBankId"] &&
              item["BankAccNo"] == main["BankAccNo"] &&
              item["BankAccName"] == main["BankAccName"]) {
              isMasterData = true;

              if (item["CustBankStmntList"].length == main["CustBankStmntList"].length) {
                for (let i = 0; i < item["CustBankStmntList"].length; i++) {
                  for (const key in item["CustBankStmntList"][i]) {
                    if (key == "Month") {
                      if (!isNaN(main["CustBankStmntList"][i][key]) && !isNaN(parseInt(main["CustBankStmntList"][i][key]))) {
                        var monthIdx = parseInt(main["CustBankStmntList"][i][key]) - 1;
                        main["CustBankStmntList"][i][key] = this.MonthNames[monthIdx];
                      }
                    }
                    if (item["CustBankStmntList"][i][key] == main["CustBankStmntList"][i][key]) {
                      isMasterStmnt = true;
                    }
                    else {
                      isMasterData = false;
                      isMasterStmnt = false;
                      break;
                    }
                  }
                }
              }
              else {
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
        if (this.MainCustBankAcc.length > this.AppCustBankAcc.length) {
          this.num = this.MainCustBankAcc.length;
          for (let i = 0; i < this.MainCustBankAcc.length - this.AppCustBankAcc.length; i++) {
            this.AppCustBankAcc.push(new Object());
          }
        }
        else if (this.MainCustBankAcc.length < this.AppCustBankAcc.length) {
          this.num = this.AppCustBankAcc.length;
          for (let i = 0; i < this.AppCustBankAcc.length - this.MainCustBankAcc.length; i++) {
            this.MainCustBankAcc.push(new Object());
          }
        }
        else {
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

  CopyAllHandler() {
    var obj = new Object();
    for (const key in this.AppCustFinData) {
      if (key == "CustPersonalFinDataId" || key == "CustPersonalId" || key == "CustId" || key == "CustBankAccList") {
        continue;
      }
      else {
        // if(this.AppCustFinData[key]){
        obj[key] = this.AppCustFinData[key];
        // }
      }
    }
    this.CustomerFinDataForm.patchValue(obj);
    this.MainCustBankAcc = new Array<any>();
    for (let i = 0; i < this.AppCustBankAcc.length; i++) {
      if (this.AppCustBankAcc[i]["CustBankAccId"] != undefined) this.AddNewBankAcc(i);
    }
    this.IsCopyAll = true;
    // this.CalculateFinData();
  }

  CopyHandler(formControlName) {
    this.CustomerFinDataForm.patchValue({
      MonthlyIncomeAmt: this.AppCustFinData.MonthlyIncomeAmt,
      MonthlyExpenseAmt: this.AppCustFinData.MonthlyExpenseAmt,
      MonthlyInstallmentAmt: this.AppCustFinData.MonthlyInstallmentAmt,
      MrSourceOfIncomeCode: this.AppCustFinData.MrSourceOfIncomeCode,
      SpouseMonthlyIncomeAmt: this.AppCustFinData.SpouseMonthlyIncomeAmt,
      IsJoinIncome: this.AppCustFinData.IsJoinIncome,
      TotalIncomeAmt: this.AppCustFinData.TotalIncomeAmt,
      NettIncomeAmt: this.AppCustFinData.NettIncomeAmt,
    });
    // this.CalculateFinData();
  }

  CalculateFinData() {
    var value = this.CustomerFinDataForm.value;
    var totalIncome = 0;
    var nettIncome = 0;
    if (value["IsJoinIncome"]) {
      totalIncome = value["MonthlyIncomeAmt"] + value["SpouseMonthlyIncomeAmt"];
    }
    else {
      totalIncome = value["MonthlyIncomeAmt"];
    }
    nettIncome = totalIncome - (value["MonthlyExpenseAmt"] + value["MonthlyInstallmentAmt"]);
    this.CustomerFinDataForm.patchValue({
      TotalIncomeAmt: totalIncome,
      NettIncomeAmt: nettIncome
    });
  }

  AddNewBankAcc(idx) {
    this.AppCustBankAcc[idx]["IsAddedBankAcc"] = true;
    this.AppCustBankAcc[idx]["IsAddedBankStmnt"] = true;
    var idxToDelete = 0;
    var isDelete = false;
    for (var i = 0; i < this.MainCustBankAcc.length; i++) {
      if (this.MainCustBankAcc[i]["RefBankId"] == this.AppCustBankAcc[idx]["RefBankId"] &&
        this.MainCustBankAcc[i]["BankName"] == this.AppCustBankAcc[idx]["BankName"] &&
        this.MainCustBankAcc[i]["BankBranch"] == this.AppCustBankAcc[idx]["BankBranch"] &&
        this.MainCustBankAcc[i]["BankAccNo"] == this.AppCustBankAcc[idx]["BankAccNo"] &&
        this.MainCustBankAcc[i]["BankAccName"] == this.AppCustBankAcc[idx]["BankAccName"]) {
        this.CustBankAccToDelete.push(this.MainCustBankAcc[i]["CustBankAccId"]);
        idxToDelete = i;
        isDelete = true;
        break;
      }
    }
    if (isDelete) {
      this.MainCustBankAcc.splice(idxToDelete, 1);
    }
    else {
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
    // this.MainCustBankAcc.sort((a, b) => (a["IsDefault"]) ? -1 : 1);
  }

  AddNewBankStmnt(idx) {
    this.AppCustBankAcc[idx]["IsAddedBankStmnt"] = true;
    for (const item of this.MainCustBankAcc) {
      if (item["RefBankId"] == this.AppCustBankAcc[idx]["RefBankId"] &&
        item["BankName"] == this.AppCustBankAcc[idx]["BankName"] &&
        item["BankBranch"] == this.AppCustBankAcc[idx]["BankBranch"] &&
        item["BankAccNo"] == this.AppCustBankAcc[idx]["BankAccNo"] &&
        item["BankAccName"] == this.AppCustBankAcc[idx]["BankAccName"]) {
        item["CustBankStmntList"] = this.AppCustBankAcc[idx]["CustBankStmntList"];
        break;
      }
    }
  }

  CancelBankAcc(idx) {
    for (const item of this.AppCustBankAcc) {
      if (item["RefBankId"] == this.MainCustBankAcc[idx]["RefBankId"] &&
        item["BankName"] == this.MainCustBankAcc[idx]["BankName"] &&
        item["BankBranch"] == this.MainCustBankAcc[idx]["BankBranch"] &&
        item["BankAccNo"] == this.MainCustBankAcc[idx]["BankAccNo"] &&
        item["BankAccName"] == this.MainCustBankAcc[idx]["BankAccName"]) {
        item["IsAddedBankAcc"] = false;
        item["IsAddedBankStmnt"] = false;
        this.MainCustBankAcc.splice(idx, 1);
        break;
      }
    }
  }

  CancelBankStmnt(idx) {
    for (const item of this.AppCustBankAcc) {
      if (item["RefBankId"] == this.MainCustBankAcc[idx]["RefBankId"] &&
        item["BankName"] == this.MainCustBankAcc[idx]["BankName"] &&
        item["BankBranch"] == this.MainCustBankAcc[idx]["BankBranch"] &&
        item["BankAccNo"] == this.MainCustBankAcc[idx]["BankAccNo"] &&
        item["BankAccName"] == this.MainCustBankAcc[idx]["BankAccName"]) {
        item["IsAddedBankStmnt"] = false;
        this.MainCustBankAcc[idx]["CustBankStmntList"] = new Array<Object>();
        break;
      }
    }
  }

  back() {
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue() {
    var formValue = this.CustomerFinDataForm.value;
    var requestBankAcc = new Array<any>();
    for (const item of this.MainCustBankAcc) {
      if (!item["IsMasterData"] && item["CustBankStmntList"] != undefined) {
        requestBankAcc.push(item);
      }
    }
    formValue["CustBankAccList"] = requestBankAcc;
    formValue["IsCopyAll"] = this.IsCopyAll;
    formValue["CustBankAccIdToDelete"] = this.CustBankAccToDelete;

    this.http.post(this.UrlConstantNew.UpdateMasterCustFinDataV2, formValue, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
        this.router.navigate([NavigationConstant.SELF_CUSTOM_CUST_UPDATE_DATA_PAGING]);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

}
