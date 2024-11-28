// import { environment } from "environments/environment";
import * as _urlConstant from "../../../assets/urlConstant.json";
import * as _environment from "../../../assets/config/enviConfig.json";

// URL" API di concat dengan environment url + version + api path
// KECUALI: API" yang di pakai di UC". contoh: GetPagingObjectBySQL, DeleteFromPaging, Approval CreateNewRFA
// HARAP JANGAN PAKE INI LAGI, KARENA SEKARANG SUDAH ADA UrlConstantNew YANG PAKE JSON

const urlConstant = _urlConstant;
export class URLConstant {
    public static config: Record<string, any> = {};

    // Get list envi from storage
    public static get env() {
        const _env = JSON.parse(localStorage.getItem('envi'));
        if (Object.keys(this.config).length > 0) {
            return this.config;
        } 

        return _env || _environment;
    }

    public static environment = this.env;
        
    // FRAMEWORK
    public static GetPagingObjectBySQL = "/Generic/GetPagingObjectBySQL" // UCPaging
    public static GetJournalResultPagingObjectBySQL = "/Generic/GetJournalResultPagingObjectBySQL";

    // SYS CONFIG RESULT
    public static GetSysConfigResultByCode = this.environment.FoundationR3Url + "/v1" + "/SysConfigResult/GetSysConfigResultByCode";

    // DOWNLOAD
    public static DownloadTemplate = this.environment.FoundationR3Url + "/v2" + "/Download/DownloadTemplate";

    // WEB SOCKET
    public static WebSocketUrl = this.environment.FoundationR3Url + "/Notificationhub";

    //GENERAL SETTING
    public static AddGeneralSetting = this.environment.FoundationR3Url + "/v1" + "/GeneralSetting/AddGeneralSetting";
    public static EditGeneralSetting = this.environment.FoundationR3Url + "/v1" + "/GeneralSetting/EditGeneralSetting";
    public static GetGeneralSettingById = this.environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingById";
    public static GetGeneralSettingValue = "/v1" + "/GeneralSetting/GetGeneralSettingValue";
    public static GetGeneralSettingByCode = this.environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingByCode";
    public static GetGeneralSettingValueByCode = this.environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingValueByCode";
    public static GetListGeneralSettingByListGsCode = this.environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetListGeneralSettingByListGsCode";

    //REF OFFICE
    public static GetRefOfficeByOfficeCode = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeByOfficeCode";
    public static GetListKvpActiveRefOfficeForPaging = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetListKvpActiveRefOfficeForPaging";
    public static GetRefOfficeObj = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeObj";
    public static GetRefOfficeByRefOfficeId = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeByRefOfficeId"
    public static GetAllRefOffice = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetAllRefOffice";
    public static AddRefOffice = this.environment.FoundationR3Url + "/v1" + "/RefOffice/AddRefOffice";
    public static AddRefOfficeV2 = this.environment.FoundationR3Url + "/v2" + "/RefOffice/AddRefOffice";
    public static AddRefOfficeV2_1 = this.environment.FoundationR3Url + "/v2.1" + "/RefOffice/AddRefOffice";
    public static AddRefOfficeAreaMember = this.environment.FoundationR3Url + "/v1" + "/RefOffice/AddRefOfficeAreaMember";
    public static UpdateRefOfficeAreaId = this.environment.FoundationR3Url + "/v1" + "/RefOffice/UpdateRefOfficeAreaId";
    public static EditRefOffice = this.environment.FoundationR3Url + "/v1" + "/RefOffice/EditRefOffice";
    public static EditRefOfficeV2 = this.environment.FoundationR3Url + "/v2" + "/RefOffice/EditRefOffice";
    public static EditRefOfficeV2_1 = this.environment.FoundationR3Url + "/v2.1" + "/RefOffice/EditRefOffice";
    public static GetCenterGrpByCenterGrpTypeCode = "/v1" + "/RefOffice/GetCenterGrpByCenterGrpCode";
    public static GetListOfficeCenterGrp = "/v1" + "/RefOffice/GetListOfficeCenterGrp";
    public static AddCenterGroupOfficeMember = "/v1" + "RefOffice/AddCenterGroupOfficeMember";
    public static AddCenterGrpOfficeMember = this.environment.FoundationR3Url + "/v1" + "/CenterGrpOfficeMbr/AddCenterGrpOfficeMember";
    public static GetListCenterGrpMemberByRefOfficeId = this.environment.FoundationR3Url + "/v1" + "/CenterGrpOfficeMbr/GetListCenterGrpMemberByRefOfficeId"
    public static DeleteCenterGrpOfficeMember = this.environment.FoundationR3Url + "/v1" + "/CenterGrpOfficeMbr/DeleteCenterGrpOfficeMember";
    public static GetListActiveRefOffice = "/v1" + "/RefOffice/GetListActiveRefOffice";
    public static GetListRefOfficeByRefOfficeAreaId = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetListRefOfficeByRefOfficeAreaId";
    public static GetListKvpActiveRefOffice = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetListKvpActiveRefOffice";
    public static GetRefOfficeDetailByRefOfficeId = this.environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeDetailByRefOfficeId"

    //CENTER GROUP
    public static GetCenterGrpByCode = this.environment.FoundationR3Url + "/v1" + "/CenterGrp/GetCenterGrpByCode";
    public static GetCenterGrpById = this.environment.FoundationR3Url + "/v1" + "/CenterGrp/GetCenterGrpById";

    //REF OFFICE AREA
    public static GetAllListArea = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetAllListArea";
    public static GetRefOfficeAreaPaging = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetRefOfficeAreaPaging";
    public static GetRefArea = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetRefArea";
    public static GetRefOfficeAreaByRefOfficeAreaId = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetRefOfficeAreaByRefOfficeAreaId";
    public static AddRefOfficeArea = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/AddRefOfficeArea";
    public static EditRefOfficeArea = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/EditRefOfficeArea";
    public static CheckDuplAreaCode = this.environment.FoundationR3Url + "/v1" + "/RefOfficeArea/CheckDuplAreaCode";

    //ORGANIZATION
    public static GetRefOrg = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefOrg";
    public static EditRefOrgWithOldParentId = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditRefOrgWithOldParentId";
    public static EditRefOrg = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditRefOrg";
    public static DeleteRefOrg = "/OrganizationDefinition/DeleteRefOrg";
    public static GetListAllRefOrg = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetListAllRefOrg";
    public static AddRefOrg = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddRefOrg";
    public static GetRefOrgPaging = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefOrgPaging";
    public static GetAllRefBizUnit = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllRefBizUnit";
    public static GetOrgJobTitleByMdlStruc = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgJobTitleByMdlStruc";
    public static GetRefBizUnitByOffice = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefBizUnitByOffice";
    public static GetAllOrgMdl = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllOrgMdl";
    public static GetAllActiveOrgMdlByRefOrgId = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllActiveOrgMdlByRefOrgId";
    public static GetOrgMdlPaging = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlPaging";
    public static DeleteOrgMdl = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/DeleteOrgMdl";
    public static EditOrgMdl = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditOrgMdl";
    public static AddOrgMdl = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddOrgMdl";
    public static GetOrgMdl = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdl";
    public static GetOrgMdlByOrgMdlId = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlByOrgMdlId";
    public static GetAllRefBizUnitKeyValuePair = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllRefBizUnitKeyValuePair";
    public static DeleteOrgMdlStruc = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/DeleteOrgMdlStruc";
    public static AddOrgMdlStruc = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddOrgMdlStruc";
    public static EditOrgMdlStruc = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditOrgMdlStruc";
    public static GetOrgMdlStruc = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlStruc";
    public static GetOrgMdlStrucPaging = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlStrucPaging";
    public static GetOrgMdlStrucById = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlStrucById";

    //REF-JOB-TITLE
    public static GetRefJobTitle = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefJobTitlePaging";
    public static AddRefJobTitle = this.environment.FoundationR3Url + "/v1" + "/RefJobTitle/AddRefJobTitle";
    public static EditRefJobTitle = this.environment.FoundationR3Url + "/v1" + "/RefJobTitle/EditRefJobTitle";
    public static GetJobPositionLvl = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetJobPositionLvl";
    public static GetRefJobTitleById = this.environment.FoundationR3Url + "/v1" + "/RefJobTitle/GetRefJobTitleByRefJobTitleId";

    //ORG JOB TITLE
    public static GetOrgJobTitlePaging = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgJobTitlePaging";
    public static AddOrgJobTitle = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddOrgJobTitle";
    public static EditOrgJobTitle = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditOrgJobTitle";
    public static DeleteOrgJobTitle = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/DeleteOrgJobTitle";
    public static GetOrgJobTitleByOrgJobTitleId = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgJobTitleByOrgJobTitleId";

    //REF-BANK
    public static GetBankPaging = this.environment.FoundationR3Url + "/v1" + "/RefBank/GetRefBankPaging";
    public static GetBank = this.environment.FoundationR3Url + "/v1" + "/RefBank/GetBank";
    public static GetRefBankByRefBankIdAsync = this.environment.FoundationR3Url + "/v1" + "/RefBank/GetRefBankByRefBankIdAsync";
    public static GetRefBankByRefBankCodeAsync = this.environment.FoundationR3Url + "/v1" + "/RefBank/GetRefBankByBankCodeAsync";
    public static EditRefBank = this.environment.FoundationR3Url + "/v1" + "/RefBank/EditRefBank";
    public static AddRefBank = this.environment.FoundationR3Url + "/v1" + "/RefBank/AddRefBank";
    public static AddRefBankAsync = this.environment.FoundationR3Url + "/v1" + "/RefBank/AddRefBankAsync";
    public static DeleteRefBank = this.environment.FoundationR3Url + "/v1" + "/RefBank/DeleteRefBank";
    public static GetBankByBankCode = this.environment.FoundationR3Url + "/v1" + "/RefBank/GetBankByBankCode";

//LBPPMS-CNTRPRT
public static GetLbppmsCntrprtByLbppmsCntrprtCode = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetLbppmsCntrprtByLbppmsCntrprtCode";

    //REF-EMP
    public static GetEmpNameByRefUserId = this.environment.FoundationR3Url + "/v1" + "/RefEmp/GetEmpNameByRefUserId";
    public static GetListEmployee = this.environment.FoundationR3Url + "/v1" + "/RefEmp/GetRefEmpPaging";
    public static GetRefEmployeeById = this.environment.FoundationR3Url + "/v1" + "/RefEmp/GetRefEmpByRefEmpId"
    public static AddRefEmp = this.environment.FoundationR3Url + "/v1" + "/RefEmp/AddRefEmp";
    public static EditRefEmp = this.environment.FoundationR3Url + "/v1" + "/RefEmp/EditRefEmp";
    public static GetEmpBankAccByRefEmpId = this.environment.FoundationR3Url + "/v1" + "/EmpBankAcc/GetEmpBankAccByRefEmpId";
    public static AddRefEmpAndEmpBankAcc = this.environment.FoundationR3Url + "/v1" + "/RefEmp/AddRefEmpAndEmpBankAcc";
    public static EditRefEmpAndEmpBankAcc = this.environment.FoundationR3Url + "/v1" + "/RefEmp/EditRefEmpAndEmpBankAcc";
    public static DeleteRefEmpAndEmpBankAcc = this.environment.FoundationR3Url + "/v1" + "/RefEmp/DeleteRefEmpAndEmpBankAcc";
    public static GetListEmployeebyRefEmpId = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/GetListEmployeebyRefEmpId";
    public static GetEmpListByOfficeIdAndIsActive = this.environment.FoundationR3Url + "/v1" + "/RefEmp/GetEmpListByOfficeIdAndIsActive";
    public static GetEmpForUpdateById = this.environment.FoundationR3Url + "/v1" + "/RefEmp/GetRefEmpForUpdateByRefEmpId"

    //EMP_POSITION
    public static GetEmpPositionPaging = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/GetEmpPositionPaging";
    public static GetEmpByEmpPositionId = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/GetEmpByEmpPositionId";
    public static AddEmpPosition = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/AddEmpPosition";
    public static EditEmpPosition = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/EditEmpPosition";
    public static DeleteEmpPosition = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/DeleteEmpPosition";
    public static GetListUserEmployee = this.environment.FoundationR3Url + "/v1" + "/EmpPosition/GetListUserEmployee";

    //REF-USER
    public static GetRefUserPaging = this.environment.FoundationR3Url + "/v1" + "/UserManagement/GetRefUserPaging";
    public static EditRefUserForRefEmpR3 = this.environment.FoundationR3Url + "/v1" + "/RefUser/EditRefUserForRefEmp";
    public static ChangePassword = this.environment.FoundationR3Url + "/v1" + "/UserManagement/ChangePassword";
    public static GetRefUser = this.environment.FoundationR3Url + "/v1" + "/UserManagement/GetRefUser";
    public static GetUserByUsername = this.environment.FoundationR3Url + "/v1" + "/UserManagement/GetUserByUsername";
    public static ValidatePwd = this.environment.FoundationR3Url + "/v1" + "/UserManagement/ValidatePwd";
    public static GetCountRefUserByRefEmpId = this.environment.FoundationR3Url + "/v1" + "/UserManagement/GetCountRefUserByRefEmpId";
    public static ResetPassword = this.environment.FoundationR3Url + "/v1" + "/UserManagement/ResetPassword";
    public static GetRefUserById = this.environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserById";
    public static GetRefUserByUsername = this.environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByUsername";
    public static GetUserEmpByUsername = this.environment.FoundationR3Url + "/v1" + "/RefUser/GetUserEmpByUsername";
    public static GetRefUserByRefEmpId = this.environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByRefEmpId";
    public static AddRefUserRole = this.environment.FoundationR3Url + "/v1" + "/RefUserRole/AddRefUserRole"
    public static EditRefUserRole = this.environment.FoundationR3Url + "/v1" + "/RefUserRole/EditRefUserRole";
    public static GetRefUserRoleById = this.environment.FoundationR3Url + "/v1" + "/RefUserRole/GetRefUserRoleById";
    public static ChangePasswordRefUserByUsername = this.environment.FoundationR3Url + "/v1" + "/RefUser/ChangePasswordRefUserByUsername";
    public static DeleteRefUserRole = "/RefUserRole/DeleteRefUserRole";
    public static GetRefUserByResetCode = this.environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByResetCode";
    public static ResetPasswordByUsername = this.environment.FoundationR3Url + "/v1" + "/RefUser/ResetPasswordByUsername";

