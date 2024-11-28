import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CookieService } from 'ngx-cookie';
import { SurveyResultReviewPagingComponent } from './survey-result-review-paging.component';

describe('SurveyResultReviewPagingComponent', () => {
  let component: SurveyResultReviewPagingComponent;
  let fixture: ComponentFixture<SurveyResultReviewPagingComponent>;
  let httpSpy, toastrSpy, routerSpy, cookieServiceSpy;

  beforeEach(async () => {
    httpSpy = {
    };
    toastrSpy = {
    };
    routerSpy = {
      navigate: (commands: any[], extras?: NavigationExtras) => {
        return new Promise<boolean>(resolve => resolve(true));
      }
    };
    cookieServiceSpy = {
    };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyResultReviewPagingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: NGXToastrService, useValue: toastrSpy},
        {provide: Router, useValue: routerSpy},
        {provide: CookieService, useValue: cookieServiceSpy}
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyResultReviewPagingComponent);
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

  it('should be directed with TrxRefNo', function (){
    let event = {
      RowObj : {
        TrxRefNo : "trxRefNo"
      }        
  }
    component.viewApp(event);
    expect(component).toBeTruthy();
  });

  it('should be directed without TrxRefNo', function (){
    let event = {
      RowObj : {
        TrxRefNo : ""
      }        
  }
    component.viewApp(event);
    expect(component).toBeTruthy();
  });

});
