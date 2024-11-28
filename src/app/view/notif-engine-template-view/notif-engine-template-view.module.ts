import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifEngineTemplateViewRoutingModule } from './notif-engine-template-view-routing.module';
import { NotifEngineTemplateViewComponent } from './notif-engine-template-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UCSearchModule } from '@adins/ucsearch';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcgridviewModule } from '@adins/ucgridview';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { SharingModule } from 'app/shared/sharing.module';
import { NotifEngineTemplateViewMainComponent } from './notif-engine-template-view-main/notif-engine-template-view-main.component';
import { NotifEngineTemplateViewHistoryComponent } from './notif-engine-template-view-history/notif-engine-template-view-history.component';


@NgModule({
  declarations: [
    NotifEngineTemplateViewComponent,
    NotifEngineTemplateViewMainComponent,
    NotifEngineTemplateViewHistoryComponent
  ],
  imports: [
    NotifEngineTemplateViewRoutingModule,
    CommonModule,
    FormsModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UclookupgenericModule,
    UcviewgenericModule,
    UcgridviewModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcShowErrorsModule,
  ]
})
export class NotifEngineTemplateViewModule { }
