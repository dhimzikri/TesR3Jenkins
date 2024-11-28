import { ResRPefindoCntrctOvrvwObj } from "../../pefindo/res-r-pefindo-cntrct-ovrvw-obj.model";

export class ResViewContractsObj {
    ListCntrctDebtor: Array<ResRPefindoCntrctOvrvwObj>;
    ListCntrctGuarantor: Array<ResRPefindoCntrctOvrvwObj>;
    WorstPastDueAmt: number;
    WorstPastDueDays: number;
    LastDlq90Days: Date;
    TtlAmtSumDbtr: number;
    PastDueAmtSumDbtr: number;
    OsAmtSumDbtr: number;
    OpenCntrctNumDbtr: number;
    ClsdCntrctNumDbtr: number;
    TtlAmtSumGuar: number;
    PastDueAmtSumGuar: number;
    OsAmtSumGuar: number;
    OpenCntrctNumGuar: number;
    ClsdCntrctNumGuar: number;

    constructor() {
        this.ListCntrctDebtor = new Array<ResRPefindoCntrctOvrvwObj>();
        this.ListCntrctGuarantor = new Array<ResRPefindoCntrctOvrvwObj>();
        this.WorstPastDueAmt = 0;
        this.WorstPastDueDays = 0;
        this.LastDlq90Days = new Date();
        this.TtlAmtSumDbtr = 0;
        this.PastDueAmtSumDbtr = 0;
        this.OsAmtSumDbtr = 0;
        this.OpenCntrctNumDbtr = 0;
        this.ClsdCntrctNumDbtr = 0;
        this.TtlAmtSumGuar = 0;
        this.PastDueAmtSumGuar = 0;
        this.OsAmtSumGuar = 0;
        this.OpenCntrctNumGuar = 0;
        this.ClsdCntrctNumGuar = 0;
    }
}