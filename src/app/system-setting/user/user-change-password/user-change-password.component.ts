import { RefUserObj } from "app/shared/model/ref-user-obj.model";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { RefEmpObj } from "app/shared/model/ref-emp-obj.model";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { AdInsHelper } from "app/shared/AdInsHelper";
import { CookieService } from "ngx-cookie";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Component({
  selector: "app-user-change-password",
  templateUrl: "./user-change-password.component.html",
 // providers: [NGXToastrService]
})
export class UserChangePasswordComponent implements OnInit {
  apiUrl: any;
  refUserObj: RefUserObj;
  refEmpObj: RefEmpObj = new RefEmpObj();
  username: any;
  Password: any;
  RePassword: any;
  RefUserId: any;
  NewPassword: any;
  NewRePassword: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private service: NGXToastrService, 
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew
  ) {
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.username = currentUserContext.UserName;
  }

  ngOnInit() {
    var getEmpUrl: any;

    this.apiUrl = this.UrlConstantNew.GetUserByUsername;
    this.refUserObj = new RefUserObj();
    // this.refUserObj.username = this.username;
    this.http.post(this.apiUrl, this.refUserObj).subscribe(
      response => {
        this.refUserObj = response["returnObject"];
        this.refEmpObj = new RefEmpObj();
        getEmpUrl = this.UrlConstantNew.GetRefEmployeeById;
        // this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.http.post(getEmpUrl, {Id : this.refEmpObj.RefEmpId}).subscribe(response => {
          this.refEmpObj = response["returnObject"];
        });
      }
    );
  }

  Back(): void {
    this.location.back();
  }

  Save(UserAddEditForm: NgForm): void {
    this.spinner.show();
    if (
      UserAddEditForm.value.NewPassword != UserAddEditForm.value.NewRePassword
    ) {
      this.service.typeErrorCustom(
        "New Password and New Re-Password Not Valid"
      );
      this.spinner.hide();
    } else {
      // this.refUserObj.newPass = UserAddEditForm.value.NewPassword;
      // this.refUserObj.oldPass = UserAddEditForm.value.Password;
      // this.refUserObj.newPassVerif = UserAddEditForm.value.NewRePassword;
      //SAVE
      this.apiUrl = this.UrlConstantNew.ChangePassword;
      this.http.post(this.apiUrl, this.refUserObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.service.typeSave(response["message"]);
          this.router.navigateByUrl(NavigationConstant.SYSTEM_SETTING_REF_USER, { skipLocationChange: true })
            .then(() =>
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SYSTEM_SETTING_CHANGE_PASSWORD],{})
            );
          this.spinner.hide();
        },
        error => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }
}
