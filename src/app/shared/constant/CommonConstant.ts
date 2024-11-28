
export class CommonConstant {

    // REGEX
    public static regexAPI = "\\/[v,V][1-9]\\d*(\\.[1-9]\\d*)*";
    public static regexEmail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
    public static regexMultipleEmail = "^(([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)(\s*;\\s*|\\s*$))+$";
    public static regexSpace = "^[^ ]*$";

    // MODULE
    public static MODULE_FOU = "FOU";
    public static MODULE_LOS = "LOS";
    public static MODULE_LMS = "LMS";
    public static MODULE_AMS = "AMS";
    public static MODULE_CMS = "CMS";

    // MODE
    public static MODE_ADD = "ADD";
    public static MODE_EDIT = "EDIT";

    // APPLICATION DATA
    public static USER_ACCESS = "UserAccess";
    public static USER_NAME = "UserName";
    public static BUSINESS_DT = "BusinessDt";
    public static BUSINESS_DATE = "BusinessDate";
    public static BUSINESS_DATE_RAW = "BusinessDateRaw";
    public static CURRENT_USER_CONTEXT = "currentUserContext"
    public static PAGE_ACCESS = "PageAccess";
    public static TOKEN = "XSRF-TOKEN";
    public static JWT_TOKEN = "jtoken";
    public static VERSION = "Version";
    public static LAST_ACCESS_TIME = "LastAccessTime";
    public static MENU = "Menu"
    public static ReturnObj = 'ReturnObject';
    public static Status = 'Status';
    public static ENVIRONMENT_MODULE = 'EnvironmentModule';
    public static OFFICE_CODE = 'OfficeCode';
    public static ROLE_CODE = 'RoleCode';

    //SYS CTRL COY KEY
    public static IsEodRun = "IsEodRun";

    //CUST MAIN DATA MODE
    public static CustMainDataModeCust = "CUST";
    public static CustMainDataModeFamily = "FAMILY";
    public static CustMainDataModeMgmntShrholder = "SHAREHOLDER";

    //CUST PAGE FROM
    public static CustFromEditMainData = "EditMainData";
    public static CustFromCustFamily = "CustFamily";
    public static CustFromCustShareholder = "CustShareholder";

    //CUST MAIN Page Type
    public static CustPageTypeHeader = "HEADER";
    public static CustPageTypeDupCheck = "DUP_CHECK";
    public static CustPageTypePaging = "PAGING";

    // Customer Type
    public static CustomerPersonal = "PERSONAL";
    public static CustomerCompany = "COMPANY";
    public static CustomerPublic = "PUBLIC";

    public static MR_MARITAL_STAT_CODE_MARRIED = "MARRIED";
    public static MR_MARITAL_STAT_CODE_SINGLE = "SINGLE";
    public static MR_MARITAL_STAT_CODE_WIDOW = "WIDOW";
    public static MR_CUST_TYPE_CODE_PERSONAL = "PERSONAL";
    public static MR_CUST_TYPE_CODE_COMPANY = "COMPANY";

    // BOOLEAN CONDITION
    public static TRUE_CONDITION = "1";
    public static FALSE_CONDITION = "0";
    public static TRUE = "true";
    public static FALSE = "false";

