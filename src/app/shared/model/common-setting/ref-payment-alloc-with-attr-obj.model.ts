export class RefPaymentAllocWithAttrObj {
    RefPaymentAllocId: number;
    PaymentAllocCode: string;
    PaymentAllocName: string;
    IsSystem: boolean;
    PaymentAllocAttr: Array<PaymentAllocAttr>;
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

export class PaymentAllocAttr {
    PaymentAllocAttrCode: string;
    PaymentAllocAttrName: string;
    AttrInputType: string;
}