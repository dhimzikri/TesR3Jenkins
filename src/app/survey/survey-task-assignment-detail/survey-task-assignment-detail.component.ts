import { NgxRouterService } from '@adins/fe-core';
import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { ReqSrvyTaskAndSendToMobileObj } from 'app/shared/model/request/req-srvy-task-and-send-to-mobile-obj.model';
import { ReqSrvyTaskIdAndUsername } from 'app/shared/model/request/srvy-task/req-srvy-task-id-and-username-obj.model';
import { SrvyTaskObj } from 'app/shared/model/srvy-task-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-task-assignment-detail',
  templateUrl: './survey-task-assignment-detail.component.html'
  
})
export class SurveyTaskAssignmentDetailComponent implements OnInit {
  @ViewChildren('dyna') UclookupgenericComponents: QueryList<UclookupgenericComponent>;

  readonly CancelLink: string = NavigationConstant.SURVEY_TASK_ASSIGNMENT_PAGING;
  readonly ViewLink: string = NavigationConstant.VIEW_SRVY_TASK;
  readonly ViewCustLink: string = NavigationConstant.VIEW_CUST;

  reqSrvyTaskAndSendToMobile: ReqSrvyTaskAndSendToMobileObj = new ReqSrvyTaskAndSendToMobileObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  lookupSurveyorObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  lookupSurveyorNationNoObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  surveyOrderId: number;
  reqByIdAndUsername: ReqSrvyTaskIdAndUsername = new ReqSrvyTaskIdAndUsername();
  parentForm: FormGroup;
  refUserId: number;
  surveyFormSchmId: number;
  srvyTaskObj: SrvyTaskObj;
  reqListSrvyTaskObj: Array<SrvyTaskObj>;
  refOfficeId: any;
  username: string;
  isNational: Array<boolean> = new Array<boolean>();

  //Dropdowns
  dropdownSurveyType: any;
  dropdownSurveyFormSchm: any;

