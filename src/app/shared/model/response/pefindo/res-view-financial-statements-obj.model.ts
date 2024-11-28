export class ResViewFinancialStatementsObj {
    AuditedSeqNo: number;
    Subscriber: number;
    ReportedDt: Date;
    TtlAsset: number;
    TtlLiabilities: number;
    TtlEquity: number;

    constructor() {
        this.AuditedSeqNo = 0;
        this.Subscriber = 0;
        this.ReportedDt = new Date();
        this.TtlAsset = 0;
        this.TtlLiabilities = 0;
        this.TtlEquity = 0;
    }
}