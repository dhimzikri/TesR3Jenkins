import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RegexService } from 'app/customer/regex.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UpdateCustEmergencyObj } from 'app/shared/model/update-master-cust/update-cust-emergency-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-custom-update-customer-emergency',
  templateUrl: './custom-update-customer-emergency.component.html',
})

export class CustomUpdateCustomerEmergencyComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  AppEmergencyData: UpdateCustEmergencyObj;
  MasterCustEmergencyData: UpdateCustEmergencyObj;
  lookupObj: Record<string, any>;
  DisplayName: Record<string, any>;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  IsAddressDifferent: boolean;
  resultPattern: any;
  appCustRelationship: string;
  appIdType: string;
  appGender: string;
  MaxDate: Date;
  businessDtMin: Date;
  ddlMrCustRelationshipCode: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  ddlIdType: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  ddlGender: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);
  customPattern: Array<CustomPatternObj> = new Array<CustomPatternObj>();
  GenderList: Array<any> = new Array<any>();
  CustRelationList: Array<any> = new Array<any>();
  IdTypeList: Array<any> = new Array<any>();

  CustomerEmergencyForm = this.fb.group({
    CustEmergencyId: [0],
    CustId: [0],
    CustName: ['', [Validators.required]],
    CustRelation: ['', [Validators.required]],
    IdType: [''],
    IdNo: [''],
    IdExpiredDt: [''],
    BirthPlace: [''],
    BirthDate: [''],
    Gender: ['', [Validators.required]],
    Email: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    MobilePhn1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhn2: ['', [Validators.pattern("^[0-9]+$")]],
    Address: [''],
    Zipcode: [''],
    AreaCode1: [''],
    AreaCode2: [''],
    AreaCode3: ['', [Validators.pattern("^[0-9]+$")]],
    AreaCode4: ['', [Validators.pattern("^[0-9]+$")]],
    City: [''],
    RowVersion: ['']
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private regexService: RegexService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.IsAddressDifferent = false;
    this.ResponseTab = new EventEmitter<any>();
    this.AppEmergencyData = new UpdateCustEmergencyObj();
    this.lookupObj = {
      Zipcode: new InputLookupObj(this.UrlConstantNew)
    };
    this.DisplayName = {
      Zipcode: ""
    };

    this.lookupObj["Zipcode"].urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupObj["Zipcode"].pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupObj["Zipcode"].genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

  ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.MaxDate = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);

    this.initDropdownListObj();
    this.getInitPattern();
    var datePipe = new DatePipe("en-US");
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    let getDetail = this.http.post(this.UrlConstantNew.GetCustEmergencyDataForUpdateMasterCustEmergency, this.ReqCustDataTrxIdObj);
    let tempReqCustRelation: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustPersonalRelationship, MappingCode: null };
    let getCustRelationship = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqCustRelation);
    let tempReqIdType: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType, MappingCode: null };
    let getIdType = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqIdType);
    let tempReqGender: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender, MappingCode: null };
    let getGender = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqGender);
    forkJoin([getDetail, getCustRelationship, getIdType, getGender]).pipe(
      map((response) => {
        this.AppEmergencyData = response[0]["AppCustEmergency"];
        console.log(this.AppEmergencyData);
        this.MasterCustEmergencyData = response[0]["MasterCustEmergency"];
        console.log(this.MasterCustEmergencyData);
        this.CustRelationList = response[1][CommonConstant.ReturnObj];
        this.IdTypeList = response[2][CommonConstant.ReturnObj];
        this.GenderList = response[3][CommonConstant.ReturnObj];
        if (response[0]["MasterCustEmergency"]["BirthDate"]) {
          response[0]["MasterCustEmergency"]["BirthDate"] = datePipe.transform(response[0]["MasterCustEmergency"]["BirthDate"], 'yyyy-MM-dd');
        }
        if (response[0]["MasterCustEmergency"]["IdExpiredDt"]) {
          response[0]["MasterCustEmergency"]["IdExpiredDt"] = datePipe.transform(response[0]["MasterCustEmergency"]["IdExpiredDt"], 'yyyy-MM-dd');
        }
        if (this.AppEmergencyData["BirthDate"]) {
          this.AppEmergencyData["BirthDate"] = datePipe.transform(this.AppEmergencyData["BirthDate"], 'yyyy-MM-dd');
        }
        if (this.AppEmergencyData["IdExpiredDt"]) {
          this.AppEmergencyData["IdExpiredDt"] = datePipe.transform(this.AppEmergencyData["IdExpiredDt"], 'yyyy-MM-dd');
        }
        this.CustomerEmergencyForm.patchValue({
          CustId: this.MasterCustEmergencyData.CustId,
          CustName: this.MasterCustEmergencyData.CustName,
          CustRelation: this.MasterCustEmergencyData.CustRelation,
          IdType: this.MasterCustEmergencyData.IdType,
          IdNo: this.MasterCustEmergencyData.IdNo,
          IdExpiredDt: this.MasterCustEmergencyData.IdExpiredDt,
          BirthPlace: this.MasterCustEmergencyData.BirthPlace,
          BirthDate: this.MasterCustEmergencyData.BirthDate,
          Gender: this.MasterCustEmergencyData.Gender,
          Email: this.MasterCustEmergencyData.Email,
          MobilePhn1: this.MasterCustEmergencyData.MobilePhn1,
          MobilePhn2: this.MasterCustEmergencyData.MobilePhn2,
          Address: this.MasterCustEmergencyData.Address,
          AreaCode4: this.MasterCustEmergencyData.AreaCode4,
          AreaCode3: this.MasterCustEmergencyData.AreaCode3,
          AreaCode2: this.MasterCustEmergencyData.AreaCode2,
          AreaCode1: this.MasterCustEmergencyData.AreaCode1,
          City: this.MasterCustEmergencyData.City,
          Zipcode: this.MasterCustEmergencyData.Zipcode,
          RowVersion: this.MasterCustEmergencyData.RowVersion
        });
        this.DisplayName["Zipcode"] = this.AppEmergencyData["Zipcode"];
        if (response[0]["MasterCustEmergency"]["Address"] != response[0]["AppCustEmergency"]["Address"] ||
          response[0]["MasterCustEmergency"]["AreaCode1"] != response[0]["AppCustEmergency"]["AreaCode1"] ||
          response[0]["MasterCustEmergency"]["AreaCode2"] != response[0]["AppCustEmergency"]["AreaCode2"] ||
          response[0]["MasterCustEmergency"]["AreaCode3"] != response[0]["AppCustEmergency"]["AreaCode3"] ||
          response[0]["MasterCustEmergency"]["AreaCode4"] != response[0]["AppCustEmergency"]["AreaCode4"] ||
          response[0]["MasterCustEmergency"]["Zipcode"] != response[0]["AppCustEmergency"]["Zipcode"] ||
          response[0]["MasterCustEmergency"]["City"] != response[0]["AppCustEmergency"]["City"]) {
          this.IsAddressDifferent = true;
        }
        this.setValidatorPattern();
        return response[0];
      })
    ).toPromise().then(
      (response) => {
        this.lookupObj["Zipcode"]["nameSelect"] = this.CustomerEmergencyForm.controls["Zipcode"].value;
        this.lookupObj["Zipcode"]["jsonSelect"] = { Zipcode: this.CustomerEmergencyForm.controls["Zipcode"].value };
        this.lookupObj["Zipcode"]["isReady"] = true;

        this.appCustRelationship = this.CustRelationList.find(x => x.Key == this.AppEmergencyData.CustRelation).Value;
        this.appIdType = this.IdTypeList.find(x => x.Key == this.AppEmergencyData.IdType).Value;
        this.appGender = this.GenderList.find(x => x.Key == this.AppEmergencyData.Gender).Value;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  CopyHandler(formControlName, lookupName) {
    if (formControlName == "Address") {
      this.CustomerEmergencyForm.patchValue({
        Address: this.AppEmergencyData["Address"],
        Zipcode: this.AppEmergencyData["Zipcode"],
        AreaCode1: this.AppEmergencyData["AreaCode1"],
        AreaCode2: this.AppEmergencyData["AreaCode2"],
        AreaCode3: this.AppEmergencyData["AreaCode3"],
        AreaCode4: this.AppEmergencyData["AreaCode4"],
        City: this.AppEmergencyData["City"]
      });
      this.CustomerEmergencyForm.get("ZipcodeLookup").patchValue({
        value: this.DisplayName["Zipcode"]
      });
      this.IsAddressDifferent = false;
    }
    else {
      var obj = new Object();
      obj[formControlName] = this.AppEmergencyData[formControlName];
      this.CustomerEmergencyForm.patchValue(obj);

      if(formControlName == 'IdType' || formControlName == 'IdNo'){
        this.setValidatorPattern();
      }

      if (lookupName) {
        this.lookupObj[lookupName]["isReady"] = false;
        this.lookupObj[lookupName]["nameSelect"] = this.DisplayName[formControlName];
        this.lookupObj[lookupName]["isReady"] = true;
        this.CustomerEmergencyForm.get(lookupName + "Lookup").patchValue({
          value: this.DisplayName[formControlName]
        });
      }
    }
  }

  CopyAllHandler() {
    var obj = new Object();
    for (const key in this.AppEmergencyData) {
      if (key == "CustEmergencyId" || key == "CustId" || key == "RowVersion") {
        continue;
      }
      else {
        // if(this.AppEmergencyData[key]){
        obj[key] = this.AppEmergencyData[key];
        // }
      }
    }
    this.CustomerEmergencyForm.patchValue(obj);
    this.lookupObj["Zipcode"]["isReady"] = false;
    this.lookupObj["Zipcode"]["nameSelect"] = this.DisplayName["Zipcode"];
    this.lookupObj["Zipcode"]["isReady"] = true;
    this.CustomerEmergencyForm.get("ZipcodeLookup").patchValue({
      value: this.DisplayName["Zipcode"]
    });
    this.IsAddressDifferent = false;
  }

  AddressCopyButtonHandler() {
    var masterCustForm = this.CustomerEmergencyForm.value;
    if (masterCustForm["Address"] != this.AppEmergencyData["Address"] ||
      masterCustForm["AreaCode1"] != this.AppEmergencyData["AreaCode1"] ||
      masterCustForm["AreaCode2"] != this.AppEmergencyData["AreaCode2"] ||
      masterCustForm["AreaCode3"] != this.AppEmergencyData["AreaCode3"] ||
      masterCustForm["AreaCode4"] != this.AppEmergencyData["AreaCode4"] ||
      masterCustForm["Zipcode"] != this.AppEmergencyData["Zipcode"] ||
      masterCustForm["City"] != this.AppEmergencyData["City"]) {
      this.IsAddressDifferent = true;
    }
    else {
      this.IsAddressDifferent = false;
    }
  }


  getZipcodeData(e) {
    this.CustomerEmergencyForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }

  back() {
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue() {
    if(this.checkEmergencyContact() == false){
      return;
    }
    this.http.post(this.UrlConstantNew.UpdateMasterCustEmergency, this.CustomerEmergencyForm.value, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
        const actions = [
          {
            'result': {
              'type': 'function',
              'target': 'self',
              'alias': '',
              'methodName': 'NextStep',
              'params': []
            },
            'conditions': []
          }
        ];

        this.next.emit({Actions: actions});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  checkEmergencyContact(){
    var flag: boolean = true;

    let max17Yodt = new Date(this.MaxDate);
    let d1 = new Date(this.CustomerEmergencyForm.controls["BirthDate"].value);
    let d2 = new Date(this.MaxDate);
    max17Yodt.setFullYear(d2.getFullYear() - 17);

    if (d1 > max17Yodt) {
      this.toastr.warningMessage(ExceptionConstant.CUSTOMER_AGE_MUST_17_YEARS_OLD);
      flag = false;
    }

    if(d1 > d2){
      this.toastr.warningMessage(ExceptionConstant.BIRTH_DATE_CANNOT_MORE_THAN_BUSINESS_DATE);
      flag = false;
    }

    return flag;
  }

  initDropdownListObj(){

    var refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustPersonalRelationship,
      MappingCode: null
    };
    this.ddlMrCustRelationshipCode = new UcDropdownListObj(this.UrlConstantNew);
    this.ddlMrCustRelationshipCode.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.ddlMrCustRelationshipCode.ddlType = "one";
    this.ddlMrCustRelationshipCode.requestObj = refMasterObjMrIdTypeCode;
    this.ddlMrCustRelationshipCode.isObject = true;
    this.ddlMrCustRelationshipCode.customObjName = "ReturnObject";

    var refMasterObjIdType: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      MappingCode: null
    };
    this.ddlIdType = new UcDropdownListObj(this.UrlConstantNew);
    this.ddlIdType.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.ddlIdType.ddlType = "one";
    this.ddlIdType.requestObj = refMasterObjIdType;
    this.ddlIdType.isObject = true;
    this.ddlIdType.customObjName = "ReturnObject";
    this.ddlIdType.isSelectOutput = true;

    var refMasterObjGender: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      MappingCode: null
    };
    this.ddlGender = new UcDropdownListObj(this.UrlConstantNew);
    this.ddlGender.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.ddlGender.ddlType = "one";
    this.ddlGender.requestObj = refMasterObjGender;
    this.ddlGender.isObject = true;
    this.ddlGender.customObjName = "ReturnObject";
  }

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

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.CustomerEmergencyForm.controls["IdType"].value;
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
      this.CustomerEmergencyForm.controls["IdNo"].setValidators(Validators.pattern(pattern));
      this.CustomerEmergencyForm.controls["IdNo"].updateValueAndValidity();
    }
  }
}
