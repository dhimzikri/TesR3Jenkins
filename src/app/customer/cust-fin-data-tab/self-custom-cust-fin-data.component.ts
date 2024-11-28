import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustPersonalFinDataObj } from 'app/shared/model/cust-personal-fin-data-obj.model';
import { CustCompanyFinDataObj } from 'app/shared/model/cust-company-fin-data-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CustCompanyObj } from 'app/shared/model/cust-company-obj.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate} from '@angular/common';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { NewCustSetData } from '../sharing-component/new-cust-component/NewCustSetData.Service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-self-custom-cust-fin-data',
  templateUrl: './self-custom-cust-fin-data.component.html'
})
export class SelfCustomCustFinDataComponent implements OnInit {

    @Input() MrCustTypeCode: string;
    @Input() CustId: number;
    @Output() next: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('ModalPersonalFinData') ModalPersonalFinData;
    @ViewChild('ModalCoyFinData') ModalCoyFinData;
  
    sourceOfIncomeList: any;
    isCalculated: boolean = true;
    spouseMonthlyIncomeAmt: number;
    mrMaritalStatCode: string;
    maritalConstant: string = CommonConstant.MR_MARITAL_STAT_CODE_MARRIED;
    Page: string;
    attrGroup: string;
    attrGroups: Array<string> = new Array<string>();
    IncomeList: Array<{Index: number, Amount: number}> = new Array<{Index: number, Amount: number}>();
    TotalIncomeListAmt: number = 0;
    ExpenseList: Array<{Index: number, Amount: number}> = new Array<{Index: number, Amount: number}>();
    TotalExpenseListAmt: number = 0;
  
    CustPersonalFinDataForm = this.fb.group({
      CustPersonalFinDataId: [0, [Validators.required]],
      CustPersonalId: [0, [Validators.required]],
      MonthlyIncomeAmt: ['', Validators.required],
      MonthlyExpenseAmt: [''],
      MonthlyInstallmentAmt: [''],
      MrSourceOfIncomeCode: [''],
      SpouseMonthlyIncomeAmt: [''],
      IsJoinIncome: [false],
      TotalIncomeAmt: [0],
      NettIncomeAmt: [0],
      NettProfitMonthlyAmt: [0],
      OtherIncomeAmt: [''],
      OtherMonthlyInstAmt: [0],
      DateAsOf: [''],
      RowVersion: ['']
    });
  
    CustCompanyFinDataForm = this.fb.group({
      CustCompanyFinDataId: [0, [Validators.required]],
      CustCompanyId: [0, [Validators.required]],
      GrossMonthlyIncomeAmt: [''],
      GrossProfitAmt: [''],
      ReturnOfInvestmentPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      ReturnOfEquityPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      ReturnOfAssetPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      ProfitMarginPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      CurrentRatioPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      DebtEquityRatioPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      InvTurnOverPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      ArTurnOverPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      GrowthPrcnt: ['', [Validators.pattern('^[0-9]+([,.][0-9]+)?$'), Validators.max(100)]],
      WorkingCapitalAmt: [''],
      OthMonthlyInstAmt: [''],
      DateAsOf: [''],
      Revenue: [''],
      OprCost: [''],
      ProfitBeforeTax: [''],
      CurrAsset: [''],
      NetFixedAsset: [''],
      TotalAsset: [''],
      CurrLiablts: [''],
      LongTemrLiablts: [''],
      ShareholderEquity: [''],
      CurrRatio: [''],
      RowVersion: ['']
    });
  
    CustAttrListForm = this.fb.group({
    });
  
    IsAddFinData: boolean = true;
    ListCustPersonalFinData: Array<CustPersonalFinDataObj> = [];
    ListCustCoyFinData: Array<CustCompanyFinDataObj> = [];
    custPersonalId: number;
    custCoyId: number;
    currentCustFinDataIndex: number;
    currentModal: any;
  
    BusinessDt: string;

    From: string = "";
  
