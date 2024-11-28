export class PaymentAllocGrpObj {
    RefPaymentAllocGrpId: number
    RefPaymentAllocId: number
    MrPayAllocGrpCode: string
    IsActive: boolean
    constructor(){
        this.RefPaymentAllocGrpId = 0
        this.RefPaymentAllocId = 0
        this.MrPayAllocGrpCode = ''
        this.IsActive = false
    }
}