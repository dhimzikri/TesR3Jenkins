import { CustAddrObj } from "./cust-addr-obj.model";

export class CustCompanyContactPersonObj{
    CustCompanyContactPersonId : number;
    CustCompanyId : number;
    ContactPersonName : string;
    MrGenderCode : string;
    MrJobPositionCode : string;
    JobTitleName : string;
    MobilePhnNo1 : string;
    MobilePhnNo2 : string;
    Email1 : string;
    Email2 : string;
    PhnArea1 : string;
    Phn1 : string;
    PhnExt1 : string;
    PhnArea2 : string;
    Phn2 : string;
    PhnExt2 : string;
    MrIdTypeCode: string;
    IdNo: string;
    IdExpiredDt: Date;
    BirthPlace: string;
    BirthDt: Date;
    MrCustRelationshipCode: string; 
    RowVersion: string;
    CustAddrObj: CustAddrObj;
    constructor() {
        this.CustAddrObj = new CustAddrObj();
    }
}