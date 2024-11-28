export class RefCoaObj {
    RefCoaId: number
    RefAcctBookId: number
    CoaSchmId: number
    CoaScheme: string
    MrEntityType: string
    MrEntityCode: string
    EntityTypeName: string
    PaymentAllocCode: string
    CurrCode: string
    CurrName: string
    Coa: string
    constructor() {
        this.RefCoaId = 0
        this.RefAcctBookId = 0
        this.CoaSchmId = 0
        this.CoaScheme = ''
        this.MrEntityType = ''
        this.MrEntityCode = ''
        this.EntityTypeName = ''
        this.PaymentAllocCode = ''
        this.CurrCode = ''
        this.CurrName = ''
        this.Coa = ''
    }
}