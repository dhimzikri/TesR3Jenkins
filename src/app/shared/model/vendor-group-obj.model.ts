export class VendorGroupObj {
    VendorGrpId: number;
    VendorGrpCode: string;
    VendorGrpName: string;
    VenderGrpDesc: string;
    MrVendorCategoryCode: string;
    MrVendorTypeCode: string;
    IsActive: boolean;
    RowVersion: string;
    VendorId: number;
    
    constructor(){this.VendorGrpId = 0, this.RowVersion = "" ,this.VendorId =0 }
}