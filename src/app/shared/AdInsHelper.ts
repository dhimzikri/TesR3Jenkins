import { formatDate } from "@angular/common";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { environment } from "environments/environment";
import { CommonConstant } from "./constant/CommonConstant";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import * as CryptoJS from 'crypto-js';
import { NgxRouterService } from "@adins/fe-core";

export class AdInsHelper {

    private static ucxRouter: NgxRouterService;

    public static get ngxRouter() {
        return this.ucxRouter;
    }

    public static set ngxRouter(service: NgxRouterService) {
        this.ucxRouter = service;
    }

    //Function
    public static InsertLog(cookieService: CookieService, url, type, param = "") {
        let today = new Date();
        var dateNow = formatDate(today, 'yyyy-MM-dd hh:mm:ss', 'en-US');

        var listPageAccess = [];
        listPageAccess = JSON.parse(localStorage.getItem(CommonConstant.PAGE_ACCESS));
        var userAccess = this.GetCookie(cookieService, CommonConstant.USER_ACCESS);
        var userAcc = userAccess ? JSON.parse(userAccess) : null;
        var pageAccess = listPageAccess;
        if (listPageAccess == null) {
            pageAccess = [];
        }
        else {
            pageAccess = listPageAccess;
        }
        if (userAcc != null) {
            var pageAccessNow = {
                CurrentUrl: url,
                UrlAccessTime: dateNow,
                Type: type,
                UserSessionLogId: userAcc.userSessionLogId
            }
        } else {
            var pageAccessNow = {
                CurrentUrl: url,
                UrlAccessTime: dateNow,
                Type: type,
                UserSessionLogId: null
            }
        }
        pageAccess.push(pageAccessNow);
        localStorage.setItem('PageAccess', JSON.stringify(pageAccess));
    }

    // see AdInsHelper.service.ts
    // public static ForceLogOut(cookieService: CookieService, timeLeft, toastr, http: HttpClient) {
    //     let interval = setInterval(() => {
    //         if (timeLeft > 0) {
    //             console.log("Time Left : " + timeLeft)
    //             toastr.warningMessage("Automatic Log out at : " + timeLeft);
    //             timeLeft--;
    //         } else {
    //             this.ClearAllLogAndRemoveToken(cookieService, http);
    //             window.location.reload();
    //         }
    //     }, 1000)
    // }

    public static ClearAllLog(cookieService: CookieService) {
        let version = localStorage.getItem(CommonConstant.VERSION);
        localStorage.clear();
        localStorage.setItem("Version", version);
        cookieService.removeAll();
    }

    // see AdInsHelper.service.ts
    // public static ClearAllLogAndRemoveToken(cookieService: CookieService, http: HttpClient) {
    //     var url = environment.FoundationR3Url + this.UrlConstantNew.LogoutAuth;
    //     http.post(url, {}).subscribe();
    //     let version = localStorage.getItem(CommonConstant.VERSION);
    //     localStorage.clear();
    //     localStorage.setItem("Version", version);
    //     cookieService.removeAll();
    // }

    public static GetUserAccess(cookieService: CookieService) {
      var userAccess = AdInsHelper.GetCookie(cookieService, CommonConstant.USER_ACCESS);
      if (!userAccess) return null;
      return JSON.parse(userAccess);
    }

    public static ClearPageAccessLog(cookieService: CookieService) {
        localStorage.removeItem("PageAccess");
        cookieService.remove("PageAccess");
    }

    public static CheckSessionTimeout(cookieService: CookieService) {
        let today = new Date();
        var businessDtBefore = this.GetCookie(cookieService, CommonConstant.LAST_ACCESS_TIME);
        var businessDtNow = formatDate(today, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        if (businessDtBefore == undefined || businessDtBefore == null) {
            this.SetCookie(cookieService, CommonConstant.LAST_ACCESS_TIME, businessDtNow);
        }
        else {
            var bsDtBefore = new Date(businessDtBefore);
            var tempDate = today.getTime() - bsDtBefore.getTime();
            if (tempDate > AdInsConstant.TimeoutSession) {
                var data = { status: "001", reason: "Session Time Out" };
                AdInsHelper.ClearAllLog(cookieService);
                return "1";
            }
            this.SetCookie(cookieService, CommonConstant.LAST_ACCESS_TIME, businessDtNow);
        }
        return "0";

    }

    public static IsGrantAccess(formPath) {
        var temp = AdInsHelper.GetLocalStorage(CommonConstant.MENU);
        var objectMenu = [];
        objectMenu = JSON.parse(temp);
        if (objectMenu != null) {
            var exsisting = objectMenu['find'](x => x.path == formPath);
            if (exsisting == undefined) {
                return false;
            } else {
                return true;
            }
        }
    }


    public static transformAmount(element: any) {
        var formattedAmount = "";
        if (element.target.value != "") {

            if (parseFloat(element.target.value).toLocaleString('en') != "NaN") {
                formattedAmount = parseFloat(element.target.value).toLocaleString('en');
            }
            else {
                formattedAmount = "";
            }
        }
        return formattedAmount;
    }

    public static transformToDecimal(element: any) {
        var parsedValue = 0;
        if (element.target.value != "") {
            if (parseFloat(element.target.value.toString().replace(/,/g, '')).toString() != "NaN") {
                parsedValue = parseFloat(element.target.value.toString().replace(/,/g, ''));
            } else {
                return "";
            }
        }
        return parsedValue;
    }

    public static Encrypt128CBC(plain: string, k: string, i: string) {
        var key = CryptoJS.enc.Utf8.parse(k);
        var iv = CryptoJS.enc.Utf8.parse(i);

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plain), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted
    }

