export class OrganizationObj {
  refOrgId: number;
  orgName: string;
  hierarchyNo: number;
  isActive: string;
  parentId: number;
  oldParentId: number;

  constructor() { this.refOrgId = 0; }
}
