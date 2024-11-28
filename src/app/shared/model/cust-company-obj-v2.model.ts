import { CustApuPptObj } from "./cust-apu-ppt-obj.model";
import { CustCompanyObj } from "./cust-company-obj.model";

export class CustCompanyObjV2 extends CustCompanyObj  {    
  CustApuPptObj : CustApuPptObj = new CustApuPptObj();
    constructor() {
      super();
    }
  }
