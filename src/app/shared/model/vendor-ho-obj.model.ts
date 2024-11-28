import { VendorAddrObj } from "./vendor-addr-obj.model";
import { VendorAttrContentObj } from "./vendor-attr-content-obj.model";
import { VendorObj } from "./vendor-obj.model";
import { VendorAtpmMappingObj } from "./vendor-atpm-mapping-obj.model";

export class VendorHoObj {
    VendorObj: VendorObj;
    VendorAddrObj: VendorAddrObj;
    VendorAttrContentObjs : Array<VendorAttrContentObj>;
    VendorAtpmMappingObjs : Array<VendorAtpmMappingObj>;

    constructor()
    {
        this.VendorObj = new VendorObj();
        this.VendorAddrObj = new VendorAddrObj();
        
    }
}
