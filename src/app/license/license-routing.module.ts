import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseComponent } from './license.component';
import { PathConstant } from 'app/shared/PathConstant';
import { UploadLicenseComponent } from './upload-license/upload-license.component';
import { DetailLicenseComponent } from './detail-license/detail-license.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: LicenseComponent,
        data: {
          title: 'License'
        }
      },
      {
        path: PathConstant.UPLOAD_LICENSE,
        component: UploadLicenseComponent,
        data: {
          title: 'Upload License'
        }
      },
      {
        path: PathConstant.DETAIL_LICENSE,
        component: DetailLicenseComponent,
        data: {
          title: 'Detail License'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
