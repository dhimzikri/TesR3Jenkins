import { DatePipe } from '@angular/common';
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
import { UpdateMasterCustJobDataObj } from 'app/shared/model/update-master-cust/update-master-cust-job-data-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-customer-job-data',
  templateUrl: './update-customer-job-data.component.html',
  styles: []
})
export class UpdateCustomerJobDataComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppJobData: UpdateMasterCustJobDataObj;
  ReqCustDataTrxIdObj: GenericObj = new GenericObj();
  CustModelList: Array<any>;
  JobPositionList: Array<any>;
  JobStatusList: Array<any>;
  CompanyScaleList: Array<any>;
  lookupProfessionObj: InputLookupObj;
  lookupIndustryTypeObj: InputLookupObj;
  lookupZipcodeObj: InputLookupObj;
  IsAddrDifferent: boolean;
  appCustModel: string;
  appJobPosition: string;
  appJobStatus: string;
  appCompanyScale: string;

  CustomerJobForm = this.fb.group({
    CustJobDataId: [0],
    CustId: [0],
    CustModel: ['', [Validators.required]],
    ProfessionId: [0, [Validators.required]],
    InternalEmployee: [false],
    JobPosition: [''],
    JobTitleName: [''],
    JobStatus: [''],
    EstablishmentDate: [''],
    CompanyName: [''],
    IndustryTypeId: [0, [Validators.required]],
    CompanyScale: [''],
    NumOfEmployee: [''],
    Address: ['', [Validators.required]],
    Zipcode: ['', [Validators.required]],
    AreaCode1: ['', [Validators.required]],
    AreaCode2: ['', [Validators.required]],
    AreaCode3: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    AreaCode4: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    City: ['', [Validators.required]],
    Phn1: ['', Validators.pattern("^[0-9]+$")],
    Phn2: ['', Validators.pattern("^[0-9]+$")],
    Fax: ['', Validators.pattern("^[0-9]+$")],
    RowVersionCustJobData: [''],
    RowVersionJobAddr: [''],
    RowVersionCust: ['']
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.IsAddrDifferent = false;
    this.AppJobData = new UpdateMasterCustJobDataObj();
    this.CustModelList = new Array<any>();
    this.JobPositionList = new Array<any>();
    this.JobStatusList = new Array<any>();
    this.CompanyScaleList = new Array<any>();
    this.ResponseTab = new EventEmitter<any>();

    this.lookupIndustryTypeObj = new InputLookupObj(this.UrlConstantNew);
    this.lookupIndustryTypeObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookupIndustryTypeObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookupIndustryTypeObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    // this.lookupIndustryTypeObj.isRequired = false;

    this.lookupProfessionObj = new InputLookupObj(this.UrlConstantNew);
    this.lookupProfessionObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.lookupProfessionObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.lookupProfessionObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
    // this.lookupProfessionObj.isRequired = false;

    this.lookupZipcodeObj = new InputLookupObj(this.UrlConstantNew);
    this.lookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.lookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    // this.lookupZipcodeObj.isRequired = false;
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.ReqCustDataTrxIdObj.Id = this.CustDataTrxId;
    let getDetail = this.http.post(this.UrlConstantNew.GetCustJobDataForUpdateMasterCustJobData, this.ReqCustDataTrxIdObj);
    let tempReqCustModel: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustModel, MappingCode: null };
    let getCustModel = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqCustModel);

    let tempReqJobPos: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobPosition, MappingCode: null };
    let getJobPosition = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqJobPos);

    let tempReqJobStat: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeJobStat, MappingCode: null };
    let getJobStatus = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqJobStat);

    let tempReqCompanyScale: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCoyScale, MappingCode: null };
    let getCompanyScale = this.http.post(this.UrlConstantNew.GetListActiveRefMaster, tempReqCompanyScale);
    forkJoin([getDetail, getCustModel, getJobPosition, getJobStatus, getCompanyScale]).pipe(
      map((response) => {
        this.AppJobData = response[0]["AppCustJobData"];
        this.CustModelList = response[1][CommonConstant.ReturnObj];
        this.JobPositionList = response[2][CommonConstant.ReturnObj];
        this.JobStatusList = response[3][CommonConstant.ReturnObj];
        this.CompanyScaleList = response[4][CommonConstant.ReturnObj];
        if (response[0]["MasterCustJobData"]["EstablishmentDate"]) {
          response[0]["MasterCustJobData"]["EstablishmentDate"] = datePipe.transform(response[0]["MasterCustJobData"]["EstablishmentDate"], "yyyy-MM-dd");
        }
        if (this.AppJobData["EstablishmentDate"]) {
          this.AppJobData["EstablishmentDate"] = datePipe.transform(this.AppJobData["EstablishmentDate"], "yyyy-MM-dd");
        }
        this.CustomerJobForm.patchValue({ ...response[0]["MasterCustJobData"] });
        this.lookupZipcodeObj.nameSelect = response[0]["MasterCustJobData"]["Zipcode"];
        this.lookupZipcodeObj.jsonSelect = { Zipcode: response[0]["MasterCustJobData"]["Zipcode"] };

        if (response[0]["MasterCustJobData"]["Address"] != this.AppJobData["Address"] ||
          response[0]["MasterCustJobData"]["AreaCode1"] != this.AppJobData["AreaCode1"] ||
          response[0]["MasterCustJobData"]["AreaCode2"] != this.AppJobData["AreaCode2"] ||
          response[0]["MasterCustJobData"]["AreaCode3"] != this.AppJobData["AreaCode3"] ||
          response[0]["MasterCustJobData"]["AreaCode4"] != this.AppJobData["AreaCode4"] ||
          response[0]["MasterCustJobData"]["Zipcode"] != this.AppJobData["Zipcode"] ||
          response[0]["MasterCustJobData"]["City"] != this.AppJobData["City"]) {
          this.IsAddrDifferent = true;
        }
        return response[0];
      }),
      mergeMap((response) => {
        let getAppProfession = this.http.post(this.UrlConstantNew.GetRefProfessionByRefProfessionId, { Id: response["AppCustJobData"]["ProfessionId"] });
        let getMasterProfession = this.http.post(this.UrlConstantNew.GetRefProfessionByRefProfessionId, { Id: response["MasterCustJobData"]["ProfessionId"] });
        let getAppIndustry = this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: response["AppCustJobData"]["IndustryTypeId"] });
        let getMasterIndustry = this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: response["MasterCustJobData"]["IndustryTypeId"] });
        return forkJoin([getMasterProfession, getMasterIndustry, getAppProfession, getAppIndustry]);
      })
    ).toPromise().then(
      (response) => {
        this.lookupProfessionObj.nameSelect = response[0]["ProfessionName"];
        this.lookupProfessionObj.jsonSelect = { ProfessionName: response[0]["ProfessionName"] }
        this.lookupIndustryTypeObj.nameSelect = response[1]["IndustryTypeName"];
        this.lookupIndustryTypeObj.jsonSelect = { IndustryTypeName: response[1]["IndustryTypeName"] };
        this.AppJobData.ProfessionName = response[2]["ProfessionName"];
        this.AppJobData.IndustryTypeName = response[3]["IndustryTypeName"];

        this.appCompanyScale = this.CompanyScaleList.find(x => x.Key == this.AppJobData.CompanyScale).Value;
        this.appCustModel = this.CustModelList.find(x => x.Key == this.AppJobData.CustModel).Value;
        this.appJobPosition = this.JobPositionList.find(x => x.Key == this.AppJobData.JobPosition).Value;
        this.appJobStatus = this.JobStatusList.find(x => x.Key == this.AppJobData.JobStatus).Value;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getProfessionData(e) {
    this.CustomerJobForm.patchValue({
      ProfessionId: e.RefProfessionId
    });
  }

  getIndustryType(e) {
    this.CustomerJobForm.patchValue({
      IndustryTypeId: e.RefIndustryTypeId
    });
  }

  getZipcodeData(e) {
    this.CustomerJobForm.patchValue({
      Zipcode: e.Zipcode,
      AreaCode1: e.AreaCode1,
      AreaCode2: e.AreaCode2,
      City: e.City
    });
  }

  CopyAllHandler() {
    var obj = new Object();
    for (const key in this.AppJobData) {
      if (key == "CustJobDataId" || key == "CustId" || key == "RowVersionCustJobData" || key == "RowVersionJobAddr" ||
        key == "RowVersionCust" || key == "ProfessionName" || key == "IndustryTypeName") {
        continue;
      }
      else {
        if (key == "CompanyScale") {
          if (this.AppJobData[key]) {
            obj[key] = this.AppJobData[key];
          }
          else {
            obj[key] = this.CompanyScaleList[0].Key;
          }
        }
        else if (key == "CustModel") {
          if (this.AppJobData[key]) {
            obj[key] = this.AppJobData[key];
          }
          else {
            obj[key] = this.CustModelList[0].Key;
          }
        }
        else if (key == "JobPosition") {
          if (this.AppJobData[key]) {
            obj[key] = this.AppJobData[key];
          }
          else {
            obj[key] = this.JobPositionList[0].Key;
          }
        }
        else if (key == "JobStatus") {
          if (this.AppJobData[key]) {
            obj[key] = this.AppJobData[key];
          }
          else {
            obj[key] = this.JobStatusList[0].Key;
          }
        }
        else {
          obj[key] = this.AppJobData[key];
        }
      }
    }
    this.CustomerJobForm.patchValue(obj);
    this.CustomerJobForm.get("ZipcodeLookup").patchValue({
      value: this.AppJobData.Zipcode
    });
    this.CustomerJobForm.get("ProfessionLookup").patchValue({
      value: this.AppJobData.ProfessionName
    });
    this.CustomerJobForm.get("IndustryTypeLookup").patchValue({
      value: this.AppJobData.IndustryTypeName
    });
    this.IsAddrDifferent = false;
  }

  CopyHandler(formControlName) {
    if (formControlName == "Address") {
      this.CustomerJobForm.patchValue({
        Address: this.AppJobData.Address,
        Zipcode: this.AppJobData.Zipcode,
        AreaCode1: this.AppJobData.AreaCode1,
        AreaCode2: this.AppJobData.AreaCode2,
        AreaCode3: this.AppJobData.AreaCode3,
        AreaCode4: this.AppJobData.AreaCode4,
        City: this.AppJobData.City,
        Phn1: this.AppJobData.Phn1,
        Phn2: this.AppJobData.Phn2,
        Fax: this.AppJobData.Fax
      });
      this.CustomerJobForm.get("ZipcodeLookup").patchValue({
        value: this.AppJobData.Zipcode
      });
      this.IsAddrDifferent = false;
    }
    else if (formControlName == "CompanyScale") {
      if (this.AppJobData[formControlName]) {
        this.CustomerJobForm.patchValue({
          CompanyScale: this.AppJobData["CompanyScale"]
        });
      }
      else {
        this.CustomerJobForm.patchValue({
          CompanyScale: this.CompanyScaleList[0].Key
        });
      }
    }
    else if (formControlName == "CustModel") {
      if (this.AppJobData[formControlName]) {
        this.CustomerJobForm.patchValue({
          CustModel: this.AppJobData["CustModel"]
        });
      }
      else {
        this.CustomerJobForm.patchValue({
          CustModel: this.CustModelList[0].Key
        });
      }
    }
    else if (formControlName == "JobPosition") {
      if (this.AppJobData[formControlName]) {
        this.CustomerJobForm.patchValue({
          JobPosition: this.AppJobData["JobPosition"]
        });
      }
      else {
        this.CustomerJobForm.patchValue({
          JobPosition: this.JobPositionList[0].Key
        });
      }
    }
    else if (formControlName == "JobStatus") {
      if (this.AppJobData[formControlName]) {
        this.CustomerJobForm.patchValue({
          JobStatus: this.AppJobData["JobStatus"]
        });
      }
      else {
        this.CustomerJobForm.patchValue({
          JobStatus: this.JobStatusList[0].Key
        });
      }
    }
    else {
      var obj = new Object();
      obj[formControlName] = this.AppJobData[formControlName];
      this.CustomerJobForm.patchValue(obj);

      if (formControlName == "IndustryTypeId") {
        this.CustomerJobForm.get("IndustryTypeLookup").patchValue({
          value: this.AppJobData.IndustryTypeName
        });
      }
      else if (formControlName == "ProfessionId") {
        this.CustomerJobForm.get("ProfessionLookup").patchValue({
          value: this.AppJobData.ProfessionName
        });
      }
    }
  }

  AddressCopyButtonHandler() {
    var masterCustForm = this.CustomerJobForm.value;
    if (masterCustForm["Address"] != this.AppJobData["Address"] ||
      masterCustForm["AreaCode1"] != this.AppJobData["AreaCode1"] ||
      masterCustForm["AreaCode2"] != this.AppJobData["AreaCode2"] ||
      masterCustForm["AreaCode3"] != this.AppJobData["AreaCode3"] ||
      masterCustForm["AreaCode4"] != this.AppJobData["AreaCode4"] ||
      masterCustForm["Zipcode"] != this.AppJobData["Zipcode"] ||
      masterCustForm["City"] != this.AppJobData["City"] ||
      masterCustForm["Phn1"] != this.AppJobData["Phn1"] ||
      masterCustForm["Phn2"] != this.AppJobData["Phn2"] ||
      masterCustForm["Fax"] != this.AppJobData["Fax"]) {
      this.IsAddrDifferent = true;
    }
    else {
      this.IsAddrDifferent = false;
    }
  }

  back() {
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
  }

  SaveValue() {
    this.http.post(this.UrlConstantNew.UpdateMasterCustJobData, this.CustomerJobForm.value, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

}
