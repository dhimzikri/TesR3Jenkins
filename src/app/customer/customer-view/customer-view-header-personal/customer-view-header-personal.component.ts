import { UcviewgenericComponent } from '@adins/ucviewgeneric';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-header-personal',
  templateUrl: './customer-view-header-personal.component.html'
})
export class CustomerViewHeaderPersonalComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  private viewGeneric: UcviewgenericComponent;
  @ViewChild('viewGeneric') set content(content: UcviewgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.viewGeneric = content;
    }
  }

  constructor(private UrlConstantNew: UrlConstantNew) { }
  
  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustPersonalHeader.json";
  }
  
  ReloadUcViewGeneric() {
    this.viewGeneric.initiateForm();
  }
}


