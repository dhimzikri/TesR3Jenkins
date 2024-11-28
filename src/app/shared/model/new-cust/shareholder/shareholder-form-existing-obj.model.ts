import { CustPersonalJobDataObj } from "../../cust-personal-job-data-obj.model";
import { CustCompanyMgmntShrholderObj } from "../cust-company-mgmnt-shrholder-obj.model";

export class CustFormExistingObj {
    CustCompanyMgmntShrholder: CustCompanyMgmntShrholderObj;
    CustPersonalJob: CustPersonalJobDataObj;

    constructor() {
        this.CustCompanyMgmntShrholder = new CustCompanyMgmntShrholderObj();
        this.CustPersonalJob = new CustPersonalJobDataObj();
    }
}