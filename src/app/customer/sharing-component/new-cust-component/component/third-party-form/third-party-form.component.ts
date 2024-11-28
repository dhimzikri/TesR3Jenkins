import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/digitalization/req-pefindo-smart-search-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqGenerateTrxNoObj } from 'app/shared/model/master-sequence/req-generate-trx-no-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { CookieService } from 'ngx-cookie';
import { PefindoReqComponent } from './pefindo/request/pefindo-req.component';
import { TrustingSocialReqHeaderComponent } from './trusting-social/request/trusting-social-req-header.component';
import { TrustingSocialViewHeaderComponent } from './trusting-social/view/trusting-social-view-header.component';
import { String } from 'typescript-string-operations';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustDocFileObj } from 'app/shared/model/cust-doc-file/cust-doc-file-obj.model';
import { ThirdPartyUploadService } from './services/ThirdPartyUpload.Service';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { ReqCustDocFileObj } from 'app/shared/model/cust-doc-file/req-cust-doc-file-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AsliRiReqHeaderComponent } from './asli-ri/request/asli-ri-req-header.component';
import { AsliRiViewComponent } from './asli-ri/view/asli-ri-view/asli-ri-view.component';
import { ReqPefindoSmartSearchV2Obj } from 'app/shared/model/digitalization/req-pefindo-smart-search-v2-obj.model';
import { CbasSlikViewComponent } from './cbas-slik/cbas-slik-view.component';
import { CbasSlikReqHeaderComponent } from './cbas-slik/cbas-slik-req-header.component';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-third-party-form',
  templateUrl: './third-party-form.component.html',
  styleUrls: ['./third-party-form.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ThirdPartyFormComponent implements OnInit {

  constructor(private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService, private modalService: NgbModal,
    private thirdPartyUploadService: ThirdPartyUploadService, 
    private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) {
  }

  @Input() parentForm: FormGroup;
  @Input() thirdPartyTrxNo: string = null;
  @Input() custObj: CustObj = new CustObj();
  @Input() MrCustTypeCode: string = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Output() OutputThirdPartyTrxNo: EventEmitter<string> = new EventEmitter<string>();
  @Output() OutputCustObj: EventEmitter<CustObj> = new EventEmitter<CustObj>();
  @Output() OutputUploadFile: EventEmitter<Array<CustDocFileFormObj>> = new EventEmitter<Array<CustDocFileFormObj>>();


  officeCode: string;
  IsUseDigitalization: string = "0";
  pefindoMultiResMax: number = 0;
  IsUseTs: Boolean = false;
  IsUsePefindo: Boolean = false;
  IsUseAsliRI: Boolean = false;
  IsUseCbasSlik: Boolean = false;
  ListDocumentKeyValueObj: Array<KeyValueObj> = new Array<KeyValueObj>();
  SpouseIdCode : string = "";
  thirdPartyGroupTrxNo: string = null;

  width: number;
  height: number;
  url: any;

  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  CustDocFileObjs: Array<CustDocFileObj> = new Array<CustDocFileObj>();
  sysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = String.Join(", ", this.FileExtAllowed);

  readonly FileExtAllowedAsliRI: Array<string> = [CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionPng, CommonConstant.FileExtensionBmp]
  readonly ExtStrAsliRI: string = String.Join(", ", this.FileExtAllowedAsliRI);



  async ngOnInit(): Promise<void> {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.officeCode = context[CommonConstant.OFFICE_CODE];
    await this.getIsUseDigitalization();
    await this.checkIsPefindoMulti();
    if (this.IsUseDigitalization == CommonConstant.TRUE_CONDITION) {
      await this.getDigitalizationSvcType();
      if (this.custObj.CustId > 0) {
        await this.getCustDocFiles();
      }
      await this.getListDocumentToBeUpload();
    }
  }

  async getIsUseDigitalization() {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeIsUseDigitalization }).toPromise().then(
      (response) => {
        this.IsUseDigitalization = response["GsValue"];
      }
    );
  }

  async getDigitalizationSvcType() {
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeDigitalizationSvcType }).toPromise().then(
      (response) => {
        this.sysConfigResultObj = response;
      });

    if (this.sysConfigResultObj.ConfigValue != null) {
      var listSvcType = this.sysConfigResultObj.ConfigValue.split("|");

      var svcTypeTs = listSvcType.find(x => x == CommonConstant.DigitalizationSvcTypeTrustingSocial);

      if (svcTypeTs != null) {
        this.IsUseTs = true;
      }

      var svcTypePefindo = listSvcType.find(x => x == CommonConstant.DigitalizationSvcTypePefindo);

      if (svcTypePefindo != null) {
        this.IsUsePefindo = true;
      }
    }

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.SvcTypeAsliRi }).toPromise().then(
      (response) => {
        if(response.ConfigValue == "1")
        {
          this.IsUseAsliRI = true;
        }
      });

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.SvcTypeCbasSlik }).toPromise().then(
      (response) => {
        if(response.ConfigValue == "1") this.IsUseCbasSlik = true;
      }
    );
  }

  async getListDocumentToBeUpload() {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    tempReq.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustDocType;
    tempReq.MappingCode = this.MrCustTypeCode;
    await this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, tempReq).toPromise().then(
      async (response) => {
        this.ListDocumentKeyValueObj = response[CommonConstant.ReturnObj];
        for (let i = 0; i < this.ListDocumentKeyValueObj.length; i++) {
          var custDocFileFormObj = new CustDocFileFormObj();

          custDocFileFormObj.MrCustDocTypeCode = this.ListDocumentKeyValueObj[i].Key;
          custDocFileFormObj.DocTypeName = this.ListDocumentKeyValueObj[i].Value;
          var existingCustDocFile = this.CustDocFileObjs.find(x => x.MrCustDocTypeCode == this.ListDocumentKeyValueObj[i].Key);
          if (this.custObj.CustId == 0 || existingCustDocFile == undefined) {
            custDocFileFormObj.IsRequired = true;
          } else {
            custDocFileFormObj.IsRequired = false;
          }

          if(custDocFileFormObj.DocTypeName == CommonConstant.ASLI_RI_SELFIE)
          {
            custDocFileFormObj.IsRequired = false;
          }
          custDocFileFormObj.File = null;

          this.CustDocFileFormObjs.push(custDocFileFormObj);
        }
        this.setDocFormCustMaritalTypeChanged();
        this.OutputUploadFile.emit(this.CustDocFileFormObjs);
      }
    );
  }

  setDocFormCustMaritalTypeChanged(){
    let idxObj = this.CustDocFileFormObjs.findIndex(x => x.MrCustDocTypeCode == CommonConstant.MasterCodeCustDocTypeSpouseId);
    if(this.parentForm.controls.MrMaritalStatCode.value == CommonConstant.MR_MARITAL_STAT_CODE_SINGLE){
      this.CustDocFileFormObjs[idxObj].IsRequired = false;
    }
    else{
      this.CustDocFileFormObjs[idxObj].IsRequired = true;
    }
  }

  async getCustDocFiles() {
    var reqByIdObj = { Id: this.custObj.CustId };
    await this.http.post(this.UrlConstantNew.GetListCustDocFileByCustId, reqByIdObj).toPromise().then(
      async (response) => {
        this.CustDocFileObjs = response[CommonConstant.ReturnObj];
      }
    );
  }

  async checkIsPefindoMulti()
  {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GsPefindoMultiResultMax }).toPromise().then(
      (response) => {
        this.pefindoMultiResMax = parseInt(response["GsValue"]);
      });
  }

  inqPefindoCustReq: string = "";
  async ReqPefindo() {
    this.markFormGroupTouched(this.parentForm);
    if (!this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    if (!this.parentForm.valid) {
      return;
    }

    await this.checkIsPefindoMulti();

    let tempForm = this.parentForm.getRawValue();

    let reqPefindoSmartSearchObj = new ReqPefindoSmartSearchV2Obj();
    if (this.CustDataMode == this.CustDataModeMain) {
      reqPefindoSmartSearchObj.CustName = tempForm["CustName"];
    } else {
      reqPefindoSmartSearchObj.CustName = tempForm["ExistingCustName"]["value"];
    }
    reqPefindoSmartSearchObj.CustType = this.MrCustTypeCode;
    reqPefindoSmartSearchObj.BirthDt = tempForm["BirthDt"];

    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GsInqPefindoCustReq }).toPromise().then(
      (result) => {
        this.inqPefindoCustReq = result["GsValue"];
      }
    );
    reqPefindoSmartSearchObj.MrPefindoInquiryReasonCode = this.inqPefindoCustReq;

    if (this.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      reqPefindoSmartSearchObj.IdType = tempForm["MrIdTypeCode"];
      reqPefindoSmartSearchObj.IdNo = tempForm["IdNo"];
    } else {
      reqPefindoSmartSearchObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
      reqPefindoSmartSearchObj.IdNo = tempForm["TaxIdNo"];
    }

    if(this.custObj.CustId > 0) {
      var custDocFileObjs: ReqCustDocFileObj = new ReqCustDocFileObj();
      custDocFileObjs.CustId = this.custObj.CustId;
      custDocFileObjs.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
      this.http.post(this.UrlConstantNew.SaveCustDocFile, custDocFileObjs).subscribe(
        (response) => {
          const modalRef = this.modalService.open(PefindoReqComponent);
          modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
          modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
          modalRef.componentInstance.CustId = this.custObj.CustId;
          modalRef.componentInstance.RowVersion = this.custObj.RowVersion;

          if (this.pefindoMultiResMax > 0)
          {
            modalRef.result.then((res) => {
              this.thirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
              this.custObj.ThirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
              this.custObj.RowVersion = res["RowVersion"];
              this.OutputCustObj.emit(this.custObj);
            })
          }
          else
          {
            modalRef.result.then((res) => {
              this.thirdPartyTrxNo = res["Code"];
              this.custObj.ThirdPartyTrxNo = res["Code"];
              this.custObj.RowVersion = res["RowVersion"];
              this.OutputCustObj.emit(this.custObj);
            })
          }
        }
      );
    }
    else {
      const modalRef = this.modalService.open(PefindoReqComponent);
      modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
      modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
      if (this.pefindoMultiResMax > 0)
      {
        modalRef.result.then((res) => {
          this.thirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
          this.custObj.ThirdPartyGroupTrxNo = res["ThirdPartyRsltHGroupNo"];
          this.OutputCustObj.emit(this.custObj);
        })
      }
      else
      {
        modalRef.result.then((res) => {
          this.thirdPartyTrxNo = res["Code"];
          this.custObj.ThirdPartyTrxNo = res["Code"];
          this.OutputCustObj.emit(this.custObj);
        })
      }
    }

  }

  async ViewPefindo() {
    await this.checkIsPefindoMulti();
    if (this.pefindoMultiResMax > 0)
    {
      let TrxNo = this.thirdPartyGroupTrxNo;

      if (this.custObj.CustId > 0)
      {
        await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.custObj.CustId }).toPromise().then(
          (response: CustObj) => {
            TrxNo = response["ThirdPartyGroupTrxNo"];
          });
      }

      if (TrxNo == null || TrxNo == "")
      {
        this.toastr.warningMessage("Please request Pefindo first!");
        return;
      }

      this.adInsHelperService.OpenPefindoMultiResultView(TrxNo, this.MrCustTypeCode);
    }
    else
    {
      let TrxNo = this.thirdPartyTrxNo;
      if (TrxNo == null || TrxNo == "")
      {
        this.toastr.warningMessage("Please request Pefindo first!");
        return;
      }
      this.adInsHelperService.OpenPefindoView(TrxNo, this.MrCustTypeCode);
    }
  }

  async ReqTrustingSocial() {
    this.markFormGroupTouched(this.parentForm);

    if (!this.parentForm.valid) {
      return;
    }

    let tempForm = this.parentForm.getRawValue();
    let custObj: CustObj = new CustObj();
    let custPersonalObj = new CustPersonalObj();

    // cek nomor telepon valid atau gak 
    if (this.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      let MobilePhnNo = tempForm["MobilePhnNo1"];
      if (MobilePhnNo.substring(0, 2) != '62') {
        this.toastr.warningMessage(ExceptionConstant.MOBILE_PHN_NO_INVALID);
        return;
      }
    }

    if (!this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    await this.checkThirdPartyTrxNo();
    await this.saveThirdPartyTrxNo();

    if (this.CustDataMode == this.CustDataModeMain) {
      custObj.CustName = tempForm["CustName"];
    } else {
      custObj.CustName = tempForm["ExistingCustName"]["value"];
    }
    custObj.CustNo = this.custObj.CustNo;
    custObj.TaxIdNo = tempForm["TaxIdNo"];
    custObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;
    custObj.MrCustTypeCode = this.MrCustTypeCode;

    if (tempForm["MrIdTypeCode"] == CommonConstant.MrIdTypeCodeEKTP) {
      custObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
      custObj.IdNo = tempForm["IdNo"];
    } else {
      custObj.MrIdTypeCode = CommonConstant.TrustingSocialDummyIdType;
      custObj.IdNo = CommonConstant.TrustingSocialDummyIdNo;
    }

    if (this.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      custPersonalObj.MobilePhnNo1 = tempForm["MobilePhnNo1"];
    }

    if(this.custObj.CustId > 0) {
      var custDocFileObjs: ReqCustDocFileObj = new ReqCustDocFileObj();
      custDocFileObjs.CustId = this.custObj.CustId;
      custDocFileObjs.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
      this.http.post(this.UrlConstantNew.SaveCustDocFile, custDocFileObjs, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          const modalRef = this.modalService.open(TrustingSocialReqHeaderComponent);
          modalRef.componentInstance.CustObj = custObj;
          modalRef.componentInstance.CustPersonalObj = custPersonalObj;
        }
      );
    }
    else {
      const modalRef = this.modalService.open(TrustingSocialReqHeaderComponent);
      modalRef.componentInstance.CustObj = custObj;
      modalRef.componentInstance.CustPersonalObj = custPersonalObj;
    }
    
  }


  ViewTrustingSocial() {
    const modalRef = this.modalService.open(TrustingSocialViewHeaderComponent);
    modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
  }

  async ReqASLIRI()
  {
    this.markFormGroupTouched(this.parentForm);

    if (!this.thirdPartyUploadService.ValidateFileUploadAsliRI(this.CustDocFileFormObjs)) {
      return;
    }

    if (!this.parentForm.valid) {
      return;
    }
    
    const modalRef = this.modalService.open(AsliRiReqHeaderComponent);
    modalRef.componentInstance.parentForm = this.parentForm;
    modalRef.componentInstance.custObj = this.custObj;
    modalRef.componentInstance.MrCustTypeCode = this.MrCustTypeCode;

    for(let i = 0; i < this.CustDocFileFormObjs.length; i++)
    {
      if(this.MrCustTypeCode == CommonConstant.CustTypePersonal && this.parentForm.controls.MrIdTypeCode.value == CommonConstant.MrIdTypeCodeEKTP && this.CustDocFileFormObjs[i].DocTypeName == CommonConstant.ASLI_RI_SELFIE)
      {
        modalRef.componentInstance.custDocFileFormObj = this.CustDocFileFormObjs[i];
        modalRef.componentInstance.height = this.height;
        modalRef.componentInstance.width = this.width;
        modalRef.componentInstance.url = this.url;
      }
    }
  }

  async ViewASLIRI()
  {
    const modalRef = this.modalService.open(AsliRiViewComponent); 
    modalRef.componentInstance.custObj = this.custObj;
    modalRef.componentInstance.parentForm = this.parentForm;
    modalRef.componentInstance.MrCustTypeCode = this.MrCustTypeCode;
    modalRef.componentInstance.custObj.MrCustTypeCode = this.MrCustTypeCode;
  }

  CbasSlikTrxNo: string = "";
  async ReqCbasSlik()
  {
    this.markFormGroupTouched(this.parentForm);
    if (!this.parentForm.valid) return;
    
    const modalRef = this.modalService.open(CbasSlikReqHeaderComponent);
    modalRef.componentInstance.ParentForm = this.parentForm;
    modalRef.componentInstance.MrCustTypeCode = this.MrCustTypeCode;
    modalRef.componentInstance.SubmitReqTrxNo.subscribe((trxNo) => {
      this.CbasSlikTrxNo = trxNo
    })
  }

  async ViewCbasSlik()
  {
    const modalRef = this.modalService.open(CbasSlikViewComponent); 
    modalRef.componentInstance.ParentForm = this.parentForm;
    modalRef.componentInstance.InputTrxNo = this.CbasSlikTrxNo;
  }


  async checkThirdPartyTrxNo() {
    if (this.thirdPartyTrxNo == null || this.thirdPartyTrxNo == "") {
      var reqGenerateTrxNoObj = new ReqGenerateTrxNoObj();
      reqGenerateTrxNoObj.MasterSeqCode = CommonConstant.MasterSequenceCodeCustomerThirdParty;
      reqGenerateTrxNoObj.OfficeCode = this.officeCode;

      await this.http.post(this.UrlConstantNew.GenerateTransactionNoFromRedis, reqGenerateTrxNoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response: ResGenerateTrxNoObj) => {
          this.thirdPartyTrxNo = response.TrxNo;
          this.OutputThirdPartyTrxNo.emit(this.thirdPartyTrxNo);
        }
      );
    }
  }

  async saveThirdPartyTrxNo() {
    let reqByIdAndCode: GenericObj = new GenericObj();
    reqByIdAndCode.Id = this.custObj.CustId;
    reqByIdAndCode.Code = this.thirdPartyTrxNo;
    reqByIdAndCode.RowVersion = this.custObj.RowVersion;

    await this.http.post(this.UrlConstantNew.SaveCustThirdPartyTrxNo, reqByIdAndCode, AdInsConstant.SpinnerOptions).toPromise().then(
      response => {
        this.custObj.RowVersion = response["RowVersion"]
      }
    )
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  HandleFileInput(files: FileList, i) {
    this.CustDocFileFormObjs[i].File = files.item(0);
    this.OutputUploadFile.emit(this.CustDocFileFormObjs);
  }
  
  HandleFileInputAsliRI(files: FileList, img:any, i) {
    if(img.target.files && img.target.files.length)
    {
      let file = img.target.files[0];
      let image = new Image();
      let reader = new FileReader();
      image.src = window.URL.createObjectURL(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTimeout(() => {
          this.width = image.naturalWidth
          this.height = image.naturalHeight
          this.url = reader.result
        })
      }
    }
    this.CustDocFileFormObjs[i].File = files.item(0);
    this.OutputUploadFile.emit(this.CustDocFileFormObjs);
  }

  ConvertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }
}
