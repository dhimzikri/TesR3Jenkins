import { environment } from "environments/environment";
import { PathConstant } from "./PathConstant";
import { PathConstantX } from "app/impl/shared/constant/PathConstantX";

export class NavigationConstant {

    public static DASHEMPTY = "/" + PathConstant.LR_DASHBOARD + "/" + PathConstant.DASHEMPTY; //'/Dashboard/Dash-Empty'
    public static DASHBOARD = "/" + PathConstant.LR_DASHBOARD + "/" + PathConstant.DASHBOARD; //'/Dashboard/Dash-Board'
    public static BACK_TO_PAGING = '..' + "/" + PathConstant.PAGING; //'../Paging'
    public static BACK_TO_PAGING2 = '..' + "/" + '..' + "/" + PathConstant.PAGING; //'../../Paging'
    public static BACK_TO_DETAIL = '..' + "/" + PathConstant.DETAIL; //'../Detail'
    public static BACK_TO_ADD_EDIT = '..' + "/" + PathConstant.ADD_EDIT; //'../AddEdit'
    public static BACK_TO_EDIT = '..' + "/" + PathConstant.EDIT; //'../Edit'
    public static PAGES_CHANGE_PASSWORD = "/" + PathConstant.LR_PAGES + "/" + PathConstant.CHANGE_PASSWORD; //'/Pages/ChangePassword'
    public static PAGES_LOGIN = "/" + PathConstant.LR_PAGES + "/" + PathConstant.LOGIN; //'/Pages/Login'
    public static PAGES_REQ_PASSWORD = "/" + PathConstant.LR_PAGES + "/" + PathConstant.REQ_PASSWORD; //'/Pages/RequestPassword'
    public static PAGES_CONTENT = "/" + PathConstant.LR_PAGES + "/" + PathConstant.CONTENT; //'/Pages/Content'
    public static ERROR = "/" + PathConstant.LR_ERROR; //'/Error'
    public static PAGES_MODULE_SELECTION = "/" + PathConstant.LR_PAGES + "/" + PathConstant.SELECT_MODULE; //'/Pages/SelectModule'

    //#region Asset
    public static ASSET_CONFIG_PAGING = '..' + "/" + '..' + "/" + PathConstant.ASSET_CONFIG_PAGING; //'../../Configuration/Paging'
    public static ASSET_CONFIG_PAGING2 = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_CONFIG_PAGING; //'/Asset/Configuration/Paging'
    public static ASSET_MASTER_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_PAGING; //'/Asset/AssetMaster/Paging'
    public static ASSET_MASTER_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_DETAIL; //'/Asset/AssetMaster/Detail'
    public static ASSET_MASTER_UPLOAD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_UPLOAD; //'/Asset/AssetMaster/Upload'
    public static ASSET_MASTER_CHILD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_CHILD; //'/Asset/AssetMaster/Child'
    public static ASSET_MASTER_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_RVW_UPLOAD_PAGING; //'/Asset/AssetMaster/ReviewUploadPaging'
    public static ASSET_MASTER_RVW_UPLOAD_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_MASTER_RVW_UPLOAD_DETAIL; //'/Asset/AssetMaster/ReviewUploadDetail'
    public static ASSET_SCHM_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_PAGING; //'/Asset/Scheme/Paging'
    public static ASSET_SCHM_ADD_MBR = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_ADD_MBR; //'/Asset/Scheme/AddMember'
    public static ASSET_SCHM_MBR_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_MBR_DETAIL; //'/Asset/Scheme/MemberDetail'
    public static SELF_CUSTOM_ASSET_SCHM_MBR_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.SELF_CUSTOM_ASSET_SCHM_MBR_DETAIL; //'/Asset/Scheme/MemberDetail'
    public static ASSET_SCHM_INFO_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_SCHM_INFO_DETAIL; //'/Asset/Scheme/InformationDetail'
    public static ASSET_TYPE_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_TYPE_PAGING; //'/Asset/Type/Paging'
    public static ASSET_TYPE_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_TYPE_DETAIL; //'/Asset/Type/Detail'
    public static ASSET_NEG_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_PAGING; //'/Asset/NegativeAsset/Paging'
    public static ASSET_NEG_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_DETAIL; //'/Asset/NegativeAsset/Detail'
    public static ASSET_NEG_UPLOAD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_UPLOAD; //'/Asset/NegativeAsset/Upload'
    public static ASSET_NEG_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_RVW_UPLOAD_PAGING; //'/Asset/NegativeAsset/ReviewUploadPaging'
    public static ASSET_NEG_RVW_UPLOAD_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_NEG_RVW_UPLOAD_DETAIL; //'/Asset/NegativeAsset/ReviewUploadDetail'
    public static ASSET_ACC_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ACC_PAGING; //'/Asset/Accessory/Paging'
    public static ASSET_ACC_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ACC_DETAIL; //'/Asset/Accessory/Detail'
    public static ASSET_ATTR_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ATTR_PAGING; //'/Asset/Attribute/Paging'
    public static ASSET_ATTR_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_ATTR_DETAIL; //'/Asset/Attribute/Detail'
    public static ASSET_CATEGORY_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_CATEGORY_PAGING; //'/Asset/Category/Paging'
    public static ASSET_CATEGORY_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_CATEGORY_DETAIL; //'/Asset/Category/Detail'
    public static ASSET_DOC_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_PAGING; //'/Asset/Document/Paging'
    public static ASSET_DOC_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_DETAIL; //'/Asset/Document/Detail'
    public static ASSET_DOC_MASTER_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_MASTER_PAGING; //'/Asset/DocumentMaster/Paging'
    public static ASSET_DOC_MASTER_DETAIL = "/" + PathConstant.LR_ASSET + "/" + PathConstant.ASSET_DOC_MASTER_DETAIL; //'/Asset/DocumentMaster/Detail'

    public static CUSTOM_ASSET_NEG_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.CUSTOM_ASSET_NEG_PAGING; //'/Asset/SelfCustom/NegativeAsset/Paging'
    public static CUSTOM_ASSET_NEG_UPLOAD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.CUSTOM_ASSET_NEG_UPLOAD; //'/Asset/SelfCustom/NegativeAsset/Upload'
    public static CUSTOM_ASSET_NEG_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.CUSTOM_ASSET_NEG_RVW_UPLOAD_PAGING; //'/Asset/SelfCustom/NegativeAsset/ReviewUploadPaging'
    public static CUSTOM_ASSET_MASTER_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.CUSTOM_ASSET_MASTER_PAGING; //'/Asset/SelfCustom/AssetMaster/Paging'
    public static CUSTOM_ASSET_MASTER_UPLOAD = "/" + PathConstant.LR_ASSET + "/" + PathConstant.CUSTOM_ASSET_MASTER_UPLOAD; //'/Asset/SelfCustom/AssetMaster/Upload'
    public static CUSTOM_ASSET_MASTER_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_ASSET + "/" + PathConstant.CUSTOM_ASSET_MASTER_RVW_UPLOAD_PAGING; //'/Asset/SelfCustom/AssetMaster/ReviewUploadPaging'
    
    //#endregion

