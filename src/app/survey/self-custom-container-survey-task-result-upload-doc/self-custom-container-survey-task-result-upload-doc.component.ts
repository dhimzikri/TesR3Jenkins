import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';

@Component({
  selector: 'app-self-custom-container-survey-task-result-upload-doc',
  templateUrl: './self-custom-container-survey-task-result-upload-doc.component.html'
})
export class SelfCustomContainerSurveyTaskResultUploadDocComponent implements OnInit {

  @Input() SrvyTaskId: number;
  @Input() SrvyOrderId: number;

  SrvyTaskNo: string;
  SrvyOrderNo: string;

  dmsObj: DMSObj;
  ReqGenericObj: GenericObj = new GenericObj();
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

  isDmsReady: boolean = false;

  constructor(private cookieService: CookieService,private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    this.ReqGenericObj.Id = this.SrvyTaskId;
    await this.http.post(this.UrlConstantNew.GetSrvyTaskBySrvyTaskId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyTaskNo = response["SrvyTaskNo"];
      });

    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(this.UrlConstantNew.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyOrderNo = response["SrvyOrderNo"];
      });

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

  getValue(ev: any)
  {

  }

}
