import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UCSearchModule } from "@adins/ucsearch";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UclookupgenericComponent, UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcapprovalhistModule, UcapprovalhistComponent } from "@adins/ucapprovalhist";
import { SharedModule } from "app/shared/shared.module";

import { SurveyTaskViewRoutingModule } from './survey-task-view-routing.module';
import { SurveyTaskViewComponent } from './survey-task-view.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { ViewSurveyTaskDetailComponent } from './view-survey-task-detail/view-survey-task-detail.component';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { CustomDocumentSurveyTaskViewComponent } from './custom-document-survey-task-view/custom-document-survey-task-view.component';

@NgModule({
    declarations: [SurveyTaskViewComponent,
        ViewSurveyTaskDetailComponent,
        CustomDocumentSurveyTaskViewComponent],
    imports: [
        CommonModule,
        SurveyTaskViewRoutingModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcgridviewModule,
        NgbModule,
        SharingModule,
        ArchwizardModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        SharingComponentModule,
        UcapprovalhistModule,
        UcShowErrorsModule,
        SharedModule,
        AdInsSharedModule
    ],
    exports: [CustomDocumentSurveyTaskViewComponent]
})
export class SurveyTaskViewModule { }