    //REF-ROLE
    public static GetRefRolePaging = this.environment.FoundationR3Url + "/v1" + "/UserManagement/GetRefRolePaging";
    public static AddRefRole = this.environment.FoundationR3Url + "/v1" + "/RefRole/AddRefRole";
    public static AddRefRoleV2 = this.environment.FoundationR3Url + "/v2" + "/RefRole/AddRefRole";
    public static EditRefRole = this.environment.FoundationR3Url + "/v1" + "/RefRole/EditRefRole";
    public static DeleteRefRole = this.environment.FoundationR3Url + "/v1" + "/RefRole/DeleteRefRole";
    public static GetRefRoleByRefRoleId = this.environment.FoundationR3Url + "/v1" + "/RefRole/GetRefRoleById";
    public static GetRefRoleByCode = this.environment.FoundationR3Url + "/v1" + "/RefRole/GetRefRoleByCode";
    public static GetActiveRefRoleByRefRoleId = "/v1" + "/RefRole/GetActiveRefRoleByRefRoleId";
    public static GetRefRole = this.environment.FoundationR3Url + "/v1" + "/RefRole/GetRefRole";
    public static GetListDataCurrentUser = "/v1" + "/UserManagement/GetListDataCurrentUser";
    public static GetRefRoleByEmpPositionId = "/v1" + "/RefRole/GetRefRoleByEmpPositionId";
    public static EditUserTitleRole = this.environment.FoundationR3Url + "/v1" + "/UserManagement/EditUserTitleRole";
    public static AddUserTitleRole = this.environment.FoundationR3Url + "/v1" + "/UserManagement/AddUserTitleRole";
    public static AssignRoleToUsers = this.environment.FoundationR3Url + "/v1" + "/UserManagement/AssignRoleToUsers";
    public static GetUserTitleRoleByEmpPositionIdAndRefRoleId = "/v1" + "/UserManagement/GetUserTitleRoleByEmpPositionIdAndRefRoleId";
    public static GetListActiveRefRole = this.environment.FoundationR3Url + "/v1" + "/RefRole/GetListActiveRefRole"

    //REF FEE
    public static AddRefFee = this.environment.FoundationR3Url + "/v1" + "/RefFee/AddRefFee";
    public static EditRefFee = this.environment.FoundationR3Url + "/v1" + "/RefFee/EditRefFee";
    public static GetRefFeeByRefFeeId = this.environment.FoundationR3Url + "/v1" + "/RefFee/GetRefFeeByRefFeeId";

    //REF LOB
    public static GetListRefLob = this.environment.FoundationR3Url + "/v1" + "/RefLob/GetListRefLob";
    public static GetListBizTemplateCodeByRefFeeId = this.environment.FoundationR3Url + "/v1" + "/RefLob/GetListBizTemplateCodeByRefFeeId"
    public static GetListBizTmpltCode = this.environment.FoundationR3Url + "/v1" + "/RefLob/GetListBizTmpltCode"

    //SURVEYOR
    public static AddSurveyor = this.environment.FoundationR3Url + "/v1" + "/Surveyor/AddSurveyor";
    public static EditSurveyor = this.environment.FoundationR3Url + "/v1" + "/Surveyor/EditSurveyor";
    public static GetSurveyorBySurveyorId = this.environment.FoundationR3Url + "/v1" + "/Surveyor/GetSurveyorBySurveyorId";


    //ZIPCODE
    public static GetRefZipcodePaging = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/GetRefZipcodePaging";
    public static GetRefZipCode = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/GetRefZipcode";
    public static GetRefProvDistrictObj = this.environment.FoundationR3Url + "/v1" + "/RefProvDistrict/GetRefProvDistrict";
    public static EditRefZipcode = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/EditRefZipcode";
    public static EditRefZipcodeV2 = this.environment.FoundationR3Url + "/v2" + "/RefZipcode/EditRefZipcode";
    public static AddRefZipcode = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/AddRefZipcode";
    public static AddRefZipcodeV2 = this.environment.FoundationR3Url + "/v2" + "/RefZipcode/AddRefZipcode";
    public static GetOfficeZipcodeMemberAddPaging = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/GetOfficeZipcodeMemberAddPaging";
    public static GetRefZipCodeById = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/GetRefZipcodeById";
    public static GetZipcodeDataByZipCode = this.environment.FoundationR3Url + "/v1" + "/RefZipcode/GetZipcodeDataByZipCode";

    //OFFICE ZIPCODE MEMBER
    public static GetOfficeZipCodeMemberPaging = this.environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/GetOfficeZipCodeMemberPaging";
    public static GetRefOfficeZipcodePaging = this.environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/GetRefOfficeZipcodePaging";
    public static AddOfficeZipcodeMember = this.environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/AddOfficeZipCodeMember";
    public static DeleteOfficeZipcodeMember = this.environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/DeleteOfficeZipcodeMember";

    //BUSINESS UNIT
    public static GetBusinessUnitPaging = this.environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefBizUnitPaging";
    public static GetRefBizUnit = this.environment.FoundationR3Url + "/v1" + "/RefBizUnit/GetRefBizUnitByRefBizUnitId";
    public static AddRefBizUnit = this.environment.FoundationR3Url + "/v1" + "/RefBizUnit/AddRefBizUnit";
    public static EditRefBizUnit = this.environment.FoundationR3Url + "/v1" + "/RefBizUnit/EditRefBizUnit";
    public static DeleteRefBizUnit = "/RefBizUnit/DeleteRefBizUnit";

    //REF COY
    public static GetRefCoyPaging = this.environment.FoundationR3Url + "/v1" + "/RefCoy/GetRefCoyPaging";
    public static GetRefCoy = this.environment.FoundationR3Url + "/v1" + "/RefCoy/GetRefCoy";
    public static EditRefCoy = this.environment.FoundationR3Url + "/v1" + "/RefCoy/EditRefCoy";
    public static GetCoyBodPaging = this.environment.FoundationR3Url + "/v1" + "/CoyBod/GetCoyBodPaging";
    public static AddCoyBod = this.environment.FoundationR3Url + "/v1" + "/CoyBod/AddCoyBOD";
    public static EditCoyBod = this.environment.FoundationR3Url + "/v1" + "/CoyBod/EditCoyBOD";
    public static DeleteCoyBod = "/CoyBod/DeleteCoyBOD";
    public static GetCoyBod = this.environment.FoundationR3Url + "/v1" + "/CoyBod/GetCoyBod";
    public static GetCommissionerPaging = this.environment.FoundationR3Url + "/v1" + "/CoyCommissioner/GetCoyCommissionerPaging";
    public static AddCoyCommissioner = this.environment.FoundationR3Url + "/v1" + "/CoyCommissioner/AddCoyCommissioner";
    public static EditCoyCommissioner = this.environment.FoundationR3Url + "/v1" + "/CoyCommissioner/EditCoyCommissioner";
    public static DeleteCoyCommissioner = "/CoyCommissioner/DeleteCoyCommissioner";
    public static GetCoyCommissioner = this.environment.FoundationR3Url + "/v1" + "/CoyCommissioner/GetCoyCommissioner";

    //REF TAX OFFICE
    public static GetAllActiveRefTaxOffice = this.environment.FoundationR3Url + "/v1" + "/RefTaxOffice/GetAllActiveRefTaxOffice";

    //REF MASTER
    public static GetRefMasterList = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterList";
    public static GetRefMastersByCriteria = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMastersByCriteria";
    public static GetRefMaster = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMaster";
    public static GetRefMasterListByTypeCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterListByTypeCode";
    public static GetRefMasterListKeyValuePair = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterListKeyValuePair";
    public static AddRefMaster = this.environment.FoundationR3Url + "/v1" + "/RefMaster/AddRefMaster";
    public static EditRefMaster = this.environment.FoundationR3Url + "/v1" + "/RefMaster/EditRefMaster";
    public static GetRefMasterType = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterType";
    public static GetRefMasterTypeKeyValueUserSetting = "/v1" + "/RefMaster/GetRefMasterTypeKeyValueUserSetting";
    public static GetRefMasterPaging = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterPaging";
    public static GetRefMasterListDesc = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterListDesc";
    public static GetRefMasterListKeyValueActiveByCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCode";
    public static GetListKeyValueActiveByCodeOrderBySeqNo = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCodeOrderBySeqNo";
    public static GetListActiveRefMasterType = this.environment.FoundationR3Url + "/v1" + "/RefMasterType/GetListKeyValueActiveByCode";
    public static GetListActiveRefMasterTypeForDdl = "/RefMasterType/GetListKeyValueActiveByCode";
    public static GetRefMasterByRefMasterId = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByRefMasterId";
    public static GetListActiveRefMaster = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCode";
    public static GetRefMasterByMasterCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByMasterCode";
    public static GetListActiveRefMasterWithMappingCodeAll = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetListActiveRefMasterWithMappingCodeAll";
    public static GetListActiveRefMasterByRefMasterTypeCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetListActiveRefMasterByRefMasterTypeCode";
    public static GetRefMasterByRefMasterTypeCodeAndMasterCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByRefMasterTypeCodeAndMasterCode";
    public static GetKvpRefMasterByRefMasterTypeCodeAndMasterCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetKvpRefMasterByRefMasterTypeCodeAndMasterCode";
    public static GetRefMasterByRefMasterTypeCode = this.environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByRefMasterTypeCode";
    public static GetListActiveRefMasterDDL = "/RefMaster/GetListKeyValueActiveByCode";
    public static GetListActiveRefMasterOrderSeqNoDDL = "/RefMaster/GetListKeyValueActiveByCodeOrderBySeqNo";
    public static GetListKeyValueActiveByCodeOrderBySeqNoDDL = "/RefMaster/GetListKeyValueActiveByCodeOrderBySeqNo";

    public static GetListActiveRefMasterDetail = this.environment.FoundationR3Url + '/v1' + "/RefMaster/GetListActiveRefMaster";
    
    //REF COUNTRY
    public static GetListRefCountry = this.environment.FoundationR3Url + "/v1" + "/RefCountry/GetListRefCountry";
    public static GetRefCountryByCountryCode = this.environment.FoundationR3Url + "/v1" + "/RefCountry/GetRefCountryByCountryCode";

    //REF INDUSTRY TYPE
    public static GetRefIndustryTypeById = this.environment.FoundationR3Url + "/v1" + "/RefIndustryType/GetRefIndustryTypeByRefIndustryTypeId";
    public static AddRefIndustryType = this.environment.FoundationR3Url + "/v1" + "/RefIndustryType/AddRefIndustryType";
    public static EditRefIndustryType = this.environment.FoundationR3Url + "/v1" + "/RefIndustryType/EditRefIndustryType";
    public static DeleteRefIndustryType = this.environment.FoundationR3Url + "/v1" + "/RefIndustryType/DeleteRefIndustryType";
    public static GetRefIndustryTypeByIndustryTypeCode = this.environment.FoundationR3Url + "/v1" + "/RefIndustryType/GetRefIndustryTypeByIndustryTypeCode";

    //REF PROV DISTRICT
    public static GetRefProvDistrictPaging = this.environment.FoundationR3Url + "/v1" + "/RefProvDistrict/GetRefProvDistrictPaging";

    //MENU
    public static GetRefFormPaging = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetRefFormPaging";
    public static GetAllActiveRefFormByRefRoleId = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllActiveRefFormByRefRoleId";
    public static GetRefFormByRefFormId = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetRefFormByRefFormId";
    public static EditRefForm = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/EditRefForm";
    public static AddRefForm = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/AddRefForm";
    public static DeleteRefForm = "/MenuManagement/DeleteRefForm";
    public static AssignRoleToForms = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/AssignRoleToForms";
    public static GetAllAuthFormsByRefRoleId = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllAuthFormsByRefRoleId";
    public static GetAuthByRefFormIdAndRefRoleId = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAuthByRefFormIdAndRefRoleId";
    public static UpdateFormFeatureAuthForm = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/UpdateFormFeatureAuthForm";
    public static GetAllActiveRefFormAndPathExist = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllActiveRefFormAndPathExist";
    public static GetAllActiveRefForm = this.environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllActiveRefForm";
    public static LoginByRole = this.environment.FoundationR3Url + "/v1" + "/Authenticate/LoginByRole";
    public static LoginByToken = this.environment.FoundationR3Url + "/v1" + "/Authenticate/LoginByToken";
    public static UpdateToken = this.environment.FoundationR3Url + "/v1" + "/Authenticate/UpdateRole";
    public static LogoutAuth = this.environment.FoundationR3Url + "/v1" + "/Authenticate/Logout";

    //FORM FEATURE
    public static GetListRefFeature = this.environment.FoundationR3Url + "/v1" + "/RefFeature/GetListRefFeature";
    public static GetRefFeatureByComponent = this.environment.FoundationR3Url + "/v1" + "/RefFeature/GetRefFeatureByComponent";

