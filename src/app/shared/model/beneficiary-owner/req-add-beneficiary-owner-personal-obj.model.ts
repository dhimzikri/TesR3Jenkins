import { BeneficiaryOwnerObj } from "./beneficiary-owner-obj.model";
import { BeneficiaryOwnerPersonalObj } from "./beneficiary-owner-personal-obj.model";

export class ReqAddBeneficiaryOwnerPersonalObj
{
    rAddBeneficiaryOwnerObj :BeneficiaryOwnerObj;
    rAddBeneficiaryOwnerPersonalObj : BeneficiaryOwnerPersonalObj;

    constructor() 
    {
        this.rAddBeneficiaryOwnerObj = new BeneficiaryOwnerObj();
        this.rAddBeneficiaryOwnerPersonalObj = new BeneficiaryOwnerPersonalObj();
    }
}