    //#region Common Setting
    public static CS_BANK_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_BANK_PAGING; //'/CommonSetting/Bank/Paging'
    public static CS_BANK_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_BANK_DETAIL; //'/CommonSetting/Bank/Detail'
    public static CS_OFFICE_BANK_ACCOUNT_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_BANK_ACCOUNT_PAGING; //'/CommonSetting/OfficeBankAcc/Paging'
    public static CS_OFFICE_BANK_ACCOUNT_PAGING_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_OFFICE_BANK_ACCOUNT_PAGING_X; //'/CommonSetting/OfficeBankAcc/PagingX'
    public static CS_COA_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_PAGING; //'/CommonSetting/Coa/Paging'
    public static CS_COA_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_DETAIL; //'/CommonSetting/Coa/Detail'
    public static CS_COA_DETAIL_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_DETAIL_EDIT; //'/CommonSetting/Coa/Detail/Edit'
    public static CS_COA_SCHM_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_SCHM_PAGING; //'/CommonSetting/CoaScheme/Paging'
    public static CS_COA_SCHM_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_COA_SCHM_DETAIL; //'/CommonSetting/CoaScheme/Detail'
    public static CS_CURRENCY_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_CURRENCY_PAGING; //'/CommonSetting/Currency/Paging'
    public static CS_CURRENCY_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_CURRENCY_ADD; //'/CommonSetting/Currency/Add'
    public static CS_EXCHANGE_RATE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_EXCHANGE_RATE_PAGING; //'CommonSetting/ExchangeRate/Paging'
    public static CS_EXCHANGE_RATE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_EXCHANGE_RATE_DETAIL; //'CommonSetting/ExchangeRate/Detai'
    public static CS_ECONOMIC_SECTOR_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ECONOMIC_SECTOR_PAGING; //'/CommonSetting/EconomicSector/Paging'
    public static CS_ECONOMIC_SECTOR_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ECONOMIC_SECTOR_DETAIL; //'/CommonSetting/EconomicSector/Detail'
    public static CS_GEN_SETTING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING; //'/CommonSetting/GeneralSetting'
    public static CS_GEN_SETTING_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING_DETAIL; //'/CommonSetting/GeneralSetting/Detail'
    public static CS_GEN_SETTING_ADMIN = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING_ADMIN; //'/CommonSetting/GeneralSetting'
    public static CS_GEN_SETTING_DETAIL_ADMIN = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_GEN_SETTING_DETAIL_ADMIN; //'/CommonSetting/GeneralSetting/Detail'
    public static CS_HOLIDAY = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY; //'/CommonSetting/Holiday'
    public static CS_HOLIDAY_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_ADD; //'/CommonSetting/Holiday/Add'
    public static CS_HOLIDAY_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_EDIT; //'/CommonSetting/Holiday/Edit
    public static CS_HOLIDAY_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_DETAIL; //'/CommonSetting/Holiday/Detail'
    public static CS_HOLIDAY_DETAIL_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_DETAIL_ADD; //'/CommonSetting/Holiday/Detail/Add'
    public static CS_HOLIDAY_DETAIL_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_HOLIDAY_EDIT; //'/CommonSetting/Holiday/Edit'
    public static CS_MASTER = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_MASTER; //'/CommonSetting/Master'
    public static CS_MASTER_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_MASTER_DETAIL; //'/CommonSetting/Master/Detail'
    public static CS_OFFICE_ZIPCODE_MBR = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_ZIPCODE_MBR; //'/CommonSetting/OfficeZipcodeMember'
    public static CS_OFFICE_ZIPCODE_MBR_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_ZIPCODE_MBR_PAGING; //'/CommonSetting/OfficeZipcodeMember/Paging'
    public static CS_OFFICE_ZIPCODE_MBR_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_OFFICE_ZIPCODE_MBR_ADD; //'/CommonSetting/OfficeZipcodeMember/Add'
    public static CS_PAYMENT_ALLOC_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_PAGING; //'/CommonSetting/PaymentAlloc/Paging'
    public static CS_PAYMENT_ALLOC_PAGING_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_PAYMENT_ALLOC_PAGING_X; //'/CommonSetting/PaymentAlloc/PagingX'
    public static CS_PAYMENT_ALLOC_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_DETAIL; //'/CommonSetting/PaymentAlloc/Detail'
    public static CS_PAYMENT_ALLOC_DETAIL_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_CUSTOM_PAYMENT_ALLOC_DETAIL_X; //'/CommonSetting/SelfCustom/PaymentAlloc/DetailX'
    public static CS_PAYMENT_ALLOC_GRP_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_GRP_PAGING; //'/CommonSetting/PaymentAllocGrp/Paging'
    public static CS_REF_AMRTZ_ITEM_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_AMRTZ_ITEM_PAGING; //'/CommonSetting/RefAmrtzItem/Paging'
    public static CS_REF_TRX_TYPE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_TRX_TYPE_PAGING; //'/CommonSetting/RefTrxType/Paging'
    public static CS_PAYMENT_ALLOC_GRP_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PAYMENT_ALLOC_GRP_DETAIL; //'/CommonSetting/PaymentAllocGrp/Detail'
    public static CS_PROFESSION_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PROFESSION_PAGING; //'/CommonSetting/Profession/Paging'
    public static CS_PROFESSION_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_PROFESSION_DETAIL; //'/CommonSetting/Profession/Detail'
    public static CS_DISTRICT_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_DISTRICT_PAGING; //'/CommonSetting/District/Paging'
    public static CS_DISTRICT_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_DISTRICT_DETAIL; //'/CommonSetting/District/Detail'
    public static CS_REF_PROVINCE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_PROVINCE_PAGING; //'/CommonSetting/RefProvince/Paging'
    public static CS_REF_PROVINCE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_PROVINCE_DETAIL; //'/CommonSetting/RefProvince/Detail'
    public static CS_REASON_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REASON_PAGING; //'/CommonSetting/Reason/Paging'
    public static CS_REASON_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REASON_DETAIL; //'/CommonSetting/Reason/Detail'
    public static CS_INDUSTRY_TYPE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_INDUSTRY_TYPE_PAGING; //'/CommonSetting/IndustryType/Paging'
    public static CS_INDUSTRY_TYPE_PAGING_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_INDUSTRY_TYPE_PAGING_X; //'/CommonSetting/IndustryType/PagingX'
    public static CS_INDUSTRY_TYPE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_INDUSTRY_TYPE_DETAIL; //'/CommonSetting/IndustryType/Detail' CS_CUSTOM_INDUSTRY_TYPE_DETAIL_X
    public static CS_CUSTOM_INDUSTRY_TYPE_DETAIL_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_CUSTOM_INDUSTRY_TYPE_DETAIL_X; //'/CommonSetting/SelfCustom/IndustryType/DetailX'
    public static CS_INDUSTRY_TYPE_CAT_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_INDUSTRY_TYPE_CAT_PAGING; //'/CommonSetting/IndustryTypeCategory/Paging'
    public static CS_INDUSTRY_TYPE_CAT_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_INDUSTRY_TYPE_CAT_DETAIL; //'/CommonSetting/IndustryTypeCategory/Paging'
    public static CS_SCORE_CATEGORY_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SCORE_CATEGORY_PAGING; //'/CommonSetting/ScoreCategory/Paging'
    public static CS_SCORE_CATEGORY_TYPE = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SCORE_CATEGORY_TYPE; //'/CommonSetting/ScoreCategory/Type'
    public static CS_WORKING_HOUR = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_WORKING_HOUR; //'/CommonSetting/WorkingHour'
    public static CS_WORKING_HOUR_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_WORKING_HOUR_ADD; //'/CommonSetting/WorkingHour/Add'
    public static CS_WORKING_HOUR_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_WORKING_HOUR_DETAIL; //'/CommonSetting/WorkingHour/Detail'
    public static CS_ZIPCODE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ZIPCODE_PAGING; //'/CommonSetting/Zipcode/Paging'
    public static CS_ZIPCODE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_ZIPCODE_DETAIL; //'/CommonSetting/Zipcode/Detail'
    public static CS_REF_STATUS_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_STATUS_PAGING; //'/CommonSetting/RefStatus/Paging'
    public static CS_REF_TC_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_TC_PAGING; //'/CommonSetting/RefTc/Paging'
    public static CS_REF_TC_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_TC_DETAIL; //'/CommonSetting/RefTc/Detail'
    public static CS_REF_TAX_OFFICE_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_TAX_OFFICE + "/" + PathConstant.PAGING; //'/CommonSetting/TaxOffice/Paging'
    public static CS_REF_TAX_OFFICE_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_TAX_OFFICE + "/" + PathConstant.DETAIL; //'/CommonSetting/TaxOffice/Detail'
    public static CS_REF_INS_CLAIM_DOC_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_INS_CLAIM_DOC_PAGING; //'/CommonSetting/RefInsClaimDoc/Paging'
    public static CS_REF_INS_CLAIM_DOC_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_REF_INS_CLAIM_DOC_DETAIL; //'/CommonSetting/RefInsClaimDoc/Detail'
    public static CS_MASKING_WHITELIST_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_MASKING_WHITELIST_DETAIL; //'/CommonSetting/MaskingData/WhitelistRoleDetail'

