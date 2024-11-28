import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { SrvyTaskObj } from 'app/shared/model/srvy-task-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-result-review-detail',
  templateUrl: './survey-result-review-detail.component.html'
})
export class SurveyResultReviewDetailComponent implements OnInit {

  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  SrvyOrderId: number;

  srvyTaskObj: SrvyTaskObj;
  reqListSrvyTaskObj: Array<SrvyTaskObj>;

  readonly ViewLink: string = NavigationConstant.VIEW_SRVY_TASK;
  readonly CancelLink: string = NavigationConstant.SURVEY_RESULT_REVIEW_PAGING;  
  readonly ViewCustLink: string = NavigationConstant.VIEW_CUST;

  SurveyTaskForm = this.fb.group({
    ListSurveyTask: this.fb.array([])
  });

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, 
    private cookieService: CookieService, private toastr: NGXToastrService, private router: Router, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["SrvyOrderId"] != null) {
        this.SrvyOrderId = queryParams["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";

    this.getSurveyTaskListData();
    
  }

  async getSurveyTaskListData() {
    await this.http.post(this.UrlConstantNew.GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview, { Id: this.SrvyOrderId }).toPromise().then(
      (response) => {
        if (response['ReturnObject'].length > 0) {
          this.SurveyTaskForm.controls['ListSurveyTask'] = this.fb.array([]);
          for (let i = 0; i < response['ReturnObject'].length; i++) {
            var surveyTask = {
              SurveyTaskId: response['ReturnObject'][i].SrvyTaskId,
              SurveyOrderId: response['ReturnObject'][i].SrvyOrderId,
              ResurveyRef: response['ReturnObject'][i].PrevSurveyTaskNo,
              SurveyTaskNo: response['ReturnObject'][i].SrvyTaskNo,
              SurveyeeModel: response['ReturnObject'][i].MrCustModelCode,
              SurveyObject: response['ReturnObject'][i].MrSrvyObjTypeCode,
              SurveyeeName: response['ReturnObject'][i].CustName,
              Address: response['ReturnObject'][i].Addr,
              SurveyType: response['ReturnObject'][i].MrSurveyTypeCode,
              SurveyorName: response['ReturnObject'][i].SurveyorName,
              SurveyTaskStatus: response['ReturnObject'][i].MrSurveyTaskStatCode,
              SurveyFormSchm: response['ReturnObject'][i].SrvyFormSchmName,
              Surveyor: response['ReturnObject'][i].SurveyorId,
              RefNo: response['ReturnObject'][i].RefNo,
              Zipcode: response['ReturnObject'][i].Zipcode,
              CustNo: response['ReturnObject'][i].CustNo,
              CustId: response['ReturnObject'][i].CustId,
              ResultDate: response['ReturnObject'][i].ResultDt,
              ReviewComment: ''              
            }
            this.addSurveyTaskToList(surveyTask);
          }
        }
      }
    )
  }

  addSurveyTaskToList(x) {
    var surveyTaskObj = this.SurveyTaskForm.controls["ListSurveyTask"] as FormArray;
    var length = this.SurveyTaskForm.controls["ListSurveyTask"]["controls"].length;
    
    var max = 0;
    if (length > 0) {
      max = this.SurveyTaskForm["controls"]["ListSurveyTask"]["controls"][length - 1]["controls"]["No"].value;
    }
    if (x != undefined) {
      surveyTaskObj.push(this.addGroupAsset(x, max + 1));
    }
  }

  checkForm(){
    console.log(this.SurveyTaskForm);
  }

  addGroupAsset(surveyTaskObj, i) {
    return this.fb.group({
      No: [i],
      SurveyTaskId: [surveyTaskObj.SurveyTaskId],
      SurveyOrderId: [surveyTaskObj.SurveyOrderId],
      ResurveyRef: [surveyTaskObj.ResurveyRef],
      SurveyTaskNo: [surveyTaskObj.SurveyTaskNo],
      SurveyeeModel: [surveyTaskObj.SurveyeeModel],
      SurveyObject: [surveyTaskObj.SurveyObject],
      SurveyeeName: [surveyTaskObj.SurveyeeName],
      Address: [surveyTaskObj.Address],
      SurveyType: [surveyTaskObj.SurveyType],
      SurveyorName: [surveyTaskObj.SurveyorName],
      SurveyTaskStatus: [surveyTaskObj.SurveyTaskStatus],
      SurveyFormSchm: [surveyTaskObj.SurveyFormSchm],
      Surveyor: [surveyTaskObj.Surveyor],
      RefNo: [surveyTaskObj.RefNo],
      Zipcode: [surveyTaskObj.Zipcode],
      CustNo: [surveyTaskObj.CustNo],
      CustId: [surveyTaskObj.CustId],
      ResultDate: [surveyTaskObj.ResultDate],
      ReviewComment: [surveyTaskObj.ReviewComment]
    })
  }

  SaveForm(){
    this.reqListSrvyTaskObj = new Array<SrvyTaskObj>();

    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    console.log(currentUserContext);

    for (let i = 0; i < this.SurveyTaskForm.controls['ListSurveyTask']['controls'].length; i++) {
      this.srvyTaskObj = new SrvyTaskObj();

      this.srvyTaskObj.SrvyTaskId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskId;
      this.srvyTaskObj.SrvyTaskNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskNo;
      this.srvyTaskObj.SrvyOrderId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyOrderId;
      this.srvyTaskObj.MrCustModelCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyeeModel;
      this.srvyTaskObj.MrSrvyObjTypeCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyObject;
      this.srvyTaskObj.CustName = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyeeName;
      this.srvyTaskObj.Addr = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.Address;
      this.srvyTaskObj.MrSurveyTaskStatCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskStatus;
      this.srvyTaskObj.MrSurveyTypeCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyType;
      this.srvyTaskObj.SurveyorId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.Surveyor;
      this.srvyTaskObj.SrvyFormSchmId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyForm;
      this.srvyTaskObj.RefNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.RefNo;
      this.srvyTaskObj.Zipcode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.Zipcode;
      this.srvyTaskObj.CustNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.CustNo;
      this.srvyTaskObj.ResultDt = currentUserContext['BusinessDt'];  
      this.srvyTaskObj.ReviewDt = currentUserContext['BusinessDt'];    
      this.srvyTaskObj.ReviewByRefUserId = currentUserContext['RefUserId'];
      this.srvyTaskObj.ReviewNotes = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.ReviewComment;

      this.reqListSrvyTaskObj.push(this.srvyTaskObj);
    }

    /* istanbul ignore next */
    this.http.post(this.UrlConstantNew.ReviewSurveyResult, { reqListSrvyTaskObjs: this.reqListSrvyTaskObj }, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        /* istanbul ignore next */
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SURVEY_RESULT_REVIEW_PAGING], {});
      }
    );
  }

}
