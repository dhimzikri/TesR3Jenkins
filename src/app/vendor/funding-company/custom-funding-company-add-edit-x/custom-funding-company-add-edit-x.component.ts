import { NgxRouterService } from '@adins/fe-core';
import { UcTemplateService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { VendorFundingObj } from 'app/shared/model/response/vendor-funding-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { VendorAttrContentObj } from 'app/shared/model/vendor-attr-content-obj.model';
import { VendorContactPersonObj } from 'app/shared/model/vendor-contact-person-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { resGetListVendorAttr } from 'app/shared/model/vendor/res-get-list-vendor-attr.model';

@Component({
  selector: 'app-custom-funding-company-add-edit-x',
  templateUrl: './custom-funding-company-add-edit-x.component.html'
})
export class CustomFundingCompanyAddEditXComponent implements OnInit {

  ListVendorCPObj: Array<VendorContactPersonObj> = new Array<VendorContactPersonObj>();

  // @Input() MrVendorCategoryCode: string;
  @Input() parentForm: FormGroup;

  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  @Output() ParentMode: EventEmitter<object> = new EventEmitter();
  enjiForm: NgForm;

  //MrVendorCategoryCode: string = "JF_FUNDING_COMPANY";
  MrVendorCategoryCode: string;
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
  vendorAttr: any[] = [];
  radioForm: any;
  responseApi: any;
  responseBank: any;
  responseZipcode: any;
  isOnshore: any;
  jurisdictionValue: any;
  bankCountryCodeValue: any;
  countryResponse: any;
  countryCode1: any;
  countryCode2: any;
  VendorCode: any;
  Params:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ngxRouter: NgxRouterService,
    private toastr: NGXToastrService,
    private UrlConstantNew: UrlConstantNew,
    private ucTemplateSvc: UcTemplateService) {

      this.route.queryParams.subscribe(params => {
        this.Params = this.ngxRouter.getQueryParams(params);
      })

     
      if (this.Params['MrVendorCategoryCode'] != null) {
        this.MrVendorCategoryCode = this.Params['MrVendorCategoryCode'];
      }
      if (this.Params["VendorId"] != null) {
        this.VendorId = this.Params['VendorId'];
      }

      if (this.Params["FundCoyCode"] != null) {
        this.VendorCode = this.Params['FundCoyCode'];
      }

      if (this.Params['mode'] != null) {
        this.mode = this.Params['mode'];
      }
  }

  DictDDLVendorAttr: { [id: string]: Array<any> } = {};
  RadioButtonVendorAttr: { [id: string]: Array<any> } = {};
  async ngOnInit() {
    this.enjiForm = this.ucTemplateSvc.container.getEnjiForm();
    
    if (this.mode == "edit") {
      await this.getData();
    }

    this.http.post<resGetListVendorAttr>(this.UrlConstantNew.GetListVendorAttrContentByVendorCode, { Code: this.VendorCode }).toPromise().then(
      (response) => {
        this.ListVendorAttrContent = response.ListVendorAttrContent;
        if (this.ListVendorAttrContent != null) {
          console.log(this.ListVendorAttrContent.length)
          if (this.ListVendorAttrContent.length < 1) {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                let tempLookup = {};
                if (this.VendorAttrList != null) {
                  for (const vendorAttr of this.VendorAttrList) {

                    var item = this.ListVendorAttrContent.find(x => x.AttrCode == vendorAttr.AttrCode);
                    var formGroupObject = new Object();
                    formGroupObject["VendorAttrContentId"] = [0];
                    formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
                    if (
                      vendorAttr["AttrInputType"] == "T" &&
                      vendorAttr["IsMandatory"] == true
                    ) {
                      formGroupObject["VendorAttrValue"] = [
                        "",
                        Validators.required,
                      ];
                    }
                    if (vendorAttr["AttrInputType"] == "P") {
                      formGroupObject["VendorAttrValue"] = [0,Validators.min(0)];
                    }
                    if (vendorAttr["AttrInputType"] == "C") {
                      var temp = vendorAttr["AttrValue"].split(";");
                      this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[0]];
                    }

                    if (vendorAttr["AttrInputType"] == "R") {
                      var temp = vendorAttr["AttrValue"].split(";");
                      this.RadioButtonVendorAttr[vendorAttr["AttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[1]];
                      this.radioForm = new FormGroup({
                        selectedOption: new FormControl(temp[0]),
                      });
                    }
                    if(vendorAttr["AttrInputType"] == "N"){
                      if(vendorAttr['AttrCode'] == 'DAYS_PER_YEAR'){
                        formGroupObject["VendorAttrValue"] = [
                          0,
                          Validators.compose([Validators.required,Validators.max(366),Validators.min(0)])
                        ];
                      }else if(vendorAttr['AttrCode'] == "BANK_ACCOUNT_NO"){
                        formGroupObject['VendorAttrValue']=[
                          0,
                          Validators.compose([Validators.required,Validators.pattern("^[0-9]+$")])
                        ]
                      }else{

                        formGroupObject["VendorAttrValue"] = [
                          "",
                        Validators.compose([Validators.required,Validators.min(0)])

                        ];
                      }
                    }
                    else {
                      if (vendorAttr["IsMandatory"] == true) {
                        formGroupObject["VendorAttrValue"] = [
                          "",
                          Validators.required
                        ];
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

                    if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'ZIPCODE') {
                      tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                      tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
                      tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
                      tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
                      tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                      tempLookup[vendorAttr["AttrCode"]].isRequired = true;
                    }
                  }
                  this.ListInputLookUpObj.push(tempLookup);
                  this.parentForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                  console.log(this.parentForm, "test")

                }
              }
            );
          }
          else {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                if (this.VendorAttrList != null) {
                  for (const vendorAttr of this.VendorAttrList) {
                    var item = this.ListVendorAttrContent.find(
                      (x) => x.AttrCode == vendorAttr.AttrCode
                    );
                      if (item == undefined) {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];

                      if (vendorAttr["AttrInputType"] == "C") {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        const booleanValue = temp[0] == "YES" ? true : false;
                        formGroupObject["VendorAttrValue"] = booleanValue
                      } else {
                        formGroupObject["VendorAttrValue"] = [""];
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
                        await this.http.post(this.UrlConstantNew.GetRefBankByBankCodeAsync, reqObjBank).toPromise().then(
                          (response) => {
                            this.responseBank = response;
                            this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
                              (response) => {
                                this.countryResponse = response;
                                let splitCodeDesc = this.countryResponse.GsValue.split(';');
                                this.countryCode1 = splitCodeDesc[0];
                                this.countryCode2 = splitCodeDesc[1];
                                if (this.responseBank.BankCountryCode === this.countryCode1) {
                                  this.jurisdictionValue = "ONSHORE"
                                }
                                else {
                                  this.jurisdictionValue = "OFFSHORE"
                                }
                              });
                          });

                      }

                      if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'MR_COUNTERPART_CATEGORY') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;

                      }

                      if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'ZIPCODE') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
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
                        await this.http.post(this.UrlConstantNew.GetRefBankByBankCodeAsync, reqObjBank).toPromise().then(
                          (response) => {
                            this.responseBank = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = { BankName: this.responseBank.BankName }
                            this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
                              (response) => {
                                this.countryResponse = response;
                                let splitCodeDesc = this.countryResponse.GsValue.split(';');
                                this.countryCode1 = splitCodeDesc[0];
                                this.countryCode2 = splitCodeDesc[1];
                                if (this.responseBank.BankCountryCode === this.countryCode1) {
                                  this.jurisdictionValue = "ONSHORE"
                                }
                                else {
                                  this.jurisdictionValue = "OFFSHORE"
                                }
                              });
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
                        await this.http.post(this.UrlConstantNew.GetLbppmsCntrprtByLbppmsCntrprtCode, reqObjCntrprt).toPromise().then(
                          (response) => {
                            this.responseApi = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = { Descr: this.responseApi.Descr }
                          });
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'ZIPCODE') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson = vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;

                        await this.http.post(this.UrlConstantNew.GetZipcodeDataByZipCode, { Zipcode: item["AttrContent"] }).toPromise().then(
                          (response) => {
                            this.responseZipcode = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = {
                              Zipcode: this.responseZipcode.Zipcode,
                              City: this.responseZipcode.City,
                              AreaCode1: this.responseZipcode.AreaCode1,
                              AreaCode2: this.responseZipcode.AreaCode2
                            }
                          });

                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == "L") {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [
                          item["AttrContent"],
                        ];
                      } else if (vendorAttr["AttrInputType"] == "C") {
                        var temp = vendorAttr["AttrValue"].split(";");
                        const booleanValue = item["AttrContent"] == "YES" ? true : false;
                        formGroupObject["VendorAttrValue"] = booleanValue;
                      } else if (vendorAttr["AttrInputType"] == "R") {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.RadioButtonVendorAttr[vendorAttr["AttrCode"]] =
                          temp;
                        formGroupObject["VendorAttrValue"] = [
                          item["AttrContent"],
                        ];
                      } else {
                        if(vendorAttr['AttrCode'] == 'DAYS_PER_YEAR'){
                          formGroupObject["VendorAttrValue"] = [
                            item["AttrContent"],
                            Validators.compose([Validators.required,Validators.max(366),Validators.min(0)])
                          ];
                        }else if(vendorAttr['AttrCode'] == "BANK_ACCOUNT_NO"){
                          formGroupObject['VendorAttrValue']=[
                            item["AttrContent"],
                            Validators.compose([Validators.required,Validators.pattern("^[0-9]+$")])
                          ]
                        }else{
                          formGroupObject["VendorAttrValue"] = [
                            item["AttrContent"],
                            Validators.compose([Validators.required,Validators.min(0)])
                          ];
                        }
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                    }
                    parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                  }

                  this.ListInputLookUpObj.push(tempLookup);
                  this.parentForm.addControl("VendorAttrList", this.fb.group(parentFormGroup)); 
                  this.data.emit({VendorAttrList: this.fb.group(parentFormGroup)});

                  const formValue = this.parentForm['controls']['VendorAttrList'].value;
                  if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
                          const vendorAttrContent = Object.keys(formValue).map(key => ({
                            AttrCode: formValue[key].AttrCode,
                            AttrContent: formValue[key].VendorAttrValue,
                            VendorId: this.VendorId
                          }));
                  this.parentForm.addControl("VendorAttrList2", this.fb.group(vendorAttrContent));
                        }
                  this.isFormReady = true;
                }
              });
          }
        }

      }
    );
  }

  async getData() {
    // await this.http.post(this.UrlConstantNew.GetVendorByVendorCode, { Code: this.VendorCode }).toPromise().then(
    //   async (response) => {
    //     this.result = response;
    //     //this.MrVendorCategoryCode = this.result.MrVendorCategoryCode; // di comment karna di page ini selalu get yang JF_FUNDING_COMPANY
    //     this.parentForm.patchValue({
    //       InputCode: this.result.VendorCode,
    //       InputName: this.result.VendorName,
    //       IsActive: this.result.IsActive,
    //     })
    //   })
    await this.http.post(this.UrlConstantNew.GetVendorAddrByVendorCode, { Code: this.VendorCode }).toPromise().then(
      async (response) => {
        this.resultAddr = response;
        this.parentForm.patchValue({
          Address: this.resultAddr.Addr
        })
      }
    )
  }


  addVendorContactPerson(contactPerson: any): void {
    this.vendorContactPerson = contactPerson;
    this.data.emit({contactPerson: this.vendorContactPerson});
    // this.parentForm.addControl("contactPerson", this.fb.group(this.vendorContactPerson));
  }

  getLookUpAttrBank(e, VendorAttrCode) {
    this.parentForm['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.BankCode
    });

    this.bankCountryCodeValue = e.BankCountryCode;
    if (this.bankCountryCodeValue === "INA") {
      this.jurisdictionValue = "ONSHORE"
    }
    else {
      this.jurisdictionValue = "OFFSHORE"
    }



  }

  getLookUpAttrCategory(e, VendorAttrCode) {
    this.parentForm['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.LbppmsCntrprtCode
    });
  }

  getLookUpZipcode(e, VendorAttrCode) {
    this.parentForm['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.Zipcode
    });
  }

  addVendor() {
    if (this.parentForm.valid) {
      const formValue = this.parentForm['controls']['VendorAttrList'].value;

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
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorCode = this.parentForm.controls.InputCode.value;
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorName = this.parentForm.controls.InputName.value;
        this.vendorFundingCoyObj.VendorFundCoyObj.IsActive = this.parentForm.controls.IsActive.value;
        this.vendorFundingCoyObj.VendorFundCoyAddrObj.Addr = this.parentForm.controls.Address.value;
        this.vendorFundingCoyObj.VendorAttrContent = vendorAttrContent;
        this.vendorFundingCoyObj.VendorContactPerson = this.vendorContactPerson;

        if (this.mode == 'edit') {
          this.vendorFundingCoyObj.VendorFundCoyObj.VendorId = this.VendorId;
          this.vendorFundingCoyObj.VendorFundCoyAddrObj.VendorAddrId = this.resultAddr.VendorAddrId;
          this.vendorFundingCoyObj.VendorFundCoyAddrObj.VendorId = this.VendorId;
          this.vendorFundingCoyObj.VendorFundCoyAddrObj.RowVersion = this.resultAddr.RowVersion;
          this.vendorFundingCoyObj.VendorFundCoyObj.RowVersion = this.result.RowVersion;


          const formDataEdit = {
            rowVersion: "",
            VendorAttrContent: vendorAttrContent,
            VendorContactPerson: this.vendorContactPerson
          }
          this.http.post(this.UrlConstantNew.EditVendorFundingCoy, formDataEdit).subscribe(
            (response) => {
              this.toastr.successMessage(response["message"]);
              AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
            });
        }
        else {
          const formDataAdd = {
            rowVersion: "",
            vendorFundCoyObj: this.vendorFundingCoyObj.VendorFundCoyObj,
            vendorFundCoyAddrObj: this.vendorFundingCoyObj.VendorFundCoyAddrObj,
            vendorAttrContent: vendorAttrContent,
            vendorContactPerson: this.vendorContactPerson
          }
          this.http.post<any>(this.UrlConstantNew.AddVendorFundingCoy, formDataAdd, AdInsConstant.SpinnerOptions).subscribe(
            (response) => {
              this.toastr.successMessage(response["message"]);
              AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_FUNDING_COY_PAGING]);
            });
        }


      }
    }
  }
}
