export class ResBouwheerCompanyIndustryInfoObj {
    BouwheerCompanyIndustryInfoId: number;
    BouwheerCompanyId: number;
    RefIndustryTypeCode: string;
    RefIndustryTypeName: string;
    BusinessStartDate: Date;
    IsMain: boolean;
    Notes: string;
    RowVersion: any;
    ByteBase64: any;
    DocDmsId : number;
    DocUploadName: any;

    constructor(){
        this.BouwheerCompanyIndustryInfoId = 0, 
        this.BouwheerCompanyId = 0,
        this.RefIndustryTypeCode = '',
        this.RefIndustryTypeName = '',
        this.IsMain = false,
        this.Notes = '',
        this.DocDmsId = 0;
        this.RowVersion = ""
    }
}