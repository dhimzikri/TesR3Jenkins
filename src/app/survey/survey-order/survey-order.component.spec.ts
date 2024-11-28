import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { SurveyOrderComponent } from './survey-order.component';

describe('SurveyOrderComponent', function () {
  let component: SurveyOrderComponent;
  let fixture: ComponentFixture<SurveyOrderComponent>;


  beforeEach( async () => {
    const conf = TestBed.configureTestingModule({
      declarations: [SurveyOrderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  });

  it('should be created', function () {
    expect(component).toBeTruthy();
  });

  it('should run getCallback', function () {
    let event = {
        RowObj : {
            SrvyOrderId : 10
        }        
    }
    component.getCallback(event);
    expect(component).toBeTruthy();
  });

});
