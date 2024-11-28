import { ReqAddTrxSrcDataForAsliRIObj } from "./req-add-trx-src-data-for-asli-ri-obj.model";
import { ResAsliRiObj } from "./res-asli-ri-obj.model";

export class ResTrxAsliRiObj{ 
  JobId: string;
  RequestDt: Date;
  ResultDt: Date;
  ReqAsliRiObj: ReqAddTrxSrcDataForAsliRIObj;
  ResAsliRiObj: ResAsliRiObj;
  
  constructor(){
    this.ReqAsliRiObj = new ReqAddTrxSrcDataForAsliRIObj();
    this.ResAsliRiObj = new ResAsliRiObj();
  }
}