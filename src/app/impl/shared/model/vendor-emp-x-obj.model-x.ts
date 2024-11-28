export class VendorEmpXObj {
    VendorEmpXId: number;
    VendorEmpId: number;
    IsVerified: boolean;
    Notes: string;
    IsSigner: boolean;

    constructor() { 
        this.IsVerified = false;
        this.IsSigner = false;
    }
}