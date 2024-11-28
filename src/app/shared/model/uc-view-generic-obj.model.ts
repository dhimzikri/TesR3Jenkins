import { environment } from "environments/environment";
import { UrlConstantNew } from "../constant/URLConstantNew";
import { NavigationConstant } from "../NavigationConstant";

export class UcViewGenericObj {
    viewInput: string;
    viewEnvironment: string;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    navigationConst: any;
    listEnvironments: Array<EnvisObj>;
    IsCard: boolean;
    dataInput: any;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.viewInput = "";
        this.viewEnvironment = this.UrlConstantNew.env.FoundationR3Url + '/v1';
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: this.UrlConstantNew.env.FoundationR3Url + '/v1' });
        this.listEnvironments.push({ environment: "FOU_WEB", url: this.UrlConstantNew.env.FoundationR3Web });
        this.whereValue = new Array<WhereValueObj>();
        this.navigationConst = NavigationConstant;
    }
}

export class EnviObj {
    name: string;
    environment: string;

    constructor() {
        this.name = "";
        this.environment = "";
    }
}

export class WhereValueObj {
    property: string;
    value: any;

    constructor() {
        this.property = "";
    }
}

export class EnvisObj {
    environment: string;
    url: string;

    constructor() {
        this.environment = "";
        this.url = "";
    }
}
