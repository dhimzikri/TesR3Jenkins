export class ResViewPefindoContractsObj {
    Creditor: string;
    StartDt: Date;
    TtlAmt: number;
    Years: number;
    Quarters: number;
    Month: number;

    constructor() {
        this.Creditor = "";
        this.StartDt = new Date();
        this.TtlAmt = 0;
        this.Years = 0;
        this.Quarters = 0;
        this.Month = 0;
    }
}