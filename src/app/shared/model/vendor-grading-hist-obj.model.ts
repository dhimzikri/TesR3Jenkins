export class VendorGradingHistObj{
    VendorGradingHistId: number;
    VendorGradingHistNo: string;
    VendorCode: string;
    VendorId: number;
    VendorParentId: number;
    PrevRating: number;
    NewRating: number;
    PrevGrade: String;
    NewGrade: String;
    ReqDt: Date;
    ReqByRefUserId: String;
    RefReasonId: number;
    ExeDt: Date;
    ApvDt: Date;
    Status: string;
    Notes: string;
    RfaNo: string;
    constructor() { 
        this.VendorGradingHistId = 0; 
        this.VendorGradingHistNo = "";
        this.VendorCode = "";
        this.VendorId = 0;
        this.VendorParentId = null;
        this.PrevRating = 0;
        this.NewRating = 0;
        this.PrevGrade = "";
        this.NewGrade = "";
        this.ReqDt = new Date();
        this.ReqByRefUserId = "";
        this.RefReasonId = null;
        this.ExeDt = new Date();
        this.ApvDt = new Date();
        this.Status = "";
        this.Notes = "";
        this.RfaNo = "";
    }
}