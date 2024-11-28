import { UcSubsectionModule } from '@adins/uc-subsection';
import { UcapprovalHistoryModule } from '@adins/ucapproval-history';
import { UcapprovalR3Module } from '@adins/ucapproval-r3';
import { UcapprovalcreateModule } from '@adins/ucapprovalcreate';
import { UcapprovalgeneralinfoModule } from '@adins/ucapprovalgeneralinfo';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { SharedModule } from 'app/shared/shared.module';
import { ImplRoutingModule } from './impl-routing.module';
import { BankChargePagingXComponent } from './bank-charge/bank-charge-paging/bank-charge-paging-x.component';
import { BankChargeDetailXComponent } from './bank-charge/bank-charge-detail-x/bank-charge-detail-x.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { MatTabsModule } from '@angular/material/tabs';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcaddressModule } from '@adins/ucaddress';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { ArchwizardModule } from 'angular-archwizard';
import { UcapprovalModule } from '@adins/ucapproval';
import { VendorModule } from 'app/vendor/vendor.module';
import { CustomerModule } from 'app/customer/customer.module';
import { EmployeeBankInformationXComponent } from './employee/employee-bank-information/employee-bank-information-x.component';
import { EmployeeBankInformationEditXComponent } from './employee/employee-bank-information-edit-x/employee-bank-information-edit-x.component';
import { RoleFormPagingFeatureXComponent } from './system-setting/role/role-form-paging-feature/role-form-paging-feature-x.component';
import { EmployeeAddXComponent } from './employee/employee-add/employee-add-x.component';
import { EmployeeXComponent } from './employee/employee-x.component';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: false,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ",",
  nullable: false,
  inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
  declarations: [
    BankChargePagingXComponent,
    BankChargeDetailXComponent,
    EmployeeBankInformationXComponent,
    EmployeeBankInformationEditXComponent,  
    RoleFormPagingFeatureXComponent, 
    EmployeeAddXComponent,
    EmployeeXComponent
  ],
  imports: [
    VendorModule,
    CustomerModule,
    CommonModule,
    ImplRoutingModule,
    MatRadioModule,
    AdInsModule,
    UcSubsectionModule,
    SharedModule,
    UcapprovalcreateModule,
    UcapprovalHistoryModule,
    UcapprovalR3Module,
    UcapprovalgeneralinfoModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    AdInsSharedModule,
    FormsModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UclookupgenericModule,
    ReactiveFormsModule,
    UcviewgenericModule,
    NgbDropdownModule,
    ArchwizardModule,
    MatTabsModule,
    UcShowErrorsModule,
    UcaddressModule,
    UcaddtotempModule,
    UcapprovalModule,
    MatRadioModule,
    UiSwitchModule
  ]
})
export class ImplModule { }
