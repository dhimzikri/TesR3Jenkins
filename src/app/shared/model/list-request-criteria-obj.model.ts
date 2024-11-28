import { CriteriaObj } from "./criteria-obj.model";

export class ListRequestCriteriaObj {
    criteria: CriteriaObj[];
    rowVersion: any;
    constructor() { this.rowVersion = "" }
}