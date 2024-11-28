export class BouwheerObj {
    BouwheerId : number;
    BouwheerNo : string;
    BouwheerName : string;
    IdNo : string;
    MrIdTypeCode : string;
    IdExpiredDt : Date;
    TaxIdNo : string;
    MrCustTypeCode : string;
    BouwheerAsCustNo : string;
    LimitPlafondAmt : any;
    IsDebtor : string;
    RowVersion: string;
    
    constructor() {
        this.BouwheerId =0;
        this.BouwheerNo ="";
        this.BouwheerName = "";
        this.IdNo ="";
        this.MrIdTypeCode ="";
        this.TaxIdNo ="";
        this.MrCustTypeCode ="";
        this.BouwheerAsCustNo ="";
        this.LimitPlafondAmt =0;
        this.IsDebtor ="";
        this.RowVersion="";
    }
}