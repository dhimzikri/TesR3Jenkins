export class ResPefindoContractForExportObj {
    CreditorName: string;
    NegativeStatus: string;
    MaturityDate: Date;
    Type: string;
    Opened: Date;
    Status: string;
    Total: number;
    Balance: number;
    PastDue: number;
    Arreas: number;
    LastUpdate: Date;

    constructor() {
        this.CreditorName = "";
        this.NegativeStatus = "";
        this.MaturityDate = new Date();
        this.Type = "";
        this.Opened = new Date();
        this.Status = "";
        this.Total = 0;
        this.Balance = 0;
        this.PastDue = 0;
        this.Arreas = 0;
        this.LastUpdate = new Date();
    }
}