    // VENDOR CATEGORY
    public static SUPPLIER = "SUPPLIER"
    public static ASSET_INSCO_BRANCH = "ASSET_INSCO_BRANCH";
    public static LIFE_INSCO_BRANCH = "LIFE_INSCO_BRANCH";
    public static SURVEYOR_BRANCH = "SURVEYOR_BRANCH";
    public static AGENCY_COMPANY = "AGENCY_COMPANY";
    public static AGENCY_PERSONAL = "AGENCY_PERSONAL";
    public static ASSET_INSCO_HO = "ASSET_INSCO_HO";
    public static LIFE_INSCO_HO = "LIFE_INSCO_HO";
    public static CRD_INSCO_HO = "CRD_INSCO_HO";
    public static CRD_INSCO_BRANCH = "CRD_INSCO_BRANCH";
    public static SUPPLIER_HO = "SUPPLIER_HO";
    public static SURVEYOR_HO = "SURVEYOR_HO";
    public static SUPPLIER_HOLDING = "SUPPLIER_HOLDING";
    public static SUPPLIER_ATPM = "SUPPLIER_ATPM";
    public static COLL_COMPANY = "COLL_COMPANY";
    public static NOTARY_COMPANY = "NOTARY_COMPANY";
    public static AUCTION_COMPANY = "AUCTION_COMPANY";
    public static NOTARY_PERSONAL = "NOTARY_PERSONAL";
    public static NOTARY = "NOTARY";
    public static CUSTODY = "CUSTODY";
    public static CUSTODY_COMPANY = "CUSTODY_COMPANY";
    public static CUSTODY_PERSONAL = "CUSTODY_PERSONAL";
    public static VENDOR_CATEGORY_GENERAL = "VENDOR_CATEGORY_GENERAL";
    public static CONSULTANT = "CONSULTANT";
    public static LOGISTIC = "LOGISTIC";
    public static COURIER = "COURIER";
    public static IT_INFRA_SOLUTION = "IT_INFRA_SOLUTION";
    public static JF_FUNDING_COMPANY = "JF_FUNDING_COMPANY";
    public static TL_FUNDING_COMPANY = "TL_FUNDING_COMPANY";

    public static TITLE_SUPPLIER_ATPM = "Supplier ATPM";
    public static TITLE_SUPPLIER_BRANCH = "Supplier";
    public static TITLE_ASSET_INSCO_BRANCH = "Insurance Branch";
    public static TITLE_LIFE_INSCO_BRANCH = "Life Insurance Branch";
    public static TITLE_SURVEYOR_BRANCH = "Surveyor Branch";
    public static TITLE_AGENCY_COMPANY = "Agency Company";
    public static TITLE_AGENCY_PERSONAL = "Agency Personal";
    public static TITLE_COLL_COMPANY = "Collection Company";

    public static MASTER_AUTO_GNRT_CODE_SUPPLIER = "SB";
    public static MASTER_AUTO_GNRT_CODE_AGENCY_COMPANY = "AGC";
    public static MASTER_AUTO_GNRT_CODE_AGENCY_PERSONAL = "AGP";

    // VENDOR TYPE
    public static VENDOR_TYPE_COMPANY = "C";
    public static VENDOR_TYPE_PERSONAL = "P";

    //VENDOR GRADING PROCESS
    public static VENDOR_GRADING_STATUS_REQ = "REQ";
    public static VENDOR_GRADING_STATUS_RJC = "RJC";
    public static VENDOR_GRADING_STATUS_APV = "APV";
    public static VENDOR_GRADING_STATUS_EXE = "EXE";
    public static VENDOR_GRADING_APV = "VENDOR_GRADING_APV";

    //VENDOR EMP POSITION
    public static VENDOR_EMP_POSITION_SUPERVISOR = "SUPERVISOR";

    // NOTIFICATION METHOD
    public static NOTIF_METHOD_INT_LINK = "INT_LINK";
    public static NOTIF_METHOD_EXT_LINK = "EXT_LINK";

    //OFFICE TYPE
    public static HeadOffice = "HO";
    public static SuperUser = "SUPUSR";
    public static CollectionGroup = "CG";
    public static ATPM = "ATPM";
    public static Holding = "HOLDING";
    public static Branch = "BRANCH";

    //REF PROV DISTRICT
    public static RefProvDistrictTypeDis = "DIS";
    public static RefProvDistrictTypePrv = "PRV";

