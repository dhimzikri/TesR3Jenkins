export class ResPushNotificationObj {
    PushNotificationHistId: number;
    NotificationHistHId: number;
    SendTo: string;
    JsonMessages: string;

    constructor() {
        this.PushNotificationHistId = 0;
        this.NotificationHistHId = 0;
        this.SendTo = "";
        this.JsonMessages = "";
    }
}
