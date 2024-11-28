import { KeyValueObj } from "../key-value/key-value-obj.model";

export class CompleteTaskModelObj {
    TransactionNo: string;
    InstanceId: string;
    ActionType: string;
    TaskId: string;
    ReturnValue: string;
    AdditionalReturnValues : { [key: string]: Array<KeyValueObj>; } = {};
 
    constructor() {
        this.TransactionNo = "";
        this.InstanceId= "";
        this.ActionType = "";
        this.TaskId = "";
        this.ReturnValue = "";
    }
}