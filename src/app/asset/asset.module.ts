import { AssetRoutingComponent } from "./asset-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdInsModule } from "app/components/adins-module/adins.module";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AssetTypeAddEditComponent } from "./asset-type/asset-type-add-edit/asset-type-add-edit.component";
import { AssetTypePagingComponent } from "./asset-type/asset-type-paging/asset-type-paging.component";
import { AssetSchemeAddEditInformationComponent } from "./asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component";
import { AssetConfigurationPagingComponent } from "./asset-configuration/asset-configuration-paging/asset-configuration-paging.component";
import { AssetCategoryPagingComponent } from "./asset-category/asset-category-paging/asset-category-paging.component";
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { AssetSchemePagingComponent } from "./asset-scheme/asset-scheme-paging/asset-scheme-paging.component";
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { AssetAccessoryAddEditComponent } from './asset-accessory/asset-accessory-add-edit/asset-accessory-add-edit.component';
import { AssetCategoryAddEditComponent } from './asset-category/asset-category-add-edit/asset-category-add-edit.component';
import { AssetDocumentAddEditComponent } from './asset-document/asset-document-add-edit/asset-document-add-edit.component';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master/asset-document-master-add-edit/asset-document-master-add-edit.component';
import { AssetMasterComponent } from "./asset-master/asset-master-paging/asset-master.component";
import { AssetMasterAddEditParentComponent } from "./asset-master/asset-master-add-edit-parent/asset-master-add-edit-parent.component";
import { AssetMasterAddEditChildComponent } from "./asset-master/asset-master-add-edit-child/asset-master-add-edit-child.component";
import { AddAssetSchemeComponent } from './asset-scheme/add-asset-scheme/add-asset-scheme.component';
import { AssetSchemeMemberComponent } from './asset-scheme/asset-scheme-member/asset-scheme-member.component';
import { UploadAssetMasterComponent } from './asset-master/upload-asset-master/upload-asset-master.component';
import { ReviewUploadAssetMasterDetailComponent } from "./asset-master/review-upload-asset-master/review-upload-asset-master-detail/review-upload-asset-master-detail.component";
import { ReviewUploadAssetMasterPagingComponent } from "./asset-master/review-upload-asset-master/review-upload-asset-master-paging/review-upload-asset-master-paging.component";
import { NegativeAssetUploadComponent } from './negative-asset/negative-asset-upload/negative-asset-upload.component';
import { ReviewUploadNegativeAssetPagingComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-paging/review-upload-negative-asset-paging.component';
import { ReviewUploadNegativeAssetDetailComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-detail/review-upload-negative-asset-detail.component';
import { UcaddtotempModule } from "@adins/ucaddtotemp";
import { AssetAttributeComponent } from './asset-attribute/asset-attribute.component';
import { AssetAttributeDetailComponent } from './asset-attribute/asset-attribute-detail/asset-attribute-detail.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { AdInsSharedModule } from "app/components/adins-module/adins-shared.module";
import { CustomAssetDocumentMasterPagingComponent } from "./custom/asset-document-master/asset-document-master-paging/custom-asset-document-master-paging.component";
import { CustomAssetDocumentMasterAddEditComponent } from "./custom/asset-document-master/asset-document-master-add-edit/custom-asset-document-master-add-edit.component";
import { CustomAssetCategoryPagingComponent } from "./custom/asset-category/asset-category-paging/custom-asset-category-paging.component";
import { CustomAssetConfigurationPagingComponent } from "./custom/asset-configuration/asset-configuration-paging/custom-asset-configuration-paging.component";
import { CustomAssetCategoryAddEditComponent } from "./custom/asset-category/asset-category-add-edit/custom-asset-category-add-edit.component";
import { CustomAssetDocumentAddEditComponent } from "./custom/asset-document/asset-document-add-edit/custom-asset-document-add-edit.component";
import { CustomAssetDocumentPagingComponent } from "./custom/asset-document/asset-document-paging/custom-asset-document-paging.component";
import { CustomAssetAccessoryAddEditComponent } from "./custom/asset-accessory/asset-accessory-add-edit/custom-asset-accessory-add-edit.component";
import { CustomAssetAccessoryPagingComponent } from "./custom/asset-accessory/asset-accessory-paging/custom-asset-accessory-paging.component";
import { CustomAssetAttributePagingComponent } from "./custom/asset-attribute/asset-attribute-paging/custom-asset-attribute-paging.component";
import { CustomAssetAttributeAddEditComponent } from "./custom/asset-attribute/asset-attribute-add-edit/custom-asset-attribute-add-edit.component";

import { ExecutorService, UcTemplateModule } from '@adins/uctemplate';
import { CustomAssetTypePagingComponent } from "./custom/asset-type/asset-type-paging/custom-asset-type-paging.component";
import { CustomAssetTypeAddEditComponent } from "./custom/asset-type/asset-type-add-edit/custom-asset-type-add-edit.component";
import { CustomAssetSchemePagingComponent } from "./custom/asset-scheme/asset-scheme-paging/custom-asset-scheme-paging.component";
import { CustomAssetSchemeAddEditInformationComponent } from "./custom/asset-scheme/asset-scheme-add-edit-information/custom-asset-scheme-add-edit-information.component";
import { CustomAssetSchemeMemberComponent } from './custom/asset-scheme/asset-scheme-member/custom-asset-scheme-member.component';
import { CustomAddAssetSchemeComponent } from './custom/asset-scheme/add-asset-scheme/custom-add-asset-scheme.component';
import { AdInsExecutorService } from "app/shared/services/adins-executor.service";
import { CustomAssetMasterAddEditChildComponent } from './custom-asset-master/custom-asset-master-add-edit-child/custom-asset-master-add-edit-child.component';
import { CustomAssetMasterDetailParentComponent } from "./custom-asset-master/custom-asset-master-add-edit-parent/custom-asset-master-detail-parent/custom-asset-master-detail-parent.component";
import { CustomAssetMasterAddEditParentComponent } from "./custom-asset-master/custom-asset-master-add-edit-parent/custom-asset-master-add-edit-parent.component";
import { CustomAssetMasterDetailChildComponent } from './custom-asset-master/custom-asset-master-add-edit-child/custom-asset-master-detail-child/custom-asset-master-detail-child.component';

export const customCurrencyMaskConfig = {     
  align: "left",     
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
    CommonModule,
    AssetRoutingComponent,
    AdInsModule,
    AdInsSharedModule,
    SharingComponentModule,
    UcaddtotempModule,    
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    UcTemplateModule,
  ],
  declarations: [
    AssetTypePagingComponent,
    AssetTypeAddEditComponent,
    AssetSchemePagingComponent,
    AssetSchemeAddEditInformationComponent,
    AssetConfigurationPagingComponent,
    AssetCategoryPagingComponent,
    AssetAccessoryPagingComponent,
    AssetDocumentPagingComponent,
    AssetDocumentMasterPagingComponent,
    AssetCategoryPagingComponent,
    NegativeAssetComponent,
    NegativeAssetDetailComponent,
    AssetAccessoryAddEditComponent,
    AssetCategoryAddEditComponent,
    AssetDocumentAddEditComponent,
    AssetDocumentMasterAddEditComponent,
    AssetMasterComponent,
    AssetMasterAddEditParentComponent,
    AssetMasterAddEditChildComponent,
    AddAssetSchemeComponent,
    AssetSchemeMemberComponent,
    UploadAssetMasterComponent,
    ReviewUploadAssetMasterDetailComponent,
    ReviewUploadAssetMasterPagingComponent,
    NegativeAssetUploadComponent,
    ReviewUploadNegativeAssetPagingComponent,
    ReviewUploadNegativeAssetDetailComponent,
    AssetAttributeComponent,
    AssetAttributeDetailComponent,
    CustomAssetDocumentMasterPagingComponent,
    CustomAssetDocumentMasterAddEditComponent,
    CustomAssetConfigurationPagingComponent,
    CustomAssetCategoryPagingComponent,
    CustomAssetCategoryAddEditComponent,
    CustomAssetDocumentPagingComponent,
    CustomAssetDocumentAddEditComponent,
    CustomAssetAccessoryPagingComponent,
    CustomAssetAccessoryAddEditComponent,
    CustomAssetAttributePagingComponent,
    CustomAssetAttributeAddEditComponent,
    CustomAssetTypePagingComponent,
    CustomAssetTypeAddEditComponent,
    CustomAssetSchemePagingComponent,
    CustomAssetSchemeAddEditInformationComponent,
    CustomAssetSchemeMemberComponent,
    CustomAddAssetSchemeComponent,
    CustomAssetMasterDetailParentComponent,
    CustomAssetMasterAddEditParentComponent,
    CustomAssetMasterAddEditChildComponent,
    CustomAssetMasterDetailChildComponent
  ],
  
  providers: [
    NGXToastrService,
    {
      provide: ExecutorService, useClass: AdInsExecutorService
    }
  ]
})
export class AssetModule { }