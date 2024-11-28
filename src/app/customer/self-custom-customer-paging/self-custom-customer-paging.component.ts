import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-customer-paging',
  templateUrl: './self-custom-customer-paging.component.html'
})
export class SelfCustomCustomerPagingComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "CustomerpagingV2"
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
        this.adInsHelperService.OpenCustomerViewByCustIdForTemplate(row.CustId);
      }
      else
      {
        this.adInsHelperService.OpenCustomerCoyViewByCustIdForTemplate(row.CustId);
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
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUSTOM_CUST_COY_PAGE], param);
      }
    }
  }

}