    // REF MASTER TYPE
    public static RefMasterTypeCodeSourceIncome = "SOURCE_OF_INCOME";
    public static RefMasterTypeCodeCustCompanyRelationship = "CUST_COMPANY_RELATIONSHIP";
    public static RefMasterTypeCodeCustPersonalRelationship = "CUST_PERSONAL_RELATIONSHIP";
    public static RefMasterTypeCodeCustRelationship = "CUST_RELATIONSHIP";
    public static RefMasterTypeCodeCustType = "CUST_TYPE";
    public static RefMasterTypeCodeShareholderCustType = "SHR_TYPE";
    public static RefMasterTypeCodeLegalDocType = "LEGAL_DOC_TYPE";
    public static RefMasterTypeCodeCustAddrType = "CUST_ADDR_TYPE";
    public static RefMasterTypeCodeAddrType = "ADDR_TYPE";
    public static RefMasterTypeCodeJobPosition = "JOB_POSITION";
    public static RefMasterTypeCodeGender = "GENDER";
    public static RefMasterTypeCodeCustModel = "CUST_MODEL"
    public static RefMasterTypeCodeInvestmentType = "INVESTMENT_TYPE"
    public static RefMasterTypeCodeCompanyType = "COMPANY_TYPE";
    public static RefMasterTypeCodeIdType = "ID_TYPE";
    public static RefMasterTypeCodeIdTypeCompany = "ID_TYPE_COMPANY";
    public static RefMasterTypeCodeNationality = "NATIONALITY";
    public static RefMasterTypeCodeMaritalStat = "MARITAL_STAT";
    public static RefMasterTypeCodeEducation = "EDUCATION";
    public static RefMasterTypeCodeReligion = "RELIGION";
    public static RefMasterTypeCodeSalutation = "SALUTATION";
    public static RefMasterTypeCodeJobStat = "JOB_STAT"
    public static RefMasterTypeCodeCoyScale = "COY_SCALE"
    public static RefMasterTypeCodeNegCustType = "NEG_CUST_TYPE";
    public static RefMasterTypeCodeNegCustSource = "NEG_CUST_SOURCE";
    public static RefMasterTypeCodeSkillLvl = "SKILL_LVL"
    public static RefMasterTypeCodeOfficeClass = "OFFICE_CLASS";
    public static RefMasterTypeCodeOfficeType = "OFFICE_TYPE";
    public static RefMasterTypeCompanyScale = "COMPANY_SCALE";
    public static RefMasterTypeCodeCenterGrpType = "CENTER_GRP_TYPE";
    public static RefMasterTypeCodeKonvenSyariah = "KONVEN_SYARIAH";
    public static RefMasterTypeCodeNegAssetSource = "NEG_ASSET_SOURCE";
    public static RefMasterTypeCodeAssetTypeId = "ASSET_TYPE_ID";
    public static RefMasterTypeCodeNotificationType = "NOTIFICATION_TYPE";
    public static RefMasterTypeCodeNotificationMethod = "NOTIFICATION_METHOD";
    public static RefMasterTypeCodeVendorPosition = "VENDOR_POSITION";
    public static RefMasterTypeCodeTaxCalcMethod = "TAX_CALC_METHOD";
    public static RefMasterTypeCodeVendorCategory = "VENDOR_CATEGORY";
    public static RefMasterTypeCodeMaxRefundType = "MAX_REFUND_TYPE";
    public static RefMasterTypeCodeAssgmntType = "ASSGMNT_TYPE";
    public static RefMasterTypeCodeSupplierClass = "SUPPLIER_CLASS";
    public static RefMasterTypeCodeSupplierUpCalcMethod = "SUPPLIER_UP_CALC_METHOD";
    public static RefMasterTypeCodeVendorType = "VENDOR_TYPE";
    public static RefMasterTypeCodeIdTypeVendor = "ID_TYPE_VENDOR";
    public static RefMasterTypeCodeIdTypeVendorCompany = "ID_TYPE_VENDOR_COMPANY";
    public static RefMasterTypeCodeTaskAssignmentType = "TASK_ASSIGNMENT_TYPE";
    public static RefMasterTypeCodeScoreTrxType = "SCORE_TRX_TYPE";
    public static RefMasterTypeCodeAttrInputType = "ATTR_INPUT_TYPE";
    public static RefMasterTypeCodeNotifTemplAttrInputType = "NOTIF_TEMPL_ATTR_INPUT_TYPE";
    public static RefMasterTypeCodeRegularExpression = "REGULAR_EXPRESSION";
    public static RefMasterTypeCodeAttributeGroup = "ATTRIBUTE_GROUP";
    public static RefMasterTypeCodeBuildingOwnership = "BUILDING_OWNERSHIP";
    public static RefMasterTypeCodeMonth = "MONTH";
    public static RefMasterTypeCodeFormClass = "FORM_CLASS";
    public static RefMasterTypeCodeNotificationLevel = "NOTIFICATION_LEVEL";
    public static RefMasterTypeCodeNotificationTypes = "NOTIFICATION_TYPES";
    public static RefMasterTypeCodeNotificationSource = "NOTIFICATION_SOURCE";

