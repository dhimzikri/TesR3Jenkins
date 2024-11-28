export class VendorBranchMainObj{
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
    VendorRating: string;
    EstablishmentDt: Date;
    PartnershipDt: Date;
    IsActive: boolean;
    VendorParentId : number;
    ReservedField2: string;
    ReservedField3: string;
    ReservedField4: string;
    ReservedField5: string;
    ReservedField6: string;
    ReservedField7: string;
    ReservedField8: string;
    ReservedField9: string;
    MrTaxCalcMethodCode: string;
    IsVat: boolean;
    TaxIdNo: string;
    TaxpayerName: string;
    RowVersion: string;

    constructor() { this.VendorId = 0; }
}