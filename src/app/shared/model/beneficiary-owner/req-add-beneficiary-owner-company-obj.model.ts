import { BeneficiaryOwnerObj } from "./beneficiary-owner-obj.model";
import { BeneficiaryOwnerCompanyObj } from "./beneficiary-owner-company-obj.model";

export class ReqAddBeneficiaryOwnerCompanyObj
{
    rAddBeneficiaryOwnerObj :BeneficiaryOwnerObj;
    rAddBeneficiaryOwnerCompanyObj : BeneficiaryOwnerCompanyObj;

    constructor() 
    {
        this.rAddBeneficiaryOwnerObj = new BeneficiaryOwnerObj();
        this.rAddBeneficiaryOwnerCompanyObj = new BeneficiaryOwnerCompanyObj();
    }
}