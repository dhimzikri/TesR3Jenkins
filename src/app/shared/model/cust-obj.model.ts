import { CustAddrObj } from "./cust-addr-obj.model";

export class CustObj {
    CustId: number;
    CustNo: string;
    CustName: string;
    MrCustTypeCode: string;
    MrCustModelCode: string;
    MrIdTypeCode: string;
    IdNo: string;
    IdExpiredDt: Date;
    TaxIdNo: string;
    IsVip: boolean;
    IsAffiliateWithMf: boolean;
    VipNotes: string;
    OriginalOfficeCode: string;
    RowVersion: string;
    CustAddr: CustAddrObj;
    IsCustomer: boolean;
    IsFamily: boolean;
    IsGuarantor: boolean;
    IsShareholder: boolean;
    ThirdPartyTrxNo: string;
    IsCustGrp: boolean;
    ThirdPartyGroupTrxNo: string;

    constructor() {
        this.CustId = 0;
        this.CustAddr = new CustAddrObj();
        this.IsCustomer = false;
        this.IsFamily = false;
        this.IsGuarantor = false;
        this.IsShareholder = false;
        this.CustNo = "";
        this.ThirdPartyTrxNo = "";
        this.ThirdPartyGroupTrxNo = "";
        this.RowVersion = "";
    }
}