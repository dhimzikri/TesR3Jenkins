export class RefNotificationSourceObj {
    RefNotificationSourceId: number;
    NotificationSourceCode: string;
    NotificationSourceDescr: string;
    IsActive: boolean;
    RowVersion: string;

    constructor() {
        this.RefNotificationSourceId =  0;
        this.NotificationSourceCode =  "";
        this.NotificationSourceDescr =  "";
        this.IsActive = false;
        this.RowVersion =  "";
    }
}