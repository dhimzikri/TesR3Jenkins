import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-customer-family-menu',
  templateUrl: './self-custom-customer-family-menu.component.html'
})
export class SelfCustomCustomerFamilyMenuComponent implements OnInit {

  pageName: string;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) {
    this.pageName = "CustomerFamilyPagingV2"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {
    let row = ev.RowObj;

    if (ev.Key == "ViewFamily") {
      this.adInsHelperService.OpenCustomerViewByCustId(row.FamilyId);
    }

    if (ev.Key == "ViewMainCust") {
      this.adInsHelperService.OpenCustomerViewByCustId(row.CustId);
    }

    if (ev.Action.key == "UpdateIsCustomer") {
      if(confirm("Update to Main Customer?")){
        var ReqByIdObj = new GenericObj();
        ReqByIdObj.Id = row.FamilyId;
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
