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
import { SurveyTaskAssignmentDetailComponent } from './survey-task-assignment-detail.component';
import { noUndefined } from '@angular/compiler/src/util';

describe('SurveyTaskAssignmentDetailComponent', () => {
    let component: SurveyTaskAssignmentDetailComponent;
    let fixture: ComponentFixture<SurveyTaskAssignmentDetailComponent>;
    let httpSpy, toastrSpy, routeSpy, cookieServiceSpy, fbSpy, routerSpy;
    let surveyTaskId, username;

    surveyTaskId = 1;
    username = 'user1';

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
                if (url == ''/**URLConstant.GetListSrvyTaskBySrvyOrderIdForUpdate**/) {
                    response = {
                        ReturnObj: [
                            {
                                SrvyTaskId: '',
                                SrvyOrderId: '',
                                SrvyTaskNo: '',
                                MrSurveyTypeCode: '',
                                MrSurveyTaskStatCode: '',
                                MrSrvyObjTypeCode: '',
                                RefNo: '',
                                SurveyorId: '',
                                SurveyorName: '',
                                RetrieveDt: '',
                                ResultDt: '',
                                ReviewByRefUserId: '',
                                ReviewDt: '',
                                ReviewNotes: '',
                                IsAddtReq: '',
                                PrevSurveyTaskNo: '',
                                Result: '',
                                CustNo: '',
                                CustId: '',
                                MrCustModelCode: '',
                                CustName: '',
                                CustAddr: '',
                                CustPhone: '',
                                Zipcode: '',
                                AssignDt: '',
                                SrvyFormSchmId: '',
                                SrvyFormSchmName: '',
                                Notes: '',
                                RefReasonId: '',
                                PrevSurveyorId: '',
                                MobileAssignmentId: '',
                                Kelurahan: '',
                                Kecamatan: '',
                                RT: '',
                                RW: '',
                                City: '',
                                Addr: '',
                            }
                        ]
                    }
                } else if (url == ''/**URLConstant.GetSrvyFormSchmBySrvyFormSchmId**/) {
                    response = {
                        ReturnObj: [
                            {
                                SurveyTaskId: '',
                                SurveyTaskNo: '',
                                SurveyeeModel: '',
                                SurveyObject: '',
                                SurveyeeName: '',
                                Address: '',
                                SurveyTaskStatus: '',
                                SurveyType: '',
                                Surveyor: '',
                                SurveyForm: '',
                                National: 'Yes',
                                RefNo: '',
                                Zipcode: '',
                                CustNo: '',
                                SurveyorName: '',
                                CustId: '',
                            }
                        ]
                    }
                } else if (url == ''/**URLConstant.GetRefMasterListKeyValueActiveByCode**/) {
                    response = {
                        ReturnObj: [
                            {
                                RefMasterId: '',
                                MasterCode: '',
                                Descr: '',
                                RefMasterTypeCode: '',
                                SeqNo: '',
                                ReserveField1: '',
                                ReserveField2: '',
                                ReserveField3: '',
                                ReserveField4: '',
                                ReserveField5: '',
                                IsDeletable: false,
                                IsSystem: false,
                                IsActive: false,
                                MappingCode: '',
                                IsDefaultValue: false,
                                DefaultValue: ''
                            }
                        ]
                    }
                } else if (url == ''/**URLConstant.GetListKeyValueSrvyFormSchm**/) {
                    response = {
                        ReturnObj: [
                            {
                                SrvyFormSchmId: '',
                                SrvyFormSchmCode: '',
                                SrvyFormSchmName: '',
                                VerfSchemeHId: '',
                                IsActive: false
                            }
                        ]
                    }
                } else if (url == ''/**URLConstant.CancelSurveyTaskBySurveyTaskId**/) {
                    response = {
                        message: 'Survey Task has been cancelled!'
                    }
                } else if (url == ''/**URLConstant.EditSrvyTaskAndSendToMobile**/) {
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
                    SurveyTaskNo: new FormControl(),
                    SurveyeeModel: new FormControl(),
                    SurveyObject: new FormControl(),
                    SurveyeeName: new FormControl(),
                    Address: new FormControl(),
                    SurveyTaskStatus: new FormControl(),
                    SurveyType: new FormControl(),
                    Surveyor: new FormControl(),
                    SurveyForm: new FormControl(),
                    National: new FormControl(),
                    RefNo: new FormControl(),
                    Zipcode: new FormControl(),
                    CustNo: new FormControl(),
                    SurveyorName: new FormControl(),
                    CustId: new FormControl(),
                }));
                let listSurveyTask = new FormArray(array);
                const SurveyTaskForm = new FormGroup({
                    ListSurveyTask: listSurveyTask
                });
                return SurveyTaskForm;
            }
        };

        const conf = TestBed.configureTestingModule({
            declarations: [SurveyTaskAssignmentDetailComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
                RouterTestingModule.withRoutes([
                    { path: NavigationConstant.SURVEY_RESULT_REVIEW_PAGING },
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
        fixture = TestBed.createComponent(SurveyTaskAssignmentDetailComponent);
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

    it('should get survey task list data', function () {
        component.getSurveyTaskListData();
        expect(component).toBeTruthy();
    });

    it('should get dropdown', function () {
        component.getDropdown();
        expect(component).toBeTruthy();
    });

});
