import { CustAddrObj } from "../cust-addr-obj.model";
import { CustDocFileObj } from "../cust-doc-file/cust-doc-file-obj.model";
import { CustObj } from "../cust-obj.model";
import { CustPersonalJobDataObj } from "../cust-personal-job-data-obj.model";
import { CustPersonalObj } from "../cust-personal-obj.model";
import { CustAttrContentObj } from "./cust-attr-content-obj.model";
import { CustCompanyMgmntShrholderObj } from "./cust-company-mgmnt-shrholder-obj.model";
import { CustPersonalFamilyObj } from "./cust-personal-family-obj.model";

export class ReqPersonalObj {
    CustObj: CustObj;
    CustPersonalObj: CustPersonalObj;
    CustAddr: CustAddrObj;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustPersonalJobObj: CustPersonalJobDataObj;
    CustAttrContentObjs: Array<CustAttrContentObj>;
    CustDocFileObjs: Array<CustDocFileObj>;
    IsAddSpouse: boolean;
    constructor() {
        this.IsAddSpouse = false;
    }
}
