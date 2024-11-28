import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-bank-charge-detail-x',
  templateUrl: './bank-charge-detail-x.component.html'
})
export class BankChargeDetailXComponent implements OnInit {

  refBankId: number = 0;

  BankChargeEditForm = this.fb.group({
    RtgsBankCharge: ['0',[Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0)]],
    RtgsIncome: ['0', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0)]],
    SknBankCharge: ['0',[Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0)]],
    SknIncome: ['0',[Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(0)]]
});

  readonly CancelLink: string = NavigationConstant.CS_BANK_CHARGE_PAGING_X;

  constructor(private toastr: NGXToastrService, private router: Router, 
    private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, 
    private http: HttpClient, private fb: FormBuilder, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe((params) => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.refBankId = queryParams["RefBankId"];
    })
  }

  ngOnInit(): void {

  }

  SaveForm(){
    this.toastr.successMessage('Success!');
    AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_BANK_CHARGE_PAGING_X],{});
  }

}
// import { Component, OnInit } from '@angular/core';
// import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { RefBankObj } from 'app/shared/model/ref-bank-obj.model';
// import { FormBuilder, Validators } from '@angular/forms';
// import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
// import { URLConstant } from 'app/shared/constant/URLConstant';
// import { AdInsHelper } from 'app/shared/AdInsHelper';
// import { NavigationConstant } from 'app/shared/NavigationConstant';
// import { AdInsConstant } from 'app/shared/AdInstConstant';
// import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
// import { CommonConstant } from 'app/shared/constant/CommonConstant';
// import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
// import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
// import { CustObj } from 'app/shared/model/cust-obj.model';
// import { UcLookupObj } from 'app/shared/model/uc-lookup-obj.model';
// import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

// @Component({
//   selector: 'app-bank-charge-detail-x',
//   templateUrl: './bank-charge-detail-x.component.html'
// })
// export class BankChargeDetailXComponent implements OnInit {

//     BankChargeEditForm = this.fb.group({
//         BankCode : ['',Validators.required],
//         BankName : ['', Validators.required],
//         RegRptCode : ['',Validators.required],
//         BankCountryCode: ['',Validators.required],
//         RtgsCode :[''],
//         IsActive : [false],
//         RtgsBankCharge: ['0',[Validators.required, Validators.min(0)]],
//         RtgsIncome: ['0', [Validators.required, Validators.min(0)]],
//         SknBankCharge: ['0',[Validators.required, Validators.min(0)]],
//         SknIncome: ['0',[Validators.required, Validators.min(0)]]
//     });

//     refBankId: number = 0;
//     Country: any;
//     flag: boolean = false;
//     LocalCountry: string;
//     LocalCountryCode: string;
//     BankCountryCode: string;
//     BankCountryName: string = "";
//     result: any;
//     custObj: CustObj;
//      IdCust: number;
//     custPersonalObj: CustPersonalObj;
//     tempCustPersonalObj: CustPersonalObj = new CustPersonalObj();
//     mode: string;
//     tempNationality: any;
//     title : string = "Add Bank";
//     tempCountry: any;
//     tempCountryCode: any;
//     isReady: boolean;

//     lookUpObj: InputLookupObj;
//     bankObj: RefBankObj;
//     criteria: CriteriaObj[] = [];
//     criteriaList: Array<CriteriaObj>;
//     criteriaObj: CriteriaObj;
//     professionLookUpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
//     response: any;
//     responseCountry: any;

//     readonly CancelLink: string = NavigationConstant.CS_BANK_PAGING;
//     constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private http: HttpClient, private fb: FormBuilder) {
//         this.route.queryParams.subscribe((params) => {
//             this.refBankId = queryParams["RefBankId"];
//             this.mode = queryParams["mode"];

//             if (this.mode == "edit") {
//                 var tempCrit = new CriteriaObj();
//                 tempCrit.restriction = "Eq";
//                 tempCrit.value = this.refBankId;
//                 this.criteria.push(tempCrit);
//             }
//         });
//     }

//     ngOnInit() {
//        if(this.mode != "edit"){
//         this.setDefaultCountryName();
//        }
//         this.SetLookupCountry();
//         this.isEdit();
        
//     }

