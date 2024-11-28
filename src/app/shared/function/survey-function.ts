import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import * as env from "../../../assets/config/enviConfig.json";
import { GenericObj } from "../model/generic/generic-obj.model";
import { AdInsConstant } from "../AdInstConstant";
import { AdInsHelper } from "../AdInsHelper";
import { VerifResulHDetailObj } from 'app/shared/model/verf-result-h/verf-result-h-detail-obj.model';
import { VerfResultDObj } from 'app/shared/model/verf-result-d/VerfResultD.model';
import { CommonConstant } from "../constant/CommonConstant";
import { CookieService } from "ngx-cookie";
import { ReqUpdateSrvyTaskAndAddVerfResultHDObj } from "../model/request/srvy-task/req-update-srvy-task-and-add-verf-result-h-d-obj.model";
import { UcTemplateService } from "@adins/uctemplate";
import { URLConstant } from 'app/shared/constant/URLConstant';

const envi = URLConstant.env;

function setSurveyVerifData(dicts: Record<string, any>, cookieService: CookieService)
{
  var businessDt = new Date(AdInsHelper.GetCookie(cookieService, CommonConstant.BUSINESS_DATE_RAW));
  var todaydate = new Date();
  businessDt.setHours(todaydate.getHours(), todaydate.getMinutes(), todaydate.getSeconds());
  var usertimezone = businessDt.getTimezoneOffset() * 60000;
  businessDt = new Date(businessDt.getTime() - usertimezone);
  let VerfResultHD = new VerifResulHDetailObj();
  VerfResultHD.VerfResultDListObj = new Array<VerfResultDObj>();
  VerfResultHD.VerfResultHObj.VerfResultId = dicts.VerfResultId;
  VerfResultHD.VerfResultHObj.VerfSchemeHId = dicts.VerfSchemeHId;
  VerfResultHD.VerfResultHObj.MrVerfObjectCode = dicts.Type;
  VerfResultHD.VerfResultHObj.MrVerfSubjectRelationCode = dicts.Type;
  VerfResultHD.VerfResultHObj.MrVerfSubjectRelationName = dicts.CustName;
  VerfResultHD.VerfResultHObj.VerfDt = businessDt;
  VerfResultHD.VerfResultHObj.MrVerfResultHStatCode = dicts.formRaw.MrVerfResultHStatCode;
  VerfResultHD.VerfResultHObj.Phn = dicts.CustPhone;
  VerfResultHD.VerfResultHObj.PhnType = CommonConstant.VerfResultPhnTypeMobile;
  VerfResultHD.VerfResultHObj.Notes = dicts.formRaw.Notes;
  VerfResultHD.VerfResultHObj.Addr = dicts.Addr;
  VerfResultHD.VerfResultHObj.MrAddrTypeCode = dicts.MrSrvyObjTypeCode;
  VerfResultHD.VerfResultHObj.TrxRefNo = dicts.SrvyTaskNo;
  VerfResultHD.VerfResultHObj.RowVersion = dicts.RowVersionSrvyTask;

  if (dicts.formRaw.MrVerfResultHStatCode == CommonConstant.VerfResultStatSuccess && dicts.QuestionObj != null) {
    var formValue = dicts.formRaw.QuestionObjs;
    if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
      for (const x in formValue) {
        var currGrp = formValue[x]["VerfQuestionAnswerList"]
        for (const y in currGrp)
        {
           var currAnswer = currGrp[y]["ResultGrp"]; 
           var question = new VerfResultDObj();
            question.VerfQuestionAnswerId = currAnswer.VerfQuestionAnswerId;
            question.VerfQuestionText = currAnswer.VerfQuestionText;
            question.Answer = currAnswer.Answer;
            question.Notes = currAnswer.Notes;
            question.SeqNo = currAnswer.SeqNo;
            question.VerfQuestionGroupCode = currAnswer.VerfQuestionGroupCode;
            VerfResultHD.VerfResultDListObj.push(question);
        }
      }
    }
  }

  return VerfResultHD;
}

export function endStepperSrvyTaskDetail(SrvyTaskId: number, api: any, next: string, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = envi.FoundationR3Url + api;
    
    let ReqGenericObj: GenericObj = new GenericObj();
    ReqGenericObj.Id = SrvyTaskId;
    http.post(url, ReqGenericObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
      AdInsHelper.RedirectUrl(router,[next],{ })
      toastr.successMessage(response['message']);
    });
}

export function addEditSurveyTaskResultDetail(dicts: Record<string, any>, api: any, http: HttpClient, toastr: NGXToastrService, router: Router, cookieService: CookieService, templateService: UcTemplateService)
{
  console.log(dicts)
  let url = envi.FoundationR3Url + api;

  if (!dicts.IsQuestionLoaded) {
    toastr.warningMessage("Can't process further because questions are not loaded");
  }
  else {
    let VerfResultHD = new VerifResulHDetailObj();
    let ReqSrvyTaskAndAddVerfResultHDObj = new ReqUpdateSrvyTaskAndAddVerfResultHDObj();
    if(dicts.PageType == "Add"){
      VerfResultHD = setSurveyVerifData(dicts, cookieService);
      ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = dicts.SrvyTaskId;
      ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = VerfResultHD;
      http.post(url, ReqSrvyTaskAndAddVerfResultHDObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          toastr.successMessage(response["message"]);

          if(response["StatusCode"] == '200'){
            const actions = [
              {
                'result': {
                  'type': 'function',
                  'target': 'self',
                  'alias': '',
                  'methodName': 'NextStep',
                  'params': []
                },
                'conditions': []
              }
            ];
        
            templateService.publish({Actions: actions});
          }
        });

    }else if(dicts.PageType == "Edit"){
      VerfResultHD = setSurveyVerifData(dicts, cookieService);
      ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = dicts.SrvyTaskId;
      ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = VerfResultHD;
      ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD.VerfResultHId = dicts.VerfResultHId;
      http.post(url, ReqSrvyTaskAndAddVerfResultHDObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          toastr.successMessage(response["message"]);

          if(response["StatusCode"] == '200'){
            const actions = [
              {
                'result': {
                  'type': 'function',
                  'target': 'self',
                  'alias': '',
                  'methodName': 'NextStep',
                  'params': []
                },
                'conditions': []
              }
            ];
        
            templateService.publish({Actions: actions});
          }
        });
    }
  }
}