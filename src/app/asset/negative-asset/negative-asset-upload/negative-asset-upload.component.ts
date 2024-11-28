import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcUploadObj } from 'app/shared/model/uc-upload-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-negative-asset-upload',
  templateUrl: './negative-asset-upload.component.html'
})
export class NegativeAssetUploadComponent implements OnInit {
  uploadObj: UcUploadObj = new UcUploadObj(this.UrlConstantNew);
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.uploadObj.title = "Upload Negative Asset";
    this.uploadObj.UploadTypeCode = "UPL_NAS";
    this.uploadObj.ErrorDownloadUrl = this.UrlConstantNew.GetUploadAssetNegativeByUploadMonitoringNoAndTrxType;
    this.uploadObj.TemplateName = "Upload_Negative_Asset_Template";
    this.uploadObj.FileErrorName = "Upload_Negative_Asset_ErrorDownload";
    this.uploadObj.pagingJson = "./assets/ucpaging/searchNegativeAssetMonitoring.json";
  }
}