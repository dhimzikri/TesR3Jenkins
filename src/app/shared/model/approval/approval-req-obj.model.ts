export class ApprovalReqObj {
    Username: string;
    CategoryCode: string;
    CategoryCodes: Array<string>;
    RoleCode: string;
    OfficeCode: string;
    constructor() {
        this.Username = "";
        this.CategoryCode = "";
        this.CategoryCodes = new Array<string>();
        this.RoleCode = "";
        this.OfficeCode = "";
    }
}

export class ApvClaimTaskObj {
    TaskId : number
    Username: string

    constructor(){
        this.TaskId = -999
        this.Username = "";
    }
}