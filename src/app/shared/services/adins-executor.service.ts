import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";
import { addEditvendorBranch, addEditvendorHO, addRangeOfficeMbr, addRangeVendorGrpMbr, addRangeVendorMbr, cancelHORegistration } from "../function/supplier-function";
import { redirectSubmitProject, downloadDmsDocument, addBouwheerCompany, addCustToDuplicate, addCustomerCompanyAfterDuplicate, addCustomerPersonalAfterDuplicate, addEditCustAddr, addEditCustAsset, addEditCustJobData, addEditCustomer, addEditCustomerV2, backCust, backFromCustDuplicate, editCustomerFamily, saveDataOrSaveAndSync, saveDataOrSaveAndSyncCompany, saveDataOrSaveAndSyncV2, saveDataOrSaveAndSyncCompanyV2, addBeneficiaryOwnerToDuplicate, exportToExcel, submitIntegrityCheckingNonGeneral } from "../function/customer-function";
import { addRangeAssetSchmD, saveFormAssetMasterChild, saveFormAssetMasterParent } from "../function/asset-function";
import { rerunJournal, saveJrMGroupDFact, saveJrMHeaderFact } from "../function/journal-function";
import { addListVerfSchemeD } from "../function/verification-function";
import { addListVerfQuestionGrpD } from "../function/verification-function";
import { addRefOfficeAreaMember } from "../function/office-area-function";
import { saveOfficeGroupMember } from "../function/ref-office-function";
import { saveListAuthForm } from "../function/role-function";
import { saveListAuthForm_Form } from "../function/form-function";
import { addHolidaySchmDUntilYear } from "../function/holiday-function";
import { ApprovalTaskService } from "./ApprovalTask.service";
import { callBackVendorPagingApproval } from "../function/approval-function";
import { addEditSurveyTaskResultDetail, endStepperSrvyTaskDetail } from "../function/survey-function";
import { addEditFundingCoy } from "../function/funding-function";
import { addeditAttributeMaster } from "../function/attribute-master-function";
import { submitCoa } from "../function/coa-scheme-function";
import { addEditCustCompanyLegalDoc,
  //  uploadDocFileLegalMultipart 
} from "../function/customer-function";
import { rejectUpload } from "../function/review-upload-function";
import { saveListMaskingItemForm } from "../function/masking-data-function";
import { ExcelService } from "../excel-service/excel-service";
import { HttpClient } from "@angular/common/http";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { addEditFundingCoyX } from "../function/funding-functionX";
import { addEditVendorBranchEmpX, addEditvendorBranchX, addEditvendorHOX, addEditEmployeeX, cancelHORegistrationX } from "app/impl/shared/function/supplier-function-x";
import { addEditEmployeeCNAF } from "app/selfcustom/shared/funtion/supplier-function-x";

@Injectable({
  providedIn: 'root'
})

