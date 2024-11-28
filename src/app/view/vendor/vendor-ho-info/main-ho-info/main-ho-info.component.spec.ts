import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainHoInfoComponent } from './main-ho-info.component';

describe('MainHoInfoComponent', () => {
  let component: MainHoInfoComponent;
  let fixture: ComponentFixture<MainHoInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
