import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj, WhereValueObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-customer-view-personal-contact-person',
  templateUrl: './customer-view-personal-contact-person.component.html'
})
export class CustomerViewPersonalContactPersonComponent implements OnInit {
  viewCustPersonalEmergencyContactPersonObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew){
  }

  ngOnInit() {
    this.viewCustPersonalEmergencyContactPersonObj.viewInput  =  "./assets/ucviewgeneric/viewCustPersonalEmergencyContactPerson.json";
  }
}
