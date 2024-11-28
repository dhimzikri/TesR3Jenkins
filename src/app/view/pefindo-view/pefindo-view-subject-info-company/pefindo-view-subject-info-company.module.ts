import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewSubjectInfoCompanyRoutingModule } from './pefindo-view-subject-info-company-routing.module';
import { PefindoViewSubjectInfoCompanyComponent } from './pefindo-view-subject-info-company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [PefindoViewSubjectInfoCompanyComponent],
  imports: [
    CommonModule,
    PefindoViewSubjectInfoCompanyRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewSubjectInfoCompanyModule { }
