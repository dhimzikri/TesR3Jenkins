import { HttpHeaders } from "@angular/common/http";

export class AdInsConstant {
  //Application Item
  public static RestrictionBetween = "Between"
  public static RestrictionLike = "Like";
  public static RestrictionEq = "Eq";
  public static RestrictionNeq = "NEQ";
  public static RestrictionGt = "GT";
  public static RestrictionGte = "GTE";
  public static RestrictionLt = "LT";
  public static RestrictionLte = "LTE";
  public static RestrictionIn = "IN";
  public static RestrictionNotIn = "NotIn";
  public static RestrictionOr = "Or"; //pastikan ada 1 criteria sebelumnya
  public static RestrictionOrNeq = "OrNeq"; //pastikan ada 1 criteria sebelumnya
  public static RestrictionIsNull = "isnull";
  public static RestrictionIsNotNull = "isnotnull";
  public static RestrictionGTE = "GTE";
  public static RestrictionLTE = "LTE";

  // Storage Watch Key
  public static WatchRoleState = "RoleState";
  public static WatchRoleLang = "lang";

  public static showData = "10,50,100";
  public static TimeoutSession = 6000000;
  public static GetListProduct = "http://creator_websvr:7272/NEW_FINANCING/api/Catalog/getPopularViewByCriteria";
  public static FormDefault = "dashboard/dash-board";
  public static JoinTypeInner = "INNER";

  private static SpinnerHeaders = new HttpHeaders({
    'IsLoading': "true"});
  public static SpinnerOptions = {headers: AdInsConstant.SpinnerHeaders};

  // FRAMEWORK
  public static GetJournalResultPagingObjectBySQL = "/Generic/GetJournalResultPagingObjectBySQL";
  //MFE
  public static ArR3Web= "https://r3web-server.ad-ins.com/LMSAR";
  public static ArmntR3Web= "https://r3web-server.ad-ins.com/LMSARMNT";
  public static PaymentR3Web= "https://r3web-server.ad-ins.com/LMSPAYMENT";

  public static Logout = "/v1/UserManagement/LogOut";
}