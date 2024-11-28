import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactPersonAddEditComponent } from './contact-person-add-edit.component';

describe('ContactPersonAddEditComponent', () => {
  let component: ContactPersonAddEditComponent;
  let fixture: ComponentFixture<ContactPersonAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPersonAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPersonAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
