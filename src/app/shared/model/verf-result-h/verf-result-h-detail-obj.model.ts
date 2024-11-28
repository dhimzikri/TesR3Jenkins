import { VerfResultHObj } from "./verf-result-h.model";

export class VerifResulHDetailObj {
  VerfResultHId: number;
  VerfResultHObj: VerfResultHObj;
  VerfResultDListObj: any;


  constructor() {
    this.VerfResultHObj = new VerfResultHObj();
    this.VerfResultHId = 0;
  }
}
