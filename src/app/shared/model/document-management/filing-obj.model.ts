export class FilingObj{
    FilingId: number;
    RackId: number;
    FilingCode: string;
    CurrentFilingCode: string;
    FilingName: string;
    FilingInfo: string;
    IsActive: boolean;
    RowVersion: string;
    RackCode: string;
    constructor(){this.FilingId = 0; this.RowVersion = "";}
}