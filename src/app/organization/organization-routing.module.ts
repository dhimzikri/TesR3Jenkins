import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from 'app/organization/ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from 'app/organization/business-unit/business-unit.component';
import { AddBusinessUnitComponent } from 'app/organization/business-unit/add-business-unit/add-business-unit.component';
import { RefJobTitleAddComponent } from 'app/organization/ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { MemberBusinessUnitComponent } from 'app/organization/business-unit/member-business-unit/member-business-unit.component';
import { PathConstant } from 'app/shared/PathConstant';
import { UcTemplateComponent } from '@adins/uctemplate';


const routes: Routes = [
  {
    path: '',canActivate: [AuthGuard] ,
    children: [
      {
        path: PathConstant.JOB_TITLE,
        component: RefJobTitleComponent,
        data: {
          title: 'Job Title'
        },
      },
      {
        path: PathConstant.JOB_TITLE_DETAIL,
        component: RefJobTitleAddComponent,
        data: {
          title: 'Job Title add'
        },
      },
      {
        path: PathConstant.BZ_UNIT,
        component: BusinessUnitComponent,
        data: {
          title: 'Business Unit'
        },
      },
      {
        path: PathConstant.BZ_UNIT_DETAIL,
        component: AddBusinessUnitComponent,
        data: {
          title: 'Add Business Unit'
        },
      },
      {
        path: PathConstant.BZ_UNIT_EDIT,
        component: AddBusinessUnitComponent,
        data: {
          title: 'Edit Business Unit'
        },
      },
      {
        path: PathConstant.BZ_UNIT_MEMBER,
        component: MemberBusinessUnitComponent,
        data: {
          title: 'Business Unit Member'
        },
      },
      {
        path: PathConstant.CUSTOM_JOB_TITLE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Job Title Paging',
          page: 'Jobtitlepaging'
        },
      },
      {
        path: PathConstant.CUSTOM_JOB_TITLE_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Job Title Detail',
          page: 'JobTitleDetail'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_BZ_UNIT,
        component: UcTemplateComponent,
        data: {
          title: 'Business Unit',
          page: 'Businessunitpaging'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_BZ_UNIT_MEMBER,
        component: UcTemplateComponent,
        data: {
          title: 'Business Unit Member',
          page: 'Businessunitmember'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_BZ_UNIT_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Business Unit Detail',
          page: 'BusinessUnitDetail'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }
