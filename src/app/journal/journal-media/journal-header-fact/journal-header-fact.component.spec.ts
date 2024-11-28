import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JournalHeaderFactComponent } from './journal-header-fact.component';

describe('JournalHeaderFactComponent', () => {
  let component: JournalHeaderFactComponent;
  let fixture: ComponentFixture<JournalHeaderFactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalHeaderFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalHeaderFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
