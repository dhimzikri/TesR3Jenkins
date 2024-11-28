import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyOrderComponent } from './survey-order/survey-order.component';
import { SurveyOrderTaskComponent } from './survey-order-task/survey-order-task.component';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { SurveyTaskViewComponent } from './survey-task-view/survey-task-view.component';
import { SurveyOrderTaskWfComponent } from './survey-order-task-wf/survey-order-task-wf.component';
import { PathConstant } from 'app/shared/PathConstant';
import { SurveyorAddComponent } from './surveyor-add/surveyor-add.component';
import { SurveyorPagingComponent } from './surveyor-paging/surveyor-paging.component';
import { SurveyorTaskAssignmentPagingComponent } from './surveyor-task-assignment-paging/surveyor-task-assignment-paging.component';
import { SurveyTaskAssignmentDetailComponent } from './survey-task-assignment-detail/survey-task-assignment-detail.component';
import { SurveyTaskComponent } from './survey-task/survey-task.component';
import { SurveyResultReviewPagingComponent } from './survey-result-review-paging/survey-result-review-paging.component';
import { SurveyResultReviewDetailComponent } from './survey-result-review-detail/survey-result-review-detail.component';
import { SurveyTaskResultDetailComponent } from './survey-task-result-detail/survey-task-result-detail.component';
import { SurveyTaskResultPagingComponent } from './survey-task-result-paging/survey-task-result-paging.component';
import { SurveyTaskResultPageComponent } from './survey-task-result-page/survey-task-result-page.component';
import { UcTemplateComponent } from '@adins/uctemplate';
import { SelfCustomSurveyorTaskAssignmentPagingComponent } from './self-custom/surveyor-task-assignment-paging/self-custom-surveyor-task-assignment-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.SRVY_VIEW_TASK,
        component: SurveyTaskViewComponent,
        data: {
          title: 'Survey Task View'
        },
      },
      {
        path: PathConstant.SRVY_ORDER_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Survey Order Inquiry',
          page: 'SurveyOrderInquiry'
        },
        // component: SurveyOrderComponent,
        // data: {
        //   title: 'Survey Order Inquiry'
        // },
      },
      {
        path: PathConstant.SRVY_TASK,
        component: SurveyOrderTaskComponent,
        data: {
          title: 'Survey Order Task'
        },
      },
      {
        path: PathConstant.VIEW_ORDER_EXT,
        component: SurveyOrderTaskWfComponent,
        data: {
          title: 'Survey Order Task'
        },
      },
      {
        path: PathConstant.VIEW,
        component: SurveyOrderViewComponent,
        data: {
          title: 'Survey Order View'
        },
      },      
      {
        path: PathConstant.SURVEYOR_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Surveyor Paging',
          page: 'SurveyorPaging'
        }
        // component: SurveyorPagingComponent,
        // data: {
        //   title: 'Surveyor Paging'
        // }
      },   
      {
        path: PathConstant.SURVEYOR_ADD,
        component: SurveyorAddComponent,
        data: {
          title: 'Surveyor Add'
        }
      },     
      {
        path: PathConstant.SURVEYOR_TASK_ASSIGNMENT_PAGING,
        component: SurveyorTaskAssignmentPagingComponent,
        data: {
          title: 'Surveyor Task Assignment Paging'
        }
      },
      {
        path: PathConstant.SURVEYOR_TASK_ASSIGNMENT_DETAIL,
        component: SurveyTaskAssignmentDetailComponent,
        data: {
          title: 'Surveyor Task Assignment Detail'
        }
      },
      {
        path: PathConstant.SRVY_TASK_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Survey Task Inquiry',
          page: 'SurveyTaskInquiry'
        },
        // component: SurveyTaskComponent,
        // data: {
        //   title: 'Survey Task Inquiry'
        // }
      },
      {
        path: PathConstant.SRVY_RESULT_REVIEW_PAGING,
        component: UcTemplateComponent,
        data:{
          title: 'Survey Result Review',
          page: 'SurveyResultReview'
        }
        // component: SurveyResultReviewPagingComponent,
        // data:{
        //   title: 'Survey Result Review'
        // }
      },
      {
        path: PathConstant.SRVY_RESULT_REVIEW_DETAIL,
        component: SurveyResultReviewDetailComponent,
        data:{
          title: 'Survey Result Review Detail'
        }
      },
      {
        path: PathConstant.SRVY_TASK_RESULT_PAGING,
        component: SurveyTaskResultPagingComponent,
        data:{
          title: 'Survey Task Result Paging'
        }
      },
      {
        path: PathConstant.SRVY_TASK_RESULT_PAGE,
        component: SurveyTaskResultPageComponent,
        data:{
          title: 'Survey Task Result Detail'
        }
      },
      //self custom uc template
      {
        path: PathConstant.CUSTOM_SRVY_ORDER_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Survey Order Inquiry',
          page: 'SurveyOrderInquiry'
        },
      },
      {
        path: PathConstant.CUSTOM_SRVY_TASK_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Survey Task Inquiry',
          page: 'SurveyTaskInquiry'
        },
      },
      {
        path: PathConstant.CUSTOM_SURVEYOR_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Surveyor Paging',
          page: 'SurveyorPaging'
        }
      },   
      {
        path: PathConstant.CUSTOM_SURVEYOR_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Surveyor Detail',
          page: 'SurveyorDetail'
        }
      }, 
      {
        path: PathConstant.CUSTOM_SRVY_RESULT_REVIEW_PAGING,
        component: UcTemplateComponent,
        data:{
          title: 'Survey Result Review',
          page: 'SurveyResultReview'
        }
      },
      {
        path: PathConstant.CUSTOM_SRVY_RESULT_REVIEW_DETAIL,
        component: UcTemplateComponent,
        data:{
          title: 'Survey Result Review Detail',
          page: 'SurveyResultReviewDetail'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_SURVEYOR_TASK_ASSIGNMENT_PAGING,
        component: SelfCustomSurveyorTaskAssignmentPagingComponent,
      },
      {
        path: PathConstant.SELF_CUSTOM_SURVEYOR_TASK_ASSIGNMENT_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: "SurveyTaskAssignmentDetail"
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_SRVY_TASK_RESULT_PAGING,
        component: UcTemplateComponent,
        data:{
          title: 'Survey Task Result Paging',
          page: 'SurveyTaskResultPaging'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_SRVY_TASK_RESULT_PAGE,
        component: UcTemplateComponent,
        data:{
          title: 'Survey Task Result Detail',
          page: 'SurveyTaskResultPage'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule { }
