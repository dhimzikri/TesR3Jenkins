import { PathConstantX } from "app/impl/shared/constant/PathConstantX";

export class PathConstant {
    // Notes: data yang di CombinePath itu arti ny ada lebih dari 1 Const dan ada /

    // layout-routes
    //#region layout-routes
    public static LR_DASHBOARD = "Dashboard";
    public static LR_FORMS = "forms";
    public static LR_COMPNT = "components";
    public static LR_PAGES = "Pages";
    public static LR_OFFICE = "Office";
    public static LR_OFFICE_BANK_ACC = "OfficeBankAcc";
    public static LR_EMP = "Employee";
    public static LR_ORG = "Organization";
    public static LR_CUST = "Customer";
    public static LR_SYSTEM_SETTING = "SystemSetting";
    public static LR_COMMON_SETTING = "CommonSetting";
    public static LR_UPLOAD = "Upload";
    public static LR_ASSET = "Asset";
    public static LR_VENDOR = "Vendor";
    public static LR_VERIF = "Verification";
    public static LR_ERROR = "Error";
    public static LR_SRVY = "Survey";
    public static LR_INTEGRATION = "Integration";
    public static LR_DOC_MNGMNT = "DocumentManagement";
    public static LR_JOURNAL = "journal"
    public static LR_LICENSE = "License";
    public static LR_SYS_USER = "SystemUser";
    public static LR_NOTIF_ENGINE = "NotifEngine";
    //#endregion

    //#region content-routes
    public static CR_PAGES = "Pages";
    public static CR_VIEW = "View";
    public static CR_DOC_MNGMNT_VIEW = "DocumentManagementView";
    public static CR_JOURNAL_VIEW = "journalview";
    //#endregion

    //#region content-pages
    public static LOGIN = "Login";
    public static CONTENT = "Content";
    public static REQ_PASSWORD = "RequestPassword";
    public static RESET_PASSWORD = "ResetPassword/:code";
    public static SELECT_MODULE = "SelectModule";
    //#endregion

    //#region Common-Path
    public static VIEW = "View";
    public static PAGES = "pages";
    public static PAGING = "Paging";
    public static MAIN = "Main";
    public static ADD = "Add";
    public static EDIT = "Edit";
    public static ADD_EDIT = "AddEdit";
    public static DETAIL = "Detail";
    public static ADD_DETAIL = PathConstant.ADD + "/" + PathConstant.DETAIL;
    public static UPLOAD = "Upload";
    public static VERIF = "Verif";
    public static APPRV = "Approval";
    public static INQUIRY = "Inquiry";
    public static CANCEL = "Cancel";
    public static TYPE = "Type";
    public static PERSONAL = "Personal";
    public static COY = "Company";
    public static RVW_UPLOAD_PAGING = "ReviewUploadPaging";
    public static RVW_UPLOAD_DETAIL = "ReviewUploadDetail";
    public static MEMBER = "Member";
    public static RTN_PAGING = "ReturnPaging";
    public static GROUP = "Group";
    public static SELF_CUSTOM = "SelfCustom";

    public static CUSTOM_PAGING = PathConstant.SELF_CUSTOM + "/" + "Paging";
    public static CUSTOM_DETAIL = PathConstant.SELF_CUSTOM + "/" + "Detail";
    //#endregion

    //#region System User
    public static SELF_CUSTOM_SYSTEM_USER_PAGING = this.SELF_CUSTOM + "/" + this.PAGING;
    public static SELF_CUSTOM_SYSTEM_USER_DETAIL = this.SELF_CUSTOM + "/" + this.DETAIL;
    //#endregion

    //#region Asset
    public static ASSET_TYPE_PAGING = PathConstant.TYPE + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_ASSET_TYPE_PAGING = this.SELF_CUSTOM + "/" + PathConstant.TYPE + "/" + PathConstant.PAGING;
    public static ASSET_TYPE_DETAIL = PathConstant.TYPE + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_ASSET_TYPE_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.TYPE + "/" + PathConstant.DETAIL;
    public static ASSET_SCHM = "Scheme";
    public static ASSET_SCHM_PAGING = PathConstant.ASSET_SCHM + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_ASSET_SCHM_PAGING = this.SELF_CUSTOM + "/" + PathConstant.ASSET_SCHM + "/" + PathConstant.PAGING;
    public static ASSET_SCHM_MBR_DETAIL = PathConstant.ASSET_SCHM + "/MemberDetail";
    public static SELF_CUSTOM_ASSET_SCHM_MBR_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.ASSET_SCHM + "/MemberDetail";
    public static ASSET_SCHM_ADD_MBR = PathConstant.ASSET_SCHM + "/AddMember";
    public static SELF_CUSTOM_ASSET_SCHM_ADD_MBR = this.SELF_CUSTOM + "/" + PathConstant.ASSET_SCHM + "/AddMember";
    public static ASSET_SCHM_INFO_DETAIL = PathConstant.ASSET_SCHM + "/InformationDetail";
    public static SELF_CUSTOM_ASSET_SCHM_INFO_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.ASSET_SCHM + "/InformationDetail";
    public static ASSET_CONFIG = "Configuration";
    public static ASSET_CONFIG_PAGING = PathConstant.ASSET_CONFIG + "/" + PathConstant.PAGING;
    public static ASSET_CATEGORY = "Category";
    public static ASSET_CATEGORY_PAGING = PathConstant.ASSET_CATEGORY + "/" + PathConstant.PAGING;
    public static ASSET_CATEGORY_DETAIL = PathConstant.ASSET_CATEGORY + "/" + PathConstant.DETAIL;
    public static ASSET_ACC = "Accessory";
    public static ASSET_ACC_PAGING = PathConstant.ASSET_ACC + "/" + PathConstant.PAGING;
    public static ASSET_ACC_DETAIL = PathConstant.ASSET_ACC + "/" + PathConstant.DETAIL;
    public static ASSET_ATTR = "Attribute";
    public static ASSET_ATTR_PAGING = PathConstant.ASSET_ATTR + "/" + PathConstant.PAGING;
    public static ASSET_ATTR_DETAIL = PathConstant.ASSET_ATTR + "/" + PathConstant.DETAIL;
    public static ASSET_DOC = "Document";
    public static ASSET_DOC_PAGING = PathConstant.ASSET_DOC + "/" + PathConstant.PAGING;
    public static ASSET_DOC_DETAIL = PathConstant.ASSET_DOC + "/" + PathConstant.DETAIL;
    public static ASSET_DOC_MASTER = "DocumentMaster";
    public static ASSET_DOC_MASTER_PAGING = PathConstant.ASSET_DOC_MASTER + "/" + PathConstant.PAGING;
    public static ASSET_DOC_MASTER_DETAIL = PathConstant.ASSET_DOC_MASTER + "/" + PathConstant.DETAIL;
    public static ASSET_NEG = "NegativeAsset";
    public static ASSET_NEG_PAGING = PathConstant.ASSET_NEG + "/" + PathConstant.PAGING;
    public static ASSET_NEG_DETAIL = PathConstant.ASSET_NEG + "/" + PathConstant.DETAIL;
    public static ASSET_NEG_UPLOAD = PathConstant.ASSET_NEG + "/" + PathConstant.UPLOAD;
    public static ASSET_NEG_RVW_UPLOAD_PAGING = PathConstant.ASSET_NEG + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static ASSET_NEG_RVW_UPLOAD_DETAIL = PathConstant.ASSET_NEG + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static ASSET_MASTER = "AssetMaster";
    public static ASSET_MASTER_PAGING = PathConstant.ASSET_MASTER + "/" + PathConstant.PAGING;
    public static ASSET_MASTER_DETAIL = PathConstant.ASSET_MASTER + "/" + PathConstant.DETAIL;
    public static ASSET_MASTER_UPLOAD = PathConstant.ASSET_MASTER + "/" + PathConstant.UPLOAD;
    public static ASSET_MASTER_RVW_UPLOAD_PAGING = PathConstant.ASSET_MASTER + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static ASSET_MASTER_RVW_UPLOAD_DETAIL = PathConstant.ASSET_MASTER + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static ASSET_MASTER_CHILD = PathConstant.ASSET_MASTER + "/Child";

    public static CUSTOM_ASSET_DOC_MASTER_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_DOC_MASTER + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_DOC_MASTER_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_DOC_MASTER + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_CONFIG_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_CONFIG + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_CATEGORY_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_CATEGORY + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_CATEGORY_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_CATEGORY + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_DOC_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_DOC + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_DOC_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_DOC + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_ACC_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_ACC + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_ACC_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_ACC + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_ATTR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_ATTR + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_ATTR_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_ATTR + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_MASTER_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_MASTER + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_MASTER_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_MASTER + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_MASTER_UPLOAD = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_MASTER + "/" + PathConstant.UPLOAD;
    public static CUSTOM_ASSET_MASTER_RVW_UPLOAD_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_MASTER + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static CUSTOM_ASSET_MASTER_RVW_UPLOAD_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_MASTER + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static CUSTOM_ASSET_MASTER_CHILD = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_MASTER + "/Child";
    public static CUSTOM_ASSET_NEG_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_NEG + "/" + PathConstant.PAGING;
    public static CUSTOM_ASSET_NEG_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_NEG + "/" + PathConstant.DETAIL;
    public static CUSTOM_ASSET_NEG_UPLOAD = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_NEG + "/" + PathConstant.UPLOAD;
    public static CUSTOM_ASSET_NEG_RVW_UPLOAD_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_NEG + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static CUSTOM_ASSET_NEG_RVW_UPLOAD_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ASSET_NEG + "/" + PathConstant.RVW_UPLOAD_DETAIL;