    public static RefMasterTypeCodeNotificationTypesSms = "SMS";
    public static RefMasterTypeCodeNotificationTypesWA = "WHATSAPP";
    public static RefMasterTypeCodeNotificationTypesEmail = "EMAIL";
    public static RefMasterTypeCodeNotificationTypesPush = "PUSH_NOTIFICATION";


    public static RefMasterTypeCodeEntityType = "ENTITY_TYPE";
    public static RefMasterTypeCodeEntityTypePayAlloc = "PAY_ALLOC";
    public static RefMasterTypeCodeEntityTypeInsuranceCompany = "INSCOY";
    public static RefMasterTypeCodeEntityTypeLifeInsuranceCompany = "LIFEINSCOY";
    public static RefMasterTypeCodeEntityTypeBankAcc = "BANK_ACC";
    public static RefMasterTypeCodeEntityTypeSuppl = "SUPPL";
    public static RefMasterTypeCodeEntityTypeOffice = 'OFFICE';
    public static RefMasterTypeCodeEntityTypeFunding = "FUNDING";

    public static RefMasterTypeCodePublicType = "PUBLIC_TYPE";
    public static RefMasterTypeCodePositionSlik = "POSITION_SLIK";
    public static RefMasterTypeCodeAppSrcType = "APP_SRC_TYPE";
    public static RefMasterTypeCodeCustDocType = "CUST_DOC_TYPE";
    public static RefMasterTypeCodeVendorCollCompanyPosition = "VENDOR_COLL_COMPANY_POSITION";
    public static RefMasterTypeCodeVendorCategoryGeneral = "VENDOR_CATEGORY_GENERAL";
    public static RefMasterTypeCodeCbasSlikPurposeCode = "CBAS_SLIK_PURPOSE_CODE";

    public static RefMasterTypeCodePefindoInquiryReason = "PEFINDO_INQUIRY_REASON";
    
    //MASTER CODE
    public static MasterCodeCustDocTypeSpouseId = "APGEN03";

    // NATIONALITY CODE
    public static NationalityCodeLocal = "LOCAL"

    // GENERAL SETTING CODE
    public static GSCodeDefLocalNationality = "DEF_LOCAL_NATIONALITY";
    public static GsCodePasswordRegex = "PASSWORD_REGEX";
    public static GSCodeIsShowCbxBorrow = "IS_SHOW_CBX_BORROW";
    public static GSCodeIsShowCbxPledge = "IS_SHOW_CBX_PLEDGE";
    public static GSCodeListLegalDocCantDuplicate = "LIST_LEGAL_DOC_CANNOT_DUPLICATE";
    public static GSCodeIsUseDigitalization = "IS_USE_DIGITALIZATION";
    public static GSCodeDefSeparatorDDLVerfQuest = "DEF_SEPARATOR_DDL_VERF_QUEST";
    public static GSCodeRegexDDLSeparator = "REGEX_DDL_SEPARATOR";
    public static GSCodeFilterAddr = "FILTER_ADDR";
    public static GSCodeMaxHierarchyLvlOffice = "MAX_HIERARCHY_LVL_OFFICE";
    public static GSCodeOwnershipMandatoryAddrType = "OWNERSHIP_MANDATORY_BY_ADDR_TYPE";
    public static GSCodeVATForPersonal = "VAT_FOR_PERSONAL";
    public static GSCodeIsUseNotification = "IS_USE_NOTIFICATION";
    public static GSCodeTakeTopXNotification = "TAKE_TOP_X_NOTIFICATION";