    public static OpenPefindoMultiResultView(TrxNo: string, MrCustTypeCode: string) {
        var url = environment.FoundationR3Web + "/View/Pefindo?GroupTrxNo=" + TrxNo + "&MrCustTypeCode=" + MrCustTypeCode;
        window.open(url, "_blank");
    }

    public static RedirectUrl(router: Router | NgxRouterService, url: Array<string>, queryParams: {} = {}, isSkipLocation: boolean = false) {
        // Ngebuat bisa jalanin Constructor dan NgOnInit lagi
        // const prev = router.routeReuseStrategy.shouldReuseRoute;
        // if (Object.entries(queryParams).length === 0) {
        //     router.routeReuseStrategy.shouldReuseRoute = () => {
        //         return false;
        //     }
        // }
        // router.navigateByUrl(
        //   router.createUrlTree(
        //     [url.toString()], { queryParams: queryParams }
        //   ), { skipLocationChange: isSkipLocation }
        // );
        // router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
        if (router instanceof Router) {
            const params = this.ucxRouter.createQueryParams(queryParams);
            router.navigate(url, { queryParams: params, skipLocationChange: isSkipLocation });
        } else {
            router.navigate(url, queryParams);
        }
        
        // setTimeout(() => {
        //     router.routeReuseStrategy.shouldReuseRoute = prev;
        // }, 1);
    }

    public static RedirectUrlView(router: Router, url: Array<string>, queryParams: {}, isSkipLocation: boolean = false) {
        router.navigate(url, { queryParams: queryParams, skipLocationChange: isSkipLocation });
    }

    public static SetLocalStorage(key: string, value: string) {
        return localStorage.setItem(key, this.EncryptString(value, environment.ChipperKeyLocalStorage));
    }

    public static GetLocalStorage(key: string) {
        return this.DecryptString(localStorage.getItem(key), environment.ChipperKeyLocalStorage);
    }

    public static SetCookie(cookieService: CookieService, key: string, value: string) {
        cookieService.put(key, this.EncryptString(value, environment.ChipperKeyCookie));
    }

    public static GetCookie(cookieService: CookieService, key: string) {
        var value = cookieService.get(key);
        if (value == undefined || value.trim() == '') return null;
        return this.DecryptString(value, environment.ChipperKeyCookie);
    }

    private static EncryptString(plaintext: string, chipperKey: string = "") {
        if (chipperKey == undefined || chipperKey.trim() == '') return plaintext;
        var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
        var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
        var encrypted = CryptoJS.AES.encrypt(plaintext, chipperKeyArr, { iv: iv });
        var result = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        return result;
    }

    private static DecryptString(chipperText: string, chipperKey: string) {
        if (
            chipperKey == undefined || chipperKey.trim() == '' ||
            chipperText == undefined || chipperText.trim() == ''
        ) return chipperText;
        var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
        var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
        var decrypted = CryptoJS.AES.decrypt(chipperText, chipperKeyArr, { iv: iv });
        var plainText = decrypted.toString(CryptoJS.enc.Utf8);
        return plainText;
    }

    public static StoreSession(response: any, cookieService: CookieService) {
        const DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
        let Identity = response["Identity"];
        Identity['Token'] = response['Token'];
        
        AdInsHelper.SetCookie(cookieService, CommonConstant.TOKEN, response['Token']);
        AdInsHelper.SetCookie(cookieService, "BusinessDateRaw", formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US'));
        AdInsHelper.SetCookie(cookieService, "BusinessDate", DateParse);
        AdInsHelper.SetCookie(cookieService, "UserAccess", JSON.stringify(Identity));
        AdInsHelper.SetCookie(cookieService, "Username", JSON.stringify(response["Identity"]["UserName"]));
        if(typeof response["Identity_JWT"] === 'string')
        {
            AdInsHelper.SetCookie(cookieService, CommonConstant.JWT_TOKEN, response["Identity_JWT"] ?? "");
        }
        else
        {
            AdInsHelper.SetCookie(cookieService, CommonConstant.JWT_TOKEN, "");              
        }
        AdInsHelper.SetLocalStorage(CommonConstant.ENVIRONMENT_MODULE, environment.Module);
    }
}
