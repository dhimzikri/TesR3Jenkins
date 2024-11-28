
export class ExceptionConstant {

    public static COPY_REPLACE_CONFIRMATION = "The copy will replace all existing";
    public static CODE_HAS_BEEN_USED = "Code Has Been Used";
    public static SAVE_SUCCESSED = "Save Successed";
    public static EDIT_SUCCESSED = "Edit Successed";
    public static DELETE_CONFIRMATION = "Are you sure to delete this record?";
    public static PLEASE_SELECT_MIN_1_ZIPCODE = "Please select at least one Zipcode";
    public static PLEASE_SELECT_MIN_1_OFFICE = "Please select at least one Office";
    public static PLEASE_COMPLETE_LEGAL_ADDRESS = "Please complete Legal Address First";
    public static STATEMENT_WITH_SAME_MONTH_AND_YEAR = "Cannot Input Statement With The Same Month and Year";
    public static WORKING_HOUR_CHECKING = 'Working Hour {0} {1} {2} Working Hour {3} {4}';
    public static WORKING_HOUR_FROM_CAN_NOT_BE_EMPTY_WHEN_THERE_IS_WORKING_HOUR_TO = 'Working Hour {0} {1} can not be empty when there is Working Hour {2} {3}';
    public static WORKING_HOUR_AT_DAY_MUST_COMPLETE = 'Please complete working hour at {0}';
    public static TOTAL_SHARE_LEFT = "Total Share left is ";
    public static TOTAL_SHARE_MUST_100 = "Total Share % must be 100%";
    public static TOTAL_SHARE_CAN_NOT_100 = "Total Share can not more than 100%";
    public static MUST_HAVE_PARENT = "Must Have Parent";
    public static PLEASE_COMPLETE_RESIDENCE_ADDRESS = "Please complete Residence Address First";
    public static PLEASE_COMPLETE_BIZ_ADDRESS = "Please complete Business Address First";
    public static PLEASE_COMPLETE_LEGAL_AND_RESIDENCE_ADDRESS = "Please complete Legal and Residence Address First";
    public static PLEASE_COMPLETE_LEGAL_AND_BIZ_ADDRESS = "Please Complete Legal and Business Address First";
    public static ADD_MIN_1_DATA = "Please select at least one Office";
    public static Add_Min_1_Owner = "Please Input at least 1 Owner";
    public static Add_Min_1_Active_Signer = "Please Input at least 1 Active Signer";
    public static JOIN_DATE_MUST_LESS_THAN_ = "Join Date Must Be Lesser Than ";
    public static START_DATE_MUST_EQUAL_OR_MORE_THAN = "Start Date must be equal or more than ";
    public static END_DATE_MUST_EQUAL_OR_MORE_THAN = "End Date must be equal or more than";
    public static CUST_EXPR_REQ = "Customer Exposure Still Request";
    public static PLEASE_SELECT_ONE = "Please select One";
    public static ALREADY_EXIST = "Already Exist";
    public static JOURNAL_ALREADY_EXECUTED = "Journal No {0} already executed";
    public static SELECT_ONE_JOURNAL = "Select at least 1 Journal to Rerun";
    public static RERUN_JOURNAL_FAILED = "Failed Rerun Journal";
    public static PEFINDO_DATA_NOT_FOUND = "There is no data in Pefindo";
    public static CAN_NOT_REQUEST_PEFINDO_MORE_THAN = "Can not request Pefindo more than"
    public static PLEASE_SELECT_MIN_1_PEFINDO_DATA = "Please select at least one Pefindo";
    public static PLEASE_CHOOSE_INQUIRY_REASON_FIRST = "Please choose Inquiry Reason first";

    public static PLEASE_INPUT_FIN_DATA = "Please input at least 1 Financial Data";

    public static CALC_FIRST = "Please Click Calculate";

