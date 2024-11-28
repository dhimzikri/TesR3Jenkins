import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UpdateCustAddrObj } from 'app/shared/model/update-master-cust/update-cust-addr-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-customer-address',
  templateUrl: './update-customer-address.component.html',
  styles: []
})
export class UpdateCustomerAddressComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Input() SubjectType: string;
  @Output() ResponseTab: EventEmitter<any>;
  CustId: number;
  ZipcodeLookupObj: InputLookupObj;
  OwnershipList: Array<any>;
  ZipcodeLookupList: Array<InputLookupObj>;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  CustomerAddressForm = this.fb.group({
    AddressList: this.fb.array([])
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.ResponseTab = new EventEmitter<any>();
    this.OwnershipList = new Array<any>();
    this.ZipcodeLookupList = new Array<InputLookupObj>();
    this.ZipcodeLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.ZipcodeLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.isReady = false;
    // this.ZipcodeLookupObj.isRequired = false;
  }

  ngOnInit() {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeBuildingOwnership, MappingCode: null };
    let getOwnershipList = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReq);
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    let getDetail = this.http.post(this.UrlConstantNew.GetCustAddrDataForUpdateMasterCustAddr, this.ReqCustDataTrxIdObj);
    forkJoin([getDetail, getOwnershipList]).toPromise().then(
      (response) => {
        var responseAddr = response[0]["CustAddObjList"] as Array<any>;
        this.CustId = response[0]["CustId"];
        this.OwnershipList = response[1][CommonConstant.ReturnObj];
        var formArray = this.CustomerAddressForm.get("AddressList") as FormArray;
        for (const key in responseAddr) {
          var isAddrDifferent = false;
          if (responseAddr[key]["MasterCustAddr"]["Addr"] != responseAddr[key]["AppCustAddr"]["Addr"] ||
            responseAddr[key]["MasterCustAddr"]["AreaCode1"] != responseAddr[key]["AppCustAddr"]["AreaCode1"] ||
            responseAddr[key]["MasterCustAddr"]["AreaCode2"] != responseAddr[key]["AppCustAddr"]["AreaCode2"] ||
            responseAddr[key]["MasterCustAddr"]["AreaCode3"] != responseAddr[key]["AppCustAddr"]["AreaCode3"] ||
            responseAddr[key]["MasterCustAddr"]["AreaCode4"] != responseAddr[key]["AppCustAddr"]["AreaCode4"] ||
            responseAddr[key]["MasterCustAddr"]["Zipcode"] != responseAddr[key]["AppCustAddr"]["Zipcode"] ||
            responseAddr[key]["MasterCustAddr"]["City"] != responseAddr[key]["AppCustAddr"]["City"] ||
            responseAddr[key]["MasterCustAddr"]["PhnArea1"] != responseAddr[key]["AppCustAddr"]["PhnArea1"] ||
            responseAddr[key]["MasterCustAddr"]["Phn1"] != responseAddr[key]["AppCustAddr"]["Phn1"] ||
            responseAddr[key]["MasterCustAddr"]["PhnExt1"] != responseAddr[key]["AppCustAddr"]["PhnExt1"] ||
            responseAddr[key]["MasterCustAddr"]["PhnArea2"] != responseAddr[key]["AppCustAddr"]["PhnArea2"] ||
            responseAddr[key]["MasterCustAddr"]["Phn2"] != responseAddr[key]["AppCustAddr"]["Phn2"] ||
            responseAddr[key]["MasterCustAddr"]["PhnExt2"] != responseAddr[key]["AppCustAddr"]["PhnExt2"] ||
            responseAddr[key]["MasterCustAddr"]["PhnArea3"] != responseAddr[key]["AppCustAddr"]["PhnArea3"] ||
            responseAddr[key]["MasterCustAddr"]["Phn3"] != responseAddr[key]["AppCustAddr"]["Phn3"] ||
            responseAddr[key]["MasterCustAddr"]["PhnExt3"] != responseAddr[key]["AppCustAddr"]["PhnExt3"] ||
            responseAddr[key]["MasterCustAddr"]["Fax"] != responseAddr[key]["AppCustAddr"]["Fax"] ||
            responseAddr[key]["MasterCustAddr"]["FaxArea"] != responseAddr[key]["AppCustAddr"]["FaxArea"]) {
            isAddrDifferent = true;
          }
          var formGroup = this.fb.group({
            AddrType: key,
            IsAddrDifferent: isAddrDifferent,
            MasterAddr: this.fb.group({
              CustAddrId: [responseAddr[key]["MasterCustAddr"]["CustAddrId"]],
              CustId: [responseAddr[key]["MasterCustAddr"]["CustId"]],
              MrCustAddrTypeCode: [responseAddr[key]["MasterCustAddr"]["MrCustAddrTypeCode"]],
              Addr: [responseAddr[key]["MasterCustAddr"]["Addr"], [Validators.required]],
              AreaCode1: [responseAddr[key]["MasterCustAddr"]["AreaCode1"], [Validators.required]],
              AreaCode2: [responseAddr[key]["MasterCustAddr"]["AreaCode2"], [Validators.required]],
              AreaCode3: [responseAddr[key]["MasterCustAddr"]["AreaCode3"], [Validators.required, Validators.pattern("^[0-9]+$")]],
              AreaCode4: [responseAddr[key]["MasterCustAddr"]["AreaCode4"], [Validators.required, Validators.pattern("^[0-9]+$")]],
              City: [responseAddr[key]["MasterCustAddr"]["City"], [Validators.required]],
              Zipcode: [responseAddr[key]["MasterCustAddr"]["Zipcode"], [Validators.required]],
              SubZipcode: [responseAddr[key]["MasterCustAddr"]["SubZipcode"]],
              MrBuildingOwnershipCode: [responseAddr[key]["MasterCustAddr"]["MrBuildingOwnershipCode"]],
              PhnArea1: [responseAddr[key]["MasterCustAddr"]["PhnArea1"], [Validators.pattern("^[0-9]+$")]],
              Phn1: [responseAddr[key]["MasterCustAddr"]["Phn1"], [Validators.pattern("^[0-9]+$")]],
              PhnExt1: [responseAddr[key]["MasterCustAddr"]["PhnExt1"], [Validators.pattern("^[0-9]+$")]],
              PhnArea2: [responseAddr[key]["MasterCustAddr"]["PhnArea2"], [Validators.pattern("^[0-9]+$")]],
              Phn2: [responseAddr[key]["MasterCustAddr"]["Phn2"], [Validators.pattern("^[0-9]+$")]],
              PhnExt2: [responseAddr[key]["MasterCustAddr"]["PhnExt2"], [Validators.pattern("^[0-9]+$")]],
              PhnArea3: [responseAddr[key]["MasterCustAddr"]["PhnArea3"], [Validators.pattern("^[0-9]+$")]],
              Phn3: [responseAddr[key]["MasterCustAddr"]["Phn3"], [Validators.pattern("^[0-9]+$")]],
              PhnExt3: [responseAddr[key]["MasterCustAddr"]["PhnExt3"], [Validators.pattern("^[0-9]+$")]],
              FaxArea: [responseAddr[key]["MasterCustAddr"]["FaxArea"], [Validators.pattern("^[0-9]+$")]],
              Fax: [responseAddr[key]["MasterCustAddr"]["Fax"], [Validators.pattern("^[0-9]+$")]],
              Notes: [responseAddr[key]["MasterCustAddr"]["Notes"]],
              StayLength: [responseAddr[key]["MasterCustAddr"]["StayLength"], [Validators.pattern("^[0-9]+$")]],
              RowVersion: [responseAddr[key]["MasterCustAddr"]["RowVersion"]]
            }),
            AppAddr: this.fb.group({
              MrCustAddrTypeCode: [responseAddr[key]["AppCustAddr"]["MrCustAddrTypeCode"]],
              Addr: [responseAddr[key]["AppCustAddr"]["Addr"]],
              AreaCode1: [responseAddr[key]["AppCustAddr"]["AreaCode1"]],
              AreaCode2: [responseAddr[key]["AppCustAddr"]["AreaCode2"]],
              AreaCode3: [responseAddr[key]["AppCustAddr"]["AreaCode3"]],
              AreaCode4: [responseAddr[key]["AppCustAddr"]["AreaCode4"]],
              City: [responseAddr[key]["AppCustAddr"]["City"]],
              Zipcode: [responseAddr[key]["AppCustAddr"]["Zipcode"]],
              SubZipcode: [responseAddr[key]["AppCustAddr"]["SubZipcode"]],
              MrBuildingOwnershipCode: [responseAddr[key]["AppCustAddr"]["MrBuildingOwnershipCode"]],
              PhnArea1: [responseAddr[key]["AppCustAddr"]["PhnArea1"]],
              Phn1: [responseAddr[key]["AppCustAddr"]["Phn1"]],
              PhnExt1: [responseAddr[key]["AppCustAddr"]["PhnExt1"]],
              PhnArea2: [responseAddr[key]["AppCustAddr"]["PhnArea2"]],
              Phn2: [responseAddr[key]["AppCustAddr"]["Phn2"]],
              PhnExt2: [responseAddr[key]["AppCustAddr"]["PhnExt2"]],
              PhnArea3: [responseAddr[key]["AppCustAddr"]["PhnArea3"]],
              Phn3: [responseAddr[key]["AppCustAddr"]["Phn3"]],
              PhnExt3: [responseAddr[key]["AppCustAddr"]["PhnExt3"]],
              FaxArea: [responseAddr[key]["AppCustAddr"]["FaxArea"]],
              Fax: [responseAddr[key]["AppCustAddr"]["Fax"]],
              Notes: [responseAddr[key]["AppCustAddr"]["Notes"]],
              StayLength: [responseAddr[key]["AppCustAddr"]["StayLength"]]
            })
          });
          formArray.push(formGroup);

          let zipcodeObj = new InputLookupObj(this.UrlConstantNew)
          zipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
          zipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
          zipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
          zipcodeObj.isReady = false;

          zipcodeObj.nameSelect = responseAddr[key]["MasterCustAddr"]["Zipcode"];
          zipcodeObj.jsonSelect = { Zipcode: responseAddr[key]["MasterCustAddr"]["Zipcode"] };
          zipcodeObj.isReady = true;
          this.ZipcodeLookupList.push(zipcodeObj);
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  get AddressFormList() {
    return this.CustomerAddressForm.get("AddressList") as FormArray;
  }

  CopyAllHandler() {
    var formArray = this.CustomerAddressForm.get("AddressList") as FormArray;
    var idx = 0;
    for (const item of formArray.controls) {
      var appData = item.get("AppAddr").value;
      var formGroup = item.get("MasterAddr") as FormGroup;
      var obj = new Object();
      for (const key in appData) {
        if (key == "MrBuildingOwnershipCode") {
          if (appData[key]) {
            obj[key] = appData[key];
          }
          else {
            obj[key] = this.OwnershipList[0].Key;
          }
        }
        else {
          obj[key] = appData[key];
        }
      }
      formGroup.patchValue(obj);
      this.CustomerAddressForm.get("ZipcodeLookup_" + idx).patchValue({
        value: appData["Zipcode"]
      });
      item.patchValue({
        IsAddrDifferent: false
      });
      idx++;
    }
  }

  CopyHandler(formControlName, idx) {
    var formArray = this.CustomerAddressForm.get("AddressList") as FormArray;
    var formGroup = formArray.controls[idx] as FormGroup;
    var appData = formGroup.get("AppAddr").value;
    var masterData = formGroup.get("MasterAddr") as FormGroup;
    var obj = new Object();

    if (formControlName == "Addr") {
      masterData.patchValue({
        Addr: appData["Addr"],
        Zipcode: appData["Zipcode"],
        AreaCode1: appData["AreaCode1"],
        AreaCode2: appData["AreaCode2"],
        AreaCode3: appData["AreaCode3"],
        AreaCode4: appData["AreaCode4"],
        City: appData["City"],
        PhnArea1: appData["PhnArea1"],
        Phn1: appData["Phn1"],
        PhnExt1: appData["PhnExt1"],
        PhnArea2: appData["PhnArea2"],
        Phn2: appData["Phn2"],
        PhnExt2: appData["PhnExt2"],
        PhnArea3: appData["PhnArea3"],
        Phn3: appData["Phn3"],
        PhnExt3: appData["PhnExt3"],
        FaxArea: appData["FaxArea"],
        Fax: appData["Fax"]
      });
      this.CustomerAddressForm.get("ZipcodeLookup_" + idx).patchValue({
        value: appData["Zipcode"]
      });
      formGroup.patchValue({
        IsAddrDifferent: false
      });
    }
    else if (formControlName == "MrBuildingOwnershipCode") {
      if (appData["MrBuildingOwnershipCode"]) {
        masterData.patchValue({
          MrBuildingOwnershipCode: appData["MrBuildingOwnershipCode"]
        });
      }
      else {
        masterData.patchValue({
          MrBuildingOwnershipCode: this.OwnershipList[0].Key
        });
      }
    }
    else {
      obj[formControlName] = appData[formControlName];
      masterData.patchValue(obj);
    }
  }

  AddressCopyButtonHandler(idx) {
    var formArray = this.CustomerAddressForm.get("AddressList") as FormArray;
    var formGroup = formArray.controls[idx] as FormGroup;
    var masterCustAddr = formGroup.get("MasterAddr").value;
    var appAddr = formGroup.get("AppAddr").value;
    var isAddrDifferent = false;

    if (masterCustAddr["Addr"] != appAddr["Addr"] ||
      masterCustAddr["AreaCode1"] != appAddr["AreaCode1"] ||
      masterCustAddr["AreaCode2"] != appAddr["AreaCode2"] ||
      masterCustAddr["AreaCode3"] != appAddr["AreaCode3"] ||
      masterCustAddr["AreaCode4"] != appAddr["AreaCode4"] ||
      masterCustAddr["Zipcode"] != appAddr["Zipcode"] ||
      masterCustAddr["City"] != appAddr["City"] ||
      masterCustAddr["PhnArea1"] != appAddr["PhnArea1"] ||
      masterCustAddr["Phn1"] != appAddr["Phn1"] ||
      masterCustAddr["PhnExt1"] != appAddr["PhnExt1"] ||
      masterCustAddr["PhnArea2"] != appAddr["PhnArea2"] ||
      masterCustAddr["Phn2"] != appAddr["Phn2"] ||
      masterCustAddr["PhnExt2"] != appAddr["PhnExt2"] ||
      masterCustAddr["PhnArea3"] != appAddr["PhnArea3"] ||
      masterCustAddr["Phn3"] != appAddr["Phn3"] ||
      masterCustAddr["PhnExt3"] != appAddr["PhnExt3"] ||
      masterCustAddr["Fax"] != appAddr["Fax"] ||
      masterCustAddr["FaxArea"] != appAddr["FaxArea"]) {
      isAddrDifferent = true;
    }
    formGroup.patchValue({
      IsAddrDifferent: isAddrDifferent
    });
  }

  getZipcode(e, idx) {
    var formArray = this.CustomerAddressForm.get("AddressList") as FormArray;
    var formGroup = formArray.controls[idx] as FormGroup;
    var masterData = formGroup.get("MasterAddr") as FormGroup;
    masterData.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
    this.AddressCopyButtonHandler(idx);
  }

  back() {
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue() {
    var formArray = this.CustomerAddressForm.get("AddressList") as FormArray;
    var requestList = new Array<UpdateCustAddrObj>();
    for (const item of formArray.controls) {
      var masterData = new UpdateCustAddrObj();
      var currFormGroup = item.get("MasterAddr") as FormGroup;
      masterData = { ...currFormGroup.getRawValue() };
      masterData.CustId = this.CustId;
      if (!masterData.CustAddrId || masterData.CustAddrId <= 0) {
        masterData.MrCustAddrTypeCode = item.get("AddrType").value;
      }
      requestList.push(masterData);
    }
    this.http.post(this.UrlConstantNew.UpdateMasterCustAddr, { CustAddrList: requestList, CustId: this.CustId }, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
