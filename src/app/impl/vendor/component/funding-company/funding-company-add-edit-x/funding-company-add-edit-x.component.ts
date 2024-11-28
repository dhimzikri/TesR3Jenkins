import { NgxRouterService } from "@adins/fe-core";
import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { URLConstantX } from "app/impl/shared/constant/URLConstantX";
import { AdInsHelper } from "app/shared/AdInsHelper";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { URLConstant } from "app/shared/constant/URLConstant";
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputLookupObj } from "app/shared/model/input-lookup-obj.model";
import { ReqRefAttrByAttrGroupObj } from "app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model";
import { VendorFundingObj } from "app/shared/model/response/vendor-funding-obj.model";
import { VendorAddrObj } from "app/shared/model/vendor-addr-obj.model";
import { VendorAttrContentObj } from "app/shared/model/vendor-attr-content-obj.model";
import { VendorContactPersonObj } from "app/shared/model/vendor-contact-person-obj.model";
import { VendorObj } from "app/shared/model/vendor-obj.model";

@Component({
  selector: "app-funding-company-add-edit-x",
  templateUrl: "./funding-company-add-edit-x.component.html",
  styleUrls: ["./funding-company-add-edit-x.component.css"],
})
export class FundingCompanyAddEditXComponent implements OnInit {
  ListVendorCPObj: Array<VendorContactPersonObj> =
    new Array<VendorContactPersonObj>();

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
  reqVendorAttrObj: { listVendorAttrContentObj: any[] };
  ListVendorAttrContent: any;
  gradeCode: String;
  vendorContactPerson: any[] = [];
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
  VendorIdX: any;

