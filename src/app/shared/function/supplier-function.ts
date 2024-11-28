import { AdInsHelper } from "../AdInsHelper";
import * as env from "../../../assets/config/enviConfig.json";
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { Router } from "@angular/router";
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { CommonConstant } from "../constant/CommonConstant";
import { VendorAttrContentObj } from "../model/vendor-attr-content-obj.model";
import { VendorAtpmMappingObj } from "../model/vendor-atpm-mapping-obj.model";
import { GenericObj } from "../model/generic/generic-obj.model";
import { AdInsConstant } from "../AdInstConstant";
import { NavigationConstant } from "../NavigationConstant";
import { VendorBranchObj } from "../model/vendor-branch-obj.model";
import { VendorContactPersonObj } from "../model/vendor-contact-person-obj.model";
import { URLConstant } from 'app/shared/constant/URLConstant';

const envi = URLConstant.env;

function getVendorId(listTemp: any) {
  let listId = [];

  listTemp.forEach(x => {
    listId.push(x.VendorId)
  });

  return listId;
}

function getRefOfficeId(listTemp: any) {
  let listId = [];

  listTemp.forEach(x => {
    listId.push(x.RefOfficeId)
  });

  return listId;
}



export function addRangeVendorMbr(listTemp: any, VendorId: number, api: any, next: string, from: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let listId = getVendorId(listTemp);
  let obj = {};
  let param = {};
  let url = envi.FoundationR3Url + api;

  if (from == "SUPPLIER_SCHM") {
    obj = {
      "VendorId": listId,
      "VendorSchmId": VendorId,
    }

    param = {
      "VendorSchmId": VendorId,
      "MrVendorCategoryCode": "SUPPLIER"
    }
  }

  if (from == "SUPPLIER_GRP") {
    obj = {
      "VendorId": listId,
      "VendorGrpId": VendorId,
    }

    param = {
      "VendorGrpId": VendorId,
      "MrVendorCategoryCode": "SUPPLIER"
    }
  }

  if (from == "SUPPLIER_OFFICE_MEMBER") {
    obj = {
      "RefOfficeId": listId,
      "VendorId": VendorId,
    }

    param = {
      "VendorId": VendorId,
    }
  }

  http.post(url, obj).subscribe(
    (response: any) => {
      toastr.successMessage("Success!");
      AdInsHelper.RedirectUrl(router, [next], param);
    })
}

export function addRangeVendorGrpMbr(listTemp: any, VendorId: number, api: any, next: string, MrVendorCategoryCode: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let listId = getVendorId(listTemp);
  let obj = {};
  let param = {};
  let url = envi.FoundationR3Url + api;

  obj = {
    "VendorId": listId,
    "VendorGrpId": VendorId,
  }

  param = {
    "VendorGrpId": VendorId,
    "MrVendorCategoryCode": MrVendorCategoryCode
  }

  http.post(url, obj).subscribe(
    (response: any) => {
      toastr.successMessage("Success!");
      AdInsHelper.RedirectUrl(router, [next], param);
    })
}

export function addRangeOfficeMbr(listTemp: any, VendorId: number, api: any, next: string, http: HttpClient, toastr: NGXToastrService, router: Router, MrVendorCategoryCode: string) {
  let listId = getRefOfficeId(listTemp);
  let obj = {};
  let param = {};
  let url = envi.FoundationR3Url + api;

  obj = {
    "RefOfficeId": listId,
    "VendorId": VendorId,
  }

  param = {
    "VendorId": VendorId,
    "MrVendorCategoryCode": MrVendorCategoryCode
  }

  http.post(url, obj).subscribe(
    (response: any) => {
      toastr.successMessage("Success!");
      AdInsHelper.RedirectUrl(router, [next], param);
    })
}

export function cancelHORegistration(dicts: Record<string, any>, router: Router) {
  if (dicts.mode != undefined && dicts.mode == "edit") {
    AdInsHelper.RedirectUrl(router, [NavigationConstant.SELF_CUSTOM_VENDOR_HO_DETAIL], { "VendorId": dicts.VendorId, "MrVendorCategoryCode": dicts.MrVendorCategoryCode });
  }
  else {
    AdInsHelper.RedirectUrl(router, [NavigationConstant.SELF_CUSTOM_VENDOR_PAGING], { "MrVendorCategoryCode": dicts.MrVendorCategoryCode });
  }
}

