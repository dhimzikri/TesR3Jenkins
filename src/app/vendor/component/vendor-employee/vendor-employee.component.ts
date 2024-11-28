import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VendorBranchEmpObj } from 'app/shared/model/vendor-branch-emp-obj.model';
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
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-vendor-employee',
  templateUrl: './vendor-employee.component.html',
  providers: [RegexService]
})
export class VendorEmployeeComponent implements OnInit {
  @Input() objInput: any;
  @Input() isVendorCollCompany: boolean = false;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  VendorEmpId: number;
  VendorId: number;
  MrVendorCategoryCode: string;
  mode: string;
  VendorBranchEmpObj: VendorBranchEmpObj = new VendorBranchEmpObj();
  result: any;
  resultVendorEmpAndAddr: any;
  inputLookupInternalEmpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupSpvObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  VendorPositionList = new Array();
  IdTypeList = new Array();
  itemCalcMethodType: any;
  businessDtMin: Date;

  isHidden: boolean = true;

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
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    TaxpayerName: [''],
    MrTaxCalcMethodCode: [''],
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
      if(this.VendorBranchEmpObj.VendorEmpObj.IsInternalEmployee){
        this.VendorEmpForm.controls["VendorEmpName"].disable();
      }
      this.setLookup();
    } else {
      this.mode = "add";
      this.setDropdown();
      this.inputLookupInternalEmpObj.isReady = true;
      this.inputLookupSpvObj.isReady = true;
      this.inputLookupZipcodeObj.isReady = true;
      this.setLookup();
    }
  }

  setDropdown() {
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


    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.objInput.VendorId}).subscribe(
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

    this.inputLookupSpvObj.urlJson = "./assets/uclookup/vendor/lookupVendorEmp.json";
    this.inputLookupSpvObj.pagingJson = "./assets/uclookup/vendor/lookupVendorEmp.json";
    this.inputLookupSpvObj.genericJson = "./assets/uclookup/vendor/lookupVendorEmp.json";
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
    this.VendorBranchEmpObj.VendorEmpObj.IsInternalEmployee = true;
    this.VendorEmpForm.controls["VendorEmpCode"].disable();
    this.VendorEmpForm.controls["VendorEmpName"].disable();
  }

  getLookupSupervisor(ev) {
    this.VendorBranchEmpObj.VendorEmpObj.SupervisorId = ev.VendorEmpId;
  }

  getLookupZipcode(ev) {
    this.VendorBranchEmpObj.VendorAddrObj.Zipcode = ev.Zipcode;
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
    await this.http.post(this.UrlConstantNew.GetVendorEmpAndVendorTaxAddrByVendorEmpId, {Id : this.objInput.VendorEmpId}).toPromise().then(
      (response) => {
        this.resultVendorEmpAndAddr = response;
        this.setDropdown();
        this.inputLookupInternalEmpObj.isReady = true;
        this.inputLookupSpvObj.isReady = true;
        this.inputLookupZipcodeObj.isReady = true;
        this.VendorBranchEmpObj.VendorEmpObj.SupervisorId = this.resultVendorEmpAndAddr.VendorEmpObj.SupervisorId;
        this.VendorBranchEmpObj.VendorEmpObj.IsInternalEmployee = this.resultVendorEmpAndAddr.VendorEmpObj.IsInternalEmployee;
        this.VendorBranchEmpObj.VendorAddrObj.Zipcode = this.resultVendorEmpAndAddr.VendorAddrObj.Zipcode;
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
          TaxIdNo: this.resultVendorEmpAndAddr.VendorEmpObj.TaxIdNo,
          TaxpayerName: this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerName,
          MrTaxCalcMethodCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrTaxCalcMethodCode,
          IsNpwpExist: this.resultVendorEmpAndAddr.VendorEmpObj.IsNpwpExist
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

  SaveForm() {
    if(!this.validateDate()) {
      return;
    }
    this.VendorBranchEmpObj.VendorEmpObj.VendorEmpNo = this.VendorEmpForm.controls.VendorEmpCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.VendorEmpName = this.VendorEmpForm.controls.VendorEmpName.value;
    this.VendorBranchEmpObj.VendorEmpObj.VendorId = this.objInput.VendorId;
    this.VendorBranchEmpObj.VendorEmpObj.MobilePhnNo1 = this.VendorEmpForm.controls.MobilePhnNo1.value;
    this.VendorBranchEmpObj.VendorEmpObj.MobilePhnNo2 = this.VendorEmpForm.controls.MobilePhnNo2.value;
    this.VendorBranchEmpObj.VendorEmpObj.Email = this.VendorEmpForm.controls.Email.value;
    this.VendorBranchEmpObj.VendorEmpObj.MrIdTypeCode = this.VendorEmpForm.controls.MrIdTypeCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.IdNo = this.VendorEmpForm.controls.IdNo.value;
    this.VendorBranchEmpObj.VendorEmpObj.BirthPlace = this.VendorEmpForm.controls.BirthPlace.value;
    this.VendorBranchEmpObj.VendorEmpObj.BirthDate = this.VendorEmpForm.controls.BirthDate.value;
    this.VendorBranchEmpObj.VendorEmpObj.IsActive = this.VendorEmpForm.controls.IsActive.value;
    this.VendorBranchEmpObj.VendorEmpObj.JoinDt = this.VendorEmpForm.controls.JoinDt.value;
    this.VendorBranchEmpObj.VendorEmpObj.MrVendorEmpPositionCode = this.VendorEmpForm.controls.MrVendorEmpPositionCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.IsContactPerson = this.VendorEmpForm.controls.IsContactPerson.value;
    this.VendorBranchEmpObj.VendorEmpObj.VendorEmpRating = this.VendorEmpForm.controls.VendorEmpRating.value;
    this.VendorBranchEmpObj.VendorEmpObj.RowVersion = "";
    this.VendorBranchEmpObj.VendorEmpObj.MrTaxCalcMethodCode = this.VendorEmpForm.controls.MrTaxCalcMethodCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.IsNpwpExist = this.VendorEmpForm.controls.IsNpwpExist.value;
    this.VendorBranchEmpObj.VendorEmpObj.SupervisorId = this.VendorBranchEmpObj.VendorEmpObj.SupervisorId;
    this.VendorBranchEmpObj.VendorEmpObj.IsOwner = this.VendorEmpForm.controls.IsOwner.value;

    if (this.VendorEmpForm.controls.IsNpwpExist.value == true) {
      this.VendorBranchEmpObj.VendorEmpObj.TaxIdNo = this.VendorEmpForm.controls.TaxIdNo.value;
      this.VendorBranchEmpObj.VendorEmpObj.TaxpayerName = this.VendorEmpForm.controls.TaxpayerName.value;

      this.VendorBranchEmpObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.VendorBranchEmpObj.VendorAddrObj.Zipcode = this.VendorBranchEmpObj.VendorAddrObj.Zipcode;
      this.VendorBranchEmpObj.VendorAddrObj.Addr = this.VendorEmpForm.controls.Addr.value;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode2 = this.VendorEmpForm.controls.AreaCode2.value;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode1 = this.VendorEmpForm.controls.AreaCode1.value;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode3 = this.VendorEmpForm.controls.AreaCode3.value;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode4 = this.VendorEmpForm.controls.AreaCode4.value;
      this.VendorBranchEmpObj.VendorAddrObj.City = this.VendorEmpForm.controls.City.value;
      this.VendorBranchEmpObj.VendorAddrObj.Province = this.VendorEmpForm.controls.Province.value;
      this.VendorBranchEmpObj.VendorAddrObj.RowVersion = "";
    } else if (this.resultVendorEmpAndAddr != null) {
      this.VendorBranchEmpObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.VendorBranchEmpObj.VendorAddrObj.Addr = this.resultVendorEmpAndAddr.VendorAddrObj.Addr;
      this.VendorBranchEmpObj.VendorAddrObj.Zipcode = this.resultVendorEmpAndAddr.VendorAddrObj.Zipcode;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode2 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode2;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode1 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode1;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode3 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode3;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode4 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode4;
      this.VendorBranchEmpObj.VendorAddrObj.City = this.resultVendorEmpAndAddr.VendorAddrObj.City;
      this.VendorBranchEmpObj.VendorAddrObj.Province = this.resultVendorEmpAndAddr.VendorAddrObj.Province;
    }

    if (this.mode == "add") {
      this.http.post<GenericObj>(this.UrlConstantNew.AddVendorBranchEmpV2, this.VendorBranchEmpObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.mode = "edit";
          this.objInput.VendorEmpId = response.Id;
          this.objOutput.emit(response.Id);
          this.toastr.successMessage(response["Message"]);
          this.wizard.goToNextStep();
        });
    } else {
      this.VendorBranchEmpObj.VendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
      this.VendorBranchEmpObj.VendorAddrObj.VendorAddrId = this.resultVendorEmpAndAddr.VendorAddrObj.VendorAddrId;
      this.VendorBranchEmpObj.VendorEmpObj.RowVersion = this.resultVendorEmpAndAddr.VendorEmpObj.RowVersion;
      this.VendorBranchEmpObj.VendorAddrObj.RowVersion = this.resultVendorEmpAndAddr.VendorAddrObj.RowVersion;
      this.VendorBranchEmpObj.VendorEmpObj.TaxpayerNo = this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerNo;

      this.http.post(this.UrlConstantNew.EditVendorBranchEmpV2, this.VendorBranchEmpObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.wizard.goToNextStep();
        });
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
