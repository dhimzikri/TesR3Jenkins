import { ReqAddTrxSrcDataForPefindoV2Obj } from "./req-add-trx-src-data-for-pefindo-v2-obj-model";

export class ReqAddTrxSrcDataForPefindoMultiResultV2Obj {
    ReqAddTrxSrcDataForPefindoObj: Array<ReqAddTrxSrcDataForPefindoV2Obj>;
    CustId: number;
    RowVersion: string;
    SlikReferenceCode: string;
    MrPefindoInquiryReasonCode: string;

    constructor() {
        this.ReqAddTrxSrcDataForPefindoObj = new Array<ReqAddTrxSrcDataForPefindoV2Obj>();
        this.CustId = 0;
        this.RowVersion = "";
        this.SlikReferenceCode = "";
        this.MrPefindoInquiryReasonCode = "";
    }
}