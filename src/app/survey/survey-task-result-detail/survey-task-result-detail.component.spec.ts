import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieModule, CookieService } from 'ngx-cookie';
import { of } from 'rxjs/observable/of';
import { formatDate } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { SurveyTaskResultDetailComponent } from './survey-task-result-detail.component';

const MockResponseVerfResultIdWithoutValue: any = {
    VerfResultId: 0
};

describe('SurveyTaskResultDetailComponent', () => {
    let component: SurveyTaskResultDetailComponent;
    let fixture: ComponentFixture<SurveyTaskResultDetailComponent>;
    let httpSpy, toastrSpy, routeSpy, cookieServiceSpy, fbSpy, routerSpy;
    let VerfResultId;

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
                if (url == ''/**URLConstant.GetVerfResultByTrxRefNoAndVerfTrxTypeCode**/) {
                    response = {
                        VerfResultId: 'VerfResultId'
                    }
                } else if (VerfResultId == '0') {
                    if( url == ''/**URLConstant.AddVerfResult**/){
                        response = {
                            VerfResultId : 'Id'
                        }
                    }
                } else if (url == ''/**URLConstant.GetSrvyOrderDataBySrvyOrderId**/) {
                    response = {
                        LobCode: 'LobCode'
                    }
                } else if (url == ''/**URLConstant.GetSrvyOrderBySrvyOrderId**/) {
                    response = {
                        TrxRefNo: 'TrxRefNo',
                        CustName: 'CustName',
                        SrvyOrderNo: 'SrvyOrderNo',
                    }
                } else if (url == ''/**URLConstant.GetSrvyTaskBySrvyTaskId**/) {
                    response = {
                        ResSrvyTaskObj: [
                            {
                                SrvyTaskId: 0,
                                SrvyOrderId: 0,
                                SrvyTaskNo: "",
                                MrSurveyTypeCode: "",
                                MrSurveyTaskStatCode: "",
                                MrSrvyObjTypeCode: "",
                                RefNo: "",
                                SurveyorId: 0,
                                RetrieveDt: formatDate('2021-10-04', 'yyyy-MM-dd', 'en-US'),
                                ResultDt: formatDate('2021-10-04', 'yyyy-MM-dd', 'en-US'),
                                ReviewByRefUserId: 0,
                                ReviewDt: formatDate('2021-10-04', 'yyyy-MM-dd', 'en-US'),
                                ReviewNotes: "",
                                IsAddtReq: false,
                                PrevSurveyTaskNo: "",
                                Result: "",
                                CustNo: "",
                                MrCustModelCode: "",
                                CustName: "",
                                CustAddr: "",
                                CustPhone: "",
                                Zipcode: "",
                                AssignDt: '',
                                SrvyFormSchmId: 0,
                                Notes: "",
                                RefReasonId: 0,
                                PrevSurveyorId: 0,
                                MobileAssignmentId: 0,
                                AreaCode1: "",
                                AreaCode2: "",
                                AreaCode3: "",
                                AreaCode4: "",
                                City: "",
                                Addr: "",
                                SrvySubjectId: 0,
                                SrvyObjectId: 0,
                                RowVersion: ""
                            }
                        ]
                    }
                } else if (url == ''/**URLConstant.GetSrvyFormSchmBySrvyFormSchmId**/) {
                    response = {
                        VerfSchemeHId: ''
                    }
                } else if (url == ''/**URLConstant.GetListActiveRefStatusByStatusGrpCode**/) {
                    response = {
                        ResponseObj: [
                            {
                                RefStatusId: '',
                                RefStatusCode: '',
                                Descr: '',
                                RefTrxTypeId: '',
                                ModuleCode: '',
                                StatusGrpCode: '',
                                IsActive: false
                            }
                        ]
                    }
                } else if (url == ''/**URLConstant.UpdateSrvyTaskAndAddVerfResultH**/) {
                    response = {
                        message: 'Success'
                    }
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
            })
          };
        cookieServiceSpy = {
        };
        fbSpy = {
            group: (controlsConfig: { [key: string]: any; }, extra?: { [key: string]: any; } | null) => {
                const SrvyTaskForm = new FormGroup({
                    MrVerfResultHStatCode: new FormControl('', Validators.required),
                    Notes: new FormControl('', Validators.required),
                    QuestionObjs: new FormArray([])
                });
                return SrvyTaskForm;
            }
        };

        const conf = TestBed.configureTestingModule({
            declarations: [SurveyTaskResultDetailComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
                RouterTestingModule.withRoutes([
                    { path: NavigationConstant.SURVEY_RESULT_REVIEW_PAGING },
                ]),
                CookieModule.forRoot()],
            providers: [
                { provide: HttpClient, useValue: httpSpy },
                { provide: NGXToastrService, useValue: toastrSpy },
                { provide: FormBuilder, useValue: fbSpy},
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: routeSpy },
                CookieService
            ]
        });

        await conf.compileComponents();
        fixture = TestBed.createComponent(SurveyTaskResultDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterAll(() => {
        fixture.destroy();  
    })

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

    it('should get verf result data', function () {
        component.GetVerfResultData();
        expect(component).toBeTruthy();
    });

    it('should get survey order', function () {
        component.getSrvyOrder();
        expect(component).toBeTruthy();
    });

    it('should get survey order data',  function () {
        component.getSrvyOrderData();
        expect(component).toBeTruthy();
    });

    it('should get survey task',  function () {
        component.getSrvyTask();
        expect(component).toBeTruthy();
    });

    it('should bind result obj',  function () {
        component.bindResultObj();
        expect(component).toBeTruthy();
    });

    it('should not be save form',  function () {
        component.isQuestionLoaded = false;
        component.Save();
        expect(component).toBeTruthy();
    });

    it('should be save form',  function () {
        component.Save();
        expect(component).toBeTruthy();
    });

    it('should be cancel',  function () {
        component.Cancel();
        expect(component).toBeTruthy();
    });

    it('should change result',  function () {
        component.ChangeResult();
        expect(component).toBeTruthy();
    });

    it('should be set survey verif data',  function () {
        component.setSurveyVerifData();
        expect(component).toBeTruthy();
    });
});
