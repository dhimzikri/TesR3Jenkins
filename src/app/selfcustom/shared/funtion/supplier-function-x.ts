import { AdInsHelper } from "app/shared/AdInsHelper";
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { Router } from "@angular/router";
import { EmployeeAllObj } from 'app/shared/model/employee-all-obj.model';
import { GenericObj } from "app/shared/model/generic/generic-obj.model";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { URLConstant } from 'app/shared/constant/URLConstant';
import { EmployeeObj } from "app/shared/model/employee-obj.model";
import { EmployeeUserObj } from "app/shared/model/employee-user-obj.model";
import { EmployeeUserRoleObj } from "app/shared/model/employee-user-role-obj.model";
import { EmployeeDetailObj } from "app/shared/model/employee-detail-obj.model";
import { EmployeeAllObjCNAF } from "app/selfcustom/model/employee-all-obj-cnaf.model";

const envi = URLConstant.env;

export function addEditEmployeeCNAF(
    dicts: Record<string, any>,
    api: string,
    next: string,
    http: HttpClient,
    toastr: NGXToastrService,
    router: Router
  ) {
    let url = envi.FoundationR3Url + api;
    let employeeAllObj = new EmployeeAllObjCNAF();
  
    // Assigning nested RefEmpV2Obj structure
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj = new EmployeeObj();
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj = new EmployeeDetailObj();
    
    // Populating RefEmployeeObj with data
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.EmpNo = dicts.formRaw.EmpNo;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.EmpName = dicts.formRaw.EmpName;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.JoinDt = dicts.formRaw.JoinDt;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Addr = dicts.formRaw.Addr || "-";
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Zipcode = dicts.formRaw.Zipcode;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode1 = dicts.formRaw.AreaCode1;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode2 = dicts.formRaw.AreaCode2;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode3 = dicts.formRaw.AreaCode3;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.AreaCode4 = dicts.formRaw.AreaCode4;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.City = dicts.formRaw.City || "-";
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnArea1 = dicts.formRaw.PhnArea1;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Phn1 = dicts.formRaw.Phn1 || "0";
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnExt1 = dicts.formRaw.PhnExt1;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnArea2 = dicts.formRaw.PhnArea2;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Phn2 = dicts.formRaw.Phn2;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnExt2 = dicts.formRaw.PhnExt2;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnArea3 = dicts.formRaw.PhnArea3;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Phn3 = dicts.formRaw.Phn3;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.PhnExt3 = dicts.formRaw.PhnExt3;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.FaxArea = dicts.formRaw.FaxArea;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Fax = dicts.formRaw.Fax;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Email1 = dicts.formRaw.Email1;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Email2 = dicts.formRaw.Email2;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IsExt = dicts.formRaw.IsExt;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.TaxIdNo = dicts.formRaw.TaxIdNo;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.MrIdTypeCode = dicts.formRaw.IdType;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IdNo = dicts.formRaw.IdNum;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.ImageLocation = dicts.formRaw.ImageLocation;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.Loginsoftphone = dicts.formRaw.Loginsoftphone;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IsLeave = dicts.formRaw.LeaveStatus;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.IsActive = dicts.formRaw.ActiveStatus;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmployeeObj.RowVersion = dicts.formRaw.RefEmployeeObjRowVersion;
  
    // Populating MrEmpGradeLvlTypeCode and ExpectedEndDt
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.MrEmpGradeLvlTypeCode = dicts.formRaw.MrEmpGradeLvlTypeCode;
    employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.ExpectedEndDt = dicts.formRaw.ExpectedEndDt;
  
    // Assigning RefUserObj inside RefEmpV2Wrapper
    employeeAllObj.RefEmpV2Obj.RefUserObj = new EmployeeUserObj();
    employeeAllObj.RefEmpV2Obj.RefUserObj.Username = dicts.formRaw.Username;
    employeeAllObj.RefEmpV2Obj.RefUserObj.Password = dicts.formRaw.Password;
    employeeAllObj.RefEmpV2Obj.RefUserObj.FailPwdCount = dicts.formRaw.FailPwdCount;
    employeeAllObj.RefEmpV2Obj.RefUserObj.IsLockedOut = dicts.formRaw.IsLockedOut;
    employeeAllObj.RefEmpV2Obj.RefUserObj.IsActive = dicts.formRaw.ActiveStatus;
    employeeAllObj.RefEmpV2Obj.RefUserObj.IsLoggedIn = dicts.formRaw.IsLoggedIn;
    employeeAllObj.RefEmpV2Obj.RefUserObj.LoggedInMethod = dicts.formRaw.LoggedInMethod;
    employeeAllObj.RefEmpV2Obj.RefUserObj.PasswordExpirationDt = dicts.formRaw.PasswordExpirationDt;
    employeeAllObj.RefEmpV2Obj.RefUserObj.IsNeedUpdatePassword = dicts.formRaw.IsNeedUpdatePassword;
    employeeAllObj.RefEmpV2Obj.RefUserObj.RowVersion = dicts.formRaw.RefUserObjRowVersion;
  
    // Assigning RefUserRoleObj inside RefEmpV2Wrapper
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj = new EmployeeUserRoleObj();
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefBizUnitId = dicts.formRaw.RefBizUnitId;
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefJobTitleId = dicts.formRaw.RefJobTitleId;
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.SpvId = dicts.formRaw.SpvId;
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefRoleId = dicts.formRaw.RefRoleId;
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefOfficeId = dicts.formRaw.RefOfficeId;
    employeeAllObj.RefEmpV2Obj.RefUserRoleObj.IsActive = dicts.formRaw.ActiveStatus;
  
    // Assigning new properties for MedicalCoverage and EmployeeStatus
    employeeAllObj.MedicalCoverageAmt = dicts.formRaw.MedicalCoverageAmt; // default value
    employeeAllObj.EmployeeStatus = dicts.formRaw.EmployeeStatus; // default value
  
    // Handling edit mode
    if (dicts.mode !== undefined && dicts.mode === "edit") {
      employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.RefEmpId = dicts.RefEmpObj.RefEmpId;
      employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.MrEmpGradeLvlTypeCode = dicts.formRaw.MrEmpGradeLvlTypeCode;
      employeeAllObj.RefEmpV2Obj.RefEmpV2Obj.ExpectedEndDt = dicts.formRaw.ExpectedEndDt;
      employeeAllObj.RefEmpV2Obj.RefUserObj.RefUserId = dicts.RefUserObj.RefUserId;
      employeeAllObj.RefEmpV2Obj.RefUserObj.APIKey = dicts.formRaw.APIKey;
      employeeAllObj.RefEmpV2Obj.RefUserRoleObj.RefUserRoleId = dicts.formRaw.RefUserRoleId;
    }
  
    // Make the HTTP POST request
    http.post<GenericObj>(url, employeeAllObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(router, [next], {});
      }
    );
  }