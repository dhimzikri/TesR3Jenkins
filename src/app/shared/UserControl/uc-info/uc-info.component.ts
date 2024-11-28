import { Component, OnInit, Input } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';
@Component({
  selector: 'app-uc-info',
  templateUrl: './uc-info.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UcInfoComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
  @Input() resultData: any;
  @Input() parentForm: any;
  @Input() useName: any = true;
  @Input() useTitle: any = true;
  @Input() useEmail2: any = true;
  jsonData: any;
  mobilePhn1: any;
  mobilePhn2: any;
  email1: any;
  email2: any;
  cntctPersonName: any;
  cntctPersonJobTitle: any;

  setData(data) {
    if (this.useName) {
      this.cntctPersonName = data.cntctPersonName;
    }
    if (this.useTitle) {
      this.cntctPersonJobTitle = data.cntctPersonJobTitle;
    }
    this.mobilePhn1 = data.mobilePhn1;
    this.mobilePhn2 = data.mobilePhn2;
    this.email1 = data.email1;
    if (this.useEmail2) {
      this.email2 = data.email2;
    }
  }

}