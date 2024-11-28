import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CustomerComponent } from 'app/customer/customer.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { CustomerPersonalPageComponent } from './customer-personal/customer-personal-page/customer-personal-page.component';
import { CustomerPersonalAddressComponent } from './customer-personal/customer-personal-address/customer-personal-address.component';
import { CustomerPersonalAddressAddComponent } from './customer-personal/customer-personal-address/customer-personal-address-add/customer-personal-address-add.component';
import { CustomerCompanyAddressComponent } from './customer-company/customer-company-address/customer-company-address.component';
import { CustomerCompanyAddressAddComponent } from './customer-company/customer-company-address/customer-company-address-add/customer-company-address-add.component';
import { CustomerPersonalJobDataComponent } from './customer-personal/customer-personal-job-data/customer-personal-job-data.component';
import { JobDataNonProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-non-professional/job-data-non-professional.component';
import { CustomerCompanyPageComponent } from './customer-company/customer-company-page/customer-company-page.component';
import { EditMainDataPagingComponent } from './edit-main-data/edit-main-data-paging/edit-main-data-paging.component';
import { UploadNegativeCustomerComponent } from './negative-customer/upload-negative-customer/upload-negative-customer.component';
import { ReviewUploadNegativeCustomerPagingComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-paging/review-upload-negative-customer-paging.component';
import { ReviewUploadNegativeCustomerDetailComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-detail/review-upload-negative-customer-detail.component';
import { CustomerFamilyMenuComponent } from './customer-family-menu/customer-family-menu.component';
import { CustomerShareholderMenuComponent } from './customer-shareholder-menu/customer-shareholder-menu.component';
import { CustomerGuarantorMenuComponent } from './customer-guarantor-menu/customer-guarantor-menu.component';
import { CustomerUpdateMasterComponent } from './customer-update-master/customer-update-master.component';
import { CustomerUpdateMasterDetailComponent } from './customer-update-master/customer-update-master-detail/customer-update-master-detail.component';
import { PathConstant } from 'app/shared/PathConstant';
import { NewCustHeaderComponent } from './sharing-component/new-cust-header/new-cust-header.component';
import { CustPefindoReqComponent } from './cust-pefindo-req/cust-pefindo-req.component';
import { SelfCustomCustomerPagingComponent } from './self-custom-customer-paging/self-custom-customer-paging.component';
import { SelfCustomEditMainDataPagingComponent } from './edit-main-data/self-custom-edit-main-data-paging/self-custom-edit-main-data-paging.component';
import { SelfCustomCustomerFamilyMenuComponent } from './self-custom-customer-family-menu/self-custom-customer-family-menu.component';
import { SelfCustomCustomerShareholderMenuComponent } from './self-custom-customer-shareholder-menu/self-custom-customer-shareholder-menu.component';
import { SelfCustomCustomerPersonalPageComponent } from './customer-personal/self-custom-customer-personal/self-custom-customer-personal-page/self-custom-customer-personal-page.component';
import { SelfCustomNegativeCustomerComponent } from './self-custom-negative-customer/self-custom-negative-customer.component';
import { SelfCustomNegativeCustomerDetailComponent } from './self-custom-negative-customer/self-custom-negative-customer-detail/self-custom-negative-customer-detail.component';
import { SelfCustomUploadNegativeCustomerComponent } from './self-custom-negative-customer/self-custom-upload-negative-customer/self-custom-upload-negative-customer.component';
import { SelfCustomReviewUploadNegativeCustomerDetailComponent } from './self-custom-negative-customer/self-custom-review-upload-negative-customer/self-custom-review-upload-negative-customer-detail/self-custom-review-upload-negative-customer-detail.component';
import { SelfCustomReviewUploadNegativeCustomerComponent } from './self-custom-negative-customer/self-custom-review-upload-negative-customer/self-custom-review-upload-negative-customer.component';
import { UcTemplateComponent } from '@adins/uctemplate';
import { SelfCustomNewCustHeaderComponent } from './sharing-component/self-custom-new-cust-header/self-custom-new-cust-header.component';
import { CustomerPagingXComponent } from 'app/impl/customer/customer-paging/customer-paging-x.component';
import { PathConstantX } from 'app/impl/shared/constant/PathConstantX';
import { CustomerPersonalPageXComponent } from 'app/impl/customer/customer-personal/customer-personal-page/customer-personal-page-x.component';
import { CustomerCompanyPageXComponent } from 'app/impl/customer/customer-company/customer-company-page/customer-company-page-x.component';
import { NewCustHeaderXComponent } from 'app/impl/customer/sharing-component/new-cust-header/new-cust-header-x.component';
import { EditMainDataPagingXComponent } from 'app/impl/customer/edit-main-data/edit-main-data-paging/edit-main-data-paging-x.component';
import { CustomerFamilyMenuXComponent } from 'app/impl/customer/customer-family-menu/customer-family-menu-x.component';
import { CustomerShareholderMenuXComponent } from 'app/impl/customer/customer-shareholder-menu/customer-shareholder-menu-x.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: CustomerPagingComponent,
        data: {
          title: 'Customer Paging'
        }
      },
      {
        path: PathConstantX.PAGING_X,
        component: CustomerPagingXComponent,
        data: {
          title: 'Customer Paging'
        }
      },
      {
        path: PathConstant.CUST_NEG_PAGING,
        component: NegativeCustomerComponent,
        data: {
          title: 'Negative Customer Paging'
        }
      },
      {
        path: PathConstant.CUST_NEG_DETAIL,
        component: NegativeCustomerDetailComponent,
        data: {
          title: 'Negative Customer Detail'
        }
      },
      {
        path: PathConstant.CUST_NEG_UPLOAD,
        component: UcTemplateComponent,
        data: {
          page: 'UploadCustomerNegative'
        }
      },
      {
        path: PathConstant.CUST_NEG_RVW_UPLOAD_PAGING,
        component: UcTemplateComponent,
        data: {
          page: 'ReviewUploadNegativeCustomer'
        }
      },
      {
        path: PathConstant.CUST_NEG_RVW_UPLOAD_DETAIL,
        component: ReviewUploadNegativeCustomerDetailComponent,
        data: {
          title: 'Review Upload Negative Customer Detail'
        }
      },

      {
        path: PathConstant.CUST_PERSONAL_PAGE,
        component: CustomerPersonalPageComponent,
        data: {
          title: 'Customer Personal DuplicateCheck  '
        }
      },
      {
        path: PathConstantX.CUST_PERSONAL_PAGE_X,
        component: CustomerPersonalPageXComponent,
        data: {
          title: 'Customer Personal DuplicateCheck X'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_ADDR,
        component: CustomerPersonalAddressComponent,
        data: {
          title: 'Customer Personal Address'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_ADDR_FORM,
        component: CustomerPersonalAddressAddComponent,
        data: {
          title: 'Customer Personal Address Add Edit'
        }
      },
      {
        path: PathConstant.CUST_COY_ADDR,
        component: CustomerCompanyAddressComponent,
        data: {
          title: 'Customer Company Address'
        }
      },
      {
        path: PathConstant.CUST_COY_ADDR_FORM,
        component: CustomerCompanyAddressAddComponent,
        data: {
          title: 'Customer Company Address Add Edit'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_JOB_DATA,
        component: CustomerPersonalJobDataComponent,
        data: {
          title: 'Customer Personal Job Data'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_JOB_DATA_NON_PRO,
        component: JobDataNonProfessionalComponent,
        data: {
          title: 'Customer Personal Job Data'
        }
      },
      {
        path: PathConstant.CUST_COY_PAGE,
        component: CustomerCompanyPageComponent,
        data: {
          title: 'Customer Company Page'
        }
      },
      {
        path: PathConstantX.CUST_COY_PAGE_X,
        component: CustomerCompanyPageXComponent,
        data: {
          title: 'Customer Company Page X'
        }
      },
      {
        path: PathConstant.CUST_EDIT_MAIN_DATA_PAGING,
        component: EditMainDataPagingComponent,
        data: {
          title: 'Edit Main Data Page'
        }
      },
      {
        path: PathConstantX.CUST_EDIT_MAIN_DATA_PAGING_X,
        component: EditMainDataPagingXComponent,
        data: {
          title: 'Edit Main Data Page X'
        }
      },
      {
        path: PathConstant.CUST_FAMILY_PAGING,
        component: CustomerFamilyMenuComponent,
        data: {
          title: 'Customer Family'
        }
      },
      {
        path: PathConstantX.CUST_FAMILY_PAGING_X,
        component: CustomerFamilyMenuXComponent,
        data: {
          title: 'Customer Family X'
        }
      },
      {
        path: PathConstant.CUST_SHRHLDR_PAGING,
        component: CustomerShareholderMenuComponent,
        data: {
          title: 'Customer Shareholder'
        }
      },
      {
        path: PathConstantX.CUST_SHRHLDR_PAGING_X,
        component: CustomerShareholderMenuXComponent,
        data: {
          title: 'Customer Shareholder X'
        }
      },
      {
        path: PathConstant.CUST_GUARANTOR_PAGING,
        component: CustomerGuarantorMenuComponent,
        data: {
          title: 'CustomerGuarantor'
        }
      },
      {
        path: PathConstant.CUST_UPDATE_DATA_PAGING,
        component: CustomerUpdateMasterComponent,
        data: {
          title: 'Update Data Customer'
        }
      },
      {
        path: PathConstant.CUST_UPDATE_DATA_DETAIL,
        component: CustomerUpdateMasterDetailComponent,
        data: {
          title: 'Update Data Customer Detail'
        }
      },
      {
        path: PathConstant.NEW_CUST,
        component: NewCustHeaderComponent,
        data: {
          title: 'New Cust'
        }
      },
      {
        path: PathConstantX.NEW_CUST_X,
        component: NewCustHeaderXComponent,
        data: {
          title: 'New Cust'
        }
      },
      {
        path: PathConstant.CUST_PEFINDO_REQ,
        component: CustPefindoReqComponent,
        data: {
          title: 'Cust Pefindo Req'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_PAGING,
        component: SelfCustomCustomerPagingComponent,
        data: {
          title: 'Customer Paging'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_EDIT_MAIN_DATA_PAGING,
        component: SelfCustomEditMainDataPagingComponent,
        data: {
          title: 'Edit Main Data Page'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_FAMILY_PAGING,
        component: SelfCustomCustomerFamilyMenuComponent,
        data: {
          title: 'Customer Family'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_SHRHLDR_PAGING,
        component: SelfCustomCustomerShareholderMenuComponent,
        data: {
          title: 'Customer Shareholder'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_NEW_CUST,
        component: SelfCustomNewCustHeaderComponent,
        data: {
          title: 'New Cust'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_PERSONAL_PAGE,
        component: SelfCustomCustomerPersonalPageComponent,
        data: {
          title: 'Customer Personal DuplicateCheck  '
        }
      },
      {
        path: PathConstant.CUSTOM_CUST_NEG_PAGING,
        component: SelfCustomNegativeCustomerComponent,
        data: {
          title: 'Self Custom Negative Customer Paging'
        }
      },
      {
        path: PathConstant.CUSTOM_CUST_NEG_PERSONAL_DETAIL,
        component: SelfCustomNegativeCustomerDetailComponent,
        data: {
          title: 'Self Custom Negative Customer Personal Detail Component'
        }
      },
      {
        path: PathConstant.CUSTOM_UPLOAD_NEG_CUST,
        component: SelfCustomUploadNegativeCustomerComponent,
        data: {
          title: 'Self Custom Upload Negative Customer'
        }
      },
      {
        path: PathConstant.CUSTOM_CUST_NEG_RVW_UPLOAD_DETAIL,
        component: SelfCustomReviewUploadNegativeCustomerDetailComponent,
        data: {
          title: 'Self Custom Review Upload Negative Customer Detail'
        }
      },
      {
        path: PathConstant.CUSTOM_CUST_NEG_RVW_UPLOAD_PAGING,
        component: SelfCustomReviewUploadNegativeCustomerComponent,
        data: {
          title: 'Self Custom Review Upload Negative Customer Paging'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_UPDATE_DATA_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Self Custom Review Update Data Customer Paging',
          page: 'ReviewUpdateDataCustomer'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUST_UPDATE_DATA_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Self Custom Update Data Customer Detail',
          page: 'UpdateDataCustomer'
        }
      },
      {
        path: PathConstant.CUSTOM_CUST_COY_PAGE,
        component: UcTemplateComponent,
        data: {
          title: 'Customer Company Address',
          page: 'CustomerComponyV2'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER,
        component: UcTemplateComponent,
        data: {
          title: 'Beneficiary Owner',
          page: 'Hsbpagingbeneficiaryowner'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER_ADD_EDIT,
        component: UcTemplateComponent,
        data: {
          title: 'Beneficiary Owner Add Edit',
          page: 'Addeditbeneficiaryowner'
        },
      }, 
      {
        path: PathConstant.SELF_CUSTOM_CUSTOM_CUST_PERSONAL_DUPLICATE_CHECK,
        component: UcTemplateComponent,
        data: {
          title: 'Customer Duplicate Checking',
          page: 'CustomerDuplicateCheckingMatchPersonalV2'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CUSTOM_CUST_COMPANY_DUPLICATE_CHECK,
        component: UcTemplateComponent,
        data: {
          title: 'Customer Duplicate Checking',
          page: 'CustomerDuplicateCheckingMatchCompanyV2'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER_PERSONAL_DUPLICATE_CHECK,
        component: UcTemplateComponent,
        data: {
          title: 'Customer Duplicate Checking',
          page: 'CustomerDuplicateCheckingMatchPersonalForBO'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_BENEFICIARY_OWNER_COMPANY_DUPLICATE_CHECK,
        component: UcTemplateComponent,
        data: {
          title: 'Customer Duplicate Checking',
          page: 'CustomerDuplicateCheckingMatchCompanyV2ForBO'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_NEW_CUST_SHAREHOLDER,
        component: UcTemplateComponent,
        data: {
          title: 'Self Custom New Cust Shareholder',
          page: 'Customershareholderdetail'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_BOUWHEER_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Self Custom New Cust Shareholder',
          page: 'Ricadpagingbouwheer'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_BOUWHEER_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Self Custom New Cust Shareholder',
          page: 'Ricaddetailbouwheer'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
