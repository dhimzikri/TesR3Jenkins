import { EmailNotificationObj } from "./email-notification-obj.model";
import { PushNotificationObj } from "./push-notification-obj.model";
import { SmsWaNotificationObj } from "./sms-wa-notification-obj.model";

export class SendToNotificationEngineObj {
    NotificationJobId: string;
    NotificationTemplateCode: string;
    MrNotificationLevelCode: string;
    MrNotificationLevelDescr: string;
    MrNotificationSourceCode: string;
    MrNotificationSourceDescr: string;
    MrNotificationTypeCode: string;
    MrNotificationTypeDescr: string;
    SendTo: string;
    SendTos: Array<string>;
    Param: Array<string>;
    KeyValParam: Map<string,string>;
    Version: number;
    EmailNotificationObj: EmailNotificationObj;
    PushNotificationObj: PushNotificationObj;
    SmsWaNotificationObj: SmsWaNotificationObj;
    RefNo: string;

    constructor() {
        this.NotificationJobId = "";
        this.NotificationTemplateCode = "";
        this.MrNotificationLevelCode = "";
        this.MrNotificationLevelDescr = "";
        this.MrNotificationSourceCode = "";
        this.MrNotificationSourceDescr = "";
        this.MrNotificationTypeCode = "";
        this.MrNotificationTypeDescr = "";
        this.SendTo = "";
        this.SendTos = new Array();
        this.KeyValParam = new Map<string,string>();
        this.Param = new Array<string>();
        this.Version = 0;
        this.EmailNotificationObj = new EmailNotificationObj();
        this.PushNotificationObj = new PushNotificationObj();
        this.SmsWaNotificationObj = new SmsWaNotificationObj();
        this.RefNo = "";
    }
}
