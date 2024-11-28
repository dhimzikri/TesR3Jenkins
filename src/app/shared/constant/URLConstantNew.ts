import { Injectable } from "@angular/core";
import { EnviConfigService } from "../services/enviConfig.service";
import { UrlConstantService } from "../services/urlConstant.service";

@Injectable()

export class UrlConstantNew{

    constructor( private configEnv: EnviConfigService, private urlConfig: UrlConstantService) {
    }
    public env = this.configEnv.getConfig();
    private url = this.urlConfig.getConfig();

    // SYS CONFIG RESULT
    public GetSysConfigResultByCode = this.env.FoundationR3Url + this.url.GetSysConfigResultByCode;

    // WEB SOCKET
    public WebSocketUrl = this.env.WebSocketURL + this.url.Notificationhub;

    //GENERAL SETTING
    public AddGeneralSetting = this.env.FoundationR3Url + this.url.AddGeneralSetting;
    public EditGeneralSetting = this.env.FoundationR3Url + this.url.EditGeneralSetting;
    public GetGeneralSettingById = this.env.FoundationR3Url + this.url.GetGeneralSettingById;
    public GetGeneralSettingValue = this.url.GetGeneralSettingValue;
    public GetGeneralSettingByCode = this.env.FoundationR3Url + this.url.GetGeneralSettingByCode;
    public GetGeneralSettingValueByCode = this.env.FoundationR3Url + this.url.GetGeneralSettingValueByCode;
    public GetListGeneralSettingByListGsCode = this.env.FoundationR3Url + this.url.GetListGeneralSettingByListGsCode;

    //REF OFFICE
    public GetRefOfficeByOfficeCode = this.env.FoundationR3Url + this.url.GetRefOfficeByOfficeCode;
    public GetListKvpActiveRefOfficeForPaging = this.env.FoundationR3Url + this.url.GetListKvpActiveRefOfficeForPaging;
    public GetRefOfficeObj = this.env.FoundationR3Url + this.url.GetRefOfficeObj;
    public GetRefOfficeByRefOfficeId = this.env.FoundationR3Url + this.url.GetRefOfficeByRefOfficeId;
    public GetAllRefOffice = this.env.FoundationR3Url + this.url.GetAllRefOffice;
    public AddRefOffice = this.env.FoundationR3Url + this.url.AddRefOffice;
    public AddRefOfficeV2 = this.env.FoundationR3Url + this.url.AddRefOfficeV2;
    public AddRefOfficeV2_1 = this.env.FoundationR3Url + this.url.AddRefOfficeV2_1;
    public AddRefOfficeAreaMember = this.env.FoundationR3Url + this.url.AddRefOfficeAreaMember;
    public UpdateRefOfficeAreaId = this.env.FoundationR3Url + this.url.UpdateRefOfficeAreaId;
    public EditRefOffice = this.env.FoundationR3Url + this.url.EditRefOffice;
    public EditRefOfficeV2 = this.env.FoundationR3Url +this.url.EditRefOfficeV2;
    public EditRefOfficeV2_1 = this.env.FoundationR3Url + this.url.EditRefOfficeV2_1;
    public GetCenterGrpByCenterGrpTypeCode = this.url.GetCenterGrpByCenterGrpTypeCode;
    public GetListOfficeCenterGrp = this.url.GetListOfficeCenterGrp;
    public AddCenterGroupOfficeMember = this.url.AddCenterGroupOfficeMember;
    public AddCenterGrpOfficeMember = this.env.FoundationR3Url + this.url.AddCenterGrpOfficeMember;
    public GetListCenterGrpMemberByRefOfficeId = this.env.FoundationR3Url + this.url.GetListCenterGrpMemberByRefOfficeId
    public DeleteCenterGrpOfficeMember = this.env.FoundationR3Url + this.url.DeleteCenterGrpOfficeMember;
    public GetListActiveRefOffice = this.url.GetListActiveRefOffice;
    public GetListRefOfficeByRefOfficeAreaId = this.env.FoundationR3Url + this.url.GetListRefOfficeByRefOfficeAreaId;
    public GetListKvpActiveRefOffice = this.env.FoundationR3Url + this.url.GetListKvpActiveRefOffice;
    public GetRefOfficeDetailByRefOfficeId = this.env.FoundationR3Url + this.url.GetRefOfficeDetailByRefOfficeId

    //CENTER GROUP
    public GetCenterGrpByCode = this.env.FoundationR3Url + this.url.GetCenterGrpByCode;
    public GetCenterGrpById = this.env.FoundationR3Url + this.url.GetCenterGrpById;

    //REF OFFICE AREA
    public GetAllListArea = this.env.FoundationR3Url + this.url.GetAllListArea;
    public GetRefOfficeAreaPaging = this.env.FoundationR3Url + this.url.GetRefOfficeAreaPaging;
    public GetRefArea = this.env.FoundationR3Url + this.url.GetRefArea;
    public GetRefOfficeAreaByRefOfficeAreaId = this.env.FoundationR3Url + this.url.GetRefOfficeAreaByRefOfficeAreaId;
    public AddRefOfficeArea = this.env.FoundationR3Url + this.url.AddRefOfficeArea;
    public EditRefOfficeArea = this.env.FoundationR3Url + this.url.EditRefOfficeArea;
    public CheckDuplAreaCode = this.env.FoundationR3Url + this.url.CheckDuplAreaCode;

    //ORGANIZATION
    public GetRefOrg = this.env.FoundationR3Url + this.url.GetRefOrg;
    public EditRefOrgWithOldParentId = this.env.FoundationR3Url + this.url.EditRefOrgWithOldParentId;
    public EditRefOrg = this.env.FoundationR3Url + this.url.EditRefOrg;
    public DeleteRefOrg = this.url.DeleteRefOrg;
    public GetListAllRefOrg = this.env.FoundationR3Url + this.url.GetListAllRefOrg;
    public AddRefOrg = this.env.FoundationR3Url + this.url.AddRefOrg;
    public GetRefOrgPaging = this.env.FoundationR3Url + this.url.GetRefOrgPaging;
    public GetAllRefBizUnit = this.env.FoundationR3Url + this.url.GetAllRefBizUnit;
    public GetOrgJobTitleByMdlStruc = this.env.FoundationR3Url + this.url.GetOrgJobTitleByMdlStruc;
    public GetRefBizUnitByOffice = this.env.FoundationR3Url + this.url.GetRefBizUnitByOffice;
    public GetAllOrgMdl = this.env.FoundationR3Url + this.url.GetAllOrgMdl;
    public GetAllActiveOrgMdlByRefOrgId = this.env.FoundationR3Url + this.url.GetAllActiveOrgMdlByRefOrgId;
    public GetOrgMdlPaging = this.env.FoundationR3Url + this.url.GetOrgMdlPaging;
    public DeleteOrgMdl = this.env.FoundationR3Url + this.url.DeleteOrgMdl;
    public EditOrgMdl = this.env.FoundationR3Url + this.url.EditOrgMdl;
    public AddOrgMdl = this.env.FoundationR3Url + this.url.AddOrgMdl;
    public GetOrgMdl = this.env.FoundationR3Url + this.url.GetOrgMdl;
    public GetOrgMdlByOrgMdlId = this.env.FoundationR3Url + this.url.GetOrgMdlByOrgMdlId;
    public GetAllRefBizUnitKeyValuePair = this.env.FoundationR3Url + this.url.GetAllRefBizUnitKeyValuePair;
    public DeleteOrgMdlStruc = this.env.FoundationR3Url + this.url.DeleteOrgMdlStruc;
    public AddOrgMdlStruc = this.env.FoundationR3Url + this.url.AddOrgMdlStruc;
    public EditOrgMdlStruc = this.env.FoundationR3Url + this.url.EditOrgMdlStruc;
    public GetOrgMdlStruc = this.env.FoundationR3Url + this.url.GetOrgMdlStruc;
    public GetOrgMdlStrucPaging = this.env.FoundationR3Url + this.url.GetOrgMdlStrucPaging;
    public GetOrgMdlStrucById = this.env.FoundationR3Url + this.url.GetOrgMdlStrucById;

    //REF-JOB-TITLE
    public GetRefJobTitle = this.env.FoundationR3Url + this.url.GetRefJobTitle;
    public AddRefJobTitle = this.env.FoundationR3Url + this.url.AddRefJobTitle;
    public EditRefJobTitle = this.env.FoundationR3Url + this.url.EditRefJobTitle;
    public GetJobPositionLvl = this.env.FoundationR3Url + this.url.GetJobPositionLvl;
    public GetRefJobTitleById = this.env.FoundationR3Url + this.url.GetRefJobTitleById;

    //ORG JOB TITLE
    public GetOrgJobTitlePaging = this.env.FoundationR3Url + this.url.GetOrgJobTitlePaging;
    public AddOrgJobTitle = this.env.FoundationR3Url + this.url.AddOrgJobTitle;
    public EditOrgJobTitle = this.env.FoundationR3Url + this.url.EditOrgJobTitle;
    public DeleteOrgJobTitle = this.env.FoundationR3Url + this.url.DeleteOrgJobTitle;
    public GetOrgJobTitleByOrgJobTitleId = this.env.FoundationR3Url + this.url.GetOrgJobTitleByOrgJobTitleId;

    //REF-BANK
    public GetBankPaging = this.env.FoundationR3Url + this.url.GetBankPaging;
    public GetBank = this.env.FoundationR3Url + this.url.GetBank;
    public GetRefBankByRefBankIdAsync = this.env.FoundationR3Url + this.url.GetRefBankByRefBankIdAsync;
    public GetRefBankByBankCodeAsync = this.env.FoundationR3Url + this.url.GetRefBankByBankCodeAsync;
    public EditRefBank = this.env.FoundationR3Url + this.url.EditRefBank;
    public AddRefBank = this.env.FoundationR3Url + this.url.AddRefBank;
    public AddRefBankAsync = this.env.FoundationR3Url + this.url.AddRefBankAsync;
    public DeleteRefBank = this.env.FoundationR3Url + this.url.DeleteRefBank;
    public GetBankByBankCode = this.env.FoundationR3Url + this.url.GetBankByBankCode;

    //LBPPMS-CNTRPRT
    public GetLbppmsCntrprtByLbppmsCntrprtCode = this.env.FoundationR3Url + this.url.GetLbppmsCntrprtByLbppmsCntrprtCode;

    //REF-EMP
    public GetEmpNameByRefUserId = this.env.FoundationR3Url + this.url.GetEmpNameByRefUserId;
    public GetListEmployee = this.env.FoundationR3Url + this.url.GetListEmployee;
    public GetRefEmployeeById = this.env.FoundationR3Url + this.url.GetRefEmployeeById;
    public AddRefEmp = this.env.FoundationR3Url + this.url.AddRefEmp;
    public EditRefEmp = this.env.FoundationR3Url + this.url.EditRefEmp;
    public GetEmpBankAccByRefEmpId = this.env.FoundationR3Url + this.url.GetEmpBankAccByRefEmpId;
    public AddRefEmpAndEmpBankAcc = this.env.FoundationR3Url + this.url.AddRefEmpAndEmpBankAcc;
    public EditRefEmpAndEmpBankAcc = this.env.FoundationR3Url + this.url.EditRefEmpAndEmpBankAcc;
    public DeleteRefEmpAndEmpBankAcc = this.env.FoundationR3Url + this.url.DeleteRefEmpAndEmpBankAcc;
    public GetListEmployeebyRefEmpId = this.env.FoundationR3Url + this.url.GetListEmployeebyRefEmpId;
    public GetEmpListByOfficeIdAndIsActive = this.env.FoundationR3Url + this.url.GetEmpListByOfficeIdAndIsActive;
    public GetEmpForUpdateById = this.env.FoundationR3Url + this.url.GetEmpForUpdateById;
    public EditEmpBankAcc = this.env.FoundationR3Url + this.url.EditEmpBankAcc;
    public EditEmpBankAccX = this.env.FoundationR3Url + this.url.EditEmpBankAccX;
    //EMP_POSITION
    public GetEmpPositionPaging = this.env.FoundationR3Url + this.url.GetEmpPositionPaging;
    public GetEmpByEmpPositionId = this.env.FoundationR3Url + this.url.GetEmpByEmpPositionId;
    public AddEmpPosition = this.env.FoundationR3Url + this.url.AddEmpPosition;
    public EditEmpPosition = this.env.FoundationR3Url + this.url.EditEmpPosition;
    public DeleteEmpPosition = this.env.FoundationR3Url + this.url.DeleteEmpPosition;
    public GetListUserEmployee = this.env.FoundationR3Url + this.url.GetListUserEmployee;

    //REF-USER
    public GetRefUserPaging = this.env.FoundationR3Url + this.url.GetRefUserPaging;
    public EditRefUserForRefEmpR3 = this.env.FoundationR3Url + this.url.EditRefUserForRefEmpR3;
    public ChangePassword = this.env.FoundationR3Url + this.url.ChangePassword;
    public GetRefUser = this.env.FoundationR3Url + this.url.GetRefUser;
    public GetUserByUsername = this.env.FoundationR3Url + this.url.GetUserByUsername;
    public ValidatePwd = this.env.FoundationR3Url + this.url.ValidatePwd;
    public GetCountRefUserByRefEmpId = this.env.FoundationR3Url + this.url.GetCountRefUserByRefEmpId;
    public ResetPassword = this.env.FoundationR3Url + this.url.ResetPassword;
    public GetRefUserById = this.env.FoundationR3Url + this.url.GetRefUserById;
    public GetUserEmpByUsername = this.env.FoundationR3Url + this.url.GetUserEmpByUsername;
    public GetRefUserByRefEmpId = this.env.FoundationR3Url + this.url.GetRefUserByRefEmpId;
    public AddRefUserRole = this.env.FoundationR3Url + this.url.AddRefUserRole;
    public EditRefUserRole = this.env.FoundationR3Url + this.url.EditRefUserRole;
    public GetRefUserRoleById = this.env.FoundationR3Url + this.url.GetRefUserRoleById;
    public ChangePasswordRefUserByUsername = this.env.FoundationR3Url + this.url.ChangePasswordRefUserByUsername;
    public DeleteRefUserRole = this.url.DeleteRefUserRole;
    public GetRefUserByResetCode = this.env.FoundationR3Url + this.url.GetRefUserByResetCode;
    public ResetPasswordByUsername = this.env.FoundationR3Url + this.url.ResetPasswordByUsername;

    //REF-ROLE
    public GetRefRolePaging = this.env.FoundationR3Url + this.url.GetRefRolePaging;
    public AddRefRole = this.env.FoundationR3Url + this.url.AddRefRole;
    public AddRefRoleV2 = this.env.FoundationR3Url + this.url.AddRefRoleV2;
    public EditRefRole = this.env.FoundationR3Url + this.url.EditRefRole;
    public DeleteRefRole = this.env.FoundationR3Url + this.url.DeleteRefRole;
    public GetRefRoleByRefRoleId = this.env.FoundationR3Url + this.url.GetRefRoleByRefRoleId;
    public GetRefRoleByCode = this.env.FoundationR3Url + this.url.GetRefRoleByCode;
    public GetActiveRefRoleByRefRoleId = this.url.GetActiveRefRoleByRefRoleId;
    public GetRefRole = this.env.FoundationR3Url + this.url.GetRefRole;
    public GetListDataCurrentUser = this.url.GetListDataCurrentUser;
    public GetRefRoleByEmpPositionId = this.url.GetRefRoleByEmpPositionId;
    public EditUserTitleRole = this.env.FoundationR3Url + this.url.EditUserTitleRole;
    public AddUserTitleRole = this.env.FoundationR3Url + this.url.AddUserTitleRole;
    public AssignRoleToUsers = this.env.FoundationR3Url + this.url.AssignRoleToUsers;
    public GetUserTitleRoleByEmpPositionIdAndRefRoleId = this.url.GetUserTitleRoleByEmpPositionIdAndRefRoleId;
    public GetListActiveRefRole = this.env.FoundationR3Url + this.url.GetListActiveRefRole;

