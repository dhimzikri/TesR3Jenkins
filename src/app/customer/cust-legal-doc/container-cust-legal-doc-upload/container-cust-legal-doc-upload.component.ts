import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CookieService } from 'ngx-cookie';
import { String } from 'typescript-string-operations';
import { UcTemplateService } from '@adins/uctemplate';
import { Subscription } from 'rxjs';
import { CustCompanylegalDocFile } from 'app/shared/model/cust-company-legal-doc-file/cust-company-legal-doc-file-obj.model';

@Component({
  selector: 'app-container-cust-legal-doc-upload',
  templateUrl: './container-cust-legal-doc-upload.component.html',
  styleUrls: ['./container-cust-legal-doc-upload.component.css']
})
export class ContainerCustLegalDocUploadComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() dicts: Record<string, any>;

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  width: number;
  height: number;
  url: any;

  subscriber: Subscription;

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = String.Join(", ", this.FileExtAllowed);

  constructor(private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService,
    private ucTemplateSvc: UcTemplateService
  ) { }

  async ngOnInit() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
  }

  reqFileUpl: CustCompanylegalDocFile = new CustCompanylegalDocFile();
  async HandleFileInput(files: FileList) {
    let File: File = files.item(0);
    this.reqFileUpl.File = File;
    this.reqFileUpl.DocUploadName = File.name;
    this.reqFileUpl.ByteBase64 = await this.readFileAsDataURL(File);
    this.reqFileUpl.ByteBase64 = this.reqFileUpl.ByteBase64.substring(this.reqFileUpl.ByteBase64.lastIndexOf(',') + 1)

    const data = {
      "UploadFile": this.reqFileUpl
    }

    this.data.emit(data)
  }
  
  ConvertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    return result_base64;
  }
}
