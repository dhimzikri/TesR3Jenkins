export class SurveyorObj{
    SurveyorId: number;
    SurveyorNo: string;
    CenterGrpId: number;
    RefUserId: number;
    VendorId: number;
    MrSurveyorTypeCode: string;
    WorkloadAmt: number;
    CurrWorkloadAmt: number;
    CurrRRTask: any;
    IsActive: boolean;
    RowVersion: string;
    constructor(){this.SurveyorId = 0;}
}