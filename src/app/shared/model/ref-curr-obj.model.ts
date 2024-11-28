export class RefCurrObj {
    RefCurrId: number;
    CurrCode: string;
    CurrName: string;
    IsActive: boolean;
    MinRefundAmt: number;
    CofId : number;
    RegRptCode : string;
    LbppCode : string;
    RowVersion: string;
    constructor() { this.RefCurrId = 0, this.RowVersion = "" }
}