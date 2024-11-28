export class ReqAddListRefNotifAttrSourceContentObj {
    RefNotificationSourceId: number;
    ListRefNotifAttrTemplateId: Array<number>;

    constructor()  {
        this.RefNotificationSourceId = 0;
        this.ListRefNotifAttrTemplateId = new Array<number>();
    }
}