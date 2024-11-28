import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CookieService } from 'ngx-cookie';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-upload-license',
  templateUrl: './upload-license.component.html',
 // providers: [NGXToastrService]
})
export class UploadLicenseComponent implements OnInit {

  readonly CancelLink: string = NavigationConstant.LICENSE_PAGING;

  LicenseForm = this.fb.group({
    LicenseFile : ['',Validators.required],
    LicenseStateFile : ['',Validators.required]
  })

  fileLicense : any;
  fileLicenseState : any;


  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private toastr: NGXToastrService,
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew
    ) { }

  ngOnInit() {
  }

  InputFileLicense(file: File){
    console.log("file license",file);
    this.fileLicense = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      
      this.LicenseForm.controls['LicenseFile'].setValue(fileReader.result);
    }
    fileReader.readAsText(this.fileLicense);

    

  }

  InputFileLicenseState(file: FileList){
    console.log("file license state", file);
    this.fileLicenseState = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      
      this.LicenseForm.controls['LicenseStateFile'].setValue(fileReader.result);
    }
    fileReader.readAsText(this.fileLicenseState);

    

  }

  uploadDocument() {
    
    console.log("upload",this.LicenseForm);
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    var LicenseObj = { LicenseFileContent : this.LicenseForm.controls['LicenseFile'].value, LicenseStateFileContent :this.LicenseForm.controls['LicenseStateFile'].value, Username : currentUserContext[CommonConstant.USER_NAME] };
    
    this.http.post(this.UrlConstantNew.UploadLicense, LicenseObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.LICENSE_PAGING],{});
      }
    );
    
}

}