  FormUtama = this.fb.group({
    InputCode: ["", Validators.required],
    InputName: ["", [Validators.required]],
    IsActive: [false, [Validators.required]],
    IsSyariah: [false, [Validators.required]],
    Address: ["", [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe((params) => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = queryParams["MrVendorCategoryCode"];
      }
      if (queryParams["VendorId"] != null) {
        this.VendorId = queryParams["VendorId"];
      }

      if (queryParams["FundCoyCode"] != null) {
        this.VendorCode = queryParams["FundCoyCode"];
      }

      if (queryParams["mode"] != null) {
        this.mode = queryParams["mode"];
      }
    });
  }

  DictDDLVendorAttr: { [id: string]: Array<any> } = {};
  RadioButtonVendorAttr: { [id: string]: Array<any> } = {};
  async ngOnInit() {
    if (this.mode == "edit") {
      this.FormUtama.controls.InputCode.disable();
      await this.getData();
    }
    this.http
      .post(this.UrlConstantNew.GetListVendorAttrContentByVendorCode, {
        Code: this.VendorCode,
      })
      .toPromise()
      .then((response) => {
        this.ListVendorAttrContent = response["ListVendorAttrContent"];
        if (this.ListVendorAttrContent != null) {
          if (this.ListVendorAttrContent.length < 1) {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj =
              new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http
              .post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup)
              .subscribe(async (response: any) => {
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                let tempLookup = {};
                if (this.VendorAttrList != null) {
                  for (const vendorAttr of this.VendorAttrList) {
                    var item = this.ListVendorAttrContent.find(
                      (x) => x.AttrCode == vendorAttr.AttrCode
                    );
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

                    parentFormGroup[vendorAttr["AttrCode"]] =
                      this.fb.group(formGroupObject);

                    if (
                      vendorAttr["AttrInputType"] == "LU" &&
                      vendorAttr["AttrCode"] == "BANK_CODE"
                    ) {
                      tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                        this.UrlConstantNew
                      );
                      tempLookup[vendorAttr["AttrCode"]].urlJson =
                        "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
                      tempLookup[vendorAttr["AttrCode"]].pagingJson =
                        "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
                      tempLookup[vendorAttr["AttrCode"]].genericJson =
                        "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
                      tempLookup[vendorAttr["AttrCode"]].title =
                        vendorAttr.AttrName;
                      tempLookup[vendorAttr["AttrCode"]].isRequired = true;
                    }

                    if (
                      vendorAttr["AttrInputType"] == "LU" &&
                      vendorAttr["AttrCode"] == "MR_COUNTERPART_CATEGORY"
                    ) {
                      tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                        this.UrlConstantNew
                      );
                      tempLookup[vendorAttr["AttrCode"]].urlJson =
                        "./assets/lookup/lookupCounterpartCategory.json";
                      tempLookup[vendorAttr["AttrCode"]].pagingJson =
                        "./assets/lookup/lookupCounterpartCategory.json";
                      tempLookup[vendorAttr["AttrCode"]].genericJson =
                        "./assets/lookup/lookupCounterpartCategory.json";
                      tempLookup[vendorAttr["AttrCode"]].title =
                        vendorAttr.AttrName;
                      tempLookup[vendorAttr["AttrCode"]].isRequired = true;
                    }

                    if (
                      vendorAttr["AttrInputType"] == "LU" &&
                      vendorAttr["AttrCode"] == "ZIPCODE"
                    ) {
                      tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                        this.UrlConstantNew
                      );
                      tempLookup[vendorAttr["AttrCode"]].urlJson =
                        "./assets/uclookup/zipcode/lookupZipcode.json";
                      tempLookup[vendorAttr["AttrCode"]].pagingJson =
                        "./assets/uclookup/zipcode/lookupZipcode.json";
                      tempLookup[vendorAttr["AttrCode"]].genericJson =
                        ".assets/uclookup/zipcode/lookupZipcode.json";
                      tempLookup[vendorAttr["AttrCode"]].title =
                        vendorAttr.AttrName;
                      tempLookup[vendorAttr["AttrCode"]].isRequired = true;
                    }
                  }
                  this.ListInputLookUpObj.push(tempLookup);
                  this.FormUtama.addControl(
                    "VendorAttrList",
                    this.fb.group(parentFormGroup)
                  );
                  this.isFormReady = true;
                }
              });
          } else {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj =
              new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http
              .post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup)
              .subscribe(async (response: any) => {
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

                      if (vendorAttr["AttrInputType"] == "R") {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [temp[0]];
                      } else {
                        formGroupObject["VendorAttrValue"] = [""];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] =
                        this.fb.group(formGroupObject);

                      if (
                        vendorAttr["AttrInputType"] == "LU" &&
                        vendorAttr["AttrCode"] == "BANK_CODE"
                      ) {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                          this.UrlConstantNew
                        );
                        tempLookup[vendorAttr["AttrCode"]].urlJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title =
                          vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var reqObjBank = {
                          rowVersion: "",
                          code: item["AttrContent"],
                        };
                        await this.http
                          .post(
                            this.UrlConstantNew.GetRefBankByBankCodeAsync,
                            reqObjBank
                          )
                          .toPromise()
                          .then((response) => {
                            this.responseBank = response;
                            this.http
                              .post(this.UrlConstantNew.GetGeneralSettingValueByCode, {
                                Code: CommonConstant.GSCodeDefLocalNationality,
                              })
                              .subscribe((response) => {
                                this.countryResponse = response;
                                let splitCodeDesc =
                                  this.countryResponse.GsValue.split(";");
                                this.countryCode1 = splitCodeDesc[0];
                                this.countryCode2 = splitCodeDesc[1];
                                if (
                                  this.responseBank.BankCountryCode ===
                                  this.countryCode1
                                ) {
                                  this.jurisdictionValue = "ONSHORE";
                                } else {
                                  this.jurisdictionValue = "OFFSHORE";
                                }
                              });
                          });
                      }

                      if (
                        vendorAttr["AttrInputType"] == "LU" &&
                        vendorAttr["AttrCode"] == "MR_COUNTERPART_CATEGORY"
                      ) {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                          this.UrlConstantNew
                        );
                        tempLookup[vendorAttr["AttrCode"]].urlJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title =
                          vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                      }

                      if (
                        vendorAttr["AttrInputType"] == "LU" &&
                        vendorAttr["AttrCode"] == "ZIPCODE"
                      ) {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                          this.UrlConstantNew
                        );
                        tempLookup[vendorAttr["AttrCode"]].urlJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title =
                          vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                      }
                    } else {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];

                      if (vendorAttr["AttrInputType"] == "T") {
                        formGroupObject["VendorAttrValue"] = [
                          item["AttrContent"],
                        ];
                      } else if (
                        vendorAttr["AttrInputType"] == "LU" &&
                        vendorAttr["AttrCode"] == "BANK_CODE"
                      ) {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                          this.UrlConstantNew
                        );
                        tempLookup[vendorAttr["AttrCode"]].urlJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title =
                          vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var reqObjBank = {
                          rowVersion: "",
                          code: item["AttrContent"],
                        };
                        await this.http
                          .post(
                            this.UrlConstantNew.GetRefBankByBankCodeAsync,
                            reqObjBank
                          )
                          .toPromise()
                          .then((response) => {
                            this.responseBank = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = {
                              BankName: this.responseBank.BankName,
                            };
                            this.http
                              .post(this.UrlConstantNew.GetGeneralSettingValueByCode, {
                                Code: CommonConstant.GSCodeDefLocalNationality,
                              })
                              .subscribe((response) => {
                                this.countryResponse = response;
                                let splitCodeDesc =
                                  this.countryResponse.GsValue.split(";");
                                this.countryCode1 = splitCodeDesc[0];
                                this.countryCode2 = splitCodeDesc[1];
                                if (
                                  this.responseBank.BankCountryCode ===
                                  this.countryCode1
                                ) {
                                  this.jurisdictionValue = "ONSHORE";
                                } else {
                                  this.jurisdictionValue = "OFFSHORE";
                                }
                              });
                          });
                        formGroupObject["VendorAttrValue"] = [
                          item["AttrContent"],
                        ];
                      } else if (
                        vendorAttr["AttrInputType"] == "LU" &&
                        vendorAttr["AttrCode"] == "MR_COUNTERPART_CATEGORY"
                      ) {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                          this.UrlConstantNew
                        );
                        tempLookup[vendorAttr["AttrCode"]].urlJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title =
                          vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var reqObjCntrprt = {
                          rowVersion: "",
                          code: item["AttrContent"],
                        };
                        await this.http
                          .post(
                            this.UrlConstantNew.GetLbppmsCntrprtByLbppmsCntrprtCode,
                            reqObjCntrprt
                          )
                          .toPromise()
                          .then((response) => {
                            this.responseApi = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = {
                              Descr: this.responseApi.Descr,
                            };
                          });
                        formGroupObject["VendorAttrValue"] = [
                          item["AttrContent"],
                        ];
                      } else if (
                        vendorAttr["AttrInputType"] == "LU" &&
                        vendorAttr["AttrCode"] == "ZIPCODE"
                      ) {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(
                          this.UrlConstantNew
                        );
                        tempLookup[vendorAttr["AttrCode"]].urlJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].pagingJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].genericJson =
                          vendorAttr["AttrValue"];
                        tempLookup[vendorAttr["AttrCode"]].title =
                          vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;

                        await this.http
                          .post(this.UrlConstantNew.GetZipcodeDataByZipCode, {
                            Zipcode: item["AttrContent"],
                          })
                          .toPromise()
                          .then((response) => {
                            this.responseZipcode = response;
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = {
                              Zipcode: this.responseZipcode.Zipcode,
                            };
                          });

                        formGroupObject["VendorAttrValue"] = [
                          item["AttrContent"],
                        ];
                      } else if (vendorAttr["AttrInputType"] == "L") {
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
                      parentFormGroup[vendorAttr["AttrCode"]] =
                        this.fb.group(formGroupObject);
                    }
                    parentFormGroup[vendorAttr["AttrCode"]] =
                      this.fb.group(formGroupObject);
                  }

                  this.ListInputLookUpObj.push(tempLookup);
                  this.FormUtama.addControl(
                    "VendorAttrList",
                    this.fb.group(parentFormGroup)
                  );
                  this.isFormReady = true;
                }
              });
          }
        }
      });
  }

  async getData() {
    await this.http
      .post(this.UrlConstantNew.GetVendorByVendorCode, { Code: this.VendorCode })
      .toPromise()
      .then(async (response) => {
        this.result = response;
        this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
        this.FormUtama.patchValue({
          InputCode: this.result.VendorCode,
          InputName: this.result.VendorName,
          IsActive: this.result.IsActive,
        });
      });
    await this.http
      .post(this.UrlConstantNew.GetVendorXByVendorCode, { Code: this.VendorCode })
      .toPromise()
      .then(async (response) => {
        this.FormUtama.patchValue({
          IsSyariah: response["ReturnObject"] == null || response["ReturnObject"]["IsSyariah"] == false ? false : true
        });
        this.VendorIdX = response["ReturnObject"] == null ? null : response["ReturnObject"]["VendorId"];
      });
    await this.http
      .post(this.UrlConstantNew.GetVendorAddrByVendorCode, { Code: this.VendorCode })
      .toPromise()
      .then(async (response) => {
        this.resultAddr = response;
        this.FormUtama.patchValue({
          Address: this.resultAddr.Addr,
        });
      });
  }

  addVendorContactPerson(contactPerson: any): void {
    this.vendorContactPerson = contactPerson;
  }

  getLookUpAttrBank(e, VendorAttrCode) {
    this.FormUtama["controls"]["VendorAttrList"]["controls"][
      VendorAttrCode
    ].patchValue({
      VendorAttrValue: e.BankCode,
    });

    this.bankCountryCodeValue = e.BankCountryCode;
    if (this.bankCountryCodeValue === "INA") {
      this.jurisdictionValue = "ONSHORE";
    } else {
      this.jurisdictionValue = "OFFSHORE";
    }
  }

  getLookUpAttrCategory(e, VendorAttrCode) {
    this.FormUtama["controls"]["VendorAttrList"]["controls"][
      VendorAttrCode
    ].patchValue({
      VendorAttrValue: e.LbppmsCntrprtCode,
    });
  }

  getLookUpZipcode(e, VendorAttrCode) {
    this.FormUtama["controls"]["VendorAttrList"]["controls"][
      VendorAttrCode
    ].patchValue({
      VendorAttrValue: e.Zipcode,
    });
  }

  // SaveForm() {
  //   if (this.FormUtama.valid) {
  //     const formValue = this.FormUtama["controls"]["VendorAttrList"].value;

  //     if (
  //       Object.keys(formValue).length > 0 &&
  //       formValue.constructor === Object
  //     ) {
  //       const vendorAttrContent = Object.keys(formValue).map((key) => ({
  //         attrCode: formValue[key].AttrCode,
  //         attrContent: formValue[key].VendorAttrValue,
  //       }));

  //       const formDataAdd = {
  //         rowVersion: "",
  //         mrVendorCategoryCode: this.MrVendorCategoryCode,
  //         vendorCode: this.FormUtama.get("InputCode").value,
  //         vendorName: this.FormUtama.get("InputName").value,
  //         isActive: this.FormUtama.get("IsActive").value,
  //         isSyariah: this.FormUtama.get("IsSyariah").value,
  //         address: this.FormUtama.get("Address").value,
  //         vendorAttrContent: vendorAttrContent,
  //         vendorContactPerson: this.vendorContactPerson,
  //       };
  //       const formDataEdit = {
  //         rowVersion: "",
  //         mrVendorCategoryCode: this.MrVendorCategoryCode,
  //         vendorCode: this.FormUtama.get("InputCode").value,
  //         vendorName: this.FormUtama.get("InputName").value,
  //         isActive: this.FormUtama.get("IsActive").value,
  //         isSyariah: this.FormUtama.get("IsSyariah").value,
  //         address: this.FormUtama.get("Address").value,
  //         vendorAttrContent: vendorAttrContent,
  //         vendorContactPerson: this.vendorContactPerson,
  //         vendorId: this.VendorId,
  //       };
  //       if (this.mode == "edit") {
  //         this.http
  //           .post<any>(URLConstant.EditVendorFundingCoy, formDataEdit)
  //           .subscribe((response) => {
  //             this.toastr.successMessage(response["message"]);
  //             AdInsHelper.RedirectUrl(this.router, [
  //               NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
  //             ]);
  //           });
  //       } else {
  //         this.http
  //           .post<any>(URLConstant.AddVendorFundingCoy, formDataAdd)
  //           .subscribe((response) => {
  //             this.toastr.successMessage(response["message"]);
  //             AdInsHelper.RedirectUrl(this.router, [
  //               NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
  //             ]);
  //           });
  //       }
  //     }
  //   }
  // }

  back() {
    AdInsHelper.RedirectUrl(this.ngxRouter, [
      NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
    ]);
  }

  addVendorX() {
    if (this.FormUtama.valid) {
      const formValue = this.FormUtama["controls"]["VendorAttrList"].value;

      if (
        Object.keys(formValue).length > 0 &&
        formValue.constructor === Object
      ) {
        const vendorAttrContent = Object.keys(formValue).map((key) => ({
          VendorId: this.VendorId,
          AttrCode: formValue[key].AttrCode,
          AttrContent: (key == 'AFFILIATE_WITH_MF'? (formValue[key].VendorAttrValue == true ? 'YES':'NO' ):formValue[key].VendorAttrValue),
        }));

        this.vendorFundingCoyObj = new VendorFundingObj();
        this.vendorFundingCoyObj.VendorFundCoyObj = new VendorObj();
        this.vendorFundingCoyObj.VendorFundCoyAddrObj = new VendorAddrObj();
        this.vendorFundingCoyObj.VendorAttrContent =
          new Array<VendorAttrContentObj>();
        this.vendorFundingCoyObj.VendorContactPerson =
          new Array<VendorContactPersonObj>();

        this.vendorFundingCoyObj.VendorFundCoyObj.MrVendorCategoryCode =
          this.MrVendorCategoryCode;
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorCode =
          this.FormUtama.controls.InputCode.value;
        this.vendorFundingCoyObj.VendorFundCoyObj.VendorName =
          this.FormUtama.controls.InputName.value;
        this.vendorFundingCoyObj.VendorFundCoyObj.IsActive =
          this.FormUtama.controls.IsActive.value;
        this.vendorFundingCoyObj.VendorFundCoyAddrObj.Addr =
          this.FormUtama.controls.Address.value;
        this.vendorFundingCoyObj.VendorAttrContent = vendorAttrContent;
        this.vendorFundingCoyObj.VendorContactPerson = this.vendorContactPerson;

        if (this.mode == "edit") {
          this.vendorFundingCoyObj.VendorFundCoyObj.VendorId = this.VendorId;
          this.vendorFundingCoyObj.VendorFundCoyAddrObj.VendorAddrId =
            this.resultAddr.VendorAddrId;
          this.vendorFundingCoyObj.VendorFundCoyAddrObj.VendorId =
            this.VendorId;
          this.vendorFundingCoyObj.VendorFundCoyAddrObj.RowVersion =
            this.resultAddr.RowVersion;
          this.vendorFundingCoyObj.VendorFundCoyObj.RowVersion =
            this.result.RowVersion;

          const formDataEdit = {
            rowVersion: "",
            VendorFundCoyObj: this.vendorFundingCoyObj.VendorFundCoyObj,
            VendorFundCoyAddrObj: this.vendorFundingCoyObj.VendorFundCoyAddrObj,
            VendorAttrContent: vendorAttrContent,
            VendorContactPerson: this.vendorContactPerson,
            IsSyariah: this.FormUtama.controls.IsSyariah.value,
          };
          this.http
            .post(this.UrlConstantNew.EditVendorFundingCoy, formDataEdit)
            .subscribe((response) => {
              this.http
                .post(this.UrlConstantNew.EditVendorFundingCoyX, {
                  IsSyariah: this.FormUtama.controls.IsSyariah.value,
                  VendorId: this.VendorIdX == null ? this.VendorId : this.VendorIdX,
                })
                .subscribe(() => {
                  if (this.VendorIdX == 0) {
                    this.toastr.errorMessage(response["message"]);
                  } else {
                    this.toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(this.ngxRouter, [
                      NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
                    ]);
                  }
                });
            });
        } else {
          const formDataAdd = {
            rowVersion: "",
            vendorFundCoyObj: this.vendorFundingCoyObj.VendorFundCoyObj,
            vendorFundCoyAddrObj: this.vendorFundingCoyObj.VendorFundCoyAddrObj,
            vendorAttrContent: vendorAttrContent,
            vendorContactPerson: this.vendorContactPerson,
          };
          this.http
            .post<any>(
              this.UrlConstantNew.AddVendorFundingCoy,
              formDataAdd,
              AdInsConstant.SpinnerOptions
            )
            .subscribe((response) => {
              this.http
                .post(this.UrlConstantNew.AddVendorFundingCoyX, {
                  IsSyariah: this.FormUtama.controls.IsSyariah.value,
                  VendorId: response["Id"],
                })
                .subscribe(() => {
                  if (response["Id"] == 0) {
                    this.toastr.errorMessage(response["message"]);
                  } else {
                    this.toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(this.ngxRouter, [
                      NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
                    ]);
                  }
                });
            });
        }
      }
    }
  }

  ChangeCallbackSwitch(formName, $event: boolean) {
    this.FormUtama.get(formName).setValue($event);
  }
}
