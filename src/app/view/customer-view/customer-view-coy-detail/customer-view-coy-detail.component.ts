import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-coy-detail',
  templateUrl: './customer-view-coy-detail.component.html'
})
export class CustomerViewCoyDetailComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCoyMainDataMainInfo.json";
  }

}
