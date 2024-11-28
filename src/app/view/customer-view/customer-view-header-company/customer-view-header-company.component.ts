import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-customer-view-header-company',
  templateUrl: './customer-view-header-company.component.html'
})
export class CustomerViewHeaderCompanyComponent implements OnInit {
  IdCust: number; 
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private route: ActivatedRoute, 
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
  }
  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCompanyHeader.json";
  }

  ClickLinkViewCustExposure() {
    this.adInsHelperService.OpenCustExposure(this.IdCust);
  }
}
