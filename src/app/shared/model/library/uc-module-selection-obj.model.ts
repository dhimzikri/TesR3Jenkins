import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NavigationConstant } from "app/shared/NavigationConstant";

export class UcModuleSelectionObj {
    urlJson: string;
    urlLogo: string;
    listApis: Object;
    target: string;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.urlJson = '';
        this.urlLogo = 'assets/img/logo-01.png';
        this.listApis = new Object();
        this.listApis['FOU_WEB'] = this.UrlConstantNew.env.FoundationR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['LOS_WEB'] = this.UrlConstantNew.env.losR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['CMS_WEB'] = this.UrlConstantNew.env.cmsR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['AMS_WEB'] = this.UrlConstantNew.env.amsR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['LMS_WEB'] = this.UrlConstantNew.env.lmsR3Web + NavigationConstant.PAGES_LOGIN;
        this.target = '_self';
    }
}

export class UcModuleSelectionConstant {
    public static TOKEN = "XSRF-TOKEN";
}