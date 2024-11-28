import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import Stepper from 'bs-stepper';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-task-result-page',
  templateUrl: './survey-task-result-page.component.html'
})
export class SurveyTaskResultPageComponent implements OnInit {
  private stepper: Stepper;

  ReqGenericObj: GenericObj = new GenericObj();
  SrvyTaskId: number;
  SrvyOrderId: number;
  SrvyTaskNo: string;
  SrvyOrderNo: string;
  SurveyorName: string;
  Type: string;
  CustStepIndex: number = 1;
  isDmsReady: boolean = false;
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()

  constructor(private route: ActivatedRoute, private toastr: NGXToastrService,private router: Router, 
    private http: HttpClient, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if(queryParams["SrvyTaskId"] != null){
        this.SrvyTaskId = queryParams["SrvyTaskId"];
      }
      if(queryParams["SrvyOrderId"] != null){
        this.SrvyOrderId = queryParams["SrvyOrderId"];
      }
      if(queryParams["SurveyorName"] != null){
        this.SurveyorName = queryParams["SurveyorName"];
      }
      if(queryParams["Type"] != null){
        this.Type = queryParams["Type"];
      }
    });
  }
  

  CustStep = {
    "Detail": 1,
    "Upload": 2
  }

  back() {
      AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SURVEY_TASK_RESULT_PAGING],{});
  }
 
  async ngOnInit() {
    await this.GetSrvyOrderNo();
    await this.GetSrvyTaskNo();

    // check DMS
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
    this.MakeStepper();
  }

  MakeStepper(){
    this.stepper = new Stepper(document.querySelector('#stepperSrvy'), {
      linear: false,
      animation: true
    })
    document.getElementById('stepperSrvy').style.display = 'block';
  }

  async GetSrvyTaskNo(){
    this.ReqGenericObj.Id = this.SrvyTaskId;
    await this.http.post(this.UrlConstantNew.GetSrvyTaskBySrvyTaskId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyTaskNo = response["SrvyTaskNo"];
      });
  }

  async GetSrvyOrderNo(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(this.UrlConstantNew.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyOrderNo = response["SrvyOrderNo"];
      });
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }
    if (type == "Upload") {
      this.CustStepIndex = 2;
    }
    this.stepper.to(this.CustStepIndex);
  }

  getValue(ev: any) {
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next"){
        this.stepper.next();
        this.CustStepIndex++;

        //skip dms
        if(this.CustStepIndex == 2 && this.SysConfigResultObj.ConfigValue != '1'){
          this.stepper.next();
          this.CustStepIndex++;
        }
      }
      else{
        this.stepper.previous();
        this.CustStepIndex--;

        //skip dms
        if(this.CustStepIndex == 2 && this.SysConfigResultObj.ConfigValue != '1'){
          this.stepper.previous();
          this.CustStepIndex--;
        }
      }
    }
  }
  
  endStepper(){
    this.ReqGenericObj.Id = this.SrvyTaskId;
    this.http.post(this.UrlConstantNew.UpdateMrSurveyTaskStatCode, this.ReqGenericObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SURVEY_TASK_RESULT_PAGING],{});
      });
  }

}