    readonly CurrencyMaskPrct = CommonConstant.CurrencyMaskPrct;
    constructor(
      private http: HttpClient,
      private toastr: NGXToastrService,
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private modalService: NgbModal, 
      private UrlConstantNew: UrlConstantNew,
      private ngxRouter: NgxRouterService,
      private CustSetData: NewCustSetData
    ) {
      if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
        this.isCalculated = false;
      }
      else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
        this.isCalculated = true;
      }
      this.route.queryParams.subscribe(params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams["Page"] != null) {
          this.Page = queryParams["Page"];
        }
        if (queryParams["From"] != null) {
            this.From = queryParams["From"];
        }
      });
    }
  
    async ngOnInit() {
  
      this.BusinessDt = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyFinData : CommonConstant.AttrGroupCustPersonalFinData;
  
      var datePipe = new DatePipe("en-US");
      if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
        this.attrGroups = [
          CommonConstant.AttrGroupCustPersonalFinData,
          CommonConstant.AttrGroupCustPersonalFinDataIncome,
          CommonConstant.AttrGroupCustPersonalFinDataExpense,
          CommonConstant.AttrGroupCustPersonalFinDataOther
        ];
        await this.getListCustPersonalFinData();
        var custPersonalData;
        var custPersonal = new CustPersonalObj();
        custPersonal.CustId = this.CustId;
        this.http.post(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.CustId }).pipe(
          map((response: CustPersonalObj) => {
            if (!response || response.MrMaritalStatCode == null) {
              this.mrMaritalStatCode = CommonConstant.MR_MARITAL_STAT_CODE_SINGLE;
            }
            else {
              this.mrMaritalStatCode = response.MrMaritalStatCode;
            }
            custPersonalData = response;
            return response;
          }),
          mergeMap((response: CustPersonalObj) => {
            var custPersonalFinData = new CustPersonalFinDataObj();
            custPersonalFinData.CustPersonalId = response.CustPersonalId;
            let custFinData = this.http.post(this.UrlConstantNew.GetCustPersonalFinDataByCustPersonalId, {Id : response.CustPersonalId});
            let refMasterSourceIncome: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
            refMasterSourceIncome.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeSourceIncome;
            let sourceIncomeList = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterSourceIncome);
            return forkJoin([custFinData, sourceIncomeList]);
          })
        ).subscribe(
          (response: any) => {
            var custFinData = response[0];
            var sourceIncome = response[1];
            this.CustPersonalFinDataForm.patchValue({
              CustPersonalFinDataId: custFinData.CustPersonalFinDataId,
              CustPersonalId: custPersonalData.CustPersonalId,
              MonthlyIncomeAmt: custFinData.MonthlyIncomeAmt,
              MonthlyExpenseAmt: custFinData.MonthlyExpenseAmt,
              MonthlyInstallmentAmt: custFinData.MonthlyInstallmentAmt,
              MrSourceOfIncomeCode: custFinData.MrSourceOfIncomeCode,
              SpouseMonthlyIncomeAmt: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.SpouseMonthlyIncomeAmt : 0,
              IsJoinIncome: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.IsJoinIncome : false,
              TotalIncomeAmt: this.currencyFormatter(custFinData.TotalIncomeAmt.toString()),
              NettIncomeAmt: this.currencyFormatter(custFinData.NettIncomeAmt.toString()),
              NettProfitMonthlyAmt: custFinData.NettProfitMonthlyAmt,
              OtherIncomeAmt: custFinData.OtherIncomeAmt,
              OtherMonthlyInstAmt: custFinData.OtherMonthlyInstAmt,
              RowVersion: custFinData.RowVersion
            });
            this.sourceOfIncomeList = sourceIncome;
          }
        );
        // this.bindFinancialAttribute();
      }
      else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
        this.attrGroups = [
          CommonConstant.AttrGroupCustCompanyFinData,
          CommonConstant.AttrGroupCustCompanyFinDataIncome,
          CommonConstant.AttrGroupCustCompanyFinDataExpense,
          CommonConstant.AttrGroupCustCompanyFinDataOther
        ];
        await this.getListCustCoyFinData();
        var custCompanyData;
        var custCompany = new CustCompanyObj();
        custCompany.CustId = this.CustId;
        this.http.post(this.UrlConstantNew.GetCustCompanyByCustId, {Id : this.CustId}).pipe(
          map((response: CustCompanyObj) => {
            custCompanyData = response;
            return response;
          }),
          mergeMap((response: CustCompanyObj) => {
            var custCompanyFinData = new CustCompanyFinDataObj();
            custCompanyFinData.CustCompanyId = response.CustCompanyId;
            return this.http.post(this.UrlConstantNew.GetCustCompanyFinDataByCustCompanyId, {Id : response.CustCompanyId});
          })
        ).subscribe(
          (response: any) => {
            // this.isCalculated = true;
            this.CustCompanyFinDataForm.patchValue({
              CustCompanyFinDataId: response.CustCompanyFinDataId,
              CustCompanyId: custCompanyData.CustCompanyId,
              GrossMonthlyIncomeAmt: response.GrossMonthlyIncomeAmt,
              GrossProfitAmt: response.GrossProfitAmt,
              ReturnOfInvestmentPrcnt: response.ReturnOfInvestmentPrcnt,
              ReturnOfEquityPrcnt: response.ReturnOfEquityPrcnt,
              ReturnOfAssetPrcnt: response.ReturnOfAssetPrcnt,
              ProfitMarginPrcnt: response.ProfitMarginPrcnt,
              CurrentRatioPrcnt: response.CurrentRatioPrcnt,
              DebtEquityRatioPrcnt: response.DebtEquityRatioPrcnt,
              InvTurnOverPrcnt: response.InvTurnOverPrcnt,
              ArTurnOverPrcnt: response.ArTurnOverPrcnt,
              GrowthPrcnt: response.GrowthPrcnt,
              WorkingCapitalAmt: response.WorkingCapitalAmt,
              OthMonthlyInstAmt: response.OthMonthlyInstAmt,
              DateAsOf: datePipe.transform(response.DateAsOf, 'yyyy-MM-dd'),
              Revenue: response.Revenue,
              OprCost: response.OprCost,
              ProfitBeforeTax: response.ProfitBeforeTax,
              CurrAsset: response.CurrAsset,
              NetFixedAsset: response.NetFixedAsset,
              TotalAsset: response.TotalAsset,
              CurrLiablts: response.CurrLiablts,
              LongTemrLiablts: response.LongTemrLiablts,
              ShareholderEquity: response.ShareholderEquity,
              CurrRatio: response.CurrRatio,
              RowVersion: response.RowVersion,
            });
          }
        );
        //  this.bindFinancialAttribute();
      }
    }
  
    // Data DSF =================================
  
    initRefMaster() {
      this.http.post(this.UrlConstantNew.GetListActiveRefMaster, { 'RefMasterTypeCode': CommonConstant.RefMasterTypeCodeSourceIncome }).subscribe((response) => {
        this.sourceOfIncomeList = response[CommonConstant.ReturnObj];
        this.CustPersonalFinDataForm.patchValue({
          MrSourceOfIncomeCode: this.sourceOfIncomeList[0].Key
        })
      })
    }
  
    async getListCustPersonalFinData() {
      this.ListCustPersonalFinData = [];
      if (!this.custPersonalId) {
        await this.http.post(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.CustId }).toPromise().then((response: CustPersonalObj) => {
          this.custPersonalId = response.CustPersonalId;
          this.mrMaritalStatCode = (!response || response.MrMaritalStatCode == null) ? CommonConstant.MR_MARITAL_STAT_CODE_SINGLE : response.MrMaritalStatCode;
        })
      }
      await this.http.post(this.UrlConstantNew.GetListCustPersonalFinDataByCustId, { 'CustId': this.CustId }).toPromise().then((response) => {
        this.ListCustPersonalFinData = response['ListCustPersonalFinData'];
      })
    }
  
  
    async getListCustCoyFinData() {
      this.ListCustCoyFinData = [];
      if (!this.custCoyId) {
        await this.http.post(this.UrlConstantNew.GetCustCompanyByCustId, { Id: this.CustId }).toPromise().then((response: CustCompanyObj) => {
          this.custCoyId = response.CustCompanyId;
        })
      }
  
      await this.http.post(this.UrlConstantNew.GetListCustCompanyFinDataByCustId, { Id: this.CustId }).toPromise().then((response) => {
        this.ListCustCoyFinData = response['ListCustCompanyFinData'];
      })
    }
  
    showModalCustFinData(FinDataIndex: number) {
      this.isCalculated = false;
      this.initRefMaster();
      if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
        this.getSingleCustPersonalFinData(FinDataIndex);
        this.currentModal = this.modalService.open(this.ModalPersonalFinData, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
      }
      else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
        this.getSingleCustCoyFinData(FinDataIndex);
        this.currentModal = this.modalService.open(this.ModalCoyFinData, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
      }
    }
  
    async deleteModalCustFinData(FinDataIndex: number) {
      if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
        if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
          var CustPersonalFinDataCustomObj = { Id: this.ListCustPersonalFinData[FinDataIndex].CustPersonalFinDataId };
          await this.http.post(this.UrlConstantNew.DeleteCustPersonalFinData, CustPersonalFinDataCustomObj, AdInsConstant.SpinnerOptions).toPromise().then(
            (response) => {
              this.ListCustPersonalFinData.splice(FinDataIndex, 1);
            }
          );
        }
        else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
          var CustCoyFinDataCustomObj = { Id: this.ListCustCoyFinData[FinDataIndex].CustCompanyFinDataId };
          await this.http.post(this.UrlConstantNew.DeleteCustCompanyFinData, CustCoyFinDataCustomObj, AdInsConstant.SpinnerOptions).toPromise().then(
            (response) => {
              this.ListCustCoyFinData.splice(FinDataIndex, 1);
            }
          );
        }
      }
    }
  
    getSingleCustPersonalFinData(currentCustFinDataIndex: number) {
      this.IsAddFinData = false;
      this.currentCustFinDataIndex = currentCustFinDataIndex;
      let custFinData: CustPersonalFinDataObj = this.ListCustPersonalFinData[this.currentCustFinDataIndex];
      let datePipe = new DatePipe("en-US");
      if (!custFinData) {
        custFinData = new CustPersonalFinDataObj();
        this.IsAddFinData = true;
      }
      this.CustPersonalFinDataForm.patchValue({
        CustPersonalFinDataId: custFinData.CustPersonalFinDataId,
        CustPersonalId: this.custPersonalId,
        MonthlyIncomeAmt: custFinData.MonthlyIncomeAmt,
        MonthlyExpenseAmt: custFinData.MonthlyExpenseAmt,
        MonthlyInstallmentAmt: custFinData.MonthlyInstallmentAmt,
        MrSourceOfIncomeCode: custFinData.MrSourceOfIncomeCode,
        SpouseMonthlyIncomeAmt: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.SpouseMonthlyIncomeAmt : 0,
        IsJoinIncome: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.IsJoinIncome : false,
        TotalIncomeAmt: custFinData.TotalIncomeAmt,
        NettIncomeAmt: custFinData.NettIncomeAmt,
        NettProfitMonthlyAmt: custFinData.NettProfitMonthlyAmt,
        OtherIncomeAmt: custFinData.OtherIncomeAmt,
        OtherMonthlyInstAmt: custFinData.OtherMonthlyInstAmt,
        DateAsOf: custFinData.DateAsOf ? datePipe.transform(custFinData.DateAsOf, 'yyyy-MM-dd') : '',
        RowVersion: custFinData.RowVersion
      });
  
      this.CustPersonalFinDataForm.controls['DateAsOf'].setValidators([Validators.required]);
      this.CustPersonalFinDataForm.controls['DateAsOf'].updateValueAndValidity();
    }
  
    getSingleCustCoyFinData(currentCustFinDataIndex: number) {
      this.IsAddFinData = false;
      this.currentCustFinDataIndex = currentCustFinDataIndex;
      let custFinData: CustCompanyFinDataObj = this.ListCustCoyFinData[this.currentCustFinDataIndex];
      let datePipe = new DatePipe("en-US");
      if (!custFinData) {
        custFinData = new CustCompanyFinDataObj();
        this.IsAddFinData = true;
      }
      this.CustCompanyFinDataForm.patchValue({
        CustCompanyFinDataId: custFinData.CustCompanyFinDataId,
        CustCompanyId: this.custCoyId,
        GrossMonthlyIncomeAmt: custFinData.GrossMonthlyIncomeAmt,
        GrossProfitAmt: custFinData.GrossProfitAmt,
        ReturnOfInvestmentPrcnt: custFinData.ReturnOfInvestmentPrcnt,
        ReturnOfEquityPrcnt: custFinData.ReturnOfEquityPrcnt,
        ReturnOfAssetPrcnt: custFinData.ReturnOfAssetPrcnt,
        ProfitMarginPrcnt: custFinData.ProfitMarginPrcnt,
        CurrentRatioPrcnt: custFinData.CurrentRatioPrcnt,
        DebtEquityRatioPrcnt: custFinData.DebtEquityRatioPrcnt,
        InvTurnOverPrcnt: custFinData.InvTurnOverPrcnt,
        ArTurnOverPrcnt: custFinData.ArTurnOverPrcnt,
        GrowthPrcnt: custFinData.GrowthPrcnt,
        WorkingCapitalAmt: custFinData.WorkingCapitalAmt,
        OthMonthlyInstAmt: custFinData.OthMonthlyInstAmt,
        DateAsOf: custFinData.DateAsOf ? datePipe.transform(custFinData.DateAsOf, 'yyyy-MM-dd') : '',
        Revenue: custFinData.Revenue,
        OprCost: custFinData.OprCost,
        ProfitBeforeTax: custFinData.ProfitBeforeTax,
        CurrAsset: custFinData.CurrAsset,
        NetFixedAsset: custFinData.NetFixedAsset,
        TotalAsset: custFinData.TotalAsset,
        CurrLiablts: custFinData.CurrLiablts,
        LongTemrLiablts: custFinData.LongTemrLiablts,
        ShareholderEquity: custFinData.ShareholderEquity,
        CurrRatio: custFinData.CurrRatio,
        RowVersion: custFinData.RowVersion,
      });
  
      this.CustCompanyFinDataForm.controls['DateAsOf'].setValidators([Validators.required]);
      this.CustCompanyFinDataForm.controls['DateAsOf'].updateValueAndValidity();
    }
  
    onChangeCustFinInput() {
      this.isCalculated = false;
    }
  
    calculatePersonalFinData() {
      Object.keys(this.CustPersonalFinDataForm.controls).forEach(key => {
        this.CustPersonalFinDataForm.get(key).markAsTouched();
      });
      if (this.CustPersonalFinDataForm.valid) {
        var formData = this.CustPersonalFinDataForm.value;
        var monthlyIncomeAmt = formData.MonthlyIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyIncomeAmt.toString()));
        var spouseMonthlyIncomeAmt = formData.SpouseMonthlyIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.SpouseMonthlyIncomeAmt.toString()));
        var totalIncomeAmt = 0;
        var nettIncomeAmt = 0;
        var nettProfitMonthlyAmt = formData.NettProfitMonthlyAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.NettProfitMonthlyAmt.toString()));
        var otherIncomeAmt = formData.OtherIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.OtherIncomeAmt.toString()));
        var monthlyExpenseAmt = formData.MonthlyExpenseAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyExpenseAmt.toString()));
        var monthlyInstallmentAmt = formData.MonthlyInstallmentAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyInstallmentAmt.toString()));
        var otherMonthlyInstAmt = formData.OtherMonthlyInstAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.OtherMonthlyInstAmt.toString()));
        var totalAmt = 0;
  
        if (formData.IsJoinIncome) {
          totalAmt = monthlyIncomeAmt + spouseMonthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
        }
        else {
          totalAmt = monthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
        }
        var netIncomeAmt = totalAmt - (monthlyExpenseAmt + monthlyInstallmentAmt + otherMonthlyInstAmt);
        
        this.CustPersonalFinDataForm.patchValue({
          TotalIncomeAmt: totalAmt,
          NettIncomeAmt: netIncomeAmt
        });
        this.isCalculated = true;
        this.spouseMonthlyIncomeAmt = this.CustPersonalFinDataForm.controls["SpouseMonthlyIncomeAmt"].value;
      }
    }
      
    calculateFinData() {
      var formData = this.CustPersonalFinDataForm.value;
      var monthlyIncomeAmt = formData.MonthlyIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyIncomeAmt.toString()));
      var spouseMonthlyIncomeAmt = formData.SpouseMonthlyIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.SpouseMonthlyIncomeAmt.toString()));
      var otherIncomeAmt = formData.OtherIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.OtherIncomeAmt.toString()));
      var monthlyExpenseAmt = formData.MonthlyExpenseAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyExpenseAmt.toString()));
      var monthlyInstallmentAmt = formData.MonthlyInstallmentAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyInstallmentAmt.toString()));
      var otherMonthlyInstAmt = formData.OtherMonthlyInstAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.OtherMonthlyInstAmt.toString()));
      var totalIncomeAmt = formData.TotalIncomeAmt;
      var nettIncomeAmt = formData.NettIncomeAmt;
  
      if (formData.IsJoinIncome) {
        totalIncomeAmt = monthlyIncomeAmt + spouseMonthlyIncomeAmt + otherIncomeAmt + this.TotalIncomeListAmt;
      }
      else {
        totalIncomeAmt = monthlyIncomeAmt + otherIncomeAmt + this.TotalIncomeListAmt;
      }
  
      nettIncomeAmt = totalIncomeAmt - (monthlyExpenseAmt + monthlyInstallmentAmt + otherMonthlyInstAmt + this.TotalExpenseListAmt);
  
      this.CustPersonalFinDataForm.patchValue({
        TotalIncomeAmt: totalIncomeAmt,
        NettIncomeAmt: nettIncomeAmt
      });
    }
  
    currencyFormatter(value: string) {
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
    currencyToNumber(value: string) {
      return value.replace(/,/g, "");
    }
    
    async saveCustPersonalFinData() {
      if (!this.CustPersonalFinDataForm.valid) return;
  
      if (!this.isCalculated) {
        this.toastr.warningMessage("Please Calculate First");
        return;
      }
  
      let custFinData: CustPersonalFinDataObj = {
        CustPersonalFinDataId: this.CustPersonalFinDataForm.controls['CustPersonalFinDataId'].value,
        CustPersonalId: this.CustPersonalFinDataForm.controls['CustPersonalId'].value,
        DateAsOf: this.CustPersonalFinDataForm.controls['DateAsOf'].value,
        MonthlyIncomeAmt: this.CustPersonalFinDataForm.controls['MonthlyIncomeAmt'].value,
        MonthlyExpenseAmt: this.CustPersonalFinDataForm.controls['MonthlyExpenseAmt'].value,
        MonthlyInstallmentAmt: this.CustPersonalFinDataForm.controls['MonthlyInstallmentAmt'].value,
        MrSourceOfIncomeCode: this.CustPersonalFinDataForm.controls['MrSourceOfIncomeCode'].value,
        SpouseMonthlyIncomeAmt: this.CustPersonalFinDataForm.controls['SpouseMonthlyIncomeAmt'].value,
        IsJoinIncome: this.CustPersonalFinDataForm.controls['IsJoinIncome'].value,
        TotalIncomeAmt: this.CustPersonalFinDataForm.controls['TotalIncomeAmt'].value,
        NettIncomeAmt: this.CustPersonalFinDataForm.controls['NettIncomeAmt'].value,
        NettProfitMonthlyAmt: this.CustPersonalFinDataForm.controls['NettProfitMonthlyAmt'].value,
        OtherIncomeAmt: this.CustPersonalFinDataForm.controls['OtherIncomeAmt'].value,
        OtherMonthlyInstAmt: this.CustPersonalFinDataForm.controls['OtherMonthlyInstAmt'].value,
        RowVersion: this.CustPersonalFinDataForm.controls['RowVersion'].value,
      };
  
      var url = this.IsAddFinData ? this.UrlConstantNew.AddCustPersonalFinData : this.UrlConstantNew.EditCustPersonalFinData
      var CustFinDataCustomObj = {
        CustFinDataObj: custFinData
      }
  
      await this.http.post(url, CustFinDataCustomObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          if (response == undefined) return;
  
          if (this.currentModal) this.currentModal.close();
        }
      );
  
      await this.getListCustPersonalFinData();
    }
  
    async saveCustCoyFinData() {
      if (!this.CustCompanyFinDataForm.valid) return;
  
      let custFinData: CustCompanyFinDataObj = {
        CustCompanyFinDataId: this.CustCompanyFinDataForm.controls['CustCompanyFinDataId'].value,
        CustCompanyId: this.CustCompanyFinDataForm.controls['CustCompanyId'].value,
        GrossMonthlyIncomeAmt: this.CustCompanyFinDataForm.controls['GrossMonthlyIncomeAmt'].value,
        GrossProfitAmt: this.CustCompanyFinDataForm.controls['GrossProfitAmt'].value,
        ReturnOfInvestmentPrcnt: this.CustCompanyFinDataForm.controls['ReturnOfInvestmentPrcnt'].value,
        ReturnOfEquityPrcnt: this.CustCompanyFinDataForm.controls['ReturnOfEquityPrcnt'].value,
        ReturnOfAssetPrcnt: this.CustCompanyFinDataForm.controls['ReturnOfAssetPrcnt'].value,
        ProfitMarginPrcnt: this.CustCompanyFinDataForm.controls['ProfitMarginPrcnt'].value,
        CurrentRatioPrcnt: this.CustCompanyFinDataForm.controls['CurrentRatioPrcnt'].value,
        DebtEquityRatioPrcnt: this.CustCompanyFinDataForm.controls['DebtEquityRatioPrcnt'].value,
        InvTurnOverPrcnt: this.CustCompanyFinDataForm.controls['InvTurnOverPrcnt'].value,
        ArTurnOverPrcnt: this.CustCompanyFinDataForm.controls['ArTurnOverPrcnt'].value,
        GrowthPrcnt: this.CustCompanyFinDataForm.controls['GrowthPrcnt'].value,
        WorkingCapitalAmt: this.CustCompanyFinDataForm.controls['WorkingCapitalAmt'].value,
        OthMonthlyInstAmt: this.CustCompanyFinDataForm.controls['OthMonthlyInstAmt'].value,
        DateAsOf: this.CustCompanyFinDataForm.controls['DateAsOf'].value,
        Revenue: this.CustCompanyFinDataForm.controls['Revenue'].value,
        OprCost: this.CustCompanyFinDataForm.controls['OprCost'].value,
        ProfitBeforeTax: this.CustCompanyFinDataForm.controls['ProfitBeforeTax'].value,
        CurrAsset: this.CustCompanyFinDataForm.controls['CurrAsset'].value,
        NetFixedAsset: this.CustCompanyFinDataForm.controls['NetFixedAsset'].value,
        TotalAsset: this.CustCompanyFinDataForm.controls['TotalAsset'].value,
        CurrLiablts: this.CustCompanyFinDataForm.controls['CurrLiablts'].value,
        LongTemrLiablts: this.CustCompanyFinDataForm.controls['LongTemrLiablts'].value,
        ShareholderEquity: this.CustCompanyFinDataForm.controls['ShareholderEquity'].value,
        CurrRatio: this.CustCompanyFinDataForm.controls['CurrRatio'].value,
        RowVersion: this.CustCompanyFinDataForm.controls['RowVersion'].value,
      };
  
      var url = this.IsAddFinData ? this.UrlConstantNew.AddCustCompanyFinData : this.UrlConstantNew.EditCustCompanyFinData
      var CustFinDataCustomObj = {
        CustFinDataObj: custFinData
      }
  
      await this.http.post(url, CustFinDataCustomObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          if (response == undefined) return;
  
          if (this.currentModal) this.currentModal.close();
        }
      );
  
      await this.getListCustCoyFinData();
    }

    async SaveAndSync()
    {
        let flag: boolean = false;
        flag = await this.saveCustAttrContentAndNext(true)
        if(!flag) return;

        let CustNo = "";

        let UrlBack = NavigationConstant.SELF_CUSTOM_CUST_PAGING;
        if (this.From == CommonConstant.CustFromEditMainData) UrlBack = NavigationConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING;

        await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }).toPromise().then(
            (response: CustObj) => {
              CustNo = response.CustNo;
            });

        await this.CustSetData.SendCustomerDataToRabbitMq(CustNo, UrlBack);
    }
  
    async saveCustAttrContentAndNext(IsParent: boolean = false): Promise<boolean> {
      if (this.CustAttrListForm.invalid) {
        NewCustSetData.markFormGroupTouched(this.CustAttrListForm);
        return false;
      }
      if (!this.CustAttrListForm.get('AttrList')) return false;
  
      if (!this.ListCustPersonalFinData.length && !this.ListCustCoyFinData.length) {
        this.toastr.warningMessage(ExceptionConstant.PLEASE_INPUT_FIN_DATA);
        return false;
      }
  
      var custAttrRequest = new Array<Object>();
      var formValue = this.CustAttrListForm['controls']['AttrList'].value;
  
      if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
        for (const key in formValue) {
          if (formValue[key]["AttrValue"] != null) {
            var custAttr = {
              CustId: this.CustId,
              RefAttrId: formValue[key]["RefAttrId"],
              AttrValue: formValue[key]["AttrValue"],
              AttrGroup: formValue[key]["AttrGroup"]
            };
            custAttrRequest.push(custAttr);
          }
        }
      }
  
      var CustFinDataCustomObj = {
        AttrGroups: this.attrGroups,
        CustAttrContentObjs: custAttrRequest,
      }
  
      await this.http.post(this.UrlConstantNew.AddCustFinDataAttrContent, CustFinDataCustomObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          if (!IsParent)
          {
            const actions = [
                {
                  'result': {
                    'type': 'function',
                    'target': 'self',
                    'alias': '',
                    'methodName': 'NextStep',
                    'params': []
                  },
                  'conditions': []
                }
              ];
          
              this.next.emit({Actions: actions});
          }
        }
      );
      return true;
    }
  
    // END Data DSF =================================

}
