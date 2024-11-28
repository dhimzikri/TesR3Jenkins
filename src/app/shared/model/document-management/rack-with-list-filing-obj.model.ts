import { FilingForListObj } from "./filing-for-list-obj.model";

export class RackWithListFilingObj{
    RackId = 0;
    RackCode: string;
    RackName: string;
    RackInfo: string;
    IsActive: boolean;
    ListFiling: Array<FilingForListObj>;
    Rowversion: string;
    constructor(){
        this.RackId = 0;
        this.RackCode = "";
        this.RackName = "";
        this.RackInfo = "";
        this.IsActive = true;
        this.ListFiling = new Array<FilingForListObj>();
        this.Rowversion = "";
    }
}