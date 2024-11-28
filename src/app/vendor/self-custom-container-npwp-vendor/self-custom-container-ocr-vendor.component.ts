import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { Subscription } from 'rxjs';
import { UcTemplateService } from '@adins/uctemplate';
import { CookieService } from 'ngx-cookie';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';

import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ResOcrNpwpObj } from 'app/shared/model/res-ocr-npwp-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { ReqOcrNpwpObj } from 'app/shared/model/req-ocr-npwp-obj.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-self-custom-container-ocr-vendor',
  templateUrl: './self-custom-container-ocr-vendor.component.html',
  styleUrls: ['./self-custom-container-ocr-vendor.component.css']
})
export class SelfCustomContainerOcrVendorComponent implements OnInit {
  reqOcrNpwpObj: ReqOcrNpwpObj = new ReqOcrNpwpObj();
  resOcrNpwpObj : ResOcrNpwpObj = new ResOcrNpwpObj();

  @Input() parentForm: FormGroup;
  @Input() dicts: Record<string, any>;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  isDisableButton: boolean = false;
  successMsg : string = 'Success!';
  width: number;
  height: number;
  url: any;

  subscriber: Subscription;

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = this.FileExtAllowed.join(", ");

  constructor(
    private cookieService: CookieService,
    private toastr: NGXToastrService,
    private UrlConstantNew: UrlConstantNew,
    private spinner: NgxSpinnerService,) {
      
    }

  async ngOnInit() {
    console.log(this.dicts.forRaw.IsNpwpExist)
    console.log('dictsss', this.dicts);
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
  }
  
  async HandleFileInput(files: FileList) {
    this.isDisableButton = true;
    let File: File = files.item(0);
    //this.reqOcrNpwpObj.img = File;
    this.reqOcrNpwpObj.FileName = File.name;
    this.reqOcrNpwpObj.ByteBase64 = await this.readFileAsDataURL(File);
    this.reqOcrNpwpObj.ByteBase64 = this.reqOcrNpwpObj.ByteBase64.substring(this.reqOcrNpwpObj.ByteBase64.lastIndexOf(',') + 1)
      
        let urlUpload = this.UrlConstantNew.GetOCRNPWPData;     
        var formData: any = new FormData(); 
        formData.append('reqData', JSON.stringify(this.reqOcrNpwpObj));      
        const xhr = new XMLHttpRequest();      
        xhr.onreadystatechange = evnt => {      
          if (xhr.readyState !== 4) return          
          if (xhr.status !== 200 && xhr.status !== 201) { 
            this.isDisableButton = false;     
            this.toastr.errorMessage('Upload Failed !');      
            return;      
          }      
          else {      
            this.isDisableButton = false;
            var response = JSON.parse(xhr.response);     
            if (response.HeaderObj.StatusCode != '200') {     
              this.toastr.errorMessage('Upload Failed ! ' + + response.HeaderObj.Message);     
              return      
            }      
          }
           
          if (xhr.status === 200) {
            this.isDisableButton = false;
            this.toastr.successMessage(this.successMsg);
           // DialogRef.close()
            return;      
          }      
        };
     
        xhr.onerror = evnt => {     
          this.isDisableButton = false;
          this.toastr.errorMessage('Upload Failed !');     
          return;      
        };
      
        xhr.open('POST', urlUpload, true); 
        let value = this.cookieService.get('XSRF-TOKEN');      
        let token = this.DecryptString(value, environment.ChipperKeyCookie);      
        xhr.setRequestHeader('AdInsKey', `${token}`);
        xhr.send(formData);
        xhr.onload = evnt => {
          this.isDisableButton = false;
          if (xhr.status === 200 || xhr.status === 201) {            
            var response = JSON.parse(xhr.response);
            this.resOcrNpwpObj = new ResOcrNpwpObj();
            if(response.status == 'SUCCESS'){
              this.resOcrNpwpObj = response.read;
            }
            this.parentForm.get('TaxIdNo').setValue(this.resOcrNpwpObj.noNpwp);
            this.parentForm.get('TaxpayerName').setValue(this.resOcrNpwpObj.nama);
            this.parentForm.get('Addr').setValue(this.resOcrNpwpObj.alamat);
          } 
          else {
            this.isDisableButton = false;
            this.toastr.errorMessage('Upload Failed !');
          }
        };
        
        // xhr.onerror = evnt => {
        //   this.isDisableButton = false;
        //   this.toastr.errorMessage('Upload Failed !');
        // };
// ...
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
  

  private DecryptString(chipperText: string, chipperKey: string) {
    if (
      chipperKey == undefined || chipperKey.trim() == '' ||
      chipperText == undefined || chipperText.trim() == ''
    ) return chipperText;
    var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(chipperText, chipperKeyArr, { iv: iv });
    var plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
}
