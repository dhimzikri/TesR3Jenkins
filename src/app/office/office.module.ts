import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from 'app/office/office.component';
import { OfficeRoutingModule } from 'app/office/office-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfficeAddComponent } from 'app/office/office-add/office-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeEmpPosComponent } from 'app/office/office-emp-pos/office-emp-pos.component';
import { OfficeEmpPosAddComponent } from 'app/office/office-emp-pos/office-emp-pos-add/office-emp-pos-add.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { OfficeGroupMemberComponent } from './office-group-member/office-group-member.component';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { OfficeGroupMemberAddComponent } from './office-group-member-add/office-group-member-add.component';
import { UcaddressModule } from '@adins/ucaddress';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { OfficeAreaMemberAddComponent } from './office-area/office-area-member/office-area-member-add/office-area-member-add.component';
import { OfficeAreaAddEditComponent } from './office-area/office-area-add-edit/office-area-add-edit.component';
import { OfficeAreaPagingComponent } from './office-area/office-area-paging/office-area-paging.component';
import { OfficeAreaMemberPagingComponent } from './office-area/office-area-member/office-area-member-paging/office-area-member-paging.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { OfficeEmpViewComponent } from './office-emp-view/office-emp-view.component';


@NgModule({
  imports: [
    AdInsModule,
    OfficeRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    AdInsSharedModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcSubsectionModule,
    SharingComponentModule,
    ReactiveFormsModule,
    UcaddressModule,
    UclookupgenericModule,
    UcShowErrorsModule,
    UcviewgenericModule,
    UcaddtotempModule
  ],
  declarations: [
    OfficeComponent,
    OfficeAddComponent,
    OfficeEmpPosComponent,
    OfficeEmpPosAddComponent,
    OfficeAreaAddEditComponent,
    OfficeAreaPagingComponent,
    OfficeGroupMemberComponent,
    OfficeGroupMemberAddComponent,
    OfficeAreaMemberPagingComponent,
    OfficeAreaMemberAddComponent,
    OfficeEmpViewComponent
  ],
  providers: [
    NGXToastrService
  ]
})
export class OfficeModule { }
 