    public static CS_SELF_CUSTOM_HOLIDAY = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_HOLIDAY; //'/CommonSetting/SelfCustom/Holiday'
    public static CS_SELF_CUSTOM_HOLIDAY_ADD_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_HOLIDAY_ADD_EDIT; //'/CommonSetting/SelfCustom/Holiday/AddEdit'
    public static CS_SELF_CUSTOM_HOLIDAY_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_HOLIDAY_DETAIL; //'/CommonSetting/SelfCustom/Holiday/Detail'
    public static CS_SELF_CUSTOM_HOLIDAY_DETAIL_ADD_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_HOLIDAY_DETAIL_ADD_EDIT; //'/CommonSetting/SelfCustom/Holiday/Detail/AddEdit'
    public static CS_SELF_CUSTOM_WORKING_HOUR = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_WORKING_HOUR; //'/CommonSetting/SelfCustom/WorkingHour'
    public static CS_SELF_CUSTOM_WORKING_HOUR_ADD = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_WORKING_HOUR_ADD; //'/CommonSetting/SelfCustom/WorkingHour/Add'
    public static CS_SELF_CUSTOM_WORKING_HOUR_DETAIL = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_WORKING_HOUR_DETAIL; //'/CommonSetting/SelfCustom/WorkingHour/Detail'
    public static CS_SELF_CUSTOM_PROJECT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_PROJECT; //'/CommonSetting/SelfCustom/Project'
    public static CS_SELF_CUSTOM_PROJECT_ADD_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CS_SELF_CUSTOM_PROJECT_ADD_EDIT; //'/CommonSetting/SelfCustom/Project/AddEdit'
    public static CUSTOM_CS_COA_SCHM_PAGING = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.CUSTOM_CS_COA_SCHM_PAGING;

    //#endregion

    //#region System Setting
    public static SYSTEM_SETTING_ROLE = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE; //'/SystemSetting/Role'
    public static SYSTEM_SETTING_ROLE_X = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstantX.ROLE_X; //'/SystemSetting/RoleX'
    public static SYSTEM_SETTING_ROLE_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE_DETAIL; //'/SystemSetting/Role/Detail'
    public static SYSTEM_SETTING_ROLE_FORM = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE_FORM; //'/SystemSetting/RoleForm'
    public static SYSTEM_SETTING_ROLE_FORM_X = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstantX.ROLE_FORM_X; //'/SystemSetting/RoleFormX'
    public static SYSTEM_SETTING_ROLE_FORM_ADD = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.ROLE_FORM_ADD; //'/SystemSetting/RoleForm/Add'
    public static SYSTEM_SETTING_ATTR_PAGING = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.SYS_ATTR_PAGING; //'/SystemSetting/Attribute/Paging'
    public static SYSTEM_SETTING_ATTR_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.SYS_ATTR_DETAIL; //'/SystemSetting/Attribute/Detail'
    public static SYSTEM_SETTING_NOTIF = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.NOTIF; //'/SystemSetting/Notification'
    public static SYSTEM_SETTING_NOTIF_APPRV = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.NOTIF_APPRV; //'/SystemSetting/NotificationApproval'
    public static SYSTEM_SETTING_NOTIF_APPRV_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.NOTIF_APPRV_DETAIL; //'/SystemSetting/NotificationApproval/Detail'
    public static SYSTEM_SETTING_REF_FORM_PAGING = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_PAGING; //'/SystemSetting/RefForm/Paging'
    public static SYSTEM_SETTING_REF_FORM_DETAIL = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_DETAIL; //'/SystemSetting/RefForm/Detail'
    public static SYSTEM_SETTING_REF_FORM_ROLE_MAP = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_ROLE_MAP; //'/SystemSetting/RefForm/RoleMapping'
    public static SYSTEM_SETTING_REF_FORM_ROLE_MAP_ADD = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_FORM_ROLE_MAP_ADD; //'/SystemSetting/RefForm/RoleMapping/Add'
    public static SYSTEM_SETTING_CHANGE_PASSWORD = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.CHANGE_PASSWORD; //'/SystemSetting/ChangePassword'
    public static SYSTEM_SETTING_REF_USER = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.REF_USER; //'/SystemSetting/RefUser'
    public static SYSTEM_SETTING_ATTR_MSTR_PAGING = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.SYS_ATTR_PAGING; //'/SystemSetting/Attribute/Paging'
    public static CUSTOM_SYSTEM_SETTING_ROLE_FORM = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.CUSTOM_ROLE_FORM_PAGING; //'/SystemSetting/RoleForm'
    public static CUSTOM_SYSTEM_SETTING_FORM_ROLE = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstant.CUSTOM_REF_FORM_ROLE_MAP_PAGING; //'/SystemSetting/RefForm/RoleMapping/Add'
    public static ROLE_FORM_FEATURE_X = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstantX.ROLE_FORM_FEATURE_X;//'/SystemSetting/RoleForm/FeatureX'
    public static UPLOAD_FORM_FEATURE_X = "/" + PathConstant.LR_SYSTEM_SETTING + "/" + PathConstantX.UPLOAD_FORM_FEATURE_PAGING_X;//'/SystemSetting/UploadFormFeature/PagingX'
    //#endregion