    //REF FEE
    public AddRefFee = this.env.FoundationR3Url + this.url.AddRefFee;
    public EditRefFee = this.env.FoundationR3Url + this.url.EditRefFee;
    public GetRefFeeByRefFeeId = this.env.FoundationR3Url + this.url.GetRefFeeByRefFeeId;

    //REF LOB
    public GetListRefLob = this.env.FoundationR3Url + this.url.GetListRefLob;
    public GetListBizTemplateCodeByRefFeeId = this.env.FoundationR3Url + this.url.GetListBizTemplateCodeByRefFeeId;
    public GetListBizTmpltCode = this.env.FoundationR3Url + this.url.GetListBizTmpltCode;

    //SURVEYOR
    public AddSurveyor = this.env.FoundationR3Url + this.url.AddSurveyor;
    public EditSurveyor = this.env.FoundationR3Url + this.url.EditSurveyor;
    public GetSurveyorBySurveyorId = this.env.FoundationR3Url + this.url.GetSurveyorBySurveyorId;


    //ZIPCODE
    public GetRefZipcodePaging = this.env.FoundationR3Url + this.url.GetRefZipcodePaging;
    public GetRefZipCode = this.env.FoundationR3Url + this.url.GetRefZipCode;
    public GetRefProvDistrictObj = this.env.FoundationR3Url + this.url.GetRefProvDistrictObj;
    public EditRefZipcode = this.env.FoundationR3Url + this.url.EditRefZipcode;
    public EditRefZipcodeV2 = this.env.FoundationR3Url + this.url.EditRefZipcodeV2;
    public AddRefZipcode = this.env.FoundationR3Url + this.url.AddRefZipcode;
    public AddRefZipcodeV2 = this.env.FoundationR3Url + this.url.AddRefZipcodeV2;
    public GetOfficeZipcodeMemberAddPaging = this.env.FoundationR3Url + this.url.GetOfficeZipcodeMemberAddPaging;
    public GetRefZipCodeById = this.env.FoundationR3Url + this.url.GetRefZipCodeById;
    public GetZipcodeDataByZipCode = this.env.FoundationR3Url + this.url.GetZipcodeDataByZipCode;

    //OFFICE ZIPCODE MEMBER
    public GetOfficeZipCodeMemberPaging = this.env.FoundationR3Url + this.url.GetOfficeZipCodeMemberPaging;
    public GetRefOfficeZipcodePaging = this.env.FoundationR3Url + this.url.GetRefOfficeZipcodePaging;
    public AddOfficeZipcodeMember = this.env.FoundationR3Url + this.url.AddOfficeZipcodeMember;
    public DeleteOfficeZipcodeMember = this.env.FoundationR3Url + this.url.DeleteOfficeZipcodeMember;

    //BUSINESS UNIT
    public GetBusinessUnitPaging = this.env.FoundationR3Url + this.url.GetBusinessUnitPaging;
    public GetRefBizUnit = this.env.FoundationR3Url + this.url.GetRefBizUnit;
    public AddRefBizUnit = this.env.FoundationR3Url + this.url.AddRefBizUnit;
    public EditRefBizUnit = this.env.FoundationR3Url + this.url.EditRefBizUnit;
    public DeleteRefBizUnit = this.url.DeleteRefBizUnit;

    //REF COY
    public GetRefCoyPaging = this.env.FoundationR3Url + this.url.GetRefCoyPaging;
    public GetRefCoy = this.env.FoundationR3Url + this.url.GetRefCoy;
    public EditRefCoy = this.env.FoundationR3Url + this.url.EditRefCoy;
    public GetCoyBodPaging = this.env.FoundationR3Url + this.url.GetCoyBodPaging;
    public AddCoyBod = this.env.FoundationR3Url + this.url.AddCoyBod;
    public EditCoyBod = this.env.FoundationR3Url + this.url.EditCoyBod;
    public DeleteCoyBod = this.url.DeleteCoyBod;
    public GetCoyBod = this.env.FoundationR3Url + this.url.GetCoyBod;
    public GetCommissionerPaging = this.env.FoundationR3Url + this.url.GetCommissionerPaging;
    public AddCoyCommissioner = this.env.FoundationR3Url + this.url.AddCoyCommissioner;
    public EditCoyCommissioner = this.env.FoundationR3Url + this.url.EditCoyCommissioner;
    public DeleteCoyCommissioner = this.url.DeleteCoyCommissioner;
    public GetCoyCommissioner = this.env.FoundationR3Url + this.url.GetCoyCommissioner;

    //REF TAX OFFICE
    public GetAllActiveRefTaxOffice = this.env.FoundationR3Url + this.url.GetAllActiveRefTaxOffice;

    //REF MASTER
    public GetRefMasterList = this.env.FoundationR3Url + this.url.GetRefMasterList;
    public GetRefMastersByCriteria = this.env.FoundationR3Url + this.url.GetRefMastersByCriteria;
    public GetRefMaster = this.env.FoundationR3Url + this.url.GetRefMaster;
    public GetRefMasterListByTypeCode = this.env.FoundationR3Url + this.url.GetRefMasterListByTypeCode;
    public GetRefMasterListKeyValuePair = this.env.FoundationR3Url + this.url.GetRefMasterListKeyValuePair;
    public AddRefMaster = this.env.FoundationR3Url + this.url.AddRefMaster;
    public EditRefMaster = this.env.FoundationR3Url + this.url.EditRefMaster;
    public GetRefMasterType = this.env.FoundationR3Url + this.url.GetRefMasterType;
    public GetRefMasterTypeKeyValueUserSetting = this.url.GetRefMasterTypeKeyValueUserSetting;
    public GetRefMasterPaging = this.env.FoundationR3Url + this.url.GetRefMasterPaging;
    public GetRefMasterListDesc = this.env.FoundationR3Url + this.url.GetRefMasterListDesc;
    public GetRefMasterListKeyValueActiveByCode = this.env.FoundationR3Url + this.url.GetRefMasterListKeyValueActiveByCode;
    public GetListKeyValueActiveByCodeOrderBySeqNo = this.env.FoundationR3Url + this.url.GetListKeyValueActiveByCodeOrderBySeqNo;
    public GetListActiveRefMasterType = this.env.FoundationR3Url + this.url.GetListActiveRefMasterType;
    public GetListActiveRefMasterTypeForDdl = this.url.GetListActiveRefMasterTypeForDdl;
    public GetRefMasterByRefMasterId = this.env.FoundationR3Url + this.url.GetRefMasterByRefMasterId;
    public GetListActiveRefMaster = this.env.FoundationR3Url + this.url.GetListActiveRefMaster;
    public GetListActiveRefMasterByRefMasterTypeCodeAndMasterCode = this.env.FoundationR3Url + this.url.GetListActiveRefMasterByRefMasterTypeCodeAndMasterCode;
    public GetRefMasterByMasterCode = this.env.FoundationR3Url + this.url.GetRefMasterByMasterCode;
    public GetListActiveRefMasterWithMappingCodeAll = this.env.FoundationR3Url + this.url.GetListActiveRefMasterWithMappingCodeAll;
    public GetListActiveRefMasterByRefMasterTypeCode = this.env.FoundationR3Url + this.url.GetListActiveRefMasterByRefMasterTypeCode;
    public GetRefMasterByRefMasterTypeCodeAndMasterCode = this.env.FoundationR3Url + this.url.GetRefMasterByRefMasterTypeCodeAndMasterCode;
    public GetKvpRefMasterByRefMasterTypeCodeAndMasterCode = this.env.FoundationR3Url + this.url.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode;
    public GetRefMasterByRefMasterTypeCode = this.env.FoundationR3Url + this.url.GetRefMasterByRefMasterTypeCode;
    public GetListActiveRefMasterDDL = this.url.GetListActiveRefMasterDDL;
    public GetListActiveRefMasterOrderSeqNoDDL = this.url.GetListActiveRefMasterOrderSeqNoDDL;
    public GetListKeyValueActiveByCodeOrderBySeqNoDDL = this.url.GetListKeyValueActiveByCodeOrderBySeqNoDDL;

    public GetListActiveRefMasterDetail = this.env.FoundationR3Url + this.url.GetListActiveRefMasterDetail;

    //REF COUNTRY
    public GetListRefCountry = this.env.FoundationR3Url + this.url.GetListRefCountry;
    public GetRefCountryByCountryCode = this.env.FoundationR3Url + this.url.GetRefCountryByCountryCode;

    //REF INDUSTRY TYPE
    public GetRefIndustryTypeById = this.env.FoundationR3Url + this.url.GetRefIndustryTypeById;
    public AddRefIndustryType = this.env.FoundationR3Url + this.url.AddRefIndustryType;
    public EditRefIndustryType = this.env.FoundationR3Url + this.url.EditRefIndustryType;
    public DeleteRefIndustryType = this.env.FoundationR3Url + this.url.DeleteRefIndustryType;
    public GetRefIndustryTypeByIndustryTypeCode = this.env.FoundationR3Url + this.url.GetRefIndustryTypeByIndustryTypeCode;

    //REF PROV DISTRICT
    public GetRefProvDistrictPaging = this.env.FoundationR3Url + this.url.GetRefProvDistrictPaging;

    //MENU
    public GetRefFormPaging = this.env.FoundationR3Url + this.url.GetRefFormPaging;
    public GetAllActiveRefFormByRefRoleId = this.env.FoundationR3Url + this.url.GetAllActiveRefFormByRefRoleId;
    public GetRefFormByRefFormId = this.env.FoundationR3Url + this.url.GetRefFormByRefFormId;
    public EditRefForm = this.env.FoundationR3Url + this.url.EditRefForm;
    public AddRefForm = this.env.FoundationR3Url + this.url.AddRefForm;
    public DeleteRefForm = this.env.FoundationR3Url + this.url.DeleteRefForm;
    public AssignRoleToForms = this.env.FoundationR3Url + this.url.AssignRoleToForms;
    public GetAllAuthFormsByRefRoleId = this.env.FoundationR3Url + this.url.GetAllAuthFormsByRefRoleId;
    public GetAuthByRefFormIdAndRefRoleId = this.env.FoundationR3Url + this.url.GetAuthByRefFormIdAndRefRoleId;
    public UpdateFormFeatureAuthForm = this.env.FoundationR3Url + this.url.UpdateFormFeatureAuthForm;
    public GetAllActiveRefFormAndPathExist = this.env.FoundationR3Url + this.url.GetAllActiveRefFormAndPathExist;
    public GetAllActiveRefForm = this.env.FoundationR3Url + this.url.GetAllActiveRefForm;
    public LoginByRole = this.env.FoundationR3Url + this.url.LoginByRole;
    public LoginByRoleV2 = this.env.FoundationR3Url + this.url.LoginByRoleV2;
    public LoginByToken = this.env.FoundationR3Url + this.url.LoginByToken;
    public LoginByTokenV2 = this.env.FoundationR3Url + this.url.LoginByTokenV2;
    public UpdateToken = this.env.FoundationR3Url + this.url.UpdateToken;
    public UpdateTokenV2 = this.env.FoundationR3Url + this.url.UpdateTokenV2;
    public UpdateTokenV2_1 = this.env.FoundationR3Url + this.url.UpdateTokenV2_1;

    //FORM FEATURE
    public GetListRefFeature = this.env.FoundationR3Url + this.url.GetListRefFeature;
    public GetRefFeatureByComponent = this.env.FoundationR3Url + this.url.GetRefFeatureByComponent;

    //HOLIDAY
    public GetAllActiveHolidaySchmH = this.env.FoundationR3Url + this.url.GetAllActiveHolidaySchmH;
    public GetListActiveHolidaySchemeH = this.env.FoundationR3Url + this.url.GetListActiveHolidaySchemeH;
    public GetHolidayPaging = this.env.FoundationR3Url + this.url.GetHolidayPaging;
    public AddHolidaySchmH = this.env.FoundationR3Url + this.url.AddHolidaySchmH;
    public AddHolidaySchmD = this.env.FoundationR3Url + this.url.AddHolidaySchmD;
    public AddHolidaySchmDUntilYear = this.env.FoundationR3Url + this.url.AddHolidaySchmDUntilYear;
    public GetHolidaySchmH = this.env.FoundationR3Url + this.url.GetHolidaySchmH;
    public GetHolidaySchmHById = this.env.FoundationR3Url + this.url.GetHolidaySchmHById;
    public GetHolidaySchmDById = this.env.FoundationR3Url + this.url.GetHolidaySchmDById;
    public EditHolidaySchmHOnly = this.env.FoundationR3Url + this.url.EditHolidaySchmHOnly;
    public EditHolidaySchmH = this.env.FoundationR3Url + this.url.EditHolidaySchmH;
    public EditHolidaySchmD = this.env.FoundationR3Url + this.url.EditHolidaySchmD;
    public DeleteHolidaySchmD = this.env.FoundationR3Url + this.url.DeleteHolidaySchmD;
    public GetHolidayDetailPaging = this.env.FoundationR3Url + this.url.GetHolidayDetailPaging;
    public CopyHolidaySchmH = this.env.FoundationR3Url + this.url.CopyHolidaySchmH;

    //NOTIFICATION
    public SendNotificationRemainingPasswordExpirationDaysToUser = this.env.FoundationR3Url + this.url.SendNotificationRemainingPasswordExpirationDaysToUser;
    public GetNotificationHByNotificationHId = this.env.FoundationR3Url + this.url.GetNotificationHByNotificationHId;
    public GetListUsernameAndEmpNameByNotificationHId = this.env.FoundationR3Url + this.url.GetListUsernameAndEmpNameByNotificationHId;
    public AddNotificationHAndD = this.env.FoundationR3Url + this.url.AddNotificationHAndD;
    public EditNotificationH = this.env.FoundationR3Url + this.url.EditNotificationH;
    public UpdateReadNotification = this.env.FoundationR3Url + this.url.UpdateReadNotification;
    public GetListNotificationHByRefUserId = this.env.FoundationR3Url + this.url.GetListNotificationHByRefUserId;

    //REF CURR
    public GetRefCurrPaging = this.env.FoundationR3Url + this.url.GetRefCurrPaging;
    public AddRefCurr = this.env.FoundationR3Url + this.url.AddRefCurr;
    public EditRefCurr = this.env.FoundationR3Url + this.url.EditRefCurr;
    public GetRefCurrById = this.env.FoundationR3Url + this.url.GetRefCurrById;
    public GetRefCurrByCode = this.env.FoundationR3Url + this.url.GetRefCurrByCode;
    public GetListKvpActiveRefCurr = this.env.FoundationR3Url + this.url.GetListKvpActiveRefCurr;
    public AddExchangeRate = this.env.FoundationR3Url + this.url.AddExchangeRate;

    //REF ECONOMIC SECTOR
    public AddRefEconomicSector = this.env.FoundationR3Url + this.url.AddRefEconomicSector;
    public EditRefEconomicSector = this.env.FoundationR3Url + this.url.EditRefEconomicSector;
    public GetRefEconomicSectorById = this.env.FoundationR3Url + this.url.GetRefEconomicSectorById;

    //REF PROV DISTRICT
    public AddRefProvDistrict = this.env.FoundationR3Url + this.url.AddRefProvDistrict;
    public EditRefProvDistrict = this.env.FoundationR3Url + this.url.EditRefProvDistrict;
    public GetRefProvDistrictById = this.env.FoundationR3Url + this.url.GetRefProvDistrictById;

