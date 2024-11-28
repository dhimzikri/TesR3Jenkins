import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-cust-view',
  templateUrl: './self-custom-cust-view.component.html'
})
export class SelfCustomCustViewComponent implements OnInit {
  
  pageName: string;
  FamilyId: number = 0;

  constructor(private router: Router, private adInsHelperService: AdInsHelperService) {
    this.pageName = "ViewCustomerPersonalV2"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {
    let row = ev.RowObj;

    if (ev.Key == "ViewCust") {
      this.FamilyId = row.FamilyId;
      if (row.MrCustRelationshipDesc == "Self Customer")
      {
        this.FamilyId = row.CustId
      }

      this.adInsHelperService.OpenCustomerViewByCustIdForTemplate(this.FamilyId);
    }
  }
}
