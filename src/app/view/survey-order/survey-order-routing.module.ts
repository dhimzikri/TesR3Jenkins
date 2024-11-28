import { NgModule } from '@angular/core';
import { PathConstant } from 'app/shared/PathConstant';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { RouterModule, Routes } from "@angular/router";
import { UcTemplateComponent } from '@adins/uctemplate';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_SRVY_ORDER,
        component: SurveyOrderViewComponent,
        data: {
          title: 'Survey Order View'
        }
      },
      {
        path: PathConstant.CUSTOM_VIEW_SRVY_ORDER,
        component: UcTemplateComponent,
        data: {
          title: 'Survey Order View',
          page: 'SurveyOrderView'
        },
      },
      {
        path: PathConstant.CUSTOM_VIEW_SRVY_TASK,
        component: UcTemplateComponent,
        data: {
          title: 'Survey Task View',
          page: 'SurveyTaskView'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyOrderViewRoutingModule { }
