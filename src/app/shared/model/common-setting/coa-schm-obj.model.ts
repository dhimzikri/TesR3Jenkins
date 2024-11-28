import { RefCoaObj } from "./ref-coa-obj.model";

export class CoaSchmObj {
    CoaSchmId: number
    SchmCode: string
    SchmName: string
    IsActive: boolean
    ListRefCoa : Array<RefCoaObj>;
    constructor() {
        this.CoaSchmId = 0
        this.SchmCode = ''
        this.SchmName = ''
        this.IsActive = false
        this.ListRefCoa= new Array<RefCoaObj>();
    }
}