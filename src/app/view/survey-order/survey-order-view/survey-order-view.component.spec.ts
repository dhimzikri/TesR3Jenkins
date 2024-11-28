import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { SurveyOrderViewComponent } from './survey-order-view.component';
import { formatDate } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';

describe('SurveyOrderViewComponent', () => {
  let component: SurveyOrderViewComponent;
  let fixture: ComponentFixture<SurveyOrderViewComponent>;
  let httpSpy, routeSpy;

  beforeEach(() => {
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
        if (url == ''/**URLConstant.GetListSrvyTaskBySrvyOrderId**/) {
          response = {
            ReturnObject: [
              {
                Addr: '',
                City: '',
                AssignDt: formatDate('2021-10-01', 'yyyy-MM-dd', 'en-US'),
                CustAddr: '',
                CustName: '',
                CustNo: '',
                CustPhone: '',
                IsAddtReq: formatDate('2021-10-01', 'yyyy-MM-dd', 'en-US'),
                Kecamatan: '',
                Kelurahan: '',
                MobileAssignmentId: 10,
                MrCustModelCode: '',
                MrSrvyObjTypeCode: '',
                MrSurveyTaskStatCode: '',
                MrSurveyTypeCode: '',
                Notes: '',
                PrevSurveyorId: 10,
                PrevSurveyTaskNo: '',
                RefNo: '',
                RefReasonId: 10,
                ResultDt: formatDate('2021-10-01', 'yyyy-MM-dd', 'en-US'),
                Result: '',
                RetrieveDt: formatDate('2021-10-01', 'yyyy-MM-dd', 'en-US'),
                ReviewByRefUserId: 10,
                ReviewDt: formatDate('2021-10-01', 'yyyy-MM-dd', 'en-US'),
                ReviewNotes: '',
                RT: '',
                RW: '',
                SrvyFormSchmId: 10,
                SrvyOrderId: 10,
                SrvyTaskId: 10,
                SrvyTaskNo: '',
                SurveyorId: 10,
                Zipcode: ''
              }
            ]
          }
        }
        return of(response);
      }
    };
    routeSpy = {
      queryParams: of({
        SrvyTaskId: 'srvyTaskId'
      })
    };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyOrderViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: ActivatedRoute, useValue: routeSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SurveyOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  afterEach(() => {      
    TestBed.resetTestingModule();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized', async () => {
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

});
