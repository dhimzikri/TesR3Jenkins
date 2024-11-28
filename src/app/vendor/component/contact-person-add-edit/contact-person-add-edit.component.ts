import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorContactPersonObj } from 'app/shared/model/vendor-contact-person-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-contact-person-add-edit',
  templateUrl: './contact-person-add-edit.component.html',
  styleUrls: ['./contact-person-add-edit.component.scss']
})
export class ContactPersonAddEditComponent implements OnInit {
  @Input() objInput: any;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean = false;
  mode: string;
  businessDt: Date;

  title: string = "Contact Person Main Info";
  title2: string = "Contact Person Address Info";
  ContactPersonForm = this.fb.group({
    Name: ['', Validators.required],
    JobPosition: ['', Validators.required],
    Phn1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Phn2: ['', Validators.pattern("^[0-9]+$")],
    Email: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    JoinDt: ['', Validators.required],
    IsOwner: [false],
    Addr: [''],
    AreaCode2: [{ value: '', disabled: true }],
    AreaCode1: [{ value: '', disabled: true }],
    City: [{ value: '', disabled: true }],
    ProvDistrictName: [{ value: '', disabled: true }]
  })
  inputZipcodeLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);

  contactPersonObj: VendorContactPersonObj;

  itemJobPosition: any;
  VendorContactPersonId: any;
  result: any;
  zipcode: any;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) {
  
  }

  async ngOnInit() {
    this.mode = this.objInput["mode"];
    this.VendorContactPersonId = this.objInput["VendorContactPersonId"];

    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);

    var JobPosition: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition,
      MappingCode: null
    };
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, JobPosition).subscribe(
      (response) => {
        this.itemJobPosition = response[CommonConstant.ReturnObj];
        this.ContactPersonForm.patchValue({
          JobPosition: this.itemJobPosition[0].Key
        });
      }
    )

    this.inputZipcodeLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputZipcodeLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputZipcodeLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputZipcodeLookupObj.isReadonly = false;
    this.inputZipcodeLookupObj.isRequired = false;

    if (this.mode == "edit") {
      var contactPerson = new VendorContactPersonObj();
      contactPerson.VendorContactPersonId = this.VendorContactPersonId;
      await this.http.post(this.UrlConstantNew.GetVendorContactPersonById, {Id : this.VendorContactPersonId}).toPromise().then(
        (response) => {
          this.result = response;
          this.ContactPersonForm.patchValue({
            Name: this.result.Name,
            JobPosition: this.result.MrEmployeePosition,
            Phn1: this.result.Phone1,
            Phn2: this.result.Phone2,
            Email: this.result.Email,
            JoinDt: formatDate(this.result.JoinDate, 'yyyy-MM-dd', 'en-US'),
            IsOwner: this.result.IsOwner,
            Addr: this.result.Addr,
            AreaCode1: this.result.AreaCode1,
            AreaCode2: this.result.AreaCode2,
            City: this.result.City,
            ProvDistrictName: this.result.Province,
            RowVersion: this.result.RowVersion
          })
          this.inputZipcodeLookupObj.jsonSelect = { Zipcode: this.result.Zipcode };
          this.zipcode = this.result.Zipcode;
          this.inputZipcodeLookupObj.isReadonly = false;
        }
      );
    }
    this.inputZipcodeLookupObj.isReady = true;
  }

  getEmpData(ev) {
    this.ContactPersonForm.patchValue({
      EmpName: ev.EmpName,
      Phn1: ev.Phn1,
      Phn2: ev.Phn2,
      Email: ev.Email,
      JoinDt: formatDate(ev.JoinDt, 'yyyy-MM-dd', 'en-US'),
    })
  }

  getZipcode(ev : string){
    this.http.post(this.UrlConstantNew.GetZipcodeDataByZipCode, {Zipcode : ev}).toPromise().then(
      (response)=>{
          this.ContactPersonForm.patchValue({
            AreaCode1: response["AreaCode1"],
            AreaCode2: response["AreaCode2"],
            City: response["City"],
            ProvDistrictName: response["ProvDistrictName"],
            Zipcode: response["Zipcode"]
          });
          this.zipcode = response["Zipcode"];
          this.inputZipcodeLookupObj.nameSelect = response["Zipcode"];
          this.inputZipcodeLookupObj.idSelect = response["Zipcode"];
      }
    )
  }

  getZipcodeData(ev) {
    this.ContactPersonForm.patchValue({
      AreaCode1: ev.AreaCode1,
      AreaCode2: ev.AreaCode2,
      City: ev.City,
      ProvDistrictName: ev.Province,

    })
    this.zipcode = ev.Zipcode;
  }

  validateDate() {
    let date = new Date(this.ContactPersonForm.controls.JoinDt.value);
    let localDt = this.convertToMMddyyyy(date);
    let localBizDt = this.convertToMMddyyyy(this.businessDt)
    if(localDt > localBizDt) {
      this.toastr.warningMessage("Join Date Cannot Exceed Business Date");
      this.ContactPersonForm.patchValue({
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
    if (this.mode == "edit") {
      this.contactPersonObj = new VendorContactPersonObj();
      this.contactPersonObj.VendorContactPersonId = this.VendorContactPersonId;
      this.contactPersonObj.VendorId = this.objInput["VendorId"];
      this.contactPersonObj.Name = this.ContactPersonForm.controls.Name.value;
      this.contactPersonObj.MrEmployeePosition = this.ContactPersonForm.controls.JobPosition.value;
      this.contactPersonObj.Email = this.ContactPersonForm.controls.Email.value;
      this.contactPersonObj.Phone1 = this.ContactPersonForm.controls.Phn1.value;
      this.contactPersonObj.Phone2 = this.ContactPersonForm.controls.Phn2.value;
      this.contactPersonObj.JoinDate = this.ContactPersonForm.controls.JoinDt.value;
      this.contactPersonObj.IsOwner = this.ContactPersonForm.controls.IsOwner.value;
      this.contactPersonObj.Addr = this.ContactPersonForm.controls.Addr.value;
      this.contactPersonObj.AreaCode1 = this.ContactPersonForm.controls.AreaCode1.value;
      this.contactPersonObj.AreaCode2 = this.ContactPersonForm.controls.AreaCode2.value;
      this.contactPersonObj.City = this.ContactPersonForm.controls.City.value;
      this.contactPersonObj.Province = this.ContactPersonForm.controls.ProvDistrictName.value;
      this.contactPersonObj.Zipcode = this.zipcode;
      this.contactPersonObj.RowVersion = this.result.RowVersion;
      
      this.http.post(this.UrlConstantNew.EditVendorContactPerson, this.contactPersonObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.HiddenCheck();
          this.toastr.successMessage(response['message']);
        });
    }
    else {
      this.contactPersonObj = new VendorContactPersonObj();
      this.contactPersonObj.Name = this.ContactPersonForm.controls.Name.value;
      this.contactPersonObj.MrEmployeePosition = this.ContactPersonForm.controls.JobPosition.value;
      this.contactPersonObj.VendorId = this.objInput["VendorId"];
      this.contactPersonObj.Email = this.ContactPersonForm.controls.Email.value;
      this.contactPersonObj.Phone1 = this.ContactPersonForm.controls.Phn1.value;
      this.contactPersonObj.Phone2 = this.ContactPersonForm.controls.Phn2.value;
      this.contactPersonObj.JoinDate = this.ContactPersonForm.controls.JoinDt.value;
      this.contactPersonObj.IsOwner = this.ContactPersonForm.controls.IsOwner.value;
      this.contactPersonObj.Addr = this.ContactPersonForm.controls.Addr.value;
      this.contactPersonObj.AreaCode1 = this.ContactPersonForm.controls.AreaCode1.value;
      this.contactPersonObj.AreaCode2 = this.ContactPersonForm.controls.AreaCode2.value;
      this.contactPersonObj.City = this.ContactPersonForm.controls.City.value;
      this.contactPersonObj.Province = this.ContactPersonForm.controls.ProvDistrictName.value;
      this.contactPersonObj.Zipcode = this.zipcode;

      this.contactPersonObj.VendorContactPersonId = 0;
      this.contactPersonObj.RowVersion = "";
      this.http.post(this.UrlConstantNew.AddVendorContactPerson, this.contactPersonObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
        this.toastr.successMessage(response['message']);
        this.HiddenCheck();
      });
    }
  }

  HiddenCheck() {
    var obj = {
      HiddenState: true
    }
    this.objOutput.emit(obj);
  }
}
