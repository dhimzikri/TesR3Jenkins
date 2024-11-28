import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfCustomPefindoViewRoutingModule } from './self-custom-pefindo-view-routing.module';
import { UcTemplateModule, UcTemplateService } from '@adins/uctemplate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcgridviewModule } from '@adins/ucgridview';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { SharedModule } from 'app/shared/shared.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';
import { AdinsTemplateService } from 'app/shared/services/adins-template.service';
import { SelfCustomViewPefindoScoreComponent } from './self-custom-view-pefindo-score/self-custom-view-pefindo-score.component';


@NgModule({
  declarations: [
    SelfCustomViewPefindoScoreComponent
  ],
  imports: [
    CommonModule,
    UcTemplateModule,
    CommonModule,
    FormsModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcviewgenericModule,
    UcgridviewModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcShowErrorsModule,
    SharedModule,
    AdInsSharedModule,
    SelfCustomPefindoViewRoutingModule
  ],
  providers: [
    { provide: UcTemplateService, useClass: AdinsTemplateService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
]
})
export class SelfCustomPefindoViewModule { }
