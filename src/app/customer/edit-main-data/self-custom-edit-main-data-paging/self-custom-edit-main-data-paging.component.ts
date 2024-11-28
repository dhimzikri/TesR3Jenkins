import { Component, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-edit-main-data-paging',
  templateUrl: './self-custom-edit-main-data-paging.component.html'
})
export class SelfCustomEditMainDataPagingComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService) {
    this.pageName = "EditMainDataPagingV2"
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
  }

}
