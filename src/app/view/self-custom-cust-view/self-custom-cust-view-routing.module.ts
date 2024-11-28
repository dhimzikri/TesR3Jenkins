import { UcTemplateComponent } from '@adins/uctemplate';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { SelfCustomCustExposureViewComponent } from './self-custom-cust-exposure-view/self-custom-cust-exposure-view.component';
import { SelfCustomCustViewComponent } from './self-custom-cust-view/self-custom-cust-view.component';

const routes: Routes = [
  {
      path: '',
      children: [
        {
          path: PathConstant.SELF_CUSTOM_VIEW_CUST_PERSONAL_DETAIL,
          component: SelfCustomCustViewComponent,
          data: {
            title: 'View Customer Personal'
          },
        },
        {
          path: PathConstant.SELF_CUSTOM_VIEW_CUST_EXPOSURE,
          component: UcTemplateComponent,
          data: {
            page: 'CustomerExposureView'
          },
        },
        {
          path: PathConstant.SELF_CUSTOM_VIEW_CUST_COY_DETAIL,
          component: UcTemplateComponent,
          data: {
            page: 'CustomerCompanyV2'
          },
        },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfCustomCustViewRoutingModule { }
