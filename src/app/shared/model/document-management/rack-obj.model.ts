export class RackObj{
    RackId: number;
    CabinetId: number;
    RackCode: string;
    CurrentRackCode: string;
    RackName: string;
    RackInfo: string;
    IsActive: boolean;
    RowVersion: string;
    CabinetCode: string;
    constructor(){this.RackId = 0; this.RowVersion = "";}
}