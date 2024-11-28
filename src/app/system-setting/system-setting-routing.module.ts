import { RoleUserComponent } from 'app/system-setting/role/role-user/role-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationPagingComponent } from 'app/system-setting/notification/notification-paging/notification-paging.component';
import { NotificationAddEditComponent } from 'app/system-setting/notification/notification-add-edit/notification-add-edit.component';
import { NotificationApprovalPagingComponent } from 'app/system-setting/notification/notification-approval-paging/notification-approval-paging.component';
import { NotificationApprovalDetailComponent } from 'app/system-setting/notification/notification-approval-detail/notification-approval-detail.component';
import { UserPagingComponent } from 'app/system-setting/user/user-paging/user-paging.component';
import { RoleAddEditComponent } from 'app/system-setting/role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from 'app/system-setting/role/role-paging/role-paging.component';
import { UserRoleComponent } from 'app/system-setting/user/user-role/user-role.component';
import { RoleFormComponent } from 'app/system-setting/role/role-form/role-form.component';
import { UserChangePasswordComponent } from 'app/system-setting/user/user-change-password/user-change-password.component';
import { RefFormPagingComponent } from './ref-form/ref-form-paging/ref-form-paging.component';
import { RefFormDetailComponent } from './ref-form/ref-form-detail/ref-form-detail.component';
import { RefFormRoleMappingComponent } from './ref-form/ref-form-role-mapping/ref-form-role-mapping.component';
import { RefFormRolePagingComponent } from './ref-form/ref-form-role-paging/ref-form-role-paging.component';
import { RoleFormPagingComponent } from './role/role-form-paging/role-form-paging.component';
import { AttributeComponent } from './attribute/attribute.component';
import { AttributeDetailComponent } from './attribute/attribute-detail/attribute-detail.component';
import { PathConstant } from 'app/shared/PathConstant';
import { UcTemplateComponent } from '@adins/uctemplate';
import { SelfCustomAttributeDetailComponent } from './self-custom-attribute-detail/self-custom-attribute-detail.component';
import { PathConstantX } from 'app/impl/shared/constant/PathConstantX';
import { RoleFormPagingXComponent } from 'app/impl/system-setting/role/role-form-paging-x/role-form-paging-x.component';
import { RolePagingXComponent } from 'app/impl/system-setting/role/role-paging-x/role-paging-x.component';
import { UploadFormFeaturePagingXComponent } from 'app/impl/organization/upload-form-feature/upload-form-feature-x.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.NOTIF,
        component: NotificationPagingComponent,
        data: {
          title: 'Notification Paging'
        }
      },
      {
        path: PathConstant.NOTIF_DETAIL,
        component: NotificationAddEditComponent,
        data: {
          title: 'Notification Add Edit'
        }
      },
      {
        path: PathConstant.NOTIF_APPRV,
        component: NotificationApprovalPagingComponent,
        data: {
          title: 'Notification Approval Paging'
        }
      },
      {
        path: PathConstant.NOTIF_APPRV_DETAIL,
        component: NotificationApprovalDetailComponent,
        data: {
          title: 'Notification Add Edit'
        }
      },
      {
        path: PathConstant.REF_USER,
        component: UserPagingComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      {
        path: PathConstant.ROLE,
        component: RolePagingComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      //RolePagingXComponent
      {
        path: PathConstantX.ROLE_X,
        component: RolePagingXComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      {
        path: PathConstant.ROLE_DETAIL,
        component: RoleAddEditComponent,
        data: {
          title: 'User Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.USER_ROLE,
        component: UserRoleComponent,
        data: {
          title: 'Assign User to Role'
        },
      },
      {
        path: PathConstant.ROLE_USER,
        component: RoleUserComponent,
        data: {
          title: 'Assign Role to User'
        },
      },
      {
        path: PathConstant.ROLE_FORM,
        component: RoleFormPagingComponent,
        data: {
          title: 'Assign Form to Role Paging'
        },
      },
      {
        path: PathConstantX.ROLE_FORM_X,
        component: RoleFormPagingXComponent,
        data: {
          title: 'Assign Form to Role Paging'
        },
      },
      {
        path: PathConstantX.ROLE_FORM_X,
        component: RoleFormPagingXComponent,
        data: {
          title: 'Assign Form to Role Paging'
        },
      },
      {
        path: PathConstant.ROLE_FORM_ADD,
        component: RoleFormComponent,
        data: {
          title: 'Assign Form to Role Add'
        },
      },
      {
        path: PathConstant.CHANGE_PASSWORD,
        component: UserChangePasswordComponent,
        data: {
          title: 'Change Password Maintenance'
        },
      },
      {
        path: PathConstant.REF_FORM_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Form Paging',
          page: 'FormPaging'
        },
        // component: RefFormPagingComponent,
        // data: {
        //   title: 'Ref Form Paging'
        // },
      },
      {
        path: PathConstant.REF_FORM_DETAIL,
        component: RefFormDetailComponent,
        data: {
          title: 'Ref Form Detail'
        },
      },
      {
        path: PathConstant.REF_FORM_ROLE_MAP,
        component: RefFormRolePagingComponent,
        data: {
          title: 'Ref Form Role Mapping Paging'
        },
      },
      {
        path: PathConstant.REF_FORM_ROLE_MAP_ADD,
        component: RefFormRoleMappingComponent,
        data: {
          title: 'Ref Form Role Mapping Add'
        },
      },
      {
        path: PathConstant.SYS_ATTR_PAGING,
        component: AttributeComponent,
        data: {
          title: 'Attribute Paging'
        },
      },
      {
        path: PathConstant.SYS_ATTR_DETAIL,
        component: AttributeDetailComponent,
        data: {
          title: 'Attribute Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_SYS_ATTR_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Attribute Paging',
          page: 'Sysattr'
        },
      },
      {
        path: PathConstant.CUSTOM_SYS_ATTR_DETAIL,
        component: SelfCustomAttributeDetailComponent,
        data: {
          title: 'Attribute Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ROLE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Role Paging',
          page: 'Rolepaging'
        },
      },
      {
        path: PathConstant.CUSTOM_ROLE_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Role Detail',
          page: 'Roledetail'
        },
      },
      {
        path: PathConstant.CUSTOM_ROLE_FORM_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Role Form Paging',
          page: 'Roleformpaging'
        },
      },
      {
        path: PathConstant.CUSTOM_ROLE_FORM_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Role Form Detail',
          page: 'Roleformdetail'
        },
      },
      {
        path: PathConstant.CUSTOM_ROLE_FORM_FEATURE,
        component: UcTemplateComponent,
        data: {
          title: 'Role Form Feature',
          page: 'RoleFormFeature'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Form Paging',
          page: 'FormPaging'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Form Detail',
          page: 'FormDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_ROLE_MAP_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Form Role Paging',
          page: 'FormRolePaging'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_ROLE_MAP_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Form Role Detail',
          page: 'FormRoleDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_API_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Form API Paging',
          page: 'FormApiPaging'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_API_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Form API Detail',
          page: 'FormApiDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_REF_FORM_API_FEATURE,
        component: UcTemplateComponent,
        data: {
          title: 'Form API Feature',
          page: 'FormApiFeatureDetail'
        },
      },
      // {
      //   path: PathConstantX.UPLOAD_FORM_FEATURE_PAGING_X,
      //   component: UploadFormFeaturePagingXComponent,
      //   data: {
      //     title: 'Upload Form Feature Paging X'
      //   },
      // },
      {
        path: PathConstantX.UPLOAD_FORM_FEATURE_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Upload Form Feature X',
          page: 'UploadFormFeatureXCNAF'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingRoutingModule { }
