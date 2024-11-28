import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemUserRoutingModule } from './system-user-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { SystemUserComponent } from './system-user.component';
import { SystemUserAddComponent } from './system-user-add/system-user-add.component';
import { SelfCustomSystemUserComponent } from './self-custom-system-user/self-custom-system-user.component';
import { UcTemplateModule } from '@adins/uctemplate';

@NgModule({
  declarations: [SystemUserComponent, SystemUserAddComponent, SelfCustomSystemUserComponent],
  imports: [
    CommonModule,
    SystemUserRoutingModule,
    FormsModule,
    NgbModule,
    AdInsSharedModule,
    SharingComponentModule,
    AdInsModule,
    UcTemplateModule
  ],
  providers: [
    NGXToastrService
  ]
})
export class SystemUserModule { }
