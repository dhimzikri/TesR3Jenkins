import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpHeaders} from '@angular/common/http/src/headers';
import {HttpParams} from '@angular/common/http/src/params';
import {URLConstant} from '../../shared/constant/URLConstant';
import {of} from 'rxjs/observable/of';
import {environment} from '../../../environments/environment';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavigationExtras} from '@angular/router/src/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NGXToastrService} from '../../components/extra/toastr/toastr.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SurveyorAddComponent } from './surveyor-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { BehaviorSubject } from 'rxjs';

const MockResponseRefMasterSurveyor: any = {
  ReturnObject:[
      {
        'Key': 'EXTERNAL_SURVEYOR',
        'Value': 'External'
      },
      {
        'Key': 'INTERNAL_SURVEYOR',
        'Value': 'Internal'
      }
  ]
};

export class setAddCritInput {
}

const MockEvent: Array<any> = [
    {
      isActive: true,
      ResultId: 1
    },
    {
      isActive: false,
      ResultId: 1
    }
  ];

describe('SurveyorAddComponent', function () {
  let component: SurveyorAddComponent;
  let fixture: ComponentFixture<SurveyorAddComponent>;
  let httpSpy, toastrSpy, fbSpy, routerSpy, routeSpy;

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
        if (url === ''/**URLConstant.GetListActiveRefMaster**/) {
            response = MockResponseRefMasterSurveyor;
        } else if (url === ''/**URLConstant.GetSurveyorBySurveyorId**/) {
          response = {
            SurveyorId: 1,
            SurveyorNo: 'SVY01',
            CenterGrpId: 34,
            RefUserId: 46,
            VendorId: 1,
            MrSurveyorTypeCode: 'EXTERNAL_SURVEYOR',
            WorkloadAmt: 10,
            CurrWorkloadAmt: 5,
            IsActive: 1
          };
        } else if (url === ''/**URLConstant.GetCenterGrpById**/) {
            response = {
                CenterGrpId : 34,
                CenterGrpCode : 'SURVEYORGRP1',
                CenterGrpName : 'SURVEYORGRP1',
                MrCenterGrpTypeCode : 'SRVY_GRP',
                IsActive : 1
            }
        } else if (url === ''/**URLConstant.GetVendorByVendorId**/) {
            response = {
                VendorId : 1,
                VendorName : 'VENDOR1'
            };
        } else if (url === ''/**URLConstant.GetRefUserById**/) {
          response = {
            RefUserId : 1,
            Username : 'user1',
            RefEmpId : 1,
            FailPwdCount : 0,
            IsLockedOut : 0,
            IsActive : 1,
            IsLoggedIn : 1,
            LoggedInMethod : 'DB',
            LastIpAddress : null,
            LastLoggedIn : null,
            LastLoggedOut : null,
            ExpiredDt : null,
            Key : null,
            Token : null,
            LockedOutReason : null,
            LockedUntil : null,
            RowVersion : null,
          };
        } else if (url === ''/**URLConstant.AddSurveyor**/) {
            response = {
                message: 'Success'
              };
        }else if (url === ''/**URLConstant.EditSurveyor**/) {
            response = {
                message: 'Success'
              };
        }
        return of(response);
      }
    };
    routeSpy = {
        queryParams: of({
          SurveyorId: null
        })
      };
    toastrSpy = jasmine.createSpyObj('NGXToastrService', ['successMessage', 'warningMessage']);
    fbSpy = {
        group: (controlsConfig: { [key: string]: any; }, extra?: { [key: string]: any; } | null) => {
          const SurveyorForm = new FormGroup({
            SurveyorType: new FormControl('INTERNAL_SURVEYOR', Validators.required),
            UserId: new FormControl('', Validators.required),
            SurveyorGroupId: new FormControl('', Validators.required),
            VendorGroupId: new FormControl(''),
            SurveyorNo: new FormControl('Test', Validators.required),
            Workload: new FormControl('', Validators.required),
            CurrWorkloadAmt: new FormControl('', Validators.required),
            IsActive: new FormControl(false)
          });
          return SurveyorForm;
        }
      };
    routerSpy = {
      navigate: (commands: any[], extras?: NavigationExtras) => {
        return new Promise<boolean>(resolve => resolve(true));
      }
    };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyorAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
            {path: NavigationConstant.SURVEYOR_PAGING},
          ])],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: NGXToastrService, useValue: toastrSpy},
        FormBuilder,
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: Router, useValue: routerSpy},
        FormGroupDirective
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized with page type add', function () {
    component.pageType = 'add';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should be initialized with page type edit', function () {
    component.pageType = 'edit';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get lookup username', function () {
    const event = {
      UserId: 1
    }
    component.getLookupUsername(event);
    expect(component).toBeTruthy();
  });

  it('should get lookup surveyor group', function () {
    const event = {
      SurveyorGroupId: 1
    }
    component.getLookupSurveyorGroup(event);
    expect(component).toBeTruthy();
  });

  it('should lookup vendor group', function () {
    const event = {
      VendorGroupId: 1
    }
    component.getLookupVendorGroup(event);
    expect(component).toBeTruthy();
  });

  it('should be save form with type add', function () {
    component.pageType = 'add';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should be save form with type edit', function () {
    component.pageType = 'edit';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
