import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-master-paging',
  templateUrl: './master-paging.component.html'
})
export class MasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.CS_MASTER_DETAIL;
  constructor(private UrlConstantNew: UrlConstantNew) {

  }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchMaster.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchMaster.json";
  }
}
