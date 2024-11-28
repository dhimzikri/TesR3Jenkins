import { FormAddressService } from '@adins/ucform';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-self-custom-customer-emergency-contact',
  templateUrl: './self-custom-customer-emergency-contact.component.html'
})
export class SelfCustomCustomerEmergencyContactComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  pageName: string;

  Form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private formAddress:FormAddressService) {
    this.pageName = "EmergencyCntcPersonV2"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event),
    // afterSave: ($event) => this.onNext(),
  };

  callback(ev) {
    let row = ev.RowObj;
  }

  onFormCreate(fg: FormGroup)
  {
    this.Form = fg;

  }

  manageCbLookupManual(ev: any)
  {
    this.Form.get("MrGenderCode").enable();
    this.Form.get("MrIdTypeCode").enable();
    this.Form.get("BirthPlace").enable();
    this.Form.get("IdNo").enable();
    this.Form.get("BirthDt").enable();
    this.Form.get("IdExpiredDt").enable();
    this.Form.get("MobilePhnNo1").enable();
    this.Form.get("MobilePhnNo2").enable();
    this.Form.get("Email").enable();

    this.Form.patchValue({
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
    })

    this.Form.controls.UcAddress.patchValue({
      Addr: "",
      AreaCode1: "", 
      AreaCode2: "", 
      AreaCode3: "",
      AreaCode4: "",
      City: "",
      Phn1: "",
      Phn2: "",
      Phn3: "",
      PhnArea1: "",
      PhnArea2: "",
      PhnArea3: "",
      PhnExt1: "",
      PhnExt2: "",
      PhnExt3: "",
      Zipcode: ""
    })

    this.formAddress.GetInputAddressObj("UcAddress").isReadonly = false;
    this.formAddress.GetInputAddressObj("UcAddress").readonlyPhn1 = false;
    this.formAddress.GetInputAddressObj("UcAddress").readonlyPhn2 = false;
    this.formAddress.GetInputAddressObj("UcAddress").readonlyPhn3 = false;
    this.formAddress.GetInputAddressObj("UcAddress").readonlyPhnExt1 = false;
    this.formAddress.GetInputAddressObj("UcAddress").readonlyPhnExt2 = false;
    this.formAddress.GetInputAddressObj("UcAddress").readonlyPhnExt3 = false;

    this.formAddress.GetInputAddressObj("UcAddress").inputField.inputLookupObj.nameSelect = "";
    this.formAddress.GetInputAddressObj("UcAddress").inputField.inputLookupObj.isDisable = false;
    let temp = this.formAddress.GetInputAddressObj("UcAddress")
  }

  onNext(event) {
    this.next.emit(event);
  }

}
