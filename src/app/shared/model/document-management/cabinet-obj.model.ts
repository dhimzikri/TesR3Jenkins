export class CabinetObj{
    CabinetId = 0;
    CabinetCode: string;
    CabinetName: string;
    RefOfficeId: number;
    CabinetInfo: string;
    IsActive: boolean;
    Rowversion: string;
    constructor(){
        this.CabinetId = 0;
        this.CabinetCode = "";
        this.CabinetName = "";
        this.RefOfficeId = 0;
        this.CabinetInfo = "";
        this.IsActive = true;
        this.Rowversion = "";
    }
}