import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from 'app/employee/employee.component';
import { EmployeeAddComponent } from 'app/employee/employee-add/employee-add.component';
import { EmployeePositionComponent } from 'app/employee/employee-position/employee-position.component';
import { EmployeePositionAddComponent } from 'app/employee/employee-position/employee-position-add/employee-position-add.component';
import { LeaveMaintenanceComponent } from './leave-maintenance/leave-maintenance/leave-maintenance.component';
import { LeaveMaintenanceAddEditComponent } from './leave-maintenance/leave-maintenance-add-edit/leave-maintenance-add-edit.component';
import { EmployeeBusinessunitAddComponent } from './employee-businessunit-add/employee-businessunit-add.component';
import { EmployeeBusinessunitPagingComponent } from './employee-businessunit-paging/employee-businessunit-paging.component';
import { PathConstant } from 'app/shared/PathConstant';
import { UcTemplateComponent } from '@adins/uctemplate';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: EmployeeComponent,
        data: {
          title: 'Employee'
        },
      },
      // {
      //   path: 'add',
      //   component: EmployeeAddComponent,
      //   data: {
      //     title: 'Add Employee'
      //   }
      // },
      // {
      //   path: 'edit',
      //   component: EmployeeAddComponent,
      //   data: {
      //     title: 'Edit Employee'
      //   }
      // },
      {
        path: PathConstant.DETAIL,
        component: EmployeeAddComponent,
        data: {
          title: 'Employee Detail'
        }
      },
      {
        path: PathConstant.EMP_POS,
        component: EmployeePositionComponent,
        data: {
          title: 'Employee Position'
        }
      },
      {
        path: PathConstant.EMP_POS_DETAIL,
        component: EmployeePositionAddComponent,
        data: {
          title: 'Employee Position Add Edit'
        }
      },
      {
        path: PathConstant.LEAVE_PAGING,
        component: LeaveMaintenanceComponent,
        data: {
          title: 'Leave Maintenance'
        }
      },
      {
        path: PathConstant.LEAVE_ADD,
        component: LeaveMaintenanceAddEditComponent,
        data: {
          title: 'Leave Maintenance Add'
        }
      },
      {
        path: PathConstant.LEAVE_EDIT,
        component: LeaveMaintenanceAddEditComponent,
        data: {
          title: 'Leave Maintenance Edit'
        }
      },
      {
        path: PathConstant.EMP_BZ_UNIT_ADD,
        component: EmployeeBusinessunitAddComponent,
        data: {
          title: 'Employee Business Unit Add'
        }
      },
      {
        path: PathConstant.EMP_BZ_UNIT_PAGING,
        component: EmployeeBusinessunitPagingComponent,
        data: {
          title: 'Employee Business Unit Paging'
        }
      },
      {
        path: PathConstant.CUSTOM_LEAVE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Leave Management Paging',
          page: 'EmployeeLeaveManagementPaging'
        },
      },
      {
        path: PathConstant.CUSTOM_LEAVE_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Leave Management Detail',
          page: 'EmployeeLeaveManagementDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Paging',
          page: 'EmployeePaging'
        },
      },
      {
        path: PathConstant.CUSTOM_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Detail',
          page: 'OrganizationemployeedetailCopy'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_EMP_BZ_UNIT_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Business Unit Paging',
          page: 'EmployeeBusinessUnit'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_EMP_BZ_UNIT_ADD,
        component: UcTemplateComponent,
        data: {
          title: 'Employee Business Unit Detail',
          page: 'EmpbusinessunitdetailV2.1'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
