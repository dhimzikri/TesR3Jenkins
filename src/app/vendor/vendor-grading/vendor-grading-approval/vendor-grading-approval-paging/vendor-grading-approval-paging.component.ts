import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ApprovalReqObj } from 'app/shared/model/approval/approval-req-obj.model';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { IntegrationObj } from 'app/shared/model/library/integration-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ApprovalTaskService } from 'app/shared/services/ApprovalTask.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-vendor-grading-approval-paging',
  templateUrl: './vendor-grading-approval-paging.component.html',
 // providers: [NGXToastrService]
})
export class VendorGradingApprovalPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  apvReqObj: ApprovalReqObj = new ApprovalReqObj();
  integrationObj: IntegrationObj = new IntegrationObj();
  arrCrit: any;
  userContext: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));;

  constructor(private toastr: NGXToastrService, private httpClient: HttpClient, private router: Router, private cookieService: CookieService, private apvTaskService: ApprovalTaskService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/dealer-grading/searchDealerGradingApproval.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/dealer-grading/searchDealerGradingApproval.json";

    if(environment.isCore){
      this.inputPagingObj._url = "./assets/ucpaging/dealer-grading/V2/searchDealerGradingApprovalV2.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/dealer-grading/V2/searchDealerGradingApprovalV2.json";
      this.inputPagingObj.isJoinExAPI = true;

      this.apvReqObj.CategoryCode = CommonConstant.VENDOR_GRADING_APV;
      this.apvReqObj.Username = this.userContext.UserName;
      this.apvReqObj.RoleCode = this.userContext.RoleCode;
      //agar bisa lintas cabang
      //this.apvReqObj.OfficeCode = this.userContext.OfficeCode;
      this.integrationObj.baseUrl = this.UrlConstantNew.GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode;
      this.integrationObj.requestObj = this.apvReqObj;
      this.integrationObj.leftColumnToJoin = "VendorGradingHistNo";
      this.integrationObj.rightColumnToJoin = "TransactionNo";
      this.integrationObj.joinType = CommonConstant.JOIN_TYPE_INNER;
      this.inputPagingObj.integrationObj = this.integrationObj; 
    }
    
  }

  async CallBackHandler(ev) {
    var isRoleAssignment = ev.RowObj.IsRoleAssignment.toString();

    if (ev.Key == "Process") {
      if(isRoleAssignment != CommonConstant.TRUE){
        if (String.Format("{0:L}", ev.RowObj.CurrentUser) != String.Format("{0:L}", this.userContext.UserName)) {
          this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_PROCESS_TASK);
          return;
        }
      }
      else if (ev.RowObj.CurrentUser == "-") {
        await this.apvTaskService.ClaimApvTask(ev.RowObj.TaskId);
      } 
      this.router.navigate([NavigationConstant.VENDOR_GRD_REQ_APV_DETAIL], { queryParams: { "VendorGradingHistId": ev.RowObj.VendorGradingHistId, "VendorGradingHistNo": ev.RowObj.VendorGradingHistNo ,"TaskId": ev.RowObj.TaskId, "InstanceId": ev.RowObj.InstanceId, "ApvReqId": environment.isCore ? ev.RowObj.RequestId : ev.RowObj.ApvReqId } });
    }
    else if (ev.Key == "HoldTask") {
      if (String.Format("{0:L}", ev.RowObj.CurrentUser) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_HOLD);
      } else {
        this.apvTaskService.HoldApvTask(ev.RowObj.TaskId);
      }
    }
    else if (ev.Key == "TakeBack") {
      if (String.Format("{0:L}", ev.RowObj.MainUser) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_TAKE_BACK);
      } else {
        this.apvTaskService.TakeBackApvTask(ev.RowObj.TaskId, ev.RowObj.MainUser);
      }
    }
    else if (ev.Key == "UnClaim") {
      if (String.Format("{0:L}", ev.RowObj.CurrentUser) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_UNCLAIM);
      } else {
        this.apvTaskService.UnclaimApvTask(ev.RowObj.TaskId);
      }
    }
    else {
      this.toastr.warningMessage(String.Format(ExceptionConstant.ERROR_NO_CALLBACK_SETTING, ev.Key));
    }
  }
}
