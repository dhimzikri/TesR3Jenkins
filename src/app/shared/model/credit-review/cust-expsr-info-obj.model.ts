import { CommonConstant } from "app/shared/constant/CommonConstant";
import { CustExpsrHObj } from "./cust-expsr-h-obj.model";

export class CustExpsrInfoObj {
    
    CustExpsrInfoId: number;
    CustExpsrVersion: number;
    CustId: number;
    CustNo: string;
    CustName: string;
    CustIndicator: string;
    CustIndicatorDescr: string;
    AsOfDate: Date;
    CaptureStat: string;
    RowVersion: string;

    CustExpsrHObj: CustExpsrHObj;
    
    constructor() {
        this.CustExpsrInfoId = 0;
        this.CustExpsrVersion = 0;
        this.CustName = "CustName";
        this.CustIndicator = CommonConstant.WhiteIndicator;
        this.CustIndicatorDescr = CommonConstant.NoData;
        this.CustExpsrHObj = new CustExpsrHObj();
    }
}