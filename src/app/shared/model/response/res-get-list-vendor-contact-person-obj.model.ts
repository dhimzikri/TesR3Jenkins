export class ResListVendorContactPersonObj{
    VendorContactPersonId : number;
    Name : string;
    Phone1 : string;
    Email : string;
    constructor(){
        this.VendorContactPersonId = 0;
        this.Name = "";
        this.Phone1 = "";
        this.Email = "";
    }
}

export class ResGetListVendorContactPersonObj{
    ReturnObject : Array<ResListVendorContactPersonObj>;
    
    constructor(){
        this.ReturnObject = new Array<ResListVendorContactPersonObj>();
    }
}