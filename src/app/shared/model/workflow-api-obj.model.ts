export class WorkflowApiObj{
    TaskListId : string;
    TransactionNo : string;
    WFCode : string;
    ListValue : {[id:string]:string;};

    constructor(){
        this.TaskListId = "";
        this.TransactionNo = "";
        this.WFCode = "";
        this.ListValue = {};
    }
}