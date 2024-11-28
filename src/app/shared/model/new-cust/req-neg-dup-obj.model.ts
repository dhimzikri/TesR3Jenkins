import { CustDocFileObj } from "../cust-doc-file/cust-doc-file-obj.model";
import { CustPersonalJobDataObj } from "../cust-personal-job-data-obj.model";
import { CustAttrContentObj } from "./cust-attr-content-obj.model";
import { CustCompanyMgmntShrholderObj } from "./cust-company-mgmnt-shrholder-obj.model";
import { CustPersonalFamilyObj } from "./cust-personal-family-obj.model";

export class ReqNegDupObj {
    NegativeCustId: number;
    CustDataMode: string;
    MrCompanyTypeCode: string;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustPersonalJobObj: CustPersonalJobDataObj;
    CustAttrContentObjs: Array<CustAttrContentObj>;
    ThirdPartyTrxNo: string;
    CustDocFileObjs: Array<CustDocFileObj>;

    constructor() {
        this.NegativeCustId = 0;
        this.CustDataMode = "";
        this.MrCompanyTypeCode = "";
        this.CustPersonalFamilyObj = null;
        this.CustCompanyMgmntShrholderObj = null;
    }
}