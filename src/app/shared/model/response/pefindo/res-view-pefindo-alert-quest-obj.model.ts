export class ResViewPefindoAlertQuestObj {
  FraudAlrtNum: number;
  FraudAlrt3rdPrtyNum: number;
  LastFraudReqDt: Date;
  LastFraudReqDt3rdPrty: Date;
  SubsInqLast2Days: number;
  SubsInqLast14Days: number;

  constructor() {
    this.FraudAlrtNum = 0;
    this.FraudAlrt3rdPrtyNum = 0;
    this.LastFraudReqDt = new Date();
    this.LastFraudReqDt3rdPrty = new Date();
    this.SubsInqLast2Days = 0;
    this.SubsInqLast14Days = 0;
  }
}