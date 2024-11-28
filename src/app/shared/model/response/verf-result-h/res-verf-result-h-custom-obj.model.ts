import { ResVerfResultDCustomObj } from "../verf-result-d/res-verf-result-d-custom-obj.model";

export class ResVerfResultHCustomObj{
    VerfQuestionGrpCode: string;
    VerfQuestionGrpName: string;
    VerResultList: Array<ResVerfResultDCustomObj>

    constructor(){
        this.VerfQuestionGrpCode = "";
        this.VerfQuestionGrpName = "";
    }
}