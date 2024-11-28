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
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule } from "@adins/ucgridview";
import { CustExposureViewRoutingModule } from "./cust-exposure-view-routing.module";
import { CustExposureViewComponent } from "./cust-exposure-view.component";
import { ObligorExposureComponent } from './obligor-exposure/obligor-exposure.component';
import { CustExposureComponent } from './cust-exposure/cust-exposure.component';
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "app/interceptor/httpconfig.interceptor";
@NgModule({
    imports: [
        CustExposureViewRoutingModule,
        CommonModule,
        FormsModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UclookupgenericModule,
        UcviewgenericModule,
        UcgridviewModule,
        NgbModule,
        AdInsSharedModule,
        SharingModule,
        ArchwizardModule,
        ReactiveFormsModule,
        UcSubsectionModule,
        SharingComponentModule,
    ],
    declarations: [
        CustExposureViewComponent,
        ObligorExposureComponent,
        CustExposureComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class CustExposureViewModule { }