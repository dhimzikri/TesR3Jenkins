import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { CustomerPersonalPageComponent } from './customer-personal/customer-personal-page/customer-personal-page.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomerPersonalDetailComponent } from './customer-personal/customer-personal-detail/customer-personal-detail.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { UcaddressModule } from '@adins/ucaddress';
import { CustomerPersonalAddressComponent } from './customer-personal/customer-personal-address/customer-personal-address.component';
import { CustomerPersonalAddressAddComponent } from './customer-personal/customer-personal-address/customer-personal-address-add/customer-personal-address-add.component';
import { CustomerCompanyAddressComponent } from './customer-company/customer-company-address/customer-company-address.component';
import { CustomerCompanyAddressAddComponent } from './customer-company/customer-company-address/customer-company-address-add/customer-company-address-add.component';
import { CustomerPersonalJobDataComponent } from './customer-personal/customer-personal-job-data/customer-personal-job-data.component';
import { JobDataNonProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-non-professional/job-data-non-professional.component';
import { JobDataProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-professional/job-data-professional.component';
import { JobDataEmployeeComponent } from './customer-personal/customer-personal-job-data/job-data-employee/job-data-employee.component';
import { JobDataSmeComponent } from './customer-personal/customer-personal-job-data/job-data-small-medium-enterprise/job-data-small-medium-enterprise.component';
import { CustFinDataTabComponent } from './cust-fin-data-tab/cust-fin-data-tab.component';
import { CustBankAccSectionFindataComponent } from './cust-bank-acc-section-findata/cust-bank-acc-section-findata.component';
import { CustBankAccDetailSectionFindataComponent } from './cust-bank-acc-detail-section-findata/cust-bank-acc-detail-section-findata.component';
import { CustLegalDocComponent } from './cust-legal-doc/cust-legal-doc.component';
import { CustLegalDocDetailComponent } from './cust-legal-doc/cust-legal-doc-detail/cust-legal-doc-detail.component';
import { CustomerCompanyPageComponent } from './customer-company/customer-company-page/customer-company-page.component';
import { CustomerCompanyDetailComponent } from './customer-company/customer-company-detail/customer-company-detail.component';
import { CustomerCompanyContactInformationComponent } from './customer-company/customer-company-contact-information/customer-company-contact-information.component';
import { EditMainDataPagingComponent } from './edit-main-data/edit-main-data-paging/edit-main-data-paging.component';
import { CustomerCompanyAddressCheckComponent } from './customer-company/customer-company-address/customer-company-address-check/customer-company-address-check.component';
import { CustomerPersonalAddressCheckComponent } from './customer-personal/customer-personal-address/customer-personal-address-check/customer-personal-address-check.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { UploadNegativeCustomerComponent } from './negative-customer/upload-negative-customer/upload-negative-customer.component';
import { ReviewUploadNegativeCustomerDetailComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-detail/review-upload-negative-customer-detail.component';
import { ReviewUploadNegativeCustomerPagingComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-paging/review-upload-negative-customer-paging.component';
import { UcuploadModule } from '@adins/ucupload';
import { CustAttrSectionComponent } from './cust-attr-section/cust-attr-section.component';
import { CustAttrListComponent } from './cust-attr-list/cust-attr-list.component';
import { CustomerEmergencyContactComponent } from './customer-personal/customer-contact-person/customer-emergency-contact/customer-emergency-contact.component';
import { CustomerFamilyMenuComponent } from './customer-family-menu/customer-family-menu.component';
import { CustomerShareholderMenuComponent } from './customer-shareholder-menu/customer-shareholder-menu.component';
import { CustomerGuarantorMenuComponent } from './customer-guarantor-menu/customer-guarantor-menu.component';
import { CustomerUpdateMasterComponent } from './customer-update-master/customer-update-master.component';
import { CustomerUpdateMasterDetailComponent } from './customer-update-master/customer-update-master-detail/customer-update-master-detail.component';
import { UpdateCustomerPersonalDetailComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-personal-detail/update-customer-personal-detail.component';
import { UpdateCustomerAddressComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-address/update-customer-address.component';
import { UpdateCustomerFamilyComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-family/update-customer-family.component';
import { UpdateCustomerJobDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-job-data/update-customer-job-data.component';
import { UpdateCustomerEmergencyDetailComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-emergency/update-customer-emergency-detail/update-customer-emergency-detail.component';
import { UpdateCustomerFinDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-fin-data/update-customer-fin-data.component';
import { UpdateCustomerCompanyDetailComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-detail/update-customer-company-detail.component';
import { UpdateCustomerMgmntShareholderComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-mgmnt-shareholder/update-customer-mgmnt-shareholder.component';
import { UpdateCustomerContactInfoComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-contact-info/update-customer-contact-info.component';
import { UpdateCustomerCompanyFinDataComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-fin-data/update-customer-company-fin-data.component';
import { UpdateCustomerCompanyLegalDocComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-legal-doc/update-customer-company-legal-doc.component';
import { RegexService } from './regex.service';
import { CustAssetComponent } from './cust-asset/cust-asset.component';
import { CustAssetDetailComponent } from './cust-asset/cust-asset-detail/cust-asset-detail.component';
import { SharedModule } from 'app/shared/shared.module';
import { CustBankAccComponent } from './cust-bank-acc/cust-bank-acc.component';
import { NewCustomerSharingModule } from './sharing-component/new-cust-sharing.model';
import { UcdropdownlistModule } from '@adins/ucdropdownlist';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { CustPefindoReqComponent } from './cust-pefindo-req/cust-pefindo-req.component';
import { CustomerViewModule } from 'app/view/customer-view/customer-view.module';
import { CustomerViewHeaderPersonalComponent } from './customer-view/customer-view-header-personal/customer-view-header-personal.component';
import { CustomerViewHeaderCompanyComponent } from './customer-view/customer-view-header-company/customer-view-header-company.component';
import { SelfCustomCustomerPagingComponent } from './self-custom-customer-paging/self-custom-customer-paging.component';
import { UcTemplateModule } from '@adins/uctemplate';
import { SelfCustomEditMainDataPagingComponent } from './edit-main-data/self-custom-edit-main-data-paging/self-custom-edit-main-data-paging.component';
import { SelfCustomCustomerShareholderMenuComponent } from './self-custom-customer-shareholder-menu/self-custom-customer-shareholder-menu.component';
import { SelfCustomCustomerFamilyMenuComponent } from './self-custom-customer-family-menu/self-custom-customer-family-menu.component';
import { SelfCustomContainerNewCustHeaderComponent } from './sharing-component/self-custom-container-new-cust-header/self-custom-container-new-cust-header.component';
import { SelfCustomContainerThirdPartyFormComponent } from './sharing-component/self-custom-container-third-party-form/self-custom-container-third-party-form.component';
import { SelfCustomCustomerPersonalPageComponent } from './customer-personal/self-custom-customer-personal/self-custom-customer-personal-page/self-custom-customer-personal-page.component';
import { SelfCustomCustomerPersonalAddressComponent } from './customer-personal/self-custom-customer-personal/self-custom-customer-personal-address/self-custom-customer-personal-address.component';
import { SelfCustomContainerCustAttrComponent } from './sharing-component/self-custom-container-cust-attr/self-custom-container-cust-attr.component';
import { SelfCustomCustViewModule } from 'app/view/self-custom-cust-view/self-custom-cust-view.module';
import { SelfCustomNegativeCustomerComponent } from './self-custom-negative-customer/self-custom-negative-customer.component';
import { SelfCustomNegativeCustomerDetailComponent } from './self-custom-negative-customer/self-custom-negative-customer-detail/self-custom-negative-customer-detail.component';
import { SelfCustomReviewUploadNegativeCustomerDetailComponent } from './self-custom-negative-customer/self-custom-review-upload-negative-customer/self-custom-review-upload-negative-customer-detail/self-custom-review-upload-negative-customer-detail.component';
import { SelfCustomReviewUploadNegativeCustomerComponent } from './self-custom-negative-customer/self-custom-review-upload-negative-customer/self-custom-review-upload-negative-customer.component';
import { SelfCustomUploadNegativeCustomerComponent } from './self-custom-negative-customer/self-custom-upload-negative-customer/self-custom-upload-negative-customer.component';
import { SelfCustomCustFinDataTabComponent } from './cust-fin-data-tab/self-custom-fin-data-tab.component';
import { SelfCustomContainerCustAttrSectionComponent } from './self-custom-container-cust-attr-section/self-custom-container-cust-attr-section.component';
import { CustomCustAttrSectionComponent } from './custom-cust-attr-section/custom-cust-attr-section.component';
import { SelfCustomCustomerEmergencyContactComponent } from './customer-personal/self-custom-customer-personal/self-custom-customer-emergency-contact/self-custom-customer-emergency-contact.component';
import { SelfCustomContainerFamilyListingComponent } from './sharing-component/self-custom-container-family-listing/self-custom-container-family-listing.component';
import { CustomCustomerCompanyAddressComponent } from './customer-company/custom-customer-company-address/custom-customer-company-address.component';
import { CustomShareholderListingComponent } from './sharing-component/custom-shareholder-listing/custom-shareholder-listing.component';
import { SelfCustomPefindoViewModule } from 'app/view/self-custom-pefindo-view/self-custom-pefindo-view.module';
import { MatRadioModule } from '@angular/material/radio';
import { SelfCustomCustFinDataComponent } from './cust-fin-data-tab/self-custom-cust-fin-data.component';
import { SelfCustomNewCustHeaderComponent } from './sharing-component/self-custom-new-cust-header/self-custom-new-cust-header.component';
import { SelfCustomNewCustHeaderShareholderComponent } from './sharing-component/new-cust-header/self-custom-new-cust-header.component';
import { SelfCustomBouwheerCompanyIndustryInfo } from './bouwheer/self-custom-bouwheer-company-industry-info.component';
import { SelfCustomCustCompanyIndustryInfo } from './customer-company/self-custom-customer-company/self-custom-cust-company-industry-info/self-custom-cust-company-industry-info.component';
import { SelfCustomContainerOcrCustPersonalComponent } from './sharing-component/self-custom-container-ocr-cust-personal/self-custom-container-ocr-cust-personal.component';
import { CustomUpdateCustomerEmergencyComponent } from './self-custom-container-customer-update/personal/update-customer-emergency/custom-update-customer-emergency.component';
import { CustomUpdateCustomerPersonalDetailComponent } from './self-custom-container-customer-update/personal/update-customer-personal-detail/custom-update-customer-personal-detail.component';
import { CustomUpdateCustomerJobDataComponent } from './self-custom-container-customer-update/personal/update-customer-job-data/custom-update-customer-job-data.component';
import { CustomUpdateCustomerFinDataComponent } from './self-custom-container-customer-update/personal/update-customer-fin-data/custom-update-customer-fin-data.component';
import { CustomUpdateCustomerFamilyComponent } from './self-custom-container-customer-update/personal/update-customer-family/custom-update-customer-family.component';
import { CustomUpdateCustomerAddressComponent } from './self-custom-container-customer-update/personal/update-customer-address/custom-update-customer-address.component';
import { CustomUpdateCustomerMgmntShareholderComponent } from './self-custom-container-customer-update/company/update-customer-mgmnt-shareholder/custom-update-customer-mgmnt-shareholder.component';
import { CustomUpdateCustomerContactInfoComponent } from './self-custom-container-customer-update/company/update-customer-contact-info/custom-update-customer-contact-info.component';
import { CustomUpdateCustomerCompanyLegalDocComponent } from './self-custom-container-customer-update/company/update-customer-company-legal-doc/custom-update-customer-company-legal-doc.component';
import { CustomUpdateCustomerCompanyFinDataComponent } from './self-custom-container-customer-update/company/update-customer-company-fin-data/custom-update-customer-company-fin-data.component';
import { CustomUpdateCustomerCompanyDetailComponent } from './self-custom-container-customer-update/company/update-customer-company-detail/custom-update-customer-company-detail.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ContainerCustLegalDocUploadComponent } from './cust-legal-doc/container-cust-legal-doc-upload/container-cust-legal-doc-upload.component';
import { CustomerPagingXComponent } from 'app/impl/customer/customer-paging/customer-paging-x.component';
import { CustBankAccSectionFindataXComponent } from 'app/impl/customer/cust-bank-acc-section-findata/cust-bank-acc-section-findata-x.component';
import { CustFinDataTabXComponent } from 'app/impl/customer/cust-fin-data-tab/cust-fin-data-tab-x.component';
import { CustomerPersonalPageXComponent } from 'app/impl/customer/customer-personal/customer-personal-page/customer-personal-page-x.component';
import { CustomerCompanyPageXComponent } from 'app/impl/customer/customer-company/customer-company-page/customer-company-page-x.component';
import { EditMainDataPagingXComponent } from 'app/impl/customer/edit-main-data/edit-main-data-paging/edit-main-data-paging-x.component';
import { CustomerFamilyMenuXComponent } from 'app/impl/customer/customer-family-menu/customer-family-menu-x.component';
import { CustomerShareholderMenuXComponent } from 'app/impl/customer/customer-shareholder-menu/customer-shareholder-menu-x.component';
import { CustomerEmergencyContactXComponent } from 'app/impl/customer/customer-personal/customer-contact-person/customer-emergency-contact/customer-emergency-contact-x.component';
import { ShareholderListingXComponent } from 'app/impl/customer/sharing-component/shareholder-listing/shareholder-listing-x.component';
import { CustomerPersonalDetailXComponent } from 'app/impl/customer/customer-personal/customer-personal-detail/customer-personal-detail-x.component';
import { CustomerCompanyContactInformationXComponent } from 'app/impl/customer/customer-company/customer-company-contact-information/customer-company-contact-information-x.component';

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
    exports: [
      CustomerViewHeaderPersonalComponent,
      CustomerViewHeaderCompanyComponent,
      CustAttrListComponent
    ],
    imports: [
        AdInsModule,
        CustomerRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        UcpagingModule,
        SharingComponentModule,
        SharedModule,
        AdInsSharedModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        ReactiveFormsModule,
        UclookupgenericModule,
        UcSubsectionModule,
        ArchwizardModule,
        UcviewgenericModule,
        UcaddressModule,
        UcShowErrorsModule,
        MatTabsModule,
        UcuploadModule,
        NgMultiSelectDropDownModule,
        NewCustomerSharingModule,
        CustomerViewModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        UcdropdownlistModule,
        SelfCustomCustViewModule,
        SelfCustomPefindoViewModule,
        UcTemplateModule,
        MatRadioModule,
        UiSwitchModule
    ],
    declarations: [
        CustomerPagingComponent, 
        CustomerPagingXComponent,
        CustAssetDetailComponent,
        CustomerPersonalPageComponent,
        CustomerPersonalPageXComponent,
        CustomerPersonalDetailComponent,    
        CustomerPersonalDetailXComponent,
        NegativeCustomerComponent,
        NegativeCustomerDetailComponent,
        CustomerPersonalAddressComponent,
        CustomerPersonalAddressAddComponent,
        CustomerCompanyAddressComponent,
        CustomerCompanyAddressAddComponent,
        CustomerPersonalJobDataComponent,
        JobDataNonProfessionalComponent,
        JobDataProfessionalComponent,
        JobDataEmployeeComponent,
        JobDataSmeComponent,
        CustFinDataTabComponent,
        CustFinDataTabXComponent,
        CustBankAccSectionFindataComponent,
        CustBankAccSectionFindataXComponent,
        CustBankAccDetailSectionFindataComponent,
        CustLegalDocComponent,
        CustLegalDocDetailComponent,
        CustomerCompanyPageComponent,
        CustomerCompanyPageXComponent,
        CustomerCompanyDetailComponent,
        CustomerCompanyContactInformationComponent,
        CustomerCompanyContactInformationXComponent,
        EditMainDataPagingComponent,
        EditMainDataPagingXComponent,
        CustomerCompanyAddressCheckComponent,
        CustomerPersonalAddressCheckComponent,
        UploadNegativeCustomerComponent,
        ReviewUploadNegativeCustomerDetailComponent,
        ReviewUploadNegativeCustomerPagingComponent,
        CustAttrSectionComponent,
        CustAttrListComponent,
        CustomerEmergencyContactComponent,
        CustomerEmergencyContactXComponent,
        CustomerFamilyMenuComponent,
        CustomerFamilyMenuXComponent,
        CustomerShareholderMenuComponent,
        CustomerShareholderMenuXComponent,
        CustomerGuarantorMenuComponent,
        CustomerUpdateMasterComponent,
        CustomerUpdateMasterDetailComponent,
        UpdateCustomerPersonalDetailComponent,
        UpdateCustomerAddressComponent,
        UpdateCustomerFamilyComponent,
        UpdateCustomerJobDataComponent,
        UpdateCustomerEmergencyDetailComponent,
        UpdateCustomerFinDataComponent,
        UpdateCustomerCompanyDetailComponent,
        UpdateCustomerMgmntShareholderComponent,
        UpdateCustomerContactInfoComponent,
        UpdateCustomerCompanyFinDataComponent,
        UpdateCustomerCompanyLegalDocComponent,
        CustBankAccComponent,
        CustAssetComponent,
        CustPefindoReqComponent,
        CustomerViewHeaderPersonalComponent,
        CustomerViewHeaderCompanyComponent,
        SelfCustomCustomerPagingComponent,
        SelfCustomEditMainDataPagingComponent,
        SelfCustomCustomerShareholderMenuComponent,
        SelfCustomCustomerFamilyMenuComponent,
        SelfCustomNewCustHeaderComponent,
        SelfCustomContainerNewCustHeaderComponent,
        SelfCustomContainerThirdPartyFormComponent,
        SelfCustomCustomerPersonalPageComponent,
        SelfCustomCustomerPersonalAddressComponent,
        SelfCustomContainerCustAttrComponent,
        SelfCustomNegativeCustomerComponent,
        SelfCustomNegativeCustomerDetailComponent,
        SelfCustomReviewUploadNegativeCustomerDetailComponent,
        SelfCustomReviewUploadNegativeCustomerComponent,
        SelfCustomUploadNegativeCustomerComponent,
        SelfCustomCustFinDataTabComponent,
        SelfCustomCustFinDataComponent,
        SelfCustomContainerCustAttrSectionComponent,
        CustomCustAttrSectionComponent,
        SelfCustomCustomerEmergencyContactComponent,
        SelfCustomContainerFamilyListingComponent,
        CustomCustomerCompanyAddressComponent,
        CustomShareholderListingComponent,
        ShareholderListingXComponent,
        SelfCustomNewCustHeaderShareholderComponent,
        SelfCustomBouwheerCompanyIndustryInfo,
        SelfCustomCustCompanyIndustryInfo,
        SelfCustomContainerOcrCustPersonalComponent,
        //new sign
        CustomUpdateCustomerPersonalDetailComponent,
        CustomUpdateCustomerJobDataComponent,
        CustomUpdateCustomerFinDataComponent,
        CustomUpdateCustomerFamilyComponent,
        CustomUpdateCustomerEmergencyComponent,
        CustomUpdateCustomerAddressComponent,
        CustomUpdateCustomerMgmntShareholderComponent,
        CustomUpdateCustomerContactInfoComponent,
        CustomUpdateCustomerCompanyLegalDocComponent,
        CustomUpdateCustomerCompanyFinDataComponent,
        CustomUpdateCustomerCompanyDetailComponent,
        ContainerCustLegalDocUploadComponent,
        SelfCustomBouwheerCompanyIndustryInfo,
        SelfCustomCustCompanyIndustryInfo,
        SelfCustomContainerOcrCustPersonalComponent
    ],

    providers: [
        CustAssetComponent,
        CustAssetDetailComponent,
        CustomerPersonalJobDataComponent,
        RegexService,
    ],
})
export class CustomerModule {
  constructor() {

  }
}
