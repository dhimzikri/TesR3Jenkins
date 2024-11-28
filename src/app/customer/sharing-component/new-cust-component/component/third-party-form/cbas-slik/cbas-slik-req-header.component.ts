import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqAddTrxSrcDataForCbasSlik } from 'app/shared/model/cbas-slik/req-add-trx-src-data-for-cbas-slik-obj.model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';

@Component({
  selector: 'app-cbas-slik-req-header',
  templateUrl: './cbas-slik-req-header.component.html',
})
export class CbasSlikReqHeaderComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal, 
    private http: HttpClient, 
    private fb: FormBuilder,
    private UrlConstantNew: UrlConstantNew
  ) { }

  @Input() ParentForm: FormGroup;
  @Input() MrCustTypeCode: string;
  @Output() SubmitReqTrxNo = new EventEmitter<string>();


  CbasSlikReqForm = this.fb.group({
    AktaNo: [''],
    BirthDate: [''],
    PurposeCode: ['', [Validators.required]]
  });
  ReqObj: ReqAddTrxSrcDataForCbasSlik = new ReqAddTrxSrcDataForCbasSlik();
  TrxNo: string;

  ngOnInit() {
    let formValue = this.ParentForm.value;

    this.ReqObj.Name = formValue.CustName;
    this.ReqObj.Npwp = formValue.TaxIdNo;
    this.ReqObj.Address = [formValue.UcAddress.Addr, formValue.UcAddress.AreaCode4, formValue.UcAddress.AreaCode3, formValue.UcAddress.AreaCode2, formValue.UcAddress.AreaCode1, formValue.UcAddress.City].join(', ');

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      this.ReqObj.CustType = 1 ;
      this.ReqObj.BirthDate = formValue.BirthDt;
      this.ReqObj.BirthPlace = formValue.BirthPlace;
      this.ReqObj.KtpNo = formValue.MrIdTypeCode == CommonConstant.MrIdTypeCodeEKTP ? formValue.IdNo : "";
      this.ReqObj.Gender = formValue.MrGenderCode == CommonConstant.GENDER_MALE ? "M" : "F";
      this.ReqObj.MotherName = formValue.MotherMaidenName;
      this.CbasSlikReqForm.get('AktaNo').clearValidators();
      this.CbasSlikReqForm.get('BirthDate').clearValidators();
    }
    else
    {
      this.ReqObj.CustType = 2;
      this.ReqObj.AktaNo = formValue.MrIdTypeCode == CommonConstant.MrIdTypeCodeAKTA ? formValue.IdNo : "";
      this.CbasSlikReqForm.patchValue({
        'AktaNo': this.ReqObj.AktaNo,
      });
      this.CbasSlikReqForm.get('AktaNo').setValidators(Validators.required);
      this.CbasSlikReqForm.get('BirthDate').setValidators(Validators.required);
    }
    this.CbasSlikReqForm.get('AktaNo').updateValueAndValidity();
    this.CbasSlikReqForm.get('BirthDate').updateValueAndValidity();

    this.initDropdownListObj();
  }

  DdlCbasSlikPurposeObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  initDropdownListObj(){
    var refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCbasSlikPurposeCode,
      MappingCode: null
    };
    this.DdlCbasSlikPurposeObj = new UcDropdownListObj(this.UrlConstantNew);
    this.DdlCbasSlikPurposeObj.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.DdlCbasSlikPurposeObj.ddlType = UcDropdownListConstant.DDL_TYPE_BLANK;
    this.DdlCbasSlikPurposeObj.requestObj = refMasterObjMrIdTypeCode;
    this.DdlCbasSlikPurposeObj.isObject = true;
    this.DdlCbasSlikPurposeObj.customObjName = "ReturnObject";
  }

  Submit(){
    this.ReqObj.PurposeCode = this.CbasSlikReqForm.get('PurposeCode').value;
    if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) 
    {
      this.ReqObj.AktaNo = this.CbasSlikReqForm.get('AktaNo').value;
      this.ReqObj.BirthDate = this.CbasSlikReqForm.get('BirthDate').value;
    }
    this.http.post(this.UrlConstantNew.AddTrxSrcDataForCbasSlik, this.ReqObj, AdInsConstant.SpinnerOptions).subscribe(
      (response:ResGenerateTrxNoObj) => {
        this.TrxNo = response.TrxNo;
        this.SubmitReqTrxNo.emit(this.TrxNo)
        this.activeModal.dismiss('')
      }
    );
  }

}
