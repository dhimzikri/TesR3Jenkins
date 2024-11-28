export class ResendAllNotificationObj {
    ListIdSms: Array<string> = new Array<string>();
    ListIdWa: Array<string> = new Array<string>();
    ListIdPushNotif: Array<string> = new Array<string>();
    ListIdEmail: Array<string> = new Array<string>();

    constructor(){
        this.ListIdSms = new Array<string>();
        this.ListIdWa = new Array<string>();
        this.ListIdPushNotif = new Array<string>();
        this.ListIdEmail = new Array<string>();
    }
}
