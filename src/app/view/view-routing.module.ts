import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_CUST,
        loadChildren: () => import('./customer-view/customer-view.module').then(m => m.CustomerViewModule)
      },
      {
        path: PathConstant.VIEW_VENDOR,
        loadChildren: () => import('./vendor/vendor-view.module').then(m => m.VendorViewModule)
      },
      {
        path: PathConstant.VIEW_NEG_CUST,
        loadChildren: () => import('./negative-customer-view/negative-customer-view.module').then(m => m.NegativeCustomerViewModule)
      },
      {
        path: PathConstant.VIEW_SRVY,
        loadChildren: () => import('./survey-order/survey-order-view.module').then(m => m.SurveyOrderViewModule)
      },
      {
        path: PathConstant.VIEW_CUST_EXPSR,
        loadChildren: () => import('./cust-exposure-view/cust-exposure-view.module').then(m => m.CustExposureViewModule)
      },
      {
        path: PathConstant.VIEW_SRVY_TASK,
        loadChildren: () => import('./survey-task-view/survey-task-view.module').then(m => m.SurveyTaskViewModule)
      },
      {
        path: PathConstant.VIEW_PEFINDO,
        loadChildren: () => import('./pefindo-view/pefindo-view.module').then(m => m.PefindoViewModule)
      },
      {
        path: PathConstant.VIEW_NOTIF_TEMPLATE,
        loadChildren: () => import('./notif-engine-template-view/notif-engine-template-view.module').then(m => m.NotifEngineTemplateViewModule)
      },
      {
        path: PathConstant.VENDOR_FUNDING_COY,
        loadChildren: () => import('./vendor/vendor-view.module').then(m => m.VendorViewModule)
      },
      {
        path: PathConstant.CUSTOM_VIEW_NEG_CUST,
        loadChildren: () => import('./custom/negative-customer-view/custom-negative-customer-view.module').then(m => m.CustomNegativeCustomerViewModule)
      },
      {
        path: PathConstant.SELF_CUSTOM_VIEW_CUST,
        loadChildren: () => import('./self-custom-cust-view/self-custom-cust-view.module').then(m => m.SelfCustomCustViewModule)
      },
      {
        path: PathConstant.SELF_CUSTOM_VIEW_PEFINDO,
        loadChildren: () => import('./self-custom-pefindo-view/self-custom-pefindo-view.module').then(m => m.SelfCustomPefindoViewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
