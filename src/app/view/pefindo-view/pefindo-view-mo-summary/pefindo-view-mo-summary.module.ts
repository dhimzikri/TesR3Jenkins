import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewMoSummaryRoutingModule } from './pefindo-view-mo-summary-routing.module';
import { PefindoViewMoSummaryComponent } from './pefindo-view-mo-summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [PefindoViewMoSummaryComponent],
  imports: [
    CommonModule,
    PefindoViewMoSummaryRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewMoSummaryModule { }
