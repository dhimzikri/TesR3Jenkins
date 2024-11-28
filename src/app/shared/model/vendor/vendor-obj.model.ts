export class VendorObj{
    VendorId: number;
    MrVendorCategoryCode: string;
    VendorCode: string;
    VendorName: string;
    MrVendorTypeCode: string;
    RegistrationNo: string;
    LicenseNo: string;
    MrIdTypeCode: string;
    IdNo: string;
    MobilePhnNo1: string;
    MobilePhnNo2: string;
    Email: string;
    VendorRating: any;
    EstablishmentDt: any;
    PartnershipDt: any;
    IsActive: any;
    VendorParentId : number;
    MrTaxCalcMethodCode: string;
    IsVat: any;
    TaxpayerNo: string;
    TaxpayerName: string;
    MrVendorClass: string;
    RowVersion: any;
    IsNpwpExist: boolean;
    VendorAtpmCode: string;
    constructor() { this.VendorId = 0; }
}