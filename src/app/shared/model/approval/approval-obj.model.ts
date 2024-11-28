export class ApprovalObj {
    TaskId: number;
    Username: string;
    IsHold: boolean;

    constructor() {
        this.TaskId = -999
        this.Username = "";
        this.IsHold = true;
    }
}