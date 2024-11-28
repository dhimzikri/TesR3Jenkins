import { CustExpsrDObj } from "./cust-expsr-d-obj.model";

export class CustExpsrHObj{
    
    CustExpsrHId: number;
    CustExpsrInfoId: number;
    CustNo: string;
    CustName: string;
    CustIndicator: string;
    CustIndicatorDescr: string;
    IdType: string;
    IdNo: string;
    RelationWithCust: string;
    RelationType: string;
    ListCustExpsrDObj: Array<CustExpsrDObj> = new Array<CustExpsrDObj>();
    constructor(){}
}