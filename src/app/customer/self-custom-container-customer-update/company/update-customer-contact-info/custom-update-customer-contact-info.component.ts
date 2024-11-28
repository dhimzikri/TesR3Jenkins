import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UpdateCustContactInfoObj } from 'app/shared/model/update-master-cust/update-cust-contact-info-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-custom-update-customer-contact-info',
  templateUrl: './custom-update-customer-contact-info.component.html',
})
export class CustomUpdateCustomerContactInfoComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  AppContactInfo: UpdateCustContactInfoObj;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  ZipcodeLookupObj: InputLookupObj;
  JobPositionList: Array<any>;
  GenderList: Array<any>;
  IsAddrDifferent: boolean;
  appJobPosition: string;
  appGender: string;

  CustomerContactInfoForm = this.fb.group({
    CustCompanyContactPersonId: [0],
    CustCompanyId: [0],
    ContactPersonName: ['', [Validators.required]],
    MrJobPositionCode: ['', [Validators.required]],
    JobTitleName: ['', [Validators.required]],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    Email2: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    MrGenderCode: ['', [Validators.required]],
    CustAddrId: [0],
    CustId: [0],
    MrCustAddrTypeCode: [''],
    Addr: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    AreaCode4: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    City: ['', [Validators.required]],
    Zipcode: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    RowVersionContactInfo: [''],
    RowVersionContactInfoAddr: [''],
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.IsAddrDifferent = false;
    this.ResponseTab = new EventEmitter<any>();
    this.AppContactInfo = new UpdateCustContactInfoObj();
    this.ZipcodeLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.ZipcodeLookupObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.ZipcodeLookupObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

  ngOnInit() {
    let tempReqJob: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition, MappingCode: null };
    let tempReqGender: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender, MappingCode: null };
    let getJobPosition = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqJob);
    let getGender = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqGender);
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    let getDetail = this.http.post(this.UrlConstantNew.GetContactInfoForUpdateMasterCustCompanyContactInfo, this.ReqCustDataTrxIdObj);
    forkJoin([getDetail, getJobPosition, getGender]).toPromise().then(
      (response) => {
        this.AppContactInfo = response[0]["AppContactInfo"];
        this.JobPositionList = [...response[1][CommonConstant.ReturnObj]];
        this.GenderList = [...response[2][CommonConstant.ReturnObj]];
        this.CustomerContactInfoForm.patchValue({...response[0]["MasterContactInfo"]});
        this.ZipcodeLookupObj.nameSelect = response[0]["MasterContactInfo"]["Zipcode"];
        this.ZipcodeLookupObj.jsonSelect = { Zipcode: response[0]["MasterContactInfo"]["Zipcode"] };
        if(response[0]["MasterContactInfo"]["Addr"] != this.AppContactInfo["Addr"] ||
            response[0]["MasterContactInfo"]["AreaCode1"] != this.AppContactInfo["AreaCode1"] ||
            response[0]["MasterContactInfo"]["AreaCode2"] != this.AppContactInfo["AreaCode2"] ||
            response[0]["MasterContactInfo"]["AreaCode3"] != this.AppContactInfo["AreaCode3"] ||
            response[0]["MasterContactInfo"]["AreaCode4"] != this.AppContactInfo["AreaCode4"] ||
            response[0]["MasterContactInfo"]["Zipcode"] != this.AppContactInfo["Zipcode"] ||
            response[0]["MasterContactInfo"]["City"] != this.AppContactInfo["City"]){
          this.IsAddrDifferent = true;
        }

        this.appGender = this.GenderList.find(x => x.Key == this.AppContactInfo.MrGenderCode).Value;
        this.appJobPosition = this.JobPositionList.find(x => x.Key == this.AppContactInfo.MrJobPositionCode).Value;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getZipcode(e){
    this.CustomerContactInfoForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }

  CopyAllHandler(){
    var obj = new Object();
    for (const key in this.AppContactInfo) {
      if(key == "CustCompanyContactPersonId" || key == "CustCompanyId" || key == "RowVersionContactInfo" || key == "RowVersionContactInfoAddr" ||
         key == "CustId" || key == "CustAddrId"){
        continue;
      }
      else{
        if(key == "MrGenderCode"){
          if(this.AppContactInfo[key]){
            obj[key] = this.AppContactInfo[key];
          }
          else{
            obj[key] = this.GenderList[0].Key;
          }
        }
        else if(key == "MrJobPositionCode"){
          if(this.AppContactInfo[key]){
            obj[key] = this.AppContactInfo[key];
          }
          else{
            obj[key] = this.JobPositionList[0].Key;
          }
        }
        else{
          obj[key] = this.AppContactInfo[key];
        }
      }
    }
    this.CustomerContactInfoForm.patchValue(obj);
    this.CustomerContactInfoForm.get("ZipcodeLookup").patchValue({
      value: this.AppContactInfo.Zipcode
    });
    this.IsAddrDifferent = false;
  }

  CopyHandler(formControlName){
    if(formControlName == "Addr"){
      this.CustomerContactInfoForm.patchValue({
        Addr: this.AppContactInfo.Addr,
        AreaCode1: this.AppContactInfo.AreaCode1,
        AreaCode2: this.AppContactInfo.AreaCode2,
        AreaCode3: this.AppContactInfo.AreaCode3,
        AreaCode4: this.AppContactInfo.AreaCode4,
        City: this.AppContactInfo.City,
        Zipcode: this.AppContactInfo.Zipcode,
      });
      this.CustomerContactInfoForm.get("ZipcodeLookup").patchValue({
        value: this.AppContactInfo.Zipcode
      });
      this.IsAddrDifferent = false;
    }
    else if(formControlName == "MrGenderCode"){
      if(this.AppContactInfo["MrGenderCode"]){
        this.CustomerContactInfoForm.patchValue({
          MrGenderCode: this.AppContactInfo["MrGenderCode"]
        });
      }
      else{
        this.CustomerContactInfoForm.patchValue({
          MrGenderCode: this.GenderList[0].Key
        });
      }
    }
    else if(formControlName == "MrJobPositionCode"){
      if(this.AppContactInfo["MrJobPositionCode"]){
        this.CustomerContactInfoForm.patchValue({
          MrJobPositionCode: this.AppContactInfo["MrJobPositionCode"]
        });
      }
      else{
        this.CustomerContactInfoForm.patchValue({
          MrJobPositionCode: this.JobPositionList[0].Key
        });
      }
    }
    else{
      var obj = new Object();
      obj[formControlName] = this.AppContactInfo[formControlName];
      this.CustomerContactInfoForm.patchValue(obj);
    }
  }

  AddressCopyButtonHandler(){
    var masterCustForm = this.CustomerContactInfoForm.value;
    if(masterCustForm["Address"] != this.AppContactInfo["Address"] ||
        masterCustForm["AreaCode1"] != this.AppContactInfo["AreaCode1"] ||
        masterCustForm["AreaCode2"] != this.AppContactInfo["AreaCode2"] ||
        masterCustForm["AreaCode3"] != this.AppContactInfo["AreaCode3"] ||
        masterCustForm["AreaCode4"] != this.AppContactInfo["AreaCode4"] ||
        masterCustForm["Zipcode"] != this.AppContactInfo["Zipcode"] ||
        masterCustForm["City"] != this.AppContactInfo["City"]){
      this.IsAddrDifferent = true;
    }
    else{
      this.IsAddrDifferent = false;
    }
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue(){
    this.http.post(this.UrlConstantNew.UpdateMasterCustCompanyContactInfo, this.CustomerContactInfoForm.value, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
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

}
