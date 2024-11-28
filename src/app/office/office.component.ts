import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html'
})

export class OfficeComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.OFFICE_ADD;

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.isSearched = true;
    this.inputPagingObj.delay = 200;

  }
}
