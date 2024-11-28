import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ho-address-info',
  templateUrl: './ho-address-info.component.html',
  styleUrls: ['./ho-address-info.component.scss']
})
export class HoAddressInfoComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHOInfoLegalAddr.json";
  }

}
