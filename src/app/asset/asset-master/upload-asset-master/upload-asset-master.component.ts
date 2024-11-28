import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcUploadObj } from 'app/shared/model/uc-upload-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-upload-asset-master',
  templateUrl: './upload-asset-master.component.html'
})
export class UploadAssetMasterComponent implements OnInit {
  uploadObj: UcUploadObj = new UcUploadObj(this.UrlConstantNew);
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.uploadObj.title = "Upload Asset Master";
    this.uploadObj.UploadTypeCode = "UPL_ASM";
    this.uploadObj.ErrorDownloadUrl = this.UrlConstantNew.GetUploadAssetMasterByUploadMonitoringNoAndTrxType;
    this.uploadObj.TemplateName = "Upload_Asset_Master_Template";
    this.uploadObj.FileErrorName = "Upload_Asset_Master_ErrorDownload";
    this.uploadObj.pagingJson = "./assets/ucpaging/searchAssetMasterMonitoring.json";
  }
}
