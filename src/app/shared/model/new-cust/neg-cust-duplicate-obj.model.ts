import { CustDuplicateObj } from "./cust-duplicate-obj.model";

export class NegCustDuplicateObj extends CustDuplicateObj{
    NegativeCustId: number;
    MrNegCustSource: string;
    MrNegCustType: string;
    constructor(){
        super();
    }
}