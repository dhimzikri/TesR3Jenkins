import { MasterTypeAddEditComponent } from 'app/common-setting/master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from 'app/common-setting/master/master-paging/master-paging.component';
import { MasterAddEditComponent } from 'app/common-setting/master/master-add-edit/master-add-edit.component';
import { CommonSettingRoutingModule } from 'app/common-setting/common-setting-routing.module';

import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralSettingAddEditComponent } from 'app/common-setting/general-setting/general-setting-add-edit/general-setting-add-edit.component';
import { GeneralSettingPagingComponent } from 'app/common-setting/general-setting/general-setting-paging/general-setting-paging.component';
import { CurrencyComponent } from 'app/common-setting/currency/currency.component';
import { CurrencyAddComponent } from 'app/common-setting/currency/currency-add/currency-add.component';
import { WorkingHourPagingComponent } from './working-hour-scheme/working-hour-paging/working-hour-paging.component';
import { WorkingHourHDetailComponent } from './working-hour-scheme/working-hour-h-detail/working-hour-h-detail.component';
import { HolidayPagingComponent } from './holiday-scheme/holiday-paging/holiday-paging.component';
import { HolidayDetailComponent } from './holiday-scheme/holiday-detail/holiday-detail.component';
import { HolidayDetailAddComponent } from './holiday-scheme/holiday-detail-add/holiday-detail-add.component';
import { OfficeZipcodeMemberComponent } from './office-zipcode-member/office-zipcode-member.component';
import { OfficeZipcodeMemberAddComponent } from './office-zipcode-member/office-zipcode-member-add/office-zipcode-member-add.component';
import { OfficeZipcodeMemberPagingComponent } from './office-zipcode-member/office-zipcode-member-paging/office-zipcode-member-paging.component';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { HolidayAddComponent } from './holiday-scheme/holiday-add/holiday-add.component';
import { EconomicSectorComponent } from './economic-sector/economic-sector-paging/economic-sector.component';
import { EconomicSectorAddEditComponent } from './economic-sector/economic-sector-add-edit/economic-sector-add-edit.component';
import { ProvinceComponent } from './prov-district/province-paging/province.component';
import { ProvinceAddEditComponent } from './prov-district/province-add-edit/province-add-edit.component';
import { DistrictComponent } from './prov-district/district-paging/district.component';
import { DistrictAddEditComponent } from './prov-district/district-add-edit/district-add-edit.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { WorkingHourDDetailComponent } from './working-hour-scheme/working-hour-d-detail/working-hour-d-detail.component';
import { RefStatusPagingComponent } from './ref-status/ref-status-paging/ref-status-paging.component';
import { ProfessionComponent } from './profession/profession-paging/profession.component';
import { ProfessionAddEditComponent } from './profession/profession-add-edit/profession-add-edit.component';
import { MasterTypePagingComponent } from './master-type/master-type-paging/master-type-paging.component';
import { FormModule } from 'app/forms/forms.module';
import { RefIndustryTypeComponent } from './ref-industry-type/ref-industry-type.component';
import { RefIndustryTypeDetailComponent } from './ref-industry-type/ref-industry-type-detail/ref-industry-type-detail.component';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';
import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { HolidayDetailEditComponent } from './holiday-scheme/holiday-detail-edit/holiday-detail-edit.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScoreCategoryPagingComponent } from './score-category/score-category-paging/score-category-paging';
import { ScoreCategoryTypeComponent } from './score-category/score-category-type/score-category-type.component';
import { ScoreCategoryScoringComponent } from './score-category/score-category-scoring/score-category-scoring.component';
import { ReasonComponent } from './reason/reason-paging/reason.component';
import { ReasonAddEditComponent } from './reason/reason-add-edit/reason-add-edit.component';
import { AppSourceAddEditComponent } from './app-source/app-source-add-edit/app-source-add-edit.component';
import { AppSourcePagingComponent } from './app-source/app-source-paging/app-source-paging.component';
import { AppSourceOfficeMemberPagingComponent } from './app-source/app-source-office-member/app-source-office-member-paging/app-source-office-member-paging.component';
import { AppSourceOfficeMemberAddComponent } from './app-source/app-source-office-member/app-source-office-member-add/app-source-office-member-add.component';
import { PaymentAllocPagingComponent } from './payment-alloc/payment-alloc-paging/payment-alloc-paging.component';
import { PaymentAllocDetailComponent } from './payment-alloc/payment-alloc-detail/payment-alloc-detail.component';
import { PaymentAllocGroupPagingComponent } from './payment-alloc-group/payment-alloc-group-paging/payment-alloc-group-paging.component';
import { PaymentAllocGroupDetailComponent } from './payment-alloc-group/payment-alloc-group-detail/payment-alloc-group-detail.component';
import { CoaPagingComponent } from './coa/coa-paging/coa-paging.component';
import { CoaDetailComponent } from './coa/coa-detail/coa-detail.component';
import { CoaEditDetailComponent } from './coa/coa-edit-detail/coa-edit-detail.component';
import { CoaSchemePagingComponent } from './coa-scheme/coa-scheme-paging/coa-scheme-paging.component';
import { CoaSchemeDetailComponent } from './coa-scheme/coa-scheme-detail/coa-scheme-detail.component';
import { CoaSchemeViewComponent } from './coa-scheme/coa-scheme-view/coa-scheme-view.component';
import { OfficeBankAccountAccDetailComponent } from './office-bank-account/office-bank-account-acc-detail/office-bank-account-acc-detail.component';
import { OfficeBankAccountDetailComponent } from './office-bank-account/office-bank-account-detail/office-bank-account-detail.component';
import { OfficeBankAccountPagingComponent } from './office-bank-account/office-bank-account-paging/office-bank-account-paging.component';
import { UcaddressModule } from '@adins/ucaddress';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { GeneralSettingAdminComponent } from './general-setting-admin/general-setting-admin.component';
import { GeneralSettingAdminDetailComponent } from './general-setting-admin/general-setting-admin-detail/general-setting-admin-detail.component';
import { IndustryTypeCategoryPagingComponent } from './industry-type-category/industry-type-category-paging/industry-type-category-paging.component';
import { IndustryTypeCategoryDetailComponent } from './industry-type-category/industry-type-category-detail/industry-type-category-detail.component';
import { ExchangeRateDetailComponent } from './exchange-rate/exchange-rate-detail/exchange-rate-detail.component';
import { ExchangeRatePagingComponent } from './exchange-rate/exchange-rate-paging/exchange-rate-paging.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { SharedModule } from 'app/shared/shared.module';
import { RefTcComponent } from './ref-tc/ref-tc-paging/ref-tc.component';
import { RefTcAddEditComponent } from './ref-tc/ref-tc-add-edit/ref-tc-add-edit.component';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { TaxOfficeDetailComponent } from './tax-office/tax-office-detail/tax-office-detail.component';
import { TaxOfficePagingComponent } from './tax-office/tax-office-paging/tax-office-paging.component';
import { RefAmrtzAddEditComponent } from './ref-amrtz-item/ref-amrtz-add-edit/ref-amrtz-add-edit.component';
import { RefAmrtzItemPagingComponent } from './ref-amrtz-item/ref-amrtz-item-paging/ref-amrtz-item-paging.component';
import { CustomEconomicSectorAddEditComponent } from './custom/economic-sector/custom-economic-sector-add-edit/custom-economic-sector-add-edit.component';
import { CustomEconomicSectorComponent } from './custom/economic-sector/custom-economic-sector-paging/custom-economic-sector-paging.component';
import { CustomMasterAddEditComponent } from './custom/master/master-add-edit/custom-master-add-edit.component';
import { CustomMasterComponent } from './custom/master/master-paging/custom-master-paging.component';
import { AdinsTemplateService } from 'app/shared/services/adins-template.service';
import { RefTrxTypePagingComponent } from './ref-trx-type/ref-trx-type-paging/ref-trx-type-paging.component';
import { RefTrxTypeDetailComponent } from './ref-trx-type/ref-trx-type-detail/ref-trx-type-detail.component';
import { UcTemplateModule, UcTemplateService } from '@adins/uctemplate';
import { PaymentAllocGroupHDetailComponent } from './payment-alloc-group-new/payment-alloc-group-h-detail/payment-alloc-group-h-detail.component';
import { PaymentAllocGroupHPagingComponent } from './payment-alloc-group-new/payment-alloc-group-h-paging/payment-alloc-group-h-paging.component';
import { PaymentAllocGroupDPagingComponent } from './payment-alloc-group-new/payment-alloc-group-d-paging/payment-alloc-group-d-paging.component';
import { PaymentAllocGroupDDetailComponent } from './payment-alloc-group-new/payment-alloc-group-d-detail/payment-alloc-group-d-detail.component';
import { RefInsClaimDocAddEditComponent } from './ref-ins-claim-doc/ref-ins-claim-doc-add-edit/ref-ins-claim-doc-add-edit.component';
import { RefInsClaimDocPagingComponent } from './ref-ins-claim-doc/ref-ins-claim-doc-paging/ref-ins-claim-doc-paging.component';
import { CustomCoaSchemeDetailComponent } from './custom-coa-scheme/custom-coa-scheme-detail/custom-coa-scheme-detail.component';
import { SelfCustomContainerHolidayDetailComponent } from './holiday-scheme/self-custom-container-holiday-detail/self-custom-container-holiday-detail.component';
import { SelfCustomContainerWorkingHourDDetailComponent } from './working-hour-scheme/self-custom-container-working-hour-d-detail/self-custom-container-working-hour-d-detail.component';
import { SelfCustomContainerDmsIframeProjectComponent } from './Project/self-custom-container-dms-iframe-project/self-custom-container-dms-iframe-project.component';
import { PaymentAllocDetailNewComponent } from './payment-alloc/payment-alloc-detail-new/payment-alloc-detail-attr.component';
import { PaymentAllocDetailAttributeComponent } from './payment-alloc/payment-alloc-detail-new/payment-alloc-detail-attribute/payment-alloc-detail-attribute.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { OfficeBankAccountPagingXComponent } from 'app/impl/common-setting/office-bank-account/office-bank-account-paging/office-bank-account-paging-x.component';
import { OfficeBankAccountDetailXComponent } from 'app/impl/common-setting/office-bank-account/office-bank-account-detail/office-bank-account-detail-x.component';
import { CustomEconomicSectorXComponent } from 'app/impl/common-setting/custom/economic-sector/custom-economic-sector-paging/custom-economic-sector-paging-x.component';
import { CustomEconomicSectorAddEditXComponent } from 'app/impl/common-setting/custom/economic-sector/custom-economic-sector-add-edit/custom-economic-sector-add-edit-x.component';
import { OfficeBankAccountAccDetailXComponent } from 'app/impl/common-setting/office-bank-account/office-bank-account-acc-detail/office-bank-account-acc-detail-x.component';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ",",
  nullable: false,
  inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
  imports: [
    CommonSettingRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    UiSwitchModule.forRoot({
      size: 'small',
      checkedLabel: 'on',
      uncheckedLabel: 'off'
    }),
    UCSearchModule,
    UcgridfooterModule,
    SharingComponentModule,
    ReactiveFormsModule,
    FormModule,
    UcpagingModule,
    UclookupgenericModule,
    UcSubsectionModule,
    UcviewgenericModule,
    UcShowErrorsModule,
    UcSubsectionModule,
    ColorPickerModule,
    UcaddressModule,
    AdInsModule,
    SharedModule,
    AdInsSharedModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    UcTemplateModule
  ],
  declarations: [
    MasterPagingComponent,
    MasterAddEditComponent,
    MasterTypePagingComponent,
    MasterTypeAddEditComponent,
    GeneralSettingAddEditComponent,
    PaymentAllocDetailNewComponent,
    GeneralSettingPagingComponent,
    CurrencyComponent,
    CurrencyAddComponent,
    WorkingHourPagingComponent,
    WorkingHourHDetailComponent,
    WorkingHourDDetailComponent,
    HolidayPagingComponent,
    HolidayDetailComponent,
    HolidayDetailAddComponent,
    OfficeZipcodeMemberComponent,
    OfficeZipcodeMemberAddComponent,
    OfficeZipcodeMemberPagingComponent,
    HolidayAddComponent,
    EconomicSectorComponent,
    EconomicSectorAddEditComponent,
    ProvinceComponent,
    ProvinceAddEditComponent,
    DistrictComponent,
    DistrictAddEditComponent,
    RefStatusPagingComponent,
    ProfessionComponent,
    ProfessionAddEditComponent,
    RefIndustryTypeComponent,
    BankComponent,
    BankAddComponent,
    ZipcodeComponent,
    ZipcodeAddComponent,
    RefIndustryTypeDetailComponent,
    HolidayDetailEditComponent,
    ScoreCategoryPagingComponent,
    ScoreCategoryTypeComponent,
    ScoreCategoryScoringComponent,
    ReasonComponent,
    ReasonAddEditComponent,
    AppSourceAddEditComponent,
    AppSourcePagingComponent,
    AppSourceOfficeMemberPagingComponent,
    AppSourceOfficeMemberAddComponent,
    PaymentAllocPagingComponent,
    PaymentAllocDetailComponent,
    PaymentAllocGroupPagingComponent,
    PaymentAllocGroupDetailComponent,
    CoaPagingComponent,
    CoaDetailComponent,
    CoaEditDetailComponent,
    CoaSchemePagingComponent,
    CoaSchemeDetailComponent,
    CoaSchemeViewComponent,
    OfficeBankAccountAccDetailComponent,
    OfficeBankAccountAccDetailXComponent,
    OfficeBankAccountDetailComponent,
    OfficeBankAccountDetailXComponent,
    OfficeBankAccountPagingComponent,
    OfficeBankAccountPagingXComponent,
    GeneralSettingAdminComponent,
    GeneralSettingAdminDetailComponent,
    IndustryTypeCategoryPagingComponent,
    IndustryTypeCategoryDetailComponent,
    ExchangeRateDetailComponent,
    ExchangeRatePagingComponent,
    RefTcComponent,
    RefTcAddEditComponent,
    TaxOfficeDetailComponent,
    TaxOfficePagingComponent,
    RefInsClaimDocPagingComponent,
    RefInsClaimDocAddEditComponent,
    CustomEconomicSectorComponent,
    CustomEconomicSectorXComponent,
    CustomEconomicSectorAddEditComponent,
    CustomEconomicSectorAddEditXComponent,
    CustomMasterComponent,
    CustomMasterAddEditComponent,
    RefAmrtzAddEditComponent,
    RefAmrtzItemPagingComponent,
    RefTrxTypePagingComponent,
    RefTrxTypeDetailComponent,
    PaymentAllocGroupHDetailComponent,
    PaymentAllocGroupHPagingComponent,
    PaymentAllocGroupDDetailComponent,
    PaymentAllocGroupDPagingComponent,
    SelfCustomContainerHolidayDetailComponent,
    SelfCustomContainerWorkingHourDDetailComponent,
    CustomCoaSchemeDetailComponent,
    SelfCustomContainerDmsIframeProjectComponent,
    PaymentAllocDetailAttributeComponent
  ],
  providers: [
    { provide: UcTemplateService, useClass: AdinsTemplateService }
  ]
})
export class CommonSettingModule { }
