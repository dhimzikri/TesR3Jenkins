import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { Subscription } from 'rxjs';
import { UcTemplateService } from '@adins/uctemplate';
import { CookieService } from 'ngx-cookie';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ReqOcrNpwpObj } from 'app/shared/model/req-ocr-npwp-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ResOcrNpwpObj } from 'app/shared/model/res-ocr-npwp-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { ReqOcrKtpObj } from 'app/shared/model/req-ocr-ktp-obj.model';
import { ResOcrKtpObj } from 'app/shared/model/res-ocr-ktp-obj.model';

@Component({
  selector: 'app-self-custom-container-ocr-cust-personal',
  templateUrl: './self-custom-container-ocr-cust-personal.component.html',
  styleUrls: ['./self-custom-container-ocr-cust-personal.component.css']
})
export class SelfCustomContainerOcrCustPersonalComponent implements OnInit {
  reqOcrKtpObj: ReqOcrKtpObj = new ReqOcrKtpObj();
  resOcrKtpObj : ResOcrKtpObj = new ResOcrKtpObj();

  @Input() parentForm: FormGroup;
  @Input() dicts: Record<string, any>;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  isDisableButton : boolean = false;
  successMsg : string = 'Success!';
  width: number;
  height: number;
  url: any;

  subscriber: Subscription;

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = this.FileExtAllowed.join(", ");

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private toastr: NGXToastrService,
    private UrlConstantNew: UrlConstantNew) {
      
    }

  async ngOnInit() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
  }
  
  async HandleFileInput(files: FileList) {
    this.isDisableButton = true;
    let File: File = files.item(0);
    //this.reqOcrKtpObj.img = File;
    this.reqOcrKtpObj.FileName = File.name;
    this.reqOcrKtpObj.ByteBase64 = await this.readFileAsDataURL(File);
    this.reqOcrKtpObj.ByteBase64 = this.reqOcrKtpObj.ByteBase64.substring(this.reqOcrKtpObj.ByteBase64.lastIndexOf(',') + 1)
      
        let urlUpload = this.UrlConstantNew.GetOCRKTPData;     
        var formData: any = new FormData(); 
        formData.append('reqData', JSON.stringify(this.reqOcrKtpObj));      
        const xhr = new XMLHttpRequest();      
        xhr.onreadystatechange = evnt => {      
          if (xhr.readyState !== 4) return
          if (xhr.status !== 200 && xhr.status !== 201) { 
            this.isDisableButton = false     
            this.toastr.errorMessage('Upload Failed !');      
            return;      
          }      
          else {      
            var response = JSON.parse(xhr.response);     
            this.isDisableButton = false    
            if (response.HeaderObj.StatusCode != '200') { 
              this.toastr.errorMessage('Upload Failed ! ' + + response.HeaderObj.Message);     
              return      
            }      
          }
           
          if (xhr.status === 200) {
            this.isDisableButton = false
            this.toastr.successMessage(this.successMsg);
           // DialogRef.close()
            return;      
          }      
        };
     
        xhr.onerror = evnt => {     
          this.isDisableButton = false
          this.toastr.errorMessage('Upload Failed !');     
          return;      
        };
      
        xhr.open('POST', urlUpload, true); 
        let value = this.cookieService.get('XSRF-TOKEN');      
        let token = this.DecryptString(value, environment.ChipperKeyCookie);      
        xhr.setRequestHeader('AdInsKey', `${token}`);
        xhr.send(formData);   
        xhr.onload = evnt => {
          this.isDisableButton = false
          if (xhr.status === 200 || xhr.status === 201) {            
            var response = JSON.parse(xhr.response);
            this.resOcrKtpObj = new ResOcrKtpObj();
            if(response.status == 'SUCCESS'){
              this.resOcrKtpObj = response.read;
            }
            this.parentForm.get('IdNo').setValue(this.resOcrKtpObj.nik);
            this.parentForm.get('MrIdTypeCode').setValue(CommonConstant.MrIdTypeCodeEKTP);
            this.parentForm.get('CustName').setValue(this.resOcrKtpObj.nama);
            this.parentForm.get('MrGenderCode').setValue(this.resOcrKtpObj.jenisKelamin);
            this.parentForm.get('BirthPlace').setValue(this.resOcrKtpObj.tempatLahir);
            this.parentForm.get('BirthDt').setValue(this.resOcrKtpObj.tanggalLahir);            
            this.parentForm.get('MrMaritalStatCode').setValue(this.resOcrKtpObj.statusPerkawinan);            
            this.parentForm.get('BirthDt').setValue(this.resOcrKtpObj.tanggalLahir);            
            
            this.parentForm.get('UcAddress.Addr').setValue(this.resOcrKtpObj.alamat);
            this.parentForm.get('UcAddress.AreaCode4').setValue(this.resOcrKtpObj.Rt);
            this.parentForm.get('UcAddress.AreaCode3').setValue(this.resOcrKtpObj.Rw);
            this.parentForm.get('UcAddress.AreaCode2').setValue(this.resOcrKtpObj.kelurahanDesa);
            this.parentForm.get('UcAddress.AreaCode1').setValue(this.resOcrKtpObj.kecamatan);
            this.parentForm.get('UcAddress.City').setValue(this.resOcrKtpObj.kotaKabupaten);
            this.parentForm.get('UcAddress.Province').setValue(this.resOcrKtpObj.provinsi);
          } 
          else {
            this.isDisableButton = false;
            this.toastr.errorMessage('Upload Failed !');
          }
        };
        
        xhr.onerror = evnt => {
          this.isDisableButton = false;
          this.toastr.errorMessage('Upload Failed !');
        };        
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
