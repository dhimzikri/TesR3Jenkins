import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { SurveyTaskComponent } from './survey-task.component';

describe('SurveyTaskComponent', function () {
  let component: SurveyTaskComponent;
  let fixture: ComponentFixture<SurveyTaskComponent>;


  beforeEach( async () => {
    const conf = TestBed.configureTestingModule({
      declarations: [SurveyTaskComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    await conf.compileComponents();
    fixture = TestBed.createComponent(SurveyTaskComponent);
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
            srvyTaskId : 10
        }        
    }
    component.getCallback(event);
    expect(component).toBeTruthy();
  });

});
