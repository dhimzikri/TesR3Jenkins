import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-vendor-branch-member-add-x',
  templateUrl: './self-custom-vendor-branch-member-add-x.component.html'
})
export class SelfCustomVendorBranchMemberAddXComponent implements OnInit {
  pageName: string;
  isReady = false;
  Type: string = "Default";
  MrVendorCategoryCode: string;

  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) {
    this.subscribeParam();

    this.pageName = 'SupplierOfficeMemberAddXCNAF'
    this.selectPage();
  }

  ngOnInit(): void {
  }

  subscribeParam() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];

      }
    });
  }

  selectPage() {
    this.isReady = false;
    console.log("aaaaa", CommonConstant.NOTARY_PERSONAL);
    console.log("aaaaa", this.MrVendorCategoryCode);
    console.log("testttt", this.MrVendorCategoryCode === CommonConstant.NOTARY_PERSONAL);
    if (this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY) {
      this.pageName = 'SupplierOfficeMemberAddNotaryXCNAF'
    }
    else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.CUSTODY) {
      this.pageName = 'SupplierOfficeMemberAddNotaryXCNAF' //notary personal sama kayak notary company
    }
    else {
      this.pageName = 'SupplierOfficeMemberAddXCNAF'
    }

    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }
}
