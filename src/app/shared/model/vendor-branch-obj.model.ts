import { VendorAddrObj } from "./vendor-addr-obj.model";
import { VendorBranchMainObj } from "./vendor-branch-main-obj.model";
import { VendorAttrContentObj } from "./vendor-attr-content-obj.model";

export class VendorBranchObj {
    
    VendorBranchMainObj: VendorBranchMainObj;
    VendorAddrObj: VendorAddrObj;
    VendorAttrContentObjs : VendorAttrContentObj;
    constructor()
    {
        this.VendorBranchMainObj = new VendorBranchMainObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}