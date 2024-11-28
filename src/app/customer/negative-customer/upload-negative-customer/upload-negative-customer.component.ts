import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcUploadObj } from 'app/shared/model/uc-upload-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-upload-negative-customer',
  templateUrl: './upload-negative-customer.component.html',
})
export class UploadNegativeCustomerComponent implements OnInit {
  uploadObj: UcUploadObj = new UcUploadObj(this.UrlConstantNew);
  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.uploadObj.title = "Upload Negative Customer";
    this.uploadObj.UploadTypeCode = "UPL_NEG_CUST";
    this.uploadObj.ErrorDownloadUrl = this.UrlConstantNew.GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType;
    this.uploadObj.TemplateName = "Upload_Negative_Customer_Template";
    this.uploadObj.FileErrorName = "Upload_Negative_Customer_ErrorDownload";
    this.uploadObj.pagingJson = "./assets/ucpaging/searchNegativeCustomerMonitoring.json";
  }
}
