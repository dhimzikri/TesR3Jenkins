export class ResCustCompanyIndustryInfoObj {
    CustNo: string;
    CustCompanyIndustryInfoId: number;
    RefIndustryTypeCode: string;
    RefIndustryTypeName: string;
    BusinessStartDate: Date;
    IsMain: boolean;
    Notes: string;
    RowVersion: any;
    
    constructor(){
        this.CustNo = '', 
        this.CustCompanyIndustryInfoId = 0,
        this.RefIndustryTypeCode = '',
        this.RefIndustryTypeName = '',
        this.IsMain = false,
        this.Notes = '',
        this.RowVersion = ""
    }
}