    //HOLIDAY
    public static GetAllActiveHolidaySchmH = this.environment.FoundationR3Url + "/v1" + "/Holiday/GetAllActiveHolidaySchmH";
    public static GetListActiveHolidaySchemeH = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/GetListActiveHolidaySchemeH"
    public static GetHolidayPaging = this.environment.FoundationR3Url + "/v1" + "/Holiday/GetHolidayPaging";
    public static AddHolidaySchmH = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/AddHolidaySchmH";
    public static AddHolidaySchmD = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/AddHolidaySchmD";
    public static AddHolidaySchmDUntilYear = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/AddHolidaySchmDUntilYear";
    public static GetHolidaySchmH = this.environment.FoundationR3Url + "/v1" + "/Holiday/GetHolidaySchmH";
    public static GetHolidaySchmHById = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/GetHolidaySchmHById";
    public static GetHolidaySchmDById = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/GetHolidaySchmDById";
    public static EditHolidaySchmHOnly = this.environment.FoundationR3Url + "/v1" + "/Holiday/EditHolidaySchmHOnly";
    public static EditHolidaySchmH = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/EditHolidaySchmH";
    public static EditHolidaySchmD = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/EditHolidaySchmD";
    public static DeleteHolidaySchmD = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/DeleteHolidaySchmD";
    public static GetHolidayDetailPaging = this.environment.FoundationR3Url + "/v1" + "/Holiday/GetHolidayDetailPaging";
    public static CopyHolidaySchmH = this.environment.FoundationR3Url + "/v1" + "/HolidaySchm/CopyHolidaySchmH";

    //NOTIFICATION
    public static SendNotificationRemainingPasswordExpirationDaysToUser = this.environment.FoundationR3Url + "/v1" + "/Notification/SendNotificationRemainingPasswordExpirationDaysToUser";
    public static GetNotificationHByNotificationHId = this.environment.FoundationR3Url + "/v1" + "/NotificationH/GetNotificationHByNotificationHId";
    public static GetListUsernameAndEmpNameByNotificationHId = this.environment.FoundationR3Url + "/v1" + "/NotificationD/GetListUsernameAndEmpNameByNotificationHId"
    public static AddNotificationHAndD = this.environment.FoundationR3Url + "/v1" + "/NotificationH/AddNotificationHAndD"
    public static EditNotificationH = this.environment.FoundationR3Url + "/v1" + "/NotificationH/EditNotificationH"
    public static UpdateReadNotification = this.environment.FoundationR3Url + "/v1" + "/NotificationD/UpdateReadNotificationD";
    public static GetListNotificationHByRefUserId = this.environment.FoundationR3Url + "/v1" + "/NotificationH/GetListNotificationHByRefUserId";

    //REF CURR
    public static GetRefCurrPaging = this.environment.FoundationR3Url + "/v1" + "/RefCurr/GetRefCurrPaging";
    public static AddRefCurr = this.environment.FoundationR3Url + "/v1" + "/RefCurr/AddRefCurr";
    public static EditRefCurr = this.environment.FoundationR3Url + "/v1" + "/RefCurr/EditRefCurr";
    public static GetRefCurrById = this.environment.FoundationR3Url + "/v1" + "/RefCurr/GetRefCurrById";
    public static GetRefCurrByCode = this.environment.FoundationR3Url + "/v1" + "/RefCurr/GetRefCurrByCode";
    public static GetListKvpActiveRefCurr = this.environment.FoundationR3Url + "/v1" + "/RefCurr/GetListKvpActiveRefCurr";
    public static AddExchangeRate = this.environment.FoundationR3Url + "/v1" + "/RefCurr/AddExchangeRate";

    //REF ECONOMIC SECTOR
    public static AddRefEconomicSector = this.environment.FoundationR3Url + "/v1" + "/RefEconomicSector/AddRefEconomicSector";
    public static EditRefEconomicSector = this.environment.FoundationR3Url + "/v1" + "/RefEconomicSector/EditRefEconomicSector";
    public static GetRefEconomicSectorById = this.environment.FoundationR3Url + "/v1" + "/RefEconomicSector/GetRefEconomicSectorById";

    //REF PROV DISTRICT
    public static AddRefProvDistrict = this.environment.FoundationR3Url + "/v1" + "/RefProvDistrict/AddRefProvDistrict";
    public static EditRefProvDistrict = this.environment.FoundationR3Url + "/v1" + "/RefProvDistrict/EditRefProvDistrict";
    public static GetRefProvDistrictById = this.environment.FoundationR3Url + "/v1" + "/RefProvDistrict/GetRefProvDistrictByRefProvDistrictId";

    //ASSET MASTER
    public static AddAssetMaster = this.environment.FoundationR3Url + "/v1" + "/AssetMaster/AddAssetMaster";
    public static EditAssetMaster = this.environment.FoundationR3Url + "/v1" + "/AssetMaster/EditAssetMaster";
    public static GetAssetMasterById = this.environment.FoundationR3Url + "/v1" + "/AssetMaster/GetAssetMasterById";
    public static GetValueAssetType = this.environment.FoundationR3Url + "/v1" + "/AssetType/GetListKeyValueActiveById";
    public static GetListAssetCategory = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/GetListAssetCategoryByIdWithCriteriaObj";
    public static GetListAssetSchmH = this.environment.FoundationR3Url + "/v1" + "/AssetSchmH/GetListAssetSchmHByAssetMasterId";
    public static GetListAssetMasterByAssetSchmHId = this.environment.FoundationR3Url + "/v1" + "/AssetMaster/GetListAssetMasterByAssetSchmHId";
    public static EditListAssetSchmDByAssetMasterId = this.environment.FoundationR3Url + "/v1" + "/AssetSchmD/EditListAssetSchmDByAssetMasterId";
    public static GetUploadAssetMasterByUploadMonitoringNoAndTrxType = this.environment.FoundationR3Url + "/v2" + "/AssetMaster/GetUploadAssetMasterByUploadMonitoringNoAndTrxType";
    public static AddAssetMasterAttrContent = this.environment.FoundationR3Url + "/v1" + "/AssetMasterAttrContent/AddAssetMasterAttrContent";
    public static GetAssetMasterAttrContentForAssetMaster = this.environment.FoundationR3Url + "/v1" + "/AssetMasterAttrContent/GetAssetMasterAttrContentForAssetMaster";
    public static GetAssetMasterAttrContentForAssetMasterByAttrTypeCode = this.environment.FoundationR3Url + "/v1" + "/AssetMasterAttrContent/GetAssetMasterAttrContentForAssetMasterByAttrTypeCode";

    //REF ATTR
    public static GetListActiveRefAttrType = this.environment.FoundationR3Url + "/v1" + "/RefAttrType/GetListActiveRefAttrType";
    public static GetRefAttrById = this.environment.FoundationR3Url + "/v1" + "/RefAttr/GetRefAttrById";
    public static AddRefAttr = this.environment.FoundationR3Url + "/v1" + "/RefAttr/AddRefAttr";
    public static EditRefAttr = this.environment.FoundationR3Url + "/v1" + "/RefAttr/EditRefAttr";
    public static GetListActiveRefAttrByAttrGroup = this.environment.FoundationR3Url + "/v1" + "/RefAttr/GetListActiveRefAttrByAttrGroup"
    public static GetListActiveRefAttrByListAttrGroup = this.environment.FoundationR3Url + "/v1" + "/RefAttr/GetListActiveRefAttrByListAttrGroup"

    //REF PROFESSION
    public static AddRefProfession = this.environment.FoundationR3Url + "/v1" + "/RefProfession/AddRefProfession";
    public static EditRefProfession = this.environment.FoundationR3Url + "/v1" + "/RefProfession/EditRefProfession";
    public static DeleteRefProfession = "/RefProfession/DeleteRefProfession";
    public static GetRefProfessionById = this.environment.FoundationR3Url + "/v1" + "/RefProfession/GetRefProfessionByRefProfessionId";
    public static GetRefProfessionByProfessionCode = this.environment.FoundationR3Url + "/v1" + "/RefProfession/GetRefProfessionByProfessionCode"
    public static GetRefProfessionByRefProfessionId = this.environment.FoundationR3Url + "/v1" + "/RefProfession/GetRefProfessionByRefProfessionId";

    //REF REASON
    public static AddRefReason = this.environment.FoundationR3Url + "/v1" + "/RefReason/AddRefReason";
    public static EditRefReason = this.environment.FoundationR3Url + "/v1" + "/RefReason/EditRefReason";
    public static GetRefReasonById = this.environment.FoundationR3Url + "/v1" + "/RefReason/GetRefReasonByRefReasonId";

    //REF REASON TYPE
    public static GetValueReasonType = this.environment.FoundationR3Url + "/v1" + "/RefReasonType/GetListKeyValueByCode";

    //WORKHOUR
    public static GetListActiveWorkingSchmH = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/GetListActiveWorkingSchmH";
    public static GetWorkHourSchmHPaging = this.environment.FoundationR3Url + "/v1" + "/WorkHour/GetWorkHourSchmHPaging";
    public static AddWorkingHourSchmH = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/AddWorkingHourSchmH";
    public static AddListWorkingHourSchmD = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/AddListWorkingHourSchmD";
    public static EditListWorkingHourSchmD = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/EditListWorkingHourSchmD";
    public static EditWorkingHourSchmH = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/EditWorkingHourSchmH";
    public static GetWorkingHourSchmH = this.environment.FoundationR3Url + "/v1" + "/WorkHour/GetWorkingHourSchmH";
    public static GetWorkingHourSchmD = this.environment.FoundationR3Url + "/v1" + "/WorkHour/GetWorkingHourSchmD";
    public static GetWorkingHourSchmHById = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/GetWorkingHourSchmHById";
    public static GetListWorkingHourSchmDByWorkingHourHId = this.environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/GetListWorkingHourSchmDByWorkingHourHId";

    //QUEUE
    public static AddQueue = this.environment.FoundationR3Url + "/v1" + "/RabbitMq/AddQueue";

    //REF MODULE
    public static GetListRefModuleKeyValue = this.environment.FoundationR3Url + "/v1" + "/RefModule/GetListRefModuleKeyValue";
    public static GetListKeyValueByCode = this.environment.FoundationR3Url + "/v1" + "/RefModule/GetListKeyValueByCode";
    public static GetListKeyValueRefModuleById = this.environment.FoundationR3Url + "/v1" + "/RefModule/GetListKeyValueRefModuleById";

    //REF EMP LEAVE MANAGEMENT
    public static GetRefEmpLeaveMngmntPaging = this.environment.FoundationR3Url + "/v1" + "/RefEmpLeaveManagement/GetRefEmpLeaveMngmntPaging";
    public static DeleteRefEmpLeaveMngmnt = this.environment.FoundationR3Url + "/v2" + "/RefEmpLeaveMngmnt/DeleteRefEmpLeaveMngmnt";
    public static GetRefEmpLeaveMngmntById = this.environment.FoundationR3Url + "/v1" + "/RefEmpLeaveMngmnt/GetRefEmpLeaveByRefEmpLeaveId";
    public static EditRefEmpLeaveMngmnt = this.environment.FoundationR3Url + "/v2" + "/RefEmpLeaveMngmnt/EditRefEmpLeaveMngmnt";
    public static AddRefEmpLeaveMngmnt = this.environment.FoundationR3Url + "/v2" + "/RefEmpLeaveMngmnt/AddRefEmpLeaveMngmnt";

    //UPLOAD
    public static UploadReview = this.environment.FoundationR3Url + "/v1" + "/Upload/UploadReview";
    public static UploadReviewV2 = this.environment.FoundationR3Url + "/v2" + "/Upload/UploadReview";
    public static UpdateUploadMonitoringHStatActivity = this.environment.FoundationR3Url + "/v1" + "/Upload/UpdateUploadMonitoringHStatActivity";
    public static CancelUpload = this.environment.FoundationR3Url + "/v1" + "/Upload/CancelUpload";
    public static CancelUploadV2 = this.environment.FoundationR3Url + "/v2" + "/Upload/CancelUpload";
    public static UploadFile = this.environment.FoundationR3Url + "/v1" + "/Upload/UploadFile";
    public static UploadFileV2 = this.environment.FoundationR3Url + "/v2" + "/Upload/UploadFile";

    //UPLOAD MONITORING FOUNDATION
    public static GetUploadMonitoringPaging = this.environment.FoundationR3Url + "/v1" + "/UploadMonitoring/GetUploadMonitoringPaging";

    //UPLOAD TYPE
    public static GetUploadTypeByUploadTypeId = this.environment.FoundationR3Url + "/v1" + "/UploadType/GetUploadTypeByUploadTypeId";
    public static GetUploadTypePaging = this.environment.FoundationR3Url + "/v1" + "/UploadType/GetUploadTypePaging";

    //UPLOAD SETTING
    public static GetUploadSettingHIdByUploadTypeId = this.environment.FoundationR3Url + "/v1" + "/UploadSetting/GetUploadSettingHIdByUploadTypeId";
    public static GetListUploadSettingDIdByUploadSettingHId = this.environment.FoundationR3Url + "/v1" + "/UploadSetting/GetListUploadSettingDIdByUploadSettingHId";
    public static GetListUploadSettingDIdByUploadTypeId = this.environment.FoundationR3Url + "/v1" + "/UploadSetting/GetListUploadSettingDIdByUploadTypeId";
    public static AssignRoleToUploadSetting = this.environment.FoundationR3Url + "/v1" + "/UploadSetting/AssignRoleToUploadSetting";
    public static GetListRefRoleByUploadTypeId = this.environment.FoundationR3Url + "/v1" + "/UploadSetting/GetListRefRoleByUploadTypeId";
    public static GetListUploadSettingDByUploadSettingHId = "/UploadSetting/GetListUploadSettingDByUploadSettingHId";

    // GENERIC
    public static GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode = this.environment.ApprovalR3Url + "/Generic/GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode";

