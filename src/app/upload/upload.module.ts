import { NgModule } from "@angular/core";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharingModule } from "app/shared/sharing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { UploadRoutingModule } from "./upload-routing.module";
import { UploadSettingPagingComponent } from './upload-setting/upload-setting/upload-setting-paging.component';
import { UploadSettingEditComponent } from './upload-setting/upload-setting-edit/upload-setting-edit.component';
import { SharingComponentModule } from "app/shared/sharingcomponent.module";
import { UCSearchModule } from "@adins/ucsearch";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcpagingModule } from "@adins/ucpaging";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcuploadModule } from '@adins/ucupload';
import { UploadNegativeAssetComponent } from './upload-negative-asset/upload-negative-asset.component';
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
@NgModule({
    imports: [
        AdInsModule,
        AdInsSharedModule,
        CommonModule,
        FormsModule,
        NgbModule,
        SharingComponentModule,
        UCSearchModule,
        UcgridfooterModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        UploadRoutingModule,
        UcpagingModule,
        UcviewgenericModule,
        UcuploadModule,
        UclookupgenericModule
    ],
    declarations: [
        UploadMonitoringComponent,
        UploadSettingPagingComponent,
        UploadSettingEditComponent,
        UploadNegativeAssetComponent
    ],

})
export class UploadModule { }