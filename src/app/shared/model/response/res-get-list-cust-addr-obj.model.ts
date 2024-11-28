export class ResListCustAddrObj{
    CustAddrId : number;
    MrCustAddrTypeCode : string;
    Addr : string;
    MrBuildingOwnershipCode : string;
    PhnArea1 : string;
    PhnArea2 : string;
    Notes : string;

    constructor(){
        this.CustAddrId = 0;
        this.MrCustAddrTypeCode = "";
        this.Addr = "";
        this.MrBuildingOwnershipCode ="";
        this.PhnArea1 = "";
        this.PhnArea2 = "";
        this.Notes = "";
    }
}

export class ResGetListCustAddrObj{
    ReturnObject : Array<ResListCustAddrObj>;
    
    constructor(){
        this.ReturnObject = new Array<ResListCustAddrObj>();
    }
}