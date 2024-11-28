import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-task-view',
  templateUrl: './survey-task-view.component.html'
})
export class SurveyTaskViewComponent implements OnInit {

  SrvyTaskId: number;
  SrvyOrderId: number;
  SrvyTaskNo: string;
  SrvyOrderNo: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewGenericSbjctObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  isDmsReady: boolean = false;
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()
  ReqGenericObj: GenericObj = new GenericObj();
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["SrvyTaskId"] != null) {
        this.SrvyTaskId = queryParams["SrvyTaskId"];
      }
    });
  }

  async ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyTask.json";
    this.viewGenericSbjctObj.viewInput = "./assets/ucviewgeneric/viewSrvyTaskSubject.json";

    await this.GetSrvyTaskNo();
    await this.GetSrvyOrderNo();

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms}).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
    });

    if (this.SysConfigResultObj.ConfigValue == '1') {
      let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
      this.dmsObj = new DMSObj();
      this.dmsObj.User = currentUserContext.UserName;
      this.dmsObj.Role = currentUserContext.RoleCode;
      this.dmsObj.ViewCode = CommonConstant.DmsViewCodeSurvey;
      this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsSurveyId, this.SrvyOrderNo), new DMSLabelValueObj(CommonConstant.DmsTaskId, this.SrvyTaskNo));
      this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadDownloadView));
      this.isDmsReady = true;
    }
  }

  async GetSrvyTaskNo(){
    this.ReqGenericObj.Id = this.SrvyTaskId;
    await this.http.post(this.UrlConstantNew.GetSrvyTaskBySrvyTaskId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyTaskNo = response["SrvyTaskNo"];
        this.SrvyOrderId = response["SrvyOrderId"];
      });
  }

  async GetSrvyOrderNo(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(this.UrlConstantNew.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyOrderNo = response["SrvyOrderNo"];
      });
  }

}
