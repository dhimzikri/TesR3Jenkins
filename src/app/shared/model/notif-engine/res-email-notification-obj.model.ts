export class ResEmailNotificationObj {
    EmailNotificationHistId: number;
    NotificationHistHId: number;
    SendTo: string;
    Cc: string;
    Bcc: string;
    Subject: string;
    Body: string;

    constructor() {
        this.EmailNotificationHistId = 0;
        this.NotificationHistHId = 0;
        this.SendTo = "";
        this.Cc = "";
        this.Bcc = "";
        this.Subject = "";
        this.Body = "";

    }
}
