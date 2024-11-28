import { CommonConstant } from "app/shared/constant/CommonConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

export class UcThingsToDoObj {
    Url: string;
    RequestObj: ThingsToDoReqObj;

    constructor() {
        this.Url = "";
        this.RequestObj = new ThingsToDoReqObj();
    }
}

export class ThingsToDoReqObj {
    ModuleCode: string;
    IntegrationObj: Array<ThingsToDoIntegrationObj>;

    constructor() {
        this.ModuleCode = CommonConstant.MODULE_FOU;
        this.IntegrationObj = new Array<ThingsToDoIntegrationObj>();
    }
}

export class ThingsToDoIntegrationObj {
    BaseUrl: string;
    ApiPath: string;
    RequestObj: IntegrationReqObj;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.BaseUrl = this.UrlConstantNew.env.WFThingsToDoUrl;
        this.ApiPath = this.UrlConstantNew.GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo;
        this.RequestObj = new IntegrationReqObj();
    }
}

export class IntegrationReqObj {
    UserName: string;
    Office: string;
    Role: String;

    constructor() {
        this.UserName = "";
        this.Office = "";
        this.Role = "";
    }
}

export class UcThingsToDoV2Obj {
    Url: string;
    RequestObj: ThingsToDoReqV2Obj;

    constructor() {
        this.Url = "";
        this.RequestObj = new ThingsToDoReqV2Obj();
    }
}

export class ThingsToDoReqV2Obj {
    ModuleCode: string;
    IntegrationObj: Array<ThingsToDoIntegrationV2Obj>;

    constructor() {
        this.ModuleCode = CommonConstant.MODULE_FOU;
        this.IntegrationObj = new Array<ThingsToDoIntegrationV2Obj>();
    }
}

export class ThingsToDoIntegrationV2Obj {
    BaseUrl: string;
    ApiPath: string;
    RequestObj: IntegrationReqV2Obj;

    constructor() {
        this.BaseUrl = "";
        this.ApiPath = "";
        this.RequestObj = new IntegrationReqV2Obj();
    }
}

export class IntegrationReqV2Obj {
    UserName: string;
    OfficeCode: string;
    OfficeRoleCodes: Array<string>;

    constructor() {
        this.UserName = "";
        this.OfficeCode = "";
        this.OfficeRoleCodes = new Array<string>();
    }
}