    //ASSET MASTER
    public AddAssetMaster = this.env.FoundationR3Url + this.url.AddAssetMaster;
    public EditAssetMaster = this.env.FoundationR3Url + this.url.EditAssetMaster;
    public GetAssetMasterById = this.env.FoundationR3Url + this.url.GetAssetMasterById;
    public GetValueAssetType = this.env.FoundationR3Url + this.url.GetValueAssetType;
    public GetListAssetCategory = this.env.FoundationR3Url + this.url.GetListAssetCategory;
    public GetListAssetSchmH = this.env.FoundationR3Url + this.url.GetListAssetSchmH;
    public GetListAssetMasterByAssetSchmHId = this.env.FoundationR3Url + this.url.GetListAssetMasterByAssetSchmHId;
    public EditListAssetSchmDByAssetMasterId = this.env.FoundationR3Url + this.url.EditListAssetSchmDByAssetMasterId;
    public GetUploadAssetMasterByUploadMonitoringNoAndTrxType = this.env.FoundationR3Url + this.url.GetUploadAssetMasterByUploadMonitoringNoAndTrxType;
    public AddAssetMasterAttrContent = this.env.FoundationR3Url + this.url.AddAssetMasterAttrContent;
    public GetAssetMasterAttrContentForAssetMaster = this.env.FoundationR3Url + this.url.GetAssetMasterAttrContentForAssetMaster;
    public GetAssetMasterAttrContentForAssetMasterByAttrTypeCode = this.env.FoundationR3Url + this.url.GetAssetMasterAttrContentForAssetMasterByAttrTypeCode;

    //REF ATTR
    public GetListActiveRefAttrType = this.env.FoundationR3Url + this.url.GetListActiveRefAttrType;
    public GetRefAttrById = this.env.FoundationR3Url + this.url.GetRefAttrById;
    public AddRefAttr = this.env.FoundationR3Url + this.url.AddRefAttr;
    public EditRefAttr = this.env.FoundationR3Url + this.url.EditRefAttr;
    public GetListActiveRefAttrByAttrGroup = this.env.FoundationR3Url + this.url.GetListActiveRefAttrByAttrGroup;
    public GetListActiveRefAttrByListAttrGroup = this.env.FoundationR3Url + this.url.GetListActiveRefAttrByListAttrGroup;

    //REF PROFESSION
    public AddRefProfession = this.env.FoundationR3Url + this.url.AddRefProfession;
    public EditRefProfession = this.env.FoundationR3Url + this.url.EditRefProfession;
    public DeleteRefProfession = this.url.DeleteRefProfession;
    public GetRefProfessionById = this.env.FoundationR3Url + this.url.GetRefProfessionById;
    public GetRefProfessionByProfessionCode = this.env.FoundationR3Url + this.url.GetRefProfessionByProfessionCode;
    public GetRefProfessionByRefProfessionId = this.env.FoundationR3Url + this.url.GetRefProfessionByRefProfessionId;

    //REF REASON
    public AddRefReason = this.env.FoundationR3Url + this.url.AddRefReason;
    public EditRefReason = this.env.FoundationR3Url + this.url.EditRefReason;
    public GetRefReasonById = this.env.FoundationR3Url + this.url.GetRefReasonById;

    //REF REASON TYPE
    public GetValueReasonType = this.env.FoundationR3Url + this.url.GetValueReasonType;

    //WORKHOUR
    public GetListActiveWorkingSchmH = this.env.FoundationR3Url + this.url.GetListActiveWorkingSchmH;
    public GetWorkHourSchmHPaging = this.env.FoundationR3Url + this.url.GetWorkHourSchmHPaging;
    public AddWorkingHourSchmH = this.env.FoundationR3Url + this.url.AddWorkingHourSchmH;
    public AddListWorkingHourSchmD = this.env.FoundationR3Url + this.url.AddListWorkingHourSchmD;
    public EditListWorkingHourSchmD = this.env.FoundationR3Url + this.url.EditListWorkingHourSchmD;
    public EditWorkingHourSchmH = this.env.FoundationR3Url + this.url.EditWorkingHourSchmH;
    public GetWorkingHourSchmH = this.env.FoundationR3Url + this.url.GetWorkingHourSchmH;
    public GetWorkingHourSchmD = this.env.FoundationR3Url + this.url.GetWorkingHourSchmD;
    public GetWorkingHourSchmHById = this.env.FoundationR3Url + this.url.GetWorkingHourSchmHById;
    public GetListWorkingHourSchmDByWorkingHourHId = this.env.FoundationR3Url + this.url.GetListWorkingHourSchmDByWorkingHourHId;

    //QUEUE
    public AddQueue = this.env.FoundationR3Url + this.url.AddQueue;

    //REF MODULE
    public GetListRefModuleKeyValue = this.env.FoundationR3Url + this.url.GetListRefModuleKeyValue;
    public GetListKeyValueByCode = this.env.FoundationR3Url + this.url.GetListKeyValueByCode;
    public GetListKeyValueRefModuleById = this.env.FoundationR3Url + this.url.GetListKeyValueRefModuleById;

    //REF EMP LEAVE MANAGEMENT
    public GetRefEmpLeaveMngmntPaging = this.env.FoundationR3Url + this.url.GetRefEmpLeaveMngmntPaging;
    public DeleteRefEmpLeaveMngmnt = this.env.FoundationR3Url + this.url.DeleteRefEmpLeaveMngmnt;
    public GetRefEmpLeaveMngmntById = this.env.FoundationR3Url + this.url.GetRefEmpLeaveMngmntById;
    public EditRefEmpLeaveMngmnt = this.env.FoundationR3Url + this.url.EditRefEmpLeaveMngmnt;
    public AddRefEmpLeaveMngmnt = this.env.FoundationR3Url + this.url.AddRefEmpLeaveMngmnt;

    //UPLOAD
    public UploadReview = this.env.FoundationR3Url + this.url.UploadReview;
    public UploadReviewV2 = this.env.FoundationR3Url + this.url.UploadReviewV2;
    public UpdateUploadMonitoringHStatActivity = this.env.FoundationR3Url + this.url.UpdateUploadMonitoringHStatActivity;
    public CancelUpload = this.env.FoundationR3Url + this.url.CancelUpload;
    public CancelUploadV2 = this.env.FoundationR3Url + this.url.CancelUploadV2;
    public UploadFile = this.env.FoundationR3Url + this.url.UploadFile;

    //UPLOAD MONITORING FOUNDATION
    public GetUploadMonitoringPaging = this.env.FoundationR3Url + this.url.GetUploadMonitoringPaging;

    //UPLOAD TYPE
    public GetUploadTypeByUploadTypeId = this.env.FoundationR3Url + this.url.GetUploadTypeByUploadTypeId;
    public GetUploadTypePaging = this.env.FoundationR3Url + this.url.GetUploadTypePaging;

    //UPLOAD SETTING
    public GetUploadSettingHIdByUploadTypeId = this.env.FoundationR3Url + this.url.GetUploadSettingHIdByUploadTypeId;
    public GetListUploadSettingDIdByUploadSettingHId = this.env.FoundationR3Url + this.url.GetListUploadSettingDIdByUploadSettingHId;
    public GetListUploadSettingDIdByUploadTypeId = this.env.FoundationR3Url + this.url.GetListUploadSettingDIdByUploadTypeId;
    public AssignRoleToUploadSetting = this.env.FoundationR3Url + this.url.AssignRoleToUploadSetting;
    public GetListRefRoleByUploadTypeId = this.env.FoundationR3Url + this.url.GetListRefRoleByUploadTypeId;
    public GetListUploadSettingDByUploadSettingHId = this.url.GetListUploadSettingDByUploadSettingHId;

    // GENERIC
    public GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode = this.env.ApprovalR3Url + this.url.GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode;

    // ASSET TYPE
    public AddAssetType = this.env.FoundationR3Url + this.url.AddAssetType;
    public EditAssetType = this.env.FoundationR3Url + this.url.EditAssetType;
    public GetAssetTypeByCode = this.env.FoundationR3Url + this.url.GetAssetTypeByCode;
    public GetAssetTypeById = this.env.FoundationR3Url + this.url.GetAssetTypeById;
    public GetListAssetType = this.env.FoundationR3Url + this.url.GetListAssetType;
    public GetListActiveAssetType = this.env.FoundationR3Url + this.url.GetListActiveAssetType;

    // LIST APPROVER
    public ApvHoldTaskUrl = this.env.FoundationR3Url + this.url.ApvHoldTaskUrl;
    public ApvTakeBackTaskUrl = this.env.FoundationR3Url + this.url.ApvTakeBackTaskUrl;
    public ApvUnclaimTaskUrl = this.env.FoundationR3Url + this.url.ApvUnclaimTaskUrl;
    public ApvClaimTask = this.env.FoundationR3Url + this.url.ApvClaimTask;

    //REF REASON
    public GetValueReasonModel = this.env.FoundationR3Url + this.url.GetValueReasonModel;
    public GetListActiveRefReason = this.env.FoundationR3Url + this.url.GetListActiveRefReason;
    //asset accesory
    public AddNewAssetAccesory = this.env.FoundationR3Url + this.url.AddNewAssetAccesory;
    public EditAssetAccessory = this.env.FoundationR3Url + this.url.EditAssetAccessory;
    public GetAssetAccessorybyAssetAccesoryCode = this.env.FoundationR3Url + this.url.GetAssetAccessorybyAssetAccesoryCode;
    public GetAssetAccessorybyAssetAccessoryId = this.env.FoundationR3Url + this.url.GetAssetAccessorybyAssetAccessoryId;
    public GetlistAssetAccessorybyAssetTypeId = this.env.FoundationR3Url + this.url.GetlistAssetAccessorybyAssetTypeId;
    public DeleteAssetAccessory = this.env.FoundationR3Url + this.url.DeleteAssetAccessory;

    //asset attr
    public AddAssetAttr = this.env.FoundationR3Url + this.url.AddAssetAttr;
    public EditAssetAttr = this.env.FoundationR3Url + this.url.EditAssetAttr;
    public GetListAssetAttrByAssetTypeId = this.env.FoundationR3Url + this.url.GetListAssetAttrByAssetTypeId;
    public GetAssetAttrByAssetAttrId = this.env.FoundationR3Url + this.url.GetAssetAttrByAssetAttrId;
    public DeleteAssetAttr = this.env.FoundationR3Url + this.url.DeleteAssetAttr;

    //asset category
    public AddNewAssetCategory = this.env.FoundationR3Url + this.url.AddNewAssetCategory;
    public EditAssetCategory = this.env.FoundationR3Url + this.url.EditAssetCategory;
    public GetAssetCategoryByAssetCategoryCode = this.env.FoundationR3Url + this.url.GetAssetCategoryByAssetCategoryCode;
    public GetAssetCategorybyAssetCategoryId = this.env.FoundationR3Url + this.url.GetAssetCategorybyAssetCategoryId;
    public GetlistAssetCategorybyAssetTypeId = this.env.FoundationR3Url + this.url.GetlistAssetCategorybyAssetTypeId;
    public DeleteAssetCategory = this.env.FoundationR3Url + this.url.DeleteAssetCategory;
    public GetActiveAssetCategoryValue = this.env.FoundationR3Url + this.url.GetActiveAssetCategoryValue;

    // ASSET DOC LIST
    public AddNewAssetDocList = this.env.FoundationR3Url + this.url.AddNewAssetDocList;
    public EditAssetDocList = this.env.FoundationR3Url + this.url.EditAssetDocList;
    public GetAssetDocListByAssetDocListId = this.env.FoundationR3Url + this.url.GetAssetDocListByAssetDocListId;
    public GetlistAssetDocListByAssetTypeId = this.env.FoundationR3Url + this.url.GetlistAssetDocListByAssetTypeId;
    public DeleteAssetDocList = this.env.FoundationR3Url + this.url.DeleteAssetDocList;

    // ASSET REF DOC
    public AddNewRefAssetDocData = this.env.FoundationR3Url + this.url.AddNewRefAssetDocData;
    public EditRefAssetDocData = this.env.FoundationR3Url + this.url.EditRefAssetDocData;
    public GetRefAssetDocByAssetDocCode = this.env.FoundationR3Url + this.url.GetRefAssetDocByAssetDocCode;
    public GetRefAssetDocByRefAssetDocId = this.env.FoundationR3Url + this.url.GetRefAssetDocByRefAssetDocId;
    public GetListRefAssetDoc = this.env.FoundationR3Url + this.url.GetListRefAssetDoc;


    // ASSET SCHEME
    public GetAssetSchmHById = this.env.FoundationR3Url + this.url.GetAssetSchmHById;
    public AddAssetSchmH = this.env.FoundationR3Url + this.url.AddAssetSchmH;
    public EditAssetSchmH = this.env.FoundationR3Url + this.url.EditAssetSchmH;
    public GetListAssetSchmDByAssetSchmHId = this.env.FoundationR3Url + this.url.GetListAssetSchmDByAssetSchmHId;
    public EditListAssetSchmD = this.env.FoundationR3Url + this.url.EditListAssetSchmD;
    public AddListAssetSchmD = this.env.FoundationR3Url + this.url.AddListAssetSchmD;
    public DeleteAssetSchmD = this.env.FoundationR3Url + this.url.DeleteAssetSchmD;
    public AddRangeAssetSchmD = this.env.FoundationR3Url + this.url.AddRangeAssetSchmD;

    // ASSET TYPE
    public GetActiveAssetTypeValue = this.env.FoundationR3Url + this.url.GetActiveAssetTypeValue;

    // ASSET NEGATIVE
    public AddAssetNegative = this.env.FoundationR3Url + this.url.AddAssetNegative;
    public EditAssetNegative = this.env.FoundationR3Url + this.url.EditAssetNegative;
    public GetAssetNegativeByIdEditPage = this.env.FoundationR3Url + this.url.GetAssetNegativeByIdEditPage;
    public GetUploadAssetNegativeByUploadMonitoringNoAndTrxType = this.env.FoundationR3Url + this.url.GetUploadAssetNegativeByUploadMonitoringNoAndTrxType;

    // VENDOR
    public AddVendorHO = this.env.FoundationR3Url + this.url.AddVendorHO;
    public AddVendorHOX = this.env.FoundationR3Url + this.url.AddVendorHOX;
    public EditVendorHO = this.env.FoundationR3Url + this.url.EditVendorHO;
    public EditVendorHOX = this.env.FoundationR3Url + this.url.EditVendorHOX;
    public AddVendorHolding = this.env.FoundationR3Url + this.url.AddVendorHolding;
    public EditVendorHolding = this.env.FoundationR3Url + this.url.EditVendorHolding;
    public AddVendorATPM = this.env.FoundationR3Url + this.url.AddVendorATPM;
    public EditVendorATPM = this.env.FoundationR3Url + this.url.EditVendorATPM;
    public GetVendorAndVendorAddr = this.env.FoundationR3Url + this.url.GetVendorAndVendorAddr;
    public GetVendorByVendorId = this.env.FoundationR3Url + this.url.GetVendorByVendorId;
    public AddVendorAddr = this.env.FoundationR3Url + this.url.AddVendorAddr;
    public EditVendorAddr = this.env.FoundationR3Url + this.url.EditVendorAddr;
    public GetVendorAddrByVendorId = this.env.FoundationR3Url + this.url.GetVendorAddrByVendorId;
    public GetListHoByVendorId = this.env.FoundationR3Url + this.url.GetListHoByVendorId;
    public GetListVendorBankAccByVendorId = this.env.FoundationR3Url + this.url.GetListVendorBankAccByVendorId;
    public AddVendorBankAcc = this.env.FoundationR3Url + this.url.AddVendorBankAcc;
    public EditVendorBankAcc = this.env.FoundationR3Url + this.url.EditVendorBankAcc;
    public GetVendorBankAccByVendorBankAccId = this.env.FoundationR3Url + this.url.GetVendorBankAccByVendorBankAccId;
    public DeleteVendorBankAcc = this.env.FoundationR3Url + this.url.DeleteVendorBankAcc;
    public GetListVendorContactPersonByVendorCode = this.env.FoundationR3Url + this.url.GetListVendorContactPersonByVendorCode;
    public GetVendorContactPersonById = this.env.FoundationR3Url + this.url.GetVendorContactPersonById;
    public AddVendorContactPerson = this.env.FoundationR3Url + this.url.AddVendorContactPerson;
    public EditVendorContactPerson = this.env.FoundationR3Url + this.url.EditVendorContactPerson;
    public DeleteVendorContactPerson = this.env.FoundationR3Url + this.url.DeleteVendorContactPerson;
    public GetListVendorContactPersonByVendorId = this.env.FoundationR3Url + this.url.GetListVendorContactPersonByVendorId;
    public GetListBranchByVendorId = this.env.FoundationR3Url + this.url.GetListBranchByVendorId;
    public GetListVendorBankAccByVendorEmpId = this.env.FoundationR3Url + this.url.GetListVendorBankAccByVendorEmpId;
    public GetVendorAddrByVendorAddrId = this.env.FoundationR3Url + this.url.GetVendorAddrByVendorAddrId;
    public GetVendorByVendorCode = this.env.FoundationR3Url + this.url.GetVendorByVendorCode;
    public GetListKeyValueActiveByCategoryCodeAndOfficeCode = this.env.FoundationR3Url + this.url.GetListKeyValueActiveByCategoryCodeAndOfficeCode;
    public GetListKvpVendorObjByCategoryCode = this.env.FoundationR3Url + this.url.GetListKvpVendorObjByCategoryCode;
    public GetListVendorContactPersonWithoutJobPositionByVendorId = this.env.FoundationR3Url + this.url.GetListVendorContactPersonWithoutJobPositionByVendorId;
    // VENDOR ADDR
    public GetVendorAddrByVendorCodeAndMrAddrTypeCode = this.env.FoundationR3Url + this.url.GetVendorAddrByVendorCodeAndMrAddrTypeCode;
    public GetVendorAddrByVendorCode = this.env.FoundationR3Url + this.url.GetVendorAddrByVendorCode;

    // VENDOR BANK ACC
    public GetVendorBankAccDefaultByVendorId = this.env.FoundationR3Url + this.url.GetVendorBankAccDefaultByVendorId;

    // VENDOR GRADING
    public SubmitRequestVendorGrading = this.env.FoundationR3Url + this.url.SubmitRequestVendorGrading;
    public SubmitRequestVendorGradingV2 = this.env.FoundationR3Url + this.url.SubmitRequestVendorGradingV2;
    public GetRuleVendorGrading = this.env.FoundationR3Url + this.url.GetRuleVendorGrading;
    public GetRuleVendorGradingV2 = this.env.FoundationR3Url + this.url.GetRuleVendorGradingV2;
    public GetVendorGrade = this.env.FoundationR3Url + this.url.GetVendorGrade;

    // VENDOR OFFICE MEMBER
    public AddListVendorOfficeMember = this.env.FoundationR3Url + this.url.AddListVendorOfficeMember;
    public AddListVendorOfficeMemberX = this.env.FoundationR3Url + this.url.AddListVendorOfficeMemberX;
    public GetListVendorOfficeMbrByVendorId = this.env.FoundationR3Url + this.url.GetListVendorOfficeMbrByVendorId;
    public GetListVendorOfficeMbrXByVendorId = this.env.FoundationR3Url + this.url.GetListVendorOfficeMbrXByVendorId;
    public DeleteVendorOfficeMember = this.env.FoundationR3Url + this.url.DeleteVendorOfficeMember;
    public DeleteVendorOfficeMemberX = this.env.FoundationR3Url + this.url.DeleteVendorOfficeMemberX;

    // VENDOR GROUP
    public AddVendorGrp = this.env.FoundationR3Url + this.url.AddVendorGrp;
    public EditVendorGrp = this.env.FoundationR3Url + this.url.EditVendorGrp;
    public GetVendorGrpByVendorGrpCode = this.env.FoundationR3Url + this.url.GetVendorGrpByVendorGrpCode;
    public GetVendorGrpByVendorGrpId = this.env.FoundationR3Url + this.url.GetVendorGrpByVendorGrpId;
    public GetVendorGrpForUpdateByVendorGrpCode = this.env.FoundationR3Url + this.url.GetVendorGrpForUpdateByVendorGrpCode;
    public GetVendorGrpForUpdateByVendorGrpId = this.env.FoundationR3Url + this.url.GetVendorGrpForUpdateByVendorGrpId;
    public GetListVendorGrpByVendorId = this.env.FoundationR3Url + this.url.GetListVendorGrpByVendorId;

    // VENDOR GROUP MEMBER
    public GetListVendorGrpMbrByVendorGrpId = this.env.FoundationR3Url + this.url.GetListVendorGrpMbrByVendorGrpId;
    public GetListVendorGrpMbrByVendorId = this.env.FoundationR3Url + this.url.GetListVendorGrpMbrByVendorId;
    public AddRangeVendorGrpMbr = this.env.FoundationR3Url + this.url.AddRangeVendorGrpMbr;
    public DeleteVendorGrpMemberById = this.env.FoundationR3Url + this.url.DeleteVendorGrpMemberById;

    // VENDOR BRANCH
    public AddVendorBranch = this.env.FoundationR3Url + this.url.AddVendorBranch;
    public AddVendorBranchX = this.env.FoundationR3Url + this.url.AddVendorBranchX;
    public GetVendorBranchAndVendorTaxAddrByVendorId = this.env.FoundationR3Url + this.url.GetVendorBranchAndVendorTaxAddrByVendorId;
    public GetVendorX = this.env.FoundationR3Url + this.url.GetVendorX;
    public EditVendorBranch = this.env.FoundationR3Url + this.url.EditVendorBranch;
    public EditVendorBranchX = this.env.FoundationR3Url + this.url.EditVendorBranchX;
    public GetVendorByTaxNoX = this.env.FoundationR3Url + this.url.GetVendorByTaxNoX;

    // VENDOR EMP
    public AddVendorBranchEmp = this.env.FoundationR3Url + this.url.AddVendorBranchEmp;
    public AddVendorBranchEmpV2 = this.env.FoundationR3Url + this.url.AddVendorBranchEmpV2;
    public AddVendorBranchEmpV2X = this.env.FoundationR3Url + this.url.AddVendorBranchEmpV2X;
    public GetVendorEmpByVendorEmpId = this.env.FoundationR3Url + this.url.GetVendorEmpByVendorEmpId;
    public GetVendorEmpAndVendorTaxAddrByVendorEmpId = this.env.FoundationR3Url + this.url.GetVendorEmpAndVendorTaxAddrByVendorEmpId;
    public GetVendorEmpAndVendorTaxAddrByVendorEmpIdX = this.env.FoundationR3Url + this.url.GetVendorEmpAndVendorTaxAddrByVendorEmpIdX;
    public EditVendorBranchEmp = this.env.FoundationR3Url + this.url.EditVendorBranchEmp;
    public EditVendorBranchEmpV2 = this.env.FoundationR3Url + this.url.EditVendorBranchEmpV2;
    public EditVendorBranchEmpV2X = this.env.FoundationR3Url + this.url.EditVendorBranchEmpV2X;
    public GetListVendorEmpByVendorId = this.env.FoundationR3Url + this.url.GetListVendorEmpByVendorId;
    public GetListVendorEmpByVendorIdX = this.env.FoundationR3Url + this.url.GetListVendorEmpByVendorIdX;
    public GetVendorEmpXByTaxNoXAndIdNo = this.env.FoundationR3Url + this.url.GetVendorEmpXByTaxNoXAndIdNo;
    // VENDOR ADDR
    public GetVendorAddrByVendorEmpId = this.env.FoundationR3Url + this.url.GetVendorAddrByVendorEmpId;

    // VENDOR SCHEME
    public AddVendorSchm = this.env.FoundationR3Url + this.url.AddVendorSchm;
    public EditVendorSchm = this.env.FoundationR3Url + this.url.EditVendorSchm;
    public GetVendorSchmByVendorSchmId = this.env.FoundationR3Url + this.url.GetVendorSchmByVendorSchmId;
    public AddVendorSchmMember = this.env.FoundationR3Url + this.url.AddVendorSchmMember;
    public DeleteVendorSchmMember = this.env.FoundationR3Url + this.url.DeleteVendorSchmMember;
    public GetListVendorSchmMemberByVendorSchmId = this.env.FoundationR3Url + this.url.GetListVendorSchmMemberByVendorSchmId;

    // VENDOR ATTR
    public GetListActiveVendorAttrByVendorCategoryCode = this.env.FoundationR3Url + this.url.GetListActiveVendorAttrByVendorCategoryCode;

    // VENDOR ATTR CONTENT
    public AddRangeVendorAttrContent = this.env.FoundationR3Url + this.url.AddRangeVendorAttrContent;
    public EditListVendorAttrContent = this.env.FoundationR3Url + this.url.EditListVendorAttrContent;
    public DeleteRangeVendorAttrContentByIds = this.url.DeleteRangeVendorAttrContentByIds;
    public GetListVendorAttrContentByVendorAttrId = this.env.FoundationR3Url + this.url.GetListVendorAttrContentByVendorAttrId;
    public GetListVendorAttrContentByVendorId = this.env.FoundationR3Url + this.url.GetListVendorAttrContentByVendorId;
    public GetListActiveAttrVendorAttrContentByVendorId = this.env.FoundationR3Url + this.url.GetListActiveAttrVendorAttrContentByVendorId;
    public GetListVendorAttrContentByVendorCode = this.env.FoundationR3Url + this.url.GetListVendorAttrContentByVendorCode;

    // VENDOR ATPM MAPPING
    public GetListVendorAtpmMappingByVendorId = this.env.FoundationR3Url + this.url.GetListVendorAtpmMappingByVendorId;

    // VERIFICATION
    // REF VERF ANSWER TYPE
    public GetActiveRefVerfAnswerTypes = this.env.FoundationR3Url + this.url.GetActiveRefVerfAnswerTypes;
    public GetRefVerfAnswerTypeByCode = this.env.FoundationR3Url + this.url.GetRefVerfAnswerTypeByCode;
    public GetRefVerfAnswerTypeById = this.env.FoundationR3Url + this.url.GetRefVerfAnswerTypeById;
    public GetRefVerfAnswerTypes = this.env.FoundationR3Url + this.url.GetRefVerfAnswerTypes;
    public GetRefVerfAnswerTypeForUpdateById = this.env.FoundationR3Url + this.url.GetRefVerfAnswerTypeForUpdateById;
    public GetRefVerfAnswerTypeForUpdateByCode = this.env.FoundationR3Url + this.url.GetRefVerfAnswerTypeForUpdateByCode;

    // VERF QUESTION ANSWER
    public AddVerfQuestionAnswer = this.env.FoundationR3Url + this.url.AddVerfQuestionAnswer;
    public EditVerfQuestionAnswer = this.env.FoundationR3Url + this.url.EditVerfQuestionAnswer;
    public GetVerfQuestionAnswerByRefVerfAnswerTypeId = this.env.FoundationR3Url + this.url.GetVerfQuestionAnswerByRefVerfAnswerTypeId;
    public GetVerfQuestionAnswerForUpdateById = this.env.FoundationR3Url + this.url.GetVerfQuestionAnswerForUpdateById;
    public GetVerfQuestionAnswerListByVerfSchemeCode = this.env.FoundationR3Url + this.url.GetVerfQuestionAnswerListByVerfSchemeCode;
    public GetVerfQuestionAnswerListByVerfSchemeHId = this.env.FoundationR3Url + this.url.GetVerfQuestionAnswerListByVerfSchemeHId;

    // VERF QUESTION GRP H
    public AddVerfQuestionGrpH = this.env.FoundationR3Url + this.url.AddVerfQuestionGrpH;
    public EditVerfQuestionGrpH = this.env.FoundationR3Url + this.url.EditVerfQuestionGrpH;
    public GetActiveVerfQuestionGrpHs = this.env.FoundationR3Url + this.url.GetActiveVerfQuestionGrpHs;
    public GetVerfQuestionGrpHs = this.env.FoundationR3Url + this.url.GetVerfQuestionGrpHs;
    public GetQuestionGrpHById = this.env.FoundationR3Url + this.url.GetQuestionGrpHById;
    public GetQuestionGrpHForUpdateById = this.env.FoundationR3Url + this.url.GetQuestionGrpHForUpdateById;
    public GetQuestionGrpHByCode = this.env.FoundationR3Url + this.url.GetQuestionGrpHByCode;
    public GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById = this.env.FoundationR3Url + this.url.GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById;

    // VERF QUESTION GRP D
    public AddListVerfQuestionGrpD = this.env.FoundationR3Url + this.url.AddListVerfQuestionGrpD;
    public DeleteVerfQuestionGroupDById = this.env.FoundationR3Url + this.url.DeleteVerfQuestionGroupDById;
    public EditVerfQuestionGrpD = this.env.FoundationR3Url + this.url.EditVerfQuestionGrpD;
    public GetActiveVerfQuestionGrpDsByGrpHId = this.env.FoundationR3Url + this.url.GetActiveVerfQuestionGrpDsByGrpHId;
    public GetVerfQuestionGrpDById = this.env.FoundationR3Url + this.url.GetVerfQuestionGrpDById;
    public GetVerfQuestionGrpDByGrpHId = this.env.FoundationR3Url + this.url.GetVerfQuestionGrpDByGrpHId;
    public GetVerfQuestionGrpDForUpdateById = this.env.FoundationR3Url + this.url.GetVerfQuestionGrpDForUpdateById;

    // VERF RESULT
    public GetVerfResultsByTrxRefNo = this.env.FoundationR3Url + this.url.GetVerfResultsByTrxRefNo;
    public GetVerfResultById = this.env.FoundationR3Url + this.url.GetVerfResultById;
    public GetVerfResultByResultNo = this.env.FoundationR3Url + this.url.GetVerfResultByResultNo;
    public GetVerfResultByTrxRefNoAndVerfTrxTypeCode = this.env.FoundationR3Url + this.url.GetVerfResultByTrxRefNoAndVerfTrxTypeCode;
    public AddVerfResult = this.env.FoundationR3Url + this.url.AddVerfResult;
    public AddVerfResultHeaderAndVerfResultDetailForSurveyVerif = this.env.FoundationR3Url + this.url.AddVerfResultHeaderAndVerfResultDetailForSurveyVerif;

    // VERF RESULT H
    public GetVerfResultHsByVerfResultId = this.env.FoundationR3Url + this.url.GetVerfResultHsByVerfResultId;
    public GetVerfResultHById = this.env.FoundationR3Url + this.url.GetVerfResultHById;
    public GetVerfResultHsByTrxRefNo = this.env.FoundationR3Url + this.url.GetVerfResultHsByTrxRefNo;
    public GetVerfResultHByTrxRefNoAndMrAddrTypeCode = this.env.FoundationR3Url + this.url.GetVerfResultHByTrxRefNoAndMrAddrTypeCode;
    public GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode = this.env.FoundationR3Url + this.url.GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode;

    // VERF RESULT D
    public EditVerfResultD = this.env.FoundationR3Url + this.url.EditVerfResultD;
    public GetVerfResultDsByVerfResultHId = this.env.FoundationR3Url + this.url.GetVerfResultDsByVerfResultHId;
    public GetVerfResultDById = this.env.FoundationR3Url + this.url.GetVerfResultDById;
    public GetListVerfResultDInQuestionGrp = this.env.FoundationR3Url + this.url.GetListVerfResultDInQuestionGrp;

