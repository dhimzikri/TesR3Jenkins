import { CustDocFileObj } from "./cust-doc-file-obj.model";

export class ReqCustDocFileObj {
    CustId: number;
    CustDocFileObjs: Array<CustDocFileObj>;
    constructor() {
        this.CustId = 0;
        this.CustDocFileObjs = new Array<CustDocFileObj>();
    }
}