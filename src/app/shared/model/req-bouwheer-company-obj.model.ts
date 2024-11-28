import { BouwheerCompanyObj } from "./bouwheer-company-obj.model";
import { BouwheerObj } from "./bouwheer-obj.model";

export class ReqBouwheerCompanyObj {
    rAddBouwheerObj: BouwheerObj;
    rAddBouwheerCompanyObj: BouwheerCompanyObj;
    rAddBouwheerCompanyIndustryInfoObj : Array<RAddBouwheerCompanyIndustryInfoObj>;
    constructor() {
    }
}

export class RAddBouwheerCompanyIndustryInfoObj {
    public BouwheerCompanyId: number;
    public RefIndustryTypeCode: string;
    public BusinessStartDate: Date;
    public IsMain: boolean;
    public Notes: string;
}

