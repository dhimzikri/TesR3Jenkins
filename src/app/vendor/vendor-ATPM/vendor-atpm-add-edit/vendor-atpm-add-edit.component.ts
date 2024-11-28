import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { formatDate } from '@angular/common';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { VendorService } from '../../vendor.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { GenericObj} from 'app/shared/model/generic/generic-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { RegexService } from 'app/customer/regex.service';
import { HttpClient } from '@angular/common/http';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-atpm-add-edit',
  templateUrl: './vendor-atpm-add-edit.component.html'
})
export class VendorATPMAddEditComponent implements OnInit {
  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  itemAssignmentType: any;
  itemCalcMethodType: any;

  result: any;
  check: any;
  inputLookupParentObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  MrVendorCategoryCode: any;
  arrCrit: any;
  mode: string = "add";
  vendorATPMObj: any;
  VendorId: any;
  businessDt: Date;
  isHidden: boolean = true;
  RsvField: string;
  RefMasterTypeCode: string;
  VatForPersonal: boolean = false;

  constructor(private regexService: RegexService, private fb: FormBuilder, private router: Router, 
              private route: ActivatedRoute, private toastr: NGXToastrService, private vendorService: VendorService, 
              private cookieService: CookieService, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
              private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
      this.VendorId = queryParams['VendorId'];
      this.mode = queryParams['mode'];
    });
  }

  VendorForm = this.fb.group({
    MrVendorCategoryCode: [{ value: '', disabled: true }],
    VendorCode: ['', Validators.required],
    VendorName: ['', Validators.required],
    MrVendorTypeCode: ['', Validators.required],
    RegistrationNo: ['', Validators.required],
    LicenseNo: ['', Validators.required],
    MrIdTypeCode: [''],
    IdNo: [''],
    MobilePhnNo1: ['', Validators.pattern("^[0-9]+$")],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    VendorRating: [''],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
    VendorParentId: [''],
    ReservedField1: [''],
    ReservedField2: [''],
    MrTaxCalcMethodCode: ['', Validators.required],
    IsVat: [false, Validators.required],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]],
    TaxpayerName: [''],
    MrAddrTypeCode: [''],
    Addr: [''],
    AreaCode2: [{ value: '', disabled: true }], //kelurahan
    AreaCode1: [{ value: '', disabled: true }], //kecamatan
    AreaCode3: [''],
    AreaCode4: [''],
    City: [{ value: '', disabled: true }],
    Province: [{ value: '', disabled: true }],
    RowVersionVendor: [''],
    RowVersionVendorAddr: [''],
    IsNpwpExist: [false]
  });


  async ngOnInit() {
    this.GetGeneralSetting();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    this.getInitPattern();
    if (this.mode == "edit") {
      this.VendorForm.controls.VendorCode.disable();
      this.getData();
    } else {
      await this.setDropdown();
      this.setLookup();
      this.checkType();
    }

  }

  getData() {
    let GetVendorId: GenericObj = new GenericObj();
    GetVendorId.Id = this.VendorId;
    this.vendorService.GetVendorAndVendorAddrByVendorId(GetVendorId).subscribe(
      (response) => {
        this.result = response;
        this.setDropdown();
        this.VendorForm.patchValue({
          MrVendorCategoryCode: this.result.VendorObj.MrVendorCategoryCode,
          VendorCode: this.result.VendorObj.VendorCode,
          VendorName: this.result.VendorObj.VendorName,
          MrVendorTypeCode: this.result.VendorObj.MrVendorTypeCode,
          RegistrationNo: this.result.VendorObj.RegistrationNo,
          LicenseNo: this.result.VendorObj.LicenseNo,
          MrIdTypeCode: this.result.VendorObj.MrIdTypeCode,
          IdNo: this.result.VendorObj.IdNo,
          MobilePhnNo1: this.result.VendorObj.MobilePhnNo1,
          MobilePhnNo2: this.result.VendorObj.MobilePhnNo2,
          Email: this.result.VendorObj.Email,
          EstablishmentDt: formatDate(this.result.VendorObj['EstablishmentDt'], 'yyyy-MM-dd', 'en-US'),
          PartnershipDt: formatDate(this.result.VendorObj['PartnershipDt'], 'yyyy-MM-dd', 'en-US'),
          IsActive: this.result.VendorObj.IsActive,
          VendorParentId: this.result.VendorObj.VendorParentId,
          ReservedField1: this.result.VendorObj.ReservedField1,
          ReservedField2: this.result.VendorObj.ReservedField2,
          MrTaxCalcMethodCode: this.result.VendorObj.MrTaxCalcMethodCode,
          IsVat: this.result.VendorObj.IsVat,
          TaxIdNo: this.result.VendorObj.TaxIdNo,
          TaxpayerName: this.result.VendorObj.TaxpayerName,
          RowVersionVendor: this.result.VendorObj.RowVersion,
          MrAddrTypeCode: this.result.VendorObj.MrAddrTypeCode,
          Addr: this.result.VendorAddrObj.Addr,
          AreaCode2: this.result.VendorAddrObj.AreaCode2,
          AreaCode1: this.result.VendorAddrObj.AreaCode1,
          AreaCode3: this.result.VendorAddrObj.AreaCode3,
          AreaCode4: this.result.VendorAddrObj.AreaCode4,
          City: this.result.VendorAddrObj.City,
          Province: this.result.VendorAddrObj.Province,
          Zipcode: this.result.VendorAddrObj.Zipcode,
          RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist
        });

        this.setLookup();
        this.checkType();
      }
    );
  }

  async setDropdown() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorCategory,
      MappingCode: CommonConstant.ATPM
    }
    await this.vendorService.GetRefMasterListKeyValuePair(refMasterCategoryObj).toPromise().then(
      (response) => {
        this.itemCategoryType = response[CommonConstant.ReturnObj];
        if (this.itemCategoryType.length > 0) {
          this.VendorForm.patchValue({
            MrVendorCategoryCode: response[CommonConstant.ReturnObj][0].Key
          });
        }
      }
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorType,
    }
    await this.vendorService.GetRefMasterListKeyValuePair(refMasterTypeObj).toPromise().then(
      async (response) => {
        this.itemType = response[CommonConstant.ReturnObj];
        if (this.itemType.length > 0) {
          if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrVendorTypeCode: this.itemType[0].Key
            });
            if (this.itemType[0].Key == "C") {
              this.RsvField = CommonConstant.CustTypeCompany
            } else {
              this.RsvField = CommonConstant.CustTypePersonal
            }
          } else {
            if (this.VendorForm.controls.MrVendorTypeCode.value == "C") {
              this.RsvField = CommonConstant.CustTypeCompany
            } else {
              this.RsvField = CommonConstant.CustTypePersonal
            }
          }

          if (this.RsvField == CommonConstant.CustTypePersonal){
            this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendor
          }else if(this.RsvField == CommonConstant.CustTypeCompany){
            this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendorCompany            
          }
          this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: this.RefMasterTypeCode }).subscribe(
            (response) => {
              this.itemIdType = response[CommonConstant.ReturnObj];
              if (this.mode != "edit") {
                if (this.itemIdType.length > 0) {
                  this.VendorForm.patchValue({
                    MrIdTypeCode: this.itemIdType[0].Key
                  });
                }
              }
            }
          );
        }
      }
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaxCalcMethod,
    }
    await this.vendorService.GetRefMasterListKeyValuePair(refMasterCalcMethodObj).toPromise().then(
      (response) => {
        this.itemCalcMethodType = response[CommonConstant.ReturnObj];
        if (this.itemCalcMethodType.length > 0) {
          if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
            });
          }
        }
      }
    );
  }

  NpwpCheck(isGetData: boolean = false) {
    if (this.VendorForm.controls.IsNpwpExist.value == true) {
      this.isHidden = false;
      this.inputLookupZipcodeObj.isRequired = true;
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]);
      this.VendorForm.controls.TaxpayerName.setValidators(Validators.required);
    } else {
      this.inputLookupZipcodeObj.isRequired = false;
      if (!isGetData) this.VendorForm.controls['Zipcode']['controls'].value.updateValueAndValidity();
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(16)]);
      this.VendorForm.controls.TaxpayerName.clearValidators();
      this.isHidden = true;
    }
    this.VendorForm.controls.TaxIdNo.updateValueAndValidity();
    this.VendorForm.controls.TaxpayerName.updateValueAndValidity();
  }

  getLookupZipcode(event) {
    this.VendorForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
  }

  updateValueAndValidityForm() {
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  SaveForm() {
    if (Date.parse(this.VendorForm.controls.EstablishmentDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Establishment Date Must Be Lesser Than Business Date");
    }
    else if (Date.parse(this.VendorForm.controls.PartnershipDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Partnership Date Must Be Lesser Than Business Date");
    }
    else {
      this.vendorATPMObj = new VendorHoObj();
      this.vendorATPMObj.VendorObj = new VendorObj();
      this.vendorATPMObj.VendorAddrObj = new VendorAddrObj();

      this.vendorATPMObj.VendorObj.MrVendorCategoryCode = this.VendorForm.controls.MrVendorCategoryCode.value;
      this.vendorATPMObj.VendorObj.VendorCode = this.VendorForm.controls.VendorCode.value;
      this.vendorATPMObj.VendorObj.VendorName = this.VendorForm.controls.VendorName.value;
      this.vendorATPMObj.VendorObj.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
      this.vendorATPMObj.VendorObj.RegistrationNo = this.VendorForm.controls.RegistrationNo.value;
      this.vendorATPMObj.VendorObj.LicenseNo = this.VendorForm.controls.LicenseNo.value;
      this.vendorATPMObj.VendorObj.IdNo = this.VendorForm.controls.IdNo.value;
      this.vendorATPMObj.VendorObj.MobilePhnNo1 = this.VendorForm.controls.MobilePhnNo1.value;
      this.vendorATPMObj.VendorObj.MobilePhnNo2 = this.VendorForm.controls.MobilePhnNo2.value;
      this.vendorATPMObj.VendorObj.Email = this.VendorForm.controls.Email.value;
      this.vendorATPMObj.VendorObj.EstablishmentDt = this.VendorForm.controls.EstablishmentDt.value;
      this.vendorATPMObj.VendorObj.PartnershipDt = this.VendorForm.controls.PartnershipDt.value;
      this.vendorATPMObj.VendorObj.IsActive = this.VendorForm.controls.IsActive.value;
      this.vendorATPMObj.VendorObj.VendorParentId = this.VendorForm.controls.VendorParentId.value;
      this.vendorATPMObj.VendorObj.ReservedField1 = this.VendorForm.controls.ReservedField1.value;
      this.vendorATPMObj.VendorObj.ReservedField2 = this.VendorForm.controls.ReservedField2.value;
      this.vendorATPMObj.VendorObj.MrVendorClass = CommonConstant.ATPM;
      this.vendorATPMObj.VendorObj.MrTaxCalcMethodCode = this.VendorForm.controls.MrTaxCalcMethodCode.value;
      this.vendorATPMObj.VendorObj.IsVat = this.VendorForm.controls.IsVat.value;
      this.vendorATPMObj.VendorObj.IsNpwpExist = this.VendorForm.controls.IsNpwpExist.value;
      this.vendorATPMObj.VendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value

      if (this.VendorForm.controls.IsNpwpExist.value == true) {
        this.vendorATPMObj.VendorObj.TaxIdNo = this.VendorForm.controls.TaxIdNo.value;
        this.vendorATPMObj.VendorObj.TaxpayerName = this.VendorForm.controls.TaxpayerName.value;

        this.vendorATPMObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        this.vendorATPMObj.VendorAddrObj.Addr = this.VendorForm.controls.Addr.value;
        this.vendorATPMObj.VendorAddrObj.Zipcode = this.VendorForm.controls["Zipcode"]["controls"].value.value;
        this.vendorATPMObj.VendorAddrObj.AreaCode2 = this.VendorForm.controls.AreaCode2.value;
        this.vendorATPMObj.VendorAddrObj.AreaCode1 = this.VendorForm.controls.AreaCode1.value;
        this.vendorATPMObj.VendorAddrObj.AreaCode3 = this.VendorForm.controls.AreaCode3.value;
        this.vendorATPMObj.VendorAddrObj.AreaCode4 = this.VendorForm.controls.AreaCode4.value;
        this.vendorATPMObj.VendorAddrObj.City = this.VendorForm.controls.City.value;
        this.vendorATPMObj.VendorAddrObj.Province = this.VendorForm.controls.Province.value;
      } else if (this.result != null) {
        this.vendorATPMObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        this.vendorATPMObj.VendorAddrObj.Addr = this.result.VendorAddrObj.Addr;
        this.vendorATPMObj.VendorAddrObj.Zipcode = this.result.VendorAddrObj.Zipcode;
        this.vendorATPMObj.VendorAddrObj.AreaCode2 = this.result.VendorAddrObj.AreaCode2;
        this.vendorATPMObj.VendorAddrObj.AreaCode1 = this.result.VendorAddrObj.AreaCode1;
        this.vendorATPMObj.VendorAddrObj.AreaCode3 = this.result.VendorAddrObj.AreaCode3;
        this.vendorATPMObj.VendorAddrObj.AreaCode4 = this.result.VendorAddrObj.AreaCode4;
        this.vendorATPMObj.VendorAddrObj.City = this.result.VendorAddrObj.City;
        this.vendorATPMObj.VendorAddrObj.Province = this.result.VendorAddrObj.Province;
      }


      if (this.mode == "edit") {
        this.vendorATPMObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        this.vendorATPMObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
        this.vendorATPMObj.VendorObj.VendorId = this.VendorId;
        this.vendorATPMObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
        this.vendorATPMObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
        this.vendorATPMObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

        this.vendorService.EditVendorATPM(this.vendorATPMObj).subscribe(
          (response: GenericObj) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_ATPM_REG], { "VendorId": response.Id, "mode": 'edit' });
          });
      } else {
        this.vendorATPMObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

        this.vendorService.AddVendorATPM(this.vendorATPMObj).subscribe(
          (response: GenericObj) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_ATPM_REG], { "VendorId": response.Id });
          });
      }
    }
  }

  Back() {
    if (this.mode == "edit") {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_ATPM_REG], { "VendorId": this.VendorId, "mode": 'edit' });
    } else {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_PAGING], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }

  }

  setLookup() {
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    if (this.result != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
    }

    this.inputLookupZipcodeObj.isReady = true;
    this.NpwpCheck(true);
  }

  checkType() {
    if (this.VendorForm.controls.MrVendorTypeCode.value == 'C') {
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypeCompany
      this.updateValueAndValidityForm();
    } else if (this.VendorForm.controls.MrVendorTypeCode.value == 'P') {
      this.VendorForm.controls.RegistrationNo.clearValidators();
      this.VendorForm.controls.LicenseNo.clearValidators();
      this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      this.VendorForm.controls.IdNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypePersonal
      this.updateValueAndValidityForm();
    }

    if (this.RsvField == CommonConstant.CustTypePersonal){
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendor
    }else if(this.RsvField == CommonConstant.CustTypeCompany){
      this.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeIdTypeVendorCompany            
    }
    this.http.post(this.UrlConstantNew.GetListKeyValueActiveByCodeOrderBySeqNo, { RefMasterTypeCode: this.RefMasterTypeCode }).subscribe(
      (response) => {
        this.itemIdType = response[CommonConstant.ReturnObj];
        if (this.itemIdType.length > 0) {
          if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.itemIdType[0].Key
            });
          } else {
            if (this.VendorForm.controls.MrVendorTypeCode.value != this.result.VendorObj.MrVendorTypeCode) {
              this.VendorForm.patchValue({
                MrIdTypeCode: this.itemIdType[0].Key
              });
            } else {
              this.VendorForm.patchValue({
                MrIdTypeCode: this.result.VendorObj.MrIdTypeCode
              });
            }
          }
        }
        this.setValidatorPattern();
      }
    );

    this.setVAT();
  }
  
  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      (response) => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if (this.resultPattern != undefined) {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;

            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
          }
          this.setValidatorPattern();
        }
      }
    )
  }

  resultPattern: Array<KeyValueObj> = new Array();
  setValidatorPattern() {
    let idTypeValue: string = this.VendorForm.get("MrIdTypeCode").value;
    let pattern: string = '';
    if (idTypeValue != undefined) {
      let result = this.resultPattern.find(x => x.Key == idTypeValue);
      if (result != undefined) {
        pattern = result.Value;
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    let tempIdNo = this.VendorForm.get("IdNo");
    let vendorTypeCode: string = this.VendorForm.get("MrVendorTypeCode").value;
    tempIdNo.clearValidators();
    if (vendorTypeCode == CommonConstant.VENDOR_TYPE_COMPANY) return;
    if (pattern != undefined) {
      tempIdNo.setValidators([Validators.required, Validators.pattern(pattern)]);
      tempIdNo.updateValueAndValidity();
    }
  }
  
  setVAT(){
    if (!this.VatForPersonal){
      if(this.VendorForm.controls.MrVendorTypeCode.value == CommonConstant.VENDOR_TYPE_PERSONAL){
        this.VendorForm.controls.IsVat.disable();
        this.VendorForm.patchValue({
          IsVat : false
        });
      }else{
        this.VendorForm.controls.IsVat.enable();
      }
      this.VendorForm.controls.IsVat.updateValueAndValidity();
    }
  }

  GetGeneralSetting(){
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, { Code: CommonConstant.GSCodeVATForPersonal }).toPromise().then(
      (result: GeneralSettingObj) => {
        if (result.GeneralSettingId == 0 || result.GsValue == '1') {
          this.VatForPersonal = true;
        }
      }
    );
  }
}
