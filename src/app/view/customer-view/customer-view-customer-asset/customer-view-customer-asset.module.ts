import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { CustomerViewCustomerAssetRoutingModule } from './customer-view-customer-asset-routing.module';
import { CustomerViewCustomerAssetComponent } from './customer-view-customer-asset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';

@NgModule({
    declarations: [
        CustomerViewCustomerAssetComponent
    ],
    imports: [
        CommonModule,
        CustomerViewCustomerAssetRoutingModule,
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
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class CustomerViewCustomerAssetModule { }
