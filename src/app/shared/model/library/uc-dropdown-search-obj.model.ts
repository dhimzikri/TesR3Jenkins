import { CommonConstant } from "app/shared/constant/CommonConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { environment } from "environments/environment";

export class UcDropdownSearchObj {

    enviromentUrl: string;
    apiPath: string;
    apiUrl: string;
    ddsType: string;
    customKey: string;
    customValue: string;
    requestObj: Object;
    isObject: boolean;
    customObjName: string;
    isSelectOutput: boolean;
    isReady: boolean;
    isCustomList: boolean;
    placeholder: string;
    ddsValue: string;
    size: number;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.enviromentUrl = this.UrlConstantNew.env.FoundationR3Url + "/v1";
        this.apiPath = "";
        this.apiUrl = "";
        this.ddsType = UcDropdownSearchConstant.DDL_TYPE_ONE; // one | all | none | blank
        this.customKey = "Key";
        this.customValue = "Value";
        this.requestObj = new Object();
        this.isObject = true;
        this.customObjName = CommonConstant.ReturnObj;
        this.isSelectOutput = false;
        this.isReady = false;
        this.isCustomList = false;
        this.placeholder = "FILTER";
        this.ddsValue = "";
        this.size = 10;
    }
}

export class UcDropdownSearchCallbackObj {
    selectedValue: string;
    selectedObj: Object;

    constructor() {
        this.selectedValue = "";
        this.selectedObj = new Object();
    }
}

export class UcDropdownSearchConstant {
    public static DDL_TYPE_ONE = "one";
    public static DDL_TYPE_ALL = "all";
    public static DDL_TYPE_BLANK = "blank";
}