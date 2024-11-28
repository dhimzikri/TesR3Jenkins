import { SrvyTaskObj } from "../srvy-task-obj.model";

export class ReqSrvyTaskAndSendToMobileObj {
    ReqListSrvyTaskObjs: Array<SrvyTaskObj>;
    Username: string;
    SrvyOrderId: number;
    constructor() {
        this.Username = "";
    }
}