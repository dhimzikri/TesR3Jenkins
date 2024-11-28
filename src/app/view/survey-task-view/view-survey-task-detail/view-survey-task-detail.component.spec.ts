import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { of } from 'rxjs';
import { ViewSurveyTaskDetailComponent } from './view-survey-task-detail.component';

const MockResponseSrvyTaskWithMobileAssignmentId: any = {
    MrSrvyObjTypeCode: 'JOB',
    SrvyTaskNo: 'SRVYTASKNO1',
    MobileAssignmentId: 1
};

const MockResponseSrvyTaskWithoutMobileAssignmentId: any = {
    MrSrvyObjTypeCode: 'JOB',
    SrvyTaskNo: 'SRVYTASKNO1',
    MobileAssignmentId: null
};

const MockResponseverfResultHWithId: any = {
    VerfResultHId: 1
};

const MockResponseverfResultHWithoutId: any = {
    VerfResultHId: 0
};

const MockResponseVerfQuestion: any = {
    ReturnObject:[
        {
          'VerfQuestionGrpCode': 'Question1',
          'VerfQuestionGrpName': 'Question 1',
          'VerResultList':{
              'VerfQuestionText': 'Verf Quesion text 1',
              'Answer': 'Yes',
              'Notes': 'yas'
          }
        },
        {
          'VerfQuestionGrpCode': 'Question2',
          'VerfQuestionGrpName': 'Question 2',
          'VerResultList':{
            'VerfQuestionText': 'Verf Quesion text 2',
            'Answer': 'Yes',
            'Notes': 'yas'
        }
        }
    ]
  };

describe('ViewSurveyTaskDetailComponent', () => {
  let component: ViewSurveyTaskDetailComponent;
  let fixture: ComponentFixture<ViewSurveyTaskDetailComponent>;
  let httpSpy, routeSpy;
  let srvyTaskWithMobileAssignment, verfResultHWithId;

  beforeEach(async () => {
    httpSpy = {
        post: (url: string, body: any | null, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };
          observe?: 'body';
          params?: HttpParams | { [param: string]: string | string[]; };
          reportProgress?: boolean;
          responseType?: 'json';
          withCredentials?: boolean;
        }) => {
          let response: Object;
          if (url === ''/**URLConstant.GetVerfResultHByTrxRefNoAndMrAddrTypeCode**/) {
              if(verfResultHWithId == 0){
                  response = MockResponseverfResultHWithId;
              }else{
                  response = MockResponseverfResultHWithoutId;
              }
          } else if (url === ''/**URLConstant.GetListVerfResultDInQuestionGrp**/) {
            response = MockResponseVerfQuestion;
          } else if (url === ''/**URLConstant.GetSrvyTaskBySrvyTaskId**/) {
              if(srvyTaskWithMobileAssignment == 0){
                response = MockResponseSrvyTaskWithMobileAssignmentId;
              } else{
                  response = MockResponseSrvyTaskWithoutMobileAssignmentId;
              }
          } else if (url === ''/**URLConstant.GetHtmlCodeFromMobile**/) {
              response = {
                  HtmlCode : 'Test'
              };
          }
          return of(response);
        }
      };

    const conf = TestBed.configureTestingModule({
      declarations: [ViewSurveyTaskDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: ActivatedRoute, useValue: routeSpy}
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(ViewSurveyTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized with mobile assignment Id', async () => {
    srvyTaskWithMobileAssignment = 0;
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should be initialized without mobile assignment Id', async () => {
    srvyTaskWithMobileAssignment = 1;
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get verf result with Id', function () {
    verfResultHWithId = 0;
    component.getVerfResult();
    expect(component).toBeTruthy();
  });

  it('should get verf result without Id', function () {
    verfResultHWithId = 1;
    component.getVerfResult();
    expect(component).toBeTruthy();
  });

  it('should get survey task', function () {
    component.getSrvyTask();
    expect(component).toBeTruthy();
  });

  it('should get html code from mobile', function () {
    component.getHtmlCodeFromMobile();
    expect(component).toBeTruthy();
  });
});