    // ASSET TYPE
    public static AddAssetType = this.environment.FoundationR3Url + "/v1" + "/AssetType/AddAssetType"
    public static EditAssetType = this.environment.FoundationR3Url + "/v1" + "/AssetType/EditAssetType"
    public static GetAssetTypeByCode = this.environment.FoundationR3Url + "/v1" + "/AssetType/GetAssetTypeByCode"
    public static GetAssetTypeById = this.environment.FoundationR3Url + "/v1" + "/AssetType/GetAssetTypeById"
    public static GetListAssetType = this.environment.FoundationR3Url + "/v1" + "/AssetType/GetListAssetType"
    public static GetListActiveAssetType = this.environment.FoundationR3Url + "/v1" + "/AssetType/GetListActiveAssetType"

    // LIST APPROVER
    public static ApvHoldTaskUrl = this.environment.FoundationR3Url + "/v1" + "/Approval/Hold";
    public static ApvTakeBackTaskUrl = this.environment.FoundationR3Url + "/v1" + "/Approval/TakeBack";

    //REF REASON
    public static GetValueReasonModel = this.environment.FoundationR3Url + "/v1" + "/RefReason/GetListKeyValueByCode";
    public static GetListActiveRefReason = this.environment.FoundationR3Url + "/v1" + "/RefReason/GetListActiveRefReason";
    //asset accesory
    public static AddNewAssetAccesory = this.environment.FoundationR3Url + "/v1" + "/AssetAccessory/AddAssetAccessory"
    public static EditAssetAccessory = this.environment.FoundationR3Url + "/v1" + "/AssetAccessory/EditAssetAccessory"
    public static GetAssetAccessorybyAssetAccesoryCode = this.environment.FoundationR3Url + "/v1" + "/AssetAccessory/GetAssetAccessoryByCode"
    public static GetAssetAccessorybyAssetAccessoryId = this.environment.FoundationR3Url + "/v1" + "/AssetAccessory/GetAssetAccessoryById"
    public static GetlistAssetAccessorybyAssetTypeId = this.environment.FoundationR3Url + "/v1" + "/AssetAccessory/GetListAssetAccessoryByAssetTypeId"
    public static DeleteAssetAccessory = this.environment.FoundationR3Url + "/v1" + "/AssetAccessory/DeleteAssetAccessory"

    //asset attr
    public static AddAssetAttr = this.environment.FoundationR3Url + "/v1" + "/AssetAttr/AddAssetAttr";
    public static EditAssetAttr = this.environment.FoundationR3Url + "/v1" + "/AssetAttr/EditAssetAttr";
    public static GetListAssetAttrByAssetTypeId = this.environment.FoundationR3Url + "/v1" + "/AssetAttr/GetListAssetAttrByAssetTypeId";
    public static GetAssetAttrByAssetAttrId = this.environment.FoundationR3Url + "/v1" + "/AssetAttr/GetAssetAttrByAssetAttrId";
    public static DeleteAssetAttr = this.environment.FoundationR3Url + "/v1" + "/AssetAttr/DeleteAssetAttr";

    //asset category
    public static AddNewAssetCategory = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/AddAssetCategory"
    public static EditAssetCategory = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/EditAssetCategory"
    public static GetAssetCategoryByAssetCategoryCode = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/GetAssetCategoryByCode"
    public static GetAssetCategorybyAssetCategoryId = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/GetAssetCategoryById"
    public static GetlistAssetCategorybyAssetTypeId = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/GetListAssetCategoryByAssetTypeId"//
    public static DeleteAssetCategory = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/DeleteAssetCategory"
    public static GetActiveAssetCategoryValue = this.environment.FoundationR3Url + "/v1" + "/AssetCategory/GetListActiveAssetCategoryValue"

    // ASSET DOC LIST
    public static AddNewAssetDocList = this.environment.FoundationR3Url + "/v1" + "/AssetDocList/AddAssetDocList"
    public static EditAssetDocList = this.environment.FoundationR3Url + "/v1" + "/AssetDocList/EditAssetDocList"
    public static GetAssetDocListByAssetDocListId = this.environment.FoundationR3Url + "/v1" + "/AssetDocList/GetAssetDocListById"
    public static GetlistAssetDocListByAssetTypeId = this.environment.FoundationR3Url + "/v1" + "/AssetDocList/GetListAssetDocListByAssetTypeId"
    public static DeleteAssetDocList = this.environment.FoundationR3Url + "/v1" + "/AssetDocList/DeleteAssetDocList"

    // ASSET REF DOC
    public static AddNewRefAssetDocData = this.environment.FoundationR3Url + "/v1" + "/RefAssetDoc/AddRefAssetDoc"
    public static EditRefAssetDocData = this.environment.FoundationR3Url + "/v1" + "/RefAssetDoc/EditRefAssetDoc"
    public static GetRefAssetDocByAssetDocCode = this.environment.FoundationR3Url + "/v1" + "/RefAssetDoc/GetRefAssetDocByAssetDocCode"
    public static GetRefAssetDocByRefAssetDocId = this.environment.FoundationR3Url + "/v1" + "/RefAssetDoc/GetRefAssetDocByRefAssetDocId"
    public static GetListRefAssetDoc = this.environment.FoundationR3Url + "/v1" + "/RefAssetDoc/GetListRefAssetDoc"


    // ASSET SCHEME
    public static GetAssetSchmHById = this.environment.FoundationR3Url + "/v1" + "/AssetSchmH/GetAssetSchmHById";
    public static AddAssetSchmH = this.environment.FoundationR3Url + "/v1" + "/AssetSchmH/AddAssetSchmH";
    public static EditAssetSchmH = this.environment.FoundationR3Url + "/v1" + "/AssetSchmH/EditAssetSchmH";
    public static GetListAssetSchmDByAssetSchmHId = this.environment.FoundationR3Url + "/v1" + "/AssetSchmD/GetListAssetSchmDByAssetSchmHId"
    public static EditListAssetSchmD = this.environment.FoundationR3Url + "/v1" + "/AssetSchmD/EditListAssetSchmD"
    public static AddListAssetSchmD = this.environment.FoundationR3Url + "/v1" + "/AssetSchmD/AddListAssetSchmD";
    public static DeleteAssetSchmD = this.environment.FoundationR3Url + "/v1" + "/AssetSchmD/DeleteAssetSchmD";
    public static AddRangeAssetSchmD = this.environment.FoundationR3Url + "/v1" + "/AssetSchmD/AddRangeAssetSchmD";

    // ASSET TYPE
    public static GetActiveAssetTypeValue = this.environment.FoundationR3Url + "/v1" + "/AssetType/GetListActiveAssetType";

    // ASSET NEGATIVE
    public static AddAssetNegative = this.environment.FoundationR3Url + "/v1" + "/AssetNegative/AddAssetNegative";
    public static EditAssetNegative = this.environment.FoundationR3Url + "/v1" + "/AssetNegative/EditAssetNegative";
    public static GetAssetNegativeByIdEditPage = this.environment.FoundationR3Url + "/v1" + "/AssetNegative/GetAssetNegativeByIdEditPage";
    public static GetUploadAssetNegativeByUploadMonitoringNoAndTrxType = this.environment.FoundationR3Url + "/v2" + "/AssetNegative/GetUploadAssetNegativeByUploadMonitoringNoAndTrxType";

    // VENDOR
    public static AddVendorHO = this.environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorHO";
    public static AddVendorHOX = this.environment.FoundationR3Url + "/v1" + "/VendorX/AddVendorHOX";
    public static EditVendorHO = this.environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorHO";
    public static EditVendorHOX = this.environment.FoundationR3Url + "/v1" + "/VendorX/EditVendorHOX";
    public static AddVendorHolding = this.environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorHolding";
    public static EditVendorHolding = this.environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorHolding";
    public static AddVendorATPM = this.environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorATPM";
    public static EditVendorATPM = this.environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorATPM";
    public static GetVendorAndVendorAddr = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorAndVendorTaxAddrByVendorId";
    public static GetVendorAddrByVendorIdOnly = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorId";
    public static GetVendorByVendorId = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorByVendorId";
    public static AddVendorAddr = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/AddVendorAddr";
    public static EditVendorAddr = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/EditVendorAddr";
    public static GetVendorAddrByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorIdMrAddrType";
    public static GetListHoByVendorId = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetListHoByVendorId";
    public static GetListVendorBankAccByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetListVendorBankAccByVendorId";
    public static AddVendorBankAcc = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/AddVendorBankAcc";
    public static EditVendorBankAcc = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/EditVendorBankAcc";
    public static GetVendorBankAccByVendorBankAccId = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetVendorBankAccByVendorBankAccId";
    public static DeleteVendorBankAcc = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/DeleteVendorBankAcc";
    public static GetListVendorContactPersonByVendorCode = this.environment.FoundationR3Url + "/v1" + "/VendorContactPerson/GetListVendorContactPersonByVendorCode"
    public static GetVendorContactPersonById = this.environment.FoundationR3Url + "/v1" + "/VendorContactPerson/GetVendorContactPersonById";
    public static AddVendorContactPerson = this.environment.FoundationR3Url + "/v1" + "/VendorContactPerson/AddVendorContactPerson";
    public static EditVendorContactPerson = this.environment.FoundationR3Url + "/v1" + "/VendorContactPerson/EditVendorContactPerson";
    public static DeleteVendorContactPerson = this.environment.FoundationR3Url + "/v1" + "/VendorContactPerson/DeleteVendorContactPerson";
    public static GetListVendorContactPersonByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorContactPerson/GetListVendorContactPersonByVendorId"
    public static GetListBranchByVendorId = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetListBranchByVendorId";
    public static GetListVendorBankAccByVendorEmpId = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetListVendorBankAccByVendorEmpId";
    public static GetVendorAddrByVendorAddrId = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorAddrId";
    public static GetVendorByVendorCode = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorByVendorCode";
    public static GetListKeyValueActiveByCategoryCodeAndOfficeCode = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetListKeyValueActiveByCategoryCodeAndOfficeCode";
    public static GetListKvpVendorObjByCategoryCode = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetListKvpVendorObjByCategoryCode";
    
    //VENDOR FUNDING COY
    public static AddVendorFundingCoy = this.environment.FoundationR3Url + "/v1" + "/Vendor/AddFundingCompany";
    public static EditVendorFundingCoy = this.environment.FoundationR3Url + "/v1" + "/Vendor/EditFundingCompany";

    // VENDOR ADDR
    public static GetVendorAddrByVendorCodeAndMrAddrTypeCode = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorCodeAndMrAddrTypeCode";
    public static GetVendorAddrByVendorCode = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorCode";
    // VENDOR BANK ACC
    public static GetVendorBankAccDefaultByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetVendorBankAccDefaultByVendorId";

    // VENDOR GRADING
    public static SubmitRequestVendorGrading = this.environment.FoundationR3Url + "/v1" + "/VendorGrading/SubmitRequestVendorGrading";
    public static SubmitRequestVendorGradingV2 = this.environment.FoundationR3Url + "/v2" + "/VendorGrading/SubmitRequestVendorGrading";
    public static GetRuleVendorGrading = this.environment.FoundationR3Url + "/v1" + "/VendorGrading/GetRuleVendorGrading";
    public static GetRuleVendorGradingV2 = this.environment.FoundationR3Url + "/v2" + "/VendorGrading/GetRuleVendorGrading";
    public static GetVendorGrade = this.environment.FoundationR3Url + "/v1" + "/VendorGrading/GetVendorGrade";

    // VENDOR OFFICE MEMBER
    public static AddListVendorOfficeMember = this.environment.FoundationR3Url + "/v1" + "/VendorOfficeMbr/AddListVendorOfficeMember"
    public static GetListVendorOfficeMbrByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorOfficeMbr/GetListVendorOfficeMbrByVendorId"
    public static DeleteVendorOfficeMember = this.environment.FoundationR3Url + "/v1" + "/VendorOfficeMbr/DeleteVendorOfficeMember"

    // VENDOR GROUP
    public static AddVendorGrp = this.environment.FoundationR3Url + "/v1" + "/VendorGrp/AddVendorGrp";
    public static EditVendorGrp = this.environment.FoundationR3Url + "/v1" + "/VendorGrp/EditVendorGrp";
    public static GetVendorGrpByVendorGrpCode = this.environment.FoundationR3Url + "/v1" + "/VendorGrp/GetVendorGrpByVendorGrpCode";
    public static GetVendorGrpByVendorGrpId = this.environment.FoundationR3Url + "/v1" + "/VendorGrp/GetVendorGrpByVendorGrpId";
    public static GetVendorGrpForUpdateByVendorGrpCode = this.environment.FoundationR3Url + "/v1" + "/VendorGrp/GetVendorGrpForUpdateByVendorGrpCode";
    public static GetVendorGrpForUpdateByVendorGrpId = this.environment.FoundationR3Url + "/v1" + "VendorGrp/GetVendorGrpForUpdateByVendorGrpId";
    public static GetListVendorGrpByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorGrp/GetListVendorGrpByVendorId";

    // VENDOR GROUP MEMBER 
    public static GetListVendorGrpMbrByVendorGrpId = this.environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/GetListVendorGrpMbrByVendorGrpId";
    public static GetListVendorGrpMbrByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/GetListVendorGrpMbrByVendorId";
    public static AddRangeVendorGrpMbr = this.environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/AddRangeVendorGrpMbr";
    public static DeleteVendorGrpMemberById = this.environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/DeleteVendorGrpMbrById"

    // VENDOR BRANCH
    public static AddVendorBranch = this.environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorBranch"
    public static GetVendorBranchAndVendorTaxAddrByVendorId = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorBranchAndVendorTaxAddrByVendorId"
    public static EditVendorBranch = this.environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorBranch";

    // VENDOR EMP
    public static AddVendorBranchEmp = this.environment.FoundationR3Url + "/v1" + "/VendorEmp/AddVendorBranchEmp";
    public static AddVendorBranchEmpV2 = this.environment.FoundationR3Url + "/v2" + "/VendorEmp/AddVendorBranchEmp";
    public static GetVendorEmpByVendorEmpId = this.environment.FoundationR3Url + "/v1" + "/VendorEmp/GetVendorEmpByVendorEmpId";
    public static GetVendorEmpAndVendorTaxAddrByVendorEmpId = this.environment.FoundationR3Url + "/v1" + "/VendorEmp/GetVendorEmpAndVendorTaxAddrByVendorEmpId";
    public static EditVendorBranchEmp = this.environment.FoundationR3Url + "/v1" + "/VendorEmp/EditVendorBranchEmp";
    public static EditVendorBranchEmpV2 = this.environment.FoundationR3Url + "/v2" + "/VendorEmp/EditVendorBranchEmp";
    public static GetListVendorEmpByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorEmp/GetListVendorEmpByVendorId";

    // VENDOR ADDR
    public static GetVendorAddrByVendorEmpId = this.environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorEmpIdMrAddrType";

    // VENDOR SCHEME
    public static AddVendorSchm = this.environment.FoundationR3Url + "/v1" + "/VendorSchm/AddVendorSchm";
    public static EditVendorSchm = this.environment.FoundationR3Url + "/v1" + "/VendorSchm/EditVendorSchm";
    public static GetVendorSchmByVendorSchmId = this.environment.FoundationR3Url + "/v1" + "/VendorSchm/GetVendorSchmByVendorSchmId";
    public static AddVendorSchmMember = this.environment.FoundationR3Url + "/v1" + "/VendorSchmMbr/AddVendorSchmMember";
    public static DeleteVendorSchmMember = this.environment.FoundationR3Url + "/v1" + "/VendorSchmMbr/DeleteVendorSchmMember"
    public static GetListVendorSchmMemberByVendorSchmId = this.environment.FoundationR3Url + "/v1" + "/VendorSchmMbr/GetListVendorSchmMemberByVendorSchmId"

    // VENDOR ATTR
    public static GetListActiveVendorAttrByVendorCategoryCode = this.environment.FoundationR3Url + "/v1" + "/VendorAttr/GetListActiveVendorAttrByVendorCategoryCode";

    // VENDOR ATTR CONTENT
    public static AddRangeVendorAttrContent = this.environment.FoundationR3Url + "/v1" + "/VendorAttrContent/AddRangeVendorAttrContent";
    public static EditListVendorAttrContent = this.environment.FoundationR3Url + "/v1" + "/VendorAttrContent/EditListVendorAttrContent";
    public static DeleteRangeVendorAttrContentByIds = "/VendorAttrContent/DeleteRangeVendorAttrContentByIds";
    public static GetListVendorAttrContentByVendorAttrId = this.environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListVendorAttrContentByVendorAttrId";
    public static GetListVendorAttrContentByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListVendorAttrContentByVendorId";
    public static GetListActiveAttrVendorAttrContentByVendorId = this.environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListActiveAttrVendorAttrContentByVendorId";
    public static GetListVendorAttrContentByVendorCode = this.environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListVendorAttrContentByVendorCode";

    // VENDOR ATPM MAPPING
    public static GetListVendorAtpmMappingByVendorId = this.environment.FoundationR3Url + "/v1" + "/Vendor/GetListVendorAtpmMappingByVendorId"

    // VERIFICATION
    // REF VERF ANSWER TYPE
    public static GetActiveRefVerfAnswerTypes = this.environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetActiveRefVerfAnswerTypes";
    public static GetRefVerfAnswerTypeByCode = this.environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeByCode";
    public static GetRefVerfAnswerTypeById = this.environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeById";
    public static GetRefVerfAnswerTypes = this.environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypes";
    public static GetRefVerfAnswerTypeForUpdateById = this.environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeForUpdateById";
    public static GetRefVerfAnswerTypeForUpdateByCode = this.environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeForUpdateByCode";

    // VERF QUESTION ANSWER
    public static AddVerfQuestionAnswer = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/AddVerfQuestionAnswer";
    public static EditVerfQuestionAnswer = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/EditVerfQuestionAnswer";
    public static GetVerfQuestionAnswerByRefVerfAnswerTypeId = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerByRefVerfAnswerTypeId";
    public static GetVerfQuestionAnswerForUpdateById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerForUpdateById";
    public static GetVerfQuestionAnswerListByVerfSchemeCode = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerListByVerfSchemeCode";
    public static GetVerfQuestionAnswerListByVerfSchemeHId = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerListByVerfSchemeHId";

    // VERF QUESTION GRP H
    public static AddVerfQuestionGrpH = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/AddVerfQuestionGrpH";
    public static EditVerfQuestionGrpH = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/EditVerfQuestionGrpH";
    public static GetActiveVerfQuestionGrpHs = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetActiveVerfQuestionGrpHs";
    public static GetVerfQuestionGrpHs = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetVerfQuestionGrpHs";
    public static GetQuestionGrpHById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHById";
    public static GetQuestionGrpHForUpdateById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHForUpdateById";
    public static GetQuestionGrpHByCode = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHByCode";
    public static GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById"

    // VERF QUESTION GRP D
    public static AddListVerfQuestionGrpD = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/AddListVerfQuestionGrpD";
    public static DeleteVerfQuestionGroupDById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/DeleteVerfQuestionGroupDById";
    public static EditVerfQuestionGrpD = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/EditVerfQuestionGrpD";
    public static GetActiveVerfQuestionGrpDsByGrpHId = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetActiveVerfQuestionGrpDsByGrpHId";
    public static GetVerfQuestionGrpDById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetVerfQuestionGrpDById";
    public static GetVerfQuestionGrpDByGrpHId = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetVerfQuestionGrpDByGrpHId";
    public static GetVerfQuestionGrpDForUpdateById = this.environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetVerfQuestionGrpDForUpdateById";

    // VERF RESULT
    public static GetVerfResultsByTrxRefNo = this.environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultsByTrxRefNo";
    public static GetVerfResultById = this.environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultById";
    public static GetVerfResultByResultNo = this.environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultByResultNo";
    public static GetVerfResultByTrxRefNoAndVerfTrxTypeCode = this.environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultByTrxRefNoAndVerfTrxTypeCode";
    public static AddVerfResult = this.environment.FoundationR3Url + "/v1" + "/VerfResult/AddVerfResult";
    public static AddVerfResultHeaderAndVerfResultDetailForSurveyVerif = this.environment.FoundationR3Url + "/v1" + "/VerfResultH/AddVerfResultHeaderAndVerfResultDetailForSurveyVerif";

    // VERF RESULT H
    public static GetVerfResultHsByVerfResultId = this.environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHsByVerfResultId";
    public static GetVerfResultHById = this.environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHById";
    public static GetVerfResultHsByTrxRefNo = this.environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHsByTrxRefNo";
    public static GetVerfResultHByTrxRefNoAndMrAddrTypeCode = this.environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHByTrxRefNoAndMrAddrTypeCode";
    public static GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode = this.environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode";

    // VERF RESULT D
    public static EditVerfResultD = this.environment.FoundationR3Url + "/v1" + "/VerfResultD/EditVerfResultD";
    public static GetVerfResultDsByVerfResultHId = this.environment.FoundationR3Url + "/v1" + "/VerfResultD/GetVerfResultDsByVerfResultHId";
    public static GetVerfResultDById = this.environment.FoundationR3Url + "/v1" + "/VerfResultD/GetVerfResultDById";
    public static GetListVerfResultDInQuestionGrp = this.environment.FoundationR3Url + "/v1" + "/VerfResultD/GetListVerfResultDInQuestionGrp";
    
    // VERF SCHEME H
    public static AddVerfSchemeH = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/AddVerfSchemeH";
    public static EditVerfSchemeH = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/EditVerfSchemeH";
    public static DeleteVerfSchemeHById = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/DeleteVerfSchemeHById";
    public static GetActiveVerfSchemeHs = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetActiveVerfSchemeHs";
    public static GetVerfSchemeHs = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHs";
    public static GetVerfSchemeHById = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHById";
    public static GetVerfSchemeHByCode = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHByCode";

    // VERF SCHEME D
    public static EditVerfSchemeD = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeD/EditVerfSchemeD";
    public static GetVerfSchemeHForUpdateById = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHForUpdateById";
    public static GetVerfSchemeDataByVerfSchemeHId = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeDataByVerfSchemeHId";
    public static AddListVerfSchemeD = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeD/AddListVerfSchemeD";
    public static DeleteVerfSchemeD = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeD/DeleteVerfSchemeD";
    public static GetVerfSchemeDsByVerfSchemeHId = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeD/GetVerfSchemeDsByVerfSchemeHId";
    public static GetVerfSchemeDById = this.environment.FoundationR3Url + "/v1" + "/VerfSchemeD/GetVerfSchemeDById";

    // CUST DUPLICATE CHECKING
    public static GetCustomerDuplicateCheck = this.environment.FoundationR3Url + "/v1" + "/CustDuplicateCheck/GetCustomerDuplicateCheck";
    public static GetNegativeCustomerDuplicateCheck = this.environment.FoundationR3Url + "/v1" + "/CustDuplicateCheck/GetNegativeCustomerDuplicateCheck";
    public static GetCustomerAndNegativeCustDuplicateCheck = this.environment.FoundationR3Url + "/v1" + "/CustDuplicateCheck/GetCustomerAndNegativeCustDuplicateCheck";

    // CUSTOMER PERSONAL
    public static AddNewCustPersonal = this.environment.FoundationR3Url + "/v1" + "/CustPersonal/AddCustPersonal"
    public static EditCustPersonal = this.environment.FoundationR3Url + "/v1" + "/CustPersonal/EditCustPersonal"
    public static GetCustPersonalbyCustPersonalId = this.environment.FoundationR3Url + "/v1" + "/CustPersonal/GetCustPersonalByCustPersonalId"
    public static GetCustPersonalbyCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonal/GetCustPersonalByCustId"

    // CUSTOMER
    public static AddNewCust = this.environment.FoundationR3Url + "/v1" + "/Cust/AddCust";
    public static AddCustPersonalMainData = this.environment.FoundationR3Url + "/v1" + "/Cust/AddCustPersonalMainData";
    public static AddCustPersonalMainDataV2 = this.environment.FoundationR3Url + "/v2" + "/Cust/AddCustPersonalMainData";
    public static AddCustCompanyMainData = this.environment.FoundationR3Url + "/v1" + "/Cust/AddCustCompanyMainData";
    public static AddCustCompanyMainDataV2 = this.environment.FoundationR3Url + "/v2" + "/Cust/AddCustCompanyMainData";
    public static EditCust = this.environment.FoundationR3Url + "/v1" + "/Cust/EditCust";
    public static EditCustPersonalMainData = this.environment.FoundationR3Url + "/v1" + "/Cust/EditCustPersonalMainData";
    public static EditCustPersonalMainDataV2 = this.environment.FoundationR3Url + "/v2" + "/Cust/EditCustPersonalMainData";
    public static EditCustCompanyMainData = this.environment.FoundationR3Url + "/v1" + "/Cust/EditCustCompanyMainData";
    public static EditCustCompanyMainDataV2 = this.environment.FoundationR3Url + "/v2" + "/Cust/EditCustCompanyMainData";
    public static EditDuplicateCust = this.environment.FoundationR3Url + "/v1" + "/Cust/EditDuplicateCust";
    public static EditNegativeDuplicateCust = this.environment.FoundationR3Url + "/v1" + "/Cust/EditNegativeDuplicateCust";
    public static GetCustByCustId = this.environment.FoundationR3Url + "/v1" + "/Cust/GetCustByCustId";
    public static GetCustPersonalForUpdateByCustNo = this.environment.FoundationR3Url + "/v1" + "/Cust/GetCustPersonalForUpdateByCustNo";
    public static GetCustCompanyForUpdateByCustNo = this.environment.FoundationR3Url + "/v1" + "/Cust/GetCustCompanyForUpdateByCustNo";
    public static DeleteNegativeCustomer = this.environment.FoundationR3Url + "/v1" + "/NegativeCust/DeleteNegativeCust";
    public static GetListCustGrpByMemberCustIdForCustGrpTab = this.environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpByMemberCustIdForCustGrpTab";
    public static GetListCustGrpByMemberCustId = this.environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpByMemberCustId";
    public static GetCustByCustNo = this.environment.FoundationR3Url + "/v1" + "/Cust/GetCustByCustNo";
    public static AddCustAsset = this.environment.FoundationR3Url + "/v1" + "/CustAsset/AddCustAsset";
    public static DeleteCustAsset = this.environment.FoundationR3Url + "/v1" + "/CustAsset/DeleteCustAsset";
    public static EditCustAsset = this.environment.FoundationR3Url + "/v1" + "/CustAsset/EditCustAsset";
    public static GetCustAssetByCustAssetId = this.environment.FoundationR3Url + "/v1" + "/CustAsset/GetCustAssetByCustAssetId";
    public static GetListCustAssetByCustId = this.environment.FoundationR3Url + "/v1" + "/CustAsset/GetListCustAssetByCustId";

