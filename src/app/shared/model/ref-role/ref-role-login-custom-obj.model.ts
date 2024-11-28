export class RefRoleLoginCustomObj {
    RefUserId: number;
    Username: string;
    FullName: string;
    EmpNo: string;
    Email1: string;
    CoyName: string;
    BusinessDt: Date;
    BusinessDtStr: string;
    RefUserRoles: Array<RefUserRoleCustomObj>;

    constructor() {
        this.RefUserId = 0;
        this.Username = "";
        this.FullName = "";
        this.EmpNo = "";
        this.Email1 = "";
        this.CoyName = "";
        this.BusinessDt = new Date();
        this.BusinessDtStr = "";
        this.RefUserRoles = new Array<RefUserRoleCustomObj>();
    }
}

export class RefUserRoleCustomObj {
    RefOfficeId: number;
    OfficeCode: string;
    OfficeName: string;
    IsHeadOffice: boolean;
    MrOfficeTypeCode: string;
    ParentId: number;
    Roles: Array<RefRoleCustomObj>;

    constructor() {
        this.RefOfficeId = 0;
        this.OfficeCode = "";
        this.OfficeName = "";
        this.IsHeadOffice = false;
        this.MrOfficeTypeCode = "";
        this.ParentId = 0;
        this.Roles = new Array<RefRoleCustomObj>();
    }
}

export class RefRoleCustomObj {
    RefJobTitleId: number;
    RefRoleId: number;
    JobTitleCode: string;
    JobTitleName: string; 
    RoleCode: string; 
    RoleName: string;

    constructor() {
        this.RefJobTitleId = 0;
        this.RefRoleId = 0;
        this.JobTitleCode = "";
        this.JobTitleName = ""; 
        this.RoleCode = ""; 
        this.RoleName = "";
    }
}