    //#endregion

    //#region Common-Setting
    public static CS_MASTER_TYPE = "MasterType";
    public static CS_MASTER_TYPE_DETAIL = PathConstant.CS_MASTER_TYPE + "/" + PathConstant.DETAIL;
    public static CS_MASTER = "Master";
    public static CS_MASTER_DETAIL = PathConstant.CS_MASTER + "/" + PathConstant.DETAIL;
    public static CS_GEN_SETTING = "GeneralSetting";
    public static CS_GEN_SETTING_DETAIL = PathConstant.CS_GEN_SETTING + "/" + PathConstant.DETAIL;
    public static CS_GEN_SETTING_ADMIN = "GeneralSettingAdmin";
    public static CS_GEN_SETTING_DETAIL_ADMIN = PathConstant.CS_GEN_SETTING_ADMIN + "/" + PathConstant.DETAIL;
    public static CS_CURRENCY = "Currency";
    public static CS_CURRENCY_PAGING = PathConstant.CS_CURRENCY + "/" + PathConstant.PAGING;
    public static CS_CURRENCY_ADD = PathConstant.CS_CURRENCY + "/" + PathConstant.ADD;
    public static CS_EXCHANGE_RATE = "ExchangeRate";
    public static CS_EXCHANGE_RATE_PAGING = PathConstant.CS_EXCHANGE_RATE + "/" + PathConstant.PAGING;
    public static CS_EXCHANGE_RATE_DETAIL = PathConstant.CS_EXCHANGE_RATE + "/" + PathConstant.DETAIL;
    public static CS_WORKING_HOUR = "WorkingHour";
    public static CS_WORKING_HOUR_ADD = PathConstant.CS_WORKING_HOUR + "/" + PathConstant.ADD;
    public static CS_WORKING_HOUR_DETAIL = PathConstant.CS_WORKING_HOUR + "/" + PathConstant.DETAIL;
    public static CS_HOLIDAY = "Holiday";
    public static CS_HOLIDAY_ADD = PathConstant.CS_HOLIDAY + "/" + PathConstant.ADD;
    public static CS_HOLIDAY_EDIT = PathConstant.CS_HOLIDAY + "/" + PathConstant.EDIT;
    public static CS_HOLIDAY_DETAIL = PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL;
    public static CS_HOLIDAY_DETAIL_ADD = PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL + "/" + PathConstant.ADD;
    public static CS_HOLIDAY_DETAIL_EDIT = PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL  + "/" + PathConstant.EDIT;
    public static CS_PROJECT = "Project";
    public static CS_OFFICE_ZIPCODE_MBR = "OfficeZipcodeMember";
    public static CS_OFFICE_ZIPCODE_MBR_PAGING = PathConstant.CS_OFFICE_ZIPCODE_MBR + "/" + PathConstant.PAGING;
    public static CS_OFFICE_ZIPCODE_MBR_ADD = PathConstant.CS_OFFICE_ZIPCODE_MBR + "/" + PathConstant.ADD;
    public static CS_ECONOMIC_SECTOR = "EconomicSector";
    public static CS_ECONOMIC_SECTOR_PAGING = PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstant.PAGING;
    public static CS_ECONOMIC_SECTOR_DETAIL = PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstant.DETAIL;
    public static CS_REF_PROVINCE = "RefProvince";
    public static CS_REF_PROVINCE_PAGING = PathConstant.CS_REF_PROVINCE + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_CS_REF_PROVINCE_PAGING = this.SELF_CUSTOM + "/" + PathConstant.CS_REF_PROVINCE + "/" + PathConstant.PAGING;
    public static CS_REF_PROVINCE_DETAIL = PathConstant.CS_REF_PROVINCE + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_CS_REF_PROVINCE_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.CS_REF_PROVINCE + "/" + PathConstant.DETAIL;
    public static CS_DISTRICT = "District";
    public static CS_DISTRICT_PAGING = PathConstant.CS_DISTRICT + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_CS_DISTRICT_PAGING = this.SELF_CUSTOM + "/" + PathConstant.CS_DISTRICT + "/" + PathConstant.PAGING;
    public static CS_DISTRICT_DETAIL = PathConstant.CS_DISTRICT + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_CS_DISTRICT_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.CS_DISTRICT + "/" + PathConstant.DETAIL;
    public static CS_REF_STATUS = "RefStatus";
    public static CS_REF_STATUS_PAGING = PathConstant.CS_REF_STATUS + "/" + PathConstant.PAGING;
    public static CS_PROFESSION = "Profession";
    public static CS_PROFESSION_PAGING = PathConstant.CS_PROFESSION + "/" + PathConstant.PAGING;
    public static CS_PROFESSION_DETAIL = PathConstant.CS_PROFESSION + "/" + PathConstant.DETAIL;
    public static CS_INDUSTRY_TYPE = "IndustryType";
    public static CS_INDUSTRY_TYPE_PAGING = PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstant.PAGING;
    public static CS_INDUSTRY_TYPE_DETAIL = PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstant.DETAIL;
    public static CS_INDUSTRY_TYPE_CAT = "IndustryTypeCategory";
    public static CS_INDUSTRY_TYPE_CAT_PAGING = PathConstant.CS_INDUSTRY_TYPE_CAT + "/" + PathConstant.PAGING;
    public static CS_INDUSTRY_TYPE_CAT_DETAIL = PathConstant.CS_INDUSTRY_TYPE_CAT + "/" + PathConstant.DETAIL;
    public static CS_BANK = "Bank";
    public static CS_BANK_PAGING = PathConstant.CS_BANK + "/" + PathConstant.PAGING;
    public static CS_BANK_DETAIL = PathConstant.CS_BANK + "/" + PathConstant.DETAIL;
    public static CS_OFFICE_BANK_ACCOUNT_PAGING = PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstant.PAGING;
    public static CS_OFFICE_BANK_ACCOUNT_DETAIL = PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstant.DETAIL;
    public static CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL = PathConstant.LR_OFFICE_BANK_ACC + "/AccDetail";
    public static CS_ZIPCODE = "Zipcode";
    public static CS_ZIPCODE_PAGING = PathConstant.CS_ZIPCODE + "/" + PathConstant.PAGING;
    public static CS_ZIPCODE_DETAIL = PathConstant.CS_ZIPCODE + "/" + PathConstant.DETAIL;
    public static CS_SCORE_CATEGORY = "ScoreCategory";
    public static CS_SCORE_CATEGORY_PAGING = PathConstant.CS_SCORE_CATEGORY + "/" + PathConstant.PAGING;
    public static CS_SCORE_CATEGORY_TYPE = PathConstant.CS_SCORE_CATEGORY + "/" + PathConstant.TYPE;
    public static CS_SCORE_CATEGORY_SCORE = PathConstant.CS_SCORE_CATEGORY + "/Score";
    public static CS_REASON = "Reason";
    public static CS_REASON_PAGING = PathConstant.CS_REASON + "/" + PathConstant.PAGING;
    public static CS_REASON_DETAIL = PathConstant.CS_REASON + "/" + PathConstant.DETAIL;
    public static CS_PAYMENT_ALLOC = "PaymentAlloc";
    public static CS_PAYMENT_ALLOC_PAGING = PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstant.PAGING;
    public static CS_PAYMENT_ALLOC_DETAIL = PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstant.DETAIL;
    public static CS_PAYMENT_ALLOC_GRP = "PaymentAllocGrp";
    public static CS_PAYMENT_ALLOC_GRP_PAGING = PathConstant.CS_PAYMENT_ALLOC_GRP + "/" + PathConstant.PAGING;
    public static CS_PAYMENT_ALLOC_GRP_DETAIL = PathConstant.CS_PAYMENT_ALLOC_GRP + "/" + PathConstant.DETAIL;
    public static CS_PAYMENT_ALLOC_GRP_H = "PaymentAllocGrpH";
    public static CS_PAYMENT_ALLOC_GRP_H_PAGING = PathConstant.CS_PAYMENT_ALLOC_GRP_H + "/" + PathConstant.PAGING;
    public static CS_PAYMENT_ALLOC_GRP_H_DETAIL = PathConstant.CS_PAYMENT_ALLOC_GRP_H + "/" + PathConstant.DETAIL;
    public static CS_PAYMENT_ALLOC_GRP_D = "PaymentAllocGrpD";
    public static CS_PAYMENT_ALLOC_GRP_D_PAGING = PathConstant.CS_PAYMENT_ALLOC_GRP_D + "/" + PathConstant.PAGING;
    public static CS_PAYMENT_ALLOC_GRP_D_DETAIL = PathConstant.CS_PAYMENT_ALLOC_GRP_D + "/" + PathConstant.DETAIL;
    public static CS_COA = "Coa";
    public static CS_COA_PAGING = PathConstant.CS_COA + "/" + PathConstant.PAGING;
    public static CS_COA_DETAIL = PathConstant.CS_COA + "/" + PathConstant.DETAIL;
    public static CS_COA_DETAIL_EDIT = PathConstant.CS_COA + "/" + PathConstant.DETAIL + "/" + PathConstant.EDIT;
    public static CS_COA_SCHM = "CoaScheme";
    public static CS_COA_SCHM_PAGING = PathConstant.CS_COA_SCHM + "/" + PathConstant.PAGING;
    public static CS_COA_SCHM_DETAIL = PathConstant.CS_COA_SCHM + "/" + PathConstant.DETAIL;
    public static CS_COA_SCHM_VIEW = PathConstant.CS_COA_SCHM + "/" + PathConstant.VIEW;
    public static CS_REF_TC = "RefTc";
    public static CS_REF_TC_PAGING = PathConstant.CS_REF_TC + "/" + PathConstant.PAGING;
    public static CS_REF_TC_DETAIL = PathConstant.CS_REF_TC + "/" + PathConstant.DETAIL;
    public static CS_REF_TAX_OFFICE = "TaxOffice";
    public static CS_REF_TAX_OFFICE_PAGING = PathConstant.CS_REF_TAX_OFFICE + "/" + PathConstant.PAGING;
    public static CS_REF_TAX_OFFICE_DETAIL = PathConstant.CS_REF_TAX_OFFICE + "/" + PathConstant.DETAIL;
    public static CS_REF_INS_CLAIM_DOC = "RefInsClaimDoc";
    public static CS_REF_INS_CLAIM_DOC_PAGING = PathConstant.CS_REF_INS_CLAIM_DOC + "/" + PathConstant.PAGING;
    public static CS_REF_INS_CLAIM_DOC_DETAIL = PathConstant.CS_REF_INS_CLAIM_DOC + "/" + PathConstant.DETAIL;
    
