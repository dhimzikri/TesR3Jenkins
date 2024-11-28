export class ReqAddEditBouwheerCompanyIndustryInfoObj {
    BouwheerCompanyIndustryInfoId: number;
    BouwheerCompanyId: number;
    BouwheerId: number;
    RefIndustryTypeCode: string;
    Notes: string;
    BusinessStartDate: Date;
    IsMain: boolean;
    RowVersion: string;
    constructor() {
        this.BouwheerCompanyIndustryInfoId = 0;
        this.BouwheerCompanyId =0;
        this.BouwheerId = 0;
        this.Notes = '';
    }

  }
  