import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NegativeCustObj } from 'app/shared/model/negative-cust-obj.model';
import { NegativeCustChangeTrxObj } from 'app/shared/model/negative-cust-change-trx-obj.model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-negative-customer-detail',
  templateUrl: './negative-customer-detail.component.html',
  styleUrls: [],
  providers: [ RegexService]
})
export class NegativeCustomerDetailComponent implements OnInit {
  pageType: string = "add";
  negativeCustId: number;
  refMasterIdType: any;
  negativeTypeList: any;
  negativeSourceList: any;
  inputLookupCustPersonalObj: InputLookupObj;
  inputLookupCustCompanyObj: InputLookupObj;
  inputLookupZipcodeObj: InputLookupObj;
  custType: string = CommonConstant.CustTypePersonal;
  custNo: string = "";
  zipcode: string = "";
  negativeDataHistoryList: any;
  isFromLookup: boolean = false;
  businessDate: any;
  businessDateIdExp: any;
  tempKTPCheck: boolean;
  TempCustType: any;
  TempGender: any;
  NegativeCustForm = this.fb.group({
    NegativeCustId: [0, [Validators.required]],
    CustId: [0],
    MrCustTypeCode: [CommonConstant.CustTypePersonal, [Validators.required]],
    CustNo: [''],
    CustName: ['', [Validators.required, Validators.maxLength(500)]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    IdExpiredDt: [''],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', Validators.required],
    MrGenderCode: [''],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(500)]],
    LegalAddr: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required]],
    AreaCode4: ['', [Validators.required]],
    City: ['', [Validators.required]],
    PhnArea1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Phn1: ['', [Validators.required, Validators.pattern]],
    PhnExt1: ['', [Validators.pattern("^[0-9]+$")]],
    PhnArea2: ['', [Validators.pattern("^[0-9]+$")]],
    Phn2: ['', [Validators.pattern("^[0-9]+$")]],
    PhnExt2: ['', [Validators.pattern("^[0-9]+$")]],
    PhnArea3: ['', [Validators.pattern("^[0-9]+$")]],
    Phn3: ['', [Validators.pattern("^[0-9]+$")]],
    PhnExt3: ['', [Validators.pattern("^[0-9]+$")]],
    FaxArea: ['', [Validators.pattern("^[0-9]+$")]],
    Fax: ['', [Validators.pattern("^[0-9]+$")]],
    MobilePhn: ['', [Validators.pattern("^[0-9]+$")]],
    MrNegCustTypeCode: ['', [Validators.required]],
    MrNegCustSourceCode: ['', [Validators.required]],
    NegCustCause: [''],
    Notes: [''],
    IsActive: [true],
    RowVersion: ['']
  });

  constructor(
    private regexService: RegexService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['param'] != null) {
        this.pageType = queryParams['param'];
      }
      if (queryParams['negativeCustId'] != null) {
        this.negativeCustId = queryParams['negativeCustId'];
      }
    });

    var refMasterIdTypeObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterIdTypeObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdType;
    var refMasterNegativeCustTypeObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterNegativeCustTypeObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeNegCustType;
    var refMasterNegativeSourceObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterNegativeSourceObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeNegCustSource;
    let requestIdType = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterIdTypeObj);
    let requestNegativeCustType = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterNegativeCustTypeObj);
    let requestNegativeSource = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterNegativeSourceObj);
    forkJoin([requestIdType, requestNegativeCustType, requestNegativeSource]).subscribe(
      (response) => {
        if (response[0][CommonConstant.ReturnObj].length > 0) {
          this.refMasterIdType = response[0];
          this.NegativeCustForm.patchValue({
            MrIdTypeCode: this.refMasterIdType.ReturnObject[0].Key
          });
          this.onChangeIdType();
          this.getInitPattern();
        }
        if (response[1][CommonConstant.ReturnObj].length > 0) {
          this.negativeTypeList = response[1];
          this.NegativeCustForm.patchValue({
            MrNegCustTypeCode: this.negativeTypeList.ReturnObject[0].Key
          });
        }
        if (response[2][CommonConstant.ReturnObj].length > 0) {
          this.negativeSourceList = response[2];
          this.NegativeCustForm.patchValue({
            MrNegCustSourceCode: this.negativeSourceList.ReturnObject[0].Key
          });
        }
        if (this.pageType == "edit") {
          if (this.custType == CommonConstant.CustomerPersonal && this.refMasterIdType.ReturnObject[0].Key == RefMasterConstant.EKtp) {
            this.tempKTPCheck = true;
            this.NegativeCustForm.controls.IdExpiredDt.clearValidators();
            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          } else if (this.custType == CommonConstant.CustomerPersonal) {
            this.tempKTPCheck = false;
            this.NegativeCustForm.controls.IdExpiredDt.setValidators(Validators.required);
            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          }
          else {
            this.tempKTPCheck = true;
            this.NegativeCustForm.removeControl('MrIdTypeCode');
            this.NegativeCustForm.removeControl('IdNo');
            this.NegativeCustForm.removeControl('BirthPlace');
            this.NegativeCustForm.removeControl('BirthDt');
            this.NegativeCustForm.removeControl('MotherMaidenName');
            this.NegativeCustForm.removeControl('PersonalLookup');
            this.NegativeCustForm.removeControl('PersonalLookup');
          }
          this.NegativeCustForm.controls.IdExpiredDt.updateValueAndValidity();
        }
      }
    );
  }

  ngOnInit() {
    this.customPattern = new Array<CustomPatternObj>();
    var datePipe = new DatePipe("en-US");
    var criteriaList;
    var criteriaObj;
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDate = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDate.setDate(this.businessDate.getDate() - 1);
    this.businessDateIdExp = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDateIdExp.setDate(this.businessDateIdExp.getDate() + 1);

    this.inputLookupZipcodeObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.inputLookupCustPersonalObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupCustPersonalObj.urlJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Personal.json";
    this.inputLookupCustPersonalObj.pagingJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Personal.json";
    this.inputLookupCustPersonalObj.genericJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Personal.json";
    criteriaList = new Array();
    criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'A.MR_CUST_TYPE_CODE';
    criteriaObj.value = CommonConstant.CustTypePersonal;
    criteriaList.push(criteriaObj);
    this.inputLookupCustPersonalObj.addCritInput = criteriaList;
    this.inputLookupCustPersonalObj.isRequired = false;

    this.inputLookupCustCompanyObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupCustCompanyObj.urlJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Company.json";
    this.inputLookupCustCompanyObj.pagingJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Company.json";
    this.inputLookupCustCompanyObj.genericJson = "./assets/uclookup/Customer/NegativeCustomer/lookupCust_NegCust_Company.json";
    criteriaList = new Array();
    criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'A.MR_CUST_TYPE_CODE';
    criteriaObj.value = CommonConstant.CustTypeCompany;
    criteriaList.push(criteriaObj);
    this.inputLookupCustCompanyObj.addCritInput = criteriaList;
    this.inputLookupCustCompanyObj.isRequired = false;

    var RefMasterTypeCodeCustType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustType
    }
    var RefMasterTypeCodeGender = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender
    }
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterTypeCodeCustType).subscribe(
      (response) => {
        this.TempCustType = response[CommonConstant.ReturnObj];
      });


    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterTypeCodeGender).subscribe(
      (response) => {
        this.TempGender = response[CommonConstant.ReturnObj];
        if (this.TempGender.length > 0) {
          this.NegativeCustForm.patchValue({ MrGenderCode: response[CommonConstant.ReturnObj][0]['Key'] });
        }
      });



    if (this.pageType == "edit") {
      var negativeCustObj = new NegativeCustObj();
      negativeCustObj.NegativeCustId = this.negativeCustId;
      this.http.post(this.UrlConstantNew.GetNegativeCustByNegativeCustId, { Id: this.negativeCustId }).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response: any) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = response.NegativeCustId;
          const negativeCustChangeTrx = this.http.post(this.UrlConstantNew.GetListNegativeCustChangeTrxByNegativeCustId, { Id: response.NegativeCustId });
          var tempResponse = [response];
          return forkJoin([tempResponse, negativeCustChangeTrx]);
        })
      ).subscribe(
        (response: any) => {
          var negativeCustData = response[0];
          var expiredDt = datePipe.transform(negativeCustData.IdExpiredDt, 'yyyy-MM-dd');
          var birthDt = datePipe.transform(negativeCustData.BirthDt, 'yyyy-MM-dd');
          this.custNo = negativeCustData.CustNo;
          this.zipcode = negativeCustData.Zipcode;
          this.custType = negativeCustData.MrCustTypeCode.toUpperCase();
          this.NegativeCustForm.patchValue({
            NegativeCustId: negativeCustData.NegativeCustId,
            CustId: negativeCustData.CustId,
            MrCustTypeCode: negativeCustData.MrCustTypeCode.toUpperCase(),
            CustNo: negativeCustData.CustNo,
            CustName: negativeCustData.CustName,
            MrIdTypeCode: negativeCustData.MrIdTypeCode,
            IdNo: negativeCustData.IdNo,
            IdExpiredDt: expiredDt,
            TaxIdNo: negativeCustData.TaxIdNo,
            BirthPlace: negativeCustData.BirthPlace,
            BirthDt: birthDt,
            MrGenderCode: negativeCustData.MrGenderCode,
            MotherMaidenName: negativeCustData.MotherMaidenName,
            LegalAddr: negativeCustData.LegalAddr,
            AreaCode1: negativeCustData.AreaCode1,
            AreaCode2: negativeCustData.AreaCode2,
            AreaCode3: negativeCustData.AreaCode3,
            AreaCode4: negativeCustData.AreaCode4,
            Zipcode: negativeCustData.Zipcode,
            City: negativeCustData.City,
            PhnArea1: negativeCustData.PhnArea1,
            Phn1: negativeCustData.Phn1,
            PhnExt1: negativeCustData.PhnExt1,
            PhnArea2: negativeCustData.PhnArea2,
            Phn2: negativeCustData.Phn2,
            PhnExt2: negativeCustData.PhnExt2,
            PhnArea3: negativeCustData.PhnArea3,
            Phn3: negativeCustData.Phn3,
            PhnExt3: negativeCustData.PhnExt3,
            FaxArea: negativeCustData.FaxArea,
            Fax: negativeCustData.Fax,
            MobilePhn: negativeCustData.MobilePhn,
            MrNegCustTypeCode: negativeCustData.MrNegCustTypeCode.toUpperCase(),
            MrNegCustSourceCode: negativeCustData.MrNegCustSourceCode.toUpperCase(),
            NegCustCause: negativeCustData.NegCustCause,
            Notes: negativeCustData.Notes,
            IsActive: negativeCustData.IsActive,
            RowVersion: negativeCustData.RowVersion
          });
          if (this.custType == CommonConstant.CustomerPersonal) {
            this.onChangeIdType();
            if (this.NegativeCustForm.controls.MrIdTypeCode.value == RefMasterConstant.EKtp) {
              this.tempKTPCheck = true;
              this.NegativeCustForm.controls.IdExpiredDt.clearValidators();
            }
            else {
              this.tempKTPCheck = false;
              this.NegativeCustForm.controls.IdExpiredDt.setValidators(Validators.required);
            }

            this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
            this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
            this.NegativeCustForm.removeControl('CompanyLookup');
          }
          else {
            this.tempKTPCheck = true;
            this.NegativeCustForm.removeControl('MrIdTypeCode');
            this.NegativeCustForm.removeControl('IdNo');
            this.NegativeCustForm.removeControl('BirthPlace');
            this.NegativeCustForm.removeControl('BirthDt');
            this.NegativeCustForm.removeControl('MotherMaidenName');
            this.NegativeCustForm.removeControl('PersonalLookup');
            this.NegativeCustForm.removeControl('PersonalLookup');
            this.NegativeCustForm.removeControl('CustId');
          }

          if (this.NegativeCustForm.controls.MrIdTypeCode != undefined && this.NegativeCustForm.controls.MrIdTypeCode.value == null && this.NegativeCustForm.controls.MrIdTypeCode.value == undefined) {
            this.NegativeCustForm.removeControl('CustId');
          }

          this.NegativeCustForm.controls.IdExpiredDt.updateValueAndValidity();
          this.negativeDataHistoryList = response[1].ReturnObject;

          if (this.NegativeCustForm.controls.MrCustTypeCode.value == '' || this.NegativeCustForm.controls.MrCustTypeCode.value == null)
            this.NegativeCustForm.controls.MrCustTypeCode.enable();
          if (this.NegativeCustForm.controls.CustName.value == '' || this.NegativeCustForm.controls.CustName.value == null)
            this.NegativeCustForm.controls.CustName.enable();

          if (this.custType.toUpperCase() == CommonConstant.CustomerPersonal.toUpperCase()) {
            if (this.NegativeCustForm.controls.MrIdTypeCode.value == '' || this.NegativeCustForm.controls.MrIdTypeCode.value == null) {
              this.NegativeCustForm.controls.MrIdTypeCode.enable();
              this.NegativeCustForm.controls.IdExpiredDt.enable();
            }
            else {
              if (this.NegativeCustForm.controls.MrIdTypeCode.value == RefMasterConstant.EKtp) {
                if (this.NegativeCustForm.controls.IdExpiredDt.value == '' || this.NegativeCustForm.controls.IdExpiredDt.value == null)
                  this.NegativeCustForm.controls.IdExpiredDt.disable();
              }
            }

            if (this.NegativeCustForm.controls.IdNo.value == '' || this.NegativeCustForm.controls.IdNo.value == null)
              this.NegativeCustForm.controls.IdNo.enable();
            if (this.NegativeCustForm.controls.BirthPlace.value == '' || this.NegativeCustForm.controls.BirthPlace.value == null)
              this.NegativeCustForm.controls.BirthPlace.enable();
            if (this.NegativeCustForm.controls.BirthDt.value == '' || this.NegativeCustForm.controls.BirthPlace.value == null)
              this.NegativeCustForm.controls.BirthPlace.enable();
            if (this.NegativeCustForm.controls.MrGenderCode.value == '' || this.NegativeCustForm.controls.MrGenderCode.value == null)
              this.NegativeCustForm.controls.MrGenderCode.enable();
            if (this.NegativeCustForm.controls.MotherMaidenName.value == '' || this.NegativeCustForm.controls.MotherMaidenName.value == null)
              this.NegativeCustForm.controls.MotherMaidenName.enable();
          }
          else if (this.custType.toUpperCase() == CommonConstant.CustomerCompany.toUpperCase()) {
            if (this.NegativeCustForm.controls.IdExpiredDt.value == '' || this.NegativeCustForm.controls.IdExpiredDt.value == null)
              this.NegativeCustForm.controls.IdExpiredDt.disable();
          }

          if (this.NegativeCustForm.controls.TaxIdNo.value == '' || this.NegativeCustForm.controls.TaxIdNo.value == null)
            this.NegativeCustForm.controls.TaxIdNo.enable();
          if (this.NegativeCustForm.controls.LegalAddr.value == '' || this.NegativeCustForm.controls.LegalAddr.value == null)
            this.NegativeCustForm.controls.LegalAddr.enable();
          if (this.NegativeCustForm.controls.AreaCode1.value == '' || this.NegativeCustForm.controls.AreaCode1.value == null)
            this.NegativeCustForm.controls.AreaCode1.enable();
          if (this.NegativeCustForm.controls.AreaCode2.value == '' || this.NegativeCustForm.controls.AreaCode2.value == null)
            this.NegativeCustForm.controls.AreaCode2.enable();
          if (this.NegativeCustForm.controls.AreaCode3.value == '' || this.NegativeCustForm.controls.AreaCode3.value == null)
            this.NegativeCustForm.controls.AreaCode3.enable();
          if (this.NegativeCustForm.controls.AreaCode4.value == '' || this.NegativeCustForm.controls.AreaCode4.value == null)
            this.NegativeCustForm.controls.AreaCode4.enable();
          if (this.NegativeCustForm.controls.Zipcode.value == '' || this.NegativeCustForm.controls.Zipcode.value == null)
            this.NegativeCustForm.controls.Zipcode.enable();
          if (this.NegativeCustForm.controls.City.value == '' || this.NegativeCustForm.controls.City.value == null)
            this.NegativeCustForm.controls.City.enable();
          if (this.NegativeCustForm.controls.PhnArea1.value == '' || this.NegativeCustForm.controls.PhnArea1.value == null)
            this.NegativeCustForm.controls.PhnArea1.enable();
          if (this.NegativeCustForm.controls.Phn1.value == '' || this.NegativeCustForm.controls.Phn1.value == null)
            this.NegativeCustForm.controls.Phn1.enable();
          if (this.NegativeCustForm.controls.PhnExt1.value == '' || this.NegativeCustForm.controls.PhnExt1.value == null)
            this.NegativeCustForm.controls.PhnExt1.enable();
          if (this.NegativeCustForm.controls.PhnArea2.value == '' || this.NegativeCustForm.controls.PhnArea2.value == null)
            this.NegativeCustForm.controls.PhnArea2.enable();
          if (this.NegativeCustForm.controls.Phn2.value == '' || this.NegativeCustForm.controls.Phn2.value == null)
            this.NegativeCustForm.controls.Phn2.enable();
          if (this.NegativeCustForm.controls.PhnExt2.value == '' || this.NegativeCustForm.controls.PhnExt2.value == null)
            this.NegativeCustForm.controls.PhnExt2.enable();
          if (this.NegativeCustForm.controls.PhnArea3.value == '' || this.NegativeCustForm.controls.PhnArea3.value == null)
            this.NegativeCustForm.controls.PhnArea3.enable();
          if (this.NegativeCustForm.controls.Phn3.value == '' || this.NegativeCustForm.controls.Phn3.value == null)
            this.NegativeCustForm.controls.Phn3.enable();
          if (this.NegativeCustForm.controls.PhnExt3.value == '' || this.NegativeCustForm.controls.PhnExt3.value == null)
            this.NegativeCustForm.controls.PhnExt3.enable();
          if (this.NegativeCustForm.controls.FaxArea.value == '' || this.NegativeCustForm.controls.FaxArea.value == null)
            this.NegativeCustForm.controls.FaxArea.enable();
          if (this.NegativeCustForm.controls.Fax.value == '' || this.NegativeCustForm.controls.Fax.value == null)
            this.NegativeCustForm.controls.Fax.enable();
          if (this.NegativeCustForm.controls.MobilePhn.value == '' || this.NegativeCustForm.controls.MobilePhn.value == null)
            this.NegativeCustForm.controls.MobilePhn.enable();

          // if (this.NegativeCustForm.controls.MrNegCustTypeCode.value == '' || this.NegativeCustForm.controls.MrNegCustTypeCode.value == null)
          //   this.NegativeCustForm.controls.MrNegCustTypeCode.enable();
          // if (this.NegativeCustForm.controls.MrNegCustSourceCode.value == '' || this.NegativeCustForm.controls.MrNegCustSourceCode.value == null)
          //   this.NegativeCustForm.controls.MrNegCustSourceCode.enable();
          // if (this.NegativeCustForm.controls.NegCustCause.value == '' || this.NegativeCustForm.controls.NegCustCause.value == null)
          //   this.NegativeCustForm.controls.NegCustCause.enable();
          // if (this.NegativeCustForm.controls.Notes.value == '' || this.NegativeCustForm.controls.Notes.value == null)
          //   this.NegativeCustForm.controls.Notes.enable();
        }
      );
    }
  }

  Back(): void {
    // this.location.back();
    AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_NEG_PAGING], {});
  }

  custTypeHandler(e) {
    var selected = e.target.value;
    if (selected == CommonConstant.CustTypePersonal) {
      this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('IdNo', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('BirthPlace', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('BirthDt', new FormControl('', [Validators.required]));
      this.NegativeCustForm.addControl('MotherMaidenName', new FormControl('', [Validators.required]));
      this.NegativeCustForm.removeControl('CompanyLookup');
    }
    else if (selected == CommonConstant.CustTypeCompany) {
      this.NegativeCustForm.removeControl('MrIdTypeCode');
      this.NegativeCustForm.removeControl('IdNo');
      this.NegativeCustForm.removeControl('BirthPlace');
      this.NegativeCustForm.removeControl('BirthDt');
      this.NegativeCustForm.removeControl('MotherMaidenName');
      this.NegativeCustForm.removeControl('PersonalLookup');
    }

    this.inputLookupCustPersonalObj.nameSelect = "";
    this.inputLookupCustCompanyObj.nameSelect = "";
    this.custType = e.target.value;

    this.NegativeCustForm.reset();
    var refMasterIdTypeObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterIdTypeObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdType;
    var refMasterNegativeCustTypeObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterNegativeCustTypeObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeNegCustType;
    var refMasterNegativeSourceObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterNegativeSourceObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeNegCustSource;
    let requestIdType = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterIdTypeObj);
    let requestNegativeCustType = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterNegativeCustTypeObj);
    let requestNegativeSource = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterNegativeSourceObj);
    forkJoin([requestIdType, requestNegativeCustType, requestNegativeSource]).subscribe(
      (response) => {
        this.refMasterIdType = response[0];
        this.negativeTypeList = response[1];
        this.negativeSourceList = response[2];
        this.NegativeCustForm.patchValue({
          CustId: 0,
          IsActive: true,
          NegativeCustId: 0,
          MrCustTypeCode: selected,
          MrIdTypeCode: this.refMasterIdType.ReturnObject[0].Key,
          MrNegCustTypeCode: this.negativeTypeList.ReturnObject[0].Key,
          MrNegCustSourceCode: this.negativeSourceList.ReturnObject[0].Key,
          MrGenderCode: this.TempGender[0].Key
        });
        this.onChangeIdType();
      });
  }

  getLookupCustPersonalResponse(e) {
    var datePipe = new DatePipe("en-US");
    var expiredDt = datePipe.transform(e.idExpiredDate, 'yyyy-MM-dd');
    var birthDt = datePipe.transform(e.birthDate, 'yyyy-MM-dd');

    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = e.custId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: any) => {
        this.NegativeCustForm.patchValue({
          CustId: e.custId,
          CustNo: e.custNo,
          CustName: e.custName,
          MrIdTypeCode: e.idType,
          IdNo: e.idNo,
          IdExpiredDt: expiredDt,
          BirthPlace: e.birthPlace,
          BirthDt: birthDt,
          MotherMaidenName: e.motherMaidenName,
          TaxIdNo: e.taxIdNo,
          MrGenderCode: e.gender,
          LegalAddr: response.Addr,
          Zipcode: response.Zipcode,
          AreaCode1: response.AreaCode1,
          AreaCode2: response.AreaCode2,
          AreaCode3: response.AreaCode3,
          AreaCode4: response.AreaCode4,
          City: response.City,
          PhnArea1: response.PhnArea1,
          Phn1: response.Phn1,
          PhnExt1: response.PhnExt1,
          PhnArea2: response.PhnArea2,
          Phn2: response.Phn2,
          PhnExt2: response.PhnExt2,
          PhnArea3: response.PhnArea3,
          Phn3: response.Phn3,
          PhnExt3: response.PhnExt3,
          FaxArea: response.FaxArea,
          Fax: response.Fax,
          MobilePhn: e.mobilePhone
        });
        this.onChangeIdType();
        this.isFromLookup = true;
        this.inputLookupZipcodeObj.nameSelect = response.Zipcode;
      }
    );
  }

  getLookupCustCompanyResponse(e) {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = e.custId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    this.http.post(this.UrlConstantNew.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: any) => {
        this.NegativeCustForm.patchValue({
          CustId: e.custId,
          CustNo: e.custNo,
          CustName: e.custName,
          TaxIdNo: e.taxIdNo,
          LegalAddr: response.Addr,
          Zipcode: response.Zipcode,
          AreaCode1: response.AreaCode1,
          AreaCode2: response.AreaCode2,
          AreaCode3: response.AreaCode3,
          AreaCode4: response.AreaCode4,
          City: response.City,
          PhnArea1: response.PhnArea1,
          Phn1: response.Phn1,
          PhnExt1: response.PhnExt1,
          PhnArea2: response.PhnArea2,
          Phn2: response.Phn2,
          PhnExt2: response.PhnExt2,
          PhnArea3: response.PhnArea3,
          Phn3: response.Phn3,
          PhnExt3: response.PhnExt3,
          FaxArea: response.FaxArea,
          Fax: response.Fax,
        });
        this.isFromLookup = true;
        this.inputLookupZipcodeObj.nameSelect = response.Zipcode;
      }
    );
  }

  getLookupZipcodeResponse(e) {
    this.NegativeCustForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }


  onOptionsSelected(event) {
    if (event.target.value == RefMasterConstant.EKtp) {
      this.NegativeCustForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck = true;
    } else {
      this.NegativeCustForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.NegativeCustForm.controls.IdExpiredDt.updateValueAndValidity();
    this.onChangeIdType();
  }

  onChangeIdType() {
    let idType: string = this.NegativeCustForm.get("MrIdTypeCode").value;

    this.NegativeCustForm.get("IdNo").clearValidators();
    if (idType == CommonConstant.MrIdTypeCodeEKTP) {
      this.NegativeCustForm.get("IdNo").setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      this.NegativeCustForm.get("IdNo").setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
    }
    this.NegativeCustForm.get("IdNo").updateValueAndValidity();

    this.setValidatorPattern();
  }

  SaveForm() {
    if (this.NegativeCustForm.controls.MrCustTypeCode.value == CommonConstant.CustomerCompany) {
      this.NegativeCustForm.addControl('MrIdTypeCode', new FormControl('', []));
      this.NegativeCustForm.addControl('IdNo', new FormControl('', []));
      this.NegativeCustForm.patchValue({
        IdNo: this.NegativeCustForm.controls.TaxIdNo.value == undefined ? null : this.NegativeCustForm.controls.TaxIdNo.value,
        MrIdTypeCode: RefMasterConstant.Npwp
      })
    }

    var negativeCustFormData = this.NegativeCustForm.value;

    // This Code Is Temporary Due to Negative Customer Approval Is Not Ready At The Moment
    if (this.pageType == "add") {
      this.http.post(this.UrlConstantNew.AddNegativeCustomer, negativeCustFormData, AdInsConstant.SpinnerOptions).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response: GenericObj) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = response.Id;
          negativeCustChangeTrxObj.TrxNo = "DUMMY_TRX_NO";
          negativeCustChangeTrxObj.MrTrxStatCode = "EXE";
          negativeCustChangeTrxObj.MrNegCustTypeCode = negativeCustFormData.MrCustTypeCode;
          negativeCustChangeTrxObj.MrNegCustSourceCode = negativeCustFormData.MrNegCustSourceCode;
          negativeCustChangeTrxObj.NegCustCause = negativeCustFormData.NegCustCause;
          negativeCustChangeTrxObj.Notes = negativeCustFormData.Notes;
          negativeCustChangeTrxObj.RfaNo = "DUMMY_RFA";
          negativeCustChangeTrxObj.ReqDt = new Date();
          negativeCustChangeTrxObj.ApvDt = new Date();
          negativeCustChangeTrxObj.ExeDt = new Date();

          const addNegativeCustChangeTrx = this.http.post(this.UrlConstantNew.AddNegativeCustChangeTrx, negativeCustChangeTrxObj, AdInsConstant.SpinnerOptions);
          var tempResponse = [response];
          return forkJoin([tempResponse, addNegativeCustChangeTrx]);
        })
      ).subscribe(
        (response) => {
          var responseNegativeCust = response[0];
          this.toastr.successMessage(responseNegativeCust["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_NEG_PAGING], {});
        }
      );
    }
    else if (this.pageType == "edit") {
      this.http.post(this.UrlConstantNew.EditNegativeCustomer, negativeCustFormData, AdInsConstant.SpinnerOptions).pipe(
        map((response) => {
          return response;
        }),
        mergeMap((response) => {
          var negativeCustChangeTrxObj = new NegativeCustChangeTrxObj();
          negativeCustChangeTrxObj.NegativeCustId = negativeCustFormData.NegativeCustId;
          negativeCustChangeTrxObj.TrxNo = "DUMMY_TRX_NO";
          negativeCustChangeTrxObj.MrTrxStatCode = "EXE";
          negativeCustChangeTrxObj.MrNegCustTypeCode = negativeCustFormData.MrCustTypeCode;
          negativeCustChangeTrxObj.MrNegCustSourceCode = negativeCustFormData.MrNegCustSourceCode;
          negativeCustChangeTrxObj.NegCustCause = negativeCustFormData.NegCustCause;
          negativeCustChangeTrxObj.Notes = negativeCustFormData.Notes;
          negativeCustChangeTrxObj.RfaNo = "DUMMY_RFA";
          negativeCustChangeTrxObj.ReqDt = new Date();
          negativeCustChangeTrxObj.ApvDt = new Date();
          negativeCustChangeTrxObj.ExeDt = new Date();

          const addNegativeCustChangeTrx = this.http.post(this.UrlConstantNew.AddNegativeCustChangeTrx, negativeCustChangeTrxObj, AdInsConstant.SpinnerOptions);
          var tempResponse = [response];
          return forkJoin([tempResponse, addNegativeCustChangeTrx]);
        })
      ).subscribe(
        (response) => {
          var responseNegativeCust = response[0];
          this.toastr.successMessage(responseNegativeCust["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_NEG_PAGING], {});
        }
      );
    }
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
    idTypeValue = this.NegativeCustForm.controls[this.controlNameIdType].value;
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
      this.NegativeCustForm.controls[this.controlNameIdNo].setValidators([Validators.required, Validators.pattern(pattern)]);
      this.NegativeCustForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
}
