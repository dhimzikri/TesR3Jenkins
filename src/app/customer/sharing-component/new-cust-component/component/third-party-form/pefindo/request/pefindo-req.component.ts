import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/digitalization/req-pefindo-smart-search-obj.model';
import { PefindoSmartSearchCoyObj } from 'app/shared/model/digitalization/pefindo-smart-search-coy-obj.model';
import { PefindoSmartSearchPersonalObj } from 'app/shared/model/digitalization/pefindo-smart-search-personal-obj.model';
import { ReqAddTrxSrcDataForPefindoObj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { ReqAddTrxSrcDataForPefindoMultiResultObj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-multi-result-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ReqGenerateTrxNoObj } from 'app/shared/model/master-sequence/req-generate-trx-no-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqPefindoSmartSearchV2Obj } from 'app/shared/model/digitalization/req-pefindo-smart-search-v2-obj.model';
import { ReqAddTrxSrcDataForPefindoMultiResultV2Obj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-multi-result-v2-obj.model';
import { ReqAddTrxSrcDataForPefindoV2Obj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-v2-obj-model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';


@Component({
  selector: 'app-pefindo-req',
  templateUrl: './pefindo-req.component.html',
})
export class PefindoReqComponent implements OnInit {

  @Input() ReqPefindoSmartSearchObj: ReqPefindoSmartSearchV2Obj;
  @Input() ThirdPartyTrxNo: string;
  @Input() RowVersion: string;
  @Input() IsCustPefindoReq: boolean;

  IsSmartSearchResultReady: boolean = false;
  PefindoSmartSearchPersonalObjs: Array<PefindoSmartSearchPersonalObj> = new Array<PefindoSmartSearchPersonalObj>();
  PefindoSmartSearchCoyObjs: Array<PefindoSmartSearchCoyObj> = new Array<PefindoSmartSearchCoyObj>();
  slikReferenceCode: string = "";
  
  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCompany: string = CommonConstant.CustomerCompany;
  readonly RefMasterTypeCodePefindoInquiryReason: string = CommonConstant.RefMasterTypeCodePefindoInquiryReason;

  PefindoForm: FormGroup = this.fb.group({
    PefindoArr: this.fb.array([]),
    PefindoInquiryReason: ['']
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private toastr: NGXToastrService,
    private cookieService: CookieService,
    private UrlConstantNew: UrlConstantNew
  ) {

  }

  DictUcDDLObj: { [id: string]: Array<KeyValueObj> } = {};
  async ngOnInit() {
    await this.getGenSet();
    if (this.IsCustPefindoReq == undefined) {
      await this.initGrid();
    }
    
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: this.RefMasterTypeCodePefindoInquiryReason }).toPromise().then(
      (response) => {
          this.DictUcDDLObj[this.RefMasterTypeCodePefindoInquiryReason] = response["ReturnObject"];
      }
    );
  }

  async initGrid(){
    if (this.IsCustPefindoReq) {
      this.ReqPefindoSmartSearchObj.MrPefindoInquiryReasonCode = this.PefindoForm.controls.PefindoInquiryReason.value;
    }

    this.IsSmartSearchResultReady = false;
    await this.http.post(this.UrlConstantNew.PefindoSmartSearchV2, this.ReqPefindoSmartSearchObj).toPromise().then(
      (response) => {
        this.IsSmartSearchResultReady = true;
        this.slikReferenceCode = response["SlikReferenceCode"];
        if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal){
          this.PefindoSmartSearchPersonalObjs = response["ReturnObject"]["ReturnObject"];
        }
        if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany){
          this.PefindoSmartSearchCoyObjs = response["ReturnObject"]["ReturnObject"];
        }

        if (this.pefindoMultiResMax > 0) this.setData();
      }
    );
    this.IsSmartSearchResultReady = true;
  }

  pefindoMultiResMax: number = 0;
  @Input() CustId: number;
  @Output() thirdPartyGroupTrxNo: EventEmitter<string> = new EventEmitter();
  async getGenSet()
  {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GsPefindoMultiResultMax }).toPromise().then(
      (result: GeneralSettingObj) => {
        this.pefindoMultiResMax = parseInt(result.GsValue);
      }
    );
  }

  setData()
  {
    let PefindoArr = this.PefindoForm.get("PefindoArr") as FormArray;
    
    if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal)
    {
      this.PefindoSmartSearchPersonalObjs.forEach(x => {
        let pefindo = this.fb.group({
          IsChecked: false,
          PefindoId: x.PefindoId,
          IdCardNumber: x.KTP,
          Name: x.FullName,
          BirthDt: x.DateOfBirth,
          Address: x.Address
        })

        PefindoArr.push(pefindo);
      });
    }

    if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany)
    {
      this.PefindoSmartSearchCoyObjs.forEach(x => {
        let pefindo = this.fb.group({
          IsChecked: false,
          PefindoId: x.PefindoId,
          IdCardNumber: x.NPWP,
          Name: x.CompanyName,
          Address: x.Address
        })

        PefindoArr.push(pefindo);
      });
    }
  }

  async Request()
  {
    var reqAddTrxSrcDataForPefindoMultiResultV2Obj = new ReqAddTrxSrcDataForPefindoMultiResultV2Obj();

    let PefindoArr = this.PefindoForm.value.PefindoArr.filter(x => x.IsChecked);

    await this.getGenSet();

    if (PefindoArr.length == 0)
    {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_SELECT_MIN_1_PEFINDO_DATA);
      return;
    }
    if (PefindoArr.length > this.pefindoMultiResMax)
    {
      this.toastr.warningMessage(ExceptionConstant.CAN_NOT_REQUEST_PEFINDO_MORE_THAN + " "  + this.pefindoMultiResMax);
      return;
    }

    if (this.CustId)
    {
      reqAddTrxSrcDataForPefindoMultiResultV2Obj.CustId = this.CustId;
      reqAddTrxSrcDataForPefindoMultiResultV2Obj.RowVersion = this.RowVersion;
    }
    reqAddTrxSrcDataForPefindoMultiResultV2Obj.ReqAddTrxSrcDataForPefindoObj = new Array<ReqAddTrxSrcDataForPefindoV2Obj>();
    reqAddTrxSrcDataForPefindoMultiResultV2Obj.SlikReferenceCode = this.slikReferenceCode;
    reqAddTrxSrcDataForPefindoMultiResultV2Obj.MrPefindoInquiryReasonCode = this.ReqPefindoSmartSearchObj.MrPefindoInquiryReasonCode;

    PefindoArr.forEach(x => {
      let reqAddTrxSrcDataForPefindoObj = new ReqAddTrxSrcDataForPefindoV2Obj();

      reqAddTrxSrcDataForPefindoObj.PefindoId = x.PefindoId;
      reqAddTrxSrcDataForPefindoObj.IdNo = x.IdCardNumber;
      reqAddTrxSrcDataForPefindoObj.IdType = this.ReqPefindoSmartSearchObj.IdType;
      reqAddTrxSrcDataForPefindoObj.CustName = x.Name;
      reqAddTrxSrcDataForPefindoObj.Addr = x.Address;

      if (this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal)
      {
        reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypePersonal;
        reqAddTrxSrcDataForPefindoObj.BirthDt = x.BirthDt;
      }
      
      if (this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany)
      {
        reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypeCompany;
        reqAddTrxSrcDataForPefindoObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
      }

      reqAddTrxSrcDataForPefindoMultiResultV2Obj.ReqAddTrxSrcDataForPefindoObj.push(reqAddTrxSrcDataForPefindoObj);
    });

    this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindoMultiResultV2, reqAddTrxSrcDataForPefindoMultiResultV2Obj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.thirdPartyGroupTrxNo.emit(response['ThirdPartyRsltHGroupNo'])
        this.toastr.successMessage(response["Message"]);
        this.activeModal.close(response);
      }
    );
  }

  async RequestPersonal(pefindoSmartSearchPersonalObj: PefindoSmartSearchPersonalObj){
    await this.checkThirdPartyTrxNo();

    var reqAddTrxSrcDataForPefindoObj = new ReqAddTrxSrcDataForPefindoV2Obj();

    reqAddTrxSrcDataForPefindoObj.TrxNo = this.ThirdPartyTrxNo;
    reqAddTrxSrcDataForPefindoObj.Addr = pefindoSmartSearchPersonalObj.Address;
    reqAddTrxSrcDataForPefindoObj.BirthDt = pefindoSmartSearchPersonalObj.DateOfBirth;
    reqAddTrxSrcDataForPefindoObj.CustName = pefindoSmartSearchPersonalObj.FullName;
    reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypePersonal;
    reqAddTrxSrcDataForPefindoObj.IdNo = pefindoSmartSearchPersonalObj.KTP;
    reqAddTrxSrcDataForPefindoObj.IdType = this.ReqPefindoSmartSearchObj.IdType;
    reqAddTrxSrcDataForPefindoObj.PefindoId = pefindoSmartSearchPersonalObj.PefindoId;
    reqAddTrxSrcDataForPefindoObj.SlikReferenceCode = this.slikReferenceCode;

    if (pefindoSmartSearchPersonalObj.KTP == null)
    {
      this.toastr.warningMessage(ExceptionConstant.PEFINDO_DATA_NOT_FOUND);
    }
    
    if(environment.isCore){
      await this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindoV2, reqAddTrxSrcDataForPefindoObj).toPromise().then(
        async (response) => {
          this.saveThirdPartyTrxNo();
          this.toastr.successMessage(response["Message"]);
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindo, reqAddTrxSrcDataForPefindoObj).subscribe(
        (response) => {
          this.saveThirdPartyTrxNo();
          this.toastr.successMessage(response["Message"]);
        }
      );
    }

  }

  async RequestCompany(pefindoSmartSearchCoyObj: PefindoSmartSearchCoyObj){
    await this.checkThirdPartyTrxNo();

    var reqAddTrxSrcDataForPefindoObj = new ReqAddTrxSrcDataForPefindoObj();

    reqAddTrxSrcDataForPefindoObj.TrxNo = this.ThirdPartyTrxNo;
    reqAddTrxSrcDataForPefindoObj.Addr = pefindoSmartSearchCoyObj.Address;
    reqAddTrxSrcDataForPefindoObj.CustName = pefindoSmartSearchCoyObj.CompanyName;
    reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypeCompany;
    reqAddTrxSrcDataForPefindoObj.IdNo = pefindoSmartSearchCoyObj.NPWP;
    reqAddTrxSrcDataForPefindoObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
    reqAddTrxSrcDataForPefindoObj.PefindoId = pefindoSmartSearchCoyObj.PefindoId;

    if (pefindoSmartSearchCoyObj.NPWP == null)
    {
      this.toastr.warningMessage(ExceptionConstant.PEFINDO_DATA_NOT_FOUND);
    }

    if(environment.isCore){
      await this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindoV2, reqAddTrxSrcDataForPefindoObj).toPromise().then(
        async (response) => {
          this.saveThirdPartyTrxNo();
          this.toastr.successMessage(response["Message"]);
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindo, reqAddTrxSrcDataForPefindoObj).subscribe(
        (response) => {
          this.saveThirdPartyTrxNo();
          this.toastr.successMessage(response["Message"]);
        }
      );
    }

  }

  async saveThirdPartyTrxNo() {
    let reqByIdAndCode: GenericObj = new GenericObj();
    if (!this.CustId)
    {
      reqByIdAndCode.Code = this.ThirdPartyTrxNo;
      this.activeModal.close(reqByIdAndCode);
      return;
    }
    reqByIdAndCode.Id = this.CustId;
    reqByIdAndCode.Code = this.ThirdPartyTrxNo;
    reqByIdAndCode.RowVersion = this.RowVersion;

    await this.http.post(this.UrlConstantNew.SaveCustThirdPartyTrxNo, reqByIdAndCode).toPromise().then(
      response => {
        this.activeModal.close(response);
      }
    )
  }

  async checkThirdPartyTrxNo() {
    if (this.ThirdPartyTrxNo == null || this.ThirdPartyTrxNo == "") {
      let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
      let officeCode = context[CommonConstant.OFFICE_CODE];

      var reqGenerateTrxNoObj = new ReqGenerateTrxNoObj();
      reqGenerateTrxNoObj.MasterSeqCode = CommonConstant.MasterSequenceCodeCustomerThirdParty;
      reqGenerateTrxNoObj.OfficeCode = officeCode;

      await this.http.post(this.UrlConstantNew.GenerateTransactionNoFromRedis, reqGenerateTrxNoObj).toPromise().then(
        (response: ResGenerateTrxNoObj) => {
          this.ThirdPartyTrxNo = response.TrxNo;
        }
      );
    }
  }

  toDisplay: boolean = false;
  async viewData() {
    if (this.PefindoForm.controls.PefindoInquiryReason.value == ""){
      this.toastr.warningMessage(ExceptionConstant.PLEASE_CHOOSE_INQUIRY_REASON_FIRST)
      return;
    } else {
      while (this.PefindoForm.controls.PefindoArr.value.length != 0) {
        let formArray = this.PefindoForm.get('PefindoArr') as FormArray;
        formArray.removeAt(0);
      }
      await this.initGrid();
      this.toDisplay = !this.toDisplay;
    }
  }

  changeDDL(){
    this.toDisplay = false;
    while (this.PefindoForm.controls.PefindoArr.value.length != 0) {
      let formArray = this.PefindoForm.get('PefindoArr') as FormArray;
      formArray.removeAt(0);
    }
  }  
}
