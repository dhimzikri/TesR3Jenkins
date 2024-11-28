export class ListAssetSchemeHObj {
    AssetSchmCode: string;
    AssetSchmName: string;
    AssetMasterId: number;
    AssetSchmHIdFromD: number;
    AssetSchmHIdFromH: number;

    constructor() {
        this.AssetSchmCode = "";
        this.AssetSchmName = "";
        this.AssetMasterId = 0;
        this.AssetSchmHIdFromD = 0;
        this.AssetSchmHIdFromH = 0;
    }
}

export class ResGetListAssetSchemeHObj {
    ReturnObject: Array<ListAssetSchemeHObj>;

    constructor() {
        this.ReturnObject = new Array<ListAssetSchemeHObj>();
    }
}