    // VERF SCHEME H
    public AddVerfSchemeH = this.env.FoundationR3Url + this.url.AddVerfSchemeH;
    public EditVerfSchemeH = this.env.FoundationR3Url + this.url.EditVerfSchemeH;
    public DeleteVerfSchemeHById = this.env.FoundationR3Url + this.url.DeleteVerfSchemeHById;
    public GetActiveVerfSchemeHs = this.env.FoundationR3Url + this.url.GetActiveVerfSchemeHs;
    public GetVerfSchemeHs = this.env.FoundationR3Url + this.url.GetVerfSchemeHs;
    public GetVerfSchemeHById = this.env.FoundationR3Url + this.url.GetVerfSchemeHById;
    public GetVerfSchemeHByCode = this.env.FoundationR3Url + this.url.GetVerfSchemeHByCode;

    // VERF SCHEME D
    public EditVerfSchemeD = this.env.FoundationR3Url + this.url.EditVerfSchemeD;
    public GetVerfSchemeHForUpdateById = this.env.FoundationR3Url + this.url.GetVerfSchemeHForUpdateById;
    public GetVerfSchemeDataByVerfSchemeHId = this.env.FoundationR3Url + this.url.GetVerfSchemeDataByVerfSchemeHId;
    public AddListVerfSchemeD = this.env.FoundationR3Url + this.url.AddListVerfSchemeD;
    public DeleteVerfSchemeD = this.env.FoundationR3Url + this.url.DeleteVerfSchemeD;
    public GetVerfSchemeDsByVerfSchemeHId = this.env.FoundationR3Url + this.url.GetVerfSchemeDsByVerfSchemeHId;
    public GetVerfSchemeDById = this.env.FoundationR3Url + this.url.GetVerfSchemeDById;

    // CUST DUPLICATE CHECKING
    public GetCustomerDuplicateCheck = this.env.FoundationR3Url + this.url.GetCustomerDuplicateCheck;
    public GetNegativeCustomerDuplicateCheck = this.env.FoundationR3Url + this.url.GetNegativeCustomerDuplicateCheck;
    public GetCustomerAndNegativeCustDuplicateCheck = this.env.FoundationR3Url + this.url.GetCustomerAndNegativeCustDuplicateCheck;
    public GetCustomerAndNegativeCustDuplicateCheckV2 = this.env.FoundationR3Url + this.url.GetCustomerAndNegativeCustDuplicateCheckV2;

    // CUSTOMER PERSONAL
    public AddNewCustPersonal = this.env.FoundationR3Url + this.url.AddNewCustPersonal;
    public EditCustPersonal = this.env.FoundationR3Url + this.url.EditCustPersonal;
    public GetCustPersonalbyCustPersonalId = this.env.FoundationR3Url + this.url.GetCustPersonalbyCustPersonalId;
    public GetCustPersonalbyCustId = this.env.FoundationR3Url + this.url.GetCustPersonalbyCustId;
    public GetCustPersonalbyCustIdV2 = this.env.FoundationR3Url + this.url.GetCustPersonalbyCustIdV2;

    // CUSTOMER
    public AddNewCust = this.env.FoundationR3Url + this.url.AddNewCust;
    public AddCustPersonalMainData = this.env.FoundationR3Url + this.url.AddCustPersonalMainData;
    public AddCustPersonalMainDataV2 = this.env.FoundationR3Url + this.url.AddCustPersonalMainDataV2;
    public AddCustCompanyMainData = this.env.FoundationR3Url + this.url.AddCustCompanyMainData;
    public AddCustCompanyMainDataV2 = this.env.FoundationR3Url + this.url.AddCustCompanyMainDataV2;
    public EditCust = this.env.FoundationR3Url + this.url.EditCust;
    public EditCustPersonalMainData = this.env.FoundationR3Url + this.url.EditCustPersonalMainData;
    public EditCustPersonalMainDataV2 = this.env.FoundationR3Url + this.url.EditCustPersonalMainDataV2;
    public EditCustCompanyMainData = this.env.FoundationR3Url + this.url.EditCustCompanyMainData;
    public EditCustCompanyMainDataV2 = this.env.FoundationR3Url + this.url.EditCustCompanyMainDataV2;
    public EditDuplicateCust = this.env.FoundationR3Url + this.url.EditDuplicateCust;
    public EditNegativeDuplicateCust = this.env.FoundationR3Url + this.url.EditNegativeDuplicateCust;
    public GetCustByCustId = this.env.FoundationR3Url + this.url.GetCustByCustId;
    public GetCustPersonalForUpdateByCustNo = this.env.FoundationR3Url + this.url.GetCustPersonalForUpdateByCustNo;
    public GetCustCompanyForUpdateByCustNo = this.env.FoundationR3Url + this.url.GetCustCompanyForUpdateByCustNo;
    public DeleteNegativeCustomer = this.env.FoundationR3Url + this.url.DeleteNegativeCustomer;
    public GetListCustGrpByMemberCustIdForCustGrpTab = this.env.FoundationR3Url + this.url.GetListCustGrpByMemberCustIdForCustGrpTab;
    public GetListCustGrpByMemberCustId = this.env.FoundationR3Url + this.url.GetListCustGrpByMemberCustId;
    public GetCustByCustNo = this.env.FoundationR3Url + this.url.GetCustByCustNo;
    public AddCustAsset = this.env.FoundationR3Url + this.url.AddCustAsset;
    public DeleteCustAsset = this.env.FoundationR3Url + this.url.DeleteCustAsset;
    public EditCustAsset = this.env.FoundationR3Url + this.url.EditCustAsset;
    public GetCustAssetByCustAssetId = this.env.FoundationR3Url + this.url.GetCustAssetByCustAssetId;
    public GetListCustAssetByCustId = this.env.FoundationR3Url + this.url.GetListCustAssetByCustId;
    public UpdateToMainCustomer = this.env.FoundationR3Url + this.url.UpdateToMainCustomer;

    public SaveCustPersonalShareholderMainData = this.env.FoundationR3Url  + this.url.SaveCustPersonalShareholderMainData;
    public SaveCustPersonalShareholderMainDataV2 = this.env.FoundationR3Url  + this.url.SaveCustPersonalShareholderMainDataV2;
    public SaveCustPersonalShareholderMainDataV3 = this.env.FoundationR3Url  + this.url.SaveCustPersonalShareholderMainDataV3;
    public SaveCustCompanyShareholderMainData = this.env.FoundationR3Url  + this.url.SaveCustCompanyShareholderMainData;
    public SaveCustCompanyShareholderMainDataV2 = this.env.FoundationR3Url  + this.url.SaveCustCompanyShareholderMainDataV2;
    public SaveCustCompanyShareholderMainDataV3 = this.env.FoundationR3Url  + this.url.SaveCustCompanyShareholderMainDataV3;
    public SaveCustPersonalFamilyMainData = this.env.FoundationR3Url  + this.url.SaveCustPersonalFamilyMainData;
    public SaveCustPersonalFamilyMainDataV2 = this.env.FoundationR3Url  + this.url.SaveCustPersonalFamilyMainDataV2;
    public SaveCustPersonalFamilyMainDataV3 = this.env.FoundationR3Url  + this.url.SaveCustPersonalFamilyMainDataV3;

    public NewEditDuplicateCust = this.env.FoundationR3Url  + this.url.NewEditDuplicateCust;
    public NewEditDuplicateCustV2 = this.env.FoundationR3Url  + this.url.NewEditDuplicateCustV2;


    public GetCustHighlightCommentByCustId = this.env.FoundationR3Url + this.url.GetCustHighlightCommentByCustId;
    public SendCustomerDataToRabbitMq = this.env.FoundationR3Url + this.url.SendCustomerDataToRabbitMq;
    // CUSTOMER COMPANY
    public GetListViewCustCompanyLegalDocByCustCompanyId = this.env.FoundationR3Url + this.url.GetListViewCustCompanyLegalDocByCustCompanyId;
    public DeleteCustCompanyLegalDoc = this.env.FoundationR3Url + this.url.DeleteCustCompanyLegalDoc;
    public AddCustCompanyLegalDoc = this.env.FoundationR3Url + this.url.AddCustCompanyLegalDoc;
    public EditCustCompanyLegalDoc = this.env.FoundationR3Url + this.url.EditCustCompanyLegalDoc;
    
    //CUSTOMER COMPANY INDUSTRY INFO
    public GetListCustCompanyIndustryInfoByCustId = this.env.FoundationR3Url + this.url.GetListCustCompanyIndustryInfoByCustId;
    public AddEditCustCompanyIndustryInfo = this.env.FoundationR3Url + this.url.AddEditCustCompanyIndustryInfo;
    public DeleteCustCompanyIndustryInfo = this.env.FoundationR3Url + this.url.DeleteCustCompanyIndustryInfo;
    public UploadCustCompanyLegalDoc = this.env.FoundationR3Url + this.url.UploadCustCompanyLegalDoc;
    public UploadCustCompanyIndustryDoc = this.env.FoundationR3Url + this.url.UploadCustCompanyIndustryDoc;
    
    // CUSTOMER GROUP
    public AddCustGrpBothWays = this.env.FoundationR3Url + this.url.AddCustGrpBothWays;
    public AddCustGrp = this.env.FoundationR3Url + this.url.AddCustGrp;
    public EditCustGrp = this.env.FoundationR3Url + this.url.EditCustGrp;
    public DeleteCustGrp = this.env.FoundationR3Url + this.url.DeleteCustGrp;

    // CUSTOMER FIN DATA
    public GetCBAForCustFinDataByCustId = this.env.FoundationR3Url + this.url.GetCBAForCustFinDataByCustId;
    public AddCBAForCustFinData = this.env.FoundationR3Url + this.url.AddCBAForCustFinData;
    public EditCBAForCustFinData = this.env.FoundationR3Url + this.url.EditCBAForCustFinData;
    public GetCustBankAccByCustBankAccId = this.env.FoundationR3Url + this.url.GetCustBankAccByCustBankAccId;
    public GetCBAForCustFinDataEditModeByCustBankAccId = this.env.FoundationR3Url + this.url.GetCBAForCustFinDataEditModeByCustBankAccId;
    public GetCustBankAccByCustBankAccIdWithRefBank = this.env.FoundationR3Url + this.url.GetCustBankAccByCustBankAccIdWithRefBank;
    public AddCustBankAcc = this.env.FoundationR3Url + this.url.AddCustBankAcc;
    public GetCustPersonalFinDataByCustPersonalId = this.env.FoundationR3Url + this.url.GetCustPersonalFinDataByCustPersonalId;
    public GetListCustPersonalFinDataByCustId = this.env.FoundationR3Url + this.url.GetListCustPersonalFinDataByCustId;
    public GetCustCompanyFinDataByCustCompanyId = this.env.FoundationR3Url + this.url.GetCustCompanyFinDataByCustCompanyId;
    public GetListCustCompanyFinDataByCustId = this.env.FoundationR3Url + this.url.GetListCustCompanyFinDataByCustId;
    public AddCustCompanyFinData = this.env.FoundationR3Url + this.url.AddCustCompanyFinData;
    public EditCustCompanyFinData = this.env.FoundationR3Url + this.url.EditCustCompanyFinData;
    public DeleteCustCompanyFinData =  this.env.FoundationR3Url + this.url.DeleteCustCompanyFinData;
    public AddCustPersonalFinData = this.env.FoundationR3Url + this.url.AddCustPersonalFinData;
    public EditCustPersonalFinData = this.env.FoundationR3Url + this.url.EditCustPersonalFinData;
    public DeleteCustPersonalFinData = this.env.FoundationR3Url + this.url.DeleteCustPersonalFinData;
    public GetCustPersonalFinDataForCustViewByCustId = this.env.FoundationR3Url + this.url.GetCustPersonalFinDataForCustViewByCustId;
    public GetListCustPersonalFinDataForCustViewByCustId = this.env.FoundationR3Url + this.url.GetListCustPersonalFinDataForCustViewByCustId;
    public EditCustBankAcc = this.env.FoundationR3Url + this.url.EditCustBankAcc;
    public DeleteCustBankAccAndStmnt = this.env.FoundationR3Url + this.url.DeleteCustBankAccAndStmnt;

    // CUSTOMER ADDRESS
    public GetListCustAddr = this.env.FoundationR3Url + this.url.GetListCustAddr;
    public AddCustAddr = this.env.FoundationR3Url + this.url.AddCustAddr;
    public EditCustAddr = this.env.FoundationR3Url + this.url.EditCustAddr;
    public GetCustAddr = this.env.FoundationR3Url + this.url.GetCustAddr;
    public GetListCustAddrByCustId = this.env.FoundationR3Url + this.url.GetListCustAddrByCustId;
    public GetListCustAddrByCustIdForCustomerPersonalView = this.env.FoundationR3Url + this.url.GetListCustAddrByCustIdForCustomerPersonalView;
    public GetCustAddrLegalAddrByCustId = this.env.FoundationR3Url + this.url.GetCustAddrLegalAddrByCustId;
    public GetCustAddrByMrCustAddrType = this.env.FoundationR3Url + this.url.GetCustAddrByMrCustAddrType;
    public DeleteCustAddr = this.url.DeleteCustAddr;

    // CUSTOMER ADDRESS HISTORY
    public GetListCustAddrHistByCustId = this.env.FoundationR3Url + this.url.GetListCustAddrHistByCustId;
    public GetListCustAddrHistByCustIdForCustomerPersonalView = this.env.FoundationR3Url + this.url.GetListCustAddrHistByCustIdForCustomerPersonalView;

    // CUSTOMER JOB DATA
    public AddCustPersonalJobData = this.env.FoundationR3Url + this.url.AddCustPersonalJobData;
    public EditCustPersonalJobData = this.env.FoundationR3Url + this.url.EditCustPersonalJobData;
    public GetCustPersonalJobDataByCustId = this.env.FoundationR3Url + this.url.GetCustPersonalJobDataByCustId;

    // CUSTOMER COMPANY LEGAL DOC
    public GetCustCompanyLegalDocForCustViewByCustId = this.env.FoundationR3Url + this.url.GetCustCompanyLegalDocForCustViewByCustId;

    // CUSTOMER COMPANY
    public GetCustCompanyByCustId = this.env.FoundationR3Url + this.url.GetCustCompanyByCustId;
    public EditCustCompany = this.env.FoundationR3Url + this.url.EditCustCompany;

    // CUSTOMER COMPANY CONTACT PERSON
    public AddCustCompanyContactPerson = this.env.FoundationR3Url + this.url.AddCustCompanyContactPerson;
    public GetCustCompanyContactPersonByCustCompanyContactPersonId = this.env.FoundationR3Url + this.url.GetCustCompanyContactPersonByCustCompanyContactPersonId;
    public GetCustCompanyContactPersonByCustCompanyId = this.env.FoundationR3Url + this.url.GetCustCompanyContactPersonByCustCompanyId;
    public EditCustCompanyContactPersonByCustCompanyId = this.env.FoundationR3Url + this.url.EditCustCompanyContactPersonByCustCompanyId;