    public static CS_SELF_CUSTOM_HOLIDAY = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_HOLIDAY;
    public static CS_SELF_CUSTOM_HOLIDAY_ADD_EDIT = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_HOLIDAY + "/" + PathConstant.ADD_EDIT;
    public static CS_SELF_CUSTOM_HOLIDAY_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL;
    public static CS_SELF_CUSTOM_HOLIDAY_DETAIL_ADD_EDIT = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_HOLIDAY + "/" + PathConstant.DETAIL + "/" + PathConstant.ADD_EDIT;
    public static CS_SELF_CUSTOM_WORKING_HOUR = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_WORKING_HOUR;
    public static CS_SELF_CUSTOM_WORKING_HOUR_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_WORKING_HOUR + "/" + PathConstant.ADD;
    public static CS_SELF_CUSTOM_WORKING_HOUR_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_WORKING_HOUR + "/" + PathConstant.DETAIL;
    public static CS_SELF_CUSTOM_PROJECT = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PROJECT;
    public static CS_SELF_CUSTOM_PROJECT_ADD_EDIT = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PROJECT + "/" + PathConstant.ADD_EDIT;

    public static CS_CUSTOM_ECONOMIC_SECTOR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstant.PAGING;
    public static CS_CUSTOM_ECONOMIC_SECTOR_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstant.DETAIL;
    public static CS_CUSTOM_MASTER_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_MASTER + "/" + PathConstant.PAGING;
    public static CS_CUSTOM_MASTER_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_MASTER + "/" + PathConstant.DETAIL;
    public static CS_CUSTOM_INDUSTRY_TYPE_CAT_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_INDUSTRY_TYPE_CAT + "/" + PathConstant.PAGING;
    public static CS_CUSTOM_INDUSTRY_TYPE_CAT_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_INDUSTRY_TYPE_CAT + "/" + PathConstant.DETAIL;
    public static CS_CUSTOM_INDUSTRY_TYPE_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstant.PAGING;
    public static CS_CUSTOM_INDUSTRY_TYPE_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstant.DETAIL;
    public static CS_CUSTOM_PROFESSION_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PROFESSION + "/" + PathConstant.PAGING;
    public static CS_CUSTOM_PROFESSION_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PROFESSION + "/" + PathConstant.DETAIL;
    public static CS_CUSTOM_PAYMENT_ALLOC_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstant.PAGING;
    public static CS_CUSTOM_PAYMENT_ALLOC_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstant.DETAIL;
    
    public static CS_REF_AMRTZ_ITEM = "RefAmrtzItem";
    public static CS_REF_AMRTZ_ITEM_PAGING = PathConstant.CS_REF_AMRTZ_ITEM + "/" + PathConstant.PAGING;
    public static CS_REF_AMRTZ_ITEM_DETAIL = PathConstant.CS_REF_AMRTZ_ITEM + "/" + PathConstant.DETAIL;
    public static CS_REF_TRX_TYPE = "RefTrxType";
    public static CS_REF_TRX_TYPE_PAGING = PathConstant.CS_REF_TRX_TYPE + "/" + PathConstant.PAGING;
    public static CS_REF_TRX_TYPE_DETAIL = PathConstant.CS_REF_TRX_TYPE + "/" + PathConstant.DETAIL;

    public static CS_MASKING = "MaskingData";
    public static CS_MASKING_PAGING = PathConstant.CS_MASKING + "/" + PathConstant.PAGING;
    public static CS_MASKING_DETAIL = PathConstant.CS_MASKING + "/" + PathConstant.DETAIL;    
    public static CS_MASKING_WHITELIST = PathConstant.CS_MASKING + "/WhitelistRole";
    public static CS_MASKING_WHITELIST_DETAIL = PathConstant.CS_MASKING + "/WhitelistRoleDetail";
    public static CS_MASKING_WHITELIST_EDIT = PathConstant.CS_MASKING + "/WhitelistRoleEdit";

    public static CUSTOM_CS_GEN_SETTING = PathConstant.SELF_CUSTOM + "/" + "GeneralSetting";
    public static CUSTOM_CS_GEN_SETTING_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_GEN_SETTING + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_BANK_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_BANK + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_BANK_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_BANK + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_REF_TC_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REF_TC + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_REF_TC_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REF_TC + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_REF_INS_CLAIM_DOC_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REF_INS_CLAIM_DOC + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_REF_INS_CLAIM_DOC_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REF_INS_CLAIM_DOC + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_REF_TAX_OFFICE_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REF_TAX_OFFICE + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_REF_TAX_OFFICE_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REF_TAX_OFFICE + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_ZIPCODE_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_ZIPCODE + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_ZIPCODE_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_ZIPCODE + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_CURRENCY_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_CURRENCY + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_CURRENCY_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_CURRENCY + "/" + PathConstant.ADD;
    public static CUSTOM_CS_COA_SCHM_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_COA_SCHM + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_COA_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_COA + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_OFFICE_BANK_ACCOUNT_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstant.PAGING;
    public static CUSTOM_CS_OFFICE_BANK_ACCOUNT_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.LR_OFFICE_BANK_ACC + "/AccDetail";
    public static CUSTOM_CS_COA_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_COA + "/" + PathConstant.DETAIL;
    public static CUSTOM_CS_COA_DETAIL_EDIT = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_COA + "/" + PathConstant.DETAIL + "/" + PathConstant.EDIT;
    public static CUSTOM_CS_COA_SCHM_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_COA_SCHM + "/" + PathConstant.DETAIL;

    //#endregion
    
