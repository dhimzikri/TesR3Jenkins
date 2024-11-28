import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { formatDate } from '@angular/common';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { GenericObj} from 'app/shared/model/generic/generic-obj.model';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-credit-insurance-add-edit',
  templateUrl: './vendor-credit-insurance-add-edit.component.html'
})
export class VendorCreditInsuranceAddEditComponent implements OnInit {
  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  itemAssignmentType: any;

  businessDt: Date;
  result: any;
  res: any;
  check: any;
  inputLookupParentObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  MrVendorCategoryCode: string = 'CRD_INSCO_HO';
  arrCrit: any;
  mode: string = "add";
  vendorHoObj: any;
  VendorId: any;
  isHidden: boolean = true;
  RsvField: string;
  RefMasterTypeCode: string;
  ListInputLookUpObj = new Array<any>();
  isFormReady: boolean = false;
  VatForPersonal: boolean = false;
  isIdTypeReady: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private cookieService: CookieService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
      if (queryParams['mode'] != null) {
        this.mode = queryParams['mode'];
      }
    });
  }

  VendorForm = this.fb.group({
    MrVendorCategoryCode: [''],
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
    IsVat: [false, Validators.required],
    TaxIdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    TaxpayerName: ['', Validators.required],
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
    IsNpwpExist: [false],
    IsOneAffiliate: [false],
  })

  HoTitle: string = "";
  MrVendorCategoryCode_CRD_INSCO_HO: string = CommonConstant.CRD_INSCO_HO;

  async ngOnInit() {
    this.GetGeneralSetting();

    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    // this.VendorForm.controls.VendorRating.disable();
    this.VendorForm.controls.MrVendorCategoryCode.disable();

    if (this.mode == "edit") {
      this.VendorForm.controls.VendorCode.disable();
      await this.getData();
    } else {
      await this.setDropdown();
      this.setLookup();
      await this.checkType();
    }

 
  }

  async getData() {
    let ReqGetVendorAndVendorAddr : GenericObj = new GenericObj();
    ReqGetVendorAndVendorAddr.Id = this.VendorId;
    await this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, ReqGetVendorAndVendorAddr).toPromise().then(
      async (response) => {
        this.result = response;
        await this.setDropdown();
        this.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
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
          VendorRating: this.result.VendorObj.VendorRating,
          EstablishmentDt: formatDate(this.result.VendorObj['EstablishmentDt'], 'yyyy-MM-dd', 'en-US'),
          PartnershipDt: formatDate(this.result.VendorObj['PartnershipDt'], 'yyyy-MM-dd', 'en-US'),
          IsActive: this.result.VendorObj.IsActive,
          VendorParentId: this.result.VendorObj.VendorParentId,
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
          RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist,
          IsOneAffiliate: this.result.VendorObj.IsOneAffiliate,
        });

        

        this.setLookup();
        await this.checkType();
      }
    );

  }

  async setDropdown() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorCategory,
      MasterCode: CommonConstant.HeadOffice
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterCategoryObj).toPromise().then(
      (response) => {
        this.itemCategoryType = response[CommonConstant.ReturnObj];
        if (this.itemCategoryType.length > 0) {
          this.VendorForm.patchValue({
            MrVendorCategoryCode: this.MrVendorCategoryCode
          });
        }
      }
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorType,
    }
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterTypeObj).toPromise().then(
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

    // var refMasterCalcMethodObj = {
    //   RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaxCalcMethod,
    // }
    // await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).toPromise().then(
    //   (response) => {
    //     this.itemCalcMethodType = response[CommonConstant.ReturnObj];
    //     if (this.itemCalcMethodType.length > 0) {
    //       if (this.mode != "edit") {
    //         this.VendorForm.patchValue({
    //           MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
    //         });
    //       }
    //     }
    //   }
    // );
  }

  setValidatiorEKTP()
  {
    this.VendorForm.controls.IdNo.clearValidators();
    
    if(this.VendorForm.controls.MrIdTypeCode.value == CommonConstant.MrIdTypeCodeEKTP)
    {
      this.VendorForm.controls.IdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(16), Validators.maxLength(16)])
      this.VendorForm.controls.IdNo.updateValueAndValidity();
      return
    }

    if(this.VendorForm.controls.MrVendorTypeCode.value == 'P')
    {
      this.VendorForm.controls.IdNo.setValidators([Validators.required])
      this.updateValueAndValidityForm();
      return;
    }

    this.updateValueAndValidityForm();
  }

  NpwpCheck(isGetData: boolean = false) {
    if (this.VendorForm.controls.IsNpwpExist.value == true) {
      this.isHidden = false;
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]);
      this.VendorForm.controls.TaxpayerName.setValidators(Validators.required);
    } else {
      if (!isGetData) this.VendorForm.controls['Zipcode']['controls'].value.updateValueAndValidity();
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]);
      this.VendorForm.controls.TaxpayerName.clearValidators();
      this.isHidden = true;
    }
    this.VendorForm.controls.TaxIdNo.updateValueAndValidity();
    this.VendorForm.controls.TaxpayerName.updateValueAndValidity();
  }

  getLookupParent(event) {
    this.VendorForm.patchValue({
      VendorParentId: event.VendorId
    });
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

  async checkType() {
    if (this.VendorForm.controls.MrVendorTypeCode.value != 'P') {
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypeCompany
      this.updateValueAndValidityForm();
    } else {
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

        if(this.result != undefined)
        {
          this.res = this.itemIdType.filter((x) => {return x.Key == this.result.VendorObj.MrIdTypeCode})
        }

        if (this.itemIdType.length > 0) {
          if (this.mode != "edit" || this.res.length == 0) {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.itemIdType[0].Key
            });
          } else {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.result.VendorObj.MrIdTypeCode
            });
          }

          this.isIdTypeReady = true;
        }

        this.isIdTypeReady = true;
        this.setValidatiorEKTP()
      }
    );  
    this.setVAT();
  }

  Back() {
    if (this.mode == "edit") {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_HO_REG], { "VendorId": this.VendorId, "mode": "edit"});
    } else {
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CREDIT_INS_PAGING]);
      
    }
  }

  getInputtedValue(event: string) {
    this.http.post(this.UrlConstantNew.GetZipcodeDataByZipCode, { Zipcode: event }).subscribe(
      (response) => {
        this.VendorForm.patchValue(
          {
            AreaCode2: response["AreaCode2"],
            AreaCode1: response["AreaCode1"],
            City: response["City"],
            Province: response["ProvDistrictName"]
          });
        this.inputLookupZipcodeObj.nameSelect = response["Zipcode"];
        this.inputLookupZipcodeObj.idSelect = response["Zipcode"];
      }
    );
  }

  setLookup() {
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.isReadonly = false;
    this.inputLookupZipcodeObj.isRequired = false;


    this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupSupplierHolding.json";
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupSupplierHolding.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupSupplierHolding.json";
    this.inputLookupParentObj.addCritInput = new Array();

    if (this.MrVendorCategoryCode != this.MrVendorCategoryCode) {
      this.inputLookupParentObj.isRequired = false;
    } 

    var critVendorClass = new CriteriaObj();
    critVendorClass.propName = "MR_VENDOR_CLASS";
    critVendorClass.restriction = AdInsConstant.RestrictionEq;
    critVendorClass.value = "HOLDING";
    this.inputLookupParentObj.addCritInput.push(critVendorClass);

    var critInput = new CriteriaObj();
    critInput.propName = "MR_VENDOR_CATEGORY_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = "SUPPLIER_HOLDING";
    this.inputLookupParentObj.addCritInput.push(critInput);
    this.inputLookupParentObj.title = "Supplier Holding";

    if (this.mode == "edit") {
      if (this.result.VendorObj.VendorParentId != null) {
        this.inputLookupParentObj.jsonSelect = { VendorName: this.result.VendorParentName };
      }
      if (this.result.VendorAddrObj != null) {
        this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
      }
    }

    this.inputLookupParentObj.isReady = true;
    this.inputLookupZipcodeObj.isReady = true;

    this.NpwpCheck(true);
  }


  SaveForm() {
    if (Date.parse(this.VendorForm.controls.EstablishmentDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Establishment Date Must Be Lesser Than Business Date");
    }
    else if (Date.parse(this.VendorForm.controls.PartnershipDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Partnership Date Must Be Lesser Than Business Date");
    }
    else {
      this.vendorHoObj = new VendorHoObj();
      this.vendorHoObj.VendorObj = new VendorObj();
      this.vendorHoObj.VendorAddrObj = new VendorAddrObj();
      this.vendorHoObj.VendorObj.MrVendorCategoryCode = "";
      this.vendorHoObj.VendorObj.VendorCode = this.VendorForm.controls.VendorCode.value;
      this.vendorHoObj.VendorObj.VendorName = this.VendorForm.controls.VendorName.value;
      this.vendorHoObj.VendorObj.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
      this.vendorHoObj.VendorObj.RegistrationNo = this.VendorForm.controls.RegistrationNo.value;
      this.vendorHoObj.VendorObj.LicenseNo = this.VendorForm.controls.LicenseNo.value;
      this.vendorHoObj.VendorObj.IdNo = this.VendorForm.controls.IdNo.value;
      this.vendorHoObj.VendorObj.MobilePhnNo1 = this.VendorForm.controls.MobilePhnNo1.value;
      this.vendorHoObj.VendorObj.MobilePhnNo2 = this.VendorForm.controls.MobilePhnNo2.value;
      this.vendorHoObj.VendorObj.Email = this.VendorForm.controls.Email.value;
      this.vendorHoObj.VendorObj.VendorRating = this.VendorForm.controls.VendorRating.value;
      this.vendorHoObj.VendorObj.EstablishmentDt = this.VendorForm.controls.EstablishmentDt.value;
      this.vendorHoObj.VendorObj.PartnershipDt = this.VendorForm.controls.PartnershipDt.value;
      this.vendorHoObj.VendorObj.IsActive = this.VendorForm.controls.IsActive.value;
      this.vendorHoObj.VendorObj.VendorParentId = this.VendorForm.controls.VendorParentId.value;
      this.vendorHoObj.VendorObj.MrVendorClass = CommonConstant.HeadOffice;
      this.vendorHoObj.VendorObj.IsVat = this.VendorForm.controls.IsVat.value;
      this.vendorHoObj.VendorObj.IsNpwpExist = this.VendorForm.controls.IsNpwpExist.value;
      this.vendorHoObj.VendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value;
      this.vendorHoObj.VendorObj.IsOneAffiliate = this.VendorForm.controls.IsOneAffiliate.value;

      this.vendorHoObj.VendorAddrObj.MrAddrTypeCode = "";
      this.vendorHoObj.VendorAddrObj.Addr = "";
      this.vendorHoObj.VendorAddrObj.Zipcode = "";
      this.vendorHoObj.VendorAddrObj.AreaCode2 = "";
      this.vendorHoObj.VendorAddrObj.AreaCode1 = "";
      this.vendorHoObj.VendorAddrObj.City = "";
      this.vendorHoObj.VendorAddrObj.Province = "";
      if (this.VendorForm.controls.IsNpwpExist.value == true) {
        this.vendorHoObj.VendorObj.TaxIdNo = this.VendorForm.controls.TaxIdNo.value;
        this.vendorHoObj.VendorObj.TaxpayerName = this.VendorForm.controls.TaxpayerName.value;

        this.vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        this.vendorHoObj.VendorAddrObj.Addr = this.VendorForm.controls.Addr.value;
        this.vendorHoObj.VendorAddrObj.Zipcode = this.VendorForm.controls["Zipcode"]["controls"].value.value;
        this.vendorHoObj.VendorAddrObj.AreaCode2 = this.VendorForm.controls.AreaCode2.value;
        this.vendorHoObj.VendorAddrObj.AreaCode1 = this.VendorForm.controls.AreaCode1.value;
        this.vendorHoObj.VendorAddrObj.AreaCode3 = this.VendorForm.controls.AreaCode3.value;
        this.vendorHoObj.VendorAddrObj.AreaCode4 = this.VendorForm.controls.AreaCode4.value;
        this.vendorHoObj.VendorAddrObj.City = this.VendorForm.controls.City.value;
        this.vendorHoObj.VendorAddrObj.Province = this.VendorForm.controls.Province.value;
      } else if (this.result != null) {
        this.vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        this.vendorHoObj.VendorAddrObj.Addr = this.result.VendorAddrObj.Addr;
        this.vendorHoObj.VendorAddrObj.Zipcode = this.result.VendorAddrObj.Zipcode;
        this.vendorHoObj.VendorAddrObj.AreaCode2 = this.result.VendorAddrObj.AreaCode2;
        this.vendorHoObj.VendorAddrObj.AreaCode1 = this.result.VendorAddrObj.AreaCode1;
        this.vendorHoObj.VendorAddrObj.AreaCode3 = this.result.VendorAddrObj.AreaCode3;
        this.vendorHoObj.VendorAddrObj.AreaCode4 = this.result.VendorAddrObj.AreaCode4;
        this.vendorHoObj.VendorAddrObj.City = this.result.VendorAddrObj.City;
        this.vendorHoObj.VendorAddrObj.Province = this.result.VendorAddrObj.Province;
      }

      if (this.mode == "edit") {
        this.vendorHoObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        this.vendorHoObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
        this.vendorHoObj.VendorObj.VendorId = this.VendorId;
        this.vendorHoObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
        this.vendorHoObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
        this.vendorHoObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

        this.http.post<GenericObj>(this.UrlConstantNew.EditVendorHO, this.vendorHoObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_HO_REG], { "VendorId": response.Id, "mode": "edit"});
          });
      }
      else {
        this.vendorHoObj.VendorObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

        this.http.post<GenericObj>(this.UrlConstantNew.AddVendorHO, this.vendorHoObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_HO_REG], { "VendorId": response.Id});
          });
      }
    }
  }

 

  //check is automatic/not form no 4
  isAuto: boolean = false;
  checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      rowVersion: "",
      code: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).subscribe(
      (response) => {
        result = response;

        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true;
            this.VendorForm.patchValue({
              VendorCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4
  
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