    public static GSCodeCoyMandatoryLegalDocs = "COY_MANDATORY_LEGAL_DOCS";
    public static GSCodeCustAgeLimit = "CUST_AGE_LIMIT";
    public static GsCodeMaxAssetQtyValue = "MAX_ASSET_QUANTITY_VALUE";
    public static GsPefindoMultiResultMax = "PEFINDO_MULTI_RESULT_MAX";
    public static GsDefPefindoGraphCntrctYears = "DEF_PEFINDO_GRAPH_CNTRCT_YEARS";
    public static GsInqPefindoCustReq = "INQ_PEFINDO_CUST_REQ";
    public static GsCodeIdTypeExpDtRequired = "ID_TYPE_EXP_DT_REQUIRED";
    public static GsCodeIdTypeExpDtReadonly = "ID_TYPE_EXP_DT_READONLY";
    public static GsCodeEmailAttachmentFormat = "EMAIL_ATTCHMNT_FORMAT";
    public static GsCodeEmailAttachmentMaxSize = "EMAIL_ATTCHMNT_MAX_SIZE";
    public static GsCodeNDayWarningExpiredUser = "N_DAY_WARNING_EXPIRED_USER";

    // WNA COUNTRY CODE
    public static WnaCountryCodeIdn = "IDN";

    // CUST TYPE
    public static CustTypePersonal = "PERSONAL";
    public static CustTypeCompany = "COMPANY";

    // CUST GENDER
    public static GENDER_MALE = "MALE";
    public static GENDER_FEMALE = "FEMALE";

    // CUST ADDR TYPE
    public static CustAddrTypeLegal = "LEGAL";
    public static CustAddrTypeContact = "CONTACT";
    public static CustAddrTypeContactInfo = "Contact Info";
    public static CustAddrTypeCompany = "COMPANY";
    public static CustAddrTypeResidence = "RESIDENCE";
    public static CustAddrTypeEmergency = "EMERGENCY";
    public static CustAddrTypeJob = "JOB";
    public static CustAddrTypeOthBiz = "OTH_BIZ";
    public static CustAddrTypePreJob = "PREV_JOB";
    public static CustAddrTypeBiz = "BIZ";

    // CUST ADDR TYPE DESC
    public static CustAddrJob = "Job";
    public static CustAddrPreJob = "Previous Job";
    public static CustAddrOthBiz = "Other Business";

    // ADDR TYPE
    public static AddrTypeLegal = "LEGAL";
    public static AddrTypeTax = "TAX";

    public static FROM = 'From';
    public static TO = 'To';
    public static BETWEEN = 'In Between';

    public static GTE = "Greater Than Equal";
    public static GT = "Greater Than";
    public static LTE = "Less Than Equal";
    public static LT = "Less Than";

    //Status Code
    public static STATUS_CODE_USER_LOCKED = "002";

    //Attribute Type Code
    public static AttrTypeCodeMaster = "MASTER";

    //Martial Status
    public static MasteCodeMartialStatsMarried = "MARRIED";

    //Relationship Code
    public static MasteCodeRelationshipSpouse = "SPOUSE";

