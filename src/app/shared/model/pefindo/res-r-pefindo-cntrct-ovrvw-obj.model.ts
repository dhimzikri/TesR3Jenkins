export class ResRPefindoCntrctOvrvwObj {
    Sector: string;
    CntrctType: string;
    StartDt: Date;
    CntrctStat: string;
    TtlAmt: number;
    OsAmt: number;
    PastDueAmt: number;
    PastDueDays: number;

    constructor() {
        this.Sector = "";
        this.CntrctType = "";
        this.StartDt = new Date();
        this.CntrctStat = "";
        this.TtlAmt = 0;
        this.OsAmt = 0;
        this.PastDueAmt = 0;
        this.PastDueDays = 0;
    }
}