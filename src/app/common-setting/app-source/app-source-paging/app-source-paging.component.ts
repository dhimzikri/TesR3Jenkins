import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-app-source-paging',
  templateUrl: './app-source-paging.component.html'
})
export class AppSourcePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private router: Router, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAppSource.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAppSource.json";
  }

  AddClick() {
    AdInsHelper.RedirectUrl(this.router, ["/CommonSetting/AppSource/Detail"], { "mode": "Add" })
  }
}
