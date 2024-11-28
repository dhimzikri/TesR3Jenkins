export class NotificationTemplateObj {
    NotificationTemplateId: number;
    LastNotificationTemplateId: number;
    NotificationTemplateCode: string;
    NotificationTemplateDescr: string;
    MrNotificationLevelCode: string;
    MrNotificationLevelDescr: string;
    MrNotificationSourceCode: string;
    MrNotificationSourceDescr: string;
    MrNotificationTypeCode: string;
    MrNotificationTypeDescr: string;
    Subject: string;
    StartDt: Date;
    EndDt: Date;
    Body: string;
    BaseUrl: string;
    Path: string;
    TotalParam: number;
    Version: number;
    IsActive: boolean;
    IsLatestVersion: boolean;

    constructor() {
        this.NotificationTemplateId = 0;
        this.LastNotificationTemplateId = 0;
        this.NotificationTemplateCode = "";
        this.NotificationTemplateDescr = "";
        this.MrNotificationLevelCode = "";
        this.MrNotificationLevelDescr = "";
        this.MrNotificationSourceCode = "";
        this.MrNotificationSourceDescr = "";
        this.MrNotificationTypeCode = "";
        this.MrNotificationTypeDescr = "";
        this.Subject = "";
        this.Body = "";
        this.BaseUrl = "";
        this.Path = "";
        this.TotalParam = 0;
        this.Version= 0;
    }
}