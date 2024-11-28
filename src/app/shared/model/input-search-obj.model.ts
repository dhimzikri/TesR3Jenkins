import { environment } from "environments/environment";
import { UrlConstantNew } from "../constant/URLConstantNew";
import { CriteriaObj } from "./criteria-obj.model";

export class InputSearchObj {
    _url: string;
    enviromentUrl: string;
    apiQryPaging: string;
    arrCritObj: any;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this._url = "";
        this.enviromentUrl = this.UrlConstantNew.env.FoundationR3Url + "/v1";
        this.apiQryPaging = "";
        this.arrCritObj = null;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.whereValue = new Array<WhereValueObj>();
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