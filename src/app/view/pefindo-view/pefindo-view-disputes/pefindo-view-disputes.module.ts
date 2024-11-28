import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewDisputesRoutingModule } from './pefindo-view-disputes-routing.module';
import { PefindoViewDisputesComponent } from './pefindo-view-disputes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [PefindoViewDisputesComponent],
  imports: [
    CommonModule,
    PefindoViewDisputesRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule
  ],
  exports: [
    PefindoViewDisputesComponent
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewDisputesModule { }
