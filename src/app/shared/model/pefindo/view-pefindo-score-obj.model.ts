import { RPefindoDReasonObj } from "./r-pefindo-d-reason-obj.model";

export class ViewPefindoScoreObj {
    RPefindoDId: number;
    Score: string;
    ProbOfDefault: number;
    Grade: string;
    Date: Date;
    ListRPefindoDReason: Array<RPefindoDReasonObj>;

    constructor() {
        this.RPefindoDId = 0;
        this.Score = "";
        this.ProbOfDefault = 0;
        this.Grade = "";
        this.Date = new Date();
        this.ListRPefindoDReason = new Array<RPefindoDReasonObj>();
    }
}