    // ID TYPE
    public static MrIdTypeCodeEKTP = "EKTP";
    public static MrIdTypeCodeSIM = "SIM";
    public static MrIdTypeCodeKITAS = "KITAS";
    public static MrIdTypeCodeNPWP = "NPWP";
    public static MrIdTypeCodeAKTA = "AKTA";
    public static AttrGroupCustCompanyFinData = "CUST_COMPANY_FINDATA"
    public static AttrGroupCustPersonalFinData = "CUST_PERSONAL_FINDATA"
    public static AttrGroupCustCompanyOther = "CUST_COMPANY_OTH"
    public static AttrGroupCustPersonalOther = "CUST_PERSONAL_OTH"
    public static AttrGroupAsset = "ASSET";
    public static AttrGroupCustPersonalFinDataIncome = "CUST_PERSONAL_FINDATA_INCOME"
    public static AttrGroupCustPersonalFinDataExpense = "CUST_PERSONAL_FINDATA_EXPENSE"
    public static AttrGroupCustPersonalFinDataOther = "CUST_PERSONAL_FINDATA_OTHER"
    public static AttrGroupCustCompanyFinDataIncome = "CUST_COMPANY_FINDATA_INCOME"
    public static AttrGroupCustCompanyFinDataExpense = "CUST_COMPANY_FINDATA_EXPENSE"
    public static AttrGroupCustCompanyFinDataOther = "CUST_COMPANY_FINDATA_OTHER"

    // Integration
    public static DailyMasterTypeSingle = "Date";
    public static DailyMasterTypeRange = "Range";

    // CUST MODEL
    public static CUST_MODEL_EMP = "EMP";
    public static CUST_MODEL_PROF = "PROF";
    public static CUST_MODEL_SME = "SME";
    public static CUST_MODEL_SMETBU = "SMETBU";
    public static CUST_MODEL_SMEBU = "SMEBU";
    public static CUST_MODEL_NONPROF = "NONPROF";

    // LOB
    public static FL4W = "FL4W";
    public static CF4W = "CF4W";
    public static FCTR = "FCTR";
    public static CFRFN4W = "CFRFN4W";
    public static CFRFN = "CFRFN";
    public static CFNEWCAR = "CFNEWCAR";
    public static CFNA = "CFNA";

    //ATTR CODE
    public static AttrCodeDeptAml = "RS.DEPT_AML";
    public static AttrCodeAuthAml = "AUTH_AML";

    //outputChange
    public static CUST_CHANGE_PROFESSION = "PROFESSION";

    //ATTR Input Type
    public static AttrInputTypeDate = "D";
    public static AttrInputTypeNum = "N";
    public static AttrInputTypeNumPerc = "P";
    public static AttrInputTypeList = "L";
    public static AttrInputTypeSearchList = "SL";
    public static AttrInputTypeText = "T";
    public static AttrInputTypeTextArea = "TA";
    public static AttrInputTypeRefMaster = "RM";

    public static RefMasterTypeCustAsset = "CUST_ASSET_TYPE";
    //DMS
    public static DmsKey = "PHL7KV8RR0VG30K4";
    public static DmsIV = "0G7HFV96AVWXUQ51";
    public static DmsNoCust = "No Customer";
    public static DmsNoProject = "Project No";
    public static DmsNoApp = "No Application";
    public static DmsNoAgr = "No Agreement";
    public static DmsMouId = "Mou Id";
    public static DmsLeadId = "Lead Id";
    public static DmsOverideSecurity = "OverideSecurity";
    public static DmsOverideUpload = "Upload,Delete";
    public static DmsOverideView = "View";
    public static DmsOverideUploadView = "Upload,Delete,View";
    public static DmsOverideViewDownload = "View,Download";
    public static DmsOverideUploadDownloadView = "Upload,Delete,Download,View";
    public static DmsViewCodeCust = "ConfinsCust";
    public static DmsViewCodeProject = "Project";
    public static DmsViewCodeApp = "ConfinsApp";
    public static DmsViewCodeAgr = "ConfinsAgr";
    public static DmsViewCodeMou = "ConfinsMou";
    public static DmsViewCodeLead = "ConfinsLead";
    public static DmsViewCodeSurvey = "Survey";
    public static DmsSurveyId = "Survey Id";
    public static DmsTaskId = "Task Id";

