import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfCustomCustViewRoutingModule } from './self-custom-cust-view-routing.module';
import { UcTemplateModule, UcTemplateService } from '@adins/uctemplate';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelfCustomContainerCustViewDocComponent } from './self-custom-container-cust-view-doc/self-custom-container-cust-view-doc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcgridviewModule } from '@adins/ucgridview';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { SharedModule } from 'app/shared/shared.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelfCustomContainerCustViewFinDataAttrComponent } from './self-custom-container-cust-view-fin-data-attr/self-custom-container-cust-view-fin-data-attr.component';
import { SelfCustomCustExposureViewComponent } from './self-custom-cust-exposure-view/self-custom-cust-exposure-view.component';
import { SelfCustomCustomerViewIframeGenericComponent } from './self-custom-customer-view-iframe-generic/self-custom-customer-view-iframe-generic.component';
import { SelfCustomContainerCustViewFinDataBankStmntComponent } from './self-custom-container-cust-view-fin-data-bank-stmnt/self-custom-container-cust-view-fin-data-bank-stmnt.component';
import { SelfCustomContainerViewExposureBucketComponent } from './self-custom-container-view-exposure-bucket/self-custom-container-view-exposure-bucket.component';
import { SelfCustomCustomerViewCoyFinancialComponent} from './self-custom-customer-view-coy-financial/self-custom-customer-view-coy-financial.component';
import { AdinsTemplateService } from 'app/shared/services/adins-template.service';
import { RouterModule } from '@angular/router';
import { SelfCustomCustViewComponent } from './self-custom-cust-view/self-custom-cust-view.component';

@NgModule({
  declarations: [
    SelfCustomContainerCustViewDocComponent,
    SelfCustomContainerCustViewFinDataAttrComponent,
    SelfCustomCustExposureViewComponent,
    SelfCustomCustomerViewIframeGenericComponent,
    SelfCustomContainerCustViewFinDataBankStmntComponent,
    SelfCustomContainerViewExposureBucketComponent,
    SelfCustomCustomerViewCoyFinancialComponent,
    SelfCustomCustViewComponent
  ],
  imports: [
    CommonModule,
    UcTemplateModule,
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
    UcShowErrorsModule,
    SharedModule,
    AdInsSharedModule,
    RouterModule,
    SelfCustomCustViewRoutingModule
  ],
  providers: [
    { provide: UcTemplateService, useClass: AdinsTemplateService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
]
})
export class SelfCustomCustViewModule { }
