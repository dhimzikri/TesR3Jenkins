export class AssetSchmListObj {
  AssetSchmDId: number;
  AssetMasterId: number;
  AssetSchmCode: string;
  AssetSchmName: string;
  AssetTypeId: number;
  AssetSchmHIdFromH: number;
  AssetSchmHIdFromD: number;

  constructor() {
    this.AssetSchmDId = 0;
    this.AssetMasterId = 0;
    this.AssetSchmCode = "";
    this.AssetSchmName = "";
    this.AssetTypeId = 0;
    this.AssetSchmHIdFromH = 0;
    this.AssetSchmHIdFromD = 0;
  }
}

export class ReqGetListAssetSchmHObj {
  AssetMasterId: number;
  AssetTypeId: number;

  constructor() {
    this.AssetMasterId = 0;
    this.AssetTypeId = 0;
  }
}
  