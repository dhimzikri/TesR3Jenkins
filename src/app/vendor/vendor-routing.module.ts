import { PathConstantX } from 'app/impl/shared/constant/PathConstantX';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { VendorBranchPagingComponent } from './vendor-branch/vendor-branch-paging/vendor-branch-paging.component';
import { VendorHoldingPagingComponent } from './vendor-holding-paging/vendor-holding-paging.component';
import { VendorHoldingAddEditComponent } from './vendor-holding-add-edit/vendor-holding-add-edit.component';
import { VendorGroupComponent } from './vendor-group/vendor-group.component';
import { VendorGroupPagingComponent } from './vendor-group/vendor-group-paging/vendor-group-paging.component';
import { VendorGroupViewComponent } from './vendor-group/vendor-group-view/vendor-group-view.component';
import { VendorGroupmemberComponent } from './vendor-groupmember/vendor-groupmember.component';
import { ContactPersonAddEditComponent } from './component/contact-person-add-edit/contact-person-add-edit.component';
import { VendorBranchAddEditComponent } from './vendor-branch/vendor-branch-add-edit/vendor-branch-add-edit.component';
import { VendorHoRegistrationComponent } from './vendor-ho/vendor-ho-registration/vendor-ho-registration.component';
import { ContactPersonListComponent } from './component/contact-person-list/contact-person-list.component';
import { VendorBranchEmployeePagingComponent } from './vendor-branch/vendor-branch-employee-paging/vendor-branch-employee-paging.component';
import { VendorBranchEmployeeAddEditComponent } from './vendor-branch/vendor-branch-employee-add-edit/vendor-branch-employee-add-edit.component';
import { VendorHoldingRegistrationComponent } from './vendor-holding-registration/vendor-holding-registration.component';
import { VendorBranchRegistrationComponent } from './vendor-branch/vendor-branch-registration/vendor-branch-registration.component';
import { VendorBranchOfficeMemberComponent } from './vendor-branch/vendor-branch-office-member/vendor-branch-office-member.component';
import { VendorBranchOfficeMemberAddComponent } from './vendor-branch/vendor-branch-office-member-add/vendor-branch-office-member-add.component';
import { VendorPagingComponent } from './component/vendor/vendor-paging/vendor-paging.component';
import { VendorATPMAddEditComponent } from './vendor-ATPM/vendor-atpm-add-edit/vendor-atpm-add-edit.component';
import { VendorATPMRegistrationComponent } from './vendor-ATPM/vendor-atpm-registration/vendor-atpm-registration.component';
import { PathConstant } from 'app/shared/PathConstant';

import { VendorGradingRequestPagingComponent } from "./vendor-grading/vendor-grading-request/vendor-grading-request-paging/vendor-grading-request-paging.component";
import { VendorGradingRequestDetailComponent } from "./vendor-grading/vendor-grading-request/vendor-grading-request-detail/vendor-grading-request-detail.component";
import { VendorGradingApprovalPagingComponent } from "./vendor-grading/vendor-grading-approval/vendor-grading-approval-paging/vendor-grading-approval-paging.component";
import { VendorGradingApprovalDetailComponent } from "./vendor-grading/vendor-grading-approval/vendor-grading-approval-detail/vendor-grading-approval-detail.component";
import { VendorGradingInquiryPagingComponent } from "./vendor-grading/vendor-grading-inquiry-paging/vendor-grading-inquiry-paging.component";
import { VendorCollCompanyAddEditComponent } from './vendor-coll-company/vendor-coll-company-add-edit/vendor-coll-company-add-edit.component';
import { VendorCollCompanyEmployeeAddEditComponent } from './vendor-coll-company/vendor-coll-company-employee-add-edit/vendor-coll-company-employee-add-edit.component';
import { VendorCollCompanyEmployeePagingComponent } from './vendor-coll-company/vendor-coll-company-employee-paging/vendor-coll-company-employee-paging.component';
import { VendorCollCompanyOfficeMemberAddComponent } from './vendor-coll-company/vendor-coll-company-office-member-add/vendor-coll-company-office-member-add.component';
import { VendorCollCompanyOfficeMemberComponent } from './vendor-coll-company/vendor-coll-company-office-member/vendor-coll-company-office-member.component';
import { VendorCollCompanyRegistrationComponent } from './vendor-coll-company/vendor-coll-company-registration/vendor-coll-company-registration.component';
import { FundingCompanyAddEditComponent } from './funding-company/funding-company-add-edit/funding-company-add-edit.component';
import { FundingCompanyPagingComponent } from './funding-company/funding-company-paging/funding-company-paging.component';
import { FundingCompanyDetailComponent } from '../view/vendor/vendor-funding-company-view/funding-company-detail.component';
import { SelfCustomVendorPagingComponent } from './component/vendor/self-custom-vendor-paging/self-custom-vendor-paging.component';
import { SelfCustomVendorHoldingAddEditComponent } from './self-custom-vendor-holding-add-edit/self-custom-vendor-holding-add-edit.component';
import { SelfCustomVendorHoAddEditComponent } from './vendor-ho/self-custom-vendor-ho-add-edit/self-custom-vendor-ho-add-edit.component';
import { SelfCustomVendorBranchAddEditComponent } from './vendor-branch/self-custom-vendor-branch-add-edit/self-custom-vendor-branch-add-edit.component';
import { SelfCustomVendorSchemeAddEditComponent } from './vendor-scheme/self-custom-vendor-scheme-add-edit/self-custom-vendor-scheme-add-edit.component';
import { SelfCustomVendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/self-custom-vendor-scheme-member-paging/self-custom-vendor-scheme-member-paging.component';
import { SelfCustomVendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/self-custom-vendor-scheme-member-add/self-custom-vendor-scheme-member-add.component';
import { SelfCustomVendorGroupComponent } from './vendor-group/self-custom-vendor-group/self-custom-vendor-group.component';
import { SelfCustomVendorGroupViewComponent } from './vendor-group/self-custom-vendor-group-view/self-custom-vendor-group-view.component';
import { SelfCustomVendorGroupMemberAddComponent } from './vendor-group/self-custom-vendor-group-member-add/self-custom-vendor-group-member-add.component';
import { SelfCustomVendorATPMAddEditComponent } from './vendor-ATPM/self-custom-vendor-atpm-add-edit/self-custom-vendor-atpm-add-edit.component';
import { VendorCreditInsurancePagingComponent } from './vendor-credit-insurance/vendor-credit-insurance-paging/vendor-credit-insurance-paging.component';
import { VendorCreditInsuranceAddEditComponent } from './vendor-credit-insurance/vendor-credit-insurance-add-edit/vendor-credit-insurance-add-edit.component';
import { VendorCreditInsuranceBranchPagingComponent } from './vendor-credit-insurance/vendor-credit-insurance-branch-paging/vendor-credit-insurance-branch-paging.component';
import { VendorCreditInsuranceBranchAddEditComponent } from './vendor-credit-insurance/vendor-credit-insurance-branch-add-edit/vendor-credit-insurance-branch-add-edit.component';
import { VendorCreditInsuranceGroupPagingComponent } from './vendor-credit-insurance/vendor-credit-insurance-group-paging/vendor-credit-insurance-group-paging.component';
import { VendorCreditInsuranceGroupAddEditComponent } from './vendor-credit-insurance/vendor-credit-insurance-group-add-edit/vendor-credit-insurance-group-add-edit.component';
import { UcTemplateComponent } from '@adins/uctemplate';
import { SelfCustomVendorDetailComponent } from './component/vendor/self-custom-vendor-detail/self-custom-vendor-detail.component';
import { VendorBranchOfficeMemberXComponent } from 'app/impl/vendor/vendor-branch/vendor-branch-office-member/vendor-branch-office-member-x/vendor-branch-office-member-x.component';
import { VendorBranchOfficeMemberAddXComponent } from 'app/impl/vendor/vendor-branch/vendor-branch-office-member-add-x/vendor-branch-office-member-add-x.component';
import { VendorBranchEmployeePagingXComponent } from 'app/impl/vendor/vendor-branch/vendor-branch-employee-paging/vendor-branch-employee-paging-x.component';
import { VendorBranchEmployeeAddEditXComponent } from 'app/impl/vendor/vendor-branch/vendor-branch-employee-add-edit/vendor-branch-employee-add-edit-x.component';
import { VendorBranchRegistrationXComponent } from 'app/impl/vendor/vendor-branch/vendor-branch-registration/vendor-branch-registration-x.component';
import { VendorBranchAddEditXComponent } from 'app/impl/vendor/vendor-branch/vendor-branch-add-edit/vendor-branch-add-edit-x.component';
import { VendorPagingXComponent } from 'app/impl/vendor/component/vendor/vendor-paging/vendor-paging-x.component';
import { VendorHoAddEditXComponent } from 'app/impl/vendor/vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit-x.component';
import { VendorHoRegistrationXComponent } from 'app/impl/vendor/vendor-ho/vendor-ho-registration/vendor-ho-registration-x.component';
import { FundingCompanyAddEditXComponent } from 'app/impl/vendor/component/funding-company/funding-company-add-edit-x/funding-company-add-edit-x.component';
import { FundingCompanyPagingXComponent } from 'app/impl/vendor/component/funding-company/funding-company-paging-x/funding-company-paging-x.component';
import { SelfCustomVendorPagingXComponent } from 'app/impl/vendor/component/vendor/self-custom-vendor-paging/self-custom-vendor-paging-x.component';
import { SelfCustomVendorBranchAddEditXComponent } from 'app/impl/vendor/vendor-branch/self-custom-vendor-branch-add-edit/self-custom-vendor-branch-add-edit-x.component';
import { SelfCustomVendorDetailXComponent } from 'app/impl/vendor/component/vendor/self-custom-vendor-detail/self-custom-vendor-detail-x.component';
import { SelfCustomVendorHoAddEditXComponent } from 'app/impl/vendor/vendor-ho/self-custom-vendor-ho-add-edit/self-custom-vendor-ho-add-edit-x.component';
import { SelfCustomVendorBranchMemberPagingXComponent } from 'app/impl/vendor/component/vendor/self-custom-vendor-branch-member-paging/self-custom-vendor-branch-member-paging-x.component';
import { SelfCustomVendorBranchMemberAddXComponent } from 'app/impl/vendor/component/vendor/self-custom-vendor-branch-member-add/self-custom-vendor-branch-member-add-x/self-custom-vendor-branch-member-add-x.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VENDOR_BRANCH_PAGING,
        component: VendorBranchPagingComponent,
        data: {
          title: 'Vendor Branch Paging'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_ADD,
        component: VendorBranchAddEditComponent,
        data: {
          title: 'Vendor Branch Add'
        },
      },
      {
        path: PathConstantX.VENDOR_BRANCH_REG_X,
        component: SelfCustomVendorBranchAddEditXComponent,
        data: {
          title: 'Vendor Branch Add X'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_REG,
        component: VendorBranchRegistrationComponent,
        data: {
          title: 'Vendor Branch Registration'
        },
      },
      {
        path: PathConstant.VENDOR_CONTACT_PERSON_ADD,
        component: ContactPersonAddEditComponent,
        data: {
          title: 'Contact Person Branch Add/Edit'
        },
      },
      {
        path: PathConstant.VENDOR_CONTACT_PERSON_EDIT,
        component: ContactPersonAddEditComponent,
        data: {
          title: 'Contact Person Add/Edit'
        },
      },
      {
        path: PathConstant.VENDOR_CONTACT_PERSON_LIST,
        component: ContactPersonListComponent,
        data: {
          title: 'Contact Person List'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_PAGING,
        component: VendorHoldingPagingComponent,
        data: {
          title: 'Vendor Holding Paging'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_DETAIL,
        component: VendorHoldingAddEditComponent,
        data: {
          title: 'Vendor Holding Add Edit'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_REG,
        component: VendorHoldingRegistrationComponent,
        data: {
          title: 'Vendor Registration'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_ADD,
        component: VendorGroupComponent,
        data: {
          title: 'Vendor Group Add'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_PAGING,
        component: VendorGroupPagingComponent,
        data: {
          title: 'Vendor Group Paging'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_VIEW,
        component: VendorGroupViewComponent,
        data: {
          title: 'Vendor Group View'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_MBR_ADD,
        component: VendorGroupmemberComponent,
        data: {
          title: 'Vendor Group Member View'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_DETAIL,
        component: VendorSchemeAddEditComponent,
        data: {
          title: 'Vendor Scheme Detail'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_PAGING,
        component: VendorSchemePagingComponent,
        data: {
          title: 'Vendor Scheme Paging'
        },
      },
      {
        path: PathConstant.PAGING,
        component: VendorPagingComponent,
        data: {
          title: 'Vendor Paging'
        },
      },
      {
        path: PathConstantX.PAGING_X,
        component: SelfCustomVendorPagingXComponent,
        data: {
          title: 'Vendor Paging X'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_MBR_ADD,
        component: VendorSchemeMemberAddComponent,
        data: {
          title: 'Vendor Scheme Member Add'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_MBR,
        component: VendorSchemeMemberPagingComponent,
        data: {
          title: 'Vendor Scheme Member'
        },
      },
      {
        path: PathConstant.VENDOR_HO_DETAIL,
        component: VendorHoAddEditComponent,
        data: {
          title: 'Vendor HO Detail'
        },
      },
      {
        path: PathConstantX.VENDOR_HO_DETAIL_X,
        component: SelfCustomVendorHoAddEditXComponent,
        data: {
          title: 'Vendor HO Detail X'
        },
      },
      {
        path: PathConstant.VENDOR_HO_PAGING,
        component: VendorHoPagingComponent,
        data: {
          title: 'Vendor HO Paging'
        },
      },
      {
        path: PathConstant.VENDOR_HO_REG,
        component: VendorHoRegistrationComponent,
        data: {
          title: 'Vendor HO Registration'
        },
      },
      {
        path: PathConstantX.VENDOR_HO_REG_X,
        component: SelfCustomVendorDetailXComponent,
        data: {
          title: 'Vendor HO Registration X'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_EMP_PAGING,
        component: VendorBranchEmployeePagingComponent,
        data: {
          title: 'Vendor Branch Employee Paging'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_EMP_DETAIL,
        component: VendorBranchEmployeeAddEditComponent,
        data: {
          title: 'Vendor Branch Employee Detail'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_MBR_PAGING,
        component: VendorBranchOfficeMemberComponent,
        data: {
          title: 'Vendor Branch Member Paging'
        },
      },
      {
        path: PathConstantX.VENDOR_BRANCH_MBR_PAGING_X,
        component: VendorBranchOfficeMemberXComponent,
        data: {
          title: 'Vendor Branch Member Paging X'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_MBR_ADD,
        component: VendorBranchOfficeMemberAddComponent,
        data: {
          title: 'Vendor Branch Member Add'
        },
      },
      {
        path: PathConstantX.VENDOR_BRANCH_MBR_ADD_X,
        component: VendorBranchOfficeMemberAddXComponent,
        data: {
          title: 'Vendor Branch Member Add'
        },
      },
      {
        path: PathConstant.VENDOR_ATPM_DETAIL,
        component: VendorATPMAddEditComponent,
        data: {
          title: 'Vendor ATPM Detail'
        },
      },
      {
        path: PathConstant.VENDOR_ATPM_REG,
        component: VendorATPMRegistrationComponent,
        data: {
          title: 'Vendor ATPM Registration'
        },
      },
      {
        path: "VendorGrading/Request/Paging",
        component: VendorGradingRequestPagingComponent,
        data: {
          title: "Vendor Grading Request Paging",
        },
      },
      {
        path: "VendorGrading/Request/Detail",
        component: VendorGradingRequestDetailComponent,
        data: {
          title: "Vendor Grading Request Detail",
        },
      },
      {
        path: "VendorGrading/Approval/Paging",
        component: VendorGradingApprovalPagingComponent,
        data: {
          title: "Vendor Grading Approval Paging",
        },
      },
      {
        path: "VendorGrading/Approval/Detail",
        component: VendorGradingApprovalDetailComponent,
        data: {
          title: "Vendor Grading Approval Detail",
        },
      },
      {
        path: "VendorGrading/Inquiry",
        component: VendorGradingInquiryPagingComponent,
        data: {
          title: "Vendor Grading Inquiry", 
        }
      },
      {
        path: PathConstant.VENDOR_COLL_COMPANY_ADD,
        component: VendorCollCompanyAddEditComponent,
        data: {
          title: 'Vendor Collection Company Registration'
        },
      },
      {
        path: PathConstant.VENDOR_COLL_COMPANY_EMP_DETAIL,
        component: VendorCollCompanyEmployeeAddEditComponent,
        data: {
          title: 'Vendor Collection Company Registration'
        },
      },
      {
        path: PathConstant.VENDOR_COLL_COMPANY_EMP_PAGING,
        component: VendorCollCompanyEmployeePagingComponent,
        data: {
          title: 'Vendor Collection Company Registration'
        },
      },
      {
        path: PathConstant.VENDOR_COLL_COMPANY_MBR_ADD,
        component: VendorCollCompanyOfficeMemberAddComponent,
        data: {
          title: 'Vendor Collection Company Registration'
        },
      },
      {
        path: PathConstant.VENDOR_COLL_COMPANY_MBR_PAGING,
        component: VendorCollCompanyOfficeMemberComponent,
        data: {
          title: 'Vendor Collection Company Registration'
        },
      },
      {
        path: PathConstant.VENDOR_COLL_COMPANY_REG,
        component: VendorCollCompanyRegistrationComponent,
        data: {
          title: 'Vendor Collection Company Registration'
        },
      },
      {
        path: PathConstant.VENDOR_FUNDING_COY_PAGING,
        component: FundingCompanyPagingComponent,
        data: {
          title: 'Funding Company Paging'
        },
      },
      {
        path: PathConstant.VENDOR_FUNDING_COY_ADD_EDIT,
        component: FundingCompanyAddEditComponent,
        data: {
          title: 'Funding Company Addedit'
        },
      },
      {
        path: PathConstantX.VENDOR_FUNDING_COY_PAGING_X,
        component: UcTemplateComponent,
        data: {
          page: 'VendorfundingcoyyXcnaf'
        },
      },
            //comment
      // {
      //   path: PathConstantX.VENDOR_FUNDING_COY_ADD_EDIT_X,
      //   component: FundingCompanyAddEditXComponent,
      //   data: {
      //     title: 'Funding Company AddEdit X'
      //   },
      // },
      {
        path: PathConstantX.VENDOR_FUNDING_COY_ADD_EDIT_X,
        component: UcTemplateComponent,
        data: {
          title: 'Funding Company Addedit',
          page: 'VendorfundingcoydetailXcnaf'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_PAGING,
        component: SelfCustomVendorPagingComponent,
        data: {
          title: 'Vendor Paging'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_HOLDING_REG,
        component: SelfCustomVendorHoldingAddEditComponent,
        data: {
          title: 'Vendor Holding Add Edit'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_HO_REG,
        component: SelfCustomVendorHoAddEditComponent,
        data: {
          title: 'Vendor HO Detail'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_ATPM_REG,
        component: SelfCustomVendorATPMAddEditComponent,
        data: {
          title: 'Vendor ATPM Detail'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_ATPM_DETAIL,
        component: SelfCustomVendorDetailComponent,
        data: {
          title: 'Vendor ATPM Registration'
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_BRANCH_REG,
        component: SelfCustomVendorBranchAddEditComponent,
        data: {
          title: 'Vendor Branch Add'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_SCHM_DETAIL,
        component: SelfCustomVendorSchemeAddEditComponent,
        data: {
          title: 'Vendor Scheme Detail'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_SCHM_MBR,
        component: SelfCustomVendorSchemeMemberPagingComponent,
        data: {
          title: 'Vendor Scheme Member'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_SCHM_MBR_ADD,
        component: SelfCustomVendorSchemeMemberAddComponent,
        data: {
          title: 'Vendor Scheme Member Add',
        }
      },
      {
          path: PathConstant.SELF_CUSTOM_VENDOR_GRP_ADD,
          component: SelfCustomVendorGroupComponent,
          data: {
            title: 'Vendor Group Add'
          },
      },
      {
          path: PathConstant.SELF_CUSTOM_VENDOR_GRP_VIEW,
          component: SelfCustomVendorGroupViewComponent,
          data: {
            title: 'Vendor Group View'
          },
      },
      {
          path: PathConstant.SELF_CUSTOM_VENDOR_GRP_MBR_ADD,
          component: SelfCustomVendorGroupMemberAddComponent,
          data: {
            title: 'Vendor Group Member View'
          }
      },
      {
        path: PathConstant.VENDOR_CREDIT_INS_PAGING,
        component: VendorCreditInsurancePagingComponent,
        data: {
          title: 'Vendor Credit Insurance Paging'
        },
      },
      {
        path: PathConstant.VENDOR_CREDIT_INS_ADD,
        component: VendorCreditInsuranceAddEditComponent,
        data: {
          title: 'Vendor Credit Insurance Paging'
        },
      },
      {
        path: PathConstant.VENDOR_CREDIT_INS_BRANCH_PAGING,
        component: VendorCreditInsuranceBranchPagingComponent,
        data: {
          title: 'Vendor Credit Insurance Branch Paging'
        },
      },
      {
        path: PathConstant.VENDOR_CREDIT_INS_BRANCH_ADD_EDIT,
        component: VendorCreditInsuranceBranchAddEditComponent,
        data: {
          title: 'Vendor Credit Insurance Branch Add Edit'
        },
      },
      {
        path: PathConstant.VENDOR_CREDIT_INS_GROUP_PAGING,
        component: VendorCreditInsuranceGroupPagingComponent,
        data: {
          title: 'Vendor Credit Insurance Group Paging'
        },
      },
      {
        path: PathConstant.VENDOR_CREDIT_INS_GROUP_ADD_EDIT,
        component: VendorCreditInsuranceGroupAddEditComponent,
        data: {
          title: 'Vendor Credit Insurance Group Add Edit'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_HO_DETAIL,
        component: SelfCustomVendorDetailComponent,
        data: {
          title: 'Vendor HO Detail'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierOfficeMemberPaging'
        },
      },
      {
        path: PathConstantX.SELF_CUSTOM_VENDOR_BRANCH_MBR_PAGING_X,
        component: SelfCustomVendorBranchMemberPagingXComponent,
        data: {
          title: 'Notary Office Member Paging'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_BRANCH_MBR_ADD,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierOfficeMemberAdd'
        },
      },
      {
        path: PathConstantX.SELF_CUSTOM_VENDOR_BRANCH_MBR_ADD_X,
        component: SelfCustomVendorBranchMemberAddXComponent,
        data: {
          title: 'Notary Office Member Add'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_BRANCH_EMP_PAGING,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierEmpPaging'
        },
      },
      {
        path: PathConstantX.VENDOR_BRANCH_EMP_PAGING_X,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierEmpPagingXCNAF'
        },
      },
      {
        path: PathConstantX.VENDOR_SUPPLIER_EMP_PAGING_X,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierEmpPagingXCNAF_SupplierOnly'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_BRANCH_EMP_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierEmpDetail'
        },
      },
      {
        path: PathConstantX.VENDOR_BRANCH_EMP_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierEmpDetailXCNAF'
        },
      },
      {
        path: PathConstantX.VENDOR_SUPPLIER_EMP_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierEmpDetailXCNAF_SupplierOnly'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_HOLDING_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: 'SupplierHoldingDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_GRADING_INQUIRY,
        component: UcTemplateComponent,
        data: {
          title: "Vendor Grading Inquiry",
          page: 'VendorGradingInquiry'
        }
      },
      {
        path: PathConstant.CUSTOM_VENDOR_GRADING_REQUEST_PAGING,
        component: UcTemplateComponent,
        data: {
          title: "Vendor Grading Request Paging",
          page: 'VendorGradingRequestPaging'
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_GRADING_REQUEST_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: "Vendor Grading Request Detail",
          page: 'VendorGradingRequestDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_GRADING_APPROVAL_PAGING,
        component: UcTemplateComponent,
        data: {
          title: "Vendor Grading Approval Paging",
          page: 'VendorGradingApprovalPaging'
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_GRADING_APPROVAL_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: "Vendor Grading Approval Detail",
          page: 'VendorGradingApprovalDetail'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_VENDOR_BRANCH_DETAIL,
        component: SelfCustomVendorDetailComponent,
        data: {
          title: "Vendor Branch Detail"
        },
      },
      {
        path: PathConstantX.VENDOR_BRANCH_DETAIL_X,
        component: SelfCustomVendorDetailXComponent,
        data: {
          title: "Vendor Branch Detail"
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_FUNDING_COY_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Funding Company Paging',
          page: 'Vendorfundingcoy'
        },
      },
      {
        path: PathConstant.CUSTOM_VENDOR_FUNDING_COY_ADD_EDIT,
        component: UcTemplateComponent,
        data: {
          title: 'Funding Company Addedit',
          page: 'Vendorfundingcoydetail'
        },
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule { }
