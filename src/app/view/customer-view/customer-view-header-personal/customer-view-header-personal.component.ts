import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-customer-view-header-personal',
  templateUrl: './customer-view-header-personal.component.html'
})
export class CustomerViewHeaderPersonalComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  IdCust: number;

  constructor(public Translate: TranslateService, 
    private route: ActivatedRoute, 
    private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService,
    private adInsHelperService: AdInsHelperService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
      else if (queryParams["CustId"] != null) {
        this.IdCust = queryParams["CustId"];
      }
    });
    console.log(Translate);
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustPersonalHeader.json";
  }

  ClickLinkViewCustExposure() {
    this.adInsHelperService.OpenCustExposure(this.IdCust);
  }
}
