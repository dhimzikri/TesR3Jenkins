import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcUploadObj } from 'app/shared/model/uc-upload-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-upload-form-feature-x',
  templateUrl: './upload-form-feature-x.component.html'
})
export class UploadFormFeaturePagingXComponent implements OnInit {
  uploadObj: UcUploadObj = new UcUploadObj(this.UrlConstantNew);
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.uploadObj.title = "Upload Form Feature";
    this.uploadObj.UploadTypeCode = "UPL_FORM_FTR";
    this.uploadObj.ErrorDownloadUrl = this.UrlConstantNew.GetUploadFormFeatureByUploadMonitoringNoAndTrxTypeX;
    this.uploadObj.TemplateName = "Upload_Form_Feature_Template";
    this.uploadObj.FileErrorName = "Upload_Form_Feature_ErrorDownload";
    this.uploadObj.pagingJson = "./assets/impl/ucpaging/searchUploadFormFeatureX.json";
  }
}
