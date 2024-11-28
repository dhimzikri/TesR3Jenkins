import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqAddTrxSrcDataForAsliRIObj } from 'app/shared/model/asli-ri/req-add-trx-src-data-for-asli-ri-obj.model';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustDocFileObj } from 'app/shared/model/cust-doc-file/cust-doc-file-obj.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-asli-ri-req-confirmation',
  templateUrl: './asli-ri-req-confirmation.component.html',
  styleUrls: ['./asli-ri-req-confirmation.component.css']
})
export class AsliRiReqConfirmationComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private toastr: NGXToastrService,
              private http: HttpClient, private spinner: NgxSpinnerService,
              private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) { }

  @Input() isPhoneAgeVerifValid: boolean;
  @Input() isHomeAddressPercentageVerifValid: boolean;
  @Input() AsliRIForm: FormGroup;
  @Input() custDocFileFormObj: CustDocFileFormObj;
  @Output() nextConfirm = new EventEmitter<boolean>();
  @Input() reqAddTrxSrcDataForAsliRIObjInput: ReqAddTrxSrcDataForAsliRIObj;
  custDocFileObj: CustDocFileObj;
  isProfessionalVerifValid: boolean = false;
  isTaxExtraVerifValid: boolean = false;
  isTaxCompanyVerifValid: boolean = false;
  isWorkplaceVerifValid: boolean = false;
  isReady: boolean = true;

  async ngOnInit() {
    if(this.custDocFileFormObj != undefined)
    {
      await this.ConvertToCustDocFileObj(this.custDocFileFormObj)
    }
  }

  async ConvertToCustDocFileObj(custDocFileFormObj: CustDocFileFormObj){
    if(custDocFileFormObj.File != null){
      var custDocFileObj = new CustDocFileObj();
      custDocFileObj.MrCustDocTypeCode = custDocFileFormObj.MrCustDocTypeCode;
      custDocFileObj.FileName = custDocFileFormObj.File.name;
      custDocFileObj.ByteBase64 = await this.readFileAsDataURL(custDocFileFormObj.File);
      custDocFileObj.ByteBase64 = custDocFileObj.ByteBase64.substring(custDocFileObj.ByteBase64.lastIndexOf(',') + 1)
      this.reqAddTrxSrcDataForAsliRIObjInput.SelfiePhoto = custDocFileObj.ByteBase64
    }
  }

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(reader.result);
        reader.readAsDataURL(file);
    });
    return result_base64;
  } 

  save()
  {
    this.uploadDocFileMultipart(this.reqAddTrxSrcDataForAsliRIObjInput)

  }

  uploadDocFileMultipart(reqAddTrxSrcDataForAsliRIObj: ReqAddTrxSrcDataForAsliRIObj)
  {
    if (environment.SpinnerOnHttpPost) this.spinner.show();

    var formData: any = new FormData();

    Object.keys(reqAddTrxSrcDataForAsliRIObj).forEach(key => {
      formData.append(key, reqAddTrxSrcDataForAsliRIObj[key]);
    });

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = evnt => {
      if (xhr.readyState !== 4) return;

      if (environment.SpinnerOnHttpPost) this.spinner.hide();
      if (xhr.status !== 200 && xhr.status !== 201) {
        this.toastr.errorMessage('Save Failed !');
        return;
      }
      else {
        var response = JSON.parse(xhr.response);
        if (response.HeaderObj.StatusCode != '200') {
          this.toastr.errorMessage(response.HeaderObj.Message);
          return
        }
      }

      if (xhr.status === 200) {
        this.toastr.successMessage(response["Message"]);
        this.activeModal.dismiss('Cross click')
        return;
      }
    };

    xhr.onerror = evnt => {
      this.toastr.errorMessage('Upload Failed !');
      return;
    };
    xhr.open('POST', this.UrlConstantNew.AddTrxScrDataForAsliRi, true);
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

  async back()
  {
    this.nextConfirm.emit(false)
  }

}
