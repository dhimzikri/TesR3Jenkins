import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import { CommonConstant } from "../constant/CommonConstant";
import { UrlConstantNew } from "../constant/URLConstantNew";

export class UcInputRFAObj {
    ApvTypecodes: any;
    EnvUrl: string;
    PathUrlGetSchemeBySchemeCode: string;
    PathUrlGetCategoryByCategoryCode: string;
    PathUrlGetAdtQuestion: string;
    PathUrlGetPossibleMemberAndAttributeExType: string;
    PathUrlGetApprovalReturnHistory: string;
    PathUrlCreateNewRFA: string;
    PathUrlCreateJumpRFA: string;
    CategoryCode: string;
    SchemeCode: string;
    TrxNo: string;
    Reason: any;
    OfficeCode: string;
    RequestedBy: string;

    constructor(private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) {
        let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.RequestedBy = context[CommonConstant.USER_NAME];
        this.OfficeCode = context[CommonConstant.OFFICE_CODE];
        this.ApvTypecodes = [];
        this.EnvUrl = this.UrlConstantNew.env.FoundationR3Url + "";
        this.PathUrlGetSchemeBySchemeCode = this.UrlConstantNew.GetSchemesBySchemeCode;
        this.PathUrlGetCategoryByCategoryCode = this.UrlConstantNew.GetRefSingleCategoryByCategoryCode;
        this.PathUrlGetAdtQuestion = this.UrlConstantNew.GetRefAdtQuestion;
        this.PathUrlGetPossibleMemberAndAttributeExType = this.UrlConstantNew.GetPossibleMemberAndAttributeExType;
        this.PathUrlGetApprovalReturnHistory = this.UrlConstantNew.GetApprovalReturnHistory;
        this.PathUrlCreateNewRFA = this.UrlConstantNew.CreateNewRFA;
        this.PathUrlCreateJumpRFA = this.UrlConstantNew.CreateJumpRFA;
        this.CategoryCode = "";
        this.SchemeCode = "";
        this.TrxNo = "";
        this.Reason = [];
    }
}