//    async setDefaultCountryName(){
//         await this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
//             (response) => {
//               this.Country = response;
//               let splitCodeDesc = this.Country.GsValue.split(';');
//               this.LocalCountryCode = splitCodeDesc[0];
//               this.LocalCountry = splitCodeDesc[1];
//               this.SetLookupCountry();
//               this.criteriaList = new Array();
//               this.criteriaObj = new CriteriaObj();
//               this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
//               this.criteriaObj.propName = 'COUNTRY_CODE';
//               this.criteriaObj.value = this.LocalCountryCode;
//               this.criteriaList.push(this.criteriaObj);
//               this.lookUpObj.addCritInput = this.criteriaList;
//               this.BankChargeEditForm.patchValue({
//                 BankCountryCode: this.LocalCountryCode
//               });
//               this.lookUpObj.isRequired = false;
//             });
//     }
 
//     async isEdit(){
//         if (this.mode == "edit") {
//             this.title = "Edit Bank";
//             this.BankChargeEditForm.controls.BankCode.disable();
//             var bankObj = new RefBankObj();
//             bankObj.RefBankId = this.refBankId;
            
//             await this.http.post(URLConstant.GetRefBankByRefBankIdAsync, {Id: this.refBankId}).toPromise().then(
//                 async (response) => {
//                     this.result = response;

//                     await this.http.post(URLConstant.GetRefCountryByCountryCode,{
//                         Code: response["BankCountryCode"]
//                       }).subscribe((responseCountry)=>{
//                         this.responseCountry = responseCountry;
//                         console.log("ini isi response country",this.responseCountry.CountryName);
//                         this.BankCountryName = this.responseCountry.CountryName;
//                         this.lookUpObj.jsonSelect = {CountryName :this.BankCountryName};
//                         this.lookUpObj.nameSelect = this.BankCountryName
//                       })
//                     await this.PatchData();
//                 }
//             );
//         }else{
//             this.checkIsAutoFormNoFromSetting('BN')
//         }
//     }

//     SetLookupCountry(){
//         this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
//         this.lookUpObj.isReady = false;
//         this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
//         this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
//         this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";
//         this.lookUpObj.isReady = true;
//         this.lookUpObj.nameSelect = this.LocalCountry;
//         // this.lookUpObj.jsonSelect = {CountryName: this.BankCountryName};
//     }
    

//     getLookup(ev) {
//         console.log(ev);
//         this.response = ev.CountryCode
//         this.BankChargeEditForm.patchValue({
//             BankCountryCode: ev.CountryCode
//         })
//         console.log("this is Bank Country Code",this.BankChargeEditForm.controls.BankCountryCode.value)
//       }

//       PatchData(){
//         this.BankChargeEditForm.patchValue({
//             CountryName: this.BankCountryName,
//             BankCode : this.result.BankCode,
//             BankName : this.result.BankName,
//             RegRptCode : this.result.RegRptCode,
//             RtgsCode: this.result.RtgsCode,
//             BankCountryCode: this.result.BankCountryCode,
//             IsActive : this.result.IsActive
//         })
//     }


//     SaveForm(){
//         if (this.mode == "edit") {
//             this.bankObj = new RefBankObj();
//             this.bankObj = this.BankChargeEditForm.value;
//             this.bankObj.BankCode = this.result.BankCode;
//             this.bankObj.RefBankId = this.refBankId;
//             this.bankObj.RowVersion  = this.result.RowVersion;

//             this.http.post(URLConstant.EditRefBank, this.bankObj, AdInsConstant.SpinnerOptions).subscribe(
//                 (response) => {
//                     AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_BANK_PAGING],{});
//                     this.toastr.successMessage(response['message']);
//                 });
//         }
//         else {
//             this.bankObj = new RefBankObj();
//             this.bankObj = this.BankChargeEditForm.value;
//             this.bankObj.RefBankId = 0;
//             this.bankObj.RowVersion = "";

//             this.http.post(URLConstant.AddRefBankAsync, this.bankObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
//                 this.toastr.successMessage(response['message']);
//                 AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_BANK_PAGING],{});
//             });
//         }
//     }

//     //check is automatic/not form no 4
//     isAuto: boolean = false;
//     checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
//       var generalSettingObj = {
//         rowVersion: "",
//       code: "MASTER_AUTO_GNRT_CODE"
//       }
//       var result: any;
//       this.http.post(URLConstant.GetGeneralSettingByCode, generalSettingObj).subscribe(
//         (response) => {
//           result = response;

//           if (result.GsValue != undefined && result.GsValue != "") {
//             if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
//               this.isAuto = true;
//               this.BankChargeEditForm.patchValue({
//                 BankCode: '-'
//               });
//             }
//           }
//         });
//     }
//     //check is automatic/not form no 4
// }
