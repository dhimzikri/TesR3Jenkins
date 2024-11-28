import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { SystemUserComponent } from './system-user.component';
import { SystemUserAddComponent } from './system-user-add/system-user-add.component';
import { SelfCustomSystemUserComponent } from './self-custom-system-user/self-custom-system-user.component';
import { UcTemplateComponent } from '@adins/uctemplate';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: SystemUserComponent,
        data: {
          title: 'System User'
        }
      },
      {
        path: PathConstant.DETAIL,
        component: SystemUserAddComponent,
        data: {
          title: 'System User Detail'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_SYSTEM_USER_PAGING,
        component: SelfCustomSystemUserComponent
      },
      {
        path: PathConstant.SELF_CUSTOM_SYSTEM_USER_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: "OrganizationemployeedetailForSystemUser"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUserRoutingModule { }
