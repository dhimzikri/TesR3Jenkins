export class CustPersonalFinDataObj {
    CustPersonalFinDataId: any;
    CustPersonalId: any;
    DateAsOf: Date;
    MonthlyIncomeAmt: any;
    MonthlyExpenseAmt: any;
    MonthlyInstallmentAmt: any;
    MrSourceOfIncomeCode: any;
    SpouseMonthlyIncomeAmt: any;
    IsJoinIncome: any;
    TotalIncomeAmt: any;
    NettIncomeAmt: any;
    NettProfitMonthlyAmt: any;
    OtherIncomeAmt: any;
    OtherMonthlyInstAmt: any;
    RowVersion: any;
    
    constructor(){
        this.CustPersonalFinDataId = 0, 
        this.MonthlyIncomeAmt = 0,
        this.MonthlyExpenseAmt = 0,
        this.MonthlyInstallmentAmt = 0,
        this.MrSourceOfIncomeCode = '',
        this.SpouseMonthlyIncomeAmt = 0,
        this.IsJoinIncome = 0,
        this.TotalIncomeAmt = 0,
        this.NettIncomeAmt = 0,
        this.NettProfitMonthlyAmt = 0,
        this.OtherIncomeAmt = 0,
        this.OtherMonthlyInstAmt = 0,
        this.RowVersion = ""
    }
}