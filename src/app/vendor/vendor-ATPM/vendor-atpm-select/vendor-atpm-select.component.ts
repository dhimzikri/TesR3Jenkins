import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { environment } from 'environments/environment';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-vendor-atpm-select',
  templateUrl: './vendor-atpm-select.component.html',
 // providers: [NGXToastrService]
})
export class VendorAtpmSelectComponent implements OnInit {

  inputLookupATPMObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  inputAddressObj: InputAddressObj = new InputAddressObj(this.UrlConstantNew);
  @Input() listExistingAtpmCode: Array<string> = new Array<string>();
  @Output() emitData: EventEmitter<object> = new EventEmitter();

  VendorAtpmForm = this.fb.group({
    VendorId: [''],
    VendorAtpmCode: ['', [Validators.required]],
    VendorName: [''],
    VendorLegalAddr: ['']
  });

  constructor(private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.setLookup();
    this.setUcAddress();
  }

  setUcAddress() {
    this.inputAddressObj.inputField.inputLookupObj.isDisable = true;
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.showAllPhn = false;
    this.inputAddressObj.isRequired = false;
    this.inputAddressObj.isReadonly = true;
  }
  setLookup() {
    this.inputLookupATPMObj.urlJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupATPMObj.pagingJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupATPMObj.genericJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupATPMObj.isRequired = false;
    this.inputLookupATPMObj.addCritInput = new Array();

    let critInput = new CriteriaObj();
    critInput.propName = "V.MR_VENDOR_CATEGORY_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = CommonConstant.SUPPLIER_ATPM;
    this.inputLookupATPMObj.addCritInput.push(critInput);

    if (this.listExistingAtpmCode.length > 0) {
      let critInput2 = new CriteriaObj();
      critInput2.DataType = "string";
      critInput2.propName = "V.VENDOR_CODE";
      critInput2.restriction = AdInsConstant.RestrictionNotIn;
      critInput2.listValue = this.listExistingAtpmCode;
      this.inputLookupATPMObj.addCritInput.push(critInput2);
    }

    this.inputLookupATPMObj.title = CommonConstant.TITLE_SUPPLIER_ATPM;
    this.inputLookupATPMObj.isReady = true;//Perlu tambain criteria yg uda kepilih ga muncul di lookup
  }

  getLookupATPM(ev) {
    this.VendorAtpmForm.patchValue({
      VendorId: ev.VendorId,
      VendorAtpmCode: ev.VendorCode,
      VendorName: ev.VendorName,
      VendorLegalAddr: ev.VendorLegalAddr
    });
    let AddressObj: UcAddressObj = new UcAddressObj();
    AddressObj.AreaCode1 = ev.VendorAreaCode1;
    AddressObj.AreaCode2 = ev.VendorAreaCode2;
    AddressObj.AreaCode3 = ev.VendorAreaCode3;
    AddressObj.AreaCode4 = ev.VendorAreaCode4;
    AddressObj.Addr = ev.VendorLegalAddr;
    AddressObj.City = ev.VendorCity;
    this.inputAddressObj.default = AddressObj;
    this.inputAddressObj.inputField.inputLookupObj.nameSelect = ev.VendorZipcode;
    this.inputAddressObj.inputField.inputLookupObj.jsonSelect = { Zipcode: ev.VendorZipcode };
  }

  Save(enjiForm) {
    let obj =
    {
      VendorId: this.VendorAtpmForm.controls.VendorId.value,
      VendorCode: this.VendorAtpmForm.controls.VendorAtpmCode.value,
      VendorName: this.VendorAtpmForm.controls.VendorName.value,
      LegalAddr: this.VendorAtpmForm.controls.VendorLegalAddr.value,
    }

    this.emitData.emit(obj);
    this.activeModal.close();
  }
}