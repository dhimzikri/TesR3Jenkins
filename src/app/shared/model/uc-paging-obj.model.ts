import { environment } from "environments/environment";
import { AdInsConstant } from "../AdInstConstant";
import { UrlConstantNew } from "../constant/URLConstantNew";
import { NavigationConstant } from "../NavigationConstant";
import { CriteriaObj } from "./criteria-obj.model";
import { IntegrationObj } from "./library/integration-obj.model";

export class UcPagingObj {
    _url: string;
    enviromentUrl: string;
    title: string;
    apiQryPaging: string;
    deleteUrl: string;
    pagingJson: string;
    arrCritObj: any;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    isHideSearch: boolean;
    isSearched: boolean;
    delay: number;
    navigationConst: any;
    listEnvironments: Array<EnvisObj>;
    isJoinExAPI: boolean;
    isGetAllData: boolean;
    integrationObj: IntegrationObj;
    ListPageSize: number[];
    dicts: any

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.dicts = {};
        this._url = "";
        this.title = "";
        this.enviromentUrl = this.UrlConstantNew.env.FoundationR3Url + '/v2';
        this.apiQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
        this.deleteUrl = "";
        this.pagingJson = "";
        this.arrCritObj = null;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: this.UrlConstantNew.env.FoundationR3Url + '/v1' });
        this.listEnvironments.push({ environment: "FOU_WEB", url: this.UrlConstantNew.env.FoundationR3Web });
        this.listEnvironments.push({ environment: "NOTIF_ENGINE", url: this.UrlConstantNew.env.FoundationR3Url + '/v1' });
        this.whereValue = new Array<WhereValueObj>();
        this.isHideSearch = false;
        this.delay = 0;
        this.isSearched = false;
        this.navigationConst = NavigationConstant;
        this.isJoinExAPI = false;
        this.isGetAllData = false;
        this.integrationObj = new IntegrationObj();
        this.ListPageSize = [10, 20, 50, 100];
        this.dicts = {};
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
