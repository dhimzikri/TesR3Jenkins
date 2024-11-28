import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-customer-shareholder-menu',
  templateUrl: './self-custom-customer-shareholder-menu.component.html'
})
export class SelfCustomCustomerShareholderMenuComponent implements OnInit {

  pageName: string;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) {
    this.pageName = "CustomerShareholderPagingV2"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {
    let row = ev.RowObj;

    if (ev.Key == "ViewShareholder") {
      if (row.ShareholderMrCustTypeCode == CommonConstant.CustTypePersonal)
      {
        this.adInsHelperService.OpenCustomerViewByCustId(row.ShareholderId);
      }
      else
      {
        this.adInsHelperService.OpenCustomerCoyViewByCustId(row.ShareholderId);
      }
    }

    if (ev.Key == "ViewMainCust") {
      this.adInsHelperService.OpenCustomerCoyViewByCustId(row.CustId);
    }

    if (ev.Action.key == "UpdateIsCustomer") {
      if(confirm("Update to Main Customer?")){
        var ReqByIdObj = new GenericObj();
        ReqByIdObj.Id = row.ShareholderId;
        this.http.post(this.UrlConstantNew.UpdateToMainCustomer, ReqByIdObj).subscribe(
          (response) => {
            this.toastr.successMessage(response['message']);
            window.location.reload();
          }
        )
      }
    }
  }
}