    // CUSTOMER COMPANY MANAGEMENT SHAREHOLDER
    public GetCustCompanyMgmntShrholderForCustViewByCustId = this.env.FoundationR3Url + this.url.GetCustCompanyMgmntShrholderForCustViewByCustId;
    public AddCustCompanyMgmntShrholder = this.env.FoundationR3Url + this.url.AddCustCompanyMgmntShrholder;
    public AddCustCompanyMgmntShrholderPersonal = this.env.FoundationR3Url + this.url.AddCustCompanyMgmntShrholderPersonal;
    public AddCustCompanyMgmntShrholderCompany = this.env.FoundationR3Url + this.url.AddCustCompanyMgmntShrholderCompany;
    public EditCustCompanyMgmntShrholder = this.env.FoundationR3Url + this.url.EditCustCompanyMgmntShrholder;
    public DeleteCustCompanyMgmntShrholder = this.env.FoundationR3Url + this.url.DeleteCustCompanyMgmntShrholder;
    public GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = this.env.FoundationR3Url + this.url.GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId;
    public GetListCustCompanyMgmntShrholderByCustId = this.env.FoundationR3Url + this.url.GetListCustCompanyMgmntShrholderByCustId;
    public GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = this.env.FoundationR3Url + this.url.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId;
    public GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdV2 = this.env.FoundationR3Url + this.url.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdV2;
    public AddCustCompanyMgmntShrholderPublic = this.env.FoundationR3Url + this.url.AddCustCompanyMgmntShrholderPublic;
    public EditCustCompanyMgmntShrholderPublic = this.env.FoundationR3Url + this.url.EditCustCompanyMgmntShrholderPublic;
    public GetListManagementShareholderForListPagingByCustId = this.env.FoundationR3Url + this.url.GetListManagementShareholderForListPagingByCustId;
    public GetListManagementShareholderForListPagingByCustIdV2 = this.env.FoundationR3Url + this.url.GetListManagementShareholderForListPagingByCustIdV2;
    public GetCustCompanyMgmntShrholderByCustIdAndShrholderId = this.env.FoundationR3Url + this.url.GetCustCompanyMgmntShrholderByCustIdAndShrholderId;
    public GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId = this.env.FoundationR3Url + this.url.GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId;

    // CUST ATTR CONTENT
    public GetCustAttrContentForCustViewByCustId = this.env.FoundationR3Url + this.url.GetCustAttrContentForCustViewByCustId;
    public AddEditListCustAttrContent = this.env.FoundationR3Url + this.url.AddEditListCustAttrContent;
    public GetListCustAttrContentByCustIdForCust = this.env.FoundationR3Url + this.url.GetListCustAttrContentByCustIdForCust;
    public GetListCustAttrContentByCustIdAndAttrGroup = this.env.FoundationR3Url + this.url.GetListCustAttrContentByCustIdAndAttrGroup;
    public GetListCustAttrContentByCustIdAndListAttrGroups = this.env.FoundationR3Url + this.url.GetListCustAttrContentByCustIdAndListAttrGroups;
    public GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes = this.env.FoundationR3Url + this.url.GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes;
    public GetRuleForAttrContent = this.env.FoundationR3Url + this.url.GetRuleForAttrContent;

    //CUST CONTACT PERSON
    public GetCustCompanyContactPersonForCustViewByCustId = this.env.FoundationR3Url + this.url.GetCustCompanyContactPersonForCustViewByCustId;
    public GetListCustPersonalContactPersonForCustViewByCustId = this.env.FoundationR3Url + this.url.GetListCustPersonalContactPersonForCustViewByCustId;

    // CUST GROUP
    public GetListCustGrpForCustViewByCustId = this.env.FoundationR3Url + this.url.GetListCustGrpForCustViewByCustId;
    public GetListCustGrpForCustViewByMemberCustId = this.env.FoundationR3Url + this.url.GetListCustGrpForCustViewByMemberCustId;
    public GetListCustGrpForCustViewById = this.env.FoundationR3Url + this.url.GetListCustGrpForCustViewById;

    // NEGATIVE CUSTOMER
    public AddNegativeCustomer = this.env.FoundationR3Url + this.url.AddNegativeCustomer;
    public EditNegativeCustomer = this.env.FoundationR3Url + this.url.EditNegativeCustomer;
    public EditDuplicateNegativeCust = this.env.FoundationR3Url + this.url.EditDuplicateNegativeCust;
    public EditDuplicateNegativeCustV2 = this.env.FoundationR3Url + this.url.EditDuplicateNegativeCustV2;
    public GetNegativeCustByNegativeCustId = this.env.FoundationR3Url + this.url.GetNegativeCustByNegativeCustId;
    public AddNegativeCustChangeTrx = this.env.FoundationR3Url + this.url.AddNegativeCustChangeTrx;
    public EditNegativeCustChangeTrx = this.env.FoundationR3Url + this.url.EditNegativeCustChangeTrx;
    public GetNegativeCustChangeTrxByNegativeCustId = this.env.FoundationR3Url + this.url.GetNegativeCustChangeTrxByNegativeCustId;
    public GetListNegativeCustChangeTrxByNegativeCustId = this.env.FoundationR3Url + this.url.GetListNegativeCustChangeTrxByNegativeCustId;
    public GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType = this.env.FoundationR3Url + this.url.GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType;
    public GetNegativeCustByNegativeCustNameAndCustType = this.env.FoundationR3Url + this.url.GetNegativeCustByNegativeCustNameAndCustType;

    // CUSTOMER OTHER INFO
    public AddCustOtherInfo = this.env.FoundationR3Url + this.url.AddCustOtherInfo;
    public EditCustOtherInfo = this.env.FoundationR3Url + this.url.EditCustOtherInfo;
    public GetCustOtherInfoByCustId = this.env.FoundationR3Url + this.url.GetCustOtherInfoByCustId;

    //Custsomer Personal Contact Person
    public AddNewCustPersonalContactPerson = this.env.FoundationR3Url + this.url.AddNewCustPersonalContactPerson;
    public GetListCustPersonalContactPersonByCustId = this.env.FoundationR3Url + this.url.GetListCustPersonalContactPersonByCustId;
    public DeleteCustPersonalContactPerson = this.url.DeleteCustPersonalContactPerson;
    public EditCustPersonalContactPerson = this.env.FoundationR3Url + this.url.EditCustPersonalContactPerson;
    public GetCustPersonalContactPersonByCustPersonalContactPersonId = this.env.FoundationR3Url + this.url.GetCustPersonalContactPersonByCustPersonalContactPersonId;
    public AddCustPersonalEmergencyContact = this.env.FoundationR3Url + this.url.AddCustPersonalEmergencyContact;
    public EditCustPersonalEmergencyContact = this.env.FoundationR3Url + this.url.EditCustPersonalEmergencyContact;
    public GetCustPersonalEmergencyContactByCustId = this.env.FoundationR3Url + this.url.GetCustPersonalEmergencyContactByCustId;
    public AddCustPersonalFamily = this.env.FoundationR3Url + this.url.AddCustPersonalFamily;
    public EditCustPersonalFamily = this.env.FoundationR3Url + this.url.EditCustPersonalFamily;
    public DeleteCustPersonalFamily = this.env.FoundationR3Url + this.url.DeleteCustPersonalFamily;
    public GetCustPersonalFamilyByCustPersonalFamilyId = this.env.FoundationR3Url + this.url.GetCustPersonalFamilyByCustPersonalFamilyId;
    public GetMainCustAndListCustPersonalFamilyByCustId = this.env.FoundationR3Url + this.url.GetMainCustAndListCustPersonalFamilyByCustId;
    public GetListCustPersonalEmergencyContactByCustId = this.env.FoundationR3Url + this.url.GetListCustPersonalEmergencyContactByCustId;

    // SURVEY TASK
    public GetListSrvyTaskBySrvyOrderId = this.env.FoundationR3Url + this.url.GetListSrvyTaskBySrvyOrderId;
    public GetListSrvyTaskBySrvyOrderIdForUpdate = this.env.FoundationR3Url + this.url.GetListSrvyTaskBySrvyOrderIdForUpdate;
    public AddSrvyTask = this.env.FoundationR3Url + this.url.AddSrvyTask;
    public EditSrvyTask = this.env.FoundationR3Url + this.url.EditSrvyTask;
    public EditSrvyTaskAndSendToMobile = this.env.FoundationR3Url + this.url.EditSrvyTaskAndSendToMobile;
    public DeleteSrvyTask = this.url.DeleteSrvyTask;
    public GetSrvyTaskBySrvyTaskId = this.env.FoundationR3Url + this.url.GetSrvyTaskBySrvyTaskId;
    public CancelSurveyTaskBySurveyTaskId = this.env.FoundationR3Url + this.url.CancelSurveyTaskBySurveyTaskId;
    public GetSurveyorNameBySurveyorId = this.env.FoundationR3Url + this.url.GetSurveyorNameBySurveyorId;
    public GetListSrvyTaskBySrvyOrderIdForView = this.env.FoundationR3Url + this.url.GetListSrvyTaskBySrvyOrderIdForView;
    public GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview = this.env.FoundationR3Url + this.url.GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview;
    public ReviewSurveyResult = this.env.FoundationR3Url + this.url.ReviewSurveyResult;
    public GetHtmlCodeFromMobile = this.env.FoundationR3Url + this.url.GetHtmlCodeFromMobile;
    public GetUrlViewSurveyFromMobile = this.env.FoundationR3Url + this.url.GetUrlViewSurveyFromMobile;
    public UpdateSrvyTaskAndAddVerfResultH = this.env.FoundationR3Url + this.url.UpdateSrvyTaskAndAddVerfResultH;
    public UpdateSrvyTaskAndEditVerfResultH = this.env.FoundationR3Url + this.url.UpdateSrvyTaskAndEditVerfResultH;
    public UpdateMrSurveyTaskStatCode = this.env.FoundationR3Url + this.url.UpdateMrSurveyTaskStatCode;

    // SURVEY ORDER
    public GetSrvyOrderBySrvyOrderId = this.env.FoundationR3Url + this.url.GetSrvyOrderBySrvyOrderId;
    public GetSrvyOrderByTrxRefNo = this.env.FoundationR3Url + this.url.GetSrvyOrderByTrxRefNo;
    public GetListSryvObject = this.env.FoundationR3Url + this.url.GetListSryvObject;
    public SendSrvyOrder = this.env.FoundationR3Url + this.url.SendSrvyOrder;
    public GetSrvyOrderDataBySrvyOrderId = this.env.FoundationR3Url + this.url.GetSrvyOrderDataBySrvyOrderId;

    // SURVEY FORM SCHM
    public GetListAllSrvyFormSchm = this.env.FoundationR3Url + this.url.GetListAllSrvyFormSchm;
    public GetSrvyFormSchmBySrvyFormSchmId = this.env.FoundationR3Url + this.url.GetSrvyFormSchmBySrvyFormSchmId;
    public GetListKeyValueSrvyFormSchm = this.env.FoundationR3Url + this.url.GetListKeyValueSrvyFormSchm;

    // REF FORM
    public EditRefFormData = this.env.FoundationR3Url + this.url.EditRefFormData;
    public AddRefFormData = this.env.FoundationR3Url + this.url.AddRefFormData;
    public GetRefFormDataByRefFormId = this.env.FoundationR3Url + this.url.GetRefFormDataByRefFormId;
    public GetTemplateIcon = this.env.FoundationR3Url + this.url.GetTemplateIcon;
    public DeleteRefFormData = this.env.FoundationR3Url + this.url.DeleteRefFormData;

    // AUTH FORM
    public AddListAuthForm = this.env.FoundationR3Url + this.url.AddListAuthForm;
    public GetListAuthFormByRefFormId = this.env.FoundationR3Url + this.url.GetListAuthFormByRefFormId;
    public DeleteAuthForm = this.env.FoundationR3Url + this.url.DeleteAuthForm;
    public GetListAuthFormByRefRoleId = this.env.FoundationR3Url + this.url.GetListAuthFormByRefRoleId;

    // Workflow Engine
    public ClaimTask = this.env.FoundationR3Url + this.url.ClaimTask;
    public ClaimTaskV2 = this.env.FoundationR3Url + this.url.ClaimTaskV2;
    public GetAllTaskWorkflow = this.env.FoundationR3Url + this.url.GetAllTaskWorkflow;
    public GetSingleTaskWorkflow = this.env.FoundationR3Url + this.url.GetSingleTaskWorkflow;

    //SCORE CATEGORY SCHM H
    public GetScoreCategorySchmHById = this.env.FoundationR3Url + this.url.GetScoreCategorySchmHById;
    public AddScoreCategorySchmH = this.env.FoundationR3Url + this.url.AddScoreCategorySchmH;
    public EditScoreCategorySchmH = this.env.FoundationR3Url + this.url.EditScoreCategorySchmH;
    public GetRefScoreCategoryTypeWithDetailById = this.env.FoundationR3Url + this.url.GetRefScoreCategoryTypeWithDetailById;

    // REF SCORE CATEGORY
    public AddRangeScoreCategorySchmD = this.env.FoundationR3Url + this.url.AddRangeScoreCategorySchmD;

    // Authentication
    public RequestNewPassword = this.env.FoundationR3Url + this.url.RequestNewPassword;

    // INTEGRATION
    public SendMasterDailyToRabbitMq = this.env.FoundationR3Url + this.url.SendMasterDailyToRabbitMq;

    // UPDATE MASTER CUST
    public GetCustDataForUpdateMasterCustDetail = this.env.FoundationR3Url + this.url.GetCustDataForUpdateMasterCustDetail;
    public GetCustAddrDataForUpdateMasterCustAddr = this.env.FoundationR3Url + this.url.GetCustAddrDataForUpdateMasterCustAddr;
    public GetCustFamilyDataForUpdateMasterCustFamily = this.env.FoundationR3Url + this.url.GetCustFamilyDataForUpdateMasterCustFamily;
    public GetCustEmergencyDataForUpdateMasterCustEmergency = this.env.FoundationR3Url + this.url.GetCustEmergencyDataForUpdateMasterCustEmergency;
    public GetCustJobDataForUpdateMasterCustJobData = this.env.FoundationR3Url + this.url.GetCustJobDataForUpdateMasterCustJobData;
    public GetCustFinDataForUpdateMasterCustFinData = this.env.FoundationR3Url + this.url.GetCustFinDataForUpdateMasterCustFinData;
    public GetCustCompanyDataForUpdateMasterCustCompany = this.env.FoundationR3Url + this.url.GetCustCompanyDataForUpdateMasterCustCompany;
    public GetShareholderForUpdateMasterCustCompanyShareholder = this.env.FoundationR3Url + this.url.GetShareholderForUpdateMasterCustCompanyShareholder;
    public GetContactInfoForUpdateMasterCustCompanyContactInfo = this.env.FoundationR3Url + this.url.GetContactInfoForUpdateMasterCustCompanyContactInfo;
    public GetFinDataForUpdateMasterCustCompanyFinData = this.env.FoundationR3Url + this.url.GetFinDataForUpdateMasterCustCompanyFinData;
    public GetLegalDocForUpdateMasterCustCompanyLegalDoc = this.env.FoundationR3Url + this.url.GetLegalDocForUpdateMasterCustCompanyLegalDoc;
    public UpdateMasterCustomer = this.env.FoundationR3Url + this.url.UpdateMasterCustomer;
    public UpdateMasterCustAddr = this.env.FoundationR3Url + this.url.UpdateMasterCustAddr;
    public UpdateMasterCustFamily = this.env.FoundationR3Url + this.url.UpdateMasterCustFamily;
    public UpdateMasterCustEmergency = this.env.FoundationR3Url + this.url.UpdateMasterCustEmergency;
    public UpdateMasterCustJobData = this.env.FoundationR3Url + this.url.UpdateMasterCustJobData;
    public UpdateMasterCustFinData = this.env.FoundationR3Url + this.url.UpdateMasterCustFinData;
    public UpdateMasterCustFinDataV2 = this.env.FoundationR3Url + this.url.UpdateMasterCustFinDataV2;
    public UpdateMasterCustCompanyDetail = this.env.FoundationR3Url + this.url.UpdateMasterCustCompanyDetail;
    public UpdateMasterCustCompanyShareholder = this.env.FoundationR3Url + this.url.UpdateMasterCustCompanyShareholder;
    public UpdateMasterCustCompanyLegalDoc = this.env.FoundationR3Url + this.url.UpdateMasterCustCompanyLegalDoc;
    public UpdateMasterCustCompanyLegalDocv2 = this.env.FoundationR3Url + this.url.UpdateMasterCustCompanyLegalDocv2;
    public UpdateMasterCustCompanyContactInfo = this.env.FoundationR3Url + this.url.UpdateMasterCustCompanyContactInfo;
    public UpdateMasterCustCompanyFinData = this.env.FoundationR3Url + this.url.UpdateMasterCustCompanyFinData;

