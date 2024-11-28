import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { CustPersonalContactPersonObj } from 'app/shared/model/cust-personal-contact-person-obj.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { DatePipe } from '@angular/common';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { ActivatedRoute } from '@angular/router';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/response/res-get-list-cust-addr-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UcDropdownListCallbackObj, UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-emergency-contact-x',
  templateUrl: './customer-emergency-contact-x.component.html'
})
export class CustomerEmergencyContactXComponent implements OnInit {

  @Output() outputTab: EventEmitter<any> = new EventEmitter();
  @Input() custId: number;
  // @Input() custPersonalContactPersonId: number;
  // @Input() listCustIdToExclude: Array<string>;

  Country: any;
  tempCust: any;
  tempIdType: any;
  tempCustAddress: any;
  tempCustPersonal: any;
  tempCustAddrObj: GenericObj = new GenericObj();
  tempMrGenderCode: any;
  tempMrCustRelationshipCode: any;
  tempCustPersonalContactPerson: CustPersonalContactPersonObj;

  lookUpObj: InputLookupObj;
  inputFieldObj: InputFieldObj;
  existingCustomerLookUpObj: InputLookupObj;

  custObj: CustObj;
  criteriaObj: CriteriaObj;
  custAddrObj: CustAddrObj;
  UcAddressObj: UcAddressObj;
  custPersonalObj: CustPersonalObj;
  criteriaList: Array<CriteriaObj>;
  custPersonalContactPersonObj: CustPersonalContactPersonObj;
  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();
  ddlMrCustRelationshipCode: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  ddlIdType: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  ddlMrGenderCode : UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);

  IdCust: number;
  tempCustId: number;
  BusinessDt: Date;
  flag: boolean;
  tempKTPCheck: boolean;
  tempMobilePhone1: boolean;
  businessDtMin: Date;
  businessDtMax: Date;

  KTP: string;

  CustomerContactForm = this.fb.group({
    MrIdTypeCode: [''],
    IdExpiredDt: [''],
    IdNo: [''],
    BirthPlace: [''],
    BirthDt: [''],
    MrGenderCode: ['', Validators.required],
    MrCustRelationshipCode: ['', Validators.required],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    ContactPersonCustNo: [''],
    CopyFromContactPerson: [''],
  });
  criteriaExistingList: any[];
  criteriaExistingObj: CriteriaObj;
  criteriaCurrentCust: CriteriaObj;
  inputAddressObj: InputAddressObj;

  constructor(private regexService: RegexService, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.KTP = RefMasterConstant.EKtp;
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
    });
    this.custId = 0;
  }
  isAdd: any;
  ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);
    this.BusinessDt = new Date(context[CommonConstant.BUSINESS_DT]);

    this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";

    this.UcAddressObj = new UcAddressObj();


    this.existingCustomerLookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.existingCustomerLookUpObj.isRequired = false;
    this.existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.isRequired = true;
    this.existingCustomerLookUpObj.isReadonly = false;

    this.criteriaExistingList = new Array();
    this.criteriaCurrentCust = new CriteriaObj();
    this.criteriaCurrentCust.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaCurrentCust.propName = 'C.CUST_ID';
    this.criteriaCurrentCust.value = this.custId.toString();
    this.criteriaExistingList.push(this.criteriaCurrentCust);

    this.criteriaExistingObj = new CriteriaObj();
    this.criteriaExistingObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaExistingObj.propName = 'C.MR_CUST_TYPE_CODE';
    this.criteriaExistingObj.value = CommonConstant.CustomerPersonal;
    this.criteriaExistingList.push(this.criteriaExistingObj);
    if (this.existingCustomerLookUpObj.addCritInput) {
      this.existingCustomerLookUpObj.addCritInput.push(this.criteriaExistingObj);
    }
    else {
      this.existingCustomerLookUpObj.addCritInput = this.criteriaExistingList;
    }

    this.inputFieldObj = new InputFieldObj(this.UrlConstantNew);
    this.inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputFieldObj.inputLookupObj.isRequired = false;

    this.initDropdownListObj();


    console.log("Emergency Comp Cust Id: " + this.custId);
    if (this.custId > 0) {
      this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonalContactPersonObj.CustId = this.custId;
      this.getInitPattern();
      this.http.post<CustPersonalContactPersonObj>(this.UrlConstantNew.GetCustPersonalEmergencyContactByCustId, { Id: this.custId }).toPromise().then(
        (response) => {
          var datePipe = new DatePipe("en-US");
          this.tempCustPersonalContactPerson = response;
          console.log("tempCustPersonalContactPerson: " + JSON.stringify(this.tempCustPersonalContactPerson));
          if (this.tempCustPersonalContactPerson.CustPersonalContactPersonId != 0) {
            this.CustomerContactForm.patchValue({
              MrIdTypeCode: this.tempCustPersonalContactPerson.MrIdTypeCode,
              IdNo: this.tempCustPersonalContactPerson.IdNo,
              IdExpiredDt: this.tempCustPersonalContactPerson.IdExpiredDt != null? datePipe.transform(this.tempCustPersonalContactPerson.IdExpiredDt, 'yyyy-MM-dd') : "",
              BirthPlace: this.tempCustPersonalContactPerson.BirthPlace,
              BirthDt: this.tempCustPersonalContactPerson.BirthDt != null? datePipe.transform(this.tempCustPersonalContactPerson.BirthDt, 'yyyy-MM-dd') : "",
              MobilePhnNo1: this.tempCustPersonalContactPerson.MobilePhnNo1,
              MobilePhnNo2: this.tempCustPersonalContactPerson.MobilePhnNo2,
              Email: this.tempCustPersonalContactPerson.Email,
              // IsFamily: this.tempCustPersonalContactPerson.IsFamily,
              // IsEmergencyContact: this.tempCustPersonalContactPerson.IsEmergencyContact,
              MrCustRelationshipCode: this.tempCustPersonalContactPerson.MrCustRelationshipCode,
              MrGenderCode: this.tempCustPersonalContactPerson.MrGenderCode,
              ContactPersonCustNo: this.tempCustPersonalContactPerson.ContactPersonCustNo 
            });
          }
          this.existingCustomerLookUpObj.jsonSelect = { CustName: this.tempCustPersonalContactPerson.ContactPersonName };
          this.existingCustomerLookUpObj.isReady = true;
          if(this.tempCustPersonalContactPerson.ContactPersonCustNo != null && this.tempCustPersonalContactPerson.ContactPersonCustNo != ""){
            this.setDisableForm(this.tempCustPersonalContactPerson.MobilePhnNo1);
          }

          this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustPersonalContactPerson.Zipcode;
          this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustPersonalContactPerson.Zipcode };
          this.UcAddressObj.AreaCode1 = this.tempCustPersonalContactPerson.AreaCode1;
          this.UcAddressObj.AreaCode2 = this.tempCustPersonalContactPerson.AreaCode2;
          this.UcAddressObj.AreaCode3 = this.tempCustPersonalContactPerson.AreaCode3;
          this.UcAddressObj.AreaCode4 = this.tempCustPersonalContactPerson.AreaCode4;
          this.UcAddressObj.Phn1 = this.tempCustPersonalContactPerson.Phn1;
          this.UcAddressObj.Phn2 = this.tempCustPersonalContactPerson.Phn2;
          this.UcAddressObj.Phn3 = this.tempCustPersonalContactPerson.Phn3;
          this.UcAddressObj.PhnArea1 = this.tempCustPersonalContactPerson.PhnArea1;
          this.UcAddressObj.PhnArea2 = this.tempCustPersonalContactPerson.PhnArea2;
          this.UcAddressObj.PhnArea3 = this.tempCustPersonalContactPerson.PhnArea3;
          this.UcAddressObj.PhnExt1 = this.tempCustPersonalContactPerson.PhnExt1;
          this.UcAddressObj.PhnExt2 = this.tempCustPersonalContactPerson.PhnExt2;
          this.UcAddressObj.PhnExt3 = this.tempCustPersonalContactPerson.PhnExt3;
          this.UcAddressObj.Addr = this.tempCustPersonalContactPerson.Addr;
          this.UcAddressObj.City = this.tempCustPersonalContactPerson.City;
          this.inputAddressObj.default = this.UcAddressObj;
          this.inputAddressObj.inputField = this.inputFieldObj;
          this.setValidatorPattern();
        });

    }
    this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = true;
    this.inputAddressObj.showFax = false;
    this.inputAddressObj.isRequired = true;

    this.tempCustAddrObj.Id = this.IdCust;
    this.http.post(this.UrlConstantNew.GetListCustAddr, this.tempCustAddrObj).subscribe(
      (response : ResGetListCustAddrObj) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        if (this.listCustAddr.length > 0) {
          this.CustomerContactForm.patchValue({ CopyFromContactPerson: response[CommonConstant.ReturnObj][0]['CustAddrId'] });
        }
      });
  }

  copyAddress() {
    if (this.listCustAddr.length < 1) {
      return
    }
    var custAddrFromObj = new CustAddrObj();
    custAddrFromObj.CustAddrId = this.CustomerContactForm.controls["CopyFromContactPerson"].value;
    this.http.post<CustAddrObj>(this.UrlConstantNew.GetCustAddr, { Id: custAddrFromObj.CustAddrId }).subscribe(
      (response) => {
        var copyCustomerAddrFrom = response;

        this.UcAddressObj = new UcAddressObj();
        this.UcAddressObj.Addr = copyCustomerAddrFrom.Addr;
        this.UcAddressObj.AreaCode3 = copyCustomerAddrFrom.AreaCode3;
        this.UcAddressObj.AreaCode4 = copyCustomerAddrFrom.AreaCode4;
        this.UcAddressObj.AreaCode1 = copyCustomerAddrFrom.AreaCode1;
        this.UcAddressObj.AreaCode2 = copyCustomerAddrFrom.AreaCode2;
        this.UcAddressObj.City = copyCustomerAddrFrom.City;
        this.UcAddressObj.PhnArea1 = copyCustomerAddrFrom.PhnArea1;
        this.UcAddressObj.Phn1 = copyCustomerAddrFrom.Phn1;
        this.UcAddressObj.PhnExt1 = copyCustomerAddrFrom.PhnExt1;
        this.UcAddressObj.PhnArea2 = copyCustomerAddrFrom.PhnArea2;
        this.UcAddressObj.Phn2 = copyCustomerAddrFrom.Phn2;
        this.UcAddressObj.PhnExt2 = copyCustomerAddrFrom.PhnExt2;
        this.UcAddressObj.PhnArea3 = copyCustomerAddrFrom.PhnArea3;
        this.UcAddressObj.Phn3 = copyCustomerAddrFrom.Phn3;
        this.UcAddressObj.PhnExt3 = copyCustomerAddrFrom.PhnExt3;
        this.UcAddressObj.FaxArea = copyCustomerAddrFrom.FaxArea;
        this.UcAddressObj.Fax = copyCustomerAddrFrom.Fax;

        this.inputFieldObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldObj.inputLookupObj.nameSelect = copyCustomerAddrFrom.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: copyCustomerAddrFrom.Zipcode };
        this.inputAddressObj.default = this.UcAddressObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
      });
  }

  async SaveValue(IsParent: boolean = false): Promise<boolean> {
    if (this.CustomerContactForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.CustomerContactForm);
      return false;
    }
    console.log("ameng");
    if(this.checkEmergencyCustContactPerson() == false){
      return;
    }
    this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
    this.custPersonalContactPersonObj.CustId = this.IdCust;
    this.custPersonalContactPersonObj.ContactPersonName = this.CustomerContactForm.controls["ExistingCustomer"]["controls"].value.value;
    this.custPersonalContactPersonObj.MrIdTypeCode = this.CustomerContactForm.controls["MrIdTypeCode"].value;
    this.custPersonalContactPersonObj.IdNo = this.CustomerContactForm.controls["IdNo"].value;
    this.custPersonalContactPersonObj.IdExpiredDt = this.CustomerContactForm.controls["IdExpiredDt"].value;
    this.custPersonalContactPersonObj.MrGenderCode = this.CustomerContactForm.controls["MrGenderCode"].value;
    this.custPersonalContactPersonObj.BirthPlace = this.CustomerContactForm.controls["BirthPlace"].value;
    this.custPersonalContactPersonObj.BirthDt = this.CustomerContactForm.controls["BirthDt"].value;
    this.custPersonalContactPersonObj.MrCustRelationshipCode = this.CustomerContactForm.controls["MrCustRelationshipCode"].value;
    // this.custPersonalContactPersonObj.IsFamily = this.CustomerContactForm.controls["IsFamily"].value;
    // this.custPersonalContactPersonObj.IsEmergencyContact = this.CustomerContactForm.controls["IsEmergencyContact"].value;
    this.custPersonalContactPersonObj.MobilePhnNo1 = this.CustomerContactForm.controls["MobilePhnNo1"].value;
    this.custPersonalContactPersonObj.MobilePhnNo2 = this.CustomerContactForm.controls["MobilePhnNo2"].value;
    this.custPersonalContactPersonObj.Email = this.CustomerContactForm.controls["Email"].value;
    this.custPersonalContactPersonObj.Addr = this.CustomerContactForm.value.UcAddress.Addr;
    this.custPersonalContactPersonObj.AreaCode1 = this.CustomerContactForm.value.UcAddress.AreaCode1;
    this.custPersonalContactPersonObj.AreaCode2 = this.CustomerContactForm.value.UcAddress.AreaCode2;
    this.custPersonalContactPersonObj.AreaCode3 = this.CustomerContactForm.value.UcAddress.AreaCode3;
    this.custPersonalContactPersonObj.AreaCode4 = this.CustomerContactForm.value.UcAddress.AreaCode4;
    this.custPersonalContactPersonObj.City = this.CustomerContactForm.value.UcAddress.City;
    this.custPersonalContactPersonObj.Zipcode = this.CustomerContactForm.value.UcAddressZipcode.value;
    this.custPersonalContactPersonObj["Phn1"] = this.CustomerContactForm.value.UcAddress.Phn1;
    this.custPersonalContactPersonObj["PhnArea1"] = this.CustomerContactForm.value.UcAddress.PhnArea1;
    this.custPersonalContactPersonObj["PhnExt1"] = this.CustomerContactForm.value.UcAddress.PhnExt1;
    this.custPersonalContactPersonObj["Phn2"] = this.CustomerContactForm.value.UcAddress.Phn2;
    this.custPersonalContactPersonObj["PhnArea2"] = this.CustomerContactForm.value.UcAddress.PhnArea2;
    this.custPersonalContactPersonObj["PhnExt2"] = this.CustomerContactForm.value.UcAddress.PhnExt2;
    this.custPersonalContactPersonObj["Phn3"] = this.CustomerContactForm.value.UcAddress.Phn3;
    this.custPersonalContactPersonObj["PhnArea3"] = this.CustomerContactForm.value.UcAddress.PhnArea3;
    this.custPersonalContactPersonObj["PhnExt3"] = this.CustomerContactForm.value.UcAddress.PhnExt3;
    this.custPersonalContactPersonObj.ContactPersonCustNo = this.CustomerContactForm.controls["ContactPersonCustNo"].value;
    if (this.tempCust != null) {
      this.custPersonalContactPersonObj.ContactPersonCustNo = this.tempCust.CustNo;
    }


    if (this.tempCustPersonalContactPerson && this.tempCustPersonalContactPerson.CustPersonalContactPersonId > 0) {

      this.custPersonalContactPersonObj.CustPersonalContactPersonId = this.tempCustPersonalContactPerson.CustPersonalContactPersonId;

      this.custPersonalContactPersonObj.RowVersion = this.tempCustPersonalContactPerson.RowVersion;
      await this.http.post(this.UrlConstantNew.EditCustPersonalEmergencyContact, this.custPersonalContactPersonObj, AdInsConstant.SpinnerOptions).toPromise().then(
        response => {
          this.toastr.successMessage(response["Message"]);
          // this.wizard.goToNextStep();
          this.isAdd = false;
          // this.outputTab.emit({ isAdd: this.isAdd });
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    } else {
      await this.http.post(this.UrlConstantNew.AddCustPersonalEmergencyContact, this.custPersonalContactPersonObj, AdInsConstant.SpinnerOptions).toPromise().then(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.isAdd = false;
          // this.outputTab.emit({ isAdd: this.isAdd });
          // this.wizard.goToNextStep();
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );

    }
    return true;
  }

  getLookUpCustomer(event) {
    this.tempCustId = event.CustId;
    var datePipe = new DatePipe("en-US");
    this.custObj = new CustObj();
    this.custPersonalObj = new CustPersonalObj();
    this.custObj.CustId = this.tempCustId;
    this.custPersonalObj.CustId = this.tempCustId;
    this.http.post(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.tempCustId }).subscribe(
      (response) => {
        this.tempCustPersonal = response;
        this.CustomerContactForm.patchValue({
          BirthPlace: this.tempCustPersonal.BirthPlace,
          BirthDt: datePipe.transform(this.tempCustPersonal.BirthDt, 'yyyy-MM-dd'),
          MobilePhnNo1: this.tempCustPersonal.MobilePhnNo1,
          MobilePhnNo2: this.tempCustPersonal.MobilePhnNo2,
          Email: this.tempCustPersonal.Email1,
          MrGenderCode: this.tempCustPersonal.MrGenderCode
        });
        this.setDisableForm(this.tempCustPersonal.MobilePhnNo1);
      }
      
    );
    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.custObj.CustId }).subscribe(
      (response) => {
        this.tempCust = response;
        this.CustomerContactForm.patchValue({
          MrIdTypeCode: this.tempCust.MrIdTypeCode,
          IdNo: this.tempCust.IdNo,
          IdExpiredDt: this.tempCust.IdExpiredDt != null? datePipe.transform(this.tempCust.IdExpiredDt, 'yyyy-MM-dd') : "",
        });
        this.setValidatorPattern();
      }
    );
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.tempCustId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response) => {
        this.tempCustAddress = response;
        this.UcAddressObj.AreaCode1 = this.tempCustAddress.AreaCode1;
        this.UcAddressObj.AreaCode2 = this.tempCustAddress.AreaCode2;
        this.UcAddressObj.AreaCode3 = this.tempCustAddress.AreaCode3;
        this.UcAddressObj.AreaCode4 = this.tempCustAddress.AreaCode4;
        this.UcAddressObj.Addr = this.tempCustAddress.Addr;
        this.UcAddressObj.City = this.tempCustAddress.City;
        this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddress.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddress.Zipcode };
      }
    );
  }

  onOptionIdTypeSelected(event : UcDropdownListCallbackObj) {
    let noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
    if (noExpDate.includes(event.selectedObj["Key"])) {
      this.CustomerContactForm.controls.IdExpiredDt.clearValidators();
      this.CustomerContactForm.patchValue({
        IdExpiredDt: ''
      })
      this.tempKTPCheck = true;
    } else {
      this.CustomerContactForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerContactForm.controls.IdExpiredDt.updateValueAndValidity();

    this.setValidatorPattern();
  }
  
  //START URS-LOS-041
  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj> = new Array<CustomPatternObj>();
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

  //   idTypeValue = this.CustomerContactForm.controls[this.controlNameIdType].value;

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
    idTypeValue = this.CustomerContactForm.controls[this.controlNameIdType].value;
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
      this.CustomerContactForm.controls[this.controlNameIdNo].setValidators(Validators.pattern(pattern));
      this.CustomerContactForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
  
  checkEmergencyCustContactPerson(){
    var isValid: boolean = true;

    let max17Yodt = new Date(this.BusinessDt);
    let birthDt = new Date(this.CustomerContactForm.controls["BirthDt"].value);
    let tempBusinessDt = new Date(this.BusinessDt);
    let idExpiredDt = new Date(this.CustomerContactForm.controls["IdExpiredDt"].value);
    max17Yodt.setFullYear(tempBusinessDt.getFullYear() - 17);

    if (birthDt > max17Yodt) {
      this.toastr.warningMessage(ExceptionConstant.CUSTOMER_AGE_MUST_17_YEARS_OLD);
      isValid = false;
    }

    if(birthDt > tempBusinessDt){
      this.toastr.warningMessage(ExceptionConstant.BIRTH_DATE_CANNOT_MORE_THAN_BUSINESS_DATE);
      isValid = false;
    }

    if(tempBusinessDt > idExpiredDt || tempBusinessDt.getDate() === idExpiredDt.getDate()){
      let checkIdType = this.CustomerContactForm.controls["MrIdTypeCode"].value;
      if(checkIdType == CommonConstant.MrIdTypeCodeEKTP || checkIdType == CommonConstant.MrIdTypeCodeNPWP || checkIdType == CommonConstant.MrIdTypeCodeAKTA){
        isValid = true;
      }
      else{
        this.toastr.warningMessage(ExceptionConstant.ID_EXPIRED_DATE_CANNOT_LESS_THAN + 'Equal Business Date');
        isValid = false;
      }
    }

    return isValid;
  }
  
  initDropdownListObj(){

    var refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      MappingCode: null
    };
    this.ddlIdType = new UcDropdownListObj(this.UrlConstantNew);
    this.ddlIdType.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.ddlIdType.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    this.ddlIdType.requestObj = refMasterObjMrIdTypeCode;
    this.ddlIdType.isObject = true;
    this.ddlIdType.customObjName = "ReturnObject";
    this.ddlIdType.isSelectOutput = true;

    var refMasterObjMrCustRelationshipCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship,
      MappingCode: null
    };
    this.ddlMrCustRelationshipCode = new UcDropdownListObj(this.UrlConstantNew);
    this.ddlMrCustRelationshipCode.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.ddlMrCustRelationshipCode.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    this.ddlMrCustRelationshipCode.requestObj = refMasterObjMrCustRelationshipCode;
    this.ddlMrCustRelationshipCode.isObject = true;
    this.ddlMrCustRelationshipCode.customObjName = "ReturnObject";

    var refMasterObjMrGenderCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      MappingCode: null
    };
    this.ddlMrGenderCode = new UcDropdownListObj(this.UrlConstantNew);
    this.ddlMrGenderCode.apiPath = this.UrlConstantNew.GetListActiveRefMasterOrderSeqNoDDL;
    this.ddlMrGenderCode.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    this.ddlMrGenderCode.requestObj = refMasterObjMrGenderCode;
    this.ddlMrGenderCode.isObject = true;
    this.ddlMrGenderCode.customObjName = "ReturnObject";
  }

  setDisableForm(MobilePhone1 : string){

    if(MobilePhone1 != null && MobilePhone1 != ""){
      this.CustomerContactForm.controls.MobilePhnNo1.disable();
      this.CustomerContactForm.controls.MobilePhnNo2.disable();
      this.CustomerContactForm.controls.Email.disable();
    }
    this.CustomerContactForm.controls.MrIdTypeCode.disable();
    this.CustomerContactForm.controls.IdExpiredDt.disable();
    this.CustomerContactForm.controls.IdNo.disable();
    this.CustomerContactForm.controls.BirthPlace.disable();
    this.CustomerContactForm.controls.BirthDt.disable();
    this.CustomerContactForm.controls.MrGenderCode.disable();
    this.inputAddressObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
  }

  onTypeName(ev : string){
    if(ev != ""){
      if(this.tempCustPersonalContactPerson.ContactPersonName != ev){
        this.CustomerContactForm.controls.MobilePhnNo1.enable();
        this.CustomerContactForm.controls.MobilePhnNo2.enable();
        this.CustomerContactForm.controls.Email.enable();
        this.CustomerContactForm.controls.MrIdTypeCode.enable();
        this.CustomerContactForm.controls.IdExpiredDt.enable();
        this.CustomerContactForm.controls.IdNo.enable();
        this.CustomerContactForm.controls.BirthPlace.enable();
        this.CustomerContactForm.controls.BirthDt.enable();
        this.CustomerContactForm.controls.MrGenderCode.enable();

        this.CustomerContactForm.patchValue({
          MrIdTypeCode: "",
          IdNo: "",
          IdExpiredDt: "",
          BirthPlace: "",
          BirthDt: "",
          MobilePhnNo1: "",
          MobilePhnNo2: "",
          Email: "",
          MrCustRelationshipCode: "",
          MrGenderCode: "",
          ContactPersonCustNo: "" 
        });

      
        this.inputFieldObj = new InputFieldObj(this.UrlConstantNew);
        this.inputFieldObj.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
        this.inputFieldObj.inputLookupObj.isRequired = false;
        this.inputFieldObj.inputLookupObj.isReadonly = false;

        this.inputAddressObj = new InputAddressObj(this.UrlConstantNew);
        this.inputAddressObj.showSubsection = false;
        this.inputAddressObj.title = "Customer Address";
        this.inputAddressObj.default = new UcAddressObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
        this.inputAddressObj.showAllPhn = true;
        this.inputAddressObj.showFax = false;
        this.inputAddressObj.isRequired = false;
      }
    }
  }
}