    //#region Cust
    public static CUST_COY = "CustomerCompany";
    public static CUST_PERSONAL = "CustomerPersonal";
    public static CUST_MAIN_INFO = "MainInfo";
    public static CUST_DUP_CHECK = "DuplicateCheck";
    public static CUST_PAGE = "Page";
    public static CUST_ADDR = "Address";
    public static CUST_FORM = "Form";
    public static CUST_JOB_DATA = "JobData";
    public static CUST_NON_PRO = "NonPro";
    public static BENEFICIARY_OWNER = "BeneficiaryOwner";
    public static CUST_PERSONAL_MAIN_INFO = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_MAIN_INFO;
    public static CUST_PERSONAL_DUP_CHECK = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_DUP_CHECK;
    public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_PAGE;
    public static CUST_PERSONAL_ADDR = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_ADDR;
    public static CUST_PERSONAL_ADDR_FORM = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_ADDR + "/" + PathConstant.CUST_FORM;
    public static CUST_PERSONAL_JOB_DATA = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_JOB_DATA;
    public static CUST_PERSONAL_JOB_DATA_NON_PRO = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_JOB_DATA + "/" + PathConstant.CUST_NON_PRO;
    public static CUST_COY_MAIN_INFO = PathConstant.CUST_COY + "/" + PathConstant.CUST_MAIN_INFO;
    public static CUST_COY_DUP_CHECK = PathConstant.CUST_COY + "/" + PathConstant.CUST_DUP_CHECK;
    public static CUST_COY_PAGE = PathConstant.CUST_COY + "/" + PathConstant.CUST_PAGE;
    public static CUST_COY_ADDR = PathConstant.CUST_COY + "/" + PathConstant.CUST_ADDR;
    public static CUST_COY_ADDR_FORM = PathConstant.CUST_COY + "/" + PathConstant.CUST_ADDR + "/" + PathConstant.CUST_FORM;
    public static CUST_EDIT_MAIN_DATA = "EditMainData";
    public static CUST_EDIT_MAIN_DATA_PAGING = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.PAGING;
    public static CUST_EDIT_MAIN_DATA_PERSONAL = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.PERSONAL;
    public static CUST_EDIT_MAIN_DATA_COY = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.COY;
    public static CUST_FAMILY = "CustFamily";
    public static CUST_FAMILY_PAGING = PathConstant.CUST_FAMILY + "/" + PathConstant.PAGING;
    public static CUST_SHRHLDR = "CustShareholder";
    public static CUST_SHRHLDR_PAGING = PathConstant.CUST_SHRHLDR + "/" + PathConstant.PAGING;
    public static CUST_GUARANTOR = "CustGuarantor";
    public static CUST_GUARANTOR_PAGING = PathConstant.CUST_GUARANTOR + "/" + PathConstant.PAGING;
    public static CUST_UPDATE_DATA = "UpdateDataCustomer";
    public static CUST_UPDATE_DATA_PAGING = PathConstant.CUST_UPDATE_DATA + "/" + PathConstant.PAGING;
    public static CUST_UPDATE_DATA_DETAIL = PathConstant.CUST_UPDATE_DATA + "/" + PathConstant.DETAIL;
    public static CUST_NEG = "NegativeCustomer";
    public static CUST_NEG_VIEW = PathConstant.CUST_NEG + "/" + PathConstant.VIEW;
    public static CUST_NEG_PAGING = PathConstant.CUST_NEG + "/" + PathConstant.PAGING;
    public static CUST_NEG_DETAIL = PathConstant.CUST_NEG + "/" + PathConstant.DETAIL;
    public static CUST_NEG_UPLOAD = PathConstant.CUST_NEG + "/" + PathConstant.UPLOAD;
    public static CUST_NEG_RVW_UPLOAD_PAGING = PathConstant.CUST_NEG + "/" + PathConstant.RVW_UPLOAD_PAGING;
    public static CUST_NEG_RVW_UPLOAD_DETAIL = PathConstant.CUST_NEG + "/" + PathConstant.RVW_UPLOAD_DETAIL;
    public static NEW_CUST = "NewCustomer";
    public static BOUWHEER = "Bouwheer";
    public static CUST_PEFINDO_REQ = "CustPefindoReq";

    public static SELF_CUSTOM_CUST_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_CUST_FAMILY_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CUST_FAMILY + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_CUST_SHRHLDR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CUST_SHRHLDR + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_NEW_CUST = PathConstant.SELF_CUSTOM + "/" + PathConstant.NEW_CUST;
    public static SELF_CUSTOM_CUST_PERSONAL_PAGE = PathConstant.SELF_CUSTOM + "/" + PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_PAGE;
    public static CUSTOM_CUST_NEG_PAGING = PathConstant.SELF_CUSTOM + PathConstant.CUST_NEG + "/" + PathConstant.PAGING;
    public static CUSTOM_CUST_NEG_PERSONAL_DETAIL = PathConstant.SELF_CUSTOM + PathConstant.CUST_NEG + PathConstant.PERSONAL + "/" + PathConstant.DETAIL;
    public static CUSTOM_UPLOAD_NEG_CUST = PathConstant.SELF_CUSTOM + PathConstant.CUST_NEG + "/" + PathConstant.UPLOAD;
    public static CUSTOM_CUST_NEG_RVW_UPLOAD_DETAIL = PathConstant.SELF_CUSTOM + PathConstant.CUST_NEG_RVW_UPLOAD_DETAIL;
    public static CUSTOM_CUST_NEG_RVW_UPLOAD_PAGING = PathConstant.SELF_CUSTOM + PathConstant.CUST_NEG_RVW_UPLOAD_PAGING;
    public static SELF_CUSTOM_CUST_UPDATE_DATA_PAGING = PathConstant.SELF_CUSTOM + PathConstant.CUST_UPDATE_DATA_PAGING;
    public static SELF_CUSTOM_CUST_UPDATE_DATA_DETAIL = PathConstant.SELF_CUSTOM + PathConstant.CUST_UPDATE_DATA_DETAIL;
    public static VIEW_PERSONAL = "ViewPersonal";
    public static VIEW_COMPANY = "ViewCompany";
    public static SELF_CUSTOM_CS_REASON_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REASON + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_CS_REASON_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_REASON + "/" + PathConstant.DETAIL;
    public static CUSTOM_CUST_COY_PAGE = PathConstant.SELF_CUSTOM + "/" + PathConstant.CUST_COY + "/" + PathConstant.CUST_PAGE;
    public static SELF_CUSTOM_CUSTOM_CUST_PERSONAL_DUPLICATE_CHECK = PathConstant.SELF_CUSTOM + "/" + "CustomerPersonalDuplicateChecking";
    public static SELF_CUSTOM_CUSTOM_CUST_COMPANY_DUPLICATE_CHECK = PathConstant.SELF_CUSTOM + "/" + "CustomerCompanyDuplicateChecking";
    public static SELF_CUSTOM_NEW_CUST_SHAREHOLDER = PathConstant.SELF_CUSTOM_NEW_CUST + "Shareholder"
    public static SELF_CUSTOM_BOUWHEER_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.BOUWHEER + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_BOUWHEER_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.BOUWHEER + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_BENEFICIARY_OWNER = PathConstant.SELF_CUSTOM + "/" + PathConstant.BENEFICIARY_OWNER;
    public static SELF_CUSTOM_BENEFICIARY_OWNER_ADD_EDIT = PathConstant.SELF_CUSTOM + "/" + PathConstant.BENEFICIARY_OWNER + "/" + PathConstant.ADD_EDIT;
    public static SELF_CUSTOM_BENEFICIARY_OWNER_PERSONAL_DUPLICATE_CHECK = PathConstant.SELF_CUSTOM + "/" + "BeneficiaryOwnerPersonalDuplicateChecking";
    public static SELF_CUSTOM_BENEFICIARY_OWNER_COMPANY_DUPLICATE_CHECK = PathConstant.SELF_CUSTOM + "/" + "BeneficiaryOwnerCompanyDuplicateChecking";
    //#endregion
    
    //#region Dashboard-Module
    public static DASHBOARD = "Dash-Board";
    public static DASHEMPTY = "Dash-Empty";
    //#endregion
    
    //#region Document-Management-Module
    public static CABINET = "Cabinet";
    public static CABINET_PAGING = PathConstant.CABINET + "/" + PathConstant.PAGING;
    public static CABINET_ADD_EDIT = PathConstant.CABINET + "/" + PathConstant.ADD_EDIT;
    public static RACK = "Rack";
    public static RACK_PAGING = PathConstant.RACK + "/" + PathConstant.PAGING;
    public static RACK_ADD_EDIT = PathConstant.RACK + "/" + PathConstant.ADD_EDIT;
    public static FILING = "Filing";
    public static FILING_PAGING = PathConstant.FILING + "/" + PathConstant.PAGING;
    public static FILING_ADD_EDIT = PathConstant.FILING + "/" + PathConstant.ADD_EDIT;
    public static VIEW_CABINET = "ViewCabinet";
    public static VIEW_RACK = "ViewRack";
    //#endregion

    //#region Employee-Module
    public static EMP_POS = "EmployeePosition";
    public static EMP_POS_DETAIL = PathConstant.EMP_POS + "/" + PathConstant.DETAIL;
    public static LEAVE = "Leave";
    public static LEAVE_PAGING = PathConstant.LEAVE + "/" + PathConstant.PAGING;
    public static LEAVE_ADD = PathConstant.LEAVE + "/" + PathConstant.ADD;
    public static LEAVE_EDIT = PathConstant.LEAVE + "/" + PathConstant.EDIT;
    public static EMP_BZ_UNIT = "EmployeeBusinessUnit";
    public static EMP_BZ_UNIT_PAGING = PathConstant.EMP_BZ_UNIT + "/" + PathConstant.PAGING;
    public static EMP_BZ_UNIT_ADD = PathConstant.EMP_BZ_UNIT + "/" + PathConstant.ADD;

    public static SELF_CUSTOM_EMP_BZ_UNIT_PAGING = PathConstant.SELF_CUSTOM + PathConstant.EMP_BZ_UNIT_PAGING;
    public static SELF_CUSTOM_EMP_BZ_UNIT_ADD = PathConstant.SELF_CUSTOM + PathConstant.EMP_BZ_UNIT_ADD;
    public static CUSTOM_LEAVE_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.LEAVE + "/" + PathConstant.PAGING;
    public static CUSTOM_LEAVE_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.LEAVE + "/" + PathConstant.DETAIL;
    //#endregion

    //#region Integration-Module
    public static SEND_DAILY_MASTER = "SendDailyMaster";
    //#endregion

    //#region Office-Module
    public static OFFICE_EMP_POS = "OfficeEmpPos";
    public static OFFICE_EMP_POS_ADD = "OfficeEmpPosAdd";
    public static OFFICE_EMP_VIEW = "OfficeEmpView";
    public static OFFICE_AREA = "OfficeArea";
    public static OFFICE_AREA_DETAIL = PathConstant.OFFICE_AREA + "/" + PathConstant.DETAIL;
    public static OFFICE_AREA_MEMBER = PathConstant.OFFICE_AREA + "/" + PathConstant.MEMBER;
    public static OFFICE_AREA_MEMBER_ADD = PathConstant.OFFICE_AREA + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static OFFICE_GROUP_MEMBER = PathConstant.GROUP + "/" + PathConstant.MEMBER;
    public static OFFICE_GROUP_MEMBER_ADD = PathConstant.GROUP + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;

    public static SELF_CUSTOM_OFFICE_AREA = PathConstant.SELF_CUSTOM + PathConstant.OFFICE_AREA;
    public static SELF_CUSTOM_OFFICE_AREA_MEMBER = PathConstant.SELF_CUSTOM + PathConstant.OFFICE_AREA_MEMBER;
    public static SELF_CUSTOM_OFFICE_AREA_MEMBER_ADD = PathConstant.SELF_CUSTOM + PathConstant.OFFICE_AREA_MEMBER_ADD;
    public static SELF_CUSTOM_OFFICE_AREA_DETAIL = PathConstant.SELF_CUSTOM + PathConstant.OFFICE_AREA_DETAIL;
    public static CUSTOM_OFFICE_EMP_VIEW = PathConstant.SELF_CUSTOM + "/" + "OfficeEmpView";
    public static CUSTOM_OFFICE_GROUP_MEMBER = PathConstant.SELF_CUSTOM + "/" + PathConstant.GROUP + "/" + PathConstant.MEMBER;
    public static CUSTOM_OFFICE_GROUP_MEMBER_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.GROUP + "/" + PathConstant.MEMBER + "/" + PathConstant.DETAIL;
    //#endregion

    //#region Organization-Module
    public static JOB_TITLE = "JobTitle";
    public static JOB_TITLE_DETAIL = PathConstant.JOB_TITLE + "/" + PathConstant.DETAIL;
    public static BZ_UNIT = "BusinessUnit";
    public static BZ_UNIT_DETAIL = PathConstant.BZ_UNIT + "/" + PathConstant.DETAIL;
    public static BZ_UNIT_EDIT = PathConstant.BZ_UNIT + "/" + PathConstant.EDIT;
    public static BZ_UNIT_MEMBER = PathConstant.BZ_UNIT + "/" + PathConstant.MEMBER;

    public static SELF_CUSTOM_BZ_UNIT = PathConstant.SELF_CUSTOM + PathConstant.BZ_UNIT;
    public static SELF_CUSTOM_BZ_UNIT_MEMBER = PathConstant.SELF_CUSTOM + PathConstant.BZ_UNIT_MEMBER;
    public static SELF_CUSTOM_BZ_UNIT_DETAIL = PathConstant.SELF_CUSTOM + PathConstant.BZ_UNIT_DETAIL;
    public static CUSTOM_JOB_TITLE_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.JOB_TITLE + "/" + PathConstant.PAGING;
    public static CUSTOM_JOB_TITLE_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.JOB_TITLE + "/" + PathConstant.DETAIL;
    //#endregion

    //#region Survey-Module
    public static SRVY_TASK = "SurveyTask";
    public static SRVY_ORDER = "SurveyOrder";
    public static SRVY_RESULT_REVIEW = "SurveyResultReview";
    public static SRVY_TASK_RESULT = "SurveyTaskResult";
    public static SRVY_TASK_PAGE = "Page";
    public static SRVY_TASK_PAGING = PathConstant.SRVY_TASK + "/" + PathConstant.PAGING;
    public static SRVY_ORDER_PAGING = PathConstant.SRVY_ORDER + "/" + PathConstant.PAGING;
    public static SRVY_VIEW_TASK = PathConstant.VIEW + "/" + PathConstant.SRVY_TASK;
    public static VIEW_ORDER_EXT = "ViewOrderExternal";
    public static SRVY_RESULT_REVIEW_PAGING = PathConstant.SRVY_RESULT_REVIEW + "/" + PathConstant.PAGING;
    public static SRVY_RESULT_REVIEW_DETAIL = PathConstant.SRVY_RESULT_REVIEW + "/" + PathConstant.DETAIL;
    public static SRVY_TASK_RESULT_PAGING = PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.PAGING;
    public static SRVY_TASK_RESULT_PAGE = PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.SRVY_TASK_PAGE;
    public static SRVY_TASK_RESULT_DETAIL = PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.DETAIL;

    public static CUSTOM_SRVY_TASK_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.SRVY_TASK + "/" + PathConstant.PAGING;
    public static CUSTOM_SRVY_ORDER_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.SRVY_ORDER + "/" + PathConstant.PAGING;
    public static CUSTOM_SRVY_RESULT_REVIEW_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.SRVY_RESULT_REVIEW + "/" + PathConstant.PAGING;
    public static CUSTOM_SRVY_RESULT_REVIEW_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.SRVY_RESULT_REVIEW + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_SRVY_TASK_RESULT_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_SRVY_TASK_RESULT_PAGE = PathConstant.SELF_CUSTOM + "/" + PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.SRVY_TASK_PAGE;
    //#endregion

    //#region
    public static SURVEYOR = "Surveyor";
    public static SURVEYOR_PAGING = PathConstant.SURVEYOR + "/" + PathConstant.PAGING
    public static SURVEYOR_ADD = PathConstant.SURVEYOR + "/" + PathConstant.ADD
    public static CUSTOM_SURVEYOR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.SURVEYOR + "/" + PathConstant.PAGING
    public static CUSTOM_SURVEYOR_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.SURVEYOR + "/" + PathConstant.DETAIL
    //#endregion

    //#region
    public static SURVEYOR_TASK_ASSIGNMENT = "SurveyTaskAssignment";
    public static SURVEYOR_TASK_ASSIGNMENT_PAGING = PathConstant.SURVEYOR_TASK_ASSIGNMENT + "/" + PathConstant.PAGING;
    public static SURVEYOR_TASK_ASSIGNMENT_DETAIL = PathConstant.SURVEYOR_TASK_ASSIGNMENT + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_SURVEYOR_TASK_ASSIGNMENT_PAGING = this.SELF_CUSTOM + "/" + PathConstant.SURVEYOR_TASK_ASSIGNMENT + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_SURVEYOR_TASK_ASSIGNMENT_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.SURVEYOR_TASK_ASSIGNMENT + "/" + PathConstant.DETAIL;
    //#endregion

    //#region System-Setting-Module
    public static NOTIF = "Notification";
    public static NOTIF_DETAIL = PathConstant.NOTIF + "/" + PathConstant.DETAIL;
    public static NOTIF_APPRV = "NotificationApproval";
    public static NOTIF_APPRV_DETAIL = PathConstant.NOTIF_APPRV + "/" + PathConstant.DETAIL;
    public static REF_USER = "RefUser";
    public static ROLE = "Role";
    public static ROLE_DETAIL = PathConstant.ROLE + "/" + PathConstant.DETAIL;
    public static USER_ROLE = "UserRole";
    public static ROLE_USER = "RoleUser";
    public static ROLE_FORM = "RoleForm";
    public static ROLE_FORM_ADD = PathConstant.ROLE_FORM + "/" + PathConstant.ADD;
    public static CHANGE_PASSWORD = "ChangePassword";
    public static REF_FORM = "RefForm";
    public static ROLE_MAP = "RoleMapping";
    public static FEATURE = "Feature";
    public static API = "Api";
    public static REF_FORM_PAGING = PathConstant.REF_FORM + "/" + PathConstant.PAGING;
    public static REF_FORM_DETAIL = PathConstant.REF_FORM + "/" + PathConstant.DETAIL;
    public static REF_FORM_ROLE_MAP = PathConstant.REF_FORM + "/" + PathConstant.ROLE_MAP;
    public static REF_FORM_ROLE_MAP_ADD = PathConstant.REF_FORM + "/" + PathConstant.ROLE_MAP + "/" + PathConstant.ADD;
    public static SYS_ATTR = "Attribute";
    public static SYS_ATTR_PAGING = PathConstant.SYS_ATTR + "/" + PathConstant.PAGING;
    public static SYS_ATTR_DETAIL = PathConstant.SYS_ATTR + "/" + PathConstant.DETAIL;

    public static CUSTOM_SYS_ATTR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.SYS_ATTR + "/" + PathConstant.PAGING;
    public static CUSTOM_SYS_ATTR_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.SYS_ATTR + "/" + PathConstant.DETAIL;
    public static CUSTOM_ROLE_PAGING = PathConstant.SELF_CUSTOM + "/" + "Role" + "/" + PathConstant.PAGING;
    public static CUSTOM_ROLE_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ROLE + "/" + PathConstant.DETAIL;
    public static CUSTOM_ROLE_FORM_PAGING = PathConstant.SELF_CUSTOM + "/" + "RoleForm" + "/" + PathConstant.PAGING;
    public static CUSTOM_ROLE_FORM_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.ROLE_FORM + "/" + PathConstant.DETAIL;
    public static CUSTOM_ROLE_FORM_FEATURE = PathConstant.SELF_CUSTOM + "/" + PathConstant.ROLE_FORM + "/" + PathConstant.FEATURE;
    public static CUSTOM_REF_FORM_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.PAGING;
    public static CUSTOM_REF_FORM_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.DETAIL;
    public static CUSTOM_REF_FORM_ROLE_MAP_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.ROLE_MAP + "/" + PathConstant.PAGING;
    public static CUSTOM_REF_FORM_ROLE_MAP_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.ROLE_MAP + "/" + PathConstant.DETAIL;
    public static CUSTOM_REF_FORM_API_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.API + "/" + PathConstant.PAGING;
    public static CUSTOM_REF_FORM_API_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.API + "/" + PathConstant.DETAIL;
    public static CUSTOM_REF_FORM_API_FEATURE = PathConstant.SELF_CUSTOM + "/" + PathConstant.REF_FORM + "/" + PathConstant.API + "/" + PathConstant.FEATURE;
    //#endregion

    //#region Upload-Module
    public static UPLOAD_MONITORING_PAGING = "UploadMonitoringPaging";
    public static UPLOAD_SETTING_PAGING = "UploadSettingPaging";
    public static UPLOAD_SETTING_EDIT = "UploadSettingEdit";
    //#endregion

    //#region Vendor-Module
    public static VENDOR_REG = "Registration";
    public static VENDOR_EMP = "Employee";
    public static VENDOR_LIST = "List";
    public static VENDOR_BRANCH = "Branch";
    public static VENDOR_COLL_COMPANY = "CollectionCompany";
    public static VENDOR_BRANCH_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.PAGING;
    public static VENDOR_BRANCH_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstant.ADD;
    public static VENDOR_BRANCH_REG = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_BRANCH_EMP_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.PAGING;
    public static VENDOR_BRANCH_EMP_DETAIL = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.DETAIL;
    public static VENDOR_BRANCH_MBR_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstant.PAGING;
    public static VENDOR_BRANCH_MBR_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static VENDOR_COLL_COMPANY_ADD = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.ADD;
    public static VENDOR_COLL_COMPANY_REG = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_COLL_COMPANY_EMP_PAGING = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.PAGING;
    public static VENDOR_COLL_COMPANY_EMP_DETAIL = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.DETAIL;
    public static VENDOR_COLL_COMPANY_MBR_PAGING = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.MEMBER + "/" + PathConstant.PAGING;
    public static VENDOR_COLL_COMPANY_MBR_ADD = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static VENDOR_COLL_COMPANY_VIEW = PathConstant.VENDOR_COLL_COMPANY + "/" + PathConstant.VIEW;
    public static VENDOR_CONTACT_PERSON = "ContactPerson";
    public static VENDOR_CONTACT_PERSON_ADD = PathConstant.VENDOR_CONTACT_PERSON + "/" + PathConstant.ADD;
    public static VENDOR_CONTACT_PERSON_EDIT = PathConstant.VENDOR_CONTACT_PERSON + "/" + PathConstant.EDIT;
    public static VENDOR_CONTACT_PERSON_LIST = PathConstant.VENDOR_CONTACT_PERSON + "/" + PathConstant.VENDOR_LIST;
    public static VENDOR_HOLDING = "Holding";
    public static VENDOR_HOLDING_PAGING = PathConstant.VENDOR_HOLDING + "/" + PathConstant.PAGING;
    public static VENDOR_HOLDING_DETAIL = PathConstant.VENDOR_HOLDING + "/" + PathConstant.DETAIL;
    public static VENDOR_HOLDING_REG = PathConstant.VENDOR_HOLDING + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_GRP_PAGING = PathConstant.GROUP + "/" + PathConstant.PAGING;
    public static VENDOR_GRP_ADD = PathConstant.GROUP + "/" + PathConstant.ADD;
    public static VENDOR_GRP_VIEW = PathConstant.GROUP + "/" + PathConstant.VIEW;
    public static VENDOR_GRP_MBR = "GroupMbr";
    public static VENDOR_GRP_MBR_ADD = PathConstant.VENDOR_GRP_MBR + "/" + PathConstant.ADD;
    public static VENDOR_SCHM = "VendorScheme";
    public static VENDOR_SCHM_PAGING = PathConstant.VENDOR_SCHM + "/" + PathConstant.PAGING;
    public static VENDOR_SCHM_DETAIL = PathConstant.VENDOR_SCHM + "/" + PathConstant.DETAIL;
    public static VENDOR_SCHM_MBR = PathConstant.VENDOR_SCHM + "/" + PathConstant.MEMBER;
    public static VENDOR_SCHM_MBR_ADD = PathConstant.VENDOR_SCHM + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static VENDOR_HO = "HO";
    public static VENDOR_HO_PAGING = PathConstant.VENDOR_HO + "/" + PathConstant.PAGING;
    public static VENDOR_HO_DETAIL = PathConstant.VENDOR_HO + "/" + PathConstant.DETAIL;
    public static VENDOR_HO_REG = PathConstant.VENDOR_HO + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_FUNDING_COY = "FundingCompany";
    public static VENDOR_CREDIT_INS = "creditinsurance"
    public static VENDOR_FUNDING_COY_PAGING = PathConstant.VENDOR_FUNDING_COY + "/" + PathConstant.PAGING; //FundingCompany/Paging
    public static VENDOR_FUNDING_COY_ADD_EDIT = PathConstant.VENDOR_FUNDING_COY + "/" + PathConstant.ADD_EDIT; //FundingCompany/AddEDit
    public static VENDOR_FUNDING_COY_VIEW = PathConstant.VENDOR_FUNDING_COY + "/" + PathConstant.VIEW;
    public static VENDOR_CREDIT_INS_PAGING = PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.PAGING;
    public static VENDOR_CREDIT_INS_BRANCH_PAGING = PathConstant.VENDOR_CREDIT_INS  + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.PAGING
    public static VENDOR_CREDIT_INS_BRANCH_ADD_EDIT = PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.ADD_EDIT
    public static VENDOR_CREDIT_INS_GROUP_PAGING= PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.GROUP + "/" + PathConstant.PAGING
    public static VENDOR_CREDIT_INS_GROUP_ADD_EDIT= PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.GROUP + "/" + PathConstant.ADD_EDIT
    public static VENDOR_CREDIT_INS_ADD = PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.ADD
    public static VENDOR_ATPM = "ATPM";
    public static VENDOR_ATPM_DETAIL = PathConstant.VENDOR_ATPM + "/" + PathConstant.DETAIL;
    public static VENDOR_ATPM_REG = PathConstant.VENDOR_ATPM + "/" + PathConstant.VENDOR_REG;
    public static VENDOR_GRADING = "VendorGrading";
    public static REQUEST = "Request";
    public static VENDOR_GRADING_REQUEST_PAGING = PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstant.PAGING;
    public static VENDOR_GRADING_REQUEST_APPROVAL_DETAIL = PathConstant.VENDOR_GRADING + "/" + PathConstant.APPRV + "/" + PathConstant.DETAIL;

    public static CUSTOM_VENDOR_GRADING_INQUIRY = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_GRADING + "/" + PathConstant.INQUIRY;
    public static CUSTOM_VENDOR_GRADING_REQUEST_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstant.PAGING;
    public static CUSTOM_VENDOR_GRADING_REQUEST_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstant.DETAIL;
    public static CUSTOM_VENDOR_GRADING_APPROVAL_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_GRADING + "/" + PathConstant.APPRV + "/" + PathConstant.PAGING;
    public static CUSTOM_VENDOR_GRADING_APPROVAL_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_GRADING + "/" + PathConstant.APPRV + "/" + PathConstant.DETAIL;