export class AdInsExecutorService extends ExecutorService {
  constructor(private apvTaskService: ApprovalTaskService, private excelService: ExcelService) {
    super();
    this.setExecutor("downloadDmsDocument", downloadDmsDocument);
    this.setExecutor("addRangeVendorMbr", addRangeVendorMbr);
    this.setExecutor("addRangeVendorGrpMbr", addRangeVendorGrpMbr);
    this.setExecutor("addRangeOfficeMbr", addRangeOfficeMbr);
    this.setExecutor("addEditvendorHO", addEditvendorHO);
    this.setExecutor("addEditvendorHOX", addEditvendorHOX);
    this.setExecutor("addEditEmployeeX", addEditEmployeeX);
    this.setExecutor("addEditvendorBranch", addEditvendorBranch);
    this.setExecutor("addEditvendorBranchX", addEditvendorBranchX);
    this.setExecutor("cancelHORegistration", cancelHORegistration);
    this.setExecutor("cancelHORegistrationX", cancelHORegistrationX);
    this.setExecutor("addEditCustAsset", addEditCustAsset);
    this.setExecutor("addRangeAssetSchmD", addRangeAssetSchmD);
    this.setExecutor("addEditCustAddr", addEditCustAddr);
    this.setExecutor("addRefOfficeAreaMember",addRefOfficeAreaMember);
    this.setExecutor("saveDataOrSaveAndSync", saveDataOrSaveAndSync);
    this.setExecutor("saveDataOrSaveAndSyncCompany", saveDataOrSaveAndSyncCompany);
    this.setExecutor("saveDataOrSaveAndSyncCompanyV2", saveDataOrSaveAndSyncCompanyV2);
    this.setExecutor("saveDataOrSaveAndSyncV2", saveDataOrSaveAndSyncV2);
    this.setExecutor("addEditCustJobData", addEditCustJobData);
    this.setExecutor("editCustomerFamily", editCustomerFamily);
    this.setExecutor("addEditCustomer", addEditCustomer);
    this.setExecutor("addEditCustomerV2", addEditCustomerV2);
    this.setExecutor("addCustToDuplicate", addCustToDuplicate);
    this.setExecutor("rerunJournal", rerunJournal);
    this.setExecutor("addListVerfSchemeD", addListVerfSchemeD);
    this.setExecutor("addListVerfQuestionGrpD", addListVerfQuestionGrpD)
    this.setExecutor("backFromCustDuplicate", backFromCustDuplicate);
    this.setExecutor("addCustomerPersonalAfterDuplicate", addCustomerPersonalAfterDuplicate);
    this.setExecutor("addCustomerCompanyAfterDuplicate", addCustomerCompanyAfterDuplicate);
    this.setExecutor("backCust", backCust);
    this.setExecutor("saveOfficeGroupMember", saveOfficeGroupMember);
    this.setExecutor("saveListAuthForm", saveListAuthForm);
    this.setExecutor("saveListAuthForm_Form", saveListAuthForm_Form);
    this.setExecutor("addHolidaySchmDUntilYear", addHolidaySchmDUntilYear);
    this.setExecutor("callBackVendorPagingApproval", callBackVendorPagingApproval);
    this.setExecutor("saveJrMHeaderFact", saveJrMHeaderFact);
    this.setExecutor("endStepperSrvyTaskDetail", endStepperSrvyTaskDetail);
    this.setExecutor("addEditSurveyTaskResultDetail", addEditSurveyTaskResultDetail);
    this.setExecutor("saveJrMGroupDFact", saveJrMGroupDFact);
    this.setExecutor("addEditFundingCoy", addEditFundingCoy);
    this.setExecutor("addeditAttributeMaster", addeditAttributeMaster);
    this.setExecutor("submitCoa", submitCoa);
    this.setExecutor("addEditCustCompanyLegalDoc", addEditCustCompanyLegalDoc);
    // this.setExecutor("uploadDocFileLegalMultipart", uploadDocFileLegalMultipart);
    this.setExecutor("addBouwheerCompany", addBouwheerCompany);
    this.setExecutor("addBeneficiaryOwnerToDuplicate", addBeneficiaryOwnerToDuplicate);
    this.setExecutor("redirectSubmitProject", redirectSubmitProject);
    this.setExecutor("rejectUpload", rejectUpload);
    this.setExecutor("saveFormAssetMasterParent", saveFormAssetMasterParent);
    this.setExecutor("saveFormAssetMasterChild", saveFormAssetMasterChild);
    this.setExecutor("saveListMaskingItemForm", saveListMaskingItemForm);
    this.setExecutor("submitIntegrityCheckingNonGeneral", submitIntegrityCheckingNonGeneral);
    this.setExecutor("exportToExcel", this.exportToExcel.bind(this));
    this.setExecutor("addEditFundingCoyX", addEditFundingCoyX);
    this.setExecutor("addEditVendorBranchEmpX", addEditVendorBranchEmpX);
    this.setExecutor("addEditEmployeeCNAF", addEditEmployeeCNAF)
  }

  async exportToExcel(api: string,
    dicts: Record<string, any>,
    http: HttpClient,
    toastr: NGXToastrService) {
    await exportToExcel(api, dicts, http, toastr, this.excelService);
  }
}
