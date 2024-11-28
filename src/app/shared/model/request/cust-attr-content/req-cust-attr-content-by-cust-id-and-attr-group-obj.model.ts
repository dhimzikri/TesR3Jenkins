export class ReqCustAttrContentByCustIdAndAttrGroupObj {
    CustId: number;
    AttrGroup: string;

    constructor() {
        this.CustId = 0;
        this.AttrGroup = "";
    }
}

export class ReqCustAttrContentByCustIdAndAttrGroupAndListAttrCodeObj extends ReqCustAttrContentByCustIdAndAttrGroupObj {
    AttrCodes: Array<string>;
    constructor() {
        super();
        this.AttrCodes = new Array<string>();
    }
}

export class ReqCustAttrContentByCustIdAndListAttrGroupObj {
    CustId: number;
    AttrGroups: Array<string>;

    constructor() {
        this.CustId = 0;
        this.AttrGroups = new Array();
    }
}