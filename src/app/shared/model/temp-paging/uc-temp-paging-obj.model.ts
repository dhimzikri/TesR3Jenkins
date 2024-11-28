import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CriteriaObj } from '../criteria-obj.model';

export class UcTempPagingObj {
    urlJson: string;
    enviromentUrl: string;
    apiQryPaging: string;
    pagingJson: string;
    isReady: boolean;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    fromValue: Array<FromValueObj>;
    navigationConst: any;
    listEnvironments: Array<EnvisObj>;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.urlJson = "";
        this.enviromentUrl = this.UrlConstantNew.env.FoundationR3Url + "/v2.1";
        this.apiQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
        this.pagingJson = "";
        this.isReady = false;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: this.UrlConstantNew.env.FoundationR3Url + "/v1" });
        this.listEnvironments.push({ environment: "FOU_WEB", url: this.UrlConstantNew.env.FoundationR3Web });
        this.whereValue = new Array<WhereValueObj>();
        this.fromValue = new Array<FromValueObj>();
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

export class FromValueObj {
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