  //Lookup
  lookupObj: any;
  InputLookupSurveyorObj: any;
  InputLookupSurveyorNationNoObj: any;
  InputLookupSurveyorObjs: Array<InputLookupObj> = new Array<InputLookupObj>();
  InputLookupSurveyorNationNoObjs: Array<InputLookupObj> = new Array<InputLookupObj>();
  surveyorNumber: { [key: string]: any; } = {};
  surveyorNumberNationNo: { [key: string]: any; } = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['SurveyOrderId'] != null) {
        this.surveyOrderId = queryParams['SurveyOrderId'];
      }
    });
  }

  SurveyTaskForm = this.fb.group({
    ListSurveyTask: this.fb.array([])
  });

  getLookupSurveyor(i, event) {
    this.SurveyTaskForm.controls["ListSurveyTask"]["controls"][i].patchValue({
      Surveyor: event.SurveyorId
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";
    this.getDropdown();
    this.getSurveyTaskListData();
  }

  async getSurveyTaskListData() {

    await this.http.post(this.UrlConstantNew.GetListSrvyTaskBySrvyOrderIdForUpdate, { Id: this.surveyOrderId }).toPromise().then(
      (response) => {        
        if (response['ReturnObject'].length > 0) {
          this.SurveyTaskForm.controls['ListSurveyTask'] = this.fb.array([]);
          for (let i = 0; i < response['ReturnObject'].length; i++) {
            this.http.post(this.UrlConstantNew.GetSrvyFormSchmBySrvyFormSchmId, { Id: response['ReturnObject'][i].SrvyFormSchmId }).subscribe(
              (res) => {
                var surveyTask = {
                  SurveyTaskId: response['ReturnObject'][i].SrvyTaskId,
                  SurveyTaskNo: response['ReturnObject'][i].SrvyTaskNo,
                  SurveyeeModel: response['ReturnObject'][i].MrCustModelCode,
                  SurveyObject: response['ReturnObject'][i].MrSrvyObjTypeCode,
                  SurveyeeName: response['ReturnObject'][i].CustName,
                  Address: response['ReturnObject'][i].Addr,
                  SurveyTaskStatus: response['ReturnObject'][i].MrSurveyTaskStatCode,
                  SurveyType: response['ReturnObject'][i].MrSurveyTypeCode,
                  Surveyor: response['ReturnObject'][i].SurveyorId,
                  SurveyForm: res['SrvyFormSchmId'],
                  National: "Yes",
                  RefNo: response['ReturnObject'][i].RefNo,
                  Zipcode: response['ReturnObject'][i].Zipcode,
                  CustNo: response['ReturnObject'][i].CustNo,
                  SurveyorName: response['ReturnObject'][i].SurveyorName
                }
                this.isNational[i] = true;
                this.addSurveyTaskToList(surveyTask);
              }
            )
          }
        }
      }
    )
  }

  getDropdown() {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "SURVEY_TYPE" }).subscribe(
      (response) => {
        this.dropdownSurveyType = response['ReturnObject'];
      }
    );

    this.http.post(this.UrlConstantNew.GetListKeyValueSrvyFormSchm, null).subscribe(
      (response) => {
        this.dropdownSurveyFormSchm = response['ReturnObject'];
      }
    )
  }

  onNationalSelect(i, event) {
    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    
    let refOfficeId = currentUserContext['OfficeId'];
    this.SurveyTaskForm.controls.ListSurveyTask['controls'][i].patchValue({
      National: event['target'].value
    })

    var temp = this.UclookupgenericComponents.toArray();
    if (event['target'].value == "No") {
      var assetCrit = new Array();
      var critAssetObj = new CriteriaObj();
      critAssetObj.DataType = 'number';
      critAssetObj.restriction = AdInsConstant.RestrictionEq;
      critAssetObj.propName = 'RO.REF_OFFICE_ID';
      critAssetObj.value = refOfficeId;
      assetCrit.push(critAssetObj);

      temp[(i*2)+1].lookupInput.addCritInput = assetCrit;
      temp[(i*2)+1].setAddCritInput();

      temp[i*2].lookupInput['isRequired'] = false;
      temp[(i*2)+1].lookupInput['isRequired'] = true;

      temp[i*2].lookupInput.nameSelect = "";
      temp[i*2].lookupInput.jsonSelect = "";
      this.isNational[i] = false;
    }
    else {     
      var assetCrit = new Array();
      temp[i*2].lookupInput.addCritInput = assetCrit;
      temp[i*2].setAddCritInput();
      temp[i*2].lookupInput['isRequired'] = true;
      temp[(i*2)+1].lookupInput['isRequired'] = false;

      temp[(i*2)+1].lookupInput.nameSelect = "";
      temp[(i*2)+1].lookupInput.jsonSelect = "";
      this.isNational[i] = true;
    }
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

      var InputLookupSurveyorObj = this.initLookupSurveyor(x);
      this.InputLookupSurveyorObjs.push(InputLookupSurveyorObj);

      this.surveyorNumber[max + 1] = InputLookupSurveyorObj;

      var InputLookupSurveyorObjNationNo = this.initLookupSurveyorForNationalNo(x);
      this.InputLookupSurveyorNationNoObjs.push(InputLookupSurveyorObjNationNo);

      this.surveyorNumberNationNo[max + 1] = InputLookupSurveyorObjNationNo;
    }
  }

  initLookupSurveyor(x) {
    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.refOfficeId = currentUserContext['OfficeId'];
    this.InputLookupSurveyorObj = new InputLookupObj(this.UrlConstantNew);
    this.InputLookupSurveyorObj.urlJson = "./assets/lookup/lookupSurveyorForSurveyTask.json";
    this.InputLookupSurveyorObj.pagingJson = "./assets/lookup/lookupSurveyorForSurveyTask.json";
    this.InputLookupSurveyorObj.genericJson = "./assets/lookup/lookupSurveyorForSurveyTask.json";
    this.InputLookupSurveyorObj.isRequired = true;

    this.InputLookupSurveyorObj.nameSelect = x.SurveyorName;
    this.InputLookupSurveyorObj.jsonSelect = x;

    return this.InputLookupSurveyorObj;
  }

  initLookupSurveyorForNationalNo(x) {
    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.refOfficeId = currentUserContext['OfficeId'];
    this.InputLookupSurveyorNationNoObj = new InputLookupObj(this.UrlConstantNew);
    this.InputLookupSurveyorNationNoObj.urlJson = "./assets/lookup/lookupSurveyorForSurveyTaskNationalNo.json";
    this.InputLookupSurveyorNationNoObj.pagingJson = "./assets/lookup/lookupSurveyorForSurveyTaskNationalNo.json";
    this.InputLookupSurveyorNationNoObj.genericJson = "./assets/lookup/lookupSurveyorForSurveyTaskNationalNo.json";
    this.InputLookupSurveyorNationNoObj.isRequired = false;

    this.InputLookupSurveyorNationNoObj.nameSelect = x.SurveyorName;
    this.InputLookupSurveyorNationNoObj.jsonSelect = x;
    
    return this.InputLookupSurveyorNationNoObj;
  }

  addGroupAsset(surveyTaskObj, i) {
    return this.fb.group({
      No: [i],
      SurveyTaskId: [surveyTaskObj.SurveyTaskId],
      SurveyTaskNo: [surveyTaskObj.SurveyTaskNo],
      SurveyeeModel: [surveyTaskObj.SurveyeeModel],
      SurveyObject: [surveyTaskObj.SurveyObject],
      SurveyeeName: [surveyTaskObj.SurveyeeName],
      Address: [surveyTaskObj.Address],
      SurveyTaskStatus: [surveyTaskObj.SurveyTaskStatus],
      SurveyType: [surveyTaskObj.SurveyType, Validators.required],
      Surveyor: [surveyTaskObj.Surveyor],
      SurveyForm: [surveyTaskObj.SurveyForm, Validators.required],
      National: [surveyTaskObj.National],
      RefNo: [surveyTaskObj.RefNo],
      Zipcode: [surveyTaskObj.Zipcode],
      CustNo: [surveyTaskObj.CustNo],
      SurveyorName: [surveyTaskObj.SurveyorName]
    });
  }

  CancelSurveyTask(surveyTaskId) {
    var result = confirm("Are you sure to cancel?");
    if (result) {
      const getuserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
      this.reqByIdAndUsername.SrvyTaskId = surveyTaskId;
      this.reqByIdAndUsername.Username = getuserAccess.UserName;
      this.http.post(this.UrlConstantNew.CancelSurveyTaskBySurveyTaskId, this.reqByIdAndUsername, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Survey Task has been cancelled!");
          window.location.reload();
          // this.getSurveyTaskListData();
        }
      )
    }
  }

  SaveForm() {
    this.reqListSrvyTaskObj = new Array<SrvyTaskObj>();

    for (let i = 0; i < this.SurveyTaskForm.controls['ListSurveyTask']['controls'].length; i++) {
      this.srvyTaskObj = new SrvyTaskObj();

      this.srvyTaskObj.SrvyTaskId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskId;
      this.srvyTaskObj.SrvyTaskNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskNo;
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

      this.reqListSrvyTaskObj.push(this.srvyTaskObj);
    }
    const getuserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.reqSrvyTaskAndSendToMobile.Username = getuserAccess.UserName;
    this.reqSrvyTaskAndSendToMobile.ReqListSrvyTaskObjs = this.reqListSrvyTaskObj;
    this.reqSrvyTaskAndSendToMobile.SrvyOrderId = this.surveyOrderId;

    this.http.post(this.UrlConstantNew.EditSrvyTaskAndSendToMobile, this.reqSrvyTaskAndSendToMobile, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.SURVEY_TASK_ASSIGNMENT_PAGING], {});
      }
    )
  }
}