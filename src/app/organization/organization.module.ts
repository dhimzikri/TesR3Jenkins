import { OrgJobTitlePagingComponent } from './org-mdl-struc/org-job-title-paging/org-job-title-paging.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from 'app/organization/organization-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefJobTitleComponent } from 'app/organization/ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from 'app/organization/business-unit/business-unit.component';
import { AddBusinessUnitComponent } from 'app/organization/business-unit/add-business-unit/add-business-unit.component';
import { RefJobTitleAddComponent } from 'app/organization/ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { OrganizationComponent } from 'app/organization/organization.component';
import { OrgMdlStrucDetailComponent } from 'app/organization/org-mdl-struc/org-mdl-struc-detail/org-mdl-struc-detail.component';
import { OrgMdlStrucPagingComponent } from 'app/organization/org-mdl-struc/org-mdl-struc-paging/org-mdl-struc-paging.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { MemberBusinessUnitComponent } from './business-unit/member-business-unit/member-business-unit.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { UcTemplateModule } from '@adins/uctemplate';

@NgModule({
  imports: [
    AdInsModule,
    AdInsSharedModule,
    OrganizationRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UclookupgenericModule,
    UcpagingModule,
    ReactiveFormsModule,
    UcviewgenericModule,
    UcSubsectionModule,
    UcShowErrorsModule,
    UcTemplateModule
  ],
  declarations: [
    RefJobTitleComponent,
    OrganizationComponent,
    BusinessUnitComponent,
    AddBusinessUnitComponent,
    RefJobTitleAddComponent,
    OrganizationComponent,
    OrgMdlStrucPagingComponent,
    OrgMdlStrucDetailComponent,
    OrgJobTitlePagingComponent,
    MemberBusinessUnitComponent
  ],
  providers: [
    NGXToastrService
  ]
})
export class OrganizationModule { }
