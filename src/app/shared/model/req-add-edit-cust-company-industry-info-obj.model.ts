export class ReqAddEditCustCompanyIndustryInfoObj {
    CustCompanyIndustryInfoId: number;
    CustNo: string;
    RefIndustryTypeCode: string;
    Notes: string;
    BusinessStartDate: Date;
    IsMain: boolean;
    RowVersion: string;
    constructor() {
        this.CustCompanyIndustryInfoId = 0;
        this.CustNo = '';
        this.Notes = '';
    }

  }
  