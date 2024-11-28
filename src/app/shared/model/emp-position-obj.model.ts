export class EmpPositionObj {
    empPositionId: number;
    refEmpId: number;
    refOfficeId: number;
    orgJobTitleId: number;
    skillLvl: string;
    positionStartDt: Date;
    positionFinishDt: Date;
    superiorRefEmpId: number;
    isActive: string;

    constructor() { this.empPositionId = 0; }
}  