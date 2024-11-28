import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-personal-job-data',
  templateUrl: './customer-view-personal-job-data.component.html',
  styleUrls: ['./customer-view-personal-job-data.component.scss']
})
export class CustomerViewPersonalJobDataComponent implements OnInit {
  viewCustJobData : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewCustJobDataAddress : UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.viewCustJobData.viewInput =  "./assets/ucviewgeneric/viewCustJobData.json";
    this.viewCustJobDataAddress.viewInput = "./assets/ucviewgeneric/viewCustJobDataAddress.json";
  }
}
