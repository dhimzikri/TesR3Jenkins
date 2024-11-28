import { PathConstant } from "app/shared/PathConstant";

export class PathConstantX {
    //#region layout-routes
    public static LR_IMPL = "Impl";
    //#endregion
    
    //#region Common-Path
    public static X = "X";
    public static PROCESS = "Process";
    public static PAGING_X = 'PagingX';
    public static ADD_X = 'AddX';
    public static DETAIL_X = 'DetailX';
    public static UPLOAD_X = 'UploadX';
    public static TASK_DESK_COLL_X = "TaskDeskCollX";
    public static ADD_EDIT_X = "AddEditX";
    //#endregion

    //#region Bank-Charge
    public static BANK_CHARGE = "BankCharge";
    public static CS_BANK_CHARGE_PAGING_X = PathConstantX.BANK_CHARGE + "/" + PathConstantX.PAGING_X;
    public static CS_BANK_CHARGE_DETAIL_X = PathConstantX.BANK_CHARGE + "/" + PathConstantX.DETAIL_X;
    //#endregion

    //#region Vendor
    public static VENDOR_SUPPLIER = "Supplier";
    public static VENDOR_SUPPLIER_EMP_PAGING_X = PathConstantX.VENDOR_SUPPLIER + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.PAGING + PathConstantX.X;
    public static VENDOR_SUPPLIER_EMP_DETAIL_X = PathConstantX.VENDOR_SUPPLIER + "/" + PathConstant.VENDOR_EMP + "/" + PathConstant.DETAIL + PathConstantX.X;
    public static VENDOR_REG_X = "RegistrationX";
    public static VENDOR_HO_DETAIL_X = PathConstant.VENDOR_HO + "/" + PathConstantX.DETAIL_X;
    public static VENDOR_HO_REG_X = PathConstant.VENDOR_HO + "/" + PathConstantX.VENDOR_REG_X;
    public static VENDOR_BRANCH_ADD_X = PathConstant.VENDOR_BRANCH + "/" + PathConstantX.ADD_X;
    public static VENDOR_BRANCH_REG_X = PathConstant.VENDOR_BRANCH + "/" + PathConstantX.VENDOR_REG_X;
    public static VENDOR_BRANCH_DETAIL_X = PathConstant.VENDOR_BRANCH + "/" + PathConstantX.DETAIL_X;
    public static VIEW_VENDOR_BRANCH_X = "VendorBranchX";
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstantX.PAGING_X;
    public static SELF_CUSTOM_VENDOR_BRANCH_MBR_ADD_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstantX.ADD_X;
    public static VENDOR_BRANCH_MBR_PAGING_X = PathConstant.VENDOR_BRANCH + "/" + PathConstant.MEMBER + "/" + PathConstantX.PAGING_X;
    public static VENDOR_BRANCH_MBR_ADD_X = PathConstant.VENDOR_COLL_COMPANY_ADD + PathConstantX.X;
    public static VENDOR_BRANCH_EMP_PAGING_X = PathConstant.VENDOR_BRANCH_EMP_PAGING + PathConstantX.X;
    public static VENDOR_BRANCH_EMP_DETAIL_X = PathConstant.VENDOR_BRANCH_EMP_DETAIL + PathConstantX.X;
    public static VIEW_VENDOR_HO_X = "VendorHOX";
    
    //#endregion

    //#region Common-Setting
    public static CS_OFFICE_BANK_ACCOUNT_PAGING_X = PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstantX.PAGING_X;
    public static CS_OFFICE_BANK_ACCOUNT_DETAIL_X = PathConstant.LR_OFFICE_BANK_ACC + "/" + PathConstantX.DETAIL_X;
    public static CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL_X = PathConstant.LR_OFFICE_BANK_ACC + "/AccDetailX";
    //#endregion

    //#region Customer
    public static CUST_PAGE_X = "PageX";
    public static NEW_CUST_X = "NewCustomerX";
    public static CUST_PERSONAL_PAGE_X = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_PAGE_X;
    public static CUST_COY_PAGE_X = PathConstant.CUST_COY + "/" + PathConstantX.CUST_PAGE_X;
    public static CUST_EDIT_MAIN_DATA_PAGING_X = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstantX.PAGING_X;
    public static CUST_FAMILY_PAGING_X = PathConstant.CUST_FAMILY + "/" + PathConstantX.PAGING_X;
    public static CUST_SHRHLDR_PAGING_X = PathConstant.CUST_SHRHLDR + "/" + PathConstantX.PAGING_X;
    //#endregion

