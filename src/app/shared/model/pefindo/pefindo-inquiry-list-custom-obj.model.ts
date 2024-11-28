export class PefindoInquiryListCustomObj {
    InquiryDt: Date;
    Reason: string;
    Sector: string;

    constructor() {
        this.InquiryDt =  new Date();
        this.Reason = "";
        this.Sector = "";
    }
}