    public static SELF_CUSTOM_VENDOR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_VENDOR_HOLDING_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_HOLDING_DETAIL;
    public static SELF_CUSTOM_VENDOR_HO_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_HO_DETAIL;
    public static SELF_CUSTOM_VENDOR_ATPM_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_ATPM + "/" + PathConstant.DETAIL;
    public static SELF_CUSTOM_VENDOR_BRANCH_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH_ADD;
    public static SELF_CUSTOM_VENDOR_SCHM_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_SCHM_DETAIL;
    public static SELF_CUSTOM_VENDOR_SCHM_MBR = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_SCHM + "/" + PathConstant.MEMBER;
    public static SELF_CUSTOM_VENDOR_SCHM_MBR_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_SCHM + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_VENDOR_GRP_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.GROUP + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_VENDOR_GRP_VIEW = PathConstant.SELF_CUSTOM + "/" + PathConstant.GROUP + "/" + PathConstant.VIEW;
    public static SELF_CUSTOM_VENDOR_GRP_MBR_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_GRP_MBR + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_VENDOR_HOLDING_REG = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_HOLDING + "/" + PathConstant.VENDOR_REG;
    public static SELF_CUSTOM_VENDOR_HO_REG = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_HO + "/" + PathConstant.VENDOR_REG;
    public static SELF_CUSTOM_VENDOR_ATPM_REG = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_ATPM + "/" + PathConstant.VENDOR_REG;
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_ADD = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_VENDOR_BRANCH_EMP_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_VENDOR_BRANCH_EMP_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.DETAIL;
    public static CUSTOM_VENDOR_BRANCH_REG = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_REG;
    public static SELF_CUSTOM_VENDOR_BRANCH_DETAIL = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.DETAIL;
    public static CUSTOM_VENDOR_FUNDING_COY_PAGING = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_FUNDING_COY + "/" + PathConstant.PAGING;
    public static CUSTOM_VENDOR_FUNDING_COY_ADD_EDIT = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_FUNDING_COY + "/" + PathConstant.ADD_EDIT;
    //#endregion

    //#region Verif-Module
    public static QA = "QuestionAnswer";
    public static QA_PAGING = PathConstant.QA + "/" + PathConstant.PAGING;
    public static QA_ADD = PathConstant.QA + "/" + PathConstant.ADD;
    public static QA_EDIT = PathConstant.QA + "/" + PathConstant.EDIT;
    public static QA_GRP = "QuestionGroup";
    public static QA_GRP_PAGING = PathConstant.QA_GRP + "/" + PathConstant.PAGING;
    public static QA_GRP_ADD = PathConstant.QA_GRP + "/" + PathConstant.ADD;
    public static QA_GRP_EDIT = PathConstant.QA_GRP + "/" + PathConstant.EDIT;
    public static QA_GRP_MBR = "QuestionGroupMember";
    public static QA_GRP_MBR_PAGING = PathConstant.QA_GRP_MBR + "/" + PathConstant.PAGING;
    public static QA_GRP_MBR_ADD = PathConstant.QA_GRP_MBR + "/" + PathConstant.ADD;
    public static QA_GRP_MBR_EDIT = PathConstant.QA_GRP_MBR + "/" + PathConstant.EDIT;
    public static QA_SCHM = "QuestionScheme";
    public static QA_SCHM_PAGING = PathConstant.QA_SCHM + "/" + PathConstant.PAGING;
    public static QA_SCHM_ADD = PathConstant.QA_SCHM + "/" + PathConstant.ADD;
    public static QA_SCHM_EDIT = PathConstant.QA_SCHM + "/" + PathConstant.EDIT;
    public static QA_SCHM_MBR = "QuestionSchemeMember";
    public static QA_SCHM_MBR_PAGING = PathConstant.QA_SCHM_MBR + "/" + PathConstant.PAGING;
    public static QA_SCHM_MBR_ADD = PathConstant.QA_SCHM_MBR + "/" + PathConstant.ADD;
    public static QA_SCHM_MBR_EDIT = PathConstant.QA_SCHM_MBR + "/" + PathConstant.EDIT;

    public static SELF_CUSTOM_QA_PAGING = this.SELF_CUSTOM + "/" + PathConstant.QA + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_QA_ADD = this.SELF_CUSTOM + "/" + PathConstant.QA + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_QA_EDIT = this.SELF_CUSTOM + "/" + PathConstant.QA + "/" + PathConstant.EDIT;
    public static SELF_CUSTOM_QA_GRP_PAGING = this.SELF_CUSTOM + "/" + PathConstant.QA_GRP + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_QA_GRP_ADD = this.SELF_CUSTOM + "/" + PathConstant.QA_GRP + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_QA_GRP_EDIT = this.SELF_CUSTOM + "/" + PathConstant.QA_GRP + "/" + PathConstant.EDIT;
    public static SELF_CUSTOM_QA_GRP_MBR_PAGING = this.SELF_CUSTOM + "/" + PathConstant.QA_GRP_MBR + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_QA_GRP_MBR_ADD = this.SELF_CUSTOM + "/" + PathConstant.QA_GRP_MBR + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_QA_GRP_MBR_EDIT = this.SELF_CUSTOM + "/" + PathConstant.QA_GRP_MBR + "/" + PathConstant.EDIT;
    public static SELF_CUSTOM_QA_SCHM_PAGING = this.SELF_CUSTOM + "/" + PathConstant.QA_SCHM + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_QA_SCHM_ADD = this.SELF_CUSTOM + "/" + PathConstant.QA_SCHM + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_QA_SCHM_EDIT = this.SELF_CUSTOM + "/" + PathConstant.QA_SCHM + "/" + PathConstant.EDIT;
    public static SELF_CUSTOM_QA_SCHM_MBR_PAGING = this.SELF_CUSTOM + "/" + PathConstant.QA_SCHM_MBR + "/" + PathConstant.PAGING;
    public static SELF_CUSTOM_QA_SCHM_MBR_ADD = this.SELF_CUSTOM + "/" + PathConstant.QA_SCHM_MBR + "/" + PathConstant.ADD;
    public static SELF_CUSTOM_QA_SCHM_MBR_EDIT = this.SELF_CUSTOM + "/" + PathConstant.QA_SCHM_MBR + "/" + PathConstant.EDIT;
    //#endregion

    //#region View-Module
    public static VIEW_CUST = "Customer";
    public static VIEW_VENDOR = "Vendor";
    public static VIEW_NEG_CUST = "NegativeCustomer";
    public static VIEW_SRVY = "Survey";
    public static VIEW_CUST_EXPSR = "CustExposureView";
    public static VIEW_SRVY_TASK = "SurveyTask";
    public static VIEW_PEFINDO = "Pefindo";
    public static CUSTOM_VIEW_NEG_CUST = PathConstant.SELF_CUSTOM + "/" + PathConstant.VIEW_NEG_CUST;
    public static SELF_CUSTOM_VIEW_CUST = "SelfCustomCustomer";
    public static CUSTOM_VIEW_NEG_CUST_PERSONAL = "SelfCustomNegativeCustomerViewPersonalComponent"
    public static SELF_CUSTOM_VIEW_PEFINDO = "SelfCustomPefindo";
    //#endregion

    //#region View-Vendor-Module
    public static VIEW_VENDOR_BRANCH = "VendorBranch";
    public static VIEW_VENDOR_HOLDING = "VendorHolding";
    public static VIEW_VENDOR_HO = "VendorHO";
    public static VIEW_VENDOR_COLL_COMPANY = "VendorCollCompany";
    public static VIEW_FUNDING_COMPANY = "FundingCompany";

    public static SELF_CUSTOM_VIEW_VENDOR_COLL_COMPANY = PathConstant.SELF_CUSTOM + PathConstant.VIEW_VENDOR_COLL_COMPANY;
    public static SELF_CUSTOM_VIEW_VENDOR_HOLDING = PathConstant.SELF_CUSTOM + "/" + "VendorHolding";
    public static SELF_CUSTOM_VIEW_VENDOR_HO = PathConstant.SELF_CUSTOM + "/" + "VendorHO";
    public static SELF_CUSTOM_VIEW_VENDOR_BRANCH = PathConstant.SELF_CUSTOM + "/" + "VendorBranch";
    //#endregion

    //#region View-Survey-Module
    public static VIEW_SRVY_ORDER = "SurveyOrder";
    public static CUSTOM_VIEW_SRVY_ORDER = PathConstant.SELF_CUSTOM + "/" + "SurveyOrder";
    public static CUSTOM_VIEW_SRVY_TASK = PathConstant.SELF_CUSTOM + "/" + "SurveyTask";
    //#endregion

