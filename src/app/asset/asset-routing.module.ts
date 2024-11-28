import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypePagingComponent } from './asset-type/asset-type-paging/asset-type-paging.component';
import { AssetTypeAddEditComponent } from './asset-type/asset-type-add-edit/asset-type-add-edit.component';
import { AssetSchemePagingComponent } from './asset-scheme/asset-scheme-paging/asset-scheme-paging.component';
import { AssetSchemeAddEditInformationComponent } from './asset-scheme/asset-scheme-add-edit-information/asset-scheme-add-edit-information.component';
import { AssetConfigurationPagingComponent } from './asset-configuration/asset-configuration-paging/asset-configuration-paging.component';
import { AssetCategoryPagingComponent } from './asset-category/asset-category-paging/asset-category-paging.component';
import { AssetAccessoryPagingComponent } from './asset-accessory/asset-accessory-paging/asset-accessory-paging.component';
import { AssetDocumentPagingComponent } from './asset-document/asset-document-paging/asset-document-paging.component';
import { AssetDocumentMasterPagingComponent } from './asset-document-master/asset-document-master-paging/asset-document-master-paging.component';
import { NegativeAssetComponent } from './negative-asset/negative-asset.component';
import { NegativeAssetDetailComponent } from './negative-asset/negative-asset-detail/negative-asset-detail.component';
import { AssetAccessoryAddEditComponent } from './asset-accessory/asset-accessory-add-edit/asset-accessory-add-edit.component';
import { AssetCategoryAddEditComponent } from './asset-category/asset-category-add-edit/asset-category-add-edit.component';
import { AssetDocumentAddEditComponent } from './asset-document/asset-document-add-edit/asset-document-add-edit.component';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master/asset-document-master-add-edit/asset-document-master-add-edit.component';
import { AssetMasterComponent } from './asset-master/asset-master-paging/asset-master.component';
import { AssetMasterAddEditChildComponent } from './asset-master/asset-master-add-edit-child/asset-master-add-edit-child.component';
import { AssetMasterAddEditParentComponent } from './asset-master/asset-master-add-edit-parent/asset-master-add-edit-parent.component';
import { AddAssetSchemeComponent } from './asset-scheme/add-asset-scheme/add-asset-scheme.component';
import { AssetSchemeMemberComponent } from './asset-scheme/asset-scheme-member/asset-scheme-member.component';
import { UploadAssetMasterComponent } from './asset-master/upload-asset-master/upload-asset-master.component';
import { ReviewUploadAssetMasterPagingComponent } from './asset-master/review-upload-asset-master/review-upload-asset-master-paging/review-upload-asset-master-paging.component';
import { ReviewUploadAssetMasterDetailComponent } from './asset-master/review-upload-asset-master/review-upload-asset-master-detail/review-upload-asset-master-detail.component';
import { NegativeAssetUploadComponent } from './negative-asset/negative-asset-upload/negative-asset-upload.component';
import { ReviewUploadNegativeAssetPagingComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-paging/review-upload-negative-asset-paging.component';
import { ReviewUploadNegativeAssetDetailComponent } from './negative-asset/review-upload-negative-asset/review-upload-negative-asset-detail/review-upload-negative-asset-detail.component';
import { AssetAttributeComponent } from './asset-attribute/asset-attribute.component'; 
import { AssetAttributeDetailComponent } from './asset-attribute/asset-attribute-detail/asset-attribute-detail.component';
import { PathConstant } from 'app/shared/PathConstant';
import { CustomAssetDocumentMasterPagingComponent } from './custom/asset-document-master/asset-document-master-paging/custom-asset-document-master-paging.component';
import { CustomAssetDocumentMasterAddEditComponent } from './custom/asset-document-master/asset-document-master-add-edit/custom-asset-document-master-add-edit.component';
import { CustomAssetConfigurationPagingComponent } from './custom/asset-configuration/asset-configuration-paging/custom-asset-configuration-paging.component';
import { CustomAssetCategoryPagingComponent } from './custom/asset-category/asset-category-paging/custom-asset-category-paging.component';
import { CustomAssetCategoryAddEditComponent } from './custom/asset-category/asset-category-add-edit/custom-asset-category-add-edit.component';
import { CustomAssetDocumentAddEditComponent } from './custom/asset-document/asset-document-add-edit/custom-asset-document-add-edit.component';
import { CustomAssetDocumentPagingComponent } from './custom/asset-document/asset-document-paging/custom-asset-document-paging.component';
import { CustomAssetAccessoryAddEditComponent } from './custom/asset-accessory/asset-accessory-add-edit/custom-asset-accessory-add-edit.component';
import { CustomAssetAccessoryPagingComponent } from './custom/asset-accessory/asset-accessory-paging/custom-asset-accessory-paging.component';
import { CustomAssetAttributeAddEditComponent } from './custom/asset-attribute/asset-attribute-add-edit/custom-asset-attribute-add-edit.component';
import { CustomAssetAttributePagingComponent } from './custom/asset-attribute/asset-attribute-paging/custom-asset-attribute-paging.component';

import { CustomAssetTypePagingComponent } from './custom/asset-type/asset-type-paging/custom-asset-type-paging.component';
import { CustomAssetTypeAddEditComponent } from './custom/asset-type/asset-type-add-edit/custom-asset-type-add-edit.component';
import { CustomAssetSchemePagingComponent } from './custom/asset-scheme/asset-scheme-paging/custom-asset-scheme-paging.component';
import { CustomAssetSchemeAddEditInformationComponent } from './custom/asset-scheme/asset-scheme-add-edit-information/custom-asset-scheme-add-edit-information.component';
import { CustomAssetSchemeMemberComponent } from './custom/asset-scheme/asset-scheme-member/custom-asset-scheme-member.component';
import { CustomAddAssetSchemeComponent } from './custom/asset-scheme/add-asset-scheme/custom-add-asset-scheme.component';
import { UcTemplateComponent } from '@adins/uctemplate';
import { CustomAssetMasterAddEditParentComponent } from './custom-asset-master/custom-asset-master-add-edit-parent/custom-asset-master-add-edit-parent.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.ASSET_TYPE_PAGING,
        component: CustomAssetTypePagingComponent,
        data: {
          title: 'Asset Type Paging'
        }
        // component: AssetTypePagingComponent,
        // data: {
        //   title: 'Asset Type Paging'
        // }
      },
      {
        path: PathConstant.SELF_CUSTOM_ASSET_TYPE_PAGING,
        component: CustomAssetTypePagingComponent,
        data: {
          title: 'Asset Type Paging'
        }
      },
      {
        path: PathConstant.ASSET_TYPE_DETAIL,
        component: AssetTypeAddEditComponent,
        data: {
          title: 'Asset Type Add Edit'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_ASSET_TYPE_DETAIL,
        component: CustomAssetTypeAddEditComponent,
        data: {
          title: 'Asset Type Add Edit'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_PAGING,
        component: CustomAssetSchemePagingComponent,
        data: {
          title: 'Asset Scheme Paging'
        }
        // component: AssetSchemePagingComponent,
        // data: {
        //   title: 'Asset Scheme Paging'
        // }
      },
      {
        path: PathConstant.SELF_CUSTOM_ASSET_SCHM_PAGING,
        component: CustomAssetSchemePagingComponent,
        data: {
          title: 'Asset Scheme Paging'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_MBR_DETAIL,
        component: AssetSchemeMemberComponent,
        data: {
          title: 'Asset Scheme Member Detail'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_ASSET_SCHM_MBR_DETAIL,
        component: CustomAssetSchemeMemberComponent,
        data: {
          title: 'Asset Scheme Member Detail'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_ADD_MBR,
        component: AddAssetSchemeComponent,
        data: {
          title: 'Asset Scheme Member Add'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_ASSET_SCHM_ADD_MBR,
        component: CustomAddAssetSchemeComponent,
        data: {
          title: 'Asset Scheme Member Add'
        }
      },
      {
        path: PathConstant.ASSET_SCHM_INFO_DETAIL,
        component: AssetSchemeAddEditInformationComponent,
        data: {
          title: 'Asset Scheme Information Add Edit'
        }
      },
      {
        path: PathConstant.SELF_CUSTOM_ASSET_SCHM_INFO_DETAIL,
        component: CustomAssetSchemeAddEditInformationComponent,
        data: {
          title: 'Asset Scheme Information Add Edit'
        }
      },
      {
        path: PathConstant.ASSET_CONFIG_PAGING,
        component: CustomAssetConfigurationPagingComponent,
        data: {
          title: 'Asset Doc Master Paging'
        },
        // component: AssetConfigurationPagingComponent,
        // data: {
        //   title: 'Asset Configuration Paging'
        // },
      },
      {
        path: PathConstant.ASSET_CATEGORY_PAGING,
        component: AssetCategoryPagingComponent,
        data: {
          title: 'Asset Cateogry Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_PAGING,
        component: AssetDocumentPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      // {
      //   path: PathConstant.ASSET_DOC_MASTER_PAGING,
      //   component: AssetDocumentMasterPagingComponent,
      //   data: {
      //     title: 'Asset Document Paging'
      //   },
      // },
      {
        path: PathConstant.ASSET_CATEGORY_DETAIL,
        component: AssetCategoryAddEditComponent,
        data: {
          title: 'Asset Category Detail'
        },
      },
      {
        path: PathConstant.ASSET_CATEGORY_PAGING,
        component: AssetAccessoryPagingComponent,
        data: {
          title: 'Asset Accessory Paging'
        },
      },
      {
        path: PathConstant.ASSET_ATTR_PAGING,
        component: AssetAttributeComponent,
        data: {
          title: 'Asset Attribute Paging'
        },
      },
      {
        path: PathConstant.ASSET_ATTR_DETAIL,
        component: AssetAttributeDetailComponent,
        data: {
          title: 'Asset Attribute Detail'
        },
      },
      {
        path: PathConstant.ASSET_ACC_PAGING,
        component: AssetAccessoryPagingComponent,
        data: {
          title: 'Asset Accessory Paging'
        },
      },
      {
        path: PathConstant.ASSET_ACC_DETAIL,
        component: AssetAccessoryAddEditComponent,
        data: {
          title: 'Asset Accessory Detail'
        },
      },
      {
        path: PathConstant.ASSET_DOC_PAGING,
        component: AssetDocumentPagingComponent,
        data: {
          title: 'Asset Document Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_DETAIL,
        component: AssetDocumentAddEditComponent,
        data: {
          title: 'Asset Document Detail'
        },
      },
      {
        path: PathConstant.ASSET_DOC_MASTER_PAGING,
        component: CustomAssetDocumentMasterPagingComponent,
        data: {
          title: 'Asset Doc Master Paging'
        },
      },
      {
        path: PathConstant.ASSET_DOC_MASTER_DETAIL,
        component: AssetDocumentMasterAddEditComponent,
        data: {
          title: 'Asset Document Master Detail'
        },
      },
      {
        path: PathConstant.ASSET_NEG_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Negative Asset',
          page: 'AssetNegative'
        },
        // component: NegativeAssetComponent,
        // data: {
        //   title: 'Negative Asset'
        // },
      },
      {
        path: PathConstant.ASSET_NEG_DETAIL,
        component: NegativeAssetDetailComponent,
        data: {
          title: 'Negative Asset'
        },
      },
      {
        path: PathConstant.ASSET_NEG_UPLOAD,
        component: UcTemplateComponent,
        data: {
          title: 'Upload Negative Asset',
          page: 'UploadAssetNegative'
        },
        // component: NegativeAssetUploadComponent,
        // data: {
        //   title: 'Upload Negative Asset'
        // },
      },
      {
        path: PathConstant.ASSET_NEG_RVW_UPLOAD_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Review Upload Negative Asset Paging',
          page: 'ReviewUploadNegativeAsset'
        },
        // component: ReviewUploadNegativeAssetPagingComponent,
        // data: {
        //   title: 'Review Upload Negative Asset Paging'
        // },
      },
      {
        path: PathConstant.ASSET_NEG_RVW_UPLOAD_DETAIL,
        component: ReviewUploadNegativeAssetDetailComponent,
        data: {
          title: 'Review Upload Negative Asset Detail'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Asset Master',
          page: 'AssetMaster'
        },
        // component: AssetMasterComponent,
        // data: {
        //   title: 'Asset Master'
        // },
      },
      {
        path: PathConstant.ASSET_MASTER_DETAIL,
        component: AssetMasterAddEditParentComponent,
        data: {
          title: 'Asset Master Add Edit Parent'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_CHILD,
        component: AssetMasterAddEditChildComponent,
        data: {
          title: 'Asset Master Add Edit Child'
        },
      },
      {
        path: PathConstant.ASSET_MASTER_UPLOAD,
        component: UcTemplateComponent,
        data: {
          title: 'Upload Asset Master',
          page: 'UploadAssetMaster'
        },
        // component: UploadAssetMasterComponent,
        // data: {
        //   title: 'Upload Asset Master'
        // },
      },
      {
        path: PathConstant.ASSET_MASTER_RVW_UPLOAD_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Review Upload Asset Master Paging',
          page: 'ReviewUploadAssetMaster'
        },
        // component: ReviewUploadAssetMasterPagingComponent,
        // data: {
        //   title: 'Review Upload Asset Master Paging'
        // },
      },
      {
        path: PathConstant.ASSET_MASTER_RVW_UPLOAD_DETAIL,
        component: ReviewUploadAssetMasterDetailComponent,
        data: {
          title: 'Review Upload Asset Master Detail'
        },
      },
      //uc template
      {
        path: PathConstant.CUSTOM_ASSET_DOC_MASTER_PAGING,
        component: CustomAssetDocumentMasterPagingComponent,
        data: {
          title: 'Asset Doc Master Paging'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_DOC_MASTER_DETAIL,
        component: CustomAssetDocumentMasterAddEditComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_CONFIG_PAGING,
        component: CustomAssetConfigurationPagingComponent,
        data: {
          title: 'Asset Doc Master Paging'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_CATEGORY_PAGING,
        component: CustomAssetCategoryPagingComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_CATEGORY_DETAIL,
        component: CustomAssetCategoryAddEditComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_DOC_PAGING,
        component: CustomAssetDocumentPagingComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_DOC_DETAIL,
        component: CustomAssetDocumentAddEditComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_ACC_PAGING,
        component: CustomAssetAccessoryPagingComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_ACC_DETAIL,
        component: CustomAssetAccessoryAddEditComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_ATTR_PAGING,
        component: CustomAssetAttributePagingComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_ATTR_DETAIL,
        component: CustomAssetAttributeAddEditComponent,
        data: {
          title: 'Asset Doc Master Detail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_MASTER_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Asset Master',
          page: 'AssetMaster'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_MASTER_DETAIL,
        component: CustomAssetMasterAddEditParentComponent,
        data: {
          title: 'Asset Master Add Edit Parent'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_MASTER_CHILD,
        component: UcTemplateComponent,
        data: {
          title: 'Asset Master Add Edit Child',
          page: 'AssetMasterChild'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_MASTER_UPLOAD,
        component: UcTemplateComponent,
        data: {
          title: 'Upload Asset Master',
          page: 'UploadAssetMaster'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_MASTER_RVW_UPLOAD_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Review Upload Asset Master Paging',
          page: 'ReviewUploadAssetMaster'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_MASTER_RVW_UPLOAD_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Review Upload Asset Master Detail',
          page: 'ReviewUploadAssetMasterDetail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_NEG_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Negative Asset',
          page: 'AssetNegative'
        },
      },{
        path: PathConstant.CUSTOM_ASSET_NEG_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Negative Asset',
          page: 'Negativeassetdetail'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_NEG_UPLOAD,
        component: UcTemplateComponent,
        data: {
          title: 'Upload Negative Asset',
          page: 'UploadAssetNegative'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_NEG_RVW_UPLOAD_PAGING,
        component: UcTemplateComponent,
        data: {
          title: 'Review Upload Negative Asset Paging',
          page: 'ReviewUploadNegativeAsset'
        },
      },
      {
        path: PathConstant.CUSTOM_ASSET_NEG_RVW_UPLOAD_DETAIL,
        component: UcTemplateComponent,
        data: {
          title: 'Review Upload Negative Asset Detail',
          page: 'ReviewUploadNegativeAssetDetail'
        },
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingComponent { }
