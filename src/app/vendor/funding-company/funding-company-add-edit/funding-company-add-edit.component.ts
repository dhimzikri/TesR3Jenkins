import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { VendorFundingObj } from 'app/shared/model/response/vendor-funding-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { VendorAttrContentObj } from 'app/shared/model/vendor-attr-content-obj.model';
import { VendorBranchMainObj } from 'app/shared/model/vendor-branch-main-obj.model';
import { VendorBranchObj } from 'app/shared/model/vendor-branch-obj.model';
import { VendorContactPersonObj } from 'app/shared/model/vendor-contact-person-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';


@Component({
  selector: 'app-funding-company-add-edit',
  templateUrl: './funding-company-add-edit.component.html'
})
export class FundingCompanyAddEditComponent implements OnInit {

  ListVendorCPObj: Array<VendorContactPersonObj> = new Array<VendorContactPersonObj>();

  @Output() ParentMode: EventEmitter<object> = new EventEmitter();
  MrVendorCategoryCode: string = "JF_FUNDING_COMPANY";
  MrVendorTypeCode: string;
  arrCrit: any;
  mode: string = "add";
  vendorFundingCoyObj: any;
  vendorContactPersonObj: any;
  VendorId: number;
  result: any;
  resultAddr: any;


  isHidden: boolean = true;
  RsvField: string;
  Registration: string;
  Code: string;
  Name: string;
  VendorAttrList: any;
  ListInputLookUpObj = new Array<any>();
  vendorAttrRequest = new Array<VendorAttrContentObj>();
  isFormReady: boolean = false;
  reqVendorAttrObj: { listVendorAttrContentObj: any[]; };
  ListVendorAttrContent: any;
  gradeCode: String;
  vendorContactPerson: any[] = [];
  radioForm: any;
  responseApi: any;
  responseBank: any;
  isOnshore: any;
  jurisdictionValue: any;
  bankCountryCodeValue: any;
  countryResponse: any;
  countryCode1: any;
  countryCode2: any;
  VendorCode: any;

  FormUtama = this.fb.group({
    InputCode: ['', Validators.required],
    InputName: ['', [Validators.required]],
    IsActive: [false, [Validators.required]],
    Address:  ['', [Validators.required]]
  });

