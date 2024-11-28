import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustPersonalContactPersonObj } from 'app/shared/model/cust-personal-contact-person-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-emergency-contact',
  templateUrl: './customer-view-personal-emergency-contact.component.html',
})
export class CustomerViewPersonalEmergencyContactComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {   
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustEmergency.json";
  }

}
