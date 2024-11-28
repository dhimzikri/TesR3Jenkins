import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgForm, ControlContainer } from '@angular/forms';
@Component({
  selector: 'app-ucContactInfo',
  templateUrl: './ucContactInfo.component.html',
  providers: [DecimalPipe],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UcContactInfoComponent implements OnInit {
  @Input() resultData: any;
  @Input() parentForm: any;
  @Input() useName: any = true;
  @Input() useTitle: any = true;
  @Input() useEmail2: any = true;
  @Input() identifier: any = "";
  jsonData: any;
  mobilePhn1: any;
  mobilePhn2: any;
  email1: any;
  email2: any;
  cntctPersonName: any;
  cntctPersonJobTitle: any;

  constructor() {
  }
  
  ngOnInit() { }

  setData(data) {
    if (this.useName) {
      this.cntctPersonName = data.cntctPersonName;
    }
    if (this.useTitle) {
      this.cntctPersonJobTitle = data.cntctPersonJobTitle;
    }
    this.mobilePhn1 = data.cntctPersonMobilePhn1;
    this.mobilePhn2 = data.cntctPersonMobilePhn2;
    this.email1 = data.cntctPersonEmail1;
    if (this.useEmail2) {
      this.email2 = data.cntctPersonEmail2;
    }
  }

}