export class CustPersonalFamilyObj{
    CustPersonalFamilyId : number;
    CustId : number;
    FamilyId : number;
    MrCustRelationship : string;
    MrCustRelationshipDesc : string;
    CustNo : string;
    CustName : string;

    constructor(){
        this.CustPersonalFamilyId = 0;
        this.CustId = 0;
        this.FamilyId = 0;
        this.MrCustRelationship ="";
        this.MrCustRelationshipDesc = "";
        this.CustNo = "";
        this.CustName = "";
    }
}

export class ResponseListCustPersonalFamilyObj{
    CustPersonalFamilyList : Array<CustPersonalFamilyObj>;
    
    constructor(){
        this.CustPersonalFamilyList = new Array<CustPersonalFamilyObj>();
    }
}