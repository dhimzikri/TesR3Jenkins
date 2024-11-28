export class EmailNotificationObj {
    SendFrom: string;
    Cc: string;
    Bcc: string;
    Subject: string;
    Body: string;
    FileName: string;

    constructor() {
        this.SendFrom = "";
        this.Cc = "";
        this.Bcc = "";
        this.Subject = "";
        this.Body = "";
        this.FileName = "";
    }
}
