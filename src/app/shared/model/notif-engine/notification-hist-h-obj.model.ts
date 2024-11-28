export class NotificationHistHObj {
    NotificationTemplateId : number;
    MrNotificationTypeCode : string;
    MrNotificationTypeDescr : string;
    MrNotificationLevelDescr : string;
    MrNotificationLevelCode : string;
    MrNotificationSourceCode : string;
    MrNotificationSourceDescr : string;
    Version : number;
    RefNo: string;
    NotificationJobId: string;

    constructor(){
        this.NotificationTemplateId = 0;
        this.MrNotificationTypeCode = "";
        this.MrNotificationTypeDescr = "";
        this.MrNotificationLevelDescr = "";
        this.MrNotificationLevelCode = "";
        this.MrNotificationSourceCode = "";
        this.MrNotificationSourceDescr = "";
        this.Version = 0;
        this.RefNo = "";
        this.NotificationJobId = "";
    }
}
