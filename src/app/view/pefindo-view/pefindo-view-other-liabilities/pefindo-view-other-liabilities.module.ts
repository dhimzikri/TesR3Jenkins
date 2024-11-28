import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewOtherLiabilitiesRoutingModule } from './pefindo-view-other-liabilities-routing.module';
import { PefindoViewOtherLiabilitiesComponent } from './pefindo-view-other-liabilities.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [PefindoViewOtherLiabilitiesComponent],
  imports: [
    CommonModule,
    PefindoViewOtherLiabilitiesRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ],
  exports: [
    PefindoViewOtherLiabilitiesComponent
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewOtherLiabilitiesModule { }
