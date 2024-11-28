import { VendorAttrContentObj } from "../vendor-attr-content-obj.model";
import { VendorContactPersonObj } from "../vendor-contact-person-obj.model";
import { VendorObj } from "../vendor-obj.model";
import { VendorAddrObj } from "../vendor/vendor-addr-obj.model";


export class VendorFundingObj{
    VendorFundCoyObj: VendorObj;
    VendorFundCoyAddrObj: VendorAddrObj;
    VendorAttrContent: VendorAttrContentObj;
    VendorContactPerson: VendorContactPersonObj;
}