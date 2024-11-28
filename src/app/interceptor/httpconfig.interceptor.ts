import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { EnviConfigService } from 'app/shared/services/enviConfig.service';
import { UrlConstantService } from 'app/shared/services/urlConstant.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    count = 0;
    constructor(public errorDialogService: ErrorDialogService, private spinner: NgxSpinnerService, private router: Router, private toastr: NGXToastrService, private cookieService: CookieService, 
        private http: HttpClient) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);
        if (environment.SpinnerOnHttpPost) {
            if (request.method == "POST" && (request.body == null || request.body.isLoading == undefined || request.body.isLoading == true)) {
                this.spinner.show();
            }
            if (request.url != "./assets/i18n/en.json") {
                this.count++;
            }
        } else {
            if (request.headers.has('IsLoading') && request.headers.get("IsLoading") == "true") {
                this.spinner.show();
                this.count++;
            }
        }

        var currentUserContext = AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) ? JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS)) : null;
        var token: string = "";
        var myObj;
        let today = new Date();
        var businessDt = formatDate(today, 'yyyy-MM-dd', 'en-US');
        let jtoken = "";

        var checkSession = AdInsHelper.CheckSessionTimeout(this.cookieService);
        if (checkSession == "1") {
            // this.errorDialogService.openDialog(AdInsErrorMessage.SessionTimeout);
            this.spinner.hide();
            AdInsHelper.RedirectUrl(this.router, [NavigationConstant.PAGES_LOGIN], {});
        }

        if (request.url.includes("Add") || request.url.includes("Edit") || request.url.includes("Delete")) {
            var n = request.url.lastIndexOf("/");
            var oldPath = request.url.substring(n + 1);
        } else {
            var oldPath = "-";
        }

        //Ini kalau buat Login belom punya Current User Contexts

        if (currentUserContext != null) {
            token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
            myObj = new Object();
            if (request.body != null) {
                myObj = request.body;
            }
            myObj["RequestDateTime"] = businessDt;
            jtoken = AdInsHelper.GetCookie(this.cookieService, CommonConstant.JWT_TOKEN);
        }
        else {
            myObj = new Object();
            if (request.body != null) {
                myObj = request.body;
            }
            myObj["RequestDateTime"] = businessDt;
            token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
            jtoken = AdInsHelper.GetCookie(this.cookieService, CommonConstant.JWT_TOKEN);
        }

        if (token == null) {
            token = "";
        }

        if (jtoken == null) {
            jtoken = "";
        }

        if (token != "") {
            request = request.clone({ headers: request.headers.set('AdInsKey', token) });
        }

        if (jtoken != "") {
            request = request.clone({headers: request.headers.set("Authorization", `Bearer ${jtoken}`)});
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Authentication', 'my-authentication') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Credentials', 'true') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'POST') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization') });
        request = request.clone({ headers: request.headers.set('X-Content-Type-Options', 'nosniff') });
        request = request.clone({ headers: request.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0') });
        request = request.clone({ headers: request.headers.set('Pragma', 'no-cache') });
        request = request.clone({ headers: request.headers.set('Expires', '0') });

        let newUrl: string;
        let vers: string;
        let apiVers = request.url.match(CommonConstant.regexAPI);

        if (apiVers != undefined) {
            //temporary logic if BE no versioning & camunda
            if (environment["isCore"] == undefined || !environment["isCore"]) {
                newUrl = request.url;
                newUrl = newUrl.replace(apiVers[0], "/v1");
                request = request.clone({ url: newUrl });
            }
            vers = apiVers[0].substring(2);
            request = request.clone({ headers: request.headers.set('X-Version', vers) });
        }

        request = request.clone({ body: myObj });
        AdInsHelper.InsertLog(this.cookieService, request.url, "API", request.body);
        console.log(request.body);
        // console.log(JSON.stringify(request.body));

        // Fix incorrected url
        const serviceUrl = request.url.replace(/([^:]\/)\/+/g, '$1');
        request = request.clone({url: serviceUrl});

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //Ini Error kalau sudah masuk sampai ke Back End
                    if (event.body.HeaderObj != undefined) {
                        if (event.body.HeaderObj.StatusCode != undefined && event.body.HeaderObj.StatusCode != '200' && event.body.HeaderObj.StatusCode != "001" && event.body.HeaderObj.StatusCode != "002") {

                            if (event.body.HeaderObj.StatusCode == '400' && event.body.HeaderObj.ErrorMessages != undefined) { //DTO
                                for (var i = 0; i < event.body.HeaderObj.ErrorMessages.length; i++) {
                                    this.toastr.typeErrorCopyOnClick(event.body.HeaderObj.ErrorMessages[i].Message, 'Status: ' + event.body.HeaderObj.StatusCode);
                                }
                            } else {
                                let data = {};
                                data = {
                                    reason: event.body.HeaderObj.Message ? event.body.HeaderObj.Message : '',
                                    status: event.body.HeaderObj.StatusCode
                                };
                                this.toastr.typeErrorCopyOnClick(data['reason'], 'Status: ' + data['status']);
                                console.log(event.body);
                            }

                            return;
                        }
                    }
                }

                return event;
            }),
            //Ini Error kalau tidak sampai ke Back End
            catchError((error: HttpErrorResponse) => {
                if (error.error != null) {
                    if (error.error.ErrorMessages != null) {
                        for (var i = 0; i < error.error.ErrorMessages.length; i++) {
                            this.toastr.typeErrorCopyOnClick(error.error.ErrorMessages[i].Message, 'Status: ' + error.error.StatusCode);
                        }
                    } else if(error.status == 401) {
                        var url = "/v1/SysCtrlCoy/GetSysCtrlCoyByKey"
                        this.http.post(environment.FoundationR3Url + url, {Code: CommonConstant.IsEodRun}).toPromise().then(
                            (response) => {
                                if (response['SysValue'] == '1') {
                                    AdInsHelper.ClearAllLog(this.cookieService);
                                    this.cookieService.removeAll();
                                    sessionStorage.clear();
                                    this.toastr.warningMessage('Your session has been expired, Please re-login.');
                                    this.router.navigate([NavigationConstant.PAGES_LOGIN]);
                                    return new Observable<HttpEvent<any>>();
                                }
                            });
                    }else if (error.error.Message != null) {
                        this.toastr.typeErrorCopyOnClick(error.error.Message, 'Status: ' + error.error.StatusCode);
                    } else {
                        this.toastr.typeErrorCopyOnClick(error.url, 'Status: ' + error.status);
                    }
                }
                else {
                    this.toastr.typeErrorCopyOnClick(error.message, 'Status: ' + error.status);
                }

                console.log(JSON.stringify(request.body));
                return throwError(error);
            }), finalize(() => {

                if (environment.SpinnerOnHttpPost) {
                    if (request.url != "./assets/i18n/en.json") {
                        this.count--;
                    }
                } else {
                    if (request.headers.has('IsLoading') && request.headers.get("IsLoading") == "true") {
                        this.count--;
                    }
                    // if (request.body.isLoading != undefined && request.body.isLoading == true) {
                    //     this.count--;
                    // }
                }

                if (request.method == "POST") {
                    AdInsHelper.ClearPageAccessLog(this.cookieService);
                }
                if (this.count == 0) {
                    this.spinner.hide();
                }
            })
        );
    }
}
