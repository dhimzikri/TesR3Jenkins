export class VendorObj{
    VendorId: number;
    MrVendorCategoryCode: string;
    MrKonvenSyariahCode: string;
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
    VendorRating: number;
    EstablishmentDt: Date;
    PartnershipDt: Date;
    IsActive: boolean;
    VendorParentId : number;
    MrTaxCalcMethodCode: string;
    IsVat: boolean;
    TaxpayerNo: string;
    TaxpayerName: string;
    MrVendorClass: string;
    RowVersion: string;
    IsNpwpExist: boolean;
    VendorAtpmCode: string;
    TaxIdNo: string;
    IsOneAffiliate: boolean;
    TaxSchmCode: boolean;
    IsSyariah: boolean;

    constructor() { this.VendorId = 0; }
}