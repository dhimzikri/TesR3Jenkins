import { ParameterObj } from "./parameter-obj.model";

export class RefFormObj {
    RefFormId: number;
    FormCode: string;
    Title: string;
    Path: string;
    Icon: string;
    Class: string;
    BadgeClass: string;
    FormConfiguration: string;
    ParentId: number;
    OrderNo: number;
    HierarchyNo: number;
    IsHidden: boolean;
    IsExternalLink: boolean;
    IsHaveChild: boolean;
    Params : string;
    ParentTitle : string;
    RefModuleId: number;
    ParameterList : Array<ParameterObj>;
    RowVersion: string;
    
    constructor() { 
        this.RefFormId = 0;
        this.IsHaveChild = false;
        this.ParentTitle = "";
    }
}
