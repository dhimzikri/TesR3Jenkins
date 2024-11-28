import { VerifResulHDetailObj } from "../../verf-result-h/verf-result-h-detail-obj.model";

export class ReqUpdateSrvyTaskAndAddVerfResultHDObj {
  VerfResultHD: VerifResulHDetailObj;
  SrvyTaskId: number;

  constructor() {
    this.VerfResultHD = new VerifResulHDetailObj();
  }
}