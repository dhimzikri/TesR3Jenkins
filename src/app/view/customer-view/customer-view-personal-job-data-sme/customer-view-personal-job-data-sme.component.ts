import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-sme',
  templateUrl: './customer-view-personal-job-data-sme.component.html',
  styleUrls: ['./customer-view-personal-job-data-sme.component.scss']
})
export class CustomerViewPersonalJobDataSmeComponent implements OnInit {
  viewCustJobDataSme: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataAddressEmp: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataEmpOthBiz: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataOthBizAdress: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.viewCustJobDataSme.viewInput =  "./assets/ucviewgeneric/viewCustJobDataSme.json";
    this.viewCustJobDataAddressEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataEmpOthBiz.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataOthBizAdress.viewInput =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
  }
}
