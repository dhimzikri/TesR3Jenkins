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
import { CustomerViewTrustingSocialRoutingModule } from "./customer-view-trusting-social-routing.module";
import { CustomerViewTrustingSocialComponent } from "./customer-view-trusting-social.component";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "app/interceptor/httpconfig.interceptor";



@NgModule({
    exports: [
        CustomerViewTrustingSocialComponent
    ],
    imports: [
        CustomerViewTrustingSocialRoutingModule,
        CommonModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UcviewgenericModule,
        UcgridviewModule,
        NgbModule,
        AdInsSharedModule,
        SharingModule,
        ArchwizardModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        SharingComponentModule,
        UcShowErrorsModule,
    ],
    declarations: [
        CustomerViewTrustingSocialComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class CustomerViewTrustingSocialModule { }