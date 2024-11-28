export class ReqExchangeRateObj{
    RefCurrId: number;
    CurrDt: Date;
    PostingDt: Date;
    ValueDt: Date;
    ExchangeRateAmt: number;
    RowVersion: string;

    constructor(){
        this.RefCurrId = 0;
        this.ExchangeRateAmt = 0;
        this.RowVersion = "";
    }
}