    //#region View-Cust-Module
    public static VIEW_APP = "AppView";
    public static VIEW_CUST_PERSONAL_DETAIL = "PersonalDetail";
    public static VIEW_CUST_PERSONAL_CONTACT_PERSON = "PersonalContactPerson";
    public static VIEW_CUST_PERSONAL_JOB_DATA = "PersonalJobData";
    public static VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF = "PersonalJobDataNonProf";
    public static VIEW_CUST_PERSONAL_JOB_DATA_EMP = "PersonalJobDataEmp";
    public static VIEW_CUST_PERSONAL_JOB_DATA_SME = "PersonalJobDataSme";
    public static VIEW_CUST_PERSONAL_FINANCIAL_DATA = "PersonalFinancialData";
    public static VIEW_CUST_ASSET = "CustomerAsset";
    public static VIEW_CUST_PERSONAL_FAMILY = "PersonalFamily";
    public static VIEW_CUST_COY_OTHER = "CoyOther";
    public static VIEW_CUST_PERSONAL_APP_LISTING = "PersonalAppListing";
    public static VIEW_CUST_COY_DETAIL = "CoyDetail";
    public static VIEW_CUST_ADDR = "Address";
    public static VIEW_CUST_COY_MNGMNT = "CoyManagement";
    public static VIEW_CUST_COY_CONTACT = "CoyContact";
    public static VIEW_CUST_COY_FINANCIAL = "CoyFinancial";
    public static VIEW_CUST_COY_LEGAL = "CoyLegal";
    public static VIEW_CUST_GRP = "CustomerGroup";
    public static VIEW_CUST_DOC = "CustDocument";
    public static VIEW_CUST_OTH_INFO = "CustOthInfo";
    public static VIEW_CUST_HIGHLIGHT_COMMENT = "HighligtComment";
    public static VIEW_CUST_TRUSTING_SOCIAL = "CustTrustSoc";
    public static VIEW_CUST_EXPOSURE = "CustExposureView";
    public static VIEW_CUST_ASLI_RI = "CustAsliRi";
    public static VIEW_CUST_CBAS_SLIK = "CustCbasSlik";
    public static CUSTOM_VIEW_CUST_OTH_INFO = PathConstant.SELF_CUSTOM + "/" + "CustOthInfo";
    public static SELF_CUSTOM_VIEW_CUST_PERSONAL_DETAIL = PathConstant.SELF_CUSTOM + "/" + "PersonalDetail";
    public static SELF_CUSTOM_VIEW_CUST_EXPOSURE = PathConstant.SELF_CUSTOM + "/" + "CustExposureView";
    public static SELF_CUSTOM_VIEW_CUST_COY_DETAIL = PathConstant.SELF_CUSTOM + "/" + "CoyDetail"

    //#endregion

     //#region JOURNAL
    public static JOURNAL_MEDIA = "journalmedia";
    public static JOURNAL_RESULT = "journalresult";
    public static SELF_CUSTOM_JOURNAL_RESULT = "selfcustomjournalresult";
    public static JOURNAL_RESULT_VIEW = "journalview";
    public static HEADER = "header";
    public static FACT = "fact";
    public static ITEM_VALUE = "itemvalue";
    public static FAILED_JOURNAL_RESULT_LIST = "failedjournalresultlist";
    public static JOURNAL_RECONCILE = "journalreconcile";
    public static UPLOAD_JOURNAL = "uploadjournal";


    public static JOURNAL_MEDIA_PAGING = PathConstant.JOURNAL_MEDIA + "/" + PathConstant.PAGING
    public static JOURNAL_MEDIA_DETAIL = PathConstant.JOURNAL_MEDIA + "/" + PathConstant.DETAIL
    public static JOURNAL_MEDIA_HEADER_FACT = PathConstant.JOURNAL_MEDIA + "/" + PathConstant.HEADER + PathConstant.FACT
    public static JOURNAL_MEDIA_GROUP = PathConstant.JOURNAL_MEDIA + "/" + PathConstant.GROUP
    public static JOURNAL_MEDIA_GROUP_FACT = PathConstant.JOURNAL_MEDIA + "/" + PathConstant.GROUP + "/" + PathConstant.FACT
    public static JOURNAL_MEDIA_GROUP_ITEM_VALUE = PathConstant.JOURNAL_MEDIA + "/" + PathConstant.GROUP + '/' + PathConstant.ITEM_VALUE
    public static FAILED_JOURNAL_RESULT_LIST_PAGING = PathConstant.FAILED_JOURNAL_RESULT_LIST + "/" + PathConstant.PAGING
    public static JOURNAL_RECONCILE_PAGING = PathConstant.JOURNAL_RECONCILE + "/" + PathConstant.PAGING
    public static UPLOAD_JOURNAL_FILE_PAGING = PathConstant.UPLOAD_JOURNAL + "/" + PathConstant.PAGING
    public static UPLOAD_JOURNAL_FILE_DETAIL = PathConstant.UPLOAD_JOURNAL + "/" + PathConstant.DETAIL

    public static SELF_CUSTOM_JOURNAL_MEDIA_PAGING = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_MEDIA + "/" + PathConstant.PAGING
    public static SELF_CUSTOM_JOURNAL_MEDIA_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_MEDIA + "/" + PathConstant.DETAIL
    public static SELF_CUSTOM_JOURNAL_MEDIA_HEADER_FACT = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_MEDIA + "/" + PathConstant.HEADER + PathConstant.FACT
    public static SELF_CUSTOM_JOURNAL_MEDIA_GROUP = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_MEDIA + "/" + PathConstant.GROUP
    public static SELF_CUSTOM_JOURNAL_MEDIA_GROUP_FACT = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_MEDIA + "/" + PathConstant.GROUP + "/" + PathConstant.FACT
    public static SELF_CUSTOM_JOURNAL_MEDIA_GROUP_ITEM_VALUE = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_MEDIA + "/" + PathConstant.GROUP + '/' + PathConstant.ITEM_VALUE
    public static SELF_CUSTOM_FAILED_JOURNAL_RESULT_LIST_PAGING = this.SELF_CUSTOM + "/" + PathConstant.FAILED_JOURNAL_RESULT_LIST + "/" + PathConstant.PAGING
    public static SELF_CUSTOM_JOURNAL_RECONCILE_PAGING = this.SELF_CUSTOM + "/" + PathConstant.JOURNAL_RECONCILE + "/" + PathConstant.PAGING
    public static SELF_CUSTOM_UPLOAD_JOURNAL_FILE_PAGING = this.SELF_CUSTOM + "/" + PathConstant.UPLOAD_JOURNAL + "/" + PathConstant.PAGING
    public static SELF_CUSTOM_UPLOAD_JOURNAL_FILE_DETAIL = this.SELF_CUSTOM + "/" + PathConstant.UPLOAD_JOURNAL + "/" + PathConstant.DETAIL

    //#endregion

    //#region License
    public static LICENSE_MASTER = "LicenseManager";
    public static UPLOAD_LICENSE = PathConstant.LICENSE_MASTER + "/" + PathConstant.UPLOAD;
    public static DETAIL_LICENSE = PathConstant.LICENSE_MASTER + "/" + PathConstant.DETAIL;
    //#endRegion

    //#region PEFINDO view
    public static SELF_CUSTOM_VIEW_PEFINDO_VIEW = PathConstant.SELF_CUSTOM + "/" + "Pefindo";
    public static VIEW_SUBJECT_INFO_PERSONAL = "SubjectInfoPersonal";
    public static VIEW_SUBJECT_INFO_COMPANY = "SubjectInfoCompany";
    public static VIEW_MO_SUMMARY = "MoSummary";
    public static VIEW_PEFINDO_SCORE = "PefindoScore";
    public static VIEW_CONTRACTS = "Contracts";
    public static VIEW_PEFINDO_ALERT_QUEST = "PefindoAlertQuest";
    public static VIEW_SECURITIES = "Securities";
    public static VIEW_OTHER_LIABILITIES = "OtherLiabilities";
    public static VIEW_INVOLVEMENTS = "Involvements";
    public static VIEW_RELATIONS = "Relations";
    public static VIEW_INQUIRIES = "Inquiries";
    public static VIEW_DISPUTES = "Disputes";
    public static VIEW_FINANCIAL_STATEMENTS = "FinancialStatements";
    public static VIEW_PEFINDO_OTHERS = "Others";
    //#endregion

    //#region Notif-Engine
    public static NOTIF_TEMPLATE = "NotifTemplate";
    public static VIEW_NOTIF_TEMPLATE = "ViewNotifTemplate";
    public static NOTIF_BROADCAST = "NotifBroadcast";
    public static NOTIF_ATTR_TEMPLATE = "NotifAtrrTemplate";
    public static NOTIF_SOURCE = "NotifSource";
    public static NOTIF_ATTR_TEMPLATE_MAPPING = "NotifAttrTemplateMapping";
    //#endregion

    //#region Notary
    public static NOTARY_COMPANY = "NotaryCompany";
    public static NOTARY_PERSONAL = "NotaryPersonal";

    // staff claim
    public static STAFF_CLAIM = "staff-claim";
    public static STAFF_CLAIM_VIEW = PathConstant.STAFF_CLAIM + "/" + PathConstant.VIEW;
}
