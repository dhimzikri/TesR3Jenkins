import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UCSearchModule } from "@adins/ucsearch";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcapprovalhistModule, UcapprovalhistComponent } from "@adins/ucapprovalhist";
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { CustomerViewPersonalEmergencyContactComponent } from "./customer-view-personal-emergency-contact.component";
import { CustomerViewPersonalEmergencyContactRoutingModule } from "./customer-view-personal-emergency-contact-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";



@NgModule({
    imports: [
        CustomerViewPersonalEmergencyContactRoutingModule,
        CommonModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UcviewgenericModule,
        UcgridviewModule,
        NgbModule,
        SharingModule,
        ArchwizardModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        SharingComponentModule,
        UcapprovalhistModule,
        UcShowErrorsModule,
        SharedModule,
        AdInsSharedModule
    ],
    declarations: [
        ///customer
        CustomerViewPersonalEmergencyContactComponent
    ]
})
export class CustomerViewPersonalEmergencyContactModule { }