import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { formatDate } from '@angular/common';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-login-page',
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page-new.component.html',
  providers: [RolePickService, /*NGXToastrService*/]
})

export class LoginPageComponent implements OnInit {
  @ViewChild('user') userInputRef: ElementRef;
  @ViewChild('pass') userPassRef: ElementRef;
  @ViewChild('otp') otpInputRef: ElementRef;
  @ViewChild('f') loginForm: NgForm;
  IsNeedUpdate: boolean;
  token: string;
  version: string;
  result: any;
  mode: string = "login";
  otpProperties: any;
  timer: any;
  onGoingTimer: number = 0;
  counterOtp: number = -1;
  otpConfirmCount: number = 0;
  loginObj = {
    response: {},
    user: "",
    pwd: ""
  };
  isInvalidOtp: boolean = false;
  showPass: boolean = false;
  gsValueDefaultPass: string = "";
  isEod: boolean = false;

  isGolive : boolean = environment.Golive ?? false;

  constructor(private router: Router, private http: HttpClient, public rolePickService: RolePickService,
    private route: ActivatedRoute, private cookieService: CookieService,
    private toastr: NGXToastrService, private url: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    //Ini buat check klo misal udah login jadi lgsg lempar ke tempat laennya lagi

    this.version = localStorage.getItem(CommonConstant.VERSION);
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['token'] != null) {
        this.token = queryParams['token'];
        AdInsHelper.SetCookie(this.cookieService, CommonConstant.TOKEN, this.token);
      }
    });

    if (AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) != null) {
      this.router.navigate([NavigationConstant.DASHBOARD]);
    }
  }

  SpinnerHeaders = new HttpHeaders({
    'IsLoading': "true"
  });
  SpinnerOptions = { headers: this.SpinnerHeaders, withCredentials: true };
  async ngOnInit() {
    await this.getIsEod();
    if (this.token != null) {
      if(this.isEod == true){
        await this.http.post(this.url.LoginWithToken, { ModuleCode: environment.Module }, this.SpinnerOptions).toPromise().then(
          async (response) => {
            var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
            AdInsHelper.SetCookie(this.cookieService, "BusinessDateRaw", formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US'));
            AdInsHelper.SetCookie(this.cookieService, "BusinessDate", DateParse);
            AdInsHelper.SetCookie(this.cookieService, "UserAccess", JSON.stringify(response["Identity"]));
            AdInsHelper.SetCookie(this.cookieService, "Username", JSON.stringify(response["Identity"]["UserName"]));
            AdInsHelper.SetCookie(this.cookieService, CommonConstant.TOKEN, response['Token']);
            if(typeof response["Identity_JWT"] === 'string')
            {
                AdInsHelper.SetCookie(this.cookieService, CommonConstant.JWT_TOKEN, response["Identity_JWT"] ?? "");
            }
            else
            {
                AdInsHelper.SetCookie(this.cookieService, CommonConstant.JWT_TOKEN, "");              
            }
            AdInsHelper.SetLocalStorage(CommonConstant.ENVIRONMENT_MODULE, environment.Module);
  
            await this.http.post(this.url.GetAllActiveRefFormByRoleCodeAndModuleCode, { RoleCode: response["Identity"].RoleCode, ModuleCode: environment.Module }, { withCredentials: true }).toPromise().then(
              (response) => {
                AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
                AdInsHelper.RedirectUrl(this.router, [NavigationConstant.DASHBOARD], {});
              });
          }
        );
      }
    }
    else{
      this.http.post(this.url.GetOtpProperties, {}).subscribe(
        (response) => {
          this.otpProperties = response;
        }
      );
    }
  }

  async onSubmit(event) {
    await this.getIsEod();

    if(this.isEod == true){
      window.location.reload();
      return;
    }
    event.preventDefault();
    const username = this.userInputRef.nativeElement.value;
    const password = this.userPassRef.nativeElement.value;
    var requestObj = { "Username": username, "Password": password };
    //this.rolePickService.openDialog(data.returnObject);

    this.http.post(this.url.LoginV2, requestObj, AdInsConstant.SpinnerOptions).subscribe(
      async (response) => {
        if (response["StatusCode"] == CommonConstant.STATUS_CODE_USER_LOCKED) {
          this.mode = "locked";
        }
        else {
          //this.cookieService.put("username", username);

          await this.http.post(this.url.GetListJobTitleByUsernameAndModuleV2, {UserName : username, Module : environment.Module}, AdInsConstant.SpinnerOptions).toPromise().then(
            (response) => {
              this.loginObj.response = response;
            });
          this.loginObj.user = username;
          this.loginObj.pwd = password;
          
          await this.http.post<any>(this.url.GetUserEmpByUsername, requestObj).toPromise().then(
            async (response) => {
              this.result = response;
              if (this.result.IsNeedUpdatePassword) {
                this.toastr.warningMessage(ExceptionConstant.EXP_PASSWORD);
                this.router.navigate([NavigationConstant.PAGES_CHANGE_PASSWORD], { queryParams: { "Username": username } });
              }
              else {
                if (this.otpProperties['IsUseOtp']) {
                  this.sendOtp();
                }
                else {
                  this.selectRole();
                }
              }
            }
          )
        };
      }
    );
  }

  onSubmitOtp() {
    if (this.onGoingTimer >= this.otpProperties.ExpiredTimeOTP) {
      this.toastr.errorMessage("OTP code has expired, please regenerate OTP code!");
    }
    else if (this.otpInputRef.nativeElement.value != "") {
      let reqConfirmOtpObj = {
        Username: this.result.Username,
        Counter: this.counterOtp,
        InputOtp: this.otpInputRef.nativeElement.value,
        IsLastAttempt: this.otpConfirmCount >= this.otpProperties['MaxAttempOTP'] ? true : false
      }

      this.http.post<any>(this.url.ConfirmOtp, reqConfirmOtpObj).subscribe(
        (response) => {
          if (response.IsOtpMatch) {
            this.selectRole();
          }
          else {
            this.isInvalidOtp = true;
          }
          this.otpConfirmCount++;
        },
        (error) => {
          this.toastr.errorMessage(error);
        }
      );
    }
  }

  onRegenerateClick() {
    this.counterOtp = -1;
    this.sendOtp();
    this.isInvalidOtp = false;
  }

  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate([NavigationConstant.PAGES_REQ_PASSWORD]);
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  sendOtp(){
    this.http.post<any>(this.url.SendOtp, {Counter: this.counterOtp, Username: this.result.Username}).subscribe(
      (response) => {
        this.toastr.successMessage(response.msg);
        this.counterOtp = response.Counter;
        this.resetTimer();
        if (this.mode != "otp") {
          this.mode = "otp";
        }
      },
      (error) => {
        this.toastr.errorMessage(error);
      }
    );
  }

  selectRole() {
    this.rolePickService.openDialog(this.loginObj);
    let object2 = {
      Usernames: [
        this.loginObj.user
      ],
      Role: "",
      Message: "",
      Title: "Password Expiration",
      Type: "Notification"
    };
    this.http.post(this.url.SendNotificationRemainingPasswordExpirationDaysToUser, object2).subscribe();    
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.onGoingTimer++
    }, 1000)
  }

  resetTimer() {
    clearInterval(this.timer);
    this.onGoingTimer = 0
    this.startTimer();
  }

  onClickShowPass() {
    this.showPass = !this.showPass;
  }

  async getIsEod(){
    await this.http.post(this.url.GetSysCtrlCoyBySysKey, {Code: CommonConstant.IsEodRun}).toPromise().then(
      (response) => {
        if (response['SysValue'] == '1') {
          this.isEod = true;
        }else{
          this.isEod = false;
        }
      }
    );
  }
}
