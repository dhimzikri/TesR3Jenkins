import { VendorAddrObj } from "app/shared/model/vendor-addr-obj.model";
import { VendorEmpObj } from "app/shared/model/vendor-emp-obj.model";
import { VendorEmpXObj } from "./vendor-emp-x-obj.model-x";

export class VendorBranchEmpObjX {
    VendorEmpObj: VendorEmpObj;
    VendorAddrObj: VendorAddrObj;
    VendorEmpXObj: VendorEmpXObj;

    constructor()
    {
        this.VendorEmpObj = new VendorEmpObj();
        this.VendorAddrObj = new VendorAddrObj();
        this.VendorEmpXObj = new VendorEmpXObj();
    }
}
