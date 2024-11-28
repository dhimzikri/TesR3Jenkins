export class VendorGroupMemberObj {
  VendorGrpMbrId: number;
  VendorGrpId: number;
  VendorId: number;
  IsActive: boolean;
  RowVersion: string;

  constructor() { this.VendorId = 0; }
}