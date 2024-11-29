export class PathConstantSelfCustom {
  //#region Common-Path
  public static CNAF = "CNAF";
  public static DEMO = "Demo";
  public static SELFCUSTOM = "SelfCustom";
  public static PAGING_CNAF = "PagingCNAF";
  public static PAGING_EMP = "Paging";
  public static ADD_CNAF = "AddCNAF";
  public static DETAIL_CNAF = "DetailCNAF";
  public static UPLOAD_CNAF = "UploadCNAF";
  public static ADD_EDIT_CNAF = "AddEditCNAF";
  public static REPORT_CNAF = "ReportCNAF";
  //#endregion

  // AssetType SelfCustom
  public static AssetDemo = "Demo";
  public static SelfCustomAsset = "SelfCustom";
  public static AssetType = "AssetType";
  public static PagingAsset = "Paging";
  // for AssetDetial
  public static PagingD = "Detail";

  // TestDB Page
  public static TestDB = "TestDDB";
  public static PAGING_TESTDB = "Paging";
  public static PAGING_ZipCode = "Paging";
  // end testdb

  //#region Reimburse
  public static REIMB_REQ = "ReimburseRequest";
  public static REIMB_REQ_CNAF =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.REIMB_REQ +
    "/" +
    PathConstantSelfCustom.DETAIL_CNAF; //Demo/SelfCustom/ReimburseRequest/DetailCNAF

  public static REIMB_APV_CNAF = "ReimburseApproval";
  public static REIMB_APV_PAGING_CNAF =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.REIMB_APV_CNAF +
    "/" +
    PathConstantSelfCustom.PAGING_CNAF; //Demo/SelfCustom/ReimburseApproval/DetailCNAF

  public static REIMB_APV_DETAIL_CNAF =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.REIMB_APV_CNAF +
    "/" +
    PathConstantSelfCustom.DETAIL_CNAF; //Demo/SelfCustom/ReimburseApproval/DetailCNAF
  //#endregion

  //#region
  public static RPT_EMP = "ReportCNAF";
  public static RPT_EMP_CNAF =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.REPORT_CNAF; //Demo/SelfCustom/ReportCNAF/DetailCNAF
  //#endregion

  public static EMP_CNAF = "Employee";
  public static EMP_PAGING_CNAF =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.EMP_CNAF +
    "/" +
    PathConstantSelfCustom.PAGING_EMP; // /Demo/SelfCustom/Employee/Paging

  public static EMP_DETAIL_CNAF =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.EMP_CNAF +
    "/" +
    PathConstantSelfCustom.DETAIL_CNAF; ///Demo/SelfCustom/Employee/Detail

  public static ASSET_TYPE_D = "AssetType";
  public static ASSET_TYPE_D_PAGING_CNAF =
    PathConstantSelfCustom.AssetDemo +
    "/" +
    PathConstantSelfCustom.SelfCustomAsset +
    "/" +
    PathConstantSelfCustom.AssetType +
    "/" +
    PathConstantSelfCustom.PagingAsset; //Demo/SelfCustom/ReimburseApproval/DetailCNAF

  public static ASSET_TYPE_DETAIL =
    PathConstantSelfCustom.AssetDemo +
    "/" +
    PathConstantSelfCustom.SelfCustomAsset +
    "/" +
    PathConstantSelfCustom.AssetType +
    "/" +
    PathConstantSelfCustom.PagingD; //Demo/SelfCustom/ReimburseApproval/DetailCNAF

  public static TEST_ZipCode = "ZipCode";
  public static TEST_ZipCode_PAGING =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.TEST_ZipCode +
    "/" +
    PathConstantSelfCustom.PAGING_ZipCode; //Demo/SelfCustom/ReimburseApproval/DetailCNAF

  public static TES_ZIPCODE_DETAIL =
    PathConstantSelfCustom.DEMO +
    "/" +
    PathConstantSelfCustom.SELFCUSTOM +
    "/" +
    PathConstantSelfCustom.TEST_ZipCode +
    "/" +
    PathConstantSelfCustom.PagingD; //Demo/SelfCustom/ReimburseApproval/DetailCNAF
}
