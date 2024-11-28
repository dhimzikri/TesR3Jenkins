import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorEmpObj } from 'app/shared/model/vendor-emp-obj.model';
import { formatDate } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { GenericObj} from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';import { VendorBranchEmpObjX } from 'app/impl/shared/model/vendor-branch-emp-obj.model-x';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-employee-x',
  templateUrl: './vendor-employee-x.component.html'
})
export class VendorEmployeeXComponent implements OnInit {

  @Input() objInput: any;
  @Input() isVendorCollCompany: boolean = false;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  VendorEmpId: number;
  VendorId: number;
  MrVendorCategoryCode: string;
  mode: string;
  VendorBranchEmpObjX: VendorBranchEmpObjX = new VendorBranchEmpObjX();
  result: any;
  resultVendorEmpAndAddr: any;
  inputLookupInternalEmpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupSpvObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  VendorPositionList = new Array();
  IdTypeList = new Array();
  itemCalcMethodType: any;
  businessDtMin: Date;
  VendorEmpXId: number;

  isHidden: boolean = true;
  Npwp: string;

  VendorEmpForm = this.fb.group({
    VendorEmpCode: ['', [Validators.required]],
    VendorEmpName: ['', [Validators.required]],
    MrVendorEmpPositionCode: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    BirthPlace: [''],
    BirthDate: [''],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    JoinDt: ['', [Validators.required]],
    VendorEmpRating: ['0'],
    Addr: [''],
    AreaCode1: [''],
    AreaCode2: [''],
    AreaCode3: [''],
    AreaCode4: [''],
    City: [''],
    Province: [''],
    IsActive: [false],
    IsContactPerson: [false],
    IsOwner: [false],
    IsVerified: [false],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    TaxpayerName: [''],
    MrTaxCalcMethodCode: [''],
    Notes: [''],
    IsNpwpExist: [false]
  });

