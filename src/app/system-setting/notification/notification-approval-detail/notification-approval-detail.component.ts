import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NotificationHObj } from 'app/shared/model/notification-h-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-notification-approval-detail',
  templateUrl: './notification-approval-detail.component.html'
})
export class NotificationApprovalDetailComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: any;
  notificationHObj: NotificationHObj;
  NotificationHId: any;
  detailData: any;
  countDetailData: any;
  detailDataForGrid: any;
  deleteUrl: any;
  resultData: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_NOTIF_APPRV;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["NotificationHId"] != null) {
        this.NotificationHId = queryParams["NotificationHId"];
      }

    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewNotificationOnApproval.json";

    this.notificationHObj = new NotificationHObj();
    this.notificationHObj.NotificationHId = this.NotificationHId;
    this.http.post(this.UrlConstantNew.GetNotificationHByNotificationHId, { Id: this.NotificationHId }).subscribe(
      response => {
        this.resultData = response;
      }
    );

    this.inputPagingObj._url = "./assets/ucpaging/searchNotificationDOnApproval.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNotificationDOnApproval.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'NOTIFICATION_H_ID';
    critObj.value = this.NotificationHId;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

  SaveForm(event: any) {
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    var notificationResultStat;
    var resultForMsg;

    if (event.target.id == "btnApprove")//Approve
    {
      notificationResultStat = "APV";
      resultForMsg = "Approve ";
    }
    else if (event.target.id == "btnReject")//Reject
    {
      notificationResultStat = "RJC";
      resultForMsg = "Reject ";
    }
    else if (event.target.id == "btnReturn")//Return
    {
      notificationResultStat = "RTN";
      resultForMsg = "Return ";
    }

    this.notificationHObj = this.resultData;
    this.notificationHObj.Status = notificationResultStat;
    this.notificationHObj.ApproveBy = currentUserContext.UserName;

    this.http.post(this.UrlConstantNew.EditNotificationH, this.notificationHObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(resultForMsg + " " + response["Message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SYSTEM_SETTING_NOTIF_APPRV], {});
      }
    );
  }

}
