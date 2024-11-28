import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-office-area-paging',
  templateUrl: './office-area-paging.component.html'
})
export class OfficeAreaPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.OFFICE_AREA_DETAIL;

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeArea.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeArea.json";
  }
}