    // Cust Type
    public static WhiteIndicator = "WHITE";
    public static NoData = "No Data";
    public static MaritalStatusMarried = "MARRIED";
    public static ExposureCustTypeCode = "CUST_EXPSR";
    public static ExposureCustGroupTypeCode = "CUST_GRP_EXPSR";
    public static ExposureObligorTypeCode = "CUST_OBLGR_EXPSR";
    public static CaptureStatReq = "REQ";
    public static CaptureStatScs = "SCS";
    public static CaptureStatFail = "FAIL";

    // Role Type
    public static RoleCustData = "CUST";
    public static RoleCustGrpData = "CUST_GRP";
    public static RoleFamilyData = "SPOUSE";
    public static RoleGuarantorData = "GUARANTOR";
    public static RoleShareholder = "SHAREHOLDER";

    //Sys Config
    public static ConfigCodeIsUseDms = "IS_USE_DMS";
    public static ConfigCodeDigitalizationSvcType = "DIGITALIZATION_SVC_TYPE";
    public static JOURNAL_STAT_EXE_DESCR = "EXECUTED";
    public static VENDOR_GRD_SUPPL_BRC_APV_TYPE = "VENDOR_GRD_SUPPL_BRC_APV_TYPE";
    public static GS_IS_CUST_THIRD_PARTY_CHECK = "IS_CUST_THIRD_PARTY_CHECK";
    public static GS_MAX_DAYS_CUST_THIRD_PARTY_CHECK = "MAX_DAYS_CUST_THIRD_PARTY_CHECK";
    public static GS_SHAREHOLDER_JOB_POSITION_IS_OWNER = "SHAREHOLDER_JOB_POST_IS_OWNER";

    public static SCHM_CODE_APV_HO_ACT_SCHM = "APV_HO_ACT_SCHM";
    public static SCHM_CODE_APV_HO_DEACT_SCHM = "APV_HO_DEACT_SCHM";
    public static SCHM_CODE_APV_OFR_ACT_SCHM = "APV_OFR_ACT_SCHM";
    public static SCHM_CODE_APV_OFR_DEACT_SCHM = "APV_OFR_DEACT_SCHM";
    public static VENDOR_GRD_SUPPL_BRC_SCHM = "VENDOR_GRD_SUPPL_BRC_SCHM"


    public static CAT_CODE_PRD_HO_APV = "PRD_HO_APV";
    public static CAT_CODE_PRD_HO_DEACT_APV = "PRD_HO_DEACT_APV";
    public static CAT_CODE_PRD_OFR_APV = "PRD_OFR_APV";
    public static CAT_CODE_VENDOR_GRADING_APV = "VENDOR_GRADING_APV";

    public static CAT_CODE_PRD_OFR_DEACT_APV = "PRD_OFR_DEACT_APV";
    public static PRD_HO_APV_TYPE = "PROD_HO_APV_TYPE";
    public static PRD_HO_DEACT_APV_TYPE = "PROD_HO_DEACT_APV_TYPE";
    public static PRD_OFR_APV_TYPE = "PROD_OFR_APV_TYPE";
    public static PRD_OFR_DEACT_APV_TYPE = "PROD_OFR_DEACT_APV_TYPE";

    //Surveyor
    public static EXTERNAL_SURVEYOR = "EXTERNAL_SURVEYOR";

    // JOURNAL
    public static RefMasterTypeCodeJournalHeaderFactType = "H_FACT_TYPE";

    // JOIN TYPE
    public static JOIN_TYPE_INNER = "Inner";

    //WORKFLOW
    public static WorkflowUploadNegativeAsset = "WF_UPL_NAS";
    public static WfUploadNegativeAssetReview = "UPLOAD_NAS_REVIEW";
    public static WorkflowUploadNegativeCustomer = "WF_UPL_NEG_CUST";
    public static WfUploadNegativeCustomerReview = "UPLOAD_NEG_CUST_REVIEW";
    public static WorkflowUploadAssetMaster = "WF_UPL_ASM";
    public static WfUploadAssetMasterReview = "UPLOAD_ASM_REVIEW";
    public static WF_CODE_UPD_CUST_MANUAL = "WF_UPD_CUST_MANUAL";
    public static ACT_CODE_UPD_CUST_DATA = "UPD_CUST_DATA";

