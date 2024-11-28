import { ScoreCategorySchmDObj } from "./score-category-schm-d-obj.model";

export class ListScoreCategorySchmDObj {
    ScoreCategorySchmHId: number;
    ScoreCategorySchmDObjs: Array<ScoreCategorySchmDObj>;

    constructor() {
        this.ScoreCategorySchmDObjs = new Array<ScoreCategorySchmDObj>();
    }
}
