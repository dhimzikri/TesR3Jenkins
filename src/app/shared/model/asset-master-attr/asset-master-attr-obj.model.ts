export class AssetMasterAttrObj {
    AssetMasterId: number;
    AssetAttrId: any;
    AttrContent: string;

    constructor() {
        this.AssetMasterId = 0;
        this.AttrContent = "";
    }
}

export class AssetMasterAttrContentObj {
    AssetMasterAttrContentId : number;
    AssetMasterId: number;
    AssetAttrId: any;
    AttrContent: string;
    AttrCode : string;
    AttrName : string;
    AttrLength : number;
    AttrTypeCode : string;
    AttrInputType : string;
    AttrValue : string;
    IsMandatory : boolean;

    constructor() {
        this.AssetMasterAttrContentId = 0;
        this.AssetMasterId = 0;
        this.AssetAttrId = 0;
        this.AttrContent = "";
        this.AttrCode = "";
        this.AttrName = "";
        this.AttrLength = 0;
        this.AttrTypeCode = "";
        this.AttrInputType = "";
        this.AttrValue = "";
        this.IsMandatory = false;
    }
}