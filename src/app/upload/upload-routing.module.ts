import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadMonitoringComponent } from "./upload-monitoring/upload-monitoring.component";
import { UploadSettingPagingComponent } from "./upload-setting/upload-setting/upload-setting-paging.component";
import { UploadSettingEditComponent } from "./upload-setting/upload-setting-edit/upload-setting-edit.component";
import { PathConstant } from "app/shared/PathConstant";
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.UPLOAD_MONITORING_PAGING,
        component: UploadMonitoringComponent,
        data: {
          title: 'Upload Monitoring'
        }
      },
      {
        path: PathConstant.UPLOAD_SETTING_PAGING,
        component: UploadSettingPagingComponent,
        data: {
          title: 'Upload Setting Paging'
        }
      },
      {
        path: PathConstant.UPLOAD_SETTING_EDIT,
        component: UploadSettingEditComponent,
        data: {
          title: 'Upload Setting Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], 
})
export class UploadRoutingModule { }
