 
import { CustPersonalObj } from "./cust-personal-obj.model";
import { CustObj } from "./cust-obj.model";
import { CustCompanyObj } from "./cust-company-obj.model";
import { CustAddrObj } from "./cust-addr-obj.model";
 
 
export class AddCustObj {
    CustObj : CustObj;
    CustPersonalObj : CustPersonalObj;
    CustCompanyObj : CustCompanyObj;
    CustAddr: CustAddrObj;
    CustTempNo: string;
}