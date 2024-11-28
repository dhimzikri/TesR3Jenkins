export class VendorBankAccObj {
    VendorBankAccId: number;
    VendorId: number;
    VendorEmpId: number;
    RefBankId: number;
    BankAccountNo: string;
    BankAccountName: string;
    IsDefault: boolean;
    IsActive: boolean;
    RowVersion: string;
    BankName: string;
    Notes: string;
    BankBranch: string;
    constructor() { this.RowVersion = ""; }
}