    public static SaveCustPersonalShareholderMainData = this.environment.FoundationR3Url  + '/v1' + "/Cust/SaveCustPersonalShareholderMainData";
    public static SaveCustPersonalShareholderMainDataV2 = this.environment.FoundationR3Url  + '/v2' + "/Cust/SaveCustPersonalShareholderMainData";
    public static SaveCustCompanyShareholderMainData = this.environment.FoundationR3Url  + '/v1' + "/Cust/SaveCustCompanyShareholderMainData";
    public static SaveCustCompanyShareholderMainDataV2 = this.environment.FoundationR3Url  + '/v2' + "/Cust/SaveCustCompanyShareholderMainData";
    public static SaveCustPersonalFamilyMainData = this.environment.FoundationR3Url  + '/v1' + "/Cust/SaveCustPersonalFamilyMainData";
    public static SaveCustPersonalFamilyMainDataV2 = this.environment.FoundationR3Url  + '/v2' + "/Cust/SaveCustPersonalFamilyMainData";
    public static NewEditDuplicateCust = this.environment.FoundationR3Url  + '/v1' + "/Cust/NewEditDuplicateCust";
    public static NewEditDuplicateCustV2 = this.environment.FoundationR3Url  + '/v2' + "/Cust/NewEditDuplicateCust";    
    public static GetCustHighlightCommentByCustId = this.environment.FoundationR3Url + "/v1" + "/Cust/GetCustHighlightCommentByCustId";
    public static SendCustomerDataToRabbitMq = this.environment.FoundationR3Url + "/v1" + "/Cust/SendCustomerDataToRabbitMq";
    public static UpdateToMainCustomer = this.environment.FoundationR3Url + "/v1" + "/Cust/UpdateToMainCustomer";
    
    // CUSTOMER COMPANY
    public static GetListViewCustCompanyLegalDocByCustCompanyId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/GetListViewCustCompanyLegalDocByCustCompanyId";
    public static DeleteCustCompanyLegalDoc = this.environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/DeleteCustCompanyLegalDoc";
    public static AddCustCompanyLegalDoc = this.environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/AddCustCompanyLegalDoc";
    public static EditCustCompanyLegalDoc = this.environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/EditCustCompanyLegalDoc";

    // CUSTOMER GROUP
    public static AddCustGrpBothWays = this.environment.FoundationR3Url + "/v1" + "/CustGrp/AddCustGrpBothWays";
    public static AddCustGrp = this.environment.FoundationR3Url + "/v1" + "/CustGrp/AddCustGrp";
    public static EditCustGrp = this.environment.FoundationR3Url + "/v1" + "/CustGrp/EditCustGrp";
    public static DeleteCustGrp = this.environment.FoundationR3Url + "/v1" + "/CustGrp/DeleteCustGrp";

    // CUSTOMER FIN DATA
    public static GetCBAForCustFinDataByCustId = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCBAForCustFinDataByCustId";
    public static AddCBAForCustFinData = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/AddCBAForCustFinData";
    public static EditCBAForCustFinData = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/EditCBAForCustFinData";
    public static GetCustBankAccByCustBankAccId = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCustBankAccByCustBankAccId";
    public static GetCBAForCustFinDataEditModeByCustBankAccId = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCBAForCustFinDataEditModeByCustBankAccId";
    public static GetCustBankAccByCustBankAccIdWithRefBank = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCustBankAccByCustBankAccIdWithRefBank";
    public static AddCustBankAcc = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/AddCustBankAcc";
    public static GetCustPersonalFinDataByCustPersonalId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetCustPersonalFinDataByCustPersonalId";
    public static GetListCustPersonalFinDataByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetListCustPersonalFinDataByCustId";
    public static GetCustCompanyFinDataByCustCompanyId = this.environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/GetCustCompanyFinDataByCustCompanyId";
    public static GetListCustCompanyFinDataByCustId = this.environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/GetListCustCompanyFinDataByCustId";
    public static AddCustCompanyFinData = this.environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/AddCustCompanyFinData";
    public static EditCustCompanyFinData = this.environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/EditCustCompanyFinData";
    public static DeleteCustCompanyFinData =  this.environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/DeleteCustCompanyFinData";
    public static AddCustPersonalFinData = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/AddCustPersonalFinData";
    public static EditCustPersonalFinData = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/EditCustPersonalFinData";
    public static DeleteCustPersonalFinData = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/DeleteCustPersonalFinData";
    public static GetCustPersonalFinDataForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetCustPersonalFinDataForCustViewByCustId";
    public static GetListCustPersonalFinDataForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetListCustPersonalFinDataForCustViewByCustId";
    public static EditCustBankAcc = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/EditCustBankAcc";
    public static DeleteCustBankAccAndStmnt = this.environment.FoundationR3Url + "/v1" + "/CustBankAcc/DeleteCustBankAccAndStmnt";

    // CUSTOMER ADDRESS
    public static GetListCustAddr = this.environment.FoundationR3Url + "/v1" + "/CustAddr/GetListCustAddr";
    public static AddCustAddr = this.environment.FoundationR3Url + "/v1" + "/CustAddr/AddCustAddr";
    public static EditCustAddr = this.environment.FoundationR3Url + "/v1" + "/CustAddr/EditCustAddr";
    public static GetCustAddr = this.environment.FoundationR3Url + "/v1" + "/CustAddr/GetCustAddrByCustAddrId";
    public static GetListCustAddrByCustId = this.environment.FoundationR3Url + "/v1" + "/CustAddr/GetListCustAddrByCustId";
    public static GetListCustAddrByCustIdForCustomerPersonalView = this.environment.FoundationR3Url + "/v1" + "/CustAddr/GetListCustAddrByCustIdForCustomerPersonalView";
    public static GetCustAddrLegalAddrByCustId = this.environment.FoundationR3Url + "/v1" + "/CustAddr/GetCustAddrLegalAddrByCustId"
    public static GetCustAddrByMrCustAddrType = this.environment.FoundationR3Url + "/v1" + "/CustAddr/GetCustAddrByMrCustAddrType"
    public static DeleteCustAddr = "/CustAddr/DeleteCustAddr"

    // CUSTOMER ADDRESS HISTORY
    public static GetListCustAddrHistByCustId = this.environment.FoundationR3Url + "/v1" + "/CustAddrHist/GetListCustAddrHistByCustId";
    public static GetListCustAddrHistByCustIdForCustomerPersonalView = this.environment.FoundationR3Url + "/v1" + "/CustAddrHist/GetListCustAddrHistByCustIdForCustomerPersonalView";

    // CUSTOMER JOB DATA
    public static AddCustPersonalJobData = this.environment.FoundationR3Url + "/v1" + "/CustPersonalJobData/AddCustPersonalJobData";
    public static EditCustPersonalJobData = this.environment.FoundationR3Url + "/v1" + "/CustPersonalJobData/EditCustPersonalJobData";
    public static GetCustPersonalJobDataByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalJobData/GetCustPersonalJobDataByCustId";

    // CUSTOMER COMPANY LEGAL DOC
    public static GetCustCompanyLegalDocForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/GetCustCompanyLegalDocForCustViewByCustId";

    // CUSTOMER COMPANY 
    public static GetCustCompanyByCustId = this.environment.FoundationR3Url + "/v1" + "/CustCompany/GetCustCompanyByCustId"
    public static EditCustCompany = this.environment.FoundationR3Url + "/v1" + "/CustCompany/EditCustCompany"

    // CUSTOMER COMPANY CONTACT PERSON
    public static AddCustCompanyContactPerson = this.environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/AddCustCompanyContactPerson"
    public static GetCustCompanyContactPersonByCustCompanyContactPersonId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/GetCustCompanyContactPersonByCustCompanyContactPersonId"
    public static GetCustCompanyContactPersonByCustCompanyId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/GetCustCompanyContactPersonByCustCompanyId"
    public static EditCustCompanyContactPersonByCustCompanyId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/EditCustCompanyContactPersonByCustCompanyId"

    // CUSTOMER COMPANY MANAGEMENT SHAREHOLDER
    public static GetCustCompanyMgmntShrholderForCustViewByCustId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderForCustViewByCustId";
    public static AddCustCompanyMgmntShrholder = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholder";
    public static AddCustCompanyMgmntShrholderPersonal = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderPersonal";
    public static AddCustCompanyMgmntShrholderCompany = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderCompany";
    public static EditCustCompanyMgmntShrholder = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/EditCustCompanyMgmntShrholder";
    public static DeleteCustCompanyMgmntShrholder = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/DeleteCustCompanyMgmntShrholder";
    public static GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId";
    public static GetListCustCompanyMgmntShrholderByCustId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetListCustCompanyMgmntShrholderByCustId";
    public static GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId";
    public static AddCustCompanyMgmntShrholderPublic = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderPublic";
    public static EditCustCompanyMgmntShrholderPublic = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/EditCustCompanyMgmntShrholderPublic";
    public static GetListManagementShareholderForListPagingByCustId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetListManagementShareholderForListPagingByCustId";
    public static GetCustCompanyMgmntShrholderByCustIdAndShrholderId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderByCustIdAndShrholderId";
    public static GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId = this.environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId";

    // CUST ATTR CONTENT
    public static GetCustAttrContentForCustViewByCustId = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetCustAttrContentForCustViewByCustId";
    public static AddEditListCustAttrContent = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/AddEditListCustAttrContent";
    public static GetListCustAttrContentByCustIdForCust = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdForCust";
    public static GetListCustAttrContentByCustIdAndAttrGroup = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdAndAttrGroup";
    public static GetListCustAttrContentByCustIdAndListAttrGroups = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdAndListAttrGroups";
    public static GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes";
    public static GetRuleForAttrContent = this.environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetRuleForAttrContent";

    //CUST CONTACT PERSON
    public static GetCustCompanyContactPersonForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/GetCustCompanyContactPersonForCustViewByCustId";
    public static GetListCustPersonalContactPersonForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetListCustPersonalContactPersonForCustViewByCustId";

    // CUST GROUP
    public static GetListCustGrpForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpForCustViewByCustId";
    public static GetListCustGrpForCustViewByMemberCustId = this.environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpForCustViewByMemberCustId";
    public static GetListCustGrpForCustViewById = this.environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpForCustViewById"

    // NEGATIVE CUSTOMER
    public static AddNegativeCustomer = this.environment.FoundationR3Url + "/v1" + "/NegativeCust/AddNegativeCust";
    public static EditNegativeCustomer = this.environment.FoundationR3Url + "/v1" + "/NegativeCust/EditNegativeCust";
    public static EditDuplicateNegativeCust = this.environment.FoundationR3Url + "/v1" + "/NegativeCust/EditDuplicateNegativeCust";
    public static EditDuplicateNegativeCustV2 = this.environment.FoundationR3Url + "/v2" + "/NegativeCust/EditDuplicateNegativeCust";
    public static GetNegativeCustByNegativeCustId = this.environment.FoundationR3Url + "/v1" + "/NegativeCust/GetNegativeCustByNegativeCustId";
    public static AddNegativeCustChangeTrx = this.environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/AddNegativeCustChangeTrx";
    public static EditNegativeCustChangeTrx = this.environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/EditNegativeCustChangeTrx";
    public static GetNegativeCustChangeTrxByNegativeCustId = this.environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/GetNegativeCustChangeTrxByNegativeCustId";
    public static GetListNegativeCustChangeTrxByNegativeCustId = this.environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/GetListNegativeCustChangeTrxByNegativeCustId";
    public static GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType = this.environment.FoundationR3Url + "/v2" + "/NegativeCust/GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType";
    public static GetNegativeCustByNegativeCustNameAndCustType = this.environment.FoundationR3Url + "/v1" + "/NegativeCust/GetNegativeCustByNegativeCustNameAndCustType";

    // CUSTOMER OTHER INFO
    public static AddCustOtherInfo = this.environment.FoundationR3Url + "/v1" + "/CustOtherInfo/AddCustOtherInfo";
    public static EditCustOtherInfo = this.environment.FoundationR3Url + "/v1" + "/CustOtherInfo/EditCustOtherInfo";
    public static GetCustOtherInfoByCustId = this.environment.FoundationR3Url + "/v1" + "/CustOtherInfo/GetCustOtherInfoByCustId";

    //Custsomer Personal Contact Person
    public static AddNewCustPersonalContactPerson = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/AddCustPersonalContactPerson"
    public static GetListCustPersonalContactPersonByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetListCustPersonalContactPersonByCustId"
    public static DeleteCustPersonalContactPerson = "/CustPersonalContactPerson/DeleteCustPersonalContactPerson"
    public static EditCustPersonalContactPerson = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/EditCustPersonalContactPerson"
    public static GetCustPersonalContactPersonByCustPersonalContactPersonId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetCustPersonalContactPersonByCustPersonalContactPersonId"
    public static AddCustPersonalEmergencyContact = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/AddCustPersonalEmergencyContact";
    public static EditCustPersonalEmergencyContact = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/EditCustPersonalEmergencyContact";
    public static GetCustPersonalEmergencyContactByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetCustPersonalEmergencyContactByCustId";
    public static AddCustPersonalFamily = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/AddCustPersonalFamily";
    public static EditCustPersonalFamily = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/EditCustPersonalFamily";
    public static DeleteCustPersonalFamily = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/DeleteCustPersonalFamily";
    public static GetCustPersonalFamilyByCustPersonalFamilyId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/GetCustPersonalFamilyByCustPersonalFamilyId";
    public static GetMainCustAndListCustPersonalFamilyByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/GetMainCustAndListCustPersonalFamilyByCustId";
    public static GetListCustPersonalEmergencyContactByCustId = this.environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetListCustPersonalEmergencyContactByCustId";

    // SURVEY TASK
    public static GetListSrvyTaskBySrvyOrderId = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListSrvyTaskBySrvyOrderId";
    public static GetListSrvyTaskBySrvyOrderIdForUpdate = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListSrvyTaskBySrvyOrderIdForUpdate";
    public static AddSrvyTask = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/AddSrvyTask";
    public static EditSrvyTask = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/EditSurveyTask";
    public static EditSrvyTaskAndSendToMobile = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/EditSurveyTaskAndSendToMobile";
    public static DeleteSrvyTask = "/SrvyTask/DeleteSrvyTask";
    public static GetSrvyTaskBySrvyTaskId = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetSrvyTaskBySrvyTaskId";
    public static CancelSurveyTaskBySurveyTaskId = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/CancelSurveyTaskBySurveyTaskId";
    public static GetSurveyorNameBySurveyorId = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetSurveyorNameBySurveyorId";
    public static GetListSrvyTaskBySrvyOrderIdForView = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListSrvyTaskBySrvyOrderIdForView";
    public static GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview";
    public static ReviewSurveyResult = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/ReviewSurveyResult";
    public static GetHtmlCodeFromMobile = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/GetHtmlCodeFromMobile";
    public static UpdateSrvyTaskAndAddVerfResultH = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/UpdateSrvyTaskAndAddVerfResultH";
    public static UpdateSrvyTaskAndEditVerfResultH = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/UpdateSrvyTaskAndEditVerfResultH";
    public static UpdateMrSurveyTaskStatCode = this.environment.FoundationR3Url + "/v1" + "/SrvyTask/UpdateMrSurveyTaskStatCode";
   
