import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';


@Component({
  selector: 'app-custom-economic-sector-paging-x',
  templateUrl: './custom-economic-sector-paging-x.component.html'
})
export class CustomEconomicSectorXComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "EconomicSectorXCNAF"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {
    let row = ev.RowObj;

    if (ev.Key == "ViewCust") {
      if (row.MrCustTypeCode == CommonConstant.CustTypePersonal)
      {
        this.adInsHelperService.OpenCustomerViewByCustId(row.CustId);
      }
      else
      {
        this.adInsHelperService.OpenCustomerCoyViewByCustId(row.CustId);
      }
    }

    if (ev.Action.key == "EditCustomerDetail")
    {
      let param = { "IdCust": row.CustId };

      if (row.MrCustTypeCode == CommonConstant.CustTypePersonal)
      {
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.SELF_CUSTOM_CUST_PERSONAL_PAGE], param);
      }
      else
      {
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_COY_PAGE], param);
      }
    }
  }

}