    //STATUS GRP
    public static StatusGrpVerfResultStat = "VERF_RESULT_STAT";
    public static VerfResultStatSuccess = "SCS";
    public static VerfTrxTypeCodeSurvey = "SURVEY_VERIF";
    public static VerfResultStatCodeNew = "NEW";

    //REF VERF ANSWER_TYPE
    public static VerfAnswerTypeCodeDdl = "DDL";
    public static VerfAnswerTypeCodeUcInputNumber = "UC_INPUT_NUMBER";

    //VERF RESULT
    public static VerfResultPhnTypeMobile = "MOBILEPHN";
    public static CurrencyMaskPrct = { suffix: ' %', thousands: ',', decimal: '.', align: 'right', allowNegative: false, allowZero: true, precision: 6, nullable: false };
    //MASTER SEQUENCE

    public static MasterSequenceCodeCustomerThirdParty = "CTP";

    //TRUSTING SOCIAL
    public static TrustingSocialRelationCust = "Customer";
    public static TrustingSocialDummyIdType = "DUMMY";
    public static TrustingSocialDummyIdNo = "1234567890123456"

    //FILE EXTENSION
    public static FileExtensionDoc = ".doc";
    public static FileExtensionDocx = ".docx";
    public static FileExtensionPdf = ".pdf";
    public static FileExtensionJpg = ".jpg";
    public static FileExtensionJpeg = ".jpeg";
    public static FileExtensionGif = ".gif";
    public static FileExtensionPng = ".png";
    public static FileExtensionBmp = ".bmp";

    //DIGITALIZATION SVC TYPE CODE
    public static DigitalizationSvcTypeTrustingSocial = "TS";
    public static DigitalizationSvcTypePefindo = "PEFINDO";
    public static SvcTypeAsliRi = "IS_USE_ASLIRI";
    public static SvcTypeCbasSlik = "IS_USE_CBAS_SLIK";

    public static NegCustTypeGood = "GOOD";
    public static NegCustTypeBad = "BAD";
    public static NegCustTypeWarning = "WARNING";

    // SysCtrlCoy
    public static IsEODRun = "IsEODRun"
    // UI ROLEPICK
    public static IS_USE_NEW_ROLEPICK = "IS_USE_NEW_ROLEPICK";

    public static NOTIF_TYPE_EMAIL = "EMAIL";
    public static SEND_TYPE_ALL = "ALL";
    public static SEND_TYPE_SPECIFIC_USER = "SPECIFIC_USER";

    // RefAttrNotifTemplateInputType

    public static INPUT_TYPE_TEXT = "T";
    public static INPUT_TYPE_DATE = "D";
    public static INPUT_TYPE_PERCNT = "P";
    public static INPUT_TYPE_NUM = "N";

    //ASLI RI
    public static ASLI_RI_SELFIE = "PHOTO SELFIE";
    public static ASLI_RI_PROF = "ASLIRI_PROF";
    public static ASLI_RI_PHN_AGE = "ASLIRI_PHN_AGE";
    public static ASLI_RI_HOME_ADDR = "ASLIRI_HOME_ADDR";
    public static ASLI_RI_TAX_EXTRA = "ASLIRI_TAX_EXTRA";
    public static ASLI_RI_TAX_COY = "ASLIRI_TAX_COY";
    public static ASLI_RI_WORKPLACE = "ASLIRI_WORKPLACE";

    //Office
    public static MR_OFFICE_TYPE_CODE = "MrOfficeTypeCode";

    //Highlight Comment
    public static HIGHLIGHT_COMMENT = "HighlightComment";
    
    //Pefindo
    public static PEFINDO_TRX_SRC_DATA_STAT_REQ = "REQ";
    public static PEFINDO_TRX_SRC_DATA_STAT_INP = "INP";
    
    //
    public static MR_PAY_ALLOC_GRP_CODE_OFFICE = "OFFICE"
}
