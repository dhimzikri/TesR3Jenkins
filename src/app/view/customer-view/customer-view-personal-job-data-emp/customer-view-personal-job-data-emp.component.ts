import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-emp',
  templateUrl: './customer-view-personal-job-data-emp.component.html',
  styleUrls: ['./customer-view-personal-job-data-emp.component.scss']
})
export class CustomerViewPersonalJobDataEmpComponent implements OnInit {
  viewCustMainDataMainInfo : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataEmp : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataEmpOthBiz : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataOthBizAdress : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataAddressEmp : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  viewCustPreviousJobDataEmp : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustPreviousJobAddressEmp : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.viewCustJobDataAddressEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmp.json";
    this.viewCustJobDataEmpOthBiz.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataOthBizAdress.viewInput =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";

    this.viewCustPreviousJobDataEmp.viewInput =  "./assets/ucviewgeneric/viewCustPreviousJobDataEmp.json";
    this.viewCustPreviousJobAddressEmp.viewInput =  "./assets/ucviewgeneric/viewCustPreviousJobAddressEmp.json";
  }
}
