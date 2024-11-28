import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-personal-detail',
  templateUrl: './customer-view-personal-detail.component.html',
  styleUrls: ['./customer-view-personal-detail.component.scss']
})
export class CustomerViewPersonalDetailComponent implements OnInit {
  viewCustMainDataMainInfo : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustMainDataContactInformation: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  constructor(private UrlConstantNew: UrlConstantNew) {
  }

  ngOnInit() {
    console.log("terpanggil");
    this.viewCustMainDataMainInfo.viewInput =  "./assets/ucviewgeneric/viewCustMainDataMainInfo.json";
    this.viewCustMainDataContactInformation.viewInput  = "./assets/ucviewgeneric/viewCustMainDataContactInformation.json";
  }
}
