import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { ReqUploadConsentTsObj } from 'app/shared/model/third-party-rslt/req-upload-consent-ts-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ThirdPartyRsltHObj } from 'app/shared/model/third-party-rslt/third-party-rslt-h-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { String } from 'typescript-string-operations';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';



@Component({
  selector: 'app-trusting-social-req-consent',
  templateUrl: './trusting-social-req-consent.component.html',
  styleUrls: ['./trusting-social-req-consent.component.css'],
})
export class TrustingSocialReqConsentComponent implements OnInit {
  @Input() CustObj: CustObj;
  @Input() CustPersonalObj: CustPersonalObj;
  @Output() outUpload: EventEmitter<ThirdPartyRsltHObj> = new EventEmitter();


  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionDoc, CommonConstant.FileExtensionDocx, CommonConstant.FileExtensionPdf]

  CustTypeName: string;
  FPP : string; 
  FileToUpload: File;
  Consent: any;
  businessDt: Date;
  ConsentForm = this.fb.group({
    Consent: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private toastr: NGXToastrService,
    private UrlConstantNew: UrlConstantNew,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    this.getCustTypeDescr();
  }

  getCustTypeDescr(){
    var refMasterObj = new ReqRefMasterByTypeCodeAndMasterCodeObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustType;
    refMasterObj.MasterCode = this.CustObj.MrCustTypeCode;
    this.http.post(this.UrlConstantNew.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMasterObj).subscribe(
      (response) => {
        this.CustTypeName = response["Descr"];
      }
    );
  }

  UploadConsent(){
    var lastDotIndex = this.FileToUpload.name.lastIndexOf('.');
    var ext = "." + this.FileToUpload.name.substring(lastDotIndex + 1);

    var extValid = this.FileExtAllowed.find(x => x == ext);

    if(extValid == undefined){
      var listExtStr = String.Join(", ", this.FileExtAllowed);
      this.toastr.warningMessage(String.Format(ExceptionConstant.INVALID_FILE_FORMAT, listExtStr));
      return;
    }

    var reqUploadConsentTsObj = new ReqUploadConsentTsObj();
    reqUploadConsentTsObj.TrxNo = this.CustObj.ThirdPartyTrxNo;
    reqUploadConsentTsObj.CustName = this.CustObj.CustName;
    reqUploadConsentTsObj.IdType = this.CustObj.MrIdTypeCode;
    reqUploadConsentTsObj.IdNo = this.CustObj.IdNo;
    
    if(this.CustObj.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL){
      reqUploadConsentTsObj.MobilePhnNo = this.CustPersonalObj.MobilePhnNo1;
    }

    if (this.CustObj.CustNo == "") {
      this.FPP = this.CustObj.ThirdPartyTrxNo; 
    } else {
      this.FPP = this.CustObj.CustNo; 
    }

    var month = ("0" + (this.businessDt.getMonth() + 1)).slice(-2);
    var date = ("0" + this.businessDt.getDate()).slice(-2);

    reqUploadConsentTsObj.FileName = 'CONSENT_' + date + month + this.businessDt.getFullYear() + '_' + this.CustPersonalObj.MobilePhnNo1 + '_' + this.FPP + ext; 
    //reqUploadConsentTsObj.FileName = this.FileToUpload.name;
    let reader = new FileReader();
    reader.readAsDataURL(this.FileToUpload);
    reader.onload = () => {
      reqUploadConsentTsObj.ConsentBase64 = reader.result;
      reqUploadConsentTsObj.ConsentBase64 = reqUploadConsentTsObj.ConsentBase64.substring(reqUploadConsentTsObj.ConsentBase64.lastIndexOf(',') + 1)
      this.uploadDocFileMultipart(reqUploadConsentTsObj);
    }
  }

  HandleFileInput(files: FileList){
    this.FileToUpload = files.item(0);
  }

  ConvertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  uploadDocFileMultipart(objDoc: ReqUploadConsentTsObj)
  {
    if (this.UrlConstantNew.env.SpinnerOnHttpPost) this.spinner.show();

    var formData: any = new FormData();

    Object.keys(objDoc).forEach(key => {
      formData.append(key, objDoc[key]);
    });

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = evnt => {
      if (xhr.readyState !== 4) return;

      if (this.UrlConstantNew.env.SpinnerOnHttpPost) this.spinner.hide();
      if (xhr.status !== 200 && xhr.status !== 201) {
        this.toastr.errorMessage('Upload Failed !');
        return;
      }
      else {
        var response = JSON.parse(xhr.response);
        if (response.HeaderObj.StatusCode != '200') {
          this.toastr.errorMessage('Upload Failed ! '+  + response.HeaderObj.Message);
          return
        }
      }

      if (xhr.status === 200) {
        this.toastr.successMessage(response["Message"]);
        this.outUpload.emit(response);
        return;
      }
    };

    xhr.onerror = evnt => {
      this.toastr.errorMessage('Upload Failed !');
      return;
    };
    xhr.open('POST', this.UrlConstantNew.UploadConsentTrustingSocialV21, true);
    let value = this.cookieService.get('XSRF-TOKEN');
    let token = this.DecryptString(value, environment.ChipperKeyCookie);
    xhr.setRequestHeader('AdInsKey', `${token}`);
    xhr.send(formData);
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
