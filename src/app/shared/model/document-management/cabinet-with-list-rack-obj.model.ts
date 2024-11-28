import { RackForListObj } from "./rack-for-list-obj.model";

export class CabinetWithListRackObj{
    CabinetId = 0;
    CabinetCode: string;
    CabinetName: string;
    RefOfficeId: number;
    CabinetInfo: string;
    IsActive: boolean;
    ListRack: Array<RackForListObj>;
    Rowversion: string;
    constructor(){
        this.CabinetId = 0;
        this.CabinetCode = "";
        this.CabinetName = "";
        this.RefOfficeId = 0;
        this.CabinetInfo = "";
        this.IsActive = true;
        this.ListRack = new Array<RackForListObj>();
        this.Rowversion = "";
    }
}