export function addEditvendorHO(dicts: Record<string, any>, api: string, next: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let url = envi.FoundationR3Url + api;

  let vendorHoObj = new VendorHoObj();

  vendorHoObj.VendorObj = new VendorObj();
  vendorHoObj.VendorObj.Email = dicts.formRaw.Email;
  vendorHoObj.VendorObj.EstablishmentDt = dicts.formRaw.EstablishmentDt;
  vendorHoObj.VendorObj.IdNo = dicts.formRaw.IdNo;
  vendorHoObj.VendorObj.IsActive = dicts.formRaw.IsActive;
  vendorHoObj.VendorObj.IsNpwpExist = dicts.formRaw.IsNpwpExist;
  vendorHoObj.VendorObj.IsOneAffiliate = dicts.formRaw.IsOneAffiliate;
  vendorHoObj.VendorObj.IsVat = dicts.formRaw.IsVat;
  vendorHoObj.VendorObj.LicenseNo = dicts.formRaw.LicenseNo;
  vendorHoObj.VendorObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
  vendorHoObj.VendorObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
  vendorHoObj.VendorObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
  vendorHoObj.VendorObj.MrTaxCalcMethodCode = dicts.formRaw.MrTaxCalcMethodCode;
  vendorHoObj.VendorObj.MrVendorCategoryCode = dicts.formRaw.MrVendorCategoryCode;
  vendorHoObj.VendorObj.MrKonvenSyariahCode = dicts.formRaw.MrKonvenSyariahCode;
  vendorHoObj.VendorObj.MrVendorClass = CommonConstant.HeadOffice;
  vendorHoObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;
  vendorHoObj.VendorObj.PartnershipDt = dicts.formRaw.PartnershipDt;
  vendorHoObj.VendorObj.RegistrationNo = dicts.formRaw.RegistrationNo;
  vendorHoObj.VendorObj.VendorCode = dicts.formRaw.VendorCode;
  vendorHoObj.VendorObj.VendorName = dicts.formRaw.VendorName;

  vendorHoObj.VendorObj.VendorRating = dicts.formRaw.VendorRating;

  if (dicts.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO) {
    vendorHoObj.VendorObj.VendorParentId = dicts.formRaw.VendorParentId;
  }

  vendorHoObj.VendorAddrObj = new VendorAddrObj();
  vendorHoObj.VendorAddrObj.MrAddrTypeCode = "";
  vendorHoObj.VendorAddrObj.Addr = "";
  vendorHoObj.VendorAddrObj.Zipcode = "";
  vendorHoObj.VendorAddrObj.AreaCode2 = "";
  vendorHoObj.VendorAddrObj.AreaCode1 = "";
  vendorHoObj.VendorAddrObj.City = "";
  vendorHoObj.VendorAddrObj.Province = "";

  if (dicts.formRaw.IsNpwpExist == true) {
    vendorHoObj.VendorObj.TaxIdNo = dicts.formRaw.TaxIdNo;
    vendorHoObj.VendorObj.TaxpayerName = dicts.formRaw.TaxpayerName;
    vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
    vendorHoObj.VendorAddrObj.Addr = dicts.formRaw.Addr;
    vendorHoObj.VendorAddrObj.Zipcode = dicts.formRaw.Zipcode;
    vendorHoObj.VendorAddrObj.AreaCode2 = dicts.formRaw.AreaCode2;
    vendorHoObj.VendorAddrObj.AreaCode1 = dicts.formRaw.AreaCode1;
    vendorHoObj.VendorAddrObj.AreaCode3 = dicts.formRaw.AreaCode3;
    vendorHoObj.VendorAddrObj.AreaCode4 = dicts.formRaw.AreaCode4;
    vendorHoObj.VendorAddrObj.City = dicts.formRaw.City;
    vendorHoObj.VendorAddrObj.Province = dicts.formRaw.Province;
  }

  if (dicts.formRaw.VendorAttrList != undefined) {
    let formValue = dicts.formRaw.VendorAttrList;
    if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
      let vendorAttrRequest = new Array<VendorAttrContentObj>();

      for (const x in formValue) {
        let vendorAttr = new VendorAttrContentObj();
        vendorAttr.VendorAttrContentId = formValue[x]["VendorAttrContentId"];
        vendorAttr.VendorId = dicts.VendorId;
        vendorAttr.AttrContent = formValue[x]["VendorAttrValue"];
        vendorAttr.AttrCode = formValue[x]["AttrCode"];
        vendorAttrRequest.push(vendorAttr);
      }

      vendorHoObj.VendorAttrContentObjs = vendorAttrRequest;
    }
  }

  if (dicts.vendorAtpmList != undefined && dicts.vendorAtpmList.length > 0) {
    vendorHoObj.VendorAtpmMappingObjs = new Array<VendorAtpmMappingObj>();

    for (let i = 0; i < dicts.vendorAtpmList.length; i++) {

      let vendorAtpmMappingObj = new VendorAtpmMappingObj();
      vendorAtpmMappingObj.VendorAtpmId = dicts.vendorAtpmList[i].VendorAtpmId;

      vendorHoObj.VendorAtpmMappingObjs.push(vendorAtpmMappingObj);
    }
  }

  if (dicts.mode != undefined && dicts.mode == "edit") {
    vendorHoObj.VendorObj.VendorId = dicts.VendorId;
    vendorHoObj.VendorAddrObj.VendorAddrId = dicts.VendorAddrObj.VendorAddrId;
    vendorHoObj.VendorObj.RowVersion = dicts.RowVersionVendor;
    vendorHoObj.VendorAddrObj.RowVersion = dicts.RowVersionAddr;
  }

  http.post<GenericObj>(url, vendorHoObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
      toastr.successMessage(response["message"]);
      AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "MrVendorCategoryCode": dicts.formRaw.MrVendorCategoryCode });
    });
}

