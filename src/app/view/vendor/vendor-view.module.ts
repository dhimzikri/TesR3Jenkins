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
import { VendorViewRoutingModule } from "./vendor-view-routing.module";
import { VendorBranchViewComponent } from "./vendor-branch-view/vendor-branch-view.component";
import { VendorHoldingViewComponent } from "./vendor-holding-view/vendor-holding-view.component";
import { VendorHoInfoComponent } from "./vendor-ho-info/vendor-ho-info.component";
import { HoAddressInfoComponent } from "./vendor-ho-info/ho-address-info/ho-address-info.component";
import { HoBankInfoComponent } from "./vendor-ho-info/ho-bank-info/ho-bank-info.component";
import { HoBranchInfoComponent } from "./vendor-ho-info/ho-branch-info/ho-branch-info.component";
import { HoContactPersonInfoComponent } from "./vendor-ho-info/ho-contact-person-info/ho-contact-person-info.component";
import { HoGroupInfoComponent } from "./vendor-ho-info/ho-group-info/ho-group-info.component";
import { HoInfoComponent } from "./vendor-ho-info/ho-info/ho-info.component";
import { HoTaxInfoComponent } from "./vendor-ho-info/ho-tax-info/ho-tax-info.component";
import { MainHoInfoComponent } from "./vendor-ho-info/main-ho-info/main-ho-info.component";
import { MainInfoViewComponent } from "./vendor-ho-info/main-info-view/main-info-view.component";
import { HoAtpmInfoComponent } from "./vendor-ho-info/ho-atpm-info/ho-atpm-info.component";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { VendorCollCompanyViewComponent } from "./vendor-coll-company-view/vendor-coll-company-view.component";
import { FundingCompanyDetailComponent } from "./vendor-funding-company-view/funding-company-detail.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "app/interceptor/httpconfig.interceptor";
import { SelfCustomContainerViewVendorAttrComponent } from './self-custom-container-view-vendor-attr/self-custom-container-view-vendor-attr.component';
import { VendorBranchViewXComponent } from "app/impl/view/vendor/vendor-branch-view-x/vendor-branch-view-x.component";
import { VendorHoInfoXComponent } from "app/impl/view/vendor/vendor-ho-info-x/vendor-ho-info-x.component";
import { MainInfoXViewComponent } from "app/impl/view/vendor/vendor-ho-info-x/main-info-x-view/main-info-x-view.component";
import { MainHoInfoXComponent } from "app/impl/view/vendor/vendor-ho-info-x/main-ho-info-x/main-ho-info-x.component";

@NgModule({
    imports: [
        VendorViewRoutingModule,
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
        UcShowErrorsModule,
    ],
    declarations: [
        VendorBranchViewComponent,
        VendorBranchViewXComponent,
        VendorHoldingViewComponent,
        VendorHoInfoComponent,
        HoAddressInfoComponent,
        HoBankInfoComponent,
        HoBranchInfoComponent,
        HoContactPersonInfoComponent,
        HoGroupInfoComponent,
        HoInfoComponent,
        HoTaxInfoComponent,
        MainHoInfoComponent,
        MainInfoViewComponent,
        HoAtpmInfoComponent,
        VendorCollCompanyViewComponent,
        FundingCompanyDetailComponent,
        SelfCustomContainerViewVendorAttrComponent,
        VendorHoInfoXComponent,
        MainHoInfoXComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ]
})
export class VendorViewModule { }