    //#region View
    public static VIEW_APP = "/" + PathConstant.VIEW + "/" + PathConstant.VIEW_APP;
    public static VIEW_SRVY_TASK = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_SRVY_TASK; //'/View/Survey/SurveyTask'
    public static VIEW_SRVY_ORDER = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_SRVY + "/" + PathConstant.VIEW_SRVY_ORDER; //'/View/Survey/SurveyOrder'
    public static VIEW_CUST = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_CUST; //'View/Customer'
    public static SELF_CUSTOM_VIEW_CUST = "/" + PathConstant.CR_VIEW + "/" + PathConstant.SELF_CUSTOM_VIEW_CUST; //'View/SelfCustomCustomer'
    public static SELF_CUSTOM_VIEW_PEFINDO = "/" + PathConstant.CR_VIEW + "/" + PathConstant.SELF_CUSTOM_VIEW_PEFINDO; //View/SelfCustomPefindo'
    public static VIEW_CUST_ADDR = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_ADDR; //'/View/Customer/Address'
    public static VIEW_CUST_GRP = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_GRP; //'/View/Customer/CustomerGroup'
    public static VIEW_CUST_PERSONAL_DETAIL = NavigationConstant.VIEW_CUST + "/" +PathConstant.VIEW_CUST_PERSONAL_DETAIL; //'/View/Customer/PersonalDetail'
    public static VIEW_CUST_PERSONAL_CONTACT_PERSON = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON; //'/View/Customer/PersonalContactPerson'
    public static VIEW_CUST_PERSONAL_JOB_DATA = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA; //'/View/Customer/PersonalJobData'
    public static VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF; //'/View/Customer/PersonalJobDataNonProf'
    public static VIEW_CUST_PERSONAL_JOB_DATA_EMP = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP; //'/View/Customer/PersonalJobDataEmp'
    public static VIEW_CUST_PERSONAL_JOB_DATA_SME = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME; //'/View/Customer/PersonalJobDataSme'
    public static VIEW_CUST_PERSONAL_FINANCIAL_DATA = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA; //'/View/Customer/PersonalFinancialData'
    public static VIEW_CUST_ASSET_DATA = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_ASSET; //'/View/Customer/CustomerAsset'
    public static VIEW_CUST_PERSONAL_FAMILY = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_PERSONAL_FAMILY; //'/View/Customer/PersonalFamily'
    public static VIEW_CUST_DOC = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_DOC; //'/View/Customer/CustDocument'
    public static VIEW_CUST_HIGHLIGHT_COMMENT = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_HIGHLIGHT_COMMENT; //'/View/Customer/HighligtComment'
    public static VIEW_CUST_COY_DETAIL = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_DETAIL; //'/View/Customer/CoyDetail'
    public static VIEW_CUST_COY_MNGMNT = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_MNGMNT; //'/View/Customer/CoyManagement'
    public static VIEW_CUST_COY_CONTACT = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_CONTACT; //'/View/Customer/CoyContact'
    public static VIEW_CUST_COY_FINANCIAL = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_FINANCIAL; //'/View/Customer/CoyFinancial'
    public static VIEW_CUST_COY_LEGAL = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_COY_LEGAL; //'/View/Customer/CoyLegal'
    public static VIEW_CUST_TRUSTING_SOCIAL = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_TRUSTING_SOCIAL; //'/View/Customer/CustTrustSoc'
    public static VIEW_NEG_CUST = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_NEG_CUST; //'/View/NegativeCustomer'
    public static VIEW_CUST_OTH_INFO = NavigationConstant.VIEW_CUST + "/" + PathConstant.VIEW_CUST_OTH_INFO; //'/View/Customer/CustOthInfo'
    public static VIEW_CUST_EXPOSURE = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_CUST_EXPOSURE; //'/View/CustExposureView'
    public static VIEW_NOTIF_TEMPLATE = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_NOTIF_TEMPLATE; //'/View/ViewNotifTemplate'
    public static VIEW_CUST_ASLI_RI = NavigationConstant.VIEW_CUST +"/" + PathConstant.VIEW_CUST_ASLI_RI; //'/View/Customer/CustAsliRi'
    public static VIEW_CUST_CBAS_SLIK = NavigationConstant.VIEW_CUST +"/" + PathConstant.VIEW_CUST_CBAS_SLIK; //'/View/Customer/CustCbasSlik'
    public static CUSTOM_VIEW_CUST_OTH_INFO = NavigationConstant.VIEW_CUST + "/" + PathConstant.CUSTOM_VIEW_CUST_OTH_INFO; //'/View/Customer/CustOthInfo'
    public static CUSTOM_VIEW_NEG_CUST = "/" + PathConstant.CR_VIEW + "/" + PathConstant.CUSTOM_VIEW_NEG_CUST;
    public static SELF_CUSTOM_VIEW_CUST_PERSONAL_DETAIL = NavigationConstant.SELF_CUSTOM_VIEW_CUST + "/" + PathConstant.SELF_CUSTOM_VIEW_CUST_PERSONAL_DETAIL; //'/View/SelfCustomCustomer/SelfCustom/PersonalDetail'
    public static SELF_CUSTOM_VIEW_CUST_EXPOSURE = NavigationConstant.SELF_CUSTOM_VIEW_CUST + "/" + PathConstant.SELF_CUSTOM_VIEW_CUST_EXPOSURE; //'/View/SelfCustomCustomer/SelfCustom/CustExposureView'
    public static SELF_CUSTOM_VIEW_CUST_COY_DETAIL = NavigationConstant.SELF_CUSTOM_VIEW_CUST + "/" + PathConstant.SELF_CUSTOM_VIEW_CUST_COY_DETAIL;

    public static CUSTOM_CUST_NEG_PERSONAL_DETAIL = PathConstant.LR_CUST +"/" + PathConstant.SELF_CUSTOM + PathConstant.CUST_NEG + PathConstant.PERSONAL + "/" + PathConstant.DETAIL;
    public static VIEW_CUSTOM_CUST_NEG_PERSONAL = NavigationConstant.VIEW_NEG_CUST + "/" + PathConstant.VIEW_PERSONAL;
    public static VIEW_CUSTOM_CUST_NEG_COMPANY = NavigationConstant.VIEW_NEG_CUST + "/" + PathConstant.VIEW_COMPANY;
    public static CUSTOM_CUST_NEG_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUSTOM_CUST_NEG_RVW_UPLOAD_PAGING; //'/Customer/NegativeCustomer/ReviewUploadPaging'
    public static SELF_CUSTOM_CUST_UPDATE_DATA_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUST_UPDATE_DATA_PAGING;


    //#endregion

    //#region Upload
    public static UPLOAD_SETTING_EDIT = "/" + PathConstant.LR_UPLOAD + "/" + PathConstant.UPLOAD_SETTING_EDIT; //'/Upload/UploadSettingEdit'
    public static UPLOAD_SETTING_PAGING = "/" + PathConstant.LR_UPLOAD + "/" + PathConstant.UPLOAD_SETTING_PAGING; //'/Upload/UploadSettingPaging'
    //#endregion

    //#region SURVEY
    public static SRVY_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.PAGING; //'/Survey/Paging'
    public static SRVY_TASK = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_TASK_PAGING; //'/Survey/Task'
    public static SRVY_ORDER = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_ORDER_PAGING;
    //#endregion

    //#region Vendor
    public static VIEW_VENDOR = "/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_VENDOR; //'/View/Vendor'PathConstant
    public static VIEW_VENDOR_BRANCH = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_BRANCH; //'/View/Vendor/VendorBranch'
    public static VIEW_VENDOR_BRANCH_X = NavigationConstant.VIEW_VENDOR + "/" + PathConstantX.VIEW_VENDOR_BRANCH_X; //'/View/Vendor/VendorBranch'
    public static VIEW_VENDOR_HO = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_HO; //'/View/Vendor/VendorHO'
    public static VIEW_VENDOR_HO_X = NavigationConstant.VIEW_VENDOR + "/" + PathConstantX.VIEW_VENDOR_HO_X; //'/View/Vendor/VendorHO'
    public static VIEW_VENDOR_HOLDING = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_HOLDING; //'/View/Vendor/VendorHolding'
    public static VIEW_VENDOR_COLL_COMPANY = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_VENDOR_COLL_COMPANY; //'/View/Vendor/VendorCollCompany'
    public static VENDOR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.PAGING; //'/Vendor/Paging'
    public static VENDOR_PAGING_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.PAGING_X; //'/Vendor/PagingX'
    public static VENDOR_GRP_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRP_ADD; //'/Vendor/Group/Add'
    public static VENDOR_GRP_VIEW = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRP_VIEW; //'/Vendor/Group/View'
    public static VENDOR_GRP_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRP_MBR_ADD; //'/Vendor/GroupMbr/Add
    public static VENDOR_HO_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HO_DETAIL; //'/Vendor/HO/Detail'
    public static VENDOR_HO_DETAIL_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_HO_DETAIL_X; //'/Vendor/HO/DetailX'
    public static VENDOR_CRD_INSCO_HO_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS_ADD;
    public static VENDOR_HO_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HO_REG; //'/Vendor/HO/Registration'
    public static VENDOR_HO_REG_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_HO_REG_X; //'/Vendor/HO/RegistrationX'
    public static VENDOR_HOLDING_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HOLDING_DETAIL; //'/Vendor/Holding/Detail'
    public static VENDOR_HOLDING_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_HOLDING_REG; //'/Vendor/Holding/Registration'
    public static VENDOR_ATPM_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_ATPM_DETAIL; //'/Vendor/ATPM/Detail'
    public static VENDOR_ATPM_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_ATPM_REG; //'/Vendor/ATPM/Registration'
    public static VENDOR_BRANCH_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_ADD; //'/Vendor/Branch/Add'
    public static VENDOR_BRANCH_ADD_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_BRANCH_ADD_X; //'/Vendor/Branch/AddX'
    public static VENDOR_BRANCH_EMP_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_EMP_PAGING; //'/Vendor/Branch/Employee/Paging'
    public static VENDOR_BRANCH_EMP_PAGING_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_BRANCH_EMP_PAGING_X; //'/Vendor/Branch/Employee/PagingX'
    public static VENDOR_BRANCH_EMP_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_EMP_DETAIL; //'/Vendor/Branch/Employee/Detail'
    public static VENDOR_BRANCH_EMP_DETAIL_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_BRANCH_EMP_DETAIL_X; //'/Vendor/Branch/Employee/DetailX'
    public static VENDOR_BRANCH_MBR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_MBR_PAGING; //'/Vendor/Branch/Member/Paging'
    public static VENDOR_BRANCH_MBR_PAGING_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_BRANCH_MBR_PAGING_X; //'/Vendor/Branch/Member/PagingX'
    public static VENDOR_BRANCH_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_MBR_ADD; //'/Vendor/Branch/Member/Add'
    public static VENDOR_BRANCH_MBR_ADD_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_BRANCH_MBR_ADD_X; //'/Vendor/Branch/Member/AddX'
    public static VENDOR_BRANCH_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_BRANCH_REG; //'/Vendor/Branch/Registration'
    public static VENDOR_BRANCH_REG_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_BRANCH_REG_X; //'/Vendor/Branch/Registration'
    public static VENDOR_SCHM_MBR = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_SCHM_MBR; //'/Vendor/VendorScheme/Member'
    public static VENDOR_SCHM_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_SCHM_MBR_ADD; //'/Vendor/VendorScheme/Member/Add'
    public static VENDOR_SCHM_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_SCHM_DETAIL; //'/Vendor/VendorScheme/Detail'
    public static VENDOR_GRD_REQ_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRADING_REQUEST_PAGING; //'/Vendor/VendorGrading/Request/Paging'
    public static VENDOR_GRD_REQ_APV_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_GRADING_REQUEST_APPROVAL_DETAIL; //'/Vendor/VendorGrading/Request/Paging'
    public static VENDOR_COLL_COMPANY_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_ADD; //'/Vendor/CollectionCompany/Add'
    public static VENDOR_COLL_COMPANY_EMP_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_EMP_PAGING; //'/Vendor/CollectionCompany/Employee/Paging'
    public static VENDOR_COLL_COMPANY_EMP_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_EMP_DETAIL; //'/Vendor/CollectionCompany/Employee/Detail'
    public static VENDOR_COLL_COMPANY_MBR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_MBR_PAGING; //'/Vendor/CollectionCompany/Member/Paging'
    public static VENDOR_COLL_COMPANY_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_MBR_ADD; //'/Vendor/CollectionCompany/Member/Add'
    public static VENDOR_COLL_COMPANY_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_REG; //'/Vendor/CollectionCompany/Registration'
    public static VENDOR_COLL_COMPANY_VIEW = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_COLL_COMPANY_VIEW; //'/Vendor/CollectionCompany/View'
    public static VENDOR_FUNDING_COY_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_FUNDING_COY_PAGING; //'/Vendor/FundingCompany/Paging'
    public static VENDOR_FUNDING_COY_ADD_EDIT = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_FUNDING_COY_ADD_EDIT; //'/Vendor/FundingCompany/AddEdit'//'/Vendor/FundingCompany/AddEdit'
    public static VENDOR_FUNDING_COY_VIEW = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_FUNDING_COY_VIEW;
    public static VIEW_FUNDING_COMPANY = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.VIEW_FUNDING_COMPANY;