    public static ERROR_NO_CALLBACK_SETTING = "System Error - No Callback Handler for {0} Callback Trigger";
    public static NOT_ELIGIBLE_FOR_TAKE_BACK = "You are not Eligible to Take Back this Task";
    public static NOT_ELIGIBLE_FOR_UNCLAIM = "You are not Eligible to Unclaim this Task";
    public static NOT_ELIGIBLE_FOR_HOLD = "You are not Eligible to Hold this Task";
    public static NOT_ELIGIBLE_FOR_PROCESS_TASK = "You are not Eligible to Process this Task";
    public static CUSTOMER_AGE_MUST_17_YEARS_OLD = "Customer age must be at least 17 year old";
    public static BIRTH_DATE_CANNOT_MORE_THAN_BUSINESS_DATE = "Birth Date can not be more than Business Date";
    public static ID_EXPIRED_DATE_CANNOT_LESS_THAN = "Id Expired Date can not be less than ";
    public static MUST_INPUT_SPOUSE_DATA = "Please Input Spouse Data in Family!";
    public static MUST_CHOOSE_SPOUSE_DATA = "Please Choose at least One Spouse Data!";

    public static PLEASE_FILL_BIZ_ADDRESS = "Please Copy / Fill Business Address First";
    public static PLEASE_FILL_RESIDENCE_ADDRESS = "Please Copy / Fill Residence Address First";
    public static CURR_DT_VALIDATION = "Currency Date can not > Business Date or < Max Back Date";
    public static MIN_1_ATTR_VALUE = "Minimal 1 Attribute Value";
    public static DUPL_ATTR_VALUE = "Duplicate Attribute Value";
    public static ISSUE_DT_MUST_LESS_EQ_THAN_BD = "Issue Date must be <= Business Date";
    public static EXP_DT_MUST_HIGHER_THAN_BD = "Expired Date must be > Business Date";
    public static DUPLICATE_LEGAL_DOC = "Document with Legal Document Type {0} and Document No {1} already exists";
    public static TRUSTING_SOCIAL_MAX_SUBJECT = "Subject cannot be more than 8";
    public static TRUSTING_SOCIAL_DUPL_RELATION_CUST = "Cannot add another subject with Relation: Customer";
    public static TRUSTING_SOCIAL_DUPL_MOBILE_PHN_NO = "Duplicate Mobile Phone No";
    public static INVALID_FILE_FORMAT = "File format must be {0}";
    public static DOCUMENT_REQUIRED = "Document Type {0} is required";
    public static INVALID_FILE_FORMAT_FOR_DOC = "File format for Document Type {0} must be {1}";

    public static EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE = "Establishment Date Must Be Less Than Business Date";
    public static OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE = "Other Business Establishment Date Must Be Less Than Business Date";
    public static EMP_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE = "Employee Start Working Date Date Must Be Less Than Business Date";
    public static START_WORKING_DATE_MUST_BE_LESS_THAN_BIZ_DATE = "Start Working Date Date Must Be Less Than Business Date";
    public static MOBILE_PHN_NO_INVALID = "Mobile Phone No Must be Started With 62XXXXXXXXX";
    public static ROUNDED_AMT_INVALID = "Rounded Amount must be between 0-2";
    public static EXP_PASSWORD = "Password has expired. Please change your password.";
    public static PWD_EXCEPTION = "Minimum 8 characters, at least 1 letter, 1 number and 1 special character.";
    public static PASSWORD_DEFAULT = "The password is still in default, please change it immediately.";

    public static MANDATORY_LEGAL_DOC = "Legal Documents with following type are mandatory: {0}";

    // NotifEngine
    public static PARAM_ATTR_INACTIVE = "There are some inactive Parameter Attribute. Do you still want to continue?";

    // No Whitespace
    public static NO_WHITE_SPACE = "Cannot contain space";

    public static PASSWORD_WILL_BE_EXPIRED = "Your password will be expired in ";
    public static CHANGE_PASSWORD = "Please change your password immediately.";
}
