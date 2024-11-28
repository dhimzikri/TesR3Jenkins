import { environment } from "environments/environment";

// URL" API di concat dengan environment url + version + api path
// KECUALI: API" yang di pakai di UC". contoh: GetPagingObjectBySQL, DeleteFromPaging, Approval CreateNewRFA


export class URLConstantX {
 
    // CUSTOMER
    public static AddCustPersonalMainDataX = environment.FoundationR3Url + "/v1" + "/CustX/AddCustPersonalMainData";
    public static AddCustCompanyMainDataX = environment.FoundationR3Url + "/v1" + "/CustX/AddCustCompanyMainData";
    public static EditCustPersonalMainData = environment.FoundationR3Url + "/v1" + "/CustX/EditCustPersonalMainData";
    public static EditCustCompanyMainData = environment.FoundationR3Url + "/v1" + "/CustX/EditCustCompanyMainData";
    public static GetCustomerAndNegativeCustDuplicateCheckX = environment.FoundationR3Url +  "/v1" + "/CustDuplicateCheckX/GetCustomerAndNegativeCustDuplicateCheckX"
    // REF OFFICE
    public static GetOfficeXbyOfficeCode = environment.FoundationR3Url + "/v1" + "/RefOfficeXObj/GetObjectByKeyAndValue";
    public static AddRefOfficeX = environment.FoundationR3Url + "/v1" + "/RefOfficeX/AddRefOfficeX";
    public static EditRefOfficeX = environment.FoundationR3Url + "/v1" + "/RefOfficeX/EditRefOfficeX";
    //VENDOR FUNDING COY
    public static AddVendorFundingCoyX = environment.FoundationR3Url + "/v1" + "/VendorX/AddVendorX";
    public static EditVendorFundingCoyX = environment.FoundationR3Url + "/v1" + "/VendorX/EditVendorX";
    public static GetVendorXByVendorCode = environment.FoundationR3Url + "/v1" + "/VendorX/GetVendorXByVendorCode";
}

