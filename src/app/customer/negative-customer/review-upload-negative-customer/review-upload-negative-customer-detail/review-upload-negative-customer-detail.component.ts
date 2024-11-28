import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { ClaimTaskService } from 'app/shared/claimTask.service';
import { WorkflowApiObj } from 'app/shared/model/workflow-api-obj.model';
import { UploadReviewCustomObj } from 'app/shared/model/upload-review-custom-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-review-upload-negative-customer-detail',
  templateUrl: './review-upload-negative-customer-detail.component.html'
})
export class ReviewUploadNegativeCustomerDetailComponent implements OnInit {
  uploadNo: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit = new Array();
  taskListId: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  currentUserContext: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
  
  readonly CancelLink: string = NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private cookieService: CookieService, private claimTaskService: ClaimTaskService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["UploadNo"] != null) {
        this.uploadNo = queryParams["UploadNo"];
      }
      if (queryParams["TaskListId"] != null) {
        this.taskListId = queryParams["TaskListId"];
      }
    });
  }
  
  ngOnInit() {    
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewReviewUploadNegativeCust.json";

    this.claimTask();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeCustomerDetail.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadNegativeCustomerDetail.json";
    this.inputPagingObj.addCritInput = new Array();
    const addCritAssetMasterId = new CriteriaObj();
    addCritAssetMasterId.DataType = 'text';
    addCritAssetMasterId.propName = 'UPLOAD_MONITORING_NO';
    addCritAssetMasterId.restriction = AdInsConstant.RestrictionEq;
    addCritAssetMasterId.value = this.uploadNo;
    this.arrCrit.push(addCritAssetMasterId);
    this.inputPagingObj.addCritInput.push(addCritAssetMasterId);
  }
  
  cancel() {
    var wfObj = new WorkflowApiObj();
    wfObj.TransactionNo = this.uploadNo;
    wfObj.ListValue["Status"] = "RJC";
    wfObj.ListValue["WfCode"] = CommonConstant.WorkflowUploadNegativeCustomer;
    wfObj.ListValue["TaskId"] = this.taskListId;
    this.http.post(this.UrlConstantNew.CancelUploadV2, wfObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
      }); 
      }
    );
  }

  uploadReview(status: string) {
      var uploadObj = new UploadReviewCustomObj();
      uploadObj.MrUploadStatusCode = status;
      uploadObj.TaskListId = this.taskListId;
      uploadObj.UploadMonitoringNo = this.uploadNo;
      this.http.post(this.UrlConstantNew.UploadReviewV2, uploadObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
        }
      );
  }

  claimTask() {
    this.claimTaskService.ClaimTaskV2(this.taskListId);
  }
}
