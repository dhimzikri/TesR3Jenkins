export class VendorAddrObj{
    VendorAddrId: number;
    VendorId: number;
    VendorEmpId: number;
    MrAddrTypeCode: string;
    Addr: string;
    Zipcode: string;
    AreaCode2: string; //kelurahan
    AreaCode1: string; //kecamatan
    AreaCode4: string;
    AreaCode3: string;
    City: string;
    Province: string;
    MrTaxAddrTypeCode: string;
    TaxAddr: string;
    TaxZipcode: string;
    TaxAreaCode2: string; //kelurahan
    TaxAreaCode1: string; //kecamatan
    TaxAreaCode4: string;
    TaxAreaCode3: string;
    TaxCity: string;
    TaxProvince: string;
    Latitude: string;
    Longitude: string;
    RowVersion: string;
    TaxRowVersion: string;
    Phn1: string;
    Phn2: string;
    PhnArea1: string;
    PhnArea2: string;
    
    constructor() { this.VendorAddrId = 0; }
}