    // SURVEY ORDER
    public static GetSrvyOrderBySrvyOrderId = this.environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetSrvyOrderBySrvyOrderId";
    public static GetSrvyOrderByTrxRefNo = this.environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetSrvyOrderByTrxRefNo";
    public static GetListSryvObject = this.environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetListSryvObject";
    public static SendSrvyOrder = this.environment.FoundationR3Url + "/v1" + "/SrvyOrder/SendSrvyOrder";
    public static GetSrvyOrderDataBySrvyOrderId = this.environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetSrvyOrderDataBySrvyOrderId";

    // SURVEY FORM SCHM
    public static GetListAllSrvyFormSchm = this.environment.FoundationR3Url + "/v1" + "/SrvyFormSchm/GetListAllSrvyFormSchm";
    public static GetSrvyFormSchmBySrvyFormSchmId = this.environment.FoundationR3Url + "/v1" + "/SrvyFormSchm/GetSrvyFormSchmBySrvyFormSchmId";
    public static GetListKeyValueSrvyFormSchm = this.environment.FoundationR3Url + "/v1" + "/SrvyFormSchm/GetListKeyValueSrvyFormSchm";

    // REF FORM
    public static EditRefFormData = this.environment.FoundationR3Url + "/v1" + "/RefForm/EditRefForm";
    public static AddRefFormData = this.environment.FoundationR3Url + "/v1" + "/RefForm/AddRefForm";
    public static GetRefFormDataByRefFormId = this.environment.FoundationR3Url + "/v1" + "/RefForm/GetRefFormByRefFormId"
    public static GetTemplateIcon = this.environment.FoundationR3Url + "/v1" + "/RefForm/GetTemplateIcon";
    public static DeleteRefFormData = this.environment.FoundationR3Url + "/v1" + "/RefForm/DeleteRefForm";

    // AUTH FORM
    public static AddListAuthForm = this.environment.FoundationR3Url + "/v1" + "/AuthForm/AddListAuthForm";
    public static GetListAuthFormByRefFormId = this.environment.FoundationR3Url + "/v1" + "/AuthForm/GetListAuthFormByRefFormId";
    public static DeleteAuthForm = this.environment.FoundationR3Url + "/v1" + "/AuthForm/DeleteAuthForm";
    public static GetListAuthFormByRefRoleId = this.environment.FoundationR3Url + "/v1" + "/AuthForm/GetListAuthFormByRefRoleId";

    // Workflow Engine
    public static ClaimTask = this.environment.FoundationR3Url + "/v1" + "/Workflow/ClaimTask";
    public static ClaimTaskV2 = this.environment.FoundationR3Url + "/v2" + "/Workflow/ClaimTask";
    public static GetAllTaskWorkflow = this.environment.FoundationR3Url + "/v2" + "/Workflow/GetAllTaskWorkflow";
    public static GetSingleTaskWorkflow = this.environment.FoundationR3Url + "/v2" + "/Workflow/GetSingleTask";

    //SCORE CATEGORY SCHM H
    public static GetScoreCategorySchmHById = this.environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/GetScoreCategorySchmHById";
    public static AddScoreCategorySchmH = this.environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/AddScoreCategorySchmH";
    public static EditScoreCategorySchmH = this.environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/EditScoreCategorySchmH";
    public static GetRefScoreCategoryTypeWithDetailById = this.environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/GetScoreCategorySchmHWithDetailById";

    // REF SCORE CATEGORY
    public static AddRangeScoreCategorySchmD = this.environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmD/AddRangeScoreCategorySchmD";

    // Authentication
    public static RequestNewPassword = this.environment.FoundationR3Url + "/v1" + "/Authenticate/RequestNewPassword";

    // INTEGRATION
    public static SendMasterDailyToRabbitMq = this.environment.FoundationR3Url + "/v1" + "/Integration/SendMasterDailyToRabbitMq";

    // UPDATE MASTER CUST
    public static GetCustDataForUpdateMasterCustDetail = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustDataForUpdateMasterCustDetail";
    public static GetCustAddrDataForUpdateMasterCustAddr = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustAddrDataForUpdateMasterCustAddr";
    public static GetCustFamilyDataForUpdateMasterCustFamily = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustFamilyDataForUpdateMasterCustFamily";
    public static GetCustEmergencyDataForUpdateMasterCustEmergency = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustEmergencyDataForUpdateMasterCustEmergency";
    public static GetCustJobDataForUpdateMasterCustJobData = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustJobDataForUpdateMasterCustJobData";
    public static GetCustFinDataForUpdateMasterCustFinData = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustFinDataForUpdateMasterCustFinData";
    public static GetCustCompanyDataForUpdateMasterCustCompany = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustCompanyDataForUpdateMasterCustCompany";
    public static GetShareholderForUpdateMasterCustCompanyShareholder = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetShareholderForUpdateMasterCustCompanyShareholder";
    public static GetContactInfoForUpdateMasterCustCompanyContactInfo = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetContactInfoForUpdateMasterCustCompanyContactInfo";
    public static GetFinDataForUpdateMasterCustCompanyFinData = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetFinDataForUpdateMasterCustCompanyFinData";
    public static GetLegalDocForUpdateMasterCustCompanyLegalDoc = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetLegalDocForUpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustomer = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustomer";
    public static UpdateMasterCustAddr = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustAddr";
    public static UpdateMasterCustFamily = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustFamily";
    public static UpdateMasterCustEmergency = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustEmergency";
    public static UpdateMasterCustJobData = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustJobData";
    public static UpdateMasterCustFinData = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustFinData";
    public static UpdateMasterCustFinDataV2 = this.environment.FoundationR3Url + "/v2" + "/UpdateMasterCust/UpdateMasterCustFinData";
    public static UpdateMasterCustCompanyDetail = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyDetail";
    public static UpdateMasterCustCompanyShareholder = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyShareholder";
    public static UpdateMasterCustCompanyLegalDoc = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustCompanyLegalDocv2 = this.environment.FoundationR3Url + "/v2" + "/UpdateMasterCust/UpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustCompanyContactInfo = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyContactInfo";
    public static UpdateMasterCustCompanyFinData = this.environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyFinData";

    //Application Source
    public static AddRefAppSrc = this.environment.FoundationR3Url + "/v1" + "/RefAppSrc/AddRefAppSrc";
    public static AddRefAppSrcOfficeMbr = this.environment.FoundationR3Url + "/v1" + "/RefAppSrc/AddRefAppSrcOfficeMbr";
    public static DeleteRefAppSrcOfficeMbr = this.environment.FoundationR3Url + "/v1" + "/RefAppSrc/DeleteRefAppSrcOfficeMbr";
    public static EditRefAppSrc = this.environment.FoundationR3Url + "/v1" + "/RefAppSrc/EditRefAppSrc";
    public static GetRefAppSrcByRefAppSrcId = this.environment.FoundationR3Url + "/v1" + "/RefAppSrc/GetRefAppSrcByRefAppSrcId";
    public static GetListRefAppSrcOfficeMbrByRefAppSrcId = this.environment.FoundationR3Url + "/v1" + "/RefAppSrc/GetListRefAppSrcOfficeMbrByRefAppSrcId"

    // List Approver
    public static GetApprovedBy = this.environment.ApprovalURL + "/api/RFAWeb/GetApprovedBy/";
    public static GetRecommendations = this.environment.ApprovalURL + "/api/RFAWeb/GetRecommendations/";

    // New Approval R3
    public static CreateNewRFA = "/Approval/CreateNewRFA";
    public static CreateJumpRFA = "/Approval/CreateJumpRFA";
    public static GetRefSingleCategoryByCategoryCode = "/Approval/GetRefSingleCategoryByCategoryCode";
    public static GetSchemesBySchemeCode = "/Approval/GetSchemesBySchemeCode";
    public static GetRefAdtQuestion = "/Approval/GetRefAdtQuestion";
    public static GetPossibleMemberAndAttributeExType = "/Approval/GetPossibleMemberAndAttributeExType";
    public static GetApprovalReturnHistory = "/Approval/GetApprovalReturnHistory";
    public static GetSchemesByCategoryId = "/Approval/GetSchemesByCategoryId";
    public static SubmitApproval = "/v1" + "/Approval/SubmitApproval";
    public static GetLevelVoting = "/Approval/GetLevelVoting";
    public static GetPossibleResult = "/Approval/GetPossibleResult";
    public static GetNextNodeMember = "/Approval/GetNextNodeMember";
    public static GetRefReasonActive = "/Approval/GetRefReasonActive";
    public static GetCanChangeMinFinalLevel = "/Approval/GetCanChangeMinFinalLevel";
    public static GetTaskHistory = "/Approval/GetTaskHistory";
    public static ReturnLevel = "/Approval/ReturnLevel";
    public static ContinueToLevel = "/Approval/ContinueToLevel";

    // Payment Allocation
    public static GetListKeyValueRefPaymentAllocActive = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/GetListKeyValueRefPaymentAllocActive";
    public static GetRefPaymentAllocByID = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/GetRefPaymentAllocById";
    public static GetListKeyValueRefPaymentAllocByPayAllocGrpCode = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/GetListKeyValueRefPaymentAllocByPayAllocGrpCode";
    public static SubmitRefPaymentAlloc = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/SubmitRefPaymentAlloc";
    public static GetRefPaymentAllocAttrByRefPaymentAllocId = this.environment.FoundationR3Url + urlConstant.GetRefPaymentAllocAttrByRefPaymentAllocId;

    // REF PAYMENT ALLOC GRP
    public static GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAllocGrp/GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate";
    public static AddRefPaymentAllocGrp = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAllocGrp/AddRefPaymentAllocGrp";
    public static EditRefPaymentAllocGrp = this.environment.FoundationR3Url + "/v1" + "/RefPaymentAllocGrp/EditRefPaymentAllocGrp";

    // COA
    public static GetRefCoaByRefCoaId = this.environment.FoundationR3Url + "/v1"+ "/Coa/GetRefCoaByRefCoaId";
    public static SubmitCoa = this.environment.FoundationR3Url +"/v1"+  "/Coa/SubmitCoa";
    public static SubmitListCoa = this.environment.FoundationR3Url +"/v1"+  "/Coa/SubmitListCoa";
    public static GetListRefCoaByCoaSchmId = this.environment.FoundationR3Url + "/v1"+ "/Coa/GetListRefCoaByCoaSchmId";
    public static GetListRefCoaByCoaSchmIdV2 = this.environment.FoundationR3Url + "/v2"+ "/Coa/GetListRefCoaByCoaSchmId";

    // COA Scheme
    public static GetCoaSchmByCoaSchmId = this.environment.FoundationR3Url + "/v1" + "/CoaSchm/GetCoaSchmByCoaSchmId";
    public static SubmitCoaSchm = this.environment.FoundationR3Url + "/v1" + "/CoaSchm/SubmitCoaSchm";
    public static GetListCoaSchm = this.environment.FoundationR3Url + "/v1" + "/CoaSchm/GetListCoaSchm";


    // View Cabinet, Rack, FIling
    public static GetListRackByCabinetCode = this.environment.FoundationR3Url + "/v1" + "/ViewDocument/GetListRackByCabinetCode";
    public static GetCabinetByCabinetCode = this.environment.FoundationR3Url + "/v1" + "/ViewDocument/GetCabinetByCabinetCode";

    public static GetListFilingByRackCodeAndCabinetCode = this.environment.FoundationR3Url + "/v1" + "/ViewDocument/GetListFilingByRackCodeAndCabinetCode";
    public static GetRackByRackCode = this.environment.FoundationR3Url + "/v1" + "/ViewDocument/GetRackByRackCode";

    public static GetRackAndListFilingByRackCodeAndCabinetCode = this.environment.FoundationR3Url + "/v1" + "/DocManagement/GetRackAndListFilingByRackCodeAndCabinetCode";
    public static GetRackAndListFilingByFilingCodeAndRackId = this.environment.FoundationR3Url + "/v1" + "/DocManagement/GetRackAndListFilingByFilingCodeAndRackId";
    public static GetCabinetAndListRackByCabinetCode = this.environment.FoundationR3Url + "/v1" + "/DocManagement/GetCabinetAndListRackByCabinetCode";
    public static GetRackByCode = this.environment.FoundationR3Url + "/v1" + "/DocManagement/GetRackByCode";
    public static GetCabinetByCode = this.environment.FoundationR3Url + "/v1" + "/DocManagement/GetCabinetByCode";
    public static AddCabinet = this.environment.FoundationR3Url + "/v1" + "/DocManagement/AddCabinet";
    public static EditCabinet = this.environment.FoundationR3Url + "/v1" + "/DocManagement/EditCabinet";
    public static AddFiling = this.environment.FoundationR3Url + "/v1" + "/DocManagement/AddFiling";
    public static EditFiling = this.environment.FoundationR3Url + "/v1" + "/DocManagement/EditFiling";
    public static AddRack = this.environment.FoundationR3Url + "/v1" + "/DocManagement/AddRack";
    public static EditRack = this.environment.FoundationR3Url + "/v1" + "/DocManagement/EditRack";
    public static GetCabinetAndRackByRackCodeAndCabinetId = this.environment.FoundationR3Url + "/v1" + "/DocManagement/GetCabinetAndRackByRackCodeAndCabinetId";

