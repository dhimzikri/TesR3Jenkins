export class GeneralSettingObj {
  GeneralSettingId: number;
  GsCode: string;
  GsName: string;
  GsValue: string;
  GsDescr: string;
  ModuleCode: string;
  RoleCode: string;
  RowVersion: string;
  ListGsCode : Array<string>;
  constructor() { this.GeneralSettingId = 0; this.RowVersion = ""}
}
