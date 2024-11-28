import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CustCompanyContactPersonObj } from 'app/shared/model/cust-company-contact-person-obj.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { formatDate } from '@angular/common';
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-company-contact-information-x',
  templateUrl: './customer-company-contact-information-x.component.html'
})
export class CustomerCompanyContactInformationXComponent implements OnInit {

  @Input() custCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  readonly IdTypeNpwp: string = CommonConstant.MrIdTypeCodeNPWP;
  readonly IdTypeKitas: string = CommonConstant.MrIdTypeCodeKITAS;
  readonly IdTypeSim: string = CommonConstant.MrIdTypeCodeSIM;

  isIdExpiredDtRequired: boolean;

  tempCustAddrObj: any;
  tempMrGenderCode: KeyValueObj;
  tempMrJobPositionCode: KeyValueObj;
  tempCustCompanyContactPersonObj: any;
  tempMrIdTypeCode: KeyValueObj;
  tempMrCustRelationshipCode: KeyValueObj;

  custAddrObj: CustAddrObj;
  UcAddressObj: UcAddressObj;
  inputFieldObj: InputFieldObj;
  custCompanyContactPersonObj: CustCompanyContactPersonObj;
  CustCompanyId: GenericObj;

  IdCust: number;

  UserAccess: Object;
  MaxDate: Date;

  ContactInformationForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(500), Validators.required]],
    MrGenderCode: ['', [Validators.required, Validators.maxLength(100)]],
    MrJobPositionCode: ['', [Validators.required]],
    JobTitleName: ['', [Validators.required]],
    MobilePhnNo1: ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(100), Validators.required]],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email1: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    MrIdTypeCode: [''],
    IdNo: [''],
    IdExpiredDt: [''],
    BirthPlace: [''],
    BirthDt: [''],
    MrCustRelationshipCode: [''],
  });
  inputAddressObj: any;

  constructor(private regexService: RegexService, private router: Router, private route: ActivatedRoute, 
    private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, 
    private cookieService: CookieService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.customPattern = new Array<CustomPatternObj>();
    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.MaxDate = this.UserAccess[CommonConstant.BUSINESS_DT];
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj(this.UrlConstantNew);
    this.inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    var refMasterObjMrJobPositionCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition,
      MappingCode: null
    }
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterObjMrJobPositionCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrJobPositionCode = response[CommonConstant.ReturnObj];
      }
    );
    var refMasterObjMrGenderCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      MappingCode: null
    }
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterObjMrGenderCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrGenderCode = response[CommonConstant.ReturnObj];
      }
    );

    var refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      MappingCode: null
    }
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrIdTypeCode = response[CommonConstant.ReturnObj];

        if (this.tempMrIdTypeCode != undefined) {
          this.getInitPattern();
        }
      }
    );

    var refMasterObjMrCustRelationshipCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship,
      MappingCode: null
    }
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterObjMrCustRelationshipCode).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0)
          this.tempMrCustRelationshipCode = response[CommonConstant.ReturnObj];
      }
    );

    this.CustCompanyId = new GenericObj();
    this.custAddrObj = new CustAddrObj();

    var custObj = { CustId: this.IdCust };
    this.http.post(this.UrlConstantNew.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
      (response: any) => {
        this.custCompanyId = response['CustCompanyId'];

        this.CustCompanyId.Id = this.custCompanyId;
        this.http.post(this.UrlConstantNew.GetCustCompanyContactPersonByCustCompanyId, this.CustCompanyId).subscribe(
          (response) => {
            this.tempCustCompanyContactPersonObj = response;
            this.ContactInformationForm.patchValue({
              ContactPersonName: this.tempCustCompanyContactPersonObj.ContactPersonName,
              MrGenderCode: this.tempCustCompanyContactPersonObj.MrGenderCode,
              MrJobPositionCode: this.tempCustCompanyContactPersonObj.MrJobPositionCode,
              JobTitleName: this.tempCustCompanyContactPersonObj.JobTitleName,
              MobilePhnNo1: this.tempCustCompanyContactPersonObj.MobilePhnNo1,
              MobilePhnNo2: this.tempCustCompanyContactPersonObj.MobilePhnNo2,
              Email1: this.tempCustCompanyContactPersonObj.Email1,
              Email2: this.tempCustCompanyContactPersonObj.Email2,
              MrIdTypeCode: this.tempCustCompanyContactPersonObj.MrIdTypeCode,
              IdNo: this.tempCustCompanyContactPersonObj.IdNo,
              IdExpiredDt: this.tempCustCompanyContactPersonObj.IdExpiredDt != null ? formatDate(this.tempCustCompanyContactPersonObj.IdExpiredDt, 'yyyy-MM-dd', 'en-US') : "",
              BirthPlace: this.tempCustCompanyContactPersonObj.BirthPlace,
              BirthDt: this.tempCustCompanyContactPersonObj.BirthDt != null ? formatDate(this.tempCustCompanyContactPersonObj.BirthDt, 'yyyy-MM-dd', 'en-US') : "",
              MrCustRelationshipCode: this.tempCustCompanyContactPersonObj.MrCustRelationshipCode,
            });

            if (this.tempCustCompanyContactPersonObj.MrGenderCode == null) {
              this.ContactInformationForm.patchValue({
                MrGenderCode: this.tempMrGenderCode[0].Key
              });
            }
            if (this.tempCustCompanyContactPersonObj.MrJobPositionCode == null) {
              this.ContactInformationForm.patchValue({
                MrJobPositionCode: this.tempMrJobPositionCode[0].Key
              });
            }

            if (this.tempCustCompanyContactPersonObj.MrIdTypeCode == null) {
              this.ContactInformationForm.patchValue({
                MrIdTypeCode: this.tempMrIdTypeCode[0].Key
              });

              this.setValidatorPattern();
            }

            if (this.tempCustCompanyContactPersonObj.MrCustRelationshipCode == null) {
              this.ContactInformationForm.patchValue({
                MrCustRelationshipCode: this.tempMrCustRelationshipCode[0].Key
              });
            }

            this.ChangeIdType(true);
          });
      }
    );

    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.IdCust;
    reqObj.Code = CommonConstant.CustAddrTypeContact;
    this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response) => {
        this.tempCustAddrObj = response;
        this.UcAddressObj.AreaCode1 = this.tempCustAddrObj.AreaCode1;
        this.UcAddressObj.AreaCode2 = this.tempCustAddrObj.AreaCode2;
        this.UcAddressObj.AreaCode3 = this.tempCustAddrObj.AreaCode3;
        this.UcAddressObj.AreaCode4 = this.tempCustAddrObj.AreaCode4;
        this.UcAddressObj.Addr = this.tempCustAddrObj.Addr;
        this.UcAddressObj.City = this.tempCustAddrObj.City;
        this.UcAddressObj.PhnArea1 = this.tempCustAddrObj.PhnArea1;
        this.UcAddressObj.Phn1 = this.tempCustAddrObj.Phn1;
        this.UcAddressObj.PhnExt1 = this.tempCustAddrObj.PhnExt1;
        this.UcAddressObj.PhnArea2 = this.tempCustAddrObj.PhnArea2;
        this.UcAddressObj.Phn2 = this.tempCustAddrObj.Phn2;
        this.UcAddressObj.PhnExt2 = this.tempCustAddrObj.PhnExt2;
        this.UcAddressObj.FaxArea = this.tempCustAddrObj.FaxArea;
        this.UcAddressObj.Fax = this.tempCustAddrObj.Fax;
        this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddrObj.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddrObj.Zipcode };
      });
    this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputAddressObj.default = this.UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showPhn3 = false;
    this.inputAddressObj.isRequired = true;
    this.inputAddressObj.inputField.inputLookupObj.isRequired = true;
  }

  ChangeIdType(FirstInit: boolean = false) {
    let IdTypeCode = this.ContactInformationForm.get("MrIdTypeCode").value;
    if (IdTypeCode == this.IdTypeNpwp) {
      this.ContactInformationForm.get("IdNo").setValidators(Validators.required);
    }
    else if (IdTypeCode == CommonConstant.MrIdTypeCodeEKTP) {
      this.ContactInformationForm.get("IdNo").setValidators([Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      this.ContactInformationForm.get("IdNo").clearValidators();
    }
    this.ContactInformationForm.get("IdNo").updateValueAndValidity();

    if (IdTypeCode == this.IdTypeKitas || IdTypeCode == this.IdTypeSim) {
      this.ContactInformationForm.get("IdExpiredDt").setValidators(Validators.required);
      this.isIdExpiredDtRequired = true;
    } else {
      this.ContactInformationForm.get("IdExpiredDt").clearValidators();
      this.isIdExpiredDtRequired = false;
    }

    if (!FirstInit) this.ContactInformationForm.controls.IdExpiredDt.patchValue("");
    this.ContactInformationForm.get("IdExpiredDt").updateValueAndValidity();

    this.setValidatorPattern();
  }

  // back() {
  //   this.outputTab.emit({ stepMode: 'previous' });
  // }

  async SaveValue(IsParent: boolean = false): Promise<boolean> {
    if (this.ContactInformationForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.ContactInformationForm);
      return false;
    }
    this.custCompanyContactPersonObj = new CustCompanyContactPersonObj();
    this.custAddrObj = new CustAddrObj();
    if (this.tempCustAddrObj.CustAddrId != null) {
      this.custAddrObj = this.tempCustAddrObj;
      this.custCompanyContactPersonObj = this.tempCustCompanyContactPersonObj;
    }

    this.custCompanyContactPersonObj.CustCompanyId = this.custCompanyId;
    this.custCompanyContactPersonObj.ContactPersonName = this.ContactInformationForm.controls["ContactPersonName"].value;
    this.custCompanyContactPersonObj.MrGenderCode = this.ContactInformationForm.controls["MrGenderCode"].value;
    this.custCompanyContactPersonObj.MrJobPositionCode = this.ContactInformationForm.controls["MrJobPositionCode"].value;
    this.custCompanyContactPersonObj.JobTitleName = this.ContactInformationForm.controls["JobTitleName"].value;
    this.custCompanyContactPersonObj.MobilePhnNo1 = this.ContactInformationForm.controls["MobilePhnNo1"].value;
    this.custCompanyContactPersonObj.MobilePhnNo2 = this.ContactInformationForm.controls["MobilePhnNo2"].value;
    this.custCompanyContactPersonObj.Email1 = this.ContactInformationForm.controls["Email1"].value;
    this.custCompanyContactPersonObj.Email2 = this.ContactInformationForm.controls["Email2"].value;
    this.custCompanyContactPersonObj.MrIdTypeCode = this.ContactInformationForm.controls["MrIdTypeCode"].value;
    this.custCompanyContactPersonObj.IdNo = this.ContactInformationForm.controls["IdNo"].value;
    this.custCompanyContactPersonObj.IdExpiredDt = this.ContactInformationForm.controls["IdExpiredDt"].value;
    this.custCompanyContactPersonObj.BirthPlace = this.ContactInformationForm.controls["BirthPlace"].value;
    this.custCompanyContactPersonObj.BirthDt = this.ContactInformationForm.controls["BirthDt"].value;
    this.custCompanyContactPersonObj.MrCustRelationshipCode = this.ContactInformationForm.controls["MrCustRelationshipCode"].value;

    this.custAddrObj.CustId = this.IdCust;
    this.custAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeContact;
    this.custAddrObj.Addr = this.ContactInformationForm.value.UcAddress.Addr;
    this.custAddrObj.AreaCode1 = this.ContactInformationForm.value.UcAddress.AreaCode1;
    this.custAddrObj.AreaCode2 = this.ContactInformationForm.value.UcAddress.AreaCode2;
    this.custAddrObj.AreaCode3 = this.ContactInformationForm.value.UcAddress.AreaCode3;
    this.custAddrObj.AreaCode4 = this.ContactInformationForm.value.UcAddress.AreaCode4;
    this.custAddrObj.City = this.ContactInformationForm.value.UcAddress.City;
    this.custAddrObj.Zipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.FullAddr = this.ContactInformationForm.value.UcAddress.Addr + " RT: " + this.ContactInformationForm.value.UcAddress.AreaCode4 + " RW: " + this.ContactInformationForm.value.UcAddress.AreaCode3 + " " + this.ContactInformationForm.value.UcAddress.AreaCode2 + ", " + this.ContactInformationForm.value.UcAddress.AreaCode1 + " " + this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.SubZipcode = this.ContactInformationForm.value.UcAddressZipcode.value;
    this.custAddrObj.Fax = this.ContactInformationForm.value.UcAddress.Fax;
    this.custAddrObj.FaxArea = this.ContactInformationForm.value.UcAddress.FaxArea;
    this.custAddrObj.Phn1 = this.ContactInformationForm.value.UcAddress.Phn1;
    this.custAddrObj.Phn2 = this.ContactInformationForm.value.UcAddress.Phn2;
    this.custAddrObj.PhnArea1 = this.ContactInformationForm.value.UcAddress.PhnArea1;
    this.custAddrObj.PhnArea2 = this.ContactInformationForm.value.UcAddress.PhnArea2;
    this.custAddrObj.PhnExt1 = this.ContactInformationForm.value.UcAddress.PhnExt1;
    this.custAddrObj.PhnExt2 = this.ContactInformationForm.value.UcAddress.PhnExt2;
    this.custCompanyContactPersonObj.CustAddrObj = this.custAddrObj;

    if (this.tempCustCompanyContactPersonObj.CustCompanyContactPersonId != 0) {
      this.custAddrObj = this.tempCustAddrObj;
      this.custCompanyContactPersonObj = this.tempCustCompanyContactPersonObj;
      this.custCompanyContactPersonObj.RowVersion = this.tempCustCompanyContactPersonObj.RowVersion;

      await this.http.post(this.UrlConstantNew.EditCustCompanyContactPersonByCustCompanyId, this.custCompanyContactPersonObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          if(!IsParent) this.outputTab.emit({ stepMode: 'next' });
        }
      );
    } else {
      await this.http.post(this.UrlConstantNew.AddCustCompanyContactPerson, this.custCompanyContactPersonObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          if(!IsParent) this.outputTab.emit({ stepMode: 'next' });
        }
      );
    }
    return true;
  }

  //START URS-LOS-041
  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if (this.resultPattern != undefined) {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;

            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
            this.customPattern.push(patternObj);
          }
          this.setValidatorPattern();
        }
      }
    );
  }
  // setValidatorPattern(){
  //   let idTypeValue: string;

  //   idTypeValue = this.ContactInformationForm.controls[this.controlNameIdType].value;

  //   if (this.resultPattern != undefined) {
  //     var result = this.resultPattern.find(x => x.Key == idTypeValue)

  //     if (result != undefined) {
  //       var pattern = result.Value;
  //       if (pattern != undefined) {
  //         this.setValidator(pattern);
  //       }
  //     }
  //   }
  // }

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.ContactInformationForm.controls[this.controlNameIdType].value;
    var pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        var result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    if (pattern != undefined) {
      this.ContactInformationForm.controls[this.controlNameIdNo].setValidators(Validators.pattern(pattern));
      this.ContactInformationForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041

}
