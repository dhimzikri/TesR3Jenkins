import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { RouterTestingModule } from '@angular/router/testing';
import { SurveyorTaskAssignmentPagingComponent } from './surveyor-task-assignment-paging.component';

describe('SurveyorTaskAssignmentPagingComponent', () => {
  let component: SurveyorTaskAssignmentPagingComponent;
  let fixture: ComponentFixture<SurveyorTaskAssignmentPagingComponent>;
  let httpSpy, toastrSpy, fbSpy, routeSpy, routerSpy;

  beforeEach(async () => {
    routerSpy = {
        navigate: (commands: any[], extras?: NavigationExtras) => {
          return new Promise<boolean>(resolve => resolve(true));
        }
      };
    const conf = TestBed.configureTestingModule({
      declarations: [SurveyorTaskAssignmentPagingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([
          {path: NavigationConstant.SURVEYOR_PAGING},
        ]),ReactiveFormsModule
      ],
      providers: [
        {provide: FormBuilder, useValue: fbSpy},
        {provide: HttpClient, useValue: httpSpy},
        {provide: ActivatedRoute, useValue: routeSpy},
        {provide: NGXToastrService, useValue: toastrSpy},
        { provide: Router, useValue: routerSpy },
      ]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyorTaskAssignmentPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should be initialized', function () {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get call back with TransactionRefNo', function () {
    const ev = {
      RowObj: {
          TransactionRefNo: 'APPNO1'
      }
    }
    component.viewApp(ev);
    expect(component).toBeTruthy();
  });

  it('should get call back without TransactionRefNo', function () {
    const ev = {
        RowObj: {
            TransactionRefNo: ''
        }
    }
    component.viewApp(ev);
    expect(component).toBeTruthy();
  });
});
