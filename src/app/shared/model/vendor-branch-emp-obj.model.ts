import { VendorAddrObj } from "./vendor-addr-obj.model";
import { VendorEmpObj } from "./vendor-emp-obj.model";

export class VendorBranchEmpObj {
    VendorEmpObj: VendorEmpObj;
    VendorAddrObj: VendorAddrObj;

    constructor()
    {
        this.VendorEmpObj = new VendorEmpObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}
