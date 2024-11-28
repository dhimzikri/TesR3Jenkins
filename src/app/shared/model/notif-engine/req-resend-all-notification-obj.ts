export class ReqResendAllNotificationObj {
    NotificationType: string;
    ListStrId: Array<string>

    constructor(){
        this.NotificationType = "";
        this.ListStrId = new Array<string>();
    }
}
