import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieModule, CookieService } from 'ngx-cookie';
import { SurveyResultReviewDetailComponent } from './survey-result-review-detail.component';
import { of } from 'rxjs/observable/of';
import { formatDate } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationConstant } from 'app/shared/NavigationConstant';

describe('SurveyResultReviewDetailComponent', () => {
  let component: SurveyResultReviewDetailComponent;
  let fixture: ComponentFixture<SurveyResultReviewDetailComponent>;
  let httpSpy, toastrSpy, routeSpy, cookieServiceSpy, fbSpy, routerSpy;

  beforeEach(async () => {
    httpSpy = {
      post: (url: string, body: any | null, options?: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
        observe?: 'body';
        params?: HttpParams | { [param: string]: string | string[]; };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
      }) => {
        let response: Object;
        if (url == '' /**URLConstant.GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview**/) {
          response = {
            ReturnObj: [
              {
                SurveyTaskId: '',
                SurveyOrderId: '',
                ResurveyRef: '',
                SurveyTaskNo: '',
                SurveyeeModel: '',
                SurveyObject: '',
                SurveyeeName: '',
                Address: '',
                SurveyType: '',
                SurveyorName: '',
                SurveyTaskStatus: '',
                SurveyFormSchm: '',
                Surveyor: '',
                RefNo: '',
                Zipcode: '',
                CustNo: '',
                CustId: '',
                ResultDate: formatDate('2021-10-01', 'yyyy-MM-dd', 'en-US'),
                ReviewComment: ''
              }
            ]
          }
        } else if (url == '' /**URLConstant.ReviewSurveyResult**/) {
          response = {
            message: 'Success'
          };
        }
        return of(response);
      }
    };
    toastrSpy = jasmine.createSpyObj('NGXToastrService', ['successMessage', 'warningMessage']);
    routerSpy = {
      navigate: (commands: any[], extras?: NavigationExtras) => {
        return new Promise<boolean>(resolve => resolve(true));
      }
    };
    routeSpy = {
      queryParams: of({
        SrvyTaskId: 'srvyTaskId'
      })
    };
    cookieServiceSpy = {
    };
    fbSpy = {
      group: (controlsConfig: { [key: string]: any; }, extra?: { [key: string]: any; } | null) => {
        let array: FormGroup[] = [];
        array.push(new FormGroup({
          SurveyTaskId: new FormControl(),
          SurveyOrderId: new FormControl(),
          ResurveyRef: new FormControl(),
          SurveyTaskNo: new FormControl(),
          SurveyeeModel: new FormControl(),
          SurveyObject: new FormControl(),
          SurveyeeName: new FormControl(),
          Address: new FormControl(),
          SurveyType: new FormControl(),
          SurveyorName: new FormControl(),
          SurveyTaskStatus: new FormControl(),
          SurveyFormSchm: new FormControl(),
          Surveyor: new FormControl(),
          RefNo: new FormControl(),
          Zipcode: new FormControl(),
          CustNo: new FormControl(),
          CustId: new FormControl(),
          ResultDate: new FormControl(),
          ReviewComment: new FormControl()
        }));
        let listSurveyTask = new FormArray(array);
        const SurveyTaskForm = new FormGroup({
          ListSurveyTask: listSurveyTask
        });
        return SurveyTaskForm;
      }
    };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyResultReviewDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
            {path: NavigationConstant.SURVEY_RESULT_REVIEW_PAGING},
          ]),
          CookieModule.forRoot()],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: NGXToastrService, useValue: toastrSpy },
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
        CookieService
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyResultReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized', async () => {
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get survey task list data', function () {
    component.getSurveyTaskListData();
    expect(component).toBeTruthy();
  });

  it('should run save form', function () {
    component.SaveForm();
    expect(component).toBeTruthy();
  });

});
