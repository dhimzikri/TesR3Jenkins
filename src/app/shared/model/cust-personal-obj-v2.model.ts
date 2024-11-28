import { CustApuPptObj } from "./cust-apu-ppt-obj.model";
import { CustPersonalObj } from "./cust-personal-obj.model";

export class CustPersonalObjV2 extends CustPersonalObj  {    
  CustApuPptObj : CustApuPptObj = new CustApuPptObj();
    constructor() {
      super();
    }
  }
  