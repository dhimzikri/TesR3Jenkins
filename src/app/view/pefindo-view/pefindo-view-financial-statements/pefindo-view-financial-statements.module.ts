import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewFinancialStatementsRoutingModule } from './pefindo-view-financial-statements-routing.module';
import { PefindoViewFinancialStatementsComponent } from './pefindo-view-financial-statements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [PefindoViewFinancialStatementsComponent],
  imports: [
    CommonModule,
    PefindoViewFinancialStatementsRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class PefindoViewFinancialStatementsModule { }
