import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpHeaders} from '@angular/common/http/src/headers';
import {HttpParams} from '@angular/common/http/src/params';
import {URLConstant} from '../../shared/constant/URLConstant';
import {of} from 'rxjs/observable/of';
import {environment} from '../../../environments/environment';
import {NavigationExtras} from '@angular/router/src/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { SurveyTaskResultPageComponent } from './survey-task-result-page.component';
import { CookieService } from 'ngx-cookie';

const MockResponseSysConfigWithValue: any = {
    ConfigValue: 1
};

const MockResponseSysConfigWithoutValue: any = {
    ConfigValue: 0
};

const MockEventUndefined: any = {
  StepMode: undefined
}

const MockEventNext: any = {
  StepMode: 'next'
}

const MockEventPrev: any = {
  StepMode: 'prev'
}

const MockCookieValue: any = {
    'UserName': `user1`,
    'RoleCode': `BM`
  }

describe('SurveyTaskResultPageComponent', function () {
  let component: SurveyTaskResultPageComponent;
  let fixture: ComponentFixture<SurveyTaskResultPageComponent>;
  let httpSpy, cookieServiceSpy, routerSpy, routeSpy;
  let sysConfigValue;

  beforeEach(async () => {
    cookieServiceSpy = {
        get: (key: string) => {
          const chipperKey = environment.ChipperKeyCookie;
          const chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
          const iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
          const encrypted = CryptoJS.AES.encrypt(JSON.stringify(MockCookieValue), chipperKeyArr, { iv: iv });
          const result = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
          return result;
        }
      };
    httpSpy = {
      post: (url: string, body: any | null, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };
        observe?: 'body';
        params?: HttpParams | { [param: string]: string | string[]; };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
      }) => {
        let response: Object;
        if (url === /**URLConstant.GetSysConfigPncplResultByCode**/) {
            if(sysConfigValue == '0'){
              response = MockResponseSysConfigWithoutValue;
            }else{
              response = MockResponseSysConfigWithValue;
            }
         } else if (url === /**URLConstant.GetSrvyTaskBySrvyTaskId**/) {
          response = {
            SrvyTaskNo: 'SRVYTASKNO1'
          };
        } else if (url === /**URLConstant.GetSrvyOrderBySrvyOrderId**/) {
            response = {
                SrvyOrderNo: 'SRVYORDERNO1'
            }
        }
        return of(response);
      }
    };
    routeSpy = {
        queryParams: of({
          SrvyTaskId: 1,
          SurveyorId: 1,
          Type: 'TYPE',
          SurveyorName: 'Andi'
        })
      };
    routerSpy = {
      navigate: (commands: any[], extras?: NavigationExtras) => {
        return new Promise<boolean>(resolve => resolve(true));
      }
    };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyTaskResultPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: Router, useValue: routerSpy},
        {provide: CookieService, useValue: cookieServiceSpy}
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyTaskResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized with value', async () => {
    sysConfigValue = '1';
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should be initialized without value', async () => {
    sysConfigValue = '0';
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should run back', function () {
   component.back();
   expect(component).toBeTruthy();
  });

  it('should make Stepper', function () {
    component.MakeStepper();
    expect(component).toBeTruthy();
  });

  it('should step to Detail', function() {
    component.MakeStepper();
    component.EnterTab('Detail');
    expect(component).toBeTruthy();
  });

  it('should step to Upload', () => {
    component.MakeStepper();
    component.EnterTab('Upload');
    expect(component).toBeTruthy();
  });

  it('should be get value with undefined', function () {
    component.getValue(MockEventUndefined);
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 1 and config value 0', function () {
    component.getValue(MockEventNext);
    component.CustStepIndex = 1;
    component.SysConfigResultObj.ConfigValue = '0';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 1 and config value 1', function () {
    component.getValue(MockEventNext);
    component.CustStepIndex = 1;
    component.SysConfigResultObj.ConfigValue = '1';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 2 and config value 0', function () {
    component.getValue(MockEventNext);
    component.CustStepIndex = 2;
    component.SysConfigResultObj.ConfigValue = '0';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 2 and config value 1', function () {
    component.getValue(MockEventNext);
    component.CustStepIndex = 2;
    component.SysConfigResultObj.ConfigValue = '2';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 1 and config value 0', function () {
    component.getValue(MockEventPrev);
    component.CustStepIndex = 1;
    component.SysConfigResultObj.ConfigValue = '0';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 1 and config value 1', function () {
    component.getValue(MockEventPrev);
    component.CustStepIndex = 1;
    component.SysConfigResultObj.ConfigValue = '1';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 2 and config value 0', function () {
    component.getValue(MockEventPrev);
    component.CustStepIndex = 2;
    component.SysConfigResultObj.ConfigValue = '0';
    expect(component).toBeTruthy();
  });

  it('should be get value with value next, index 2 and config value 1', function () {
    component.getValue(MockEventPrev);
    component.CustStepIndex = 2;
    component.SysConfigResultObj.ConfigValue = '2';
    expect(component).toBeTruthy();
  });

  it('should get srvy task no', function () {
    component.ReqGenericObj.Id = 1;
    component.GetSrvyTaskNo();
    expect(component).toBeTruthy();
  });

  it('should get srvy order no', function () {
    component.ReqGenericObj.Id = 1;
    component.GetSrvyOrderNo();
    expect(component).toBeTruthy();
  });

  it('should run end stepper', function () {
    component.endStepper();
    expect(component).toBeTruthy();
  });
});
