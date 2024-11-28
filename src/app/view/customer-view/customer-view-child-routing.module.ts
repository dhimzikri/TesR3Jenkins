import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_CUST_PERSONAL_DETAIL,
        loadChildren: () => import('./customer-view-personal-detail/customer-view-personal-detail.module').then(m => m.CustomerViewPersonalDetailModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON,
        loadChildren: () => import('./customer-view-personal-contact-person/customer-view-personal-contact-person.module').then(m => m.CustomerViewPersonalContactPersonModule)
      },
      {
        path: 'PersonalFamily',
        loadChildren: () => import('./customer-view-personal-family/customer-view-personal-family.module').then(m => m.CustomerViewPersonalFamilyModule)
      },
      {
        path: 'PersonalEmergencyContact',
        loadChildren: () => import('./customer-view-personal-emergency-contact/customer-view-personal-emergency-contact.module').then(m => m.CustomerViewPersonalEmergencyContactModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA,
        loadChildren: () => import('./customer-view-personal-job-data/customer-view-personal-job-data.module').then(m => m.CustomerViewPersonalJobDataModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF,
        loadChildren: () => import('./customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.module').then(m => m.CustomerViewPersonalJobDataNonProfModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP,
        loadChildren: () => import('./customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.module').then(m => m.CustomerViewPersonalJobDataEmpModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME,
        loadChildren: () => import('./customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.module').then(m => m.CustomerViewPersonalJobDataSmeModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA,
        loadChildren: () => import('./customer-view-personal-financial-data/customer-view-personal-financial-data.module').then(m => m.CustomerViewPersonalFinancialDataModule)
      },
      {
        path: PathConstant.VIEW_CUST_ASSET,
        loadChildren: () => import('./customer-view-customer-asset/customer-view-customer-asset.module').then(m => m.CustomerViewCustomerAssetModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_FAMILY,
        loadChildren: () => import('./customer-view-personal-family/customer-view-personal-family.module').then(m => m.CustomerViewPersonalFamilyModule)

      },
      {
        path: PathConstant.VIEW_CUST_COY_OTHER,
        loadChildren: () => import('./customer-view-coy-other/customer-view-coy-other.module').then(m => m.CustomerViewCoyOtherModule)
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_APP_LISTING,
        loadChildren: () => import('./customer-view-personal-app-listing/customer-view-personal-app-listing.module').then(m => m.CustomerViewPersonalAppListingModule)

      },
      {
        path: 'PersonalOther',
        loadChildren: () => import('./customer-view-personal-other-attr/customer-view-personal-other-attr.module').then(m => m.CustomerViewPersonalOtherModule)

      },
      ///Cust Type Company
      {
        path: 'CoyDetail',
        loadChildren: () => import('./customer-view-coy-detail/customer-view-coy-detail.module').then(m => m.CustomerViewCoyDetailModule)
      },
      {
        path: 'Address',
        loadChildren: () => import('./customer-view-address/customer-view-address.module').then(m => m.CustomerViewAddressModule)
      },
      {
        path: 'CoyManagement',
        loadChildren: () => import('./customer-view-coy-management/customer-view-coy-management.module').then(m => m.CustomerViewCoyManagementModule)
      },
      {
        path: 'CoyContact',
        loadChildren: () => import('./customer-view-coy-contact/customer-view-coy-contact.module').then(m => m.CustomerViewCoyContactModule)
      },
      {
        path: 'CoyFinancial',
        loadChildren: () => import('./customer-view-coy-financial/customer-view-coy-financial.module').then(m => m.CustomerViewCoyFinancialModule)
      },
      {
        path: 'CoyLegal',
        loadChildren: () => import('./customer-view-coy-legal/customer-view-coy-legal.module').then(m => m.CustomerViewCoyLegalModule)
      },
      //CustGroup
      {
        path: 'CustomerGroup',
        loadChildren: () => import('./customer-view-customer-group/customer-view-customer-group.module').then(m => m.CustomerViewGroupModule)
      },
      {
        path: 'HighligtComment',
        loadChildren: () => import('./customer-view-highligt-comment/highligt-comment.module').then(m => m.HighligtCommentModule)
      },

      ///Cust Type Company
      {
        path: PathConstant.VIEW_CUST_COY_DETAIL,
        loadChildren: () => import('./customer-view-coy-detail/customer-view-coy-detail.module').then(m => m.CustomerViewCoyDetailModule)
      },
      {
        path: PathConstant.VIEW_CUST_ADDR,
        loadChildren: () => import('./customer-view-address/customer-view-address.module').then(m => m.CustomerViewAddressModule)
      },
      {
        path: PathConstant.VIEW_CUST_COY_MNGMNT,
        loadChildren: () => import('./customer-view-coy-management/customer-view-coy-management.module').then(m => m.CustomerViewCoyManagementModule)
      },
      {
        path: PathConstant.VIEW_CUST_COY_CONTACT,
        loadChildren: () => import('./customer-view-coy-contact/customer-view-coy-contact.module').then(m => m.CustomerViewCoyContactModule)
      },
      {
        path: PathConstant.VIEW_CUST_COY_FINANCIAL,
        loadChildren: () => import('./customer-view-coy-financial/customer-view-coy-financial.module').then(m => m.CustomerViewCoyFinancialModule)
      },
      {
        path: PathConstant.VIEW_CUST_COY_LEGAL,
        loadChildren: () => import('./customer-view-coy-legal/customer-view-coy-legal.module').then(m => m.CustomerViewCoyLegalModule)
      },
      //CustGroup
      {
        path: PathConstant.VIEW_CUST_GRP,
        loadChildren: () => import('./customer-view-customer-group/customer-view-customer-group.module').then(m => m.CustomerViewGroupModule)
      },
      //View Document
      {
        path: PathConstant.VIEW_CUST_DOC,
        loadChildren: () => import('./customer-view-document/customer-view-document.module').then(m => m.CustomerViewDocumentModule)
      },
      //Other Info
      {
        path: PathConstant.VIEW_CUST_OTH_INFO,
        loadChildren: () => import('./customer-view-other-info/customer-view-other-info.module').then(m => m.CustomerViewOtherInfoModule)
      },
      // Trusting Social
      {
        path: PathConstant.VIEW_CUST_TRUSTING_SOCIAL,
        loadChildren: () => import('./customer-view-trusting-social/customer-view-trusting-social.module').then(m => m.CustomerViewTrustingSocialModule)
      },
      {
        path: PathConstant.VIEW_CUST_ASLI_RI,
        loadChildren: () => import('./customer-view-asli-ri/customer-view-asli-ri.module').then(m => m.CustomerViewAsliRiModule)
      },
      {
        path: PathConstant.VIEW_CUST_CBAS_SLIK,
        loadChildren: () => import('./customer-view-cbas-slik/customer-view-cbas-slik.module').then(m => m.CustomerViewCbasSlikModule)
      },
      //CustomOther Info
      {
        path: PathConstant.CUSTOM_VIEW_CUST_OTH_INFO,
        loadChildren: () => import('../custom/customer-view/customer-view-other-info/custom-customer-view-other-info.module').then(m => m.CustomCustomerViewOtherInfoModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerViewChildRoutingModule { }
