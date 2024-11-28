import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import { CommonConstant } from "../constant/CommonConstant";
import { UrlConstantNew } from "../constant/URLConstantNew";

export class UcNotificationObj {
    Username: string;
    EnvUrl: string;
    PathUrlSubs: string;
    PathUrlUnsubs: string;
    PathUrlGetAllNotif: string;
    PathUrlUpdateReadNotif: string;
    PublicKey: string;
    ListEnvironments: Array<EnvisObj>;
    IsClickable: boolean;
    ClickMethodLink: string;
    IsReady: boolean;

    constructor(private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) {
        let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.Username = context[CommonConstant.USER_NAME];
        this.EnvUrl = this.UrlConstantNew.env.NotifEngineURL;
        this.PathUrlSubs = this.UrlConstantNew.PushNotifSubscribe;
        this.PathUrlUnsubs = this.UrlConstantNew.PushNotifUnsubscribe;
        this.PathUrlGetAllNotif = this.UrlConstantNew.GetNotReadPushNotif;
        this.PathUrlUpdateReadNotif = this.UrlConstantNew.UpdateReadPushNotif;
        this.PublicKey = environment.NotificationPublicKey;
        this.ListEnvironments = new Array<EnvisObj>();
        this.ListEnvironments.push({ environment: "FOU", url: this.UrlConstantNew.env.FoundationR3Web});
        this.ListEnvironments.push({ environment: "LOS", url: this.UrlConstantNew.env.losR3Web});
        this.IsClickable = false;
        this.ClickMethodLink = CommonConstant.NOTIF_METHOD_INT_LINK;
        this.IsReady = false;
    }
}

export class EnvisObj {
    environment: string;
    url: string;

    constructor() {
        this.environment = "";
        this.url = "";
    }
}