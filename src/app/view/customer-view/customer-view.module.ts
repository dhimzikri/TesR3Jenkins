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
import { UclookupgenericComponent, UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { CustomerViewComponent } from "./customer-view.component";
import { CustomerViewHeaderPersonalComponent } from "./customer-view-header-personal/customer-view-header-personal.component";
import { CustomerViewHeaderCompanyComponent } from "./customer-view-header-company/customer-view-header-company.component";
import { CustomerViewRoutingModule } from "./customer-view-routing.module";
import { CustomerViewIframeGenericComponent } from "./customer-view-iframe-generic/customer-view-iframe-generic.component";
import { SharedModule } from "app/shared/shared.module";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "app/interceptor/httpconfig.interceptor";
import { UcTemplateModule } from "@adins/uctemplate";


@NgModule({
    imports: [
        CustomerViewRoutingModule,
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
        AdInsSharedModule,
        UcTemplateModule
    ],
    declarations: [
        CustomerViewComponent,
        CustomerViewHeaderPersonalComponent,
        CustomerViewHeaderCompanyComponent,
        CustomerViewIframeGenericComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class CustomerViewModule { }
