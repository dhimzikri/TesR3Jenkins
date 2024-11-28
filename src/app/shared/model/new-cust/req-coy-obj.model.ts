import { CustAddrObj } from "../cust-addr-obj.model";
import { CustCompanyObj } from "../cust-company-obj.model";
import { CustDocFileObj } from "../cust-doc-file/cust-doc-file-obj.model";
import { CustObj } from "../cust-obj.model";
import { CustCompanyMgmntShrholderObj } from "./cust-company-mgmnt-shrholder-obj.model";

export class ReqCoyObj{
    CustObj : CustObj;
    CustCompanyObj : CustCompanyObj;
    CustAddr: CustAddrObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustDocFileObjs: Array<CustDocFileObj>;
}
