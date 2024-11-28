
import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { ResGetListVendorContactPersonObj, ResListVendorContactPersonObj } from 'app/shared/model/response/res-get-list-vendor-contact-person-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { VendorAttrContentObj } from 'app/shared/model/vendor-attr-content-obj.model';
import { FundingCompanyService } from 'app/vendor/funding-company.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericByIdObj } from 'app/shared/model/generic/generic-by-id-obj.model';

@Component({
  selector: 'app-funding-company-detail',
  templateUrl: './funding-company-detail.component.html',
  styles: [
    `
   .label-field {
    color: var(--gray-font-2, #A1A3A5);
    font-size: 12px !important;
    font-weight: 500;
    text-transform: capitalize;

}
    `
  ]
})
export class FundingCompanyDetailComponent implements OnInit {
  VendorCode : string = "";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
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
  FormUtama: FormGroup;
  vendorContactPerson: any[] = [];
  radioForm: any;
  responseApi: any;
  responseBank: any;
  attributeList: any[] = [];
  listVendorCP: Array<ResListVendorContactPersonObj> = [];
  vendor: any;
  address: any;
  vendorCPObj: GenericObj = new GenericObj();
  jurisdiction: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private ngxRouter: NgxRouterService,
    private childFormService: FundingCompanyService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe((params) => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        this.VendorId = queryParams["VendorId"];
        this.VendorCode = queryParams["FundCoyCode"];
    })
   }

   DictDDLVendorAttr: { [id: string]: Array<any> } = {};
   RadioButtonVendorAttr:  { [id: string]: Array<any> } = {};
 async ngOnInit() {
    console.log("ini id",this.VendorCode);

    
  
    this.http.post(this.UrlConstantNew.GetListVendorAttrContentByVendorCode, { Code: this.VendorCode }).toPromise().then(
      (response) => {
        this.ListVendorAttrContent = response['ListVendorAttrContent'];
        if (this.ListVendorAttrContent != null) {
            let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
            reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
            this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    const attribute = {
                      AttrName: vendorAttr.AttrName,
                      AttrContent: (this.ListVendorAttrContent.find(item => item.AttrCode === vendorAttr.AttrCode) || {}).AttrContent || ""
                    }
                    if(vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'BANK_CODE') {
                      var reqObjBank = {
                        rowVersion: "",
                        code: attribute.AttrContent
                      }
                      await this.http.post(this.UrlConstantNew.GetRefBankByBankCodeAsync, reqObjBank).toPromise().then(
                        (response) => {
                          this.responseBank = response;
                          attribute.AttrName = "Bank Name"
                          attribute.AttrContent = this.responseBank.BankName
                          if(this.responseBank.BankCountryCode == "INA"){
                            this.jurisdiction = "ONSHORE"
                          }
                          else{
                              this.jurisdiction = "OFFSHORE"
                          }
                          console.log("this is ref bank response", response)
                          console.log(this.jurisdiction)
                        });
                    }
                    else if(vendorAttr["AttrInputType"] == 'LU' && vendorAttr["AttrCode"] == 'MR_COUNTERPART_CATEGORY') {
                      var reqObjCntrprt = {
                        rowVersion: "",
                        code: attribute.AttrContent
                      }
                      await this.http.post(this.UrlConstantNew.GetLbppmsCntrprtByLbppmsCntrprtCode, reqObjCntrprt).toPromise().then(
                        (response) => {
                          this.responseApi = response;
                          attribute.AttrContent = this.responseApi.Descr
                          console.log("this is mr counterpart response", response)
                        });
                    }

                    this.attributeList.push(attribute);
                  
  
                  console.log(this.attributeList);
                }
              }
              });
          
        }

      }
    );
    this.vendorCPObj.Code = this.VendorCode;
    this.http.post(this.UrlConstantNew.GetListVendorContactPersonByVendorCode, this.vendorCPObj).subscribe(
      (response: ResGetListVendorContactPersonObj) => {
        this.listVendorCP = response[CommonConstant.ReturnObj];
        this.listVendorCP = this.listVendorCP.concat(this.childFormService.getChildFormValues());
      })
  }

}
