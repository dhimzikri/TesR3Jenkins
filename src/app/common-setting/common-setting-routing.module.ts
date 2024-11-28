import { MasterTypeAddEditComponent } from 'app/common-setting/master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from 'app/common-setting/master/master-paging/master-paging.component';
import { MasterAddEditComponent } from 'app/common-setting/master/master-add-edit/master-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterTypePagingComponent } from 'app/common-setting/master-type/master-type-paging/master-type-paging.component';
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
import { HolidayAddComponent } from './holiday-scheme/holiday-add/holiday-add.component';
import { EconomicSectorComponent } from './economic-sector/economic-sector-paging/economic-sector.component';
import { EconomicSectorAddEditComponent } from './economic-sector/economic-sector-add-edit/economic-sector-add-edit.component';
import { ProvinceComponent } from './prov-district/province-paging/province.component';
import { ProvinceAddEditComponent } from './prov-district/province-add-edit/province-add-edit.component';
import { DistrictComponent } from './prov-district/district-paging/district.component';
import { DistrictAddEditComponent } from './prov-district/district-add-edit/district-add-edit.component';
import { WorkingHourDDetailComponent } from './working-hour-scheme/working-hour-d-detail/working-hour-d-detail.component';
import { RefStatusPagingComponent } from './ref-status/ref-status-paging/ref-status-paging.component';
import { ProfessionComponent } from './profession/profession-paging/profession.component';
import { ProfessionAddEditComponent } from './profession/profession-add-edit/profession-add-edit.component';
import { RefIndustryTypeComponent } from './ref-industry-type/ref-industry-type.component';
import { RefIndustryTypeDetailComponent } from './ref-industry-type/ref-industry-type-detail/ref-industry-type-detail.component';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';
import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';
import { HolidayDetailEditComponent } from './holiday-scheme/holiday-detail-edit/holiday-detail-edit.component';
import { ScoreCategoryPagingComponent } from './score-category/score-category-paging/score-category-paging';
import { ScoreCategoryTypeComponent } from './score-category/score-category-type/score-category-type.component';
import { ScoreCategoryScoringComponent } from './score-category/score-category-scoring/score-category-scoring.component';
import { ReasonComponent } from './reason/reason-paging/reason.component';
import { ReasonAddEditComponent } from './reason/reason-add-edit/reason-add-edit.component';
import { AppSourcePagingComponent } from './app-source/app-source-paging/app-source-paging.component';
import { AppSourceAddEditComponent } from './app-source/app-source-add-edit/app-source-add-edit.component';
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
import { PathConstant } from 'app/shared/PathConstant';
import { OfficeBankAccountAccDetailComponent } from './office-bank-account/office-bank-account-acc-detail/office-bank-account-acc-detail.component';
import { OfficeBankAccountDetailComponent } from './office-bank-account/office-bank-account-detail/office-bank-account-detail.component';
import { OfficeBankAccountPagingComponent } from './office-bank-account/office-bank-account-paging/office-bank-account-paging.component';
import { GeneralSettingAdminComponent } from './general-setting-admin/general-setting-admin.component';
import { GeneralSettingAdminDetailComponent } from './general-setting-admin/general-setting-admin-detail/general-setting-admin-detail.component';
import { IndustryTypeCategoryDetailComponent } from './industry-type-category/industry-type-category-detail/industry-type-category-detail.component';
import { IndustryTypeCategoryPagingComponent } from './industry-type-category/industry-type-category-paging/industry-type-category-paging.component';
import { ExchangeRateDetailComponent } from './exchange-rate/exchange-rate-detail/exchange-rate-detail.component';
import { ExchangeRatePagingComponent } from './exchange-rate/exchange-rate-paging/exchange-rate-paging.component';
import { RefTcComponent } from './ref-tc/ref-tc-paging/ref-tc.component';
import { RefTcAddEditComponent } from './ref-tc/ref-tc-add-edit/ref-tc-add-edit.component';
import { TaxOfficeDetailComponent } from './tax-office/tax-office-detail/tax-office-detail.component';
import { TaxOfficePagingComponent } from './tax-office/tax-office-paging/tax-office-paging.component';
import { CustomEconomicSectorComponent } from './custom/economic-sector/custom-economic-sector-paging/custom-economic-sector-paging.component';
import { CustomEconomicSectorAddEditComponent } from './custom/economic-sector/custom-economic-sector-add-edit/custom-economic-sector-add-edit.component';
import { CustomMasterAddEditComponent } from './custom/master/master-add-edit/custom-master-add-edit.component';
import { CustomMasterComponent } from './custom/master/master-paging/custom-master-paging.component';
import { RefAmrtzAddEditComponent } from './ref-amrtz-item/ref-amrtz-add-edit/ref-amrtz-add-edit.component';
import { RefAmrtzItemPagingComponent } from './ref-amrtz-item/ref-amrtz-item-paging/ref-amrtz-item-paging.component';
import { RefTrxTypePagingComponent } from './ref-trx-type/ref-trx-type-paging/ref-trx-type-paging.component';
import { RefTrxTypeDetailComponent } from './ref-trx-type/ref-trx-type-detail/ref-trx-type-detail.component';
import { PaymentAllocGroupHPagingComponent } from './payment-alloc-group-new/payment-alloc-group-h-paging/payment-alloc-group-h-paging.component';
import { PaymentAllocGroupHDetailComponent } from './payment-alloc-group-new/payment-alloc-group-h-detail/payment-alloc-group-h-detail.component';
import { PaymentAllocGroupDDetailComponent } from './payment-alloc-group-new/payment-alloc-group-d-detail/payment-alloc-group-d-detail.component';
import { PaymentAllocGroupDPagingComponent } from './payment-alloc-group-new/payment-alloc-group-d-paging/payment-alloc-group-d-paging.component';
import { RefInsClaimDocAddEditComponent } from './ref-ins-claim-doc/ref-ins-claim-doc-add-edit/ref-ins-claim-doc-add-edit.component';
import { RefInsClaimDocPagingComponent } from './ref-ins-claim-doc/ref-ins-claim-doc-paging/ref-ins-claim-doc-paging.component';
import { UcTemplateComponent } from '@adins/uctemplate';
import { PaymentAllocDetailNewComponent } from './payment-alloc/payment-alloc-detail-new/payment-alloc-detail-attr.component';
import { OfficeBankAccountPagingXComponent } from 'app/impl/common-setting/office-bank-account/office-bank-account-paging/office-bank-account-paging-x.component';
import { PathConstantX } from 'app/impl/shared/constant/PathConstantX';
import { OfficeBankAccountDetailXComponent } from 'app/impl/common-setting/office-bank-account/office-bank-account-detail/office-bank-account-detail-x.component';
import { CustomEconomicSectorXComponent } from 'app/impl/common-setting/custom/economic-sector/custom-economic-sector-paging/custom-economic-sector-paging-x.component';
import { CustomEconomicSectorAddEditXComponent } from 'app/impl/common-setting/custom/economic-sector/custom-economic-sector-add-edit/custom-economic-sector-add-edit-x.component';
import { OfficeBankAccountAccDetailXComponent } from 'app/impl/common-setting/office-bank-account/office-bank-account-acc-detail/office-bank-account-acc-detail-x.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.CS_MASTER_TYPE,
        component: MasterTypePagingComponent,
        data: {
          title: 'Master Type Maintenance Paging'
        },
      },
      {
        path: PathConstant.CS_MASTER_TYPE_DETAIL,
        component: MasterTypeAddEditComponent,
        data: {
          title: 'Master Type Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.CS_MASTER,
        component: CustomMasterComponent,
        data: {
          title: 'Economic Sector Detail'
        },
        // component: MasterPagingComponent,
        // data: {
        //   title: 'Master Maintenance Paging'
        // },
      },
      {
        path: PathConstant.CS_MASTER_DETAIL,
        component: MasterAddEditComponent,
        data: {
          title: 'Master Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.CS_GEN_SETTING,
        component: UcTemplateComponent,
        data: {
          title: 'General Setting Maintenance Paging',
          page: 'Generalsetting'
        },
        // component: GeneralSettingPagingComponent,
        // data: {
        //   title: 'General Setting Maintenance Paging'
        // },
      },
      {
        path: PathConstant.CS_GEN_SETTING_DETAIL,
        component: GeneralSettingAddEditComponent,
        data: {
          title: 'General Setting Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.CS_GEN_SETTING_ADMIN,
        component: GeneralSettingAdminComponent,
        data: {
          title: 'General Setting Admin Paging'
        },
      },
      {
        path: PathConstant.CS_GEN_SETTING_DETAIL_ADMIN,
        component: GeneralSettingAdminDetailComponent,
        data: {
          title: 'General Setting Admin Add Edit'
        },
      },
      {
        path: PathConstant.CS_CURRENCY_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Currency',
          page: 'Currency'
        },
        // component: CurrencyComponent,
        // data: {
        //   title: 'Currency'
        // },
      },
      {
        path: PathConstant.CS_CURRENCY_ADD,
        component: CurrencyAddComponent,
        data: {
          title: 'Currency add'
        },
      },
      {
        path: PathConstant.CS_EXCHANGE_RATE_DETAIL,
        component: ExchangeRateDetailComponent,
        data: {
          title: 'Exchange Rate Detail'
        },
      },
      {
        path: PathConstant.CS_EXCHANGE_RATE_PAGING,
        component: ExchangeRatePagingComponent,
        data: {
          title: 'Exchange Rate Paging'
        },
      },
      {
        path: PathConstant.CS_WORKING_HOUR,
        component: WorkingHourPagingComponent,
        data: {
          title: 'Working Hour'
        },
      },
      {
        path: PathConstant.CS_WORKING_HOUR_ADD,
        component: WorkingHourHDetailComponent,
        data: {
          title: 'Working Hour Add Edit'
        },
      },
      {
        path: PathConstant.CS_WORKING_HOUR_DETAIL,
        component: WorkingHourDDetailComponent,
        data: {
          title: 'Working Hour Detail'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY,
        component: HolidayPagingComponent,
        data: {
          title: 'Holiday'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_ADD,
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Add'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_EDIT,
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Edit'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_DETAIL,
        component: HolidayDetailComponent,
        data: {
          title: 'Holiday Detail'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_DETAIL_ADD,
        component: HolidayDetailAddComponent,
        data: {
          title: 'Holiday Detail Add'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_DETAIL_EDIT,
        component: HolidayDetailEditComponent,
        data: {
          title: 'Holiday Detail Edit'
        },
      },
      {
        path: PathConstant.CS_OFFICE_ZIPCODE_MBR,
        component: OfficeZipcodeMemberComponent,
        data: {
          title: 'office Zipcode Member'
        },
      },
      {
        path: PathConstant.CS_OFFICE_ZIPCODE_MBR_PAGING,
        component: OfficeZipcodeMemberPagingComponent,
        data: {
          title: 'office Zipcode Member Paging'
        },
      },
      {
        path: PathConstant.CS_OFFICE_ZIPCODE_MBR_ADD,
        component: OfficeZipcodeMemberAddComponent,
        data: {
          title: 'office Zipcode Member Add'
        },
      },
      {
        path: PathConstant.CS_ECONOMIC_SECTOR_PAGING,
        component: CustomEconomicSectorComponent,
        data: {
          title: 'Economic Sector Detail'
        },
        // component: EconomicSectorComponent,
        // data: {
        //   title: 'Economic Sector Paging'
        // },
      },
      {
        path: PathConstantX.CS_ECONOMIC_SECTOR_PAGING_X,
        component: CustomEconomicSectorXComponent,
        data: {
          title: 'Economic Sector Detail'
        },
        // component: EconomicSectorComponent,
        // data: {
        //   title: 'Economic Sector Paging'
        // },
      },
      {
        path: PathConstant.CS_ECONOMIC_SECTOR_DETAIL,
        component: EconomicSectorAddEditComponent,
        data: {
          title: 'Economic Sector Add Edit'
        },
      },
      {
        path: PathConstant.CS_REF_PROVINCE_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "ProvincePaging"
        },
        // component: ProvinceComponent,
        // data: {
        //   title: 'Province Paging'
        // },
      },
      {
        path: PathConstant.CS_REF_PROVINCE_DETAIL,
        component: ProvinceAddEditComponent,
        data: {
          title: 'Province Add Edit'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_CS_REF_PROVINCE_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "ProvincePaging"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_CS_REF_PROVINCE_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: "ProvinceDetail"
        },
      },
      {
        path: PathConstant.CS_DISTRICT_PAGING,
        component: DistrictComponent,
        data: {
          title: 'District Paging'
        },
      },
      {
        path: PathConstant.CS_DISTRICT_DETAIL,
        component: DistrictAddEditComponent,
        data: {
          title: 'District Add Edit'
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_CS_DISTRICT_PAGING,
        component: UcTemplateComponent,
        data: {
          page: "DistrictPaging"
        },
      },
      {
        path: PathConstant.SELF_CUSTOM_CS_DISTRICT_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: "DistrictDetail"
        },
      },
      {
        path: PathConstant.CS_REF_STATUS_PAGING,
        component: RefStatusPagingComponent,
        data: {
          title: 'Ref Status Paging'
        }
      },
      {
        path: PathConstant.CS_PROFESSION_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Profession Paging',
          page: 'Professionpaging'
        }
        // component: ProfessionComponent,
        // data: {
        //   title: 'Profession Paging'
        // },
      },
      {
        path: PathConstantX.CS_PROFESSION_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Profession Paging',
          page: 'ProfessionPagingXCNAF'
        }
        // component: ProfessionComponent,
        // data: {
        //   title: 'Profession Paging'
        // },
      },
      {
        path: PathConstant.CS_PROFESSION_DETAIL,
        component: ProfessionAddEditComponent,
        data: {
          title: 'Profession Add Edit'
        },
      },
      {
        path: PathConstant.CS_INDUSTRY_TYPE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Paging',
          page: 'IndustryTypePaging'
        }
        // component: RefIndustryTypeComponent,
        // data: {
        //   title: 'Industry Type Paging'
        // },
      },
      {
        path: PathConstantX.CS_INDUSTRY_TYPE_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Paging X',
          page: 'IndustryTypePagingXCNAF'
        }
        // component: RefIndustryTypeComponent,
        // data: {
        //   title: 'Industry Type Paging'
        // },
      },
      {
        path: PathConstant.CS_INDUSTRY_TYPE_DETAIL,
        component: RefIndustryTypeDetailComponent,
        data: {
          title: 'Industry Type Detail'
        },
      },
      {
        path: PathConstantX.CS_INDUSTRY_TYPE_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Detail X',
          page: 'IndustryTypeDetailXCNAF'
        }
        // component: RefIndustryTypeComponent,
        // data: {
        //   title: 'Industry Type Paging'
        // },
      },
      {
        path: PathConstant.CS_BANK_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Paging',
          page: 'Fou-sysset-bank'
        },
        // component: BankComponent,
        // data: {
        //   title: 'Bank Paging'
        // },
      },
      {
        path: PathConstantX.CS_BANK_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Paging',
          page: 'Fou-sysset-bankXCNAF'
        },
        // component: BankComponent,
        // data: {
        //   title: 'Bank Paging'
        // },
      },
      {
        path: PathConstant.CS_BANK_DETAIL,
        component: BankAddComponent,
        data: {
          title: 'Bank Detail'
        },
      },
      {
        path: PathConstant.CS_ZIPCODE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Zipcode Paging',
          page: 'ZipcodePaging'
        },
        // component: ZipcodeComponent,
        // data: {
        //   title: 'Zipcode Paging'
        // },
      },
      {
        path: PathConstantX.CS_ZIPCODE_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Zipcode Paging',
          page: 'ZipcodepagingXCNAF'
        },
        // component: ZipcodeComponent,
        // data: {
        //   title: 'Zipcode Paging'
        // },
      },
      {
        path: PathConstant.CS_ZIPCODE_DETAIL,
        component: ZipcodeAddComponent,
        data: {
          title: 'Zipcode Detail'
        },
      },
      {
        path: PathConstant.CS_SCORE_CATEGORY_PAGING,
        component: ScoreCategoryPagingComponent,
        data: {
          title: 'Score Category Paging'
        },
      },
      {
        path: PathConstant.CS_SCORE_CATEGORY_TYPE,
        component: ScoreCategoryTypeComponent,
        data: {
          title: 'Score Category Type'
        },
      },
      {
        path: PathConstant.CS_SCORE_CATEGORY_SCORE,
        component: ScoreCategoryScoringComponent,
        data: {
          title: 'Score Category Scoring'
        },
      },
      {
        path: PathConstant.CS_REASON_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Custom Reason  ',
          page: 'Reason'
        }
        // component: ReasonComponent,
        // data: {
        //   title: 'Reason Paging'
        // },
      },
      {
        path: PathConstant.CS_REASON_DETAIL,
        component: ReasonAddEditComponent,
        data: {
          title: 'Reason Paging'
        },
      },
      {
        path: 'AppSource/Paging',
        component: AppSourcePagingComponent,
        data: {
          title: 'Application Source Paging'
        },
      },
      {
        path: 'AppSource/Detail',
        component: AppSourceAddEditComponent,
        data: {
          title: 'Application Source Add Edit'
        },
      },
      {
        path: 'AppSource/OfficeMember/Paging',
        component: AppSourceOfficeMemberPagingComponent,
        data: {
          title: 'Application Source Office Member Paging'
        },
      },
      {
        path: 'AppSource/OfficeMember/Add',
        component: AppSourceOfficeMemberAddComponent,
        data: {
          title: 'Application Source Office Member Add'
        },
      },
      
      // Office Bank Account
      { path: PathConstant.CS_OFFICE_BANK_ACCOUNT_PAGING, component: OfficeBankAccountPagingComponent, data: { title: 'OFFICE BANK ACCOUNT' } },
      { path: PathConstantX.CS_OFFICE_BANK_ACCOUNT_PAGING_X, component: OfficeBankAccountPagingXComponent, data: { title: 'OFFICE BANK ACCOUNT X' } },
      { path: PathConstant.CS_OFFICE_BANK_ACCOUNT_DETAIL, component: OfficeBankAccountDetailComponent, data: { title: 'OFFICE BANK ACCOUNT' } },
      { path: PathConstantX.CS_OFFICE_BANK_ACCOUNT_DETAIL_X, component: OfficeBankAccountDetailXComponent, data: { title: 'OFFICE BANK ACCOUNT' } },
      { path: PathConstant.CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL, component: OfficeBankAccountAccDetailComponent, data: { title: 'OFFICE BANK ACCOUNT' } },
      { path: PathConstantX.CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL_X, component: OfficeBankAccountAccDetailXComponent, data: { title: 'OFFICE BANK ACCOUNT' } },

      // PAYMENT ALLOCATION
      {
        path: PathConstant.CS_PAYMENT_ALLOC_PAGING,
        component: PaymentAllocPagingComponent,
        data: {
          title: 'Payment Allocation'
        },

        // component: UcTemplateComponent,
        // data: {
        //   title: 'Payment Allocation Paging',
        //   page: 'PaymentAllocationPaging'
        // },
      },
      // PAYMENT ALLOCATION X
      {
        path: PathConstantX.CS_PAYMENT_ALLOC_PAGING_X,
        component: UcTemplateComponent,
        data: {
          title: 'Payment Allocation Paging X',
          page: 'PaymentAllocationPagingXCNAF'
        },
        // component: PaymentAllocPagingComponent,
        // data: {
        //   title: 'Payment Allocation'
        // },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_DETAIL,
        component: PaymentAllocDetailNewComponent,
        data: {
          title: 'Payment Allocation Detail'
        },
      },

      // PAYMENT ALLOCATION GROUP
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_PAGING,
        component: PaymentAllocGroupPagingComponent,
        data: {
          title: 'Payment Allocation Group'
        },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_DETAIL,
        component: PaymentAllocDetailNewComponent,
        data: {
          title: 'Payment Allocation Group'
        },
      },

      // COA
      {
        path: PathConstant.CS_COA_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'COA',
          page: 'Coa'
        },
        // component: CoaPagingComponent,
        // data: {
        //   title: 'COA'
        // },
      },
      {
        path: PathConstant.CS_COA_DETAIL,
        component: CoaDetailComponent,
        data: {
          title: 'COA'
        },
      },
      {
        path: PathConstant.CS_COA_DETAIL_EDIT,
        component: CoaEditDetailComponent,
        data: {
          title: 'COA'
        },
      },
      
      //COA Scheme
      {
        path: PathConstant.CS_COA_SCHM_PAGING,
        component: CoaSchemePagingComponent,
        data: {
          title: 'COA Scheme'
        },
      },
      {
        path: PathConstant.CS_COA_SCHM_DETAIL,
        component: CoaSchemeDetailComponent,
        data: {
          title: 'COA Scheme'
        },
      },
      {
        path: PathConstant.CS_COA_SCHM_VIEW,
        component: CoaSchemeViewComponent,
        data: {
          title: 'COA Scheme'
        },
      },

      {
        path: PathConstant.CS_INDUSTRY_TYPE_CAT_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Category Paging',
          page: 'IndustryTypeCategoryPaging'
        }
        // component: IndustryTypeCategoryPagingComponent,
        // data: {
        //   title: 'Industry Type Category'
        // },
      },
      {
        path: PathConstant.CS_INDUSTRY_TYPE_CAT_DETAIL,
        component: IndustryTypeCategoryDetailComponent,
        data: {
          title: 'Industry Type Category'
        },
      },

      //REF TC
      {
        path: PathConstant.CS_REF_TC_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Ref TC',
          page: 'Reftc'
        },
        // component: RefTcComponent,
        // data: {
        //   title: 'Ref TC'
        // },
      },
      {
        path: PathConstant.CS_REF_TC_DETAIL,
        component: RefTcAddEditComponent,
        data: {
          title: 'Ref TC Add Edit'
        },
      },

      //TAX OFFICE
      {
        path: PathConstant.CS_REF_TAX_OFFICE_DETAIL,
        component: TaxOfficeDetailComponent,
        data: {
          title: 'Tax Office Detail'
        },
      },
      {
        path: PathConstant.CS_REF_TAX_OFFICE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Tax Office Paging',
          page: 'TaxOffice'
        },
        // component: TaxOfficePagingComponent,
        // data: {
        //   title: 'Tax Office Paging'
        // },
      },

      //REF INS CLAIM DOC
      {
        path: PathConstant.CS_REF_INS_CLAIM_DOC_DETAIL,
        component: RefInsClaimDocAddEditComponent,
        data: {
          title: 'Insurance Claim Document Detail'
        },
      },
      {
        path: PathConstant.CS_REF_INS_CLAIM_DOC_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Insurance Claim Document Paging',
          page: 'InsuranceClaimDoc'
        },
        // component: RefInsClaimDocPagingComponent,
        // data: {
        //   title: 'Insurance Claim Document Paging'
        // },
      },

      //CUSTOM UC TEMPLATE
      {
        path: PathConstant.CS_CUSTOM_ECONOMIC_SECTOR_PAGING,
        component: CustomEconomicSectorComponent,
        data: {
          title: 'Economic Sector Detail'
        },
      },
      {
        path: PathConstant.CS_CUSTOM_ECONOMIC_SECTOR_DETAIL,
        component: CustomEconomicSectorAddEditComponent,
        data: {
          title: 'Economic Sector Paging'
        },
      },
      {
        path: PathConstantX.CS_CUSTOM_ECONOMIC_SECTOR_DETAIL_X,
        component: CustomEconomicSectorAddEditXComponent,
        data: {
          title: 'Economic Sector Paging X'
        },
      },
      {
        path: PathConstant.CS_CUSTOM_MASTER_PAGING,
        component: CustomMasterComponent,
        data: {
          title: 'Economic Sector Detail'
        },
      },
      {
        path: PathConstant.CS_CUSTOM_MASTER_DETAIL,
        component: CustomMasterAddEditComponent,
        data: {
          title: 'Economic Sector Paging'
        },
      },
      
      //REF AMRTZ ITEM
      {
        path: PathConstant.CS_REF_AMRTZ_ITEM_DETAIL,
        component: UcTemplateComponent,
        data: {
          page: 'RefAmortizeItemDetail',
          title: 'Amortize Item Detail'
        },
      },
      {
        path: PathConstant.CS_REF_AMRTZ_ITEM_PAGING,
        component: UcTemplateComponent,
        data: {
          page: 'RefAmrtzItem',
          title: 'Amortize Item Paging'
        },
      },
      
      //REF TRX TYPE
      {
        path: PathConstant.CS_REF_TRX_TYPE_PAGING,
        component: RefTrxTypePagingComponent,
        data: {
          title: 'Ref Trx Type Paging'
        },
      },
      {
        path: PathConstant.CS_REF_TRX_TYPE_DETAIL,
        component: RefTrxTypeDetailComponent,
        data: {
          title: 'Ref Trx Type Detail'
        },
      },

      // PAYMENT ALLOCATION GROUP H AND D
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_H_PAGING,
        component: PaymentAllocGroupHPagingComponent,
        data: {
          title: 'Payment Allocation Group Paging'
        },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_H_DETAIL,
        component: PaymentAllocGroupHDetailComponent,
        data: {
          title: 'Payment Allocation Group Detail'
        },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_D_PAGING,
        component: PaymentAllocGroupDPagingComponent,
        data: {
          title: 'Payment Allocation Paging'
        },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_D_DETAIL,
        component: PaymentAllocGroupDDetailComponent,
        data: {
          title: 'Payment Allocation Detail'
        },
      },
      //Custom Page
      {
        path: PathConstant.SELF_CUSTOM_CS_REASON_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Custom Reason  ',
          page: 'Reason'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_CS_REASON_DETAIL,
        component: ReasonAddEditComponent,
        data: {
          title: 'Reason Paging',
          page: 'ReasonRegistration'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_GEN_SETTING,
        component: UcTemplateComponent,
        data: {
          title: 'General Setting Maintenance Paging',
          page: 'Generalsetting'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_GEN_SETTING_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'General Setting Maintenance Add Edit',
          page: 'GeneralSettingEdit'
        },
      },
      {
        path: PathConstant.CS_CUSTOM_INDUSTRY_TYPE_CAT_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Category Paging',
          page: 'IndustryTypeCategoryPaging'
        }
      },
      {
        path: PathConstant.CS_CUSTOM_INDUSTRY_TYPE_CAT_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Category Detail',
          page: 'IndustryTypeCategoryDetail'
        }
      },
      {
        path: PathConstant.CS_CUSTOM_INDUSTRY_TYPE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Paging',
          page: 'IndustryTypePaging'
        }
      },
      {
        path: PathConstant.CS_CUSTOM_INDUSTRY_TYPE_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Detail',
          page: 'IndustryTypeDetail'
        }
      },
      {
        path: PathConstantX.CS_CUSTOM_INDUSTRY_TYPE_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Industry Type Detail',
          page: 'IndustryTypeDetailXCNAF'
        }
      },
      {
        path: PathConstant.CS_CUSTOM_PROFESSION_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Profession Paging',
          page: 'Professionpaging'
        }
      },
      {
        path: PathConstant.CS_CUSTOM_PROFESSION_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Profession Detail',
          page: 'ProfessionDetail'
        }
      },
      {
        path: PathConstantX.CS_CUSTOM_PROFESSION_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Profession Detail',
          page: 'ProfessiondetailXCNAF'
        }
      },
      {
        
        path: PathConstant.CUSTOM_CS_BANK_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Paging',
          page: 'Fou-sysset-bank'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_BANK_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Detail',
          page: 'FouBankRegistration'
        },
      },
      {
        path: PathConstantX.CUSTOM_CS_BANK_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Bank Detail',
          page: 'FouBankRegistrationXCNAF'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_REF_TC_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Ref TC',
          page: 'Reftc'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_REF_TC_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Ref TC Add Edit',
          page: 'ReftcDetail'
        },
      },
      {
        path: PathConstant.CS_CUSTOM_PAYMENT_ALLOC_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Payment Allocation Paging',
          page: 'PaymentAllocationPaging'
        },
      },
      {
        path: PathConstant.CS_CUSTOM_PAYMENT_ALLOC_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Payment Allocation Detail',
          page: 'Paymentallocationdetailnew'
        },
      },
      {
        path: PathConstantX.CS_CUSTOM_PAYMENT_ALLOC_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Payment Allocation Detail',
          page: 'PaymentallocationdetailnewXCNAF'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_REF_INS_CLAIM_DOC_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Insurance Claim Document Detail',
          page: 'Insuranceclaimdocdetail'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_REF_INS_CLAIM_DOC_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Insurance Claim Document Paging',
          page: 'InsuranceClaimDoc'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_REF_TAX_OFFICE_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Tax Office Detail',
          page: 'Taxofficedetail'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_REF_TAX_OFFICE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Tax Office Paging',
          page: 'TaxOffice'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_ZIPCODE_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Zipcode Paging',
          page: 'ZipcodePaging'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_ZIPCODE_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Zipcode Detail',
          page: 'ZipcodeDetail'
        },
      },
      {
        path: PathConstantX.CUSTOM_CS_ZIPCODE_DETAIL_X,
        component: UcTemplateComponent,
        data: {
          title: 'Zipcode Detail',
          page: 'ZipcodeDetailXCNAF'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_CURRENCY_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Currency',
          page: 'Currency'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_CURRENCY_ADD,
        component: UcTemplateComponent,
        data: {
          title: 'Currency add',
          page: 'CurrencyRegistration'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_COA_SCHM_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'COA Scheme',
          page: 'CoaScheme'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_COA_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'COA',
          page: 'Coa'
        },
      },
      { 
        path: PathConstant.CUSTOM_CS_OFFICE_BANK_ACCOUNT_PAGING,
         component: UcTemplateComponent,
          data: { 
            title: 'OFFICE BANK ACCOUNT' ,
            page: 'OfficeBankAcc'
        } 
      },
      { 
        path: PathConstant.CUSTOM_CS_OFFICE_BANK_ACCOUNT_DETAIL, 
        component: UcTemplateComponent, 
        data: { 
          title: 'OFFICE BANK ACCOUNT' ,
          page: 'Officebankaccdetail'
        } 
      },
      { 
        path: PathConstant.CUSTOM_CS_OFFICE_BANK_ACCOUNT_ACC_DETAIL, 
        component: UcTemplateComponent, 
        data: { 
          title: 'OFFICE BANK ACCOUNT' ,
          page: 'Officebankaccaddress'
        } 
      },
      {
        path: PathConstant.CUSTOM_CS_COA_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'COA',
          page: 'Coadetail'
        }
      },      
      {
        path: PathConstant.CS_SELF_CUSTOM_HOLIDAY,
        component: UcTemplateComponent,
        data: {
          title: 'Holiday',
          page: 'HolidaySchemePaging'
        },
      },
      {
        path: PathConstant.CS_SELF_CUSTOM_HOLIDAY_ADD_EDIT,
        component: UcTemplateComponent,
        data: {
          title: 'Holiday Registration',
          page: 'HolidaySchemeAddEdit'
        },
      },
      {
        path: PathConstant.CS_SELF_CUSTOM_HOLIDAY_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Holiday Detail',
          page: 'HolidaySchemeDetailAddEdit'
        },
      },
      {
        path: PathConstant.CS_SELF_CUSTOM_HOLIDAY_DETAIL_ADD_EDIT,
        component: UcTemplateComponent,
        data: {
          title: 'Holiday Detail Registration',
          page: 'HolidaySchemeDetailRegistation'
        },
      },      {
        path: PathConstant.CS_SELF_CUSTOM_WORKING_HOUR,
        component: UcTemplateComponent,
        data: {
          title: 'Working Hour',
          page: 'WorkingHourSchemePaging'
        },
      },
      {
        path: PathConstant.CS_SELF_CUSTOM_WORKING_HOUR_ADD,
        component: UcTemplateComponent,
        data: {
          title: 'Working Hour Add Edit',
          page: 'WorkingHourHDetail'
        },
      },
      {
        path: PathConstant.CS_SELF_CUSTOM_WORKING_HOUR_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Working Hour Detail',
          page: 'WorkingHourDDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_COA_DETAIL_EDIT,
        component: UcTemplateComponent,
        data: {
          title: 'COA',
          page: 'Coaedit'
        },
      },
      {
        path: PathConstant.CUSTOM_CS_COA_SCHM_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'COA Scheme',
          page: 'Coaschemedetail'
        },
      },     
      {
        path: PathConstant.CS_SELF_CUSTOM_PROJECT,
        component: UcTemplateComponent,
        data: {
          title: 'Project',
          page: 'Hsbprojectpaging'
        },
      },
      {
        path: PathConstant.CS_SELF_CUSTOM_PROJECT_ADD_EDIT,
        component: UcTemplateComponent,
        data: {
          title: 'Project Add Edit',
          page: 'Addeditproject'
        },
      },
      {
        path: PathConstant.CS_MASKING_PAGING, component: UcTemplateComponent, data: { page: "MaskingDataItemPaging" },
      },
      {
        path: PathConstant.CS_MASKING_DETAIL, component: UcTemplateComponent, data: { page: "MaskingDataItemDetail" },
      },
      {
        path: PathConstant.CS_MASKING_WHITELIST, component: UcTemplateComponent, data: { page: "MaskingDataWhitelistRolePaging" },
      },
      {
        path: PathConstant.CS_MASKING_WHITELIST_DETAIL, component: UcTemplateComponent, data: { page: "MaskingDataWhitelistRoleDetail" },
      },
      {
        path: PathConstant.CS_MASKING_WHITELIST_EDIT, component: UcTemplateComponent, data: { page: "MaskingDataWhitelistRoleEdit" },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSettingRoutingModule { }
