import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewInquiriesRoutingModule } from './pefindo-view-inquiries-routing.module';
import { PefindoViewInquiriesComponent } from './pefindo-view-inquiries.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [PefindoViewInquiriesComponent],
  imports: [
    CommonModule,
    PefindoViewInquiriesRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewInquiriesModule { }
