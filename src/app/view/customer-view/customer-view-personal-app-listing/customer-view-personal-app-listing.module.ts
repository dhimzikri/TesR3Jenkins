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
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { CustomerViewPersonalAppListingRoutingModule } from "./customer-view-personal-app-listing-routing.module";
import { CustomerViewPersonalAppListingComponent } from "./customer-view-personal-app-listing.component";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";



@NgModule({
    imports: [
        CustomerViewPersonalAppListingRoutingModule,
        CommonModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UcviewgenericModule,
        UcgridviewModule,
        NgbModule,
        SharingModule,
        AdInsSharedModule,
        ArchwizardModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        SharingComponentModule,
        UcShowErrorsModule,
    ],
    declarations: [
        CustomerViewPersonalAppListingComponent
    ]
})
export class CustomerViewPersonalAppListingModule { }