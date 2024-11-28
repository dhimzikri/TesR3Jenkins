
export class CustApuPptObj {
    CustId : number;
    IsEdd : boolean;
    MrCategory1TypeCode : string;
    MrCategory2TypeCode : string;
    MrCategory3TypeCode : string;
    reason : string;
    RowVersion: string;
    constructor() {
        this.CustId = 0;
        this.IsEdd = false;
        this.MrCategory1TypeCode = "";
        this.MrCategory2TypeCode = "";
        this.MrCategory3TypeCode = "";
        this.reason="";


    }
  }