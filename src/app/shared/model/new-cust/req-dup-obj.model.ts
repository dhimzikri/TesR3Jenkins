
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { CustDocFileObj } from "../cust-doc-file/cust-doc-file-obj.model";
import { CustPersonalJobDataObj } from "../cust-personal-job-data-obj.model";
import { CustAttrContentObj } from "./cust-attr-content-obj.model";
import { CustCompanyMgmntShrholderObj } from "./cust-company-mgmnt-shrholder-obj.model";
import { CustPersonalFamilyObj } from "./cust-personal-family-obj.model";

export class ReqDupObj {
    CustNo: string;
    CustDataMode: string;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustPersonalJobObj: CustPersonalJobDataObj;
    CustAttrContentObjs: Array<CustAttrContentObj>;
    CustDocFileObjs: Array<CustDocFileObj>;
    ThirdPartyTrxNo: string;

    constructor() {
        this.CustNo = "";
        this.CustDataMode = CommonConstant.CustMainDataModeCust;
        this.CustPersonalFamilyObj = null;
        this.CustCompanyMgmntShrholderObj = null;
        this.CustPersonalJobObj = null;
        this.CustAttrContentObjs = null;
        this.ThirdPartyTrxNo = "";
    }
}