    //Auction Company
    public static AddAuctionCompany = this.environment.FoundationR3Url + "/v1" + "/AuctionCompany/AddAuctionCompany";
    public static EditAuctionCompany = this.environment.FoundationR3Url + "/v1" + "/AuctionCompany/EditAuctionCompany";
    public static GetVendorByIdForEdit = this.environment.FoundationR3Url + "/v1" + "/AuctionCompany/GetVendorByIdForEdit";

    // Cust Exposure
    public static GetCustExpsrInfoByCustId = this.environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/GetCustExpsrInfoByCustId";
    public static RequestExposure = this.environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/RequestExposure";
    public static RequestExposureV2 = this.environment.FoundationR3Url + "/v2" + "/CustExpsrInfo/RequestExposure";
    public static GetListCustExpsrBucketByCustExpsrDId = this.environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/GetListCustExpsrBucketByCustExpsrDId";
    public static GetListCustExpsrAppAgrHistByCustExpsrHId = this.environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/GetListCustExpsrAppAgrHistByCustExpsrHId";

    //OTP
    public static SendOtp = this.environment.FoundationR3Url + "/v1" + "/Authenticate/SendOtp";
    public static ConfirmOtp = this.environment.FoundationR3Url + "/v1" + "/Authenticate/ConfirmOtp";
    public static GetOtpProperties = this.environment.FoundationR3Url + "/v1" + "/Authenticate/GetOtpProperties";

    // OFFICE BANK ACCOUNT
    public static DeleteOfficeBankAcc = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/DeleteOfficeBankAcc";
    public static GetListActiveBankName = this.environment.FoundationR3Url + "/v1" + "/RefBank/GetListKeyValueActiveById";
    public static GetListBankAccType = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/GetListBankAccType";
    public static GetListKeyValueActiveOfficeBankAcc = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/GetListKeyValueActiveOfficeBankAcc";
    public static GetOfficeBankAccByOfficeBankAccId = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/GetOfficeBankAccByOfficeBankAccId";
    public static SubmitOfficeBankAcc = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/SubmitOfficeBankAcc";
    public static AddOfficeBankAcc = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/AddOfficeBankAcc";
    public static EditOfficeBankAcc = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/EditOfficeBankAcc";
    public static EditDetailOfficeBankAcc = this.environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/EditDetailOfficeBankAcc";

    //SYS CONFIG
    public static GetSysConfigPncplResultByCode = this.environment.FoundationR3Url + "/v1" + "/SysConfigResult/GetSysConfigPncplResultByCode";
    public static GetSysCtrlCoyBySysKey = this.environment.FoundationR3Url + "/v1" + "/SysCtrlCoy/GetSysCtrlCoyByKey"

    // JOURNAL
    public static RerunJournal = this.environment.FoundationR3Url + "/v1" + "/Journal/RerunJournal";
    public static DownloadJournalFile = this.environment.FoundationR3Url + "/v1" + "/Journal/DownloadJournalFile";
    public static GetJrSourceFileByJrSourceFileId = this.environment.FoundationR3Url + "/v1"+ "/Journal/GetJrSourceFileByJrSourceFileId";
    public static GetJrMHeaderAndJrMGroupByJrMHeaderId = this.environment.FoundationR3Url + "/v1" +"/Journal/GetJrMHeaderAndJrMGroupByJrMHeaderId";
    public static SaveJrMGroup = this.environment.FoundationR3Url +"/v1" + "/Journal/SaveJrMGroup";
    public static GetJrMGroupAndJrMGroupDFactByJrMGroupId = this.environment.FoundationR3Url + "/v1" + "/Journal/GetJrMGroupAndJrMGroupDFactByJrMGroupId";
    public static SaveJrMGroupDFact = this.environment.FoundationR3Url +"/v1"+"/Journal/SaveJrMGroupDFact";
    public static GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId = this.environment.FoundationR3Url +"/v1" +"/Journal/GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId";
    public static SaveJrMHeaderFact = this.environment.FoundationR3Url +"/v1"+"/Journal/SaveJrMHeaderFact";
    public static GetJrMGroupAndJrMItemValueByJrMGroupId = this.environment.FoundationR3Url +"/v1" +"/Journal/GetJrMGroupAndJrMItemValueByJrMGroupId"
    public static SaveJrMItemValue = this.environment.FoundationR3Url +"/v1" +"/Journal/SaveJrMItemValue";
    public static SaveJrMEntity = this.environment.FoundationR3Url +"/v1"+"/Journal/SaveJrMEntity";
    public static AddJrMHeader = this.environment.FoundationR3Url +"/v1"+"/Journal/AddJrMHeader";
    public static GetJournalResultByJrMsgHId = this.environment.FoundationR3Url +"/v1"+"/Journal/GetJournalResultByJrMsgHId";
    public static UploadJournalFile = this.environment.FoundationR3Url +"/v1" +"/Journal/UploadJournalFile";

    // Industry Type Category
    public static AddEditIndustryTypeCategory = this.environment.FoundationR3Url + "/v1" + "/IndustryTypeCategory/AddEditIndustryTypeCategory";
    public static GetIndustryTypeCategoryByIndustryTypeCategoryId = this.environment.FoundationR3Url + "/v1" + "/IndustryTypeCategory/GetIndustryTypeCategoryByIndustryTypeCategoryId";

    // Sector Economy Slik
    public static GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId = this.environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlik/GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId"

    // CUST FIN DATA ATTR CONTENT
    public static GetListCustFinDataAttrContentByCustIdAndListAttrGroup = this.environment.FoundationR3Url + "/v1" + "/CustFinDataAttrContent/GetListCustFinDataAttrContentByCustIdAndListAttrGroup";
    public static AddCustFinDataAttrContent = this.environment.FoundationR3Url + "/v1" + "/CustFinDataAttrContent/AddCustFinDataAttrContent";
    public static GetCustFinDataAttrContentForCustViewByCustId = this.environment.FoundationR3Url + "/v1" + "/CustFinDataAttrContent/GetCustFinDataAttrContentForCustViewByCustId";


    // LICENSE
    public static UploadLicense = this.environment.FoundationR3Url + "/v1" + "/License/UploadLicense";
    public static GetLicenses = this.environment.FoundationR3Url + "/v1" + "/License/GetLicenses";
    public static RetrieveLicenseDetail = this.environment.FoundationR3Url + "/v1" + "/License/RetrieveLicenseDetail";

    // LIST IFRAME VIEW
    public static GetCustListIframeView = this.environment.FoundationR3Url + "/v1" + "/Cust/GetCustListIframeView";

    //REF STATUS
    public static GetListActiveRefStatusByStatusGrpCode = this.environment.FoundationR3Url + "/v1" + "/RefStatus/GetListKeyValueActiveGrpCodeByCode";
    // MASTER SEQUENCE
    public static GenerateTransactionNoFromRedis = this.environment.FoundationR3Url + "/v1" + "/MasterSequence/GenerateTransactionNoFromRedis";

    // THIRD PARTY RSLT
    public static GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode = this.environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode";
    public static GetThirdPartyTrustsocRsltByThirdPartyRsltHId = this.environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/GetThirdPartyTrustsocRsltByThirdPartyRsltHId";
    public static UploadConsentTrustingSocial = this.environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/UploadConsentTrustingSocial";
    public static UploadConsentTrustingSocialV2 = this.environment.FoundationR3Url + "/v2" + "/ThirdPartyRslt/UploadConsentTrustingSocial";
    public static UploadConsentTrustingSocialV21 = this.environment.FoundationR3Url + "/v2.1" + "/ThirdPartyRslt/UploadConsentTrustingSocial";
    public static GetListThirdPartyTrustingSocialByTrxNo = this.environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/GetListThirdPartyTrustingSocialByTrxNo";
    public static SaveCustDocFile = this.environment.FoundationR3Url + "/v2" + "/Cust/SaveCustDocFile";
    public static SaveCustDocFile21 = this.environment.FoundationR3Url + "/v2.1" + "/Cust/SaveCustDocFile";

    //DIGITALIZATION
    public static AddTrxSrcDataForTrustingSocial = this.environment.FoundationR3Url + "/v1" + "/Digitalization/AddTrxSrcDataForTrustingSocial";
    public static AddTrxSrcDataForTrustingSocialV2 = this.environment.FoundationR3Url + "/v2" + "/Digitalization/AddTrxSrcDataForTrustingSocial";
    public static AddTrxSrcDataForPefindo = this.environment.FoundationR3Url + "/v1" + "/Digitalization/AddTrxSrcDataForPefindo";
    public static AddTrxSrcDataForPefindoV2 = this.environment.FoundationR3Url + "/v2" + "/Digitalization/AddTrxSrcDataForPefindo";
    public static AddTrxSrcDataForPefindoMultiResult = this.environment.FoundationR3Url + "/v1" + "/Digitalization/AddTrxSrcDataForPefindoMultiResult";
    public static AddTrxSrcDataForPefindoMultiResultV2 = this.environment.FoundationR3Url + "/v2" + "/Digitalization/AddTrxSrcDataForPefindoMultiResult";
    public static GetPefindoMultiResultByGroupTrxNo = this.environment.FoundationR3Url + "/v1" + "/Digitalization/GetPefindoMultiResultByThirdPartyRsltGroupNo";
    public static AddTrxScrDataForAsliRi = this.environment.FoundationR3Url + "/v1" + "/IntegratorAsliRi/AddTrxSrcDataForAsliRi";
    public static GetTrxSrcDataForAsliRi = this.environment.FoundationR3Url + "/v1" + "/IntegratorAsliRi/GetTrxResultDataForAsliRi";

    //PEFINDO
    public static GetViewMOSummary = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewMOSummary";
    public static GetViewPefindoScore = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewPefindoScore";
    public static GetViewSubjectInfoPersonal = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSubjectInfoPersonal";
    public static GetViewSubjectInfoCompany = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSubjectInfoCompany";
    public static GetViewSubjectInfoAllHistory = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSubjectInfoAllHistory";
    public static GetViewContracts = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewContracts";
    public static GetViewPefindoAlertQuest = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewPefindoAlertQuest";
    public static GetViewSecurities = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSecurities";
    public static GetViewOtherLiabilities = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewOtherLiabilities";
    public static GetViewInvolvements = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewInvolvements";
    public static GetViewRelations = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewRelations";
    public static GetViewInquiries = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewInquiries";
    public static GetViewDisputes = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewDisputes";
    public static GetViewFinancialStatements = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewFinancialStatements";
    public static PefindoSmartSearch = this.environment.FoundationR3Url + "/v1" + "/Pefindo/PefindoSmartSearch";
    public static PefindoSmartSearchV2 = this.environment.FoundationR3Url + "/v2" + "/Pefindo/PefindoSmartSearch";
    public static GetPefindoContracts = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetPefindoContracts";
    public static GetPefindoTrxSrcData = this.environment.FoundationR3Url + "/v1" + "/Pefindo/GetPefindoTrxSrcData";

    // THINGS TO DO
  public static GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo = "ServiceTask/GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo";
  public static GetThingsToDoByRole = this.environment.FoundationR3Url + "/v1" + "/ThingsToDo/GetThingsToDoByRole";

  // CUST DOC FILE
  public static GetListCustDocFileByCustId = this.environment.FoundationR3Url + "/v1" + "/CustDocFile/GetListCustDocFileByCustId";

  // REF TC
  public static AddRefTc = this.environment.FoundationR3Url + "/v1" + "/RefTc/AddRefTc";
  public static EditRefTc = this.environment.FoundationR3Url + "/v1" + "/RefTc/EditRefTc";
  public static GetRefTcById = this.environment.FoundationR3Url + "/v1" + "/RefTc/GetRefTcById";

  public static GetCustCompanyLegalDocByCustCompanyLegalDocId = this.environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/GetCustCompanyLegalDocByCustCompanyLegalDocId";

  //SAVE THIRDPARTYTRXNO
  public static SaveCustThirdPartyTrxNo = this.environment.FoundationR3Url + "/v2" + "/Cust/SaveCustThirdPartyTrxNo";

  //Generate
  public static GenerateAPIKey = this.environment.FoundationR3Url + "/v1" + "/Authenticate/GenerateAPIKey";
  public static RevokeAPIKey = this.environment.FoundationR3Url + "/v1" + "/Authenticate/RevokeAPIKey";

  //REF TAX OFFICE
  public static AddRefTaxOffice = this.environment.FoundationR3Url + "/v1" + "/RefTaxOffice/AddRefTaxOffice";
  public static EditRefTaxOffice = this.environment.FoundationR3Url + "/v1" + "/RefTaxOffice/EditRefTaxOffice";
  public static DeleteRefTaxOffice = this.environment.FoundationR3Url + "/v1" + "/RefTaxOffice/DeleteRefTaxOffice";
  public static GetRefTaxOfficeDetailById = this.environment.FoundationR3Url + "/v1" + "/RefTaxOffice/GetRefTaxOfficeDetailById";
  public static GetListRefTaxOfficeActive = this.environment.FoundationR3Url + "/v1" + "/RefTaxOffice/GetListRefTaxOfficeActive";

   // ASSET INS CLAIM DOC
   public static AddRefInsClaimDoc = this.environment.FoundationR3Url + "/v1" + "/RefInsClaimDoc/AddRefInsClaimDoc"
   public static EditRefInsClaimDoc = this.environment.FoundationR3Url + "/v1" + "/RefInsClaimDoc/EditRefInsClaimDoc"
   public static GetRefInsClaimDocByRefInsClaimDocCode = this.environment.FoundationR3Url + "/v1" + "/RefInsClaimDoc/GetRefInsClaimDocByRefInsClaimDocCode"
}