export function addEditvendorBranch(dicts: Record<string, any>, api: string, next: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let url = envi.FoundationR3Url + api;

  let vendorBranchObj: any;
  vendorBranchObj = new VendorBranchObj();
  vendorBranchObj.VendorObj = new VendorObj();
  vendorBranchObj.VendorAddrObj = new VendorAddrObj();
  vendorBranchObj.VendorContactPersonObj = new VendorContactPersonObj();

  vendorBranchObj.VendorObj.MrVendorCategoryCode = dicts.formRaw.MrVendorCategoryCode;
  vendorBranchObj.VendorObj.VendorCode = dicts.formRaw.VendorCode;
  vendorBranchObj.VendorObj.VendorName = dicts.formRaw.VendorName;
  vendorBranchObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;

  if (vendorBranchObj.VendorObj.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL) {
    vendorBranchObj.VendorObj.IdNo = dicts.formRaw.IdNo;
    vendorBranchObj.VendorObj.RegistrationNo = "";
    vendorBranchObj.VendorObj.LicenseNo = "";
    vendorBranchObj.VendorObj.TaxSchmCode = dicts.formRaw.TaxSchmCodePersonal1;
  }
  else {
    vendorBranchObj.VendorObj.IdNo = "";
    vendorBranchObj.VendorObj.RegistrationNo = dicts.formRaw.RegistrationNo;
    vendorBranchObj.VendorObj.LicenseNo = dicts.formRaw.LicenseNo;
    vendorBranchObj.VendorObj.TaxSchmCode = dicts.formRaw.TaxSchmCodeCompany1;
  }

  vendorBranchObj.VendorObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
  vendorBranchObj.VendorObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
  vendorBranchObj.VendorObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
  vendorBranchObj.VendorObj.Email = dicts.formRaw.Email;
  vendorBranchObj.VendorObj.VendorRating = dicts.formRaw.VendorRating;
  vendorBranchObj.VendorObj.VendorRatingAlias = dicts.formRaw.VendorRatingAlias;
  vendorBranchObj.VendorObj.EstablishmentDt = dicts.formRaw.EstablishmentDt;
  vendorBranchObj.VendorObj.PartnershipDt = dicts.formRaw.PartnershipDt;
  vendorBranchObj.VendorObj.IsActive = dicts.formRaw.IsActive;

  vendorBranchObj.VendorObj.VendorParentId = dicts.formRaw.VendorParentId;
  if (dicts.MrVendorCategoryCode != CommonConstant.SUPPLIER && dicts.MrVendorCategoryCode != CommonConstant.ASSET_INSCO_BRANCH && dicts.MrVendorCategoryCode != CommonConstant.LIFE_INSCO_BRANCH &&
    dicts.MrVendorCategoryCode != CommonConstant.SURVEYOR_BRANCH && dicts.MrVendorCategoryCode != CommonConstant.CRD_INSCO_BRANCH) {
    vendorBranchObj.VendorObj.VendorParentId = "";
  }

  vendorBranchObj.VendorObj.ReservedField2 = "";
  vendorBranchObj.VendorObj.ReservedField3 = "";
  vendorBranchObj.VendorObj.ReservedField4 = "";
  vendorBranchObj.VendorObj.ReservedField5 = "";
  vendorBranchObj.VendorObj.ReservedField6 = "";
  vendorBranchObj.VendorObj.ReservedField9 = "";
  vendorBranchObj.VendorObj.MrTaxCalcMethodCode = dicts.formRaw.MrTaxCalcMethodCode;
  vendorBranchObj.VendorObj.IsVat = dicts.formRaw.IsVat;
  vendorBranchObj.VendorObj.IsNpwpExist = dicts.formRaw.IsNpwpExist;
  vendorBranchObj.VendorObj.IsOneAffiliate = dicts.formRaw.IsOneAffiliate;

  if (vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
    vendorBranchObj.VendorObj.ReservedField3 = dicts.formRaw.ReservedField3;
    vendorBranchObj.VendorObj.ReservedField4 = dicts.formRaw.ReservedField4;
    vendorBranchObj.VendorObj.ReservedField5 = dicts.formRaw.ReservedField5;

    if (dicts.formRaw.VendorAttrList !== undefined && dicts.formRaw.VendorAttrList !== null) {
      if (dicts.formRaw.VendorAttrList.AP_DUE_AFTER_GLV !== null) {
        vendorBranchObj.VendorObj.ReservedField6 = dicts.formRaw.VendorAttrList.AP_DUE_AFTER_GLV.VendorAttrValue;
      }
    }
  }

  if (vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
    vendorBranchObj.VendorObj.ReservedField2 = dicts.formRaw.ReservedField2;
    vendorBranchObj.VendorObj.ReservedField9 = dicts.formRaw.ReservedField9;
  }

  //contact info
  vendorBranchObj.VendorContactPersonObj.Name = dicts.formRaw.Name;
  vendorBranchObj.VendorContactPersonObj.MrEmployeePosition = dicts.formRaw.MrEmployeePosition;
  vendorBranchObj.VendorContactPersonObj.Phone1 = dicts.formRaw.Phone1;
  vendorBranchObj.VendorContactPersonObj.Phone2 = dicts.formRaw.PHone2;
  vendorBranchObj.VendorContactPersonObj.Email = dicts.formRaw.EmailContact;

  if (dicts.formRaw.IsNpwpExist == true) {
    vendorBranchObj.VendorObj.TaxIdNo = dicts.formRaw.TaxIdNo;
    vendorBranchObj.VendorObj.TaxpayerName = dicts.formRaw.TaxpayerName;

    vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
    vendorBranchObj.VendorAddrObj.Addr = dicts.formRaw.Addr;
    vendorBranchObj.VendorAddrObj.Zipcode = dicts.formRaw.Zipcode;
    vendorBranchObj.VendorAddrObj.AreaCode2 = dicts.formRaw.AreaCode2;
    vendorBranchObj.VendorAddrObj.AreaCode1 = dicts.formRaw.AreaCode1;
    vendorBranchObj.VendorAddrObj.AreaCode3 = dicts.formRaw.AreaCode3;
    vendorBranchObj.VendorAddrObj.AreaCode4 = dicts.formRaw.AreaCode4;
    vendorBranchObj.VendorAddrObj.City = dicts.formRaw.City;
    vendorBranchObj.VendorAddrObj.Province = dicts.formRaw.Province;
  }
  else if (dicts.mode == "edit") {
    vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
    vendorBranchObj.VendorAddrObj.Addr = dicts.VendorAddrObj.Addr;
    vendorBranchObj.VendorAddrObj.Zipcode = dicts.VendorAddrObj.Zipcode;
    vendorBranchObj.VendorAddrObj.AreaCode2 = dicts.VendorAddrObj.AreaCode2;
    vendorBranchObj.VendorAddrObj.AreaCode1 = dicts.VendorAddrObj.AreaCode1;
    vendorBranchObj.VendorAddrObj.AreaCode3 = dicts.VendorAddrObj.AreaCode3;
    vendorBranchObj.VendorAddrObj.AreaCode4 = dicts.VendorAddrObj.AreaCode4;
    vendorBranchObj.VendorAddrObj.City = dicts.VendorAddrObj.City;
    vendorBranchObj.VendorAddrObj.Province = dicts.VendorAddrObj.Province;
  }

  if (dicts.formRaw.VendorAttrList != undefined) {
    var formValue = dicts.formRaw.VendorAttrList;

    if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
      let vendorAttrRequest = new Array<VendorAttrContentObj>();

      for (const x in formValue) {
        if (formValue[x]["VendorAttrValue"] != null) {
          let vendorAttr = new VendorAttrContentObj();

          vendorAttr.VendorAttrContentId = formValue[x]["VendorAttrContentId"];
          vendorAttr.VendorId = dicts.VendorId;
          vendorAttr.AttrContent = formValue[x]["VendorAttrValue"];
          vendorAttr.AttrCode = formValue[x]["AttrCode"];
          vendorAttrRequest.push(vendorAttr);
        }
      }
      vendorBranchObj.VendorAttrContentObjs = vendorAttrRequest;
    }
  }

  let MrVendorCategoryCodeParam = dicts.formRaw.MrVendorCategoryCode;

  if (dicts.formRaw.MrVendorCategoryCode == CommonConstant.NOTARY) {
    if (dicts.formRaw.MrVendorTypeCode == CommonConstant.VENDOR_TYPE_PERSONAL) {
      MrVendorCategoryCodeParam = CommonConstant.NOTARY_PERSONAL;
    }
    else {
      MrVendorCategoryCodeParam = CommonConstant.NOTARY_COMPANY;
    }
  }

  if (dicts.mode == "edit") {
    if (dicts.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || dicts.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY) {
      vendorBranchObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;
    }
    vendorBranchObj.VendorObj.VendorId = dicts.VendorId;
    vendorBranchObj.VendorAddrObj.VendorAddrId = dicts.VendorAddrObj.VendorAddrId;
    vendorBranchObj.VendorContactPersonObj.VendorContactPersonId = dicts.VendorContactPersonId;

    if (dicts.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH
      || dicts.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH
      || dicts.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL
      || dicts.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY
      || dicts.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY
      || dicts.MrVendorCategoryCode == CommonConstant.SUPPLIER
      || dicts.MrVendorCategoryCode == CommonConstant.CRD_INSCO_BRANCH) {
      vendorBranchObj.VendorObj.RowVersion = dicts.RowVersionVendor;
      vendorBranchObj.VendorAddrObj.RowVersion = dicts.RowVersionAddr;
    } else {
      vendorBranchObj.VendorObj.RowVersion = dicts.formRaw.RowVersionVendor;
      vendorBranchObj.VendorAddrObj.RowVersion = dicts.formRaw.RowVersionAddr;
    }

    http.post<GenericObj>(url, vendorBranchObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "MrVendorCategoryCode": MrVendorCategoryCodeParam, "mode": "edit" });
      });
  }
  else {
    http.post<GenericObj>(url, vendorBranchObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "MrVendorCategoryCode": MrVendorCategoryCodeParam });
      });
  }
}