  constructor(private regexService: RegexService, private fb: FormBuilder, private http: HttpClient, 
    private route: ActivatedRoute, private toastr: NGXToastrService, private wizard: WizardComponent, 
    private cookieService: CookieService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.mode = queryParams["mode"];
      }
      if (queryParams["VendorEmpId"] != null) {
        this.VendorEmpId = queryParams["VendorEmpId"];
        this.mode = "edit";
      }
      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }
      if (queryParams["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
      }
    });
  }

  async ngOnInit() {
    this.customPattern = new Array<CustomPatternObj>();
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(currentUserContext[CommonConstant.BUSINESS_DT]);

    if (this.mode == undefined) {
      this.mode = this.objInput.mode;
      this.VendorEmpId = this.objInput.VendorEmpId;
    }

    if (this.mode == "edit") {
      this.VendorEmpForm.controls["VendorEmpCode"].disable();
      await this.getData();
      if(this.VendorBranchEmpObjX.VendorEmpObj.IsInternalEmployee){
        this.VendorEmpForm.controls["VendorEmpName"].disable();
      }
      this.setLookup();
    } else {
      this.mode = "add";
      await this.setDropdown();
      this.inputLookupInternalEmpObj.isReady = true;
      this.inputLookupSpvObj.isReady = true;
      this.inputLookupZipcodeObj.isReady = true;
      this.setLookup();
      
      if (this.MrVendorCategoryCode === CommonConstant.SUPPLIER){
        this.VendorEmpForm.get("VendorEmpCode").clearValidators();
        this.VendorEmpForm.get("VendorEmpCode").updateValueAndValidity();
      }
    }
  }

  async setDropdown() {
    if(this.isVendorCollCompany){
      var RefMasterVendorPosition = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorCollCompanyPosition,
      }
    }else{
      var RefMasterVendorPosition = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorPosition,
      }
    }

    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterVendorPosition).subscribe(
      (response) => {
        this.VendorPositionList = response[CommonConstant.ReturnObj];
        if (this.VendorPositionList.length > 0) {
          if (this.mode != "edit") {
            this.VendorEmpForm.patchValue({
              MrVendorEmpPositionCode: this.VendorPositionList[0].Key
            });
          }
        }
      }
    );
    var RefMasterIdType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
    }
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, RefMasterIdType).subscribe(
      (response) => {
        this.IdTypeList = response[CommonConstant.ReturnObj];
        if (this.IdTypeList.length > 0) {
          if (this.mode != "edit") {
            this.VendorEmpForm.patchValue({
              MrIdTypeCode: this.IdTypeList[0].Key
            });
          }

          this.getInitPattern();
        }
      }
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaxCalcMethod,
    }
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response[CommonConstant.ReturnObj];
        if (this.itemCalcMethodType.length > 0) {
          if (this.mode != "edit") {
            this.VendorEmpForm.patchValue({
              MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
            });
          }
        }
      }
    );

    await this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.objInput.VendorId}).toPromise().then(
      (response) => {
        this.result = response;
        this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
      }
    );
  }

  setLookup() {
    this.inputLookupInternalEmpObj.urlJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.pagingJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.genericJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.isRequired = false;

    this.inputLookupSpvObj.urlJson = "./assets/uclookup/vendor/LookupvendorempXCNAF.json";
    this.inputLookupSpvObj.pagingJson = "./assets/uclookup/vendor/LookupvendorempXCNAF.json";
    this.inputLookupSpvObj.genericJson = "./assets/uclookup/vendor/LookupvendorempXCNAF.json";
    this.inputLookupSpvObj.isRequired = false;
    this.inputLookupSpvObj.addCritInput = new Array();

    var critObj = new CriteriaObj();
    critObj.propName = 'VENDOR_ID';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.objInput.VendorId;
    this.inputLookupSpvObj.addCritInput.push(critObj);

    if (this.mode == "edit") {
      var critObj = new CriteriaObj();
      critObj.propName = 'VENDOR_EMP_ID';
      critObj.restriction = AdInsConstant.RestrictionNeq;
      critObj.value = this.VendorEmpId + '';
      this.inputLookupSpvObj.addCritInput.push(critObj);
    }

    if (this.isVendorCollCompany){
      var critObj = new CriteriaObj();
      critObj.propName = 'MR_VENDOR_EMP_POSITION_CODE';
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = CommonConstant.VENDOR_EMP_POSITION_SUPERVISOR;
      this.inputLookupSpvObj.addCritInput.push(critObj);
    }
    this.PatchDataLookupInternal();

    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    if (this.resultVendorEmpAndAddr != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.resultVendorEmpAndAddr["VendorAddrObj"].Zipcode };
      this.inputLookupSpvObj.jsonSelect = { VendorEmpName: this.resultVendorEmpAndAddr["VendorEmpObj"].SupervisorName };
    }
    this.NpwpCheck(true);
  }
  PatchDataLookupInternal() {
    let objPatch = {
      EmpName: this.VendorEmpForm.controls.VendorEmpName.value
    }
    this.inputLookupInternalEmpObj.nameSelect = objPatch.EmpName;
    this.inputLookupInternalEmpObj.jsonSelect = objPatch;
  }

  getLookupInternal(ev) {
    this.VendorEmpForm.patchValue(
      {
        VendorEmpCode: ev.EmpNo,
        VendorEmpName: ev.EmpName,
      });
    this.VendorBranchEmpObjX.VendorEmpObj.IsInternalEmployee = true;
    this.VendorEmpForm.controls["VendorEmpCode"].disable();
    this.VendorEmpForm.controls["VendorEmpName"].disable();
  }

  getLookupSupervisor(ev) {
    this.VendorBranchEmpObjX.VendorEmpObj.SupervisorId = ev.VendorEmpId;
  }

  getLookupZipcode(ev) {
    this.VendorBranchEmpObjX.VendorAddrObj.Zipcode = ev.Zipcode;
    this.VendorEmpForm.patchValue(
      {
        AreaCode2: ev.AreaCode2,
        AreaCode1: ev.AreaCode1,
        PhnArea1: ev.PhnArea,
        City: ev.City,
        Province: ev.Province
      });
    this.inputLookupZipcodeObj.jsonSelect = { Zipcode: ev.Zipcode };
  }

  async getData() {
    var vendorEmpObj = new VendorEmpObj();
    vendorEmpObj.VendorId = null;
    vendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
    await this.http.post(this.UrlConstantNew.GetVendorEmpAndVendorTaxAddrByVendorEmpIdX, {Id : this.objInput.VendorEmpId}).toPromise().then(
      (response) => {
        this.resultVendorEmpAndAddr = response;
        this.setDropdown();
        this.VendorEmpXId = this.resultVendorEmpAndAddr.ResponseVendorEmpXObjX.VendorEmpXId
        this.inputLookupInternalEmpObj.isReady = true;
        this.inputLookupSpvObj.isReady = true;
        this.inputLookupZipcodeObj.isReady = true;
        this.VendorBranchEmpObjX.VendorEmpObj.SupervisorId = this.resultVendorEmpAndAddr.VendorEmpObj.SupervisorId;
        this.VendorBranchEmpObjX.VendorEmpObj.IsInternalEmployee = this.resultVendorEmpAndAddr.VendorEmpObj.IsInternalEmployee;
        this.VendorBranchEmpObjX.VendorAddrObj.Zipcode = this.resultVendorEmpAndAddr.VendorAddrObj.Zipcode;
        this.VendorEmpForm.patchValue({
          VendorEmpCode: this.resultVendorEmpAndAddr.VendorEmpObj.VendorEmpNo,
          VendorEmpName: this.resultVendorEmpAndAddr.VendorEmpObj.VendorEmpName,
          SupervisorId: this.resultVendorEmpAndAddr.VendorEmpObj.SupervisorId,
          MrVendorEmpPositionCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrVendorEmpPositionCode,
          MrIdTypeCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrIdTypeCode,
          IdNo: this.resultVendorEmpAndAddr.VendorEmpObj.IdNo,
          BirthPlace: this.resultVendorEmpAndAddr.VendorEmpObj.BirthPlace,
          BirthDate: formatDate(this.resultVendorEmpAndAddr.VendorEmpObj['BirthDate'], 'yyyy-MM-dd', 'en-US'),
          MobilePhnNo1: this.resultVendorEmpAndAddr.VendorEmpObj.MobilePhnNo1,
          MobilePhnNo2: this.resultVendorEmpAndAddr.VendorEmpObj.MobilePhnNo2,
          Email: this.resultVendorEmpAndAddr.VendorEmpObj.Email,
          JoinDt: formatDate(this.resultVendorEmpAndAddr.VendorEmpObj['JoinDt'], 'yyyy-MM-dd', 'en-US'),
          VendorEmpRating: this.resultVendorEmpAndAddr.VendorEmpObj.VendorEmpRating,
          Addr: this.resultVendorEmpAndAddr.VendorAddrObj.Addr,
          AreaCode1: this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode1,
          AreaCode2: this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode2,
          AreaCode3: this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode3,
          AreaCode4: this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode4,
          City: this.resultVendorEmpAndAddr.VendorAddrObj.City,
          Province: this.resultVendorEmpAndAddr.VendorAddrObj.Province,
          IsActive: this.resultVendorEmpAndAddr.VendorEmpObj.IsActive,
          IsContactPerson: this.resultVendorEmpAndAddr.VendorEmpObj.IsContactPerson,
          IsOwner: this.resultVendorEmpAndAddr.VendorEmpObj.IsOwner,
          IsVerified: this.resultVendorEmpAndAddr.ResponseVendorEmpXObjX.IsVerified,
          TaxIdNo: this.resultVendorEmpAndAddr.VendorEmpObj.TaxIdNo,
          TaxpayerName: this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerName,
          MrTaxCalcMethodCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrTaxCalcMethodCode,
          IsNpwpExist: this.resultVendorEmpAndAddr.VendorEmpObj.IsNpwpExist,
          Notes: this.resultVendorEmpAndAddr.ResponseVendorEmpXObjX.Notes 
        });
      }
      );
    }

    NpwpCheck(isGetData: boolean = false) {
      if (this.VendorEmpForm.controls.IsNpwpExist.value == true) {
        this.SetValidatorsIfNpwpCheck(true);
      this.isHidden = false;
      this.inputLookupZipcodeObj.isRequired = true;
    } else {
      this.SetValidatorsIfNpwpCheck(false);
      this.inputLookupZipcodeObj.isRequired = false;
      if (!isGetData) this.VendorEmpForm.controls['Zipcode']['controls'].value.updateValueAndValidity();
      this.isHidden = true;
    }
  }

  SetValidatorsIfNpwpCheck(isNpwp: boolean){
    this.VendorEmpForm.get("TaxIdNo").setValidators([Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]);
    this.VendorEmpForm.get("TaxIdNo").updateValueAndValidity();
    this.VendorEmpForm.get("TaxpayerName").clearValidators();
    this.VendorEmpForm.get("TaxpayerName").updateValueAndValidity();
    this.VendorEmpForm.get("Addr").clearValidators();
    this.VendorEmpForm.get("Addr").updateValueAndValidity();
    if(isNpwp){
      this.VendorEmpForm.get("TaxIdNo").setValidators([Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15), Validators.required]);
      this.VendorEmpForm.get("TaxIdNo").updateValueAndValidity();
      this.VendorEmpForm.get("TaxpayerName").setValidators(Validators.required);
      this.VendorEmpForm.get("TaxpayerName").updateValueAndValidity();
      this.VendorEmpForm.get("Addr").setValidators(Validators.required);
      this.VendorEmpForm.get("Addr").updateValueAndValidity();
    }
  }

  validateDate() {
    let date = new Date(this.VendorEmpForm.controls.JoinDt.value);
    let localDt = this.convertToMMddyyyy(date);
    let localBizDt = this.convertToMMddyyyy(this.businessDtMin)
    if(localDt > localBizDt) {
      this.toastr.warningMessage("Join Date Cannot Exceed Business Date");
      this.VendorEmpForm.patchValue({
        JoinDt: ''
      });
      return false;
    }
    return true;
  }

  convertToMMddyyyy(dt: Date) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  async SaveForm() {
    if(!this.validateDate()) {
      return;
    }
    this.VendorBranchEmpObjX.VendorEmpObj.VendorEmpNo = this.VendorEmpForm.controls.VendorEmpCode.value;
    this.VendorBranchEmpObjX.VendorEmpObj.VendorEmpName = this.VendorEmpForm.controls.VendorEmpName.value;
    this.VendorBranchEmpObjX.VendorEmpObj.VendorId = this.objInput.VendorId;
    this.VendorBranchEmpObjX.VendorEmpObj.MobilePhnNo1 = this.VendorEmpForm.controls.MobilePhnNo1.value;
    this.VendorBranchEmpObjX.VendorEmpObj.MobilePhnNo2 = this.VendorEmpForm.controls.MobilePhnNo2.value;
    this.VendorBranchEmpObjX.VendorEmpObj.Email = this.VendorEmpForm.controls.Email.value;
    this.VendorBranchEmpObjX.VendorEmpObj.MrIdTypeCode = this.VendorEmpForm.controls.MrIdTypeCode.value;
    this.VendorBranchEmpObjX.VendorEmpObj.IdNo = this.VendorEmpForm.controls.IdNo.value;
    this.VendorBranchEmpObjX.VendorEmpObj.BirthPlace = this.VendorEmpForm.controls.BirthPlace.value;
    this.VendorBranchEmpObjX.VendorEmpObj.BirthDate = this.VendorEmpForm.controls.BirthDate.value;
    this.VendorBranchEmpObjX.VendorEmpObj.IsActive = this.VendorEmpForm.controls.IsActive.value;
    this.VendorBranchEmpObjX.VendorEmpObj.JoinDt = this.VendorEmpForm.controls.JoinDt.value;
    this.VendorBranchEmpObjX.VendorEmpObj.MrVendorEmpPositionCode = this.VendorEmpForm.controls.MrVendorEmpPositionCode.value;
    this.VendorBranchEmpObjX.VendorEmpObj.IsContactPerson = this.VendorEmpForm.controls.IsContactPerson.value;
    this.VendorBranchEmpObjX.VendorEmpObj.VendorEmpRating = this.VendorEmpForm.controls.VendorEmpRating.value;
    this.VendorBranchEmpObjX.VendorEmpObj.RowVersion = "";
    this.VendorBranchEmpObjX.VendorEmpObj.MrTaxCalcMethodCode = this.VendorEmpForm.controls.MrTaxCalcMethodCode.value;
    this.VendorBranchEmpObjX.VendorEmpObj.IsNpwpExist = this.VendorEmpForm.controls.IsNpwpExist.value;
    this.VendorBranchEmpObjX.VendorEmpObj.SupervisorId = this.VendorBranchEmpObjX.VendorEmpObj.SupervisorId;
    this.VendorBranchEmpObjX.VendorEmpObj.IsOwner = this.VendorEmpForm.controls.IsOwner.value;
    this.VendorBranchEmpObjX.VendorEmpXObj.Notes = this.VendorEmpForm.controls.Notes.value;
    this.VendorBranchEmpObjX.VendorEmpXObj.IsVerified = this.VendorEmpForm.controls.IsVerified.value;

    if (this.VendorEmpForm.controls.IsNpwpExist.value == true) {
      this.Npwp = this.VendorEmpForm.controls.TaxIdNo.value;
      this.VendorBranchEmpObjX.VendorEmpObj.TaxIdNo = this.VendorEmpForm.controls.TaxIdNo.value;
      this.VendorBranchEmpObjX.VendorEmpObj.TaxpayerName = this.VendorEmpForm.controls.TaxpayerName.value;

      this.VendorBranchEmpObjX.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.VendorBranchEmpObjX.VendorAddrObj.Zipcode = this.VendorBranchEmpObjX.VendorAddrObj.Zipcode;
      this.VendorBranchEmpObjX.VendorAddrObj.Addr = this.VendorEmpForm.controls.Addr.value;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode2 = this.VendorEmpForm.controls.AreaCode2.value;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode1 = this.VendorEmpForm.controls.AreaCode1.value;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode3 = this.VendorEmpForm.controls.AreaCode3.value;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode4 = this.VendorEmpForm.controls.AreaCode4.value;
      this.VendorBranchEmpObjX.VendorAddrObj.City = this.VendorEmpForm.controls.City.value;
      this.VendorBranchEmpObjX.VendorAddrObj.Province = this.VendorEmpForm.controls.Province.value;
      this.VendorBranchEmpObjX.VendorAddrObj.RowVersion = "";
    } else if (this.resultVendorEmpAndAddr != null) {
      this.VendorBranchEmpObjX.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.VendorBranchEmpObjX.VendorAddrObj.Addr = this.resultVendorEmpAndAddr.VendorAddrObj.Addr;
      this.VendorBranchEmpObjX.VendorAddrObj.Zipcode = this.resultVendorEmpAndAddr.VendorAddrObj.Zipcode;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode2 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode2;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode1 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode1;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode3 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode3;
      this.VendorBranchEmpObjX.VendorAddrObj.AreaCode4 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode4;
      this.VendorBranchEmpObjX.VendorAddrObj.City = this.resultVendorEmpAndAddr.VendorAddrObj.City;
      this.VendorBranchEmpObjX.VendorAddrObj.Province = this.resultVendorEmpAndAddr.VendorAddrObj.Province;
    }
    let continueToSave = 1;
    if(this.MrVendorCategoryCode == CommonConstant.SUPPLIER){
 //tambah validasi kalau tipe supplier confirmation
    if (this.VendorBranchEmpObjX.VendorEmpObj.MrIdTypeCode == RefMasterConstant.EKtp  ) {
       await this.http
        .post(this.UrlConstantNew.GetVendorEmpXByTaxNoXAndIdNo, {
          IdNo: this.VendorBranchEmpObjX.VendorEmpObj.IdNo,
          MrIdTypeCode: this.VendorBranchEmpObjX.VendorEmpObj.MrIdTypeCode,
          TaxNo: this.Npwp,
          VendorEmpId:this.objInput.VendorEmpId,
          MrVendorCategoryCode: this.MrVendorCategoryCode,
        }).toPromise().then((response) => {
          let result2: any;
          result2 = response;
          let res = result2.ReturnObject;
          if (res !== null) {
            //get vendor id
            let confirmationMessageId: string;
            let confirmationTaxNo: string;
            confirmationMessageId="";
            confirmationTaxNo = "";
            if (res.VendorEmpXByIdNo!=null  ){
              confirmationMessageId = "This " + this.VendorBranchEmpObjX.VendorEmpObj.MrIdTypeCode+ " "+
              ExceptionConstant.ALREADY_EXIST +
              " in Supplier Employee " +
              res.VendorEmpXByIdNo.VendorEmpName +" Of Supplier " +res.VendorEmpXByIdNo.VendorName +"\n\n" ;
            }
                    
            if (this.VendorEmpForm.controls.IsNpwpExist.value == true) {
              if (res.VendorEmpXByTaxNo!=null  ){
                confirmationTaxNo = "This NPWP "+
                ExceptionConstant.ALREADY_EXIST +
                " in Supplier Employee " +
                res.VendorEmpXByTaxNo.VendorEmpName +" Of Supplier " +res.VendorEmpXByTaxNo.VendorName + "\n\n";
              } 
            }
            if(confirmationMessageId != "" || confirmationTaxNo != ""){
              let confirmation = confirm(
                confirmationMessageId + confirmationTaxNo
                +"Do you still want to save?"
              );
              if (confirmation == false ) {
                continueToSave = 0;
              }
            }
          }
        });
    }else if(this.VendorBranchEmpObjX.VendorEmpObj.MrIdTypeCode != RefMasterConstant.EKtp && this.VendorEmpForm.controls.IsNpwpExist.value == true ){
      await this.http
        .post(this.UrlConstantNew.GetVendorEmpXByTaxNoXAndIdNo, {
          TaxNo: this.Npwp,
          VendorEmpId:this.objInput.VendorEmpId,
          MrVendorCategoryCode: this.MrVendorCategoryCode,
        }).toPromise().then((response) => {
          let result2: any;
          result2 = response;
          let res = result2.ReturnObject;
          if (res !== null) {
            let confirmationTaxNo: string;
            confirmationTaxNo = "";
            if (res.VendorEmpXByTaxNo!=null  ){
              confirmationTaxNo = "This NPWP "+
              ExceptionConstant.ALREADY_EXIST +
              " in Supplier Employee " +
              res.VendorEmpXByTaxNo.VendorEmpName +" Of Supplier " +res.VendorEmpXByTaxNo.VendorName + "\n\n";
            } 
            if(confirmationTaxNo != ""){
              let confirmation = confirm(
                confirmationTaxNo
                +"Do you still want to save?"
              );
              if (confirmation == false ) {
                continueToSave = 0;
              }
            }
          }
        });
    }
    }
   
    if (continueToSave == 1){
      if (this.mode == "add") {
        await this.http.post<GenericObj>(this.UrlConstantNew.AddVendorBranchEmpV2X, this.VendorBranchEmpObjX, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.mode = "edit";
            this.objInput.VendorEmpId = response.Id;
            this.objOutput.emit(response.Id);
            this.toastr.successMessage(response["Message"]);
            this.wizard.goToNextStep();
          });
      } else {
        this.VendorBranchEmpObjX.VendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
        this.VendorBranchEmpObjX.VendorEmpXObj.VendorEmpXId = this.VendorEmpXId;
        this.VendorBranchEmpObjX.VendorAddrObj.VendorAddrId = this.resultVendorEmpAndAddr.VendorAddrObj.VendorAddrId;
        this.VendorBranchEmpObjX.VendorEmpObj.RowVersion = this.resultVendorEmpAndAddr.VendorEmpObj.RowVersion;
        this.VendorBranchEmpObjX.VendorAddrObj.RowVersion = this.resultVendorEmpAndAddr.VendorAddrObj.RowVersion;
        this.VendorBranchEmpObjX.VendorEmpObj.TaxpayerNo = this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerNo;
  
        await this.http.post(this.UrlConstantNew.EditVendorBranchEmpV2X, this.VendorBranchEmpObjX, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            this.wizard.goToNextStep();
          });
      }      
    }

  }

  //START URS-LOS-041

  onOptionsSelected(event){
    this.setValidatorPattern();
  }

  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if(this.resultPattern != undefined)
        {
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
    idTypeValue = this.VendorEmpForm.controls[this.controlNameIdType].value;
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
      this.VendorEmpForm.controls[this.controlNameIdNo].setValidators([Validators.required,Validators.pattern(pattern)]);
      this.VendorEmpForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
  
}
