import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathConstantX } from './shared/constant/PathConstantX';
import { BankChargePagingXComponent } from './bank-charge/bank-charge-paging/bank-charge-paging-x.component';
import { BankChargeDetailXComponent } from './bank-charge/bank-charge-detail-x/bank-charge-detail-x.component';
import { EmployeeBankInformationXComponent } from './employee/employee-bank-information/employee-bank-information-x.component';
import { EmployeeBankInformationEditXComponent } from './employee/employee-bank-information-edit-x/employee-bank-information-edit-x.component';
import { RoleFormPagingFeatureXComponent } from './system-setting/role/role-form-paging-feature/role-form-paging-feature-x.component';
import { EmployeeXComponent } from './employee/employee-x.component';
import { EmployeeAddXComponent } from './employee/employee-add/employee-add-x.component';
import { FundingCompanyPagingXComponent } from './vendor/component/funding-company/funding-company-paging-x/funding-company-paging-x.component';
import { FundingCompanyAddEditXComponent } from './vendor/component/funding-company/funding-company-add-edit-x/funding-company-add-edit-x.component';
import { UcTemplateComponent } from '@adins/uctemplate';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: PathConstantX.CS_BANK_CHARGE_PAGING_X,
      //   component: BankChargePagingXComponent,
      //   data: {
      //     title: 'Bank Charge Paging X'
      //   }
      // },
      {
        path: PathConstantX.CS_BANK_CHARGE_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Charge Paging X',
          page: 'BankChargePagingXCNAF'
        }
      },
      // {
      //   path: PathConstantX.CS_BANK_CHARGE_DETAIL_X,
      //   component: BankChargeDetailXComponent,
      //   data: {
      //     title: 'Bank Charge Paging X'
      //   }
      // },
      {
        path: PathConstantX.CS_BANK_CHARGE_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Charge Detail X',
          page: 'BankChargeDetailXCNAF'
        }
      },
      {
        path : PathConstantX.EMPLOYEE_BANK_INFORMATION_X,
        component: EmployeeBankInformationXComponent,
        data: {
          title : 'Employee Bank Information X'
        },
      },
      {
        path : PathConstantX.EMPLOYEE_BANK_INFORMATION_DETAIL_X,
        component : EmployeeBankInformationEditXComponent,
        data: {
          title : 'Employee Bank Information Edit X'
        },
      },
      {
        path : PathConstantX.ROLE_FORM_FEATURE_X,
        component : RoleFormPagingFeatureXComponent,
        data: {
          title : 'Role Form Paging Feature X'
        }
      },
      // {
      //   path : PathConstantX.EMPLOYEE_PAGING_X,
      //   component : EmployeeXComponent,
      //   data: {
      //     title : 'Employee Paging X'
      //   }
      // },
      {
        path: PathConstantX.EMPLOYEE_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Paging',
          page: 'EmployeePagingXCNAF'
        },
      },
      {
        path: PathConstantX.DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Detail',
          page: 'OrganizationemployeedetailCopyXCNAF'
        },
      },
      {
        path: PathConstantX.EMP_BZ_UNIT_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Business Unit Paging',
          page: 'EmployeeBusinessUnitXCNAF'
        },
      },
      {
        path: PathConstantX.EMP_BZ_UNIT_ADD_X,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Business Unit Detail',
          page: 'EmpbusinessunitdetailV2.1XCNAF'
        },
      },
      // {
      //   path : PathConstantX.DETAIL_X,
      //   component : EmployeeAddXComponent,
      //   data: {
      //     title : 'Employee X'
      //   }
      // },
      {
        path: PathConstantX.VENDOR_FUNDING_COY_PAGING_X,
        component: FundingCompanyPagingXComponent,
        data: {
          title: 'Funding Company Paging X'
        },
      },
      {
        path: PathConstantX.VENDOR_FUNDING_COY_ADD_EDIT_X,
        component: FundingCompanyAddEditXComponent,
        data: {
          title: 'Funding Company AddEdit X'
        },
      },

      {
        path: "IntegrityChecking/General",
        component: UcTemplateComponent,
        data: {
          title: 'Settingintegritycheckinggeneral',
          page: 'Settingintegritycheckinggeneralssms'
        }
      },
      {
        path: "IntegrityChecking/NonGeneral",
        component: UcTemplateComponent,
        data: {
          title: 'Settingintegritycheckinggeneraltest',
          page: 'Settingintegritycheckinggeneraltestssms'
        }
      },
      {
        path: "IntegrityChecking/View",
        component: UcTemplateComponent,
        data: {
          title: 'non general',
          page: 'Icviewdetail'
        }
      },
      {
        path: "IntegrityChecking/ViewValidation",
        component: UcTemplateComponent,
        data: {
          title: 'validation',
          page: 'Icviewdetailvalidation'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImplRoutingModule { }
