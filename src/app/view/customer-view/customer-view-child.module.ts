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
import { UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { CustomerViewPersonalOtherAttrComponent } from "./customer-view-personal-other-attr/customer-view-personal-other-attr.component";
import { CustomerViewCoyAppListingComponent } from "./customer-view-coy-app-listing/customer-view-coy-app-listing.component";
import { CustomerViewCoyExposureComponent } from "./customer-view-coy-exposure/customer-view-coy-exposure.component";
import { CustomerViewCoyCustScoreComponent } from "./customer-view-coy-cust-score/customer-view-coy-cust-score.component";
import { CustomerViewCoyCustAddColateralComponent } from "./customer-view-coy-cust-add-colateral/customer-view-coy-cust-add-colateral.component";
import { CustomerViewChildRoutingModule } from "./customer-view-child-routing.module";
import { CustomerViewPersonalAddressComponent } from "./customer-view-personal-address/customer-view-personal-address.component";
import { CustomerViewPersonalCustomerGroupComponent } from "./customer-view-personal-customer-group/customer-view-personal-customer-group.component";
import { CustomerViewCoyAddressComponent } from "./customer-view-coy-address/customer-view-coy-address.component";
import { SharedModule } from "app/shared/shared.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "app/interceptor/httpconfig.interceptor";


@NgModule({
    imports: [
        CustomerViewChildRoutingModule,
        CommonModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcgridviewModule,
        NgbModule,
        SharingModule,
        ArchwizardModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        SharingComponentModule,
        UcShowErrorsModule,
        SharedModule,
        AdInsSharedModule
    ],
    declarations: [
        CustomerViewCoyAppListingComponent,
        CustomerViewCoyExposureComponent,
        CustomerViewCoyCustScoreComponent,
        CustomerViewCoyCustAddColateralComponent,
        CustomerViewPersonalAddressComponent,
        CustomerViewCoyAddressComponent,
        CustomerViewPersonalCustomerGroupComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class CustomerViewChildModule { }