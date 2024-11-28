import { VendorAddrObj } from "./vendor-addr-obj.model";
import { VendorObj } from "./vendor-obj.model";
import { VendorContactPersonObj } from "./vendor-contact-person-obj.model";

export class AuctionCompanyObj {
    VendorObj: VendorObj;
    VendorAddrObj: VendorAddrObj;
    VendorContactPersonObj : VendorContactPersonObj;
    constructor()
    {
        this.VendorObj = new VendorObj();
        this.VendorAddrObj = new VendorAddrObj();
        this.VendorContactPersonObj = new VendorContactPersonObj();
    }
}
