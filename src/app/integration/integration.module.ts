import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { MatRadioModule } from "@angular/material/radio";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { IntegrationRoutingModule } from "./integration-routing.module";
import { DailyMasterContinuousFormComponent } from './daily-master-continuous-form/daily-master-continuous-form.component';
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";

@NgModule({
    imports: [
        CommonModule,
        MatRadioModule,
        AdInsModule,
        AdInsSharedModule,
        UcSubsectionModule,
        IntegrationRoutingModule,
    ],
    declarations: [
        DailyMasterContinuousFormComponent,
    ],
    exports: [],
    // providers: [
    //     NGXToastrService
    // ]
})

export class IntegrationModule { }