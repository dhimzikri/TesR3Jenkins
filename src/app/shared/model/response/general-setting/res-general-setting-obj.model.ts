export class ResGeneralSettingObj {
    GsCode: string;
    GsName: string;
    GsValue: any;
    GsDescr: string;
    RowVersion: string;

    constructor() {
        this.GsCode = "";
        this.GsName = "";
        this.GsValue = "";
        this.GsDescr = "";
        this.RowVersion = "";
    }
}

export class ResListGeneralSettingObj {
    ResGetListGeneralSettingObj: Array<ResGeneralSettingObj>;

    constructor() {
        this.ResGetListGeneralSettingObj = new Array<ResGeneralSettingObj>();
    }
}