    //Application Source
    public AddRefAppSrc = this.env.FoundationR3Url + this.url.AddRefAppSrc;
    public AddRefAppSrcOfficeMbr = this.env.FoundationR3Url + this.url.AddRefAppSrcOfficeMbr;
    public DeleteRefAppSrcOfficeMbr = this.env.FoundationR3Url + this.url.DeleteRefAppSrcOfficeMbr;
    public EditRefAppSrc = this.env.FoundationR3Url + this.url.EditRefAppSrc;
    public GetRefAppSrcByRefAppSrcId = this.env.FoundationR3Url + this.url.GetRefAppSrcByRefAppSrcId;
    public GetListRefAppSrcOfficeMbrByRefAppSrcId = this.env.FoundationR3Url + this.url.GetListRefAppSrcOfficeMbrByRefAppSrcId;

    // List Approver
    public GetApprovedBy = this.env.ApprovalURL + this.url.GetApprovedBy;
    public GetRecommendations = this.env.ApprovalURL + this.url.GetRecommendations;

    // New Approval R3
    public GetSchemesByCategoryId = this.url.GetSchemesByCategoryId;
    public ReturnLevel = this.url.ReturnLevel;
    public ContinueToLevel = this.url.ContinueToLevel;

    // Payment Allocation
    public GetListKeyValueRefPaymentAllocActive = this.env.FoundationR3Url + this.url.GetListKeyValueRefPaymentAllocActive;
    public GetRefPaymentAllocByID = this.env.FoundationR3Url + this.url.GetRefPaymentAllocByID;
    public GetListKeyValueRefPaymentAllocByPayAllocGrpCode = this.env.FoundationR3Url + this.url.GetListKeyValueRefPaymentAllocByPayAllocGrpCode;
    public SubmitRefPaymentAlloc = this.env.FoundationR3Url + this.url.SubmitRefPaymentAlloc;
    public SubmitAddRefAttr = this.env.FoundationR3Url + this.url.SubmitAddRefAttr;
    public SubmitEditRefAttr = this.env.FoundationR3Url + this.url.SubmitEditRefAttr;
    public GetRefPaymentAllocAttrByRefPaymentAllocId = this.env.FoundationR3Url + this.url.GetRefPaymentAllocAttrByRefPaymentAllocId;

    // REF PAYMENT ALLOC GRP
    public GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate = this.env.FoundationR3Url + this.url.GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate;
    public AddRefPaymentAllocGrp = this.env.FoundationR3Url + this.url.AddRefPaymentAllocGrp;
    public EditRefPaymentAllocGrp = this.env.FoundationR3Url + this.url.EditRefPaymentAllocGrp;

    // COA
    public GetRefCoaByRefCoaId = this.env.FoundationR3Url + this.url.GetRefCoaByRefCoaId;
    public GetListKvpPayAllocVendorByCategoryCode = this.env.FoundationR3Url + this.url.GetListKvpPayAllocVendorByCategoryCode;
    public SubmitCoa = this.env.FoundationR3Url + this.url.SubmitCoa;
    public SubmitListCoa = this.env.FoundationR3Url + this.url.SubmitListCoa;
    public GetListRefCoaByCoaSchmId = this.env.FoundationR3Url + this.url.GetListRefCoaByCoaSchmId;
    public GetListRefCoaByCoaSchmIdV2 = this.env.FoundationR3Url + this.url.GetListRefCoaByCoaSchmIdV2;
    public GetRefCoaWithoutCoaSchemeByReqCoaObj = this.env.FoundationR3Url + this.url.GetRefCoaWithoutCoaSchemeByReqCoaObj;
    public GetRefCoaWithoutCoaSchemeByReqListCoaObj = this.env.FoundationR3Url + this.url.GetRefCoaWithoutCoaSchemeByReqListCoaObj;
    public GetListKvpPayAllocRefOfficeByMrPayAllocGrpCode = this.env.FoundationR3Url + this.url.GetListKvpPayAllocRefOfficeByMrPayAllocGrpCode;

    // COA Scheme
    public GetCoaSchmByCoaSchmId = this.env.FoundationR3Url + this.url.GetCoaSchmByCoaSchmId;
    public SubmitCoaSchm = this.env.FoundationR3Url + this.url.SubmitCoaSchm;
    public GetListCoaSchm = this.env.FoundationR3Url + this.url.GetListCoaSchm;
    public GetListCoaSchmActive = this.env.FoundationR3Url + this.url.GetListCoaSchmActive;


    // View Cabinet, Rack, FIling
    public GetListRackByCabinetCode = this.env.FoundationR3Url + this.url.GetListRackByCabinetCode;
    public GetCabinetByCabinetCode = this.env.FoundationR3Url + this.url.GetCabinetByCabinetCode;

    public GetListFilingByRackCodeAndCabinetCode = this.env.FoundationR3Url + this.url.GetListFilingByRackCodeAndCabinetCode;
    public GetRackByRackCode = this.env.FoundationR3Url + this.url.GetRackByRackCode;

    public GetRackAndListFilingByRackCodeAndCabinetCode = this.env.FoundationR3Url + this.url.GetRackAndListFilingByRackCodeAndCabinetCode;
    public GetRackAndListFilingByFilingCodeAndRackId = this.env.FoundationR3Url + this.url.GetRackAndListFilingByFilingCodeAndRackId;
    public GetCabinetAndListRackByCabinetCode = this.env.FoundationR3Url + this.url.GetCabinetAndListRackByCabinetCode;
    public GetRackByCode = this.env.FoundationR3Url + this.url.GetRackByCode;
    public GetCabinetByCode = this.env.FoundationR3Url + this.url.GetCabinetByCode;
    public AddCabinet = this.env.FoundationR3Url + this.url.AddCabinet;
    public EditCabinet = this.env.FoundationR3Url + this.url.EditCabinet;
    public AddFiling = this.env.FoundationR3Url + this.url.AddFiling;
    public EditFiling = this.env.FoundationR3Url + this.url.EditFiling;
    public AddRack = this.env.FoundationR3Url + this.url.AddRack;
    public EditRack = this.env.FoundationR3Url + this.url.EditRack;
    public GetCabinetAndRackByRackCodeAndCabinetId = this.env.FoundationR3Url + this.url.GetCabinetAndRackByRackCodeAndCabinetId;

    //Auction Company
    public AddAuctionCompany = this.env.FoundationR3Url + this.url.AddAuctionCompany;
    public EditAuctionCompany = this.env.FoundationR3Url + this.url.EditAuctionCompany;
    public GetVendorByIdForEdit = this.env.FoundationR3Url + this.url.GetVendorByIdForEdit;

    // Cust Exposure
    public GetCustExpsrInfoByCustId = this.env.FoundationR3Url + this.url.GetCustExpsrInfoByCustId;
    public GetCustExpsrInfoByCustIdAndExposureTypeForTemplate = this.env.FoundationR3Url + this.url.GetCustExpsrInfoByCustIdAndExposureTypeForTemplate;
    public RequestExposure = this.env.FoundationR3Url + this.url.RequestExposure;
    public RequestExposureV2 = this.env.FoundationR3Url + this.url.RequestExposureV2;
    public GetListCustExpsrBucketByCustExpsrDId = this.env.FoundationR3Url + this.url.GetListCustExpsrBucketByCustExpsrDId;
    public GetListCustExpsrAppAgrHistByCustExpsrHId = this.env.FoundationR3Url + this.url.GetListCustExpsrAppAgrHistByCustExpsrHId;

    //OTP
    public SendOtp = this.env.FoundationR3Url + this.url.SendOtp;
    public ConfirmOtp = this.env.FoundationR3Url + this.url.ConfirmOtp;
    public GetOtpProperties = this.env.FoundationR3Url + this.url.GetOtpProperties;

    // OFFICE BANK ACCOUNT
    public DeleteOfficeBankAcc = this.env.FoundationR3Url + this.url.DeleteOfficeBankAcc;
    public DeleteOfficeBankAccX = this.env.FoundationR3Url + this.url.DeleteOfficeBankAccX;
    public GetListActiveBankName = this.env.FoundationR3Url + this.url.GetListActiveBankName;
    public GetListBankAccType = this.env.FoundationR3Url + this.url.GetListBankAccType;
    public GetListKeyValueActiveOfficeBankAcc = this.env.FoundationR3Url + this.url.GetListKeyValueActiveOfficeBankAcc;
    public GetOfficeBankAccByOfficeBankAccId = this.env.FoundationR3Url + this.url.GetOfficeBankAccByOfficeBankAccId;
    public GetOfficeBankAccXByOfficeBankAccId = this.env.FoundationR3Url + this.url.GetOfficeBankAccXByOfficeBankAccId;
    public SubmitOfficeBankAcc = this.env.FoundationR3Url + this.url.SubmitOfficeBankAcc;
    public AddOfficeBankAcc = this.env.FoundationR3Url + this.url.AddOfficeBankAcc;
    public AddOfficeBankAccX = this.env.FoundationR3Url + this.url.AddOfficeBankAccX;
    public EditOfficeBankAcc = this.env.FoundationR3Url + this.url.EditOfficeBankAcc;
    public EditOfficeBankAccX = this.env.FoundationR3Url + this.url.EditOfficeBankAccX;
    public EditDetailOfficeBankAcc = this.env.FoundationR3Url + this.url.EditDetailOfficeBankAcc;
    public EditDetailOfficeBankAccX = this.env.FoundationR3Url + this.url.EditDetailOfficeBankAccX;

    //SYS CONFIG
    public GetSysConfigPncplResultByCode = this.env.FoundationR3Url + this.url.GetSysConfigPncplResultByCode;

    // JOURNAL
    public RerunJournal = this.url.RerunJournal;
    public RerunJournalLog = this.url.RerunJournalLog;
    public DownloadJournalFile = this.env.FoundationR3Url + this.url.DownloadJournalFile;
    public GetJrSourceFileByJrSourceFileId = this.env.FoundationR3Url + this.url.GetJrSourceFileByJrSourceFileId;
    public GetJrMHeaderAndJrMGroupByJrMHeaderId = this.env.FoundationR3Url + this.url.GetJrMHeaderAndJrMGroupByJrMHeaderId;
    public SaveJrMGroup = this.env.FoundationR3Url + this.url.SaveJrMGroup;
    public GetJrMGroupAndJrMGroupDFactByJrMGroupId = this.env.FoundationR3Url + this.url.GetJrMGroupAndJrMGroupDFactByJrMGroupId;
    public SaveJrMGroupDFact = this.env.FoundationR3Url + this.url.SaveJrMGroupDFact;
    public GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId = this.env.FoundationR3Url + this.url.GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId;
    public SaveJrMHeaderFact = this.env.FoundationR3Url + this.url.SaveJrMHeaderFact;
    public GetJrMGroupAndJrMItemValueByJrMGroupId = this.env.FoundationR3Url + this.url.GetJrMGroupAndJrMItemValueByJrMGroupId;
    public SaveJrMItemValue = this.env.FoundationR3Url + this.url.SaveJrMItemValue;
    public SaveJrMEntity = this.env.FoundationR3Url + this.url.SaveJrMEntity;
    public AddJrMHeader = this.env.FoundationR3Url + this.url.AddJrMHeader;
    public GetJournalResultByJrMsgHId = this.env.FoundationR3Url + this.url.GetJournalResultByJrMsgHId;
    public UploadJournalFile = this.env.FoundationR3Url + this.url.UploadJournalFile;
    public UploadJournalFileV2 = this.env.FoundationR3Url + this.url.UploadJournalFileV2;
    public GetJournalLogFailedByJournalLogId = this.env.FoundationR3Url + this.url.GetJournalLogFailedByJournalLogId;

    // Industry Type Category
    public AddEditIndustryTypeCategory = this.env.FoundationR3Url + this.url.AddEditIndustryTypeCategory;
    public GetIndustryTypeCategoryByIndustryTypeCategoryId = this.env.FoundationR3Url + this.url.GetIndustryTypeCategoryByIndustryTypeCategoryId;

    // Sector Economy Slik
    public GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId = this.env.FoundationR3Url + this.url.GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId;

    // CUST FIN DATA ATTR CONTENT
    public GetListCustFinDataAttrContentByCustIdAndListAttrGroup = this.env.FoundationR3Url + this.url.GetListCustFinDataAttrContentByCustIdAndListAttrGroup;
    public AddCustFinDataAttrContent = this.env.FoundationR3Url + this.url.AddCustFinDataAttrContent;
    public GetCustFinDataAttrContentForCustViewByCustId = this.env.FoundationR3Url + this.url.GetCustFinDataAttrContentForCustViewByCustId;


    // LICENSE
    public UploadLicense = this.env.FoundationR3Url + this.url.UploadLicense;
    public GetLicenses = this.env.FoundationR3Url + this.url.GetLicenses;
    public RetrieveLicenseDetail = this.env.FoundationR3Url + this.url.RetrieveLicenseDetail;

    // LIST IFRAME VIEW
    public GetCustListIframeView = this.env.FoundationR3Url + this.url.GetCustListIframeView;

    //REF STATUS
    public GetListActiveRefStatusByStatusGrpCode = this.env.FoundationR3Url + this.url.GetListActiveRefStatusByStatusGrpCode;
    // MASTER SEQUENCE
    public GenerateTransactionNoFromRedis = this.env.FoundationR3Url + this.url.GenerateTransactionNoFromRedis;

    // THIRD PARTY RSLT
    public GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode = this.env.FoundationR3Url + this.url.GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode;
    public GetThirdPartyTrustsocRsltByThirdPartyRsltHId = this.env.FoundationR3Url + this.url.GetThirdPartyTrustsocRsltByThirdPartyRsltHId;
    public UploadConsentTrustingSocial = this.env.FoundationR3Url + this.url.UploadConsentTrustingSocial;
    public UploadConsentTrustingSocialV2 = this.env.FoundationR3Url + this.url.UploadConsentTrustingSocialV2;
    public UploadConsentTrustingSocialV21 = this.env.FoundationR3Url + this.url.UploadConsentTrustingSocialV21;
    public GetListThirdPartyTrustingSocialByTrxNo = this.env.FoundationR3Url + this.url.GetListThirdPartyTrustingSocialByTrxNo;
    public SaveCustDocFile = this.env.FoundationR3Url + this.url.SaveCustDocFile;
    public SaveCustDocFile21 = this.env.FoundationR3Url + this.url.SaveCustDocFile21;

