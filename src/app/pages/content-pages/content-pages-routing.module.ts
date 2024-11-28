import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "app/pages/content-pages/login/login-page.component";
import { PathConstant } from 'app/shared/PathConstant';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagesComponent } from './pages/pages.component';
import { RequestNewPasswordComponent } from './request-new-password/request-new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ModuleSelectionComponent } from './module-selection/module-selection.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.CONTENT,
        component: PagesComponent,
        data: {
          title: 'Pages'
        }
      },
      {
        path: PathConstant.LOGIN,
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: PathConstant.CHANGE_PASSWORD,
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password Page'
        }
      },
      {
        path: PathConstant.REQ_PASSWORD,
        component: RequestNewPasswordComponent,
        data: {
          title: 'Request New Password Page'
        }
      },
      {
        path: PathConstant.RESET_PASSWORD,
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password Page'
        }
      },
      {
        path: PathConstant.SELECT_MODULE,
        component: ModuleSelectionComponent,
        data: {
          title: 'Select Module Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
