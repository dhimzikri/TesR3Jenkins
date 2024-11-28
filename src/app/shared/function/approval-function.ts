import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from '../../../environments/environment';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { CommonConstant } from "../constant/CommonConstant";
import { String } from 'typescript-string-operations';
import { ExceptionConstant } from "../constant/ExceptionConstant";
import { ApvClaimTaskObj } from "../model/approval/approval-req-obj.model";
import { ApprovalObj } from "../model/approval/approval-obj.model";

export async function callBackVendorPagingApproval(Key: string, RowObj: any, http: HttpClient, toastr: NGXToastrService, router: Router, userContext: any, api: any) {
  const isRoleAssignment = RowObj.IsRoleAssignment.toString();
  const url = enviConfig.FoundationR3Url + api;
  if (Key == "Process") {
    if (isRoleAssignment != CommonConstant.TRUE) {
      if (String.Format("{0:L}", RowObj.CurrentUser) != String.Format("{0:L}", userContext.UserName)) {
        toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_PROCESS_TASK);
        return;
      }
    }
    else if (RowObj.CurrentUser == "-") {
      //await apvTaskService.ClaimApvTask(RowObj.TaskId);
      var claimTaskObj = new ApvClaimTaskObj();
      claimTaskObj.TaskId = RowObj.TaskId;
      claimTaskObj.Username = userContext.UserName
      await http.post(url, claimTaskObj, AdInsConstant.SpinnerOptions).toPromise().then(
          (response) => {
              if (response["StatusCode"] != 200) {
                  toastr.errorMessage(response["Message"]);
              }
          }
      );
    }
    router.navigate([NavigationConstant.CUSTOM_VENDOR_GRD_APV_DETAIL], { queryParams: { "VendorGradingHistId": RowObj.VendorGradingHistId, "VendorGradingHistNo": RowObj.VendorGradingHistNo, "TaskId": RowObj.TaskId, "InstanceId": RowObj.InstanceId, "ApvReqId": environment.isCore ? RowObj.RequestId : RowObj.ApvReqId } });
  }
  else if (Key == "HoldTask") {
    if (String.Format("{0:L}", RowObj.CurrentUser) != String.Format("{0:L}", userContext.UserName)) {
      toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_HOLD);
    } else {
      //apvTaskService.HoldApvTask(RowObj.TaskId);
      let ApvReqObj = new ApprovalObj();
      ApvReqObj.TaskId = RowObj.TaskId;
      http.post(url, ApvReqObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
              toastr.successMessage(response["Message"]);
          }
      );
    }
  }
  else if (Key == "TakeBack") {
    if (String.Format("{0:L}", RowObj.MainUser) != String.Format("{0:L}", userContext.UserName)) {
      toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_TAKE_BACK);
    } else {
      //apvTaskService.TakeBackApvTask(RowObj.TaskId, RowObj.MainUser);
      let ApvReqObj = new ApprovalObj();
      ApvReqObj.TaskId = RowObj.TaskId;
      ApvReqObj.Username = userContext.UserName;
      http.post(url, ApvReqObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
             toastr.successMessage(response["Message"]);
          }
      );
    }
  }
  else if (Key == "UnClaim") {
    if (String.Format("{0:L}", RowObj.CurrentUser) != String.Format("{0:L}", userContext.UserName)) {
      toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_UNCLAIM);
    } else {
      //apvTaskService.UnclaimApvTask(RowObj.TaskId);
      let ApvReqObj = new ApprovalObj();
      ApvReqObj.TaskId = RowObj.TaskId;
      http.post(url, ApvReqObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          toastr.successMessage(response["Message"]);
        }
      )
    }
  }
  else {
    toastr.warningMessage(String.Format(ExceptionConstant.ERROR_NO_CALLBACK_SETTING, Key));
  }
}

