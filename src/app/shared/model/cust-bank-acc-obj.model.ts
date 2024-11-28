export class CustBankAccObj {
    CustBankAccId: number;
    CustId: number;
    RefBankId: number;
    BankName: string;
    BankBranch: string;
    BankAccNo: string;
    BankAccName: string;
    IsBankStmnt: boolean;
    BankBranchRegRptCode: string;
    BalanceAmt: number;
    IsDefault: boolean;
    IsActive: boolean;
    StartPeriod: string;
    EndPeriod: string;
    ListBankStmntObj: Array<any>
    RowVersion: any;
    BegBalanceAmt: any;

    constructor(){
        this.CustBankAccId = 0, 
        this.RowVersion = ""
    }
}