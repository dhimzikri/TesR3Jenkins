export class ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj{
    VerfResultHId : number;
    VerfResultId : number;
    VerfSchemeHId : number;
    MrVerfObjectCode :string;
    MrVerfSubjectRelationCode :string;
    VerfDt : Date;
    MrVerfResultHStatCode :string;
    Phn :string;
    PhnType :string;
    Notes :string;
    Version : number;
    Score : number;
    Addr :string;
    MrAddrTypeCode :string;
    TrxRefNo :string;

    constructor(){
        this.VerfResultHId = 0;
        this.Version = 0;
        this.Score = 0;
        this.VerfResultId = 0;
        this.VerfSchemeHId = 0;
        this.MrVerfObjectCode = "";
        this.MrVerfSubjectRelationCode = "";
        this.MrVerfResultHStatCode = "";
        this.Phn = "";
        this.PhnType = "";
        this.Notes = "";
        this.Addr = "";
        this.MrAddrTypeCode = "";
        this.TrxRefNo = "";
    }
}