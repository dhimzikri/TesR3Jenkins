import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcaddressModule } from '@adins/ucaddress';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyOrderComponent } from './survey-order/survey-order.component';
import { SurveyOrderTaskComponent } from './survey-order-task/survey-order-task.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { SurveyTaskViewComponent } from './survey-task-view/survey-task-view.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { SurveyOrderTaskWfComponent } from './survey-order-task-wf/survey-order-task-wf.component';
import { SurveyorTaskAssignmentPagingComponent } from './surveyor-task-assignment-paging/surveyor-task-assignment-paging.component';
import { SurveyorPagingComponent } from './surveyor-paging/surveyor-paging.component';
import { SurveyorAddComponent } from './surveyor-add/surveyor-add.component';
import { UcgridviewModule } from '@adins/ucgridview';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { SurveyTaskAssignmentDetailComponent } from './survey-task-assignment-detail/survey-task-assignment-detail.component';
import { SurveyTaskComponent } from './survey-task/survey-task.component';
import { SurveyResultReviewPagingComponent } from './survey-result-review-paging/survey-result-review-paging.component';
import { SurveyResultReviewDetailComponent } from './survey-result-review-detail/survey-result-review-detail.component';
import { SurveyTaskResultDetailComponent } from './survey-task-result-detail/survey-task-result-detail.component';
import { SurveyTaskResultPagingComponent } from './survey-task-result-paging/survey-task-result-paging.component';
import { SurveyTaskResultPageComponent } from './survey-task-result-page/survey-task-result-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { MatTabsModule } from '@angular/material/tabs';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { UcTemplateModule } from '@adins/uctemplate';
import { CustomSurveyResultReviewDetailComponent } from './custom-survey-result-review-detail/custom-survey-result-review-detail.component';
import { SelfCustomSurveyorTaskAssignmentPagingComponent } from './self-custom/surveyor-task-assignment-paging/self-custom-surveyor-task-assignment-paging.component';
import { SelfCustomContainerSurveyTaskResultDetailComponent } from './self-custom-container-survey-task-result-detail/self-custom-container-survey-task-result-detail.component';
import { SelfCustomContainerSurveyTaskResultUploadDocComponent } from './self-custom-container-survey-task-result-upload-doc/self-custom-container-survey-task-result-upload-doc.component';

@NgModule({
  imports: [
    AdInsModule,
    SurveyRoutingModule,
    CommonModule,
    ArchwizardModule,
    MatTabsModule,
    FormsModule,
    SharedModule,
    AdInsSharedModule,
    NgbModule,
    UcpagingModule,
    UcSubsectionModule,
    SharingComponentModule,
    ReactiveFormsModule,
    UcaddressModule,
    UclookupgenericModule,
    UcviewgenericModule,
    UcShowErrorsModule,
    UcgridviewModule,
    UcTemplateModule
  ],
  declarations: [
    SurveyOrderComponent,
    SurveyOrderTaskComponent,
    SurveyOrderViewComponent,
    SurveyTaskViewComponent,
    SurveyOrderTaskWfComponent,
    SurveyorAddComponent,
    SurveyorPagingComponent,
    SurveyorTaskAssignmentPagingComponent,
    SurveyTaskAssignmentDetailComponent,
    SurveyTaskComponent,
    SurveyResultReviewPagingComponent,
    SurveyResultReviewDetailComponent,
    SurveyTaskResultDetailComponent,
    SurveyTaskResultPagingComponent,
    SurveyTaskResultPageComponent,
    CustomSurveyResultReviewDetailComponent,
    SelfCustomSurveyorTaskAssignmentPagingComponent,
    SelfCustomContainerSurveyTaskResultDetailComponent,
    SelfCustomContainerSurveyTaskResultUploadDocComponent
  ],
  providers: [
    NGXToastrService
  ]
})
export class SurveyModule { }
 