    public static SELF_CUSTOM_VENDOR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_PAGING; //'/Vendor/SelfCustom/Paging'
    public static SELF_CUSTOM_VENDOR_HO_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_HO_DETAIL; //'/Vendor/SelfCustom/HO/Detail'
    public static SELF_CUSTOM_VENDOR_HOLDING_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_HOLDING_DETAIL; //'/Vendor/SelfCustom/Holding/Detail'
    public static SELF_CUSTOM_VENDOR_BRANCH_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_BRANCH_ADD; //'/Vendor/SelfCustom/Branch/Add'
    public static SELF_CUSTOM_VENDOR_SCHM_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_SCHM_DETAIL; //'/Vendor/SelfCustom/VendorScheme/Detail'
    public static SELF_CUSTOM_VENDOR_SCHM_MBR = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_SCHM_MBR; //'/Vendor/SelfCustom/VendorScheme/Member'
    public static SELF_CUSTOM_VENDOR_SCHM_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_SCHM_MBR_ADD; //'/Vendor/SelfCustom/VendorScheme/Member/Add'
    public static SELF_CUSTOM_VENDOR_GRP_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_GRP_ADD; //'/Vendor/SelfCustom/Group/Add'
    public static SELF_CUSTOM_VENDOR_GRP_VIEW = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_GRP_VIEW; //'/Vendor/SelfCustom/Group/View'
    public static SELF_CUSTOM_VENDOR_GRP_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_GRP_MBR_ADD; //'/Vendor/SelfCustom/GroupMbr/Add
    public static SELF_CUSTOM_VENDOR_HOLDING_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_HOLDING_REG; //'/Vendor/SelfCustom/Holding/Registration'
    public static SELF_CUSTOM_VENDOR_HO_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_HO_REG; //'/Vendor/SelfCustom/HO/Registration'
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING; //'/Vendor/SelfCustom/Branch/Member/Paging'
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING_X; //'/Vendor/SelfCustom/Branch/Member/PagingX'
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_BRANCH_MBR_ADD; //'/Vendor/SelfCustom/Branch/Member/Add'
    public static SELF_CUSTOM_VENDOR_BRANCH_EMP_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_BRANCH_EMP_PAGING; //'/Vendor/SelfCustom/Branch/Employee/Paging'
    public static SELF_CUSTOM_VENDOR_BRANCH_EMP_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_BRANCH_EMP_DETAIL; //'/Vendor/SelfCustom/Branch/Employee/Detail'
    public static SELF_CUSTOM_VIEW_VENDOR_HOLDING = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.SELF_CUSTOM_VIEW_VENDOR_HOLDING; //'/View/Vendor/SelfCustom/VendorHolding'
    public static SELF_CUSTOM_VIEW_VENDOR_HO = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.SELF_CUSTOM_VIEW_VENDOR_HO; //'/View/Vendor/SelfCustom/VendorHO'
    public static SELF_CUSTOM_VIEW_VENDOR_BRANCH = NavigationConstant.VIEW_VENDOR + "/" + PathConstant.SELF_CUSTOM_VIEW_VENDOR_BRANCH; //'/View/Vendor/SelfCustom/VendorBranch'
    public static CUSTOM_VENDOR_GRD_APV_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.CUSTOM_VENDOR_GRADING_APPROVAL_DETAIL; //'/Vendor/VendorGrading/Request/Paging'
    public static SELF_CUSTOM_VENDOR_ATPM_DETAIL = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_ATPM_DETAIL; //'/Vendor/SelfCustom/ATPM/Detail'
    public static SELF_CUSTOM_VENDOR_ATPM_REG = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.SELF_CUSTOM_VENDOR_ATPM_REG; //'/Vendor/SelfCustom/ATPM/Registration'
    public static CUSTOM_VENDOR_FUNDING_COY_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.CUSTOM_VENDOR_FUNDING_COY_PAGING; //'/Vendor/FundingCompany/Paging'

    //#endregion

    //#region Organization
    public static ORG_BZ_UNIT = "/" + PathConstant.LR_ORG + "/" + PathConstant.BZ_UNIT; //'/Organization/BusinessUnit'
    public static ORG_BZ_UNIT_MEMBER = "/" + PathConstant.LR_ORG + "/" + PathConstant.BZ_UNIT_MEMBER; //'/Organization/BusinessUnit/Member'
    public static ORG_BZ_UNIT_DETAIL = "/" + PathConstant.LR_ORG + "/" + PathConstant.BZ_UNIT_DETAIL; //'/Organization/BusinessUnit/Detail'
    public static ORG_JOB_TITLE = "/" + PathConstant.LR_ORG + "/" + PathConstant.JOB_TITLE; //'/Organization/JobTitle'
    //#endregion

    //#region Integration
    public static INTEGRATION_SEND_DAILY_MASTER = "/" + PathConstant.LR_INTEGRATION + "/" + PathConstant.SEND_DAILY_MASTER; //'/Integration/SendDailyMaster'
    //#endregion

    //#region Verif
    public static VERIF_QA_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_PAGING; //'/Verification/QuestionAnswer/Paging'
    public static VERIF_QA_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_ADD; //'/Verification/QuestionAnswer/Add'
    public static VERIF_QA_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_EDIT; //'/Verification/QuestionAnswer/Edit'
    public static VERIF_QA_GRP_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_PAGING; //'/Verification/QuestionGroup/Paging'
    public static VERIF_QA_GRP_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_ADD; //'/Verification/QuestionGroup/Add'
    public static VERIF_QA_GRP_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_EDIT; //'/Verification/QuestionGroup/Edit'
    public static VERIF_QA_GRP_MBR_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_MBR_PAGING; //'/Verification/QuestionGroupMember/Paging'
    public static SELF_CUSTOM_VERIF_QA_GRP_MBR_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.SELF_CUSTOM_QA_GRP_MBR_PAGING; //'/Verification/QuestionGroupMember/Paging'
    public static VERIF_QA_GRP_MBR_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_MBR_ADD; //'/Verification/QuestionGroupMember/Add'
    public static VERIF_QA_GRP_MBR_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_GRP_MBR_EDIT; //'/Verification/QuestionGroupMember/Edit'
    public static VERIF_QA_SCHM_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_PAGING; //'/Verification/QuestionScheme/Paging'
    public static VERIF_QA_SCHM_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_ADD; //'/Verification/QuestionScheme/Add'
    public static VERIF_QA_SCHM_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_EDIT; //'/Verification/QuestionScheme/Edit'
    public static VERIF_QA_SCHM_MBR_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_MBR_PAGING; //'/Verification/QuestionSchemeMember/Paging'
    public static SELF_CUSTOM_VERIF_QA_SCHM_MBR_PAGING = "/" + PathConstant.LR_VERIF + "/" + PathConstant.SELF_CUSTOM_QA_SCHM_MBR_PAGING; //'/Verification/QuestionSchemeMember/Paging'
    public static VERIF_QA_SCHM_MBR_ADD = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_MBR_ADD; //'/Verification/QuestionSchemeMember/Add'
    public static VERIF_QA_SCHM_MBR_EDIT = "/" + PathConstant.LR_VERIF + "/" + PathConstant.QA_SCHM_MBR_EDIT; //'/Verification/QuestionSchemeMember/Edit'
    //#endregion

    //#region EMP
    public static EMP = "/" + PathConstant.LR_EMP; //'/Employee'
    public static EMP_PAGING = "/" + PathConstant.LR_EMP + "/" + PathConstant.PAGING; //'/Employee/Paging'
    public static EMP_PAGING_X = "/" + PathConstant.LR_EMP + "/" + PathConstantX.EMPLOYEE_PAGING_X; //'/Employee/EmployeeXPagingX'
    public static EMP_DETAIL = "/" + PathConstant.LR_EMP + "/" + PathConstant.DETAIL; //'/Employee/Detail'
    public static EMP_DETAIL_X = "/" + PathConstant.LR_EMP + "/" + PathConstantX.DETAIL_X; //'/Employee/DetailX'
    public static EMP_BZ_UNIT_PAGING = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_BZ_UNIT_PAGING; //'/Employee/EmployeeBusinessUnit/Paging'
    public static EMP_BZ_UNIT_ADD = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_BZ_UNIT_ADD; //'/Employee/EmployeeBusinessUnit/Add'
    public static EMP_POS = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_POS; //'/Employee/EmployeePosition'
    public static EMP_POS_DETAIL = "/" + PathConstant.LR_EMP + "/" + PathConstant.EMP_POS_DETAIL; //'/Employee/EmployeePosition/Detail'
    public static EMP_LEAVE_PAGING = "/" + PathConstant.LR_EMP + "/" + PathConstant.LEAVE_PAGING; //'/Employee/Leave/Paging'
    public static EMP_LEAVE_ADD = "/" + PathConstant.LR_EMP + "/" + PathConstant.LEAVE_ADD; //'/Employee/Leave/Add'
    public static EMP_BANK_ACCOUNT_X = "/" + PathConstant.LR_EMP + "/" + PathConstantX.EMPLOYEE_BANK_INFORMATION_X; //'Employee/EmployeeBankInformationX/PagingX'
    public static EMP_BANK_ACCOUNT_EDIT_X = "/" + PathConstant.LR_EMP + "/" + PathConstantX.EMPLOYEE_BANK_INFORMATION_DETAIL_X; //'Employee/EmployeeBankInformationX/PagingX/DetailX'
    //#endregion

    //#region Office
    public static OFFICE = "/" + PathConstant.LR_OFFICE; //'/Office'
    public static OFFICE_PAGING = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.PAGING; //'/Office/Paging'
    public static OFFICE_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.ADD; //'/Office/Add'
    public static OFFICE_AREA = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA; //'/Office/OfficeArea'
    public static OFFICE_AREA_DETAIL = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA_DETAIL; //'/Office/OfficeArea/Detail'
    public static OFFICE_AREA_MEMBER = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA_MEMBER; //'/Office/OfficeArea/Member'
    public static OFFICE_AREA_MEMBER_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_AREA_MEMBER_ADD; //'/Office/OfficeArea/Member/Add'
    public static OFFICE_EMP_VIEW = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_EMP_VIEW; //'/Office/OfficeEmpView'
    public static OFFICE_EMP_POS = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_EMP_POS; //'/Office/OfficeEmpPos'
    public static OFFICE_EMP_POS_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_EMP_POS_ADD; //'/Office/OfficeEmpPosAdd'
    public static OFFICE_GROUP_MEMBER = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_GROUP_MEMBER; //'/Office/Group/Member'
    public static OFFICE_GROUP_MEMBER_ADD = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.OFFICE_GROUP_MEMBER_ADD; //'/Office/Group/Member/Add'
    public static CUSTOM_OFFICE_GROUP_MEMBER = "/" + PathConstant.LR_OFFICE + "/" + PathConstant.CUSTOM_OFFICE_GROUP_MEMBER;
    //#endregion

    //#region
    public static SURVEYOR = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SURVEYOR //'Surveyor'
    public static SURVEYOR_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SURVEYOR + "/" + PathConstant.PAGING   //'/Surveyor/Paging
    public static SURVEYOR_ADD = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SURVEYOR + "/" + PathConstant.ADD
    //#endregion

    //#region Survey
    public static SURVEY_TASK_ASSIGNMENT = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SURVEYOR_TASK_ASSIGNMENT;
    public static SURVEY_TASK_ASSIGNMENT_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SURVEYOR_TASK_ASSIGNMENT + "/" + PathConstant.PAGING;
    public static SURVEY_TASK_ASSIGNMENT_DETAIL = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SURVEYOR_TASK_ASSIGNMENT + "/" + PathConstant.DETAIL;
    public static SURVEY_RESULT_REVIEW_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_RESULT_REVIEW + "/" + PathConstant.PAGING;
    public static SURVEY_RESULT_REVIEW_DETAIL = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_RESULT_REVIEW + "/" + PathConstant.DETAIL;
    public static SURVEY_TASK_RESULT_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.PAGING;
    public static SURVEY_TASK_RESULT_PAGE = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SRVY_TASK_RESULT + "/" + PathConstant.SRVY_TASK_PAGE;

    public static SELF_CUSTOM_SURVEY_TASK_RESULT_PAGING = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SELF_CUSTOM_SRVY_TASK_RESULT_PAGING; //'/Survey/SelfCustom/SurveyTaskResult/Paging'
    public static SELF_CUSTOM_SURVEY_TASK_RESULT_PAGE = "/" + PathConstant.LR_SRVY + "/" + PathConstant.SELF_CUSTOM_SRVY_TASK_RESULT_PAGE; //'/Survey/SelfCustom/SurveyTaskResult/Page'
    //#endregion

    //#region Cust
    public static CUST_PERSONAL_MAIN_INFO = '..' + "/" + PathConstant.CUST_PERSONAL_MAIN_INFO; //'../CustomerPersonal/MainInfo'
    public static CUST_COY_MAIN_INFO = '..' + "/" + PathConstant.CUST_COY_MAIN_INFO; //'../CustomerCompany/MainInfo'
    public static CUST_NEG_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_PAGING; //'/Customer/NegativeCustomer/Paging'
    public static CUST_NEG_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_DETAIL; //'/Customer/NegativeCustomer/Detail'
    public static CUST_NEG_UPLOAD = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_UPLOAD; //'/Customer/NegativeCustomer/Upload'
    public static CUST_NEG_RVW_UPLOAD_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_RVW_UPLOAD_PAGING; //'/Customer/NegativeCustomer/ReviewUploadPaging'
    public static CUST_NEG_RVW_UPLOAD_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_NEG_RVW_UPLOAD_DETAIL; //'/Customer/NegativeCustomer/ReviewUploadDetail'
    public static CUST_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.PAGING; //'/Customer/Paging'
    public static CUST_PAGING_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.PAGING_X; //'/Customer/PagingX'
    public static CUST_EDIT_MAIN_DATA_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_EDIT_MAIN_DATA_PAGING; //'/Customer/EditMainData/Paging'
    public static CUST_EDIT_MAIN_DATA_PAGING_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.CUST_EDIT_MAIN_DATA_PAGING_X; //'/Customer/EditMainData/PagingX'
    public static CUST_EDIT_MAIN_DATA_PERSONAL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_EDIT_MAIN_DATA_PERSONAL; //'/Customer/EditMainData/Personal'
    public static CUST_EDIT_MAIN_DATA_COY = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_EDIT_MAIN_DATA_COY; //'/Customer/EditMainData/Company'
    public static CUST_COY_PAGE = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_COY_PAGE; //'/Customer/CustomerCompany/Page'
    public static CUST_COY_PAGE_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.CUST_COY_PAGE_X; //'/Customer/CustomerCompany/PageX'
    public static CUST_COY_DUP_CHECK = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_COY_DUP_CHECK; //'/Customer/CustomerCompany/DuplicateCheck'
    public static CUST_PERSONAL_PAGE = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_PERSONAL_PAGE; //'/Customer/CustomerPersonal/Page'
    public static CUST_PERSONAL_PAGE_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.CUST_PERSONAL_PAGE_X; //'/Customer/CustomerPersonal/PageX'
    public static CUST_PERSONAL_DUP_CHECK = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_PERSONAL_DUP_CHECK; //'/Customer/CustomerPersonal/DuplicateCheck'
    public static CUST_UPDATE_DATA_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_UPDATE_DATA_PAGING; //'/Customer/UpdateDataCustomer/Paging'
    public static CUST_UPDATE_DATA_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_UPDATE_DATA_DETAIL; //'/Customer/UpdateDataCustomer/Detail'
    public static CUST_SHRHLDR_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_SHRHLDR_PAGING; //'/Customer/CustShareholder/Paging'
    public static CUST_SHRHLDR_PAGING_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.CUST_SHRHLDR_PAGING_X; //'/Customer/CustShareholder/PagingX'
    public static CUST_GUARANTOR_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_GUARANTOR_PAGING; //'/Customer/CustGuarantor/Paging'
    public static CUST_FAMILY_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUST_FAMILY_PAGING; //'/Customer/CustFamily/Paging'
    public static CUST_FAMILY_PAGING_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.CUST_FAMILY_PAGING_X; //'/Customer/CustFamily/PagingX'
    public static CUST_NEW_FORM = "/" + PathConstant.LR_CUST + "/" + PathConstant.NEW_CUST; //'/Customer/NewCustomer'
    public static CUST_NEW_FORM_X = "/" + PathConstant.LR_CUST + "/" + PathConstantX.NEW_CUST_X; //'/Customer/NewCustomerX'

    public static SELF_CUSTOM_CUST_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUST_PAGING; //'/Customer/SelfCustom/Paging'
    public static SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING; //'/Customer/SelfCustom/EditMainData/Paging'
    public static SELF_CUSTOM_CUST_SHRHLDR_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUST_SHRHLDR_PAGING; //'/Customer/SelfCustom/CustShareholder/Paging'
    public static SELF_CUSTOM_CUST_FAMILY_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUST_FAMILY_PAGING; //'/Customer/SelfCustom/CustFamily/Paging'
    public static SELF_CUSTOM_CUST_NEW_FORM = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_NEW_CUST; //'/Customer/SelfCustom/NewCustomer'
    public static SELF_CUSTOM_CUST_PERSONAL_PAGE = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUST_PERSONAL_PAGE; //'/Customer/SelfCustom/CustomerPersonal/Page'
    public static SELF_CUSTOM_CUST_PERSONAL_DUPLICATE_CHECK = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUSTOM_CUST_PERSONAL_DUPLICATE_CHECK; //'/Customer/SelfCustom/CustomerPersonalDuplicateChecking'
    public static SELF_CUSTOM_CUST_COMPANY_DUPLICATE_CHECK = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_CUSTOM_CUST_COMPANY_DUPLICATE_CHECK; //'/Customer/SelfCustom/CustomerCompanyDuplicateChecking'
    public static CUSTOM_CUST_COY_PAGE = "/" + PathConstant.LR_CUST + "/" + PathConstant.CUSTOM_CUST_COY_PAGE; //'/Customer/CustomerCompany/Page'
    public static SELF_CUSTOM_BOUWHEER_PAGING = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_BOUWHEER_PAGING; //'/Customer/SelfCustom/Bouwheer/Paging'
    public static SELF_CUSTOM_BOUWHEER_DETAIL = "/" + PathConstant.LR_CUST + "/" + PathConstant.SELF_CUSTOM_BOUWHEER_DETAIL; //'/Customer/SelfCustom/Bouwheer/Detail'
    public static SELF_CUSTOM_BENEFICIARY_OWNER = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER; //'/Customer/SelfCustom/BeneficiaryOwner'
    public static SELF_CUSTOM_BENEFICIARY_OWNER_ADD_EDIT = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER_ADD_EDIT; //'/Customer/SelfCustom/BeneficiaryOwner/AddEdit'
    public static SELF_CUSTOM_BENEFICIARY_OWNER_PERSONAL_DUPLICATE_CHECK = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER_PERSONAL_DUPLICATE_CHECK; //'/Customer/SelfCustom/BeneficiaryOwnerPersonalDuplicateChecking'
    public static SELF_CUSTOM_BENEFICIARY_OWNER_COMPANY_DUPLICATE_CHECK = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER_COMPANY_DUPLICATE_CHECK; //'/Customer/SelfCustom/BeneficiaryOwnerCompanyDuplicateChecking'

    //#endregion

    //#region Document Management
    public static DOC_MNGMNT_RACK_PAGING = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.RACK_PAGING; //'/DocumentManagement/Rack/Paging'
    public static DOC_MNGMNT_RACK_ADD_EDIT = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.RACK_ADD_EDIT; //'/DocumentManagement/Rack/AddEdit'
    public static DOC_MNGMNT_FILING_PAGING = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.FILING_PAGING; //'/DocumentManagement/Filing/Paging'
    public static DOC_MNGMNT_FILING_ADD_EDIT = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.FILING_ADD_EDIT; //'/DocumentManagement/Filing/AddEdit'
    public static DOC_MNGMNT_CABINET_PAGING = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.CABINET_PAGING; //'/DocumentManagement/Cabinet/Paging'
    public static DOC_MNGMNT_CABINET_ADD_EDIT = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.CABINET_ADD_EDIT; //'/DocumentManagement/Cabinet/AddEdit'
    public static DOC_MNGMNT_VIEW_RACK = "/" + PathConstant.LR_DOC_MNGMNT + "/" + PathConstant.VIEW_RACK; //'/DocumentManagement/ViewRack'
    public static DOC_MNGMNT_VIEW_CABINET = "/" + PathConstant.CR_DOC_MNGMNT_VIEW + "/" + PathConstant.VIEW_CABINET; //'//DocumentManagementView/ViewCabinet'
    //#endregion

