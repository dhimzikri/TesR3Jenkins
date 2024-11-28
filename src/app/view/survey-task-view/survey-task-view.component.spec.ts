import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { SurveyTaskViewComponent } from './survey-task-view.component';

const MockResponseSysConfigWithValue: any = {
    ConfigValue: 1
};

const MockResponseSysConfigWithoutValue: any = {
    ConfigValue: 0
};

const MockCookieValue: any = {
  'UserName': `user1`,
  'RoleCode': `BM`
}

describe('SurveyTaskViewComponent', () => {
  let component: SurveyTaskViewComponent;
  let fixture: ComponentFixture<SurveyTaskViewComponent>;
  let httpSpy, routeSpy, cookieServiceSpy;
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
        if (url === ''/**URLConstant.GetSysConfigPncplResultByCode**/) {
            if(sysConfigValue == '0'){
              response = MockResponseSysConfigWithoutValue;
            }else{
              response = MockResponseSysConfigWithValue;
            }
        } else if (url === ''/**URLConstant.GetSrvyTaskBySrvyTaskId**/) {
          response = {
            SrvyTaskNo : 'SRVYTASKNO1',
            SrvyOrderId: 1
          };
        } else if (url === ''/**URLConstant.GetSrvyOrderBySrvyOrderId**/) {
            response = {
              SrvyOrderNo: 'SRVYORDERNO1'
            }
        }
        return of(response);
      }
    };
    routeSpy = {
        queryParams: of({
          SrvyTaskId: 1
        })
      };
    const conf = TestBed.configureTestingModule({
      declarations: [SurveyTaskViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: CookieService, useValue: cookieServiceSpy}
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized with value 0', async () => {
    sysConfigValue = '0';
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should be initialized with value 1', async () => {
    sysConfigValue = '1';
    await component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get srvy task no', function () {
    component.GetSrvyTaskNo();
    expect(component).toBeTruthy();
  });

  it('should get srvy order no', function () {
    component.GetSrvyOrderNo();
    expect(component).toBeTruthy();
  });
});
