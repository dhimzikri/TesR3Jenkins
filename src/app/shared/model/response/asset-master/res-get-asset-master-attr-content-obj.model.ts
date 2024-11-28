export class ResGetAssetMasterAttrContentByIdObj {
    AssetMasterAttrContentId: number;
    AssetMasterId: number;
    AssetAttrId: number;
    AttrContent: string;
    AttrCode: string;
    AttrName: string;
    AttrLength: number;
    AttrTypeCode: string;
    AttrInputType: string;
    AttrValue: string;
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