  constructor(  
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
      this.route.queryParams.subscribe(params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams["MrVendorCategoryCode"] != null) {
          this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
        }
        if(queryParams["VendorId"] != null){
          this.VendorId = queryParams['VendorId'];
        }

        if(queryParams["FundCoyCode"] != null){
          this.VendorCode = queryParams['FundCoyCode'];
        }

        if (queryParams['mode'] != null) {
          this.mode = queryParams['mode'];
        }

        console.log("ini vendor category code:", this.MrVendorCategoryCode)
      });
   
   }

   DictDDLVendorAttr: { [id: string]: Array<any> } = {};
   RadioButtonVendorAttr:  { [id: string]: Array<any> } = {};
  async ngOnInit() {
    if (this.mode == "edit") {
      this.FormUtama.controls.InputCode.disable();
      await this.getData();
    }

    this.http.post(URLConstant.GetListVendorAttrContentByVendorCode, { Code: this.VendorCode }).toPromise().then(
      (response) => {
        this.ListVendorAttrContent = response;
        if (this.ListVendorAttrContent != null) {
          if (this.ListVendorAttrContent.length < 1) {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http.post(URLConstant.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                console.log("ini response ref attr", response)
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                let tempLookup = {};
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    var item = this.ListVendorAttrContent.find(x => x.AttrCode == vendorAttr.AttrCode);
                    var formGroupObject = new Object();
                    formGroupObject["VendorAttrContentId"] = [0];
                    formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
                    if (vendorAttr["AttrInputType"] == 'T' && vendorAttr["IsMandatory"] == true) {
                      formGroupObject["VendorAttrValue"] = ['', Validators.required];
                    }
                    if (vendorAttr["AttrInputType"] == 'N'  && vendorAttr["IsMandatory"] == true) {
                      formGroupObject["VendorAttrValue"] = [0, Validators.required];
                    }
                    if (vendorAttr["AttrInputType"] == 'P') {
                      formGroupObject["VendorAttrValue"] = [0];
                    }
                    if (vendorAttr["AttrInputType"] == 'C') {
                      var temp = vendorAttr["AttrValue"].split(";");
                      this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[0]];
                    }

                    if (vendorAttr["AttrInputType"] == 'R') {
                      var temp = vendorAttr["AttrValue"].split(";");
                      this.RadioButtonVendorAttr[vendorAttr["AttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[1]];
                      this.radioForm = new FormGroup({
                        selectedOption: new FormControl(temp[0])
                      });
                    } 
                    else {
                      if(vendorAttr["IsMandatory"] == true){
                        formGroupObject["VendorAttrValue"] = ['', Validators.required];
                      }
                      
                    }

                    parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
  
                  if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'BANK_CODE') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
                        tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = true;
                      }

                      if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'MR_COUNTERPART_CATEGORY') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/lookup/lookupCounterpartCategory.json";
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/lookup/lookupCounterpartCategory.json";
                        tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/lookup/lookupCounterpartCategory.json";
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = true;
                      }
                  }
                  this.ListInputLookUpObj.push(tempLookup);
                  this.FormUtama.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              }
            );
          }
          else {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http.post(URLConstant.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    var item = this.ListVendorAttrContent.find(x => x.AttrCode == vendorAttr.AttrCode);
                    if (item == undefined) {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
  
                      if (vendorAttr["AttrInputType"] == 'C') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        const booleanValue = temp[0] === '1' ? true : false;
                        formGroupObject["VendorAttrValue"] = temp[0];
                        
                      } else {
                        formGroupObject["VendorAttrValue"] = [''];
                      }

                      if (vendorAttr["AttrInputType"] == 'R') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [temp[0]];
                      } else {
                        formGroupObject["VendorAttrValue"] = [''];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
  
                      if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'BANK_CODE') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var reqObjBank = {
                          rowVersion: "",
                          code: item["AttrContent"]
                        }
                        await this.http.post(URLConstant.GetRefBankByRefBankCodeAsync, reqObjBank).toPromise().then(
                          (response) => {
                            this.responseBank = response;
                            this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
                              (response) => {
                                this.countryResponse = response;
                                let splitCodeDesc = this.countryResponse.GsValue.split(';');
                                this.countryCode1 = splitCodeDesc[0];
                                this.countryCode2 = splitCodeDesc[1];
                                if(this.responseBank.BankCountryCode === this.countryCode1){
                                  this.jurisdictionValue = "ONSHORE"
                                }
                                else{
                                    this.jurisdictionValue = "OFFSHORE"
                                }
                              });
                            console.log("this is ref bank response", response)
                          });
                    
                      }

                      if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'MR_COUNTERPART_CATEGORY') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        console.log("ini attr value bank_code", vendorAttr["AttrCode"])
                       
                      }
                    }
                    else {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
  
                      if (vendorAttr["AttrInputType"] == 'T') {
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
             
                      else if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'BANK_CODE') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var reqObjBank = {
                          rowVersion: "",
                          code: item["AttrContent"]
                        }
                        await this.http.post(URLConstant.GetRefBankByRefBankCodeAsync, reqObjBank).toPromise().then(
                          (response) => {
                            this.responseBank = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = { BankName: this.responseBank.BankName }
                            this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
                              (response) => {
                                this.countryResponse = response;
                                let splitCodeDesc = this.countryResponse.GsValue.split(';');
                                this.countryCode1 = splitCodeDesc[0];
                                this.countryCode2 = splitCodeDesc[1];
                                if(this.responseBank.BankCountryCode === this.countryCode1){
                                  this.jurisdictionValue = "ONSHORE"
                                }
                                else{
                                    this.jurisdictionValue = "OFFSHORE"
                                }
                              });
                         
                          
                            console.log("this is ref bank response", response)
                            console.log(this.jurisdictionValue)
                          });
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'MR_COUNTERPART_CATEGORY') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var reqObjCntrprt = {
                          rowVersion: "",
                          code: item["AttrContent"]
                        }
                        await this.http.post(URLConstant.GetLbppmsCntrprtByLbppmsCntrprtCode, reqObjCntrprt).toPromise().then(
                          (response) => {
                            this.responseApi = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = { Descr: this.responseApi.Descr }
                            console.log("this is mr counterpart response", response)
                          });
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'L') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'C') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        const booleanValue = item["AttrContent"] === 'true' ? true : false;
                        formGroupObject["VendorAttrValue"] = booleanValue;
                      }
                      else if (vendorAttr["AttrInputType"] == 'R') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.RadioButtonVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else {
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                    }
                    parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                  }
  
                  this.ListInputLookUpObj.push(tempLookup);
                  this.FormUtama.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              });
          }
        }

      }
    );
  }

  async getData(){
    await this.http.post(URLConstant.GetVendorByVendorCode, { Code: this.VendorCode }).toPromise().then(
      async (response) => {
        this.result = response;
        this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
        this.FormUtama.patchValue({
          InputCode: this.result.VendorCode,
          InputName: this.result.VendorName,
          IsActive: this.result.IsActive,
        })
      })
      await this.http.post(URLConstant.GetVendorAddrByVendorCode, { Code: this.VendorCode }).toPromise().then(
        async (response) => {
          this.resultAddr = response;
          this.FormUtama.patchValue({
           Address: this.resultAddr.Addr
          })
        }
      )
  }
  

  addVendorContactPerson(contactPerson: any): void {
    this.vendorContactPerson = contactPerson;
    console.log("ini isi this.vendorCP di parent",this.vendorContactPerson);
    console.log("asascascas");
  }

  getLookUpAttrBank(e, VendorAttrCode) {
    this.FormUtama['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.BankCode
    });

    this.bankCountryCodeValue = e.BankCountryCode;
    if(this.bankCountryCodeValue === "INA"){
      this.jurisdictionValue = "ONSHORE"
    }
    else{
      this.jurisdictionValue = "OFFSHORE"
    }
 
    

  }

  getLookUpAttrCategory(e, VendorAttrCode) {
    this.FormUtama['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.LbppmsCntrprtCode
    });
    console.log("ini hasil event attr category", e.LbppmsCntrprtCode);
  }

  SaveForm(){
    if (this.FormUtama.valid) {
      const formValue = this.FormUtama['controls']['VendorAttrList'].value;

      if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
        const vendorAttrContent = Object.keys(formValue).map(key => ({
          attrCode: formValue[key].AttrCode,
          attrContent: formValue[key].VendorAttrValue
        }));

      const formDataAdd = {
        rowVersion: "",
        mrVendorCategoryCode: this.MrVendorCategoryCode,
        vendorCode: this.FormUtama.get('InputCode').value,
        vendorName: this.FormUtama.get('InputName').value,
        isActive: this.FormUtama.get('IsActive').value,
        address: this.FormUtama.get('Address').value,
        vendorAttrContent: vendorAttrContent,
        vendorContactPerson : this.vendorContactPerson
      } 
      console.log(formDataAdd)
      const formDataEdit = {
        rowVersion: "",
        mrVendorCategoryCode: this.MrVendorCategoryCode,
        vendorCode: this.FormUtama.get('InputCode').value,
        vendorName: this.FormUtama.get('InputName').value,
        isActive: this.FormUtama.get('IsActive').value,
        address: this.FormUtama.get('Address').value,
        vendorAttrContent: vendorAttrContent,
        vendorContactPerson : this.vendorContactPerson,
        vendorId: this.VendorId
      } 
      console.log(formDataEdit)
      if(this.mode == 'edit'){
        this.http.post<any>(URLConstant.EditVendorFundingCoy, formDataEdit).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
          });
      }
      else{
        this.http.post<any>(URLConstant.AddVendorFundingCoy, formDataAdd).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
          });
      }


  }
}
}

  back(){
    AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
  }
  addVendor(){
    if (this.FormUtama.valid) {
      const formValue = this.FormUtama['controls']['VendorAttrList'].value;

      if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
        const vendorAttrContent = Object.keys(formValue).map(key => ({
          VendorId: this.VendorId,
          AttrCode: formValue[key].AttrCode,
          AttrContent: formValue[key].VendorAttrValue
        }));

        this.vendorFundingCoyObj = new VendorFundingObj();
        this.vendorFundingCoyObj.VendorFundCoyObj = new VendorObj();
        this.vendorFundingCoyObj.VendorFundCoyAddrObj = new VendorAddrObj();
        this.vendorFundingCoyObj.VendorAttrContent = new Array<VendorAttrContentObj>();
        this.vendorFundingCoyObj.VendorContactPerson = new Array<VendorContactPersonObj>();
    
        this.vendorFundingCoyObj.VendorFundCoyObj.MrVendorCategoryCode = this.MrVendorCategoryCode;
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorCode = this.FormUtama.controls.InputCode.value;
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorName = this.FormUtama.controls.InputName.value;
        this.vendorFundingCoyObj.VendorFundCoyObj.IsActive = this.FormUtama.controls.IsActive.value;
        this.vendorFundingCoyObj.VendorFundCoyAddrObj.Addr = this.FormUtama.controls.Address.value;
        this.vendorFundingCoyObj.VendorAttrContent = vendorAttrContent;
        this.vendorFundingCoyObj.VendorContactPerson = this.vendorContactPerson;


  
     
     
     
      if(this.mode == 'edit'){
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorId = this.VendorId;
        this.vendorFundingCoyObj.VendorFundCoyAddrObj.VendorAddrId = this.resultAddr.VendorAddrId;
        this.vendorFundingCoyObj.VendorFundCoyAddrObj.VendorId = this.VendorId;
        this.vendorFundingCoyObj.VendorFundCoyAddrObj.RowVersion = this.resultAddr.RowVersion;
        this.vendorFundingCoyObj.VendorFundCoyObj.RowVersion = this.result.RowVersion;
      
        
        const formDataEdit = {
          rowVersion: "",
          VendorFundCoyObj: this.vendorFundingCoyObj.VendorFundCoyObj,
          VendorFundCoyAddrObj: this.vendorFundingCoyObj.VendorFundCoyAddrObj,
          VendorAttrContent: vendorAttrContent,
          VendorContactPerson : this.vendorContactPerson
        } 
        console.log("ini isi form data edit", formDataEdit)
        this.http.post(URLConstant.EditVendorFundingCoy, formDataEdit).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
          });
      }
      else{
        const formDataAdd = {
          rowVersion: "",
          vendorFundCoyObj: this.vendorFundingCoyObj.VendorFundCoyObj,
          vendorFundCoyAddrObj: this.vendorFundingCoyObj.VendorFundCoyAddrObj,
          vendorAttrContent: vendorAttrContent,
          vendorContactPerson : this.vendorContactPerson
        } 
        console.log(this.vendorFundingCoyObj.value);
        this.http.post<any>(URLConstant.AddVendorFundingCoy, formDataAdd,  AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
          });
      }


  }
}   
}

  ChangeCallbackSwitch(formName, $event:boolean){
    this.FormUtama.get(formName).setValue($event);
    console.log(formName ,this.FormUtama.get(formName).value);
  }

}
