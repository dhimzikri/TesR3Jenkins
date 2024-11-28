import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { SurveyorPagingComponent } from './surveyor-paging.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SurveyorPagingComponent', () => {
  let component: SurveyorPagingComponent;
  let fixture: ComponentFixture<SurveyorPagingComponent>;
  let httpSpy, toastrSpy, fbSpy, routeSpy, routerSpy;

  beforeEach(async () => {
    routerSpy = {
        navigate: (commands: any[], extras?: NavigationExtras) => {
          return new Promise<boolean>(resolve => resolve(true));
        }
      };

    const conf = TestBed.configureTestingModule({
      declarations: [SurveyorPagingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([
          {path: NavigationConstant.SURVEYOR_ADD},
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
    fixture = TestBed.createComponent(SurveyorPagingComponent);
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
});
