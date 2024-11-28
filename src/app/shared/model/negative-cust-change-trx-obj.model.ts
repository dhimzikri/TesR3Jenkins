export class NegativeCustChangeTrxObj {
    NegativeCustChangeTrxId: number;
    NegativeCustId: number;
    TrxNo: string;
    MrTrxStatCode: string;
    MrNegCustTypeCode: string;
    MrNegCustSourceCode: string;
    NegCustCause: string;
    Notes: any;
    RfaNo: any;
    ReqDt: Date;
    ApvDt: Date;
    ExeDt: Date;
    RowVersion: string;
    constructor(){ this.NegativeCustChangeTrxId = 0; this.RowVersion = ''; }
}