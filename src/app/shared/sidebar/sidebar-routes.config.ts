import { RouteInfo } from './sidebar.metadata';
import { CommonConstant } from '../constant/CommonConstant';
import { NavigationConstant } from '../NavigationConstant';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  { Path: "Customer/NewCustomer", Title: 'New Customer Test', Icon: 'ft-user', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
  { Path: NavigationConstant.DASHBOARD, Title: 'Menu', Icon: 'ft-home', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
  {
    Path: '', Title: 'Organization', Icon: 'ft-bar-chart-2', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.OFFICE_PAGING, Title: 'Office', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.OFFICE_AREA, Title: 'Office Area', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ORG_BZ_UNIT, Title: 'Business unit', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ORG_JOB_TITLE, Title: 'Job Title', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.EMP_PAGING, Title: 'Employee', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.EMP_LEAVE_PAGING, Title: 'Employee Leave', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SYSTEM_SETTING_ROLE_X, Title: 'Role', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SYS_USER_PAGING, Title: 'System User', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }

    ], Params: []
  },
  {
    Path: '', Title: 'System Setting', Icon: 'ft-users', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: "/CommonSetting/AppSource/Paging", Title: "Application Source", Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REF_TAX_OFFICE_PAGING, Title: 'Tax Office', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_GEN_SETTING, Title: 'General Setting', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_HOLIDAY, Title: 'Holiday Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_WORKING_HOUR, Title: 'Working Hour', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_BANK_PAGING, Title: 'Bank', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_OFFICE_BANK_ACCOUNT_PAGING, Title: 'Office Bank Account', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REF_PROVINCE_PAGING, Title: 'Province', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_ZIPCODE_PAGING, Title: 'Zipcode', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_MASTER, Title: 'Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REF_STATUS_PAGING, Title: 'Status', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_INDUSTRY_TYPE_PAGING, Title: 'Industry Type', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_INDUSTRY_TYPE_CAT_PAGING, Title: 'Industry Type Category', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_ECONOMIC_SECTOR_PAGING, Title: 'Economic Sector', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_CURRENCY_PAGING, Title: 'Currency', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_PROFESSION_PAGING, Title: 'Profession', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REASON_PAGING, Title: 'Reason', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_PAYMENT_ALLOC_PAGING, Title: 'Payment Allocation', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_PAYMENT_ALLOC_GRP_PAGING, Title: 'Payment Allocation Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REF_AMRTZ_ITEM_PAGING, Title: 'Ref Amortize Item', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REF_TRX_TYPE_PAGING, Title: 'Ref Trx Type', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SYSTEM_SETTING_NOTIF, Title: 'Notification', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SYSTEM_SETTING_NOTIF_APPRV, Title: 'Notification Approval', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SYSTEM_SETTING_REF_FORM_PAGING, Title: 'Ref Form', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SYSTEM_SETTING_ATTR_PAGING, Title: 'Attribute Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_COA_SCHM_PAGING, Title: 'COA Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_COA_PAGING, Title: 'COA', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CS_REF_TC_PAGING, Title: 'Ref TC', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }
    ], Params: []
  },
  {
    Path: '', Title: 'Asset', Icon: 'ft-aperture', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.ASSET_CONFIG_PAGING2, Title: 'Asset Configuration', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_DOC_MASTER_PAGING, Title: 'Asset Document Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_NEG_PAGING, Title: 'Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_MASTER_PAGING, Title: 'Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_SCHM_PAGING, Title: 'Asset Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_TYPE_PAGING, Title: 'Asset Type', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_MASTER_UPLOAD, Title: 'Upload Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_MASTER_RVW_UPLOAD_PAGING, Title: 'Review Upload Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_NEG_UPLOAD, Title: 'Upload Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.ASSET_NEG_RVW_UPLOAD_PAGING, Title: 'Review Upload Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
    ], Params: []
  },
  {
    Path: '', Title: 'Asset Self CUSTOM', Icon: 'ft-aperture', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.CUSTOM_ASSET_NEG_PAGING, Title: 'Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUSTOM_ASSET_MASTER_PAGING, Title: 'Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUSTOM_ASSET_MASTER_UPLOAD, Title: 'Upload Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUSTOM_ASSET_MASTER_RVW_UPLOAD_PAGING, Title: 'Review Upload Asset Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUSTOM_ASSET_NEG_UPLOAD, Title: 'Upload Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUSTOM_ASSET_NEG_RVW_UPLOAD_PAGING, Title: 'Review Upload Negative Asset', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
    ], Params: []
  },
  {
    Path: '', Title: 'Vendor', Icon: 'ft-users', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      {
        Path: '', Title: 'Supplier', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Supplier ATPM', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_ATPM }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Supplier Holding', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_HOLDING }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Supplier HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER_HO }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Supplier', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Supplier Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Supplier Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SUPPLIER }] },

        ], Params: []
      }
      , {
        Path: "",
        Title: "Grading",
        Icon: "",
        Class: "has-sub",
        Badge: "",
        BadgeClass: "",
        IsExternalLink: false,
        Submenu: [
          {
            Path: "/Vendor/VendorGrading/Request/Paging",
            Title: "Vendor Grading Request",
            Icon: "",
            Class: "",
            Badge: "",
            BadgeClass: "",
            IsExternalLink: false,
            Submenu: [],
            Params: [],
          }
          ,
          {
            Path: "/Vendor/VendorGrading/Approval/Paging",
            Title: "Vendor Grading Approval",
            Icon: "",
            Class: "",
            Badge: "",
            BadgeClass: "",
            IsExternalLink: false,
            Submenu: [],
            Params: [],
          },
          {
            Path: "/Vendor/VendorGrading/Inquiry",
            Title: "Vendor Grading Inquiry",
            Icon: "",
            Class: "",
            Badge: "",
            BadgeClass: "",
            IsExternalLink: false,
            Submenu: [],
            Params: [],
          }
        ],
        Params: [],
      }
      , {
        Path: '', Title: 'Asset Insurance', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Insurance HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_HO }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Insurance Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_BRANCH }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Insurance Branch Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_BRANCH }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Insurance Branch Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.ASSET_INSCO_BRANCH }] },

        ], Params: []
      }, {
        Path: '', Title: 'Life Insurance', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Life Insurance HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_HO }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Life Insurance Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_BRANCH }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Life Insurance Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_BRANCH }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Life Insurance Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.LIFE_INSCO_BRANCH }] },
        ], Params: []
      },
      {
        Path: '', Title: 'Credit Insurance', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.CREDIT_INS_PAGING, Title: 'Credit Insurance HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
          { Path: NavigationConstant.CREDIT_INS_BRANCH_PAGING, Title: 'Credit Insurance Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
          { Path: NavigationConstant.CREDIT_INS_GROUP_PAGING, Title: 'Credit Insurance Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },


        ], Params: []
      },
      {
        Path: '', Title: 'Surveyor', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Surveyor HO', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_HO }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Surveyor Branch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_BRANCH }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Surveyor Branch Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_BRANCH }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Surveyor Branch Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.SURVEYOR_BRANCH }] },
        ], Params: []
      },
      {
        Path: '', Title: 'Agency', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Agency Personal', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_PERSONAL }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Agency Company', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_COMPANY }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Agency Personal Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_PERSONAL }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Agency Company Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Scheme" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_COMPANY }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Agency Personal Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_PERSONAL }] },
          { Path: NavigationConstant.VENDOR_PAGING, Title: 'Agency Company Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: "Group" }, { Attr: "MrVendorCategoryCode", Value: CommonConstant.AGENCY_COMPANY }] },

        ], Params: []
      },
      {
        Path: '', Title: 'Notary', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
        Submenu: [

          { Path: NavigationConstant.VENDOR_PAGING_X, Title: 'Notary Personal', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.NOTARY_PERSONAL }] },
          { Path: NavigationConstant.VENDOR_PAGING_X, Title: 'Notary Company', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.NOTARY_COMPANY }] },
        ], Params: []
      },
      { Path: NavigationConstant.VENDOR_PAGING_X, Title: 'Auction Company', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "MrVendorCategoryCode", Value: CommonConstant.AUCTION_COMPANY }] },
    ], Params: []
  },
  {
    Path: '', Title: 'Survey', Icon: 'ft-clipboard', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.SRVY_ORDER, Title: 'Survey Order Inquiry', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SRVY_TASK, Title: 'Survey Task Inquiry', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SURVEYOR_PAGING, Title: 'Surveyor', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SURVEY_TASK_ASSIGNMENT_PAGING, Title: 'Survey Task Assignment', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SURVEY_TASK_RESULT_PAGING, Title: 'Survey Task Result', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.SURVEY_RESULT_REVIEW_PAGING, Title: 'Survey Result Review', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }

    ], Params: []
  },
  {
    Path: '', Title: 'Verification', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.VERIF_QA_PAGING, Title: 'Question Answer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.VERIF_QA_SCHM_PAGING, Title: 'Question Scheme', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.VERIF_QA_GRP_PAGING, Title: 'Question Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }

    ], Params: []
  },
  {
    Path: '', Title: 'Notification Engine', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.NOTIF_ENGINE_TEMPLATE_PAGING, Title: 'Notification Engine Template Engine Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.NOTIF_ENGINE_TEMPLATE_ADD_EDIT, Title: 'Notification Engine Template Engine Form', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.NOTIF_ENGINE_TEMPLATE_ATTR_PAGING, Title: 'Notification Engine Attribute Template Engine Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.NOTIF_ENGINE_TEMPLATE_ATTR_ADD_EDIT, Title: 'Notification Engine Attribute Template Engine Form', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.NOTIF_ENGINE_BROADCAST_PAGING, Title: 'Notification Engine Broadcast Message Engine Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT, Title: 'Notification Engine Broadcast Message Engine Form', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }
    ], Params: []
  },

  {
    Path: '', Title: 'Customer', Icon: 'ft-user', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.CUST_PAGING, Title: 'Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING, Title: 'Edit Main Data Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUST_FAMILY_PAGING, Title: 'Customer Family', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUST_SHRHLDR_PAGING, Title: 'Customer Shareholder', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      // { Path: NavigationConstant.CUST_GUARANTOR_PAGING, Title: 'Customer Guarantor', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params : []  },  
      { Path: NavigationConstant.CUST_NEG_PAGING, Title: 'Negative Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUST_NEG_UPLOAD, Title: 'Upload Negative Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING, Title: 'Review Upload Negative Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.CUST_UPDATE_DATA_PAGING, Title: 'Update Data Customer', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
    ], Params: []
  },

  {
    Path: '', Title: 'Document Management', Icon: 'ft-package', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.DOC_MNGMNT_CABINET_PAGING, Title: 'Document Management', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }
    ], Params: []
  },

  {
    Path: '', Title: 'Integration', Icon: 'ft-home', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
    Submenu: [
      { Path: NavigationConstant.INTEGRATION_SEND_DAILY_MASTER, Title: 'Send Daily Master', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: CommonConstant.DailyMasterTypeSingle }] },
      { Path: NavigationConstant.INTEGRATION_SEND_DAILY_MASTER, Title: 'Send Daily Master With Range Date', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [{ Attr: "Type", Value: CommonConstant.DailyMasterTypeRange }] },
    ], Params: []
  },
  {
    Path: '', Title: 'Journal', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
      { Path: NavigationConstant.JOURNAL_MEDIA_PAGING, Title: 'Journal Media', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.JOURNAL_RESULT, Title: 'Journal Result', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.FAILED_JOURNAL_RESULT_LIST_PAGING, Title: 'Failed Journal Result List', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.JOURNAL_RECONCILE_PAGING, Title: 'Journal Reconcile', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] },
      { Path: NavigationConstant.UPLOAD_JOURNAL_FILE_PAGING, Title: 'Upload Journal File', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [], Params: [] }
    ], Params: []
  }
  // {
  //     Path: '', Title: 'LOS', Icon: 'ft-users', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/LOS/CreditProcess/CustomerData', Title: 'New Application', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Supplier', Icon: 'ft-copy', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/supplier', Title: 'Supplier  Maintenance', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },

  // {
  //     Path: '', Title: 'Dashboard', Icon: 'ft-home', Class: 'has-sub', Badge: '2', BadgeClass: 'Badge Badge-pill Badge-danger float-right mr-1 mt-1', IsExternalLink: false, Submenu: [
  //         { Path: '/dashboard/dashboard1', Title: 'Dashboard1', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/dashboard/dashboard2', Title: 'Dashboard2', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: '/colorpalettes', Title: 'Color Palette', Icon: 'ft-droplet', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/inbox', Title: 'Inbox', Icon: 'ft-mail', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/chat', Title: 'Chat', Icon: 'ft-message-square', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/chat-ngrx', Title: 'Chat NgRx', Icon: 'ft-message-square', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/taskboard', Title: 'Task Board', Icon: 'ft-file-text', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/taskboard-ngrx', Title: 'Task Board NgRx', Icon: 'ft-file-text', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // { Path: '/player', Title: 'Player', Icon: 'ft-music', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // {
  //     Path: '', Title: 'UI Kit', Icon: 'ft-aperture', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [

  //         { Path: '/uikit/grids', Title: 'Grid', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/typography', Title: 'Typography', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/syntaxhighlighter', Title: 'Syntax Highlighter', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/helperClasses', Title: 'Helper Classes', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/uikit/textutilities', Title: 'Text Utilities', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },

  //         {
  //             Path: '', Title: 'Icons', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //                 { Path: '/uikit/feather', Title: 'Feather Icon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/uikit/font-awesome', Title: 'Font Awesome Icon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/uikit/simple-line', Title: 'Simple Line Icon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //             ]
  //         },

  //     ]
  // },
  // {
  //     Path: '', Title: 'Components', Icon: 'ft-box', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [

  //         {
  //             Path: '', Title: 'Bootstrap', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //                 { Path: '/components/lists', Title: 'List', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/buttons', Title: 'Buttons', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/ng-buttons', Title: 'NG Buttons', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/alerts', Title: 'Alerts', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/Badges', Title: 'Badges', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/dropdowns', Title: 'Dropdowns', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/inputgroups', Title: 'Input Groups', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/media', Title: 'Media Objects', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/pagination', Title: 'Pagination', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/progress', Title: 'Progress Bars', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/models', Title: 'Modals', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/collapse', Title: 'Collapse', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/accordion', Title: 'Accordion', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/carousel', Title: 'Carousel', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/datepicker', Title: 'Datepicker', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/popover', Title: 'Popover', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/rating', Title: 'Rating', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tabs', Title: 'Tabs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/timepicker', Title: 'Timepicker', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tooltip', Title: 'Tooltip', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/typeahead', Title: 'Typeahead', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //         {
  //             Path: '', Title: 'Extra', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //                 { Path: '/components/sweetalerts', Title: 'Sweet Alert', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/toastr', Title: 'Toastr', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/select', Title: 'Select', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/nouislider', Title: 'NoUI Slider', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/upload', Title: 'Upload', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/editor', Title: 'Editor', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/dragndrop', Title: 'Drag and Drop', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tour', Title: 'Tour', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/cropper', Title: 'Image Cropper', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/tags', Title: 'Input Tags', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/components/switch', Title: 'Switch', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Forms', Icon: 'ft-edit', Class: 'has-sub', Badge: 'New', BadgeClass: 'Badge Badge-pill Badge-primary float-right mr-1 mt-1', IsExternalLink: false,
  //     Submenu: [
  //         {
  //             Path: '', Title: 'Elements', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //             Submenu: [
  //                 { Path: '/forms/inputs', Title: 'Inputs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/input-groups', Title: 'Input Group', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/input-grid', Title: 'Input Grid', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //         {
  //             Path: '', Title: 'Layouts', Icon: '', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //             Submenu: [
  //                 { Path: '/forms/basic', Title: 'Basic Forms', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/horizontal', Title: 'Horizontal Forms', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/hidden-labels', Title: 'Hidden Labels', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/form-actions', Title: 'Form Actions', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/bordered', Title: 'Bordered Forms', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //                 { Path: '/forms/striped-rows', Title: 'Striped Rows', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //             ]
  //         },
  //         { Path: '/forms/validation', Title: 'Validation', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/forms/wizard', Title: 'Wizard', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/forms/ngx', Title: 'NGX Wizard', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/forms/archwizard', Title: 'ArchWizard', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //     ]
  // },
  // {
  //     Path: '', Title: 'Tables', Icon: 'ft-grid', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/tables/regular', Title: 'Regular', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/tables/extended', Title: 'Extended', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/tables/smart', Title: 'Smart Tables', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },

  //     ]
  // },
  // {
  //     Path: '', Title: 'Data Tables', Icon: 'ft-layout', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/datatables/basic', Title: 'Basic', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/editing', Title: 'Editing', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/filter', Title: 'Filter', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/fullscreen', Title: 'Fullscreen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/Paging', Title: 'Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/pinning', Title: 'Pinning', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/selection', Title: 'Selection', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/sorting', Title: 'Sorting', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //     ]
  // },
  // {
  //     Path: '', Title: 'Cards', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //         { Path: '/cards/basic', Title: 'Basic Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/cards/advanced', Title: 'Advanced Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Maps', Icon: 'ft-map', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/maps/google', Title: 'Google Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/maps/fullscreen', Title: 'Full Screen Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Charts', Icon: 'ft-bar-chart-2', Class: 'has-sub', Badge: '2', BadgeClass: 'Badge Badge-pill Badge-success float-right mr-1 mt-1', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/charts/chartjs', Title: 'ChartJs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/chartist', Title: 'Chartist', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/ngx', Title: 'NGX Chart', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: '/calendar', Title: 'Calendar', Icon: 'ft-calendar', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // {
  //     Path: '', Title: 'Pages', Icon: 'ft-copy', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/pages/forgotpassword', Title: 'Forgot Password', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/horizontaltimeline', Title: 'Horizontal Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/verticaltimeline', Title: 'Vertical Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/login', Title: 'Login', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/register', Title: 'Register', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/profile', Title: 'User Profile', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/lockscreen', Title: 'Lock Screen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/invoice', Title: 'Invoice', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/error', Title: 'Error', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/comingsoon', Title: 'Coming Soon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/maintenance', Title: 'Maintenance', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/gallery', Title: 'Gallery', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/search', Title: 'Search', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/faq', Title: 'FAQ', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/kb', Title: 'Knowledge Base', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Data Tables', Icon: 'ft-layout', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/datatables/basic', Title: 'Basic', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/editing', Title: 'Editing', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/filter', Title: 'Filter', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/fullscreen', Title: 'Fullscreen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/Paging', Title: 'Paging', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/pinning', Title: 'Pinning', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/selection', Title: 'Selection', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/datatables/sorting', Title: 'Sorting', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] }
  //     ]
  // },
  // {
  //     Path: '', Title: 'Cards', Icon: 'ft-layers', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [
  //         { Path: '/cards/basic', Title: 'Basic Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/cards/advanced', Title: 'Advanced Cards', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Maps', Icon: 'ft-map', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/maps/google', Title: 'Google Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/maps/fullscreen', Title: 'Full Screen Map', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // {
  //     Path: '', Title: 'Charts', Icon: 'ft-bar-chart-2', Class: 'has-sub', Badge: '2', BadgeClass: 'Badge Badge-pill Badge-success float-right mr-1 mt-1', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/charts/chartjs', Title: 'ChartJs', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/chartist', Title: 'Chartist', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/charts/ngx', Title: 'NGX Chart', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: '/calendar', Title: 'Calendar', Icon: 'ft-calendar', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  // {
  //     Path: '', Title: 'Pages', Icon: 'ft-copy', Class: 'has-sub', Badge: '', BadgeClass: '', IsExternalLink: false,
  //     Submenu: [
  //         { Path: '/pages/forgotpassword', Title: 'Forgot Password', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/horizontaltimeline', Title: 'Horizontal Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/verticaltimeline', Title: 'Vertical Timeline', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/login', Title: 'Login', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/register', Title: 'Register', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/profile', Title: 'User Profile', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/lockscreen', Title: 'Lock Screen', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/invoice', Title: 'Invoice', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/error', Title: 'Error', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/comingsoon', Title: 'Coming Soon', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/maintenance', Title: 'Maintenance', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/gallery', Title: 'Gallery', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/search', Title: 'Search', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/faq', Title: 'FAQ', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //         { Path: '/pages/kb', Title: 'Knowledge Base', Icon: '', Class: '', Badge: '', BadgeClass: '', IsExternalLink: false, Submenu: [] },
  //     ]
  // },
  // { Path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', Title: 'Documentation', Icon: 'ft-book', Class: '', Badge: '', BadgeClass: '', IsExternalLink: true, Submenu: [] },
  // { Path: 'https://pixinvent.ticksy.com/', Title: 'Support', Icon: 'ft-life-buoy', Class: '', Badge: '', BadgeClass: '', IsExternalLink: true, Submenu: [] },
];
