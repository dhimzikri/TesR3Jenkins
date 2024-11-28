export class VendorEmpObj {
    VendorEmpId: number;
    VendorEmpNo: string;
    VendorEmpName: string;
    VendorId: number;
    SupervisorId: number;
    MobilePhnNo1: string;
    MobilePhnNo2: string;
    Email: string;
    MrIdTypeCode: string;
    IdNo: string;
    BirthPlace: string;
    BirthDate: Date;
    IsActive: boolean;
    JoinDt: Date;
    TaxIdNo: string;
    TaxpayerNo: string;
    TaxpayerName: string;
    MrVendorEmpPositionCode: string;
    IsContactPerson: boolean;
    IsOwner: boolean;
    IsInternalEmployee: boolean;
    VendorEmpRating: string;
    RowVersion: string;
    MrTaxCalcMethodCode: string;
    IsNpwpExist : boolean;

    constructor() { 
        this.RowVersion = "";
        this.IsInternalEmployee = false;
    }
}