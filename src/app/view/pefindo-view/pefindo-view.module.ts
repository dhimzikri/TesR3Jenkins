import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewRoutingModule } from './pefindo-view-routing.module';
import { PefindoViewComponent } from './pefindo-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
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

@NgModule({
  declarations: [PefindoViewComponent],
  imports: [
    CommonModule,
    PefindoViewRoutingModule,
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
    UcShowErrorsModule,
    SharedModule,
    AdInsSharedModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewModule { }
