export class RefTcObj {
    RefTcId: number;
    TcCode: string;
    TcName: string;
    TcDataType: string;
    TcLength: number;
    TcValue: string;
    SeqNo: number;
    RefTrxTypeId: number;
    IsMandatory: boolean;
    IsActive: boolean;
    TcType: string;
    RowVersion: string;
    constructor() {
        this.RefTcId = 0;
        this.TcCode = "";
        this.TcName = "";
        this.TcDataType = "";
        this.SeqNo = 1;
        this.RefTrxTypeId = 1;
        this.IsMandatory = false;
        this.IsActive = true;
        this.TcType = "";
        this.RowVersion = "";
    }
}