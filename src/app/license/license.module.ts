import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseComponent } from './license.component';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { UploadLicenseComponent } from './upload-license/upload-license.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { DetailLicenseComponent } from './detail-license/detail-license.component';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [LicenseComponent, UploadLicenseComponent, DetailLicenseComponent],
  imports: [
    CommonModule,
    LicenseRoutingModule,
    AdInsModule,
    AdInsSharedModule,
    UcSubsectionModule,
    UcShowErrorsModule
  ],
  providers: [
    NGXToastrService
  ]
})
export class LicenseModule { }
