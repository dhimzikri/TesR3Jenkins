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

export function addEditFundingCoy(dicts: Record<string, any>,  api: any, http: HttpClient, toastr: NGXToastrService, router: Router, vendorId:any) {

    const formValue = dicts.formRaw.VendorAttrList;

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
    
        vendorFundingCoyObj.VendorFundCoyObj.MrVendorCategoryCode = "JF_FUNDING_COMPANY";
        vendorFundingCoyObj.VendorFundCoyObj.VendorCode = dicts.formRaw.vendorCode;
        vendorFundingCoyObj.VendorFundCoyObj.VendorName = dicts.form.vendorName;
        vendorFundingCoyObj.VendorFundCoyObj.IsActive = dicts.form.isActive;
        vendorFundingCoyObj.VendorFundCoyAddrObj.Addr = dicts.form.address;
        // vendorFundingCoyObj.VendorFundCoyAddrObj.RowVersion = dicts.form.addrRowVersion;
        // vendorFundingCoyObj.VendorFundCoyAddrObj.VendorAddrId = dicts.VendorAddrId;
        // vendorFundingCoyObj.VendorFundCoyAddrObj.VendorId = dicts.VendorId;
        vendorFundingCoyObj.VendorAttrContent = vendorAttrContent;
        vendorFundingCoyObj.VendorContactPerson = dicts.contactPerson;
        
    
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
          VendorContactPerson : dicts.contactPerson
        } 
        console.log("ini isi form data edit", formDataEdit)
        console.log(vendorFundingCoyObj);
        let url = enviConfig.FoundationR3Url + api;
        http.post(url, formDataEdit, AdInsConstant.SpinnerOptions).subscribe(
            (response) => {
            toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(router, [NavigationConstant.CUSTOM_VENDOR_FUNDING_COY_PAGING]);
            }
        );
      }else{
        const formDataAdd = {
          rowVersion: "",
          vendorFundCoyObj: vendorFundingCoyObj.VendorFundCoyObj,
          vendorFundCoyAddrObj: vendorFundingCoyObj.VendorFundCoyAddrObj,
          vendorAttrContent: vendorAttrContent,
          vendorContactPerson : dicts.contactPerson
        } 
        let url = enviConfig.FoundationR3Url + api;
        http.post(url, formDataAdd, AdInsConstant.SpinnerOptions).subscribe(
            (response) => {
            toastr.successMessage(response["message"]);
            AdInsHelper.RedirectUrl(router, [NavigationConstant.CUSTOM_VENDOR_FUNDING_COY_PAGING]);
            }
        );
    }
    }
}