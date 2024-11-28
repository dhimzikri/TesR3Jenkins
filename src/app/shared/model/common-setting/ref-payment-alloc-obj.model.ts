export class RefPaymentAllocObj {
    RefPaymentAllocId: number;
    PaymentAllocCode: string;
    PaymentAllocName: string;
    IsSystem: boolean;
    IsActive: boolean;
    RowVersion: string;
    constructor() {
        this.RefPaymentAllocId = 0;
        this.PaymentAllocCode = "";
        this.PaymentAllocName = "";
        this.IsActive = false;
        this.IsSystem = false;
        this.RowVersion = "";
    }
}