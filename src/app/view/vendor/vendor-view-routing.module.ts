import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorBranchViewComponent } from './vendor-branch-view/vendor-branch-view.component';
import { VendorHoldingViewComponent } from './vendor-holding-view/vendor-holding-view.component';
import { VendorHoInfoComponent } from './vendor-ho-info/vendor-ho-info.component';
import { PathConstant } from 'app/shared/PathConstant';
import { VendorCollCompanyViewComponent } from "./vendor-coll-company-view/vendor-coll-company-view.component";
import { FundingCompanyDetailComponent } from './vendor-funding-company-view/funding-company-detail.component';
import { UcTemplateComponent } from '@adins/uctemplate';

import { PathConstantX } from 'app/impl/shared/constant/PathConstantX';
import { VendorBranchViewXComponent } from 'app/impl/view/vendor/vendor-branch-view-x/vendor-branch-view-x.component';
import { VendorHoInfoXComponent } from 'app/impl/view/vendor/vendor-ho-info-x/vendor-ho-info-x.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_VENDOR_BRANCH,
        component: VendorBranchViewComponent,
        data: {
          title: 'Vendor Branch View'
        }
      },
      {
        path: PathConstantX.VIEW_VENDOR_BRANCH_X,
        component: VendorBranchViewXComponent,
        data: {
          title: 'Vendor Branch View X'
        }
      },
      {
        path: PathConstant.VIEW_VENDOR_HOLDING,
        component: VendorHoldingViewComponent,
        data: {
          title: 'Vendor Holding View'
        }
      },
      {
        path: PathConstant.VIEW_VENDOR_HO,
        component: VendorHoInfoComponent,
        data: {
          title: 'Vendor HO View'
        }
      },
      {
        path: PathConstantX.VIEW_VENDOR_HO_X,
        component: VendorHoInfoXComponent,
        data: {
          title: 'Vendor HO View'
        }
      },
      {
        path: PathConstant.VIEW_VENDOR_COLL_COMPANY,
        component: VendorCollCompanyViewComponent,
        data: {
          title: 'Vendor Coll Company View'
        }
      },
      {
        path: PathConstantX.VENDOR_FUNDING_COY_X,
        component: UcTemplateComponent,
        data: {
          page: "VendorFundingCoyViewXcnaf"        }
      },
      {
        path: PathConstant.SELF_CUSTOM_VIEW_VENDOR_HOLDING,
        component: UcTemplateComponent,
        data: {
          page: 'ViewSupplierHolding'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_VIEW_VENDOR_HO,
        component: UcTemplateComponent,
        data: {
          page: 'ViewSupplierHo'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_VIEW_VENDOR_BRANCH,
        component: UcTemplateComponent,
        data: {
          page: 'ViewVendorBranch'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_VIEW_VENDOR_COLL_COMPANY,
        component: UcTemplateComponent,
        data: {
          title: 'View Vendor Collection Company',
          page: 'ViewvendorCollectionCompany'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorViewRoutingModule { }
