import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CookieService } from 'ngx-cookie';
import { ThirdPartyUploadService } from '../new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustDocFileObj } from 'app/shared/model/cust-doc-file/cust-doc-file-obj.model';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { String } from 'typescript-string-operations';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { CbasSlikReqHeaderComponent } from '../new-cust-component/component/third-party-form/cbas-slik/cbas-slik-req-header.component';
import { CbasSlikViewComponent } from '../new-cust-component/component/third-party-form/cbas-slik/cbas-slik-view.component';
import { AsliRiViewComponent } from '../new-cust-component/component/third-party-form/asli-ri/view/asli-ri-view/asli-ri-view.component';
import { AsliRiReqHeaderComponent } from '../new-cust-component/component/third-party-form/asli-ri/request/asli-ri-req-header.component';
import { TrustingSocialViewHeaderComponent } from '../new-cust-component/component/third-party-form/trusting-social/view/trusting-social-view-header.component';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/digitalization/req-pefindo-smart-search-obj.model';
import { ReqCustDocFileObj } from 'app/shared/model/cust-doc-file/req-cust-doc-file-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { PefindoReqComponent } from '../new-cust-component/component/third-party-form/pefindo/request/pefindo-req.component';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { TrustingSocialReqHeaderComponent } from '../new-cust-component/component/third-party-form/trusting-social/request/trusting-social-req-header.component';
import { ReqGenerateTrxNoObj } from 'app/shared/model/master-sequence/req-generate-trx-no-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { data } from 'jquery';
import { UcTemplateService } from '@adins/uctemplate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-self-custom-container-third-party-form',
  templateUrl: './self-custom-container-third-party-form.component.html',
  styleUrls: ['./self-custom-container-third-party-form.component.css']
})
export class SelfCustomContainerThirdPartyFormComponent implements OnInit, OnDestroy {

  IsCustLoaded: boolean = true;
  @Input() CustId: number = 0;
  @Input() parentForm: FormGroup;
  @Input() dicts: Record<string, any>;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Input() thirdPartyTrxNo: string = null;
  @Input() custObj: CustObj = new CustObj();
  
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  
  MrCustTypeCode: string = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
  officeCode: string;
  IsUseDigitalization: string = "0";
  IsUseTs: Boolean = false;
  IsUsePefindo: Boolean = false;
  IsUseAsliRI: Boolean = false;
  IsUseCbasSlik: Boolean = false;
  ListDocumentKeyValueObj: Array<KeyValueObj> = new Array<KeyValueObj>();
  SpouseIdCode : string = "";

  width: number;
  height: number;
  url: any;

  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  CustDocFileObjs: Array<CustDocFileObj> = new Array<CustDocFileObj>();
  sysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();
  subscriber: Subscription;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = String.Join(", ", this.FileExtAllowed);

  readonly FileExtAllowedAsliRI: Array<string> = [CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionPng, CommonConstant.FileExtensionBmp]
  readonly ExtStrAsliRI: string = String.Join(", ", this.FileExtAllowedAsliRI);

  constructor(private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService, private modalService: NgbModal,
    private thirdPartyUploadService: ThirdPartyUploadService, 
    private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService,
    private ucTemplateSvc: UcTemplateService) { }

  async ngOnInit() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.officeCode = context[CommonConstant.OFFICE_CODE];
    await this.getIsUseDigitalization();
    if (this.IsUseDigitalization == CommonConstant.TRUE_CONDITION) {
      await this.getDigitalizationSvcType();
      if (this.CustId > 0) {
        await this.getCustDocFiles();
      }
      await this.getListDocumentToBeUpload();
      this.setAfterDuplicate();
    }
    this.subscriber = this.ucTemplateSvc.callback.subscribe((ev) => {
      if (ev!= null && !ev.hasOwnProperty("pageId")) {
        if (ev === "MrCustTypeCode") {
          const _MrCustTypeCode = this.parentForm.get(ev).value;
          if (_MrCustTypeCode) {
            this.MrCustTypeCode = _MrCustTypeCode;
            this.getListDocumentToBeUpload();
          }
        }

        if (ev === "MrMaritalStatCode")
        {
          const _MrMaritalStatCode = this.parentForm.get(ev).value;
          if (_MrMaritalStatCode) {
            this.setDocFormCustMaritalTypeChanged();
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscriber) {
      this.subscriber.unsubscribe();
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
    this.CustDocFileFormObjs = new Array<CustDocFileFormObj>();
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
          if (this.CustId == 0 || existingCustDocFile == undefined) {
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
      }
    );
  }

  setDocFormCustMaritalTypeChanged(){
    let idxObj = this.CustDocFileFormObjs.findIndex(x => x.MrCustDocTypeCode == CommonConstant.MasterCodeCustDocTypeSpouseId);

    if (this.parentForm.controls.MrMaritalStatCode != undefined)
    {
      if(this.parentForm.controls.MrMaritalStatCode.value == CommonConstant.MR_MARITAL_STAT_CODE_SINGLE){
        this.CustDocFileFormObjs[idxObj].IsRequired = false;
      }
      else{
        this.CustDocFileFormObjs[idxObj].IsRequired = true;
      }
    }
  }

  setAfterDuplicate()
  {
    if (this.dicts.ReqSubmitObj != null && this.dicts.ReqSubmitObj != undefined)
    {
      this.dicts.ReqSubmitObj.CustDocFileObjs.forEach(x => {
        let idxObj = this.CustDocFileFormObjs.findIndex(y => y.MrCustDocTypeCode == x.MrCustDocTypeCode);
        this.CustDocFileFormObjs[idxObj].IsRequired = false;
      });
    }
  }

  async getCustDocFiles() {
    var reqByIdObj = { Id: this.CustId };
    await this.http.post(this.UrlConstantNew.GetListCustDocFileByCustId, reqByIdObj).toPromise().then(
      async (response) => {
        this.CustDocFileObjs = response[CommonConstant.ReturnObj];
      }
    );
  }

  async ReqPefindo() {
    this.markFormGroupTouched(this.parentForm);
    if (!this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    if (!this.parentForm.valid) {
      return;
    }

    await this.checkThirdPartyTrxNo();
    await this.saveThirdPartyTrxNo();


    let tempForm = this.parentForm.getRawValue();

    let reqPefindoSmartSearchObj = new ReqPefindoSmartSearchObj();
    if (this.CustDataMode == this.CustDataModeMain) {
      reqPefindoSmartSearchObj.CustName = tempForm["CustName"];
    } else {
      reqPefindoSmartSearchObj.CustName = tempForm["ExistingCustName"]["value"];
    }
    reqPefindoSmartSearchObj.CustType = this.MrCustTypeCode;
    reqPefindoSmartSearchObj.BirthDt = tempForm["BirthDt"];

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
      this.http.post(this.UrlConstantNew.SaveCustDocFile, custDocFileObjs, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          const modalRef = this.modalService.open(PefindoReqComponent);
          modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
          modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
        }
      );
    }
    else {
      const modalRef = this.modalService.open(PefindoReqComponent);
      modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
      modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
    }

  }

  ViewPefindo() {
    let TrxNo = this.thirdPartyTrxNo;
    this.adInsHelperService.OpenPefindoViewForTemplate(TrxNo, this.MrCustTypeCode);
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

    // await this.checkThirdPartyTrxNo();
    // await this.saveThirdPartyTrxNo();

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

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async HandleFileInput(files: FileList, i) {
    this.CustDocFileFormObjs[i].File = files.item(0);

    let CustDocFileObjs: Array<CustDocFileObj>;
    CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);

    const data = {
      "UploadFile": CustDocFileObjs
    }

    this.data.emit(data)
  }
  
  async HandleFileInputAsliRI(files: FileList, img:any, i) {
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
    let CustDocFileObjs: Array<CustDocFileObj>;
    CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);

    const data = {
      "UploadFile": CustDocFileObjs
    }
    this.data.emit(data)
  }

  ConvertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  async checkThirdPartyTrxNo() {
    if (this.thirdPartyTrxNo == null || this.thirdPartyTrxNo == "") {
      var reqGenerateTrxNoObj = new ReqGenerateTrxNoObj();
      reqGenerateTrxNoObj.MasterSeqCode = CommonConstant.MasterSequenceCodeCustomerThirdParty;
      reqGenerateTrxNoObj.OfficeCode = this.officeCode;

      await this.http.post(this.UrlConstantNew.GenerateTransactionNoFromRedis, reqGenerateTrxNoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response: ResGenerateTrxNoObj) => {
          this.thirdPartyTrxNo = response.TrxNo;
          // this.OutputThirdPartyTrxNo.emit(this.thirdPartyTrxNo);

          const data = {
            "ThirdPartyTrxNo": this.thirdPartyTrxNo
          }
          this.data.emit(data)
        }
      );
    }
  }

  async saveThirdPartyTrxNo() {
    let reqByIdAndCode: GenericObj = new GenericObj();
    reqByIdAndCode.Id = this.CustId;
    reqByIdAndCode.Code = this.thirdPartyTrxNo;

    await this.http.post(this.UrlConstantNew.SaveCustThirdPartyTrxNo, reqByIdAndCode, AdInsConstant.SpinnerOptions).toPromise().then(
      response => {

      }
    )
  }

  SetThirdPartyTrxNo(ev: any)
  {

  }

  SetCustFileFormObjs(ev: any)
  {

  }

}
