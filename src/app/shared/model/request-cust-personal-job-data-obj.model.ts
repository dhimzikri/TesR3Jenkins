import { CustPersonalJobDataObj } from "./cust-personal-job-data-obj.model";
import { CustAddrObj } from "./cust-addr-obj.model";

export class RequestCustPersonalJobDataObj {
    CustPersonalJobData : CustPersonalJobDataObj;
    JobAddr : CustAddrObj;
    OthBizAddr : CustAddrObj;
    PreJobAddr : CustAddrObj;
}  