import { ThirdPartyTrustsocRsltObj } from "../third-party-rslt/third-party-trustsoc-rslt-obj.model";

export class ReqAddTrxSrcDataForTsObj {
    TrxNo: string;
    CustType: string;
    IdType: string;
    IdNo: string;
    ThirdPartyTrustsocRsltObjs : Array<ThirdPartyTrustsocRsltObj>

    constructor() {
        this.ThirdPartyTrustsocRsltObjs = new Array<ThirdPartyTrustsocRsltObj>();
    }
}