import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';



@Component({
  selector: "request-new-password",
  templateUrl: "./request-new-password-new.component.html",
 // providers: [NGXToastrService]
})
export class RequestNewPasswordComponent implements OnInit {

  ReqPassForm = this.fb.group({
    Username: ['', [Validators.required, Validators.maxLength(50)]],
  });
  version: string;
  isRequested: boolean = false;
  censoredEmail: string = "";
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private router: Router, private UrlConstantNew: UrlConstantNew) {
    this.version = localStorage.getItem(CommonConstant.VERSION);
  }

  ngOnInit() {


  }

  SaveForm() {
    var requestObj =
    {
      UserName: this.ReqPassForm.controls["Username"].value
    };
    this.http.post(this.UrlConstantNew.RequestNewPassword, requestObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.censoredEmail = response["CensoredEmail"];
        this.isRequested = true;
      }
    );
  }

  back() {
    this.router.navigate([NavigationConstant.PAGES_LOGIN], { skipLocationChange: true});
  }
}