    //DIGITALIZATION
    public AddTrxSrcDataForTrustingSocial = this.env.FoundationR3Url + this.url.AddTrxSrcDataForTrustingSocial;
    public AddTrxSrcDataForTrustingSocialV2 = this.env.FoundationR3Url + this.url.AddTrxSrcDataForTrustingSocialV2;
    public AddTrxSrcDataForPefindo = this.env.FoundationR3Url + this.url.AddTrxSrcDataForPefindo;
    public AddTrxSrcDataForPefindoV2 = this.env.FoundationR3Url + this.url.AddTrxSrcDataForPefindoV2;
    public AddTrxScrDataForAsliRi = this.env.FoundationR3Url + this.url.AddTrxScrDataForAsliRi;
    public GetTrxSrcDataForAsliRi = this.env.FoundationR3Url + this.url.GetTrxSrcDataForAsliRi;
    public GetTrxResultDataForCbasSlik = this.env.FoundationR3Url + this.url.GetTrxResultDataForCbasSlik;
    public GetCbasSlikLatestTrxNoByKtpNoNpwp = this.env.FoundationR3Url + this.url.GetCbasSlikLatestTrxNoByKtpNoNpwp;
    public AddTrxSrcDataForCbasSlik = this.env.FoundationR3Url + this.url.AddTrxSrcDataForCbasSlik;

    //PEFINDO
    public GetViewMOSummary = this.env.FoundationR3Url + this.url.GetViewMOSummary;
    public GetViewPefindoScore = this.env.FoundationR3Url + this.url.GetViewPefindoScore;
    public GetViewSubjectInfoPersonal = this.env.FoundationR3Url + this.url.GetViewSubjectInfoPersonal;
    public GetViewSubjectInfoCompany = this.env.FoundationR3Url + this.url.GetViewSubjectInfoCompany;
    public GetViewContracts = this.env.FoundationR3Url + this.url.GetViewContracts;
    public GetViewPefindoAlertQuest = this.env.FoundationR3Url + this.url.GetViewPefindoAlertQuest;
    public GetViewSecurities = this.env.FoundationR3Url + this.url.GetViewSecurities;
    public GetViewOtherLiabilities = this.env.FoundationR3Url + this.url.GetViewOtherLiabilities;
    public GetViewInvolvements = this.env.FoundationR3Url + this.url.GetViewInvolvements;
    public GetViewRelations = this.env.FoundationR3Url + this.url.GetViewRelations;
    public GetViewInquiries = this.env.FoundationR3Url + this.url.GetViewInquiries;
    public GetViewDisputes = this.env.FoundationR3Url + this.url.GetViewDisputes;
    public GetViewFinancialStatements = this.env.FoundationR3Url + this.url.GetViewFinancialStatements;
    public PefindoSmartSearch = this.env.FoundationR3Url + this.url.PefindoSmartSearch;
    public GetPefindoContracts = this.env.FoundationR3Url + this.url.GetPefindoContracts;
    public GetViewSubjectInfoAllHistory = this.env.FoundationR3Url + this.url.GetViewSubjectInfoAllHistory;
    public GetPefindoMultiResultByGroupTrxNo = this.env.FoundationR3Url + this.url.GetPefindoMultiResultByGroupTrxNo;
    public AddTrxSrcDataForPefindoMultiResult = this.env.FoundationR3Url + this.url.AddTrxSrcDataForPefindoMultiResult;
    public GetPefindoTrxSrcData = this.env.FoundationR3Url + this.url.GetPefindoTrxSrcData;
    public PefindoSmartSearchV2 = this.env.FoundationR3Url + this.url.PefindoSmartSearchV2;
    public AddTrxSrcDataForPefindoMultiResultV2 = this.env.FoundationR3Url + this.url.AddTrxSrcDataForPefindoMultiResultV2;

    // THINGS TO DO
    public GetThingsToDoByRole = this.env.FoundationR3Url + this.url.GetThingsToDoByRole;
    public GetThingsToDoByRoleV2 = this.env.fouR3Url + this.url.GetThingsToDoByRoleV2;

    // CUST DOC FILE
    public GetListCustDocFileByCustId = this.env.FoundationR3Url + this.url.GetListCustDocFileByCustId;

    // REF TC
    public AddRefTc = this.env.FoundationR3Url + this.url.AddRefTc;
    public EditRefTc = this.env.FoundationR3Url + this.url.EditRefTc;
    public GetRefTcById = this.env.FoundationR3Url + this.url.GetRefTcById;

    public GetCustCompanyLegalDocByCustCompanyLegalDocId = this.env.FoundationR3Url + this.url.GetCustCompanyLegalDocByCustCompanyLegalDocId;

    //SAVE THIRDPARTYTRXNO
    public SaveCustThirdPartyTrxNo = this.env.FoundationR3Url + this.url.SaveCustThirdPartyTrxNo;

    //Generate
    public GenerateAPIKey = this.env.FoundationR3Url + this.url.GenerateAPIKey;
    public RevokeAPIKey = this.env.FoundationR3Url + this.url.RevokeAPIKey;

    //REF TAX OFFICE
    public AddRefTaxOffice = this.env.FoundationR3Url + this.url.AddRefTaxOffice;
    public EditRefTaxOffice = this.env.FoundationR3Url + this.url.EditRefTaxOffice;
    public DeleteRefTaxOffice = this.env.FoundationR3Url + this.url.DeleteRefTaxOffice;
    public GetRefTaxOfficeDetailById = this.env.FoundationR3Url + this.url.GetRefTaxOfficeDetailById;
    public GetListRefTaxOfficeActive = this.env.FoundationR3Url + this.url.GetListRefTaxOfficeActive;

    public Login = this.env.FoundationR3Url + this.url.Login;
    public LoginV2 = this.env.FoundationR3Url + this.url.LoginV2;
    public LoginWithToken = this.env.FoundationR3Url + this.url.LoginWithToken;
    public Logout = this.env.FoundationR3Url + this.url.Logout;
    public GetAllActiveRefFormByRoleCodeAndModuleCode = this.env.fouR3Url + this.url.GetAllActiveRefFormByRoleCodeAndModuleCode;
    public GetDashboardAccessToken = this.env.FoundationR3Url + this.url.GetDashboardAccessToken;
    public GetThingsToDoCamunda = this.env.FoundationR3Url_svc + this.url.GetThingsToDoCamunda;
    public GetListApvTaskListByUsernameAndRoleCodeForThingsToDo = this.env.ApprovalR3Url_svc + this.url.GetListApvTaskListByUsernameAndRoleCodeForThingsToDo;
    public GetListJobTitleByUsernameAndModule = this.env.FoundationR3Url + this.url.GetListJobTitleByUsernameAndModule;
    public GetListJobTitleByUsernameAndModuleV2 = this.env.FoundationR3Url + this.url.GetListJobTitleByUsernameAndModuleV2;
    public CheckUserSessionLog = this.env.FoundationR3Url + this.url.CheckUserSessionLog;

    //MENU
    public LogoutAuth = this.env.FoundationR3Url + this.url.LogoutAuth;

    //SYS CTRL COY
    public GetSysCtrlCoyBySysKey = this.env.FoundationR3Url + this.url.GetSysCtrlCoyBySysKey;

    //REF-USER
    public GetRefUserByUsername = this.env.FoundationR3Url + this.url.GetRefUserByUsername;

    //FRAMEWORK
    public GetPagingObjectBySQL = this.url.GetPagingObjectBySQL; // UCPaging
    public GetJournalResultPagingObjectBySQL = this.url.GetJournalResultPagingObjectBySQL;

    //NEW APPROVAL R3
    public GetLevelVoting = this.url.GetLevelVoting;
    public GetPossibleResult = this.url.GetPossibleResult;
    public SubmitApproval = this.url.SubmitApproval;
    public GetNextNodeMember = this.url.GetNextNodeMember;
    public GetRefReasonActive = this.url.GetRefReasonActive;
    public GetCanChangeMinFinalLevel = this.url.GetCanChangeMinFinalLevel;
    public GetTaskHistory = this.url.GetTaskHistory;
    public GetSchemesBySchemeCode = this.url.GetSchemesBySchemeCode;
    public GetRefSingleCategoryByCategoryCode = this.url.GetRefSingleCategoryByCategoryCode;
    public GetRefAdtQuestion = this.url.GetRefAdtQuestion;
    public CreateNewRFA = this.url.CreateNewRFA;
    public CreateJumpRFA = this.url.CreateJumpRFA;
    public GetPossibleMemberAndAttributeExType = this.url.GetPossibleMemberAndAttributeExType;
    public GetApprovalReturnHistory = this.url.GetApprovalReturnHistory;

    // DOWNLOAD
    public DownloadTemplate = this.env.FoundationR3Url + this.url.DownloadTemplate;

    //UPLOAD
    public UploadFileV2 = this.env.FoundationR3Url + this.url.UploadFileV2;

    // THINGS TO DO
    public GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo = this.url.GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo;

    // NotificationTemplate
    public GetNotificationTemplateByNotificationTemplateId = this.env.NotifEngineURL + this.url.GetNotificationTemplateByNotificationTemplateId;
    public GetLatestNotificationTemplateByNotificationTemplateCode = this.env.NotifEngineURL + this.url.GetLatestNotificationTemplateByNotificationTemplateCode;
    public GetNotificationTemplateByNotificationTemplateCodeAndVersion = this.env.NotifEngineURL + this.url.GetNotificationTemplateByNotificationTemplateCodeAndVersion;
    public AddNotificationTemplate = this.env.NotifEngineURL + this.url.AddNotificationTemplate;
    public EditNotificationTemplate = this.env.NotifEngineURL + this.url.EditNotificationTemplate;
    public GetListNotificationTemplateByNotificationTemplateCode = this.env.NotifEngineURL + this.url.GetListNotificationTemplateByNotificationTemplateCode

    public PushNotifSubscribe = this.url.PushNotifSubscribe;
    public PushNotifUnsubscribe = this.url.PushNotifUnsubscribe;
    public GetNotSentPushNotif = this.env.FoundationR3Url + this.url.GetNotSentPushNotif;
    public GetNotReadPushNotif = this.env.NotifEngineURL + this.url.GetNotReadPushNotif;
    public UpdateReadPushNotif = this.env.NotifEngineURL + this.url.UpdateReadPushNotif;

    // RefNotifAttrTemplate
    public GetListActiveRefNotifAttrTemplate = this.env.NotifEngineURL + this.url.GetListActiveRefNotifAttrTemplate;
    public GetListRefNotifAttrTemplate = this.env.NotifEngineURL + this.url.GetListRefNotifAttrTemplate;

    // RefNotifAttrSourceContent
    public AddListRefNotifAttrSourceContent = this.env.NotifEngineURL + this.url.AddListRefNotifAttrSourceContent;
    public DeleteRefNotifAttrSourceContent = this.env.NotifEngineURL + this.url.DeleteRefNotifAttrSourceContent;

    // RefNotificationSource
    public AddRefNotificationSource = this.env.NotifEngineURL + this.url.AddRefNotificationSource;
    public EditRefNotificationSource = this.env.NotifEngineURL + this.url.EditRefNotificationSource;
    public GetRefNotificationSourceByRefNotificationSourceId = this.env.NotifEngineURL + this.url.GetRefNotificationSourceByRefNotificationSourceId;

    // NotificationHistH
    public GetNotificationHistHByNotificationHistHId = this.env.NotifEngineURL + this.url.GetNotificationHistHByNotificationHistHId;
    public GetMaxSpecificUser = this.env.NotifEngineURL + this.url.GetMaxSpecificUser;
    public GetEmailAttachmentAllowedFileFormat = this.env.NotifEngineURL + this.url.GetEmailAttachmentAllowedFileFormat;
    public GetEmailAttachmentMaxFileSize = this.env.NotifEngineURL + this.url.GetEmailAttachmentMaxFileSize;

    // NotificationHistD
    public GetNotificationHistDByNotificationHistHId = this.env.NotifEngineURL + this.url.GetNotificationHistDByNotificationHistHId;
    public GetListNotificationHistDByNotificationHistHId = this.env.NotifEngineURL + this.url.GetListNotificationHistDByNotificationHistHId;

    // PushNotificationHist
    public GetPushNotificationHistByNotificationHistHId = this.env.NotifEngineURL + this.url.GetPushNotificationHistByNotificationHistHId;
    public GetRefUserSubscriptionByUsername = this.env.NotifEngineURL + this.url.GetRefUserSubscriptionByUsername;

    // SmsWaNotificationHist
    public GetSmsWaNotificationHistByNotificationHistHId = this.env.NotifEngineURL + this.url.GetSmsWaNotificationHistByNotificationHistHId;

    // EmailNotificationHist
    public GetEmailNotificationHistByNotificationHistHId = this.env.NotifEngineURL + this.url.GetEmailNotificationHistByNotificationHistHId;
    public GetListEmailAttachmentByNotificationHistId = this.env.NotifEngineURL + this.url.GetListEmailAttachmentByNotificationHistId;

    // NotificationBroadcast
    public SendToNotificationEngine = this.env.FoundationR3Url + this.url.SendToNotificationEngine;
    public MultipleSendToNotificationEngine = this.env.FoundationR3Url + this.url.MultipleSendToNotificationEngine;
    public ResendToNotificationEngine = this.env.FoundationR3Url + this.url.ResendToNotificationEngine;
    public MultipleSendToNotificationEngineEmail = this.env.FoundationR3Url + this.url.MultipleSendToNotificationEngineEmail;
    public ResendToNotificationEngineEmail = this.env.FoundationR3Url + this.url.ResendToNotificationEngineEmail;
    public MultipleResendToNotificationEngine = this.env.FoundationR3Url + this.url.MultipleResendToNotificationEngine;

    // RefNotifAttrTemplate
    public AddRefNotifAttrTemplate = this.env.NotifEngineURL + this.url.AddRefNotifAttrTemplate;
    public EditRefNotifAttrTemplate = this.env.NotifEngineURL + this.url.EditRefNotifAttrTemplate;
    public GetRefNotifAttrTemplateByRefNotifAttrTemplateId = this.env.NotifEngineURL + this.url.GetRefNotifAttrTemplateByRefNotifAttrTemplateId;

    // Ref Ins Claim Doc
    public AddRefInsClaimDoc = this.env.FoundationR3Url + this.url.AddRefInsClaimDoc;
    public EditRefInsClaimDoc = this.env.FoundationR3Url + this.url.EditRefInsClaimDoc;
    public GetRefInsClaimDocByRefInsClaimDocCode = this.env.FoundationR3Url + this.url.GetRefInsClaimDocByRefInsClaimDocCode;

    //Bouwheer
    public GetBouwheerCompanyIndustryInfoByBouwheerNo = this.env.FoundationR3Url + this.url.GetBouwheerCompanyIndustryInfoByBouwheerNo;
    public AddEditBouwheerCompanyIndustryInfo = this.env.FoundationR3Url + this.url.AddEditBouwheerCompanyIndustryInfo;
    public UploadBouwheerCompanyIndustryDoc = this.env.FoundationR3Url + this.url.UploadBouwheerCompanyIndustryDoc;
    public DeleteBouwheerCompanyIndustryInfo = this.env.FoundationR3Url + this.url.DeleteBouwheerCompanyIndustryInfo;

    //OCR 
    public GetOCRKTPData = this.env.FoundationR3Url + this.url.GetOCRKTPData;
    public GetOCRNPWPData = this.env.FoundationR3Url + this.url.GetOCRNPWPData;

    //UPLOAD FORM FEATURE
    public GetUploadFormFeatureByUploadMonitoringNoAndTrxTypeX = this.env.FoundationR3Url + this.url.GetUploadFormFeatureByUploadMonitoringNoAndTrxTypeX;

    //FUNDING COMPANY
    public AddVendorFundingCoyX = this.env.FoundationR3Url + this.url.AddVendorX;
    public EditVendorFundingCoyX = this.env.FoundationR3Url + this.url.EditVendorX;
    public AddVendorFundingCoy = this.env.FoundationR3Url + this.url.AddFundingCompany;
    public EditVendorFundingCoy = this.env.FoundationR3Url + this.url.EditFundingCompany;
    public GetVendorXByVendorCode = this.env.FoundationR3Url + this.url.GetVendorXByVendorCode;
}
