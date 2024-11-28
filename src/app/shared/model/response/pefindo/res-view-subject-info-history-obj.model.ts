export class ResViewSubjectInfoHistoryObj {
    Item: string;
    Value: string;
    ValidFromDt: Date;
    ValidToDt: Date;
    RPefindoHId: number;
    RPefindoSubjInfoHistId: number;
    Subscriber: string;
  
    constructor() {
      this.Item = "";
      this.Value = "";
      this.ValidFromDt = new Date();
      this.ValidToDt= new Date();
      this.RPefindoHId = 0;
      this.RPefindoSubjInfoHistId = 0;
      this.Subscriber = "";
    }
  }