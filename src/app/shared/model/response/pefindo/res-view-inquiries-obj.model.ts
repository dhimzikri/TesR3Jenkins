import { PefindoInquiryListCustomObj } from "../../pefindo/pefindo-inquiry-list-custom-obj.model";

export class ResViewInquiriesObj {
    InquiryLast1Mo: number;
    InquiryLast3Mo: number;
    InquiryLast6Mo: number;
    InquiryLast12Mo: number;
    InquiryLast24Mo: number;
    Last15Inquiries: Array<PefindoInquiryListCustomObj>;

    constructor() {
        this.InquiryLast1Mo = 0;
        this.InquiryLast3Mo = 0;
        this.InquiryLast6Mo = 0;
        this.InquiryLast12Mo = 0;
        this.InquiryLast24Mo = 0;
        this.Last15Inquiries = new Array<PefindoInquiryListCustomObj>();
    }
}