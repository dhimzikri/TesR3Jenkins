import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { VendorFundingObj } from '../model/response/vendor-funding-obj.model';
import { VendorObj } from '../model/vendor-obj.model';
import { VendorAddrObj } from '../model/vendor-addr-obj.model';
import { VendorAttrContentObj } from '../model/vendor-attr-content-obj.model';
import { VendorContactPersonObj } from '../model/vendor-contact-person-obj.model';
import { URLConstant } from "../constant/URLConstant";
import urlConstant from "assets/urlConstant.json";

export function addEditFundingCoyX(dicts: Record<string, any>,  api: any, http: HttpClient, toastr: NGXToastrService, router: Router, vendorId:any) {

    const formValue = dicts.formRaw.VendorAttrList;
    let tempVendorId: number;
    tempVendorId = 0;
    if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
      const vendorAttrContent = Object.keys(formValue).map(key => ({
        VendorId : vendorId,
        AttrCode: formValue[key].AttrCode,
        AttrContent: formValue[key].VendorAttrValue
      }));
      
    let vendorFundingCoyObj: any;
    vendorFundingCoyObj = new VendorFundingObj();
    vendorFundingCoyObj.VendorFundCoyObj = new VendorObj();
    vendorFundingCoyObj.VendorFundCoyAddrObj = new VendorAddrObj();
    vendorFundingCoyObj.VendorAttrContent = new Array<VendorAttrContentObj>();
    vendorFundingCoyObj.VendorContactPerson = new Array<VendorContactPersonObj>();
    
        vendorFundingCoyObj.VendorFundCoyObj.MrVendorCategoryCode = dicts.formRaw.MrVendorCategoryCode;
        vendorFundingCoyObj.VendorFundCoyObj.VendorCode = dicts.formRaw.vendorCode;
        vendorFundingCoyObj.VendorFundCoyObj.VendorName = dicts.form.vendorName;
        vendorFundingCoyObj.VendorFundCoyObj.IsActive = dicts.form.isActive;
        vendorFundingCoyObj.VendorFundCoyAddrObj.Addr = dicts.form.address;
        vendorFundingCoyObj.VendorFundCoyObj.IsSyariah = dicts.form.IsSyariah;
        // vendorFundingCoyObj.VendorFundCoyAddrObj.RowVersion = dicts.form.addrRowVersion;
        // vendorFundingCoyObj.VendorFundCoyAddrObj.VendorAddrId = dicts.VendorAddrId;
        // vendorFundingCoyObj.VendorFundCoyAddrObj.VendorId = dicts.VendorId;
        vendorFundingCoyObj.VendorAttrContent = vendorAttrContent;
        vendorFundingCoyObj.VendorContactPerson = dicts.contactPerson ? dicts.contactPerson : new Array<VendorContactPersonObj>();
        
    
    if(dicts.mode == 'edit'){
        vendorFundingCoyObj.VendorFundCoyObj.VendorId = dicts.VendorId;
        vendorFundingCoyObj.VendorFundCoyAddrObj.VendorAddrId = dicts.VendorAddrId;
        vendorFundingCoyObj.VendorFundCoyAddrObj.VendorId = dicts.VendorId;
        vendorFundingCoyObj.VendorFundCoyAddrObj.RowVersion = dicts.form.addrRowVersion;
        vendorFundingCoyObj.VendorFundCoyObj.RowVersion = dicts.form.otherRowVersion;
      
        
        const formDataEdit = {
          rowVersion: "",
          VendorFundCoyObj: vendorFundingCoyObj.VendorFundCoyObj,
          VendorFundCoyAddrObj: vendorFundingCoyObj.VendorFundCoyAddrObj,
          VendorAttrContent: vendorAttrContent,
          VendorContactPerson : dicts.contactPerson ? dicts.contactPerson : new Array<VendorContactPersonObj>(),
          IsSyariah: dicts.form.IsSyariah,
        }
        let url1 = enviConfig.FoundationR3Url + "/v1/Vendor/EditFundingCompany";
        let url2 = enviConfig.FoundationR3Url + "/v1/VendorX/EditVendorX";
        http.post(url1, formDataEdit, AdInsConstant.SpinnerOptions)
        .subscribe((response) => {
          http.post(url2, {
              IsSyariah: dicts.form.IsSyariah,
              VendorId: dicts.VendorIdX == null ? dicts.VendorId : dicts.VendorIdX,
            },AdInsConstant.SpinnerOptions)
            .subscribe((response) => {
              tempVendorId = dicts.VendorIdX == null ? dicts.VendorId : dicts.VendorIdX
              if (tempVendorId == 0) {
                toastr.errorMessage(response["message"]);
              } else {
                toastr.successMessage(response["message"]);
                AdInsHelper.RedirectUrl(router, [
                  NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
                ]);
              }
            });
        });
      }else{
        const formDataAdd = {
          rowVersion: "",
          vendorFundCoyObj: vendorFundingCoyObj.VendorFundCoyObj,
          vendorFundCoyAddrObj: vendorFundingCoyObj.VendorFundCoyAddrObj,
          vendorAttrContent: vendorAttrContent,
          vendorContactPerson : dicts.contactPerson ? dicts.contactPerson : new Array<VendorContactPersonObj>()
        } 
        let url = enviConfig.FoundationR3Url + api;
        let urlAddVendorX =  enviConfig.FoundationR3Url + urlConstant.AddVendorX
        http.post(url, formDataAdd, AdInsConstant.SpinnerOptions).subscribe(
            (response) => {
              http
                .post(urlAddVendorX, {
                  IsSyariah: dicts.form.IsSyariah,
                  VendorId: response["Id"],
                })
                .subscribe(() => {
                  if (response["Id"] == 0) {
                    toastr.errorMessage(response["message"]);
                  } else {
                    toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(router, [
                      NavigationConstant.VENDOR_FUNDING_COY_PAGING_X,
                    ]);
                  }
                });
            }
        );
    }
    }
}