    //#region Employee
    public static BANK_INFORMATION_X = "EmployeeBankInformationX";
    public static EMPLOYEE_BANK_INFORMATION_X = PathConstantX.BANK_INFORMATION_X + "/" + PathConstantX.PAGING_X;
    public static EMPLOYEE_BANK_INFORMATION_DETAIL_X = PathConstantX.EMPLOYEE_BANK_INFORMATION_X + "/" + PathConstantX.DETAIL_X;
    public static EMPLOYEE_PAGING_X = PathConstant.LR_EMP + PathConstantX.PAGING_X;
    public static EMP_BZ_UNIT_PAGING_X = PathConstant.EMP_BZ_UNIT + "/" + PathConstantX.PAGING_X;
    public static EMP_BZ_UNIT_ADD_X = PathConstant.EMP_BZ_UNIT + "/" + PathConstantX.ADD_X;
    //#endregion

    //#region Role
    public static ROLE_FEATURE_X = "FeatureX"
    public static ROLE_FORM_FEATURE_X = PathConstant.ROLE_FORM + "/" + PathConstantX.ROLE_FEATURE_X;
    public static ROLE_FORM_X = PathConstant.ROLE_FORM + PathConstantX.X;
    public static ROLE_X = PathConstant.ROLE + PathConstantX.X;
    //#endregion

    //#region System-Setting
    public static UPLOAD_FORM_FEATURE_X = "UploadFormFeature"
    public static UPLOAD_FORM_FEATURE_PAGING_X = PathConstantX.UPLOAD_FORM_FEATURE_X + "/" + PathConstantX.PAGING_X;
    public static CS_INDUSTRY_TYPE_PAGING_X = PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstantX.PAGING_X;
    public static CS_INDUSTRY_TYPE_DETAIL_X = PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstantX.DETAIL_X;
    
    public static CS_CUSTOM_INDUSTRY_TYPE_DETAIL_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_INDUSTRY_TYPE + "/" + PathConstantX.DETAIL_X;
    public static CS_PAYMENT_ALLOC_PAGING_X = PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstantX.PAGING_X;
    public static CS_CUSTOM_PAYMENT_ALLOC_DETAIL_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PAYMENT_ALLOC + "/" + PathConstantX.DETAIL_X;
    public static CS_ECONOMIC_SECTOR_PAGING_X = PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstantX.PAGING_X;
    public static CS_CUSTOM_ECONOMIC_SECTOR_DETAIL_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_ECONOMIC_SECTOR + "/" + PathConstantX.DETAIL_X;
    public static CS_PROFESSION_PAGING_X = PathConstant.CS_PROFESSION + "/" + PathConstantX.PAGING_X;
    public static CS_CUSTOM_PROFESSION_DETAIL_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_PROFESSION + "/" + PathConstantX.DETAIL_X;
    public static CS_BANK_PAGING_X = PathConstant.CS_BANK + "/" + PathConstantX.PAGING_X;
    public static CUSTOM_CS_BANK_DETAIL_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_BANK + "/" + PathConstantX.DETAIL_X;
    public static CS_ZIPCODE_PAGING_X = PathConstant.CS_ZIPCODE + "/" + PathConstantX.PAGING_X;
    public static CUSTOM_CS_ZIPCODE_DETAIL_X = PathConstant.SELF_CUSTOM + "/" + PathConstant.CS_ZIPCODE + "/" + PathConstantX.DETAIL_X;

    //#endregion
    
    public static VENDOR_FUNDING_COY_X = "FundingCompanyX";
    public static VENDOR_FUNDING_COY_PAGING_X = PathConstantX.VENDOR_FUNDING_COY_X + "/" + PathConstantX.PAGING_X; /* /FundingCompanyX/Paging */
    public static VENDOR_FUNDING_COY_ADD_EDIT_X = PathConstantX.VENDOR_FUNDING_COY_X + "/" + PathConstantX.ADD_EDIT_X; /* /FundingCompanyX/AddEditX */
}
