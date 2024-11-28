import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';



@Component({
  selector: "reset-password",
  templateUrl: "./reset-password-new.component.html",
 // providers: [NGXToastrService]
})
export class ResetPasswordComponent implements OnInit {

  ResetPassForm = this.fb.group({
    NewPassword: ['', [Validators.required, Validators.maxLength(50)]],
    ConfirmPassword: ['', [Validators.required, Validators.maxLength(50)]],
  });

  version: string;
  isCompleted: boolean = false;
  isValidated: boolean = false;
  isLoaded: boolean = false;
  code: string = "";
  RefUserObj: any;
  customPattern = new Array<CustomPatternObj>();
  isMatch = true;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private router: Router, private UrlConstantNew: UrlConstantNew) {
    this.version = localStorage.getItem(CommonConstant.VERSION);
    this.code = this.route.snapshot.paramMap.get('code');
  }

  ngOnInit() {
    if (this.code != "") {
      this.getRefUser();
    }

    this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GsCodePasswordRegex }).subscribe(
      (response: { GsValue }) => {
        let patternObj: CustomPatternObj = new CustomPatternObj();
        patternObj.pattern = response.GsValue;
        patternObj.invalidMsg = ExceptionConstant.PWD_EXCEPTION;
        this.customPattern.push(patternObj);
        this.ResetPassForm.controls.NewPassword.setValidators([Validators.required, Validators.pattern(response.GsValue)]);
        this.ResetPassForm.controls.NewPassword.updateValueAndValidity();
      }
    );
  }

  eventValidatePassword() {
    if (this.ResetPassForm.controls["NewPassword"].value != this.ResetPassForm.controls["ConfirmPassword"].value) {
      this.isMatch = false;
    }
    else {
      this.isMatch = true;
    }
  }

  SaveForm() {
    if (this.ResetPassForm.controls["NewPassword"].value == this.ResetPassForm.controls["ConfirmPassword"].value) {
      var requestObj =
      {
        Username: this.RefUserObj.Username,
        NewPassword: this.ResetPassForm.controls["NewPassword"].value,
        Password: "-",
      };
      this.http.post(this.UrlConstantNew.ResetPasswordByUsername, requestObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.isCompleted = true;
        }
      );
    }
    else {
      this.toastr.warningMessage("Password Mismatch");
    }
  }

  getRefUser() {
    var requestObj =
    {
      ResetCode: this.code
    };
    this.http.post(this.UrlConstantNew.GetRefUserByResetCode, requestObj).subscribe(
      (response) => {
        this.RefUserObj = response;
        if (this.RefUserObj.RefUserId != 0) {
          this.isValidated = true;
        }
        this.isLoaded = true;
      }
    );
  }

  back() {
    this.router.navigate([NavigationConstant.PAGES_LOGIN], { skipLocationChange: true });
  }
}