    //#region JOURNAL
    public static JOURNAL_MEDIA_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_PAGING;
    public static JOURNAL_MEDIA_DETAIL = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_DETAIL;
    public static JOURNAL_MEDIA_HEADER_FACT = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_HEADER_FACT;
    public static JOURNAL_MEDIA_GROUP = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_GROUP;
    public static JOURNAL_MEDIA_GROUP_FACT = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_GROUP_FACT;
    public static JOURNAL_MEDIA_GROUP_ITEM_VALUE = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_MEDIA_GROUP_ITEM_VALUE;
    public static JOURNAL_RESULT = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_RESULT;
    public static FAILED_JOURNAL_RESULT_LIST_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.FAILED_JOURNAL_RESULT_LIST_PAGING;
    public static SELF_CUSTOM_FAILED_JOURNAL_RESULT_LIST_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.SELF_CUSTOM_FAILED_JOURNAL_RESULT_LIST_PAGING;
    public static JOURNAL_RECONCILE_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.JOURNAL_RECONCILE_PAGING;
    public static UPLOAD_JOURNAL_FILE_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.UPLOAD_JOURNAL_FILE_PAGING;
    public static SELF_CUSTOM_UPLOAD_JOURNAL_FILE_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.SELF_CUSTOM_UPLOAD_JOURNAL_FILE_PAGING;
    public static UPLOAD_JOURNAL_FILE_DETAIL = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.UPLOAD_JOURNAL_FILE_DETAIL;
    public static CUSTOM_JOURNAL_MEDIA_PAGING = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_PAGING;
    public static CUSTOM_JOURNAL_MEDIA_GROUP = "/" + PathConstant.LR_JOURNAL + "/" + PathConstant.SELF_CUSTOM_JOURNAL_MEDIA_GROUP;
    //#endregion

    //#region License
    public static LICENSE_PAGING = "/" + PathConstant.LR_LICENSE + "/" + PathConstant.PAGING;
    public static UPLOAD_LICENSE = "/"+ PathConstant.LR_LICENSE + "/" + PathConstant.UPLOAD_LICENSE;
    public static DETAIL_LICENSE = "/"+ PathConstant.LR_LICENSE + "/" + PathConstant.DETAIL_LICENSE;
    //#endregion

    //#region PEFINDO View
    public static VIEW_PEFINDO = PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO; //'/View/Pefindo'
    public static PEFINDO_SUBJECT_INFO_PERSONAL = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_SUBJECT_INFO_PERSONAL;  //'/View/Pefindo/SubjectInfoPersonal'
    public static PEFINDO_SUBJECT_INFO_COMPANY = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_SUBJECT_INFO_COMPANY;  //'/View/Pefindo/SubjectInfoCompany'
    public static PEFINDO_MO_SUMMARY = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_MO_SUMMARY;  //'/View/Pefindo/MoSummary'
    public static PEFINDO_PEFINDO_SCORE = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_PEFINDO_SCORE;  //'/View/Pefindo/PefindoScore'
    public static PEFINDO_CONTRACTS = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_CONTRACTS; //'/View/Pefindo/Contracts'
    public static PEFINDO_PEFINDO_ALERT_QUEST = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_PEFINDO_ALERT_QUEST; //'/View/Pefindo/PefindoAlertQuest'
    public static PEFINDO_SECURITIES = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_SECURITIES; //'/View/Pefindo/Securities'
    public static PEFINDO_OTHER_LIABILITIES = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_OTHER_LIABILITIES; //'/View/Pefindo/OtherLiabilities'
    public static PEFINDO_INVOLVEMENTS = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_INVOLVEMENTS; //'/View/Pefindo/Involvements'
    public static PEFINDO_RELATIONS = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_RELATIONS; //'/View/Pefindo/Relations'
    public static PEFINDO_INQUIRIES = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_INQUIRIES; //'/View/Pefindo/Inquiries'
    public static PEFINDO_DISPUTES = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_DISPUTES; //'/View/Pefindo/Disputes'
    public static PEFINDO_FINANCIAL_STATEMENTS = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_FINANCIAL_STATEMENTS; //'/View/Pefindo/FinancialStatements'
    public static PEFINDO_OTHERS = "/" + NavigationConstant.VIEW_PEFINDO + "/" + PathConstant.VIEW_PEFINDO_OTHERS; //'/View/Pefindo/Others'

    public static SELF_CUSTOM_VIEW_PEFINDO_VIEW = "/" + NavigationConstant.SELF_CUSTOM_VIEW_PEFINDO + "/" + PathConstant.SELF_CUSTOM_VIEW_PEFINDO_VIEW; //View/SelfCustomPefindo/SelfCustom/Pefindo'
    //#endregion

    //#region System User
    public static SYS_USER = "/" + PathConstant.LR_SYS_USER; //'SystemUser/
    public static SYS_USER_PAGING =  "/" + PathConstant.LR_SYS_USER + "/" + PathConstant.PAGING;
    public static SYS_USER_DETAIL =  "/" + PathConstant.LR_SYS_USER + "/" + PathConstant.DETAIL;
    public static SYS_DETAIL = "/" + PathConstant.LR_SYS_USER + "/" + PathConstant.DETAIL; //'/Employee/Detail'
    //#endregion

    //#region Notif Engine
    public static NOTIF_ENGINE_TEMPLATE_PAGING =  "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_TEMPLATE + "/" + PathConstant.PAGING;
    public static NOTIF_ENGINE_TEMPLATE_ADD_EDIT = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_TEMPLATE + "/" + PathConstant.ADD_EDIT;
    public static NOTIF_ENGINE_TEMPLATE_ATTR_PAGING =  "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_ATTR_TEMPLATE + "/" + PathConstant.PAGING;
    public static NOTIF_ENGINE_TEMPLATE_ATTR_ADD_EDIT = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_ATTR_TEMPLATE + "/" + PathConstant.ADD_EDIT;
    public static NOTIF_ENGINE_BROADCAST_PAGING =  "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_BROADCAST + "/" + PathConstant.PAGING;
    public static NOTIF_ENGINE_BROADCAST_ADD_EDIT = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_BROADCAST + "/" + PathConstant.ADD_EDIT;
    public static NOTIF_ENGINE_NOTIF_SOURCE_PAGING = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_SOURCE + "/" + PathConstant.PAGING;
    public static NOTIF_ENGINE_NOTIF_SOURCE_ADD_EDIT = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_SOURCE + "/" + PathConstant.ADD_EDIT;
    public static NOTIF_ENGINE_NOTIF_ATTR_TEMPLATE_MAPPING_SOURCE = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_SOURCE + "/" + PathConstant.NOTIF_ATTR_TEMPLATE_MAPPING;
    public static NOTIF_ENGINE_NOTIF_ATTR_TEMPLATE_MAPPING_SOURCE_DETAIL = "/" + PathConstant.LR_NOTIF_ENGINE + "/" + PathConstant.NOTIF_SOURCE + "/" + PathConstant.NOTIF_ATTR_TEMPLATE_MAPPING + "/" + PathConstant.ADD_DETAIL;
    //#endregion


    //#region CREDIT INS
    public static CREDIT_INS_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.PAGING;
    public static CREDIT_INS_ADD = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.ADD;
    public static CREDIT_INS_BRANCH_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.PAGING;
    public static CREDIT_INS_BRANCH_ADD_EDIT = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.ADD_EDIT;
    public static CREDIT_INS_GROUP_PAGING = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.GROUP + "/" + PathConstant.PAGING;
    public static CREDIT_INS_GROUP_ADD_EDIT = "/" + PathConstant.LR_VENDOR + "/" + PathConstant.VENDOR_CREDIT_INS + "/" + PathConstant.GROUP + "/" + PathConstant.ADD_EDIT;

    //#endregiom


    public static OFFICE_MEMBER_PAGING_TEST = "/BREAD/Officeareamember";

    //#region Bank Charge
    public static CS_BANK_CHARGE_PAGING_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_BANK_CHARGE_PAGING_X; //'/CommonSetting/BankCharge/Paging'
    public static CS_BANK_CHARGE_DETAIL_X = "/" + PathConstant.LR_COMMON_SETTING + "/" + PathConstantX.CS_BANK_CHARGE_DETAIL_X; //'/CommonSetting/BankCharge/Detail'
    //#endregion

    // #region Vendor Funding Company
    public static VENDOR_FUNDING_COY_PAGING_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_FUNDING_COY_PAGING_X;
    public static VENDOR_FUNDING_COY_ADD_EDIT_X = "/" + PathConstant.LR_VENDOR + "/" + PathConstantX.VENDOR_FUNDING_COY_ADD_EDIT_X;
    // #endregion
}
