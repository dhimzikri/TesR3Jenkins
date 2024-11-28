import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CabinetObj } from 'app/shared/model/document-management/cabinet-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-cabinet-add-edit',
  templateUrl: './cabinet-add-edit.component.html'
})
export class CabinetAddEditComponent implements OnInit {
  title:string = "ADD CABINET";
  CabinetCode: string;
  Cabinet: CabinetObj = new CabinetObj();
  user:any;

  CabinetForm = this.fb.group({
    CabinetCode: ['', [Validators.required, Validators.maxLength(50)]],
    CabinetName: ['', [Validators.required, Validators.maxLength(100)]],
    CabinetInfo: ['', Validators.maxLength(4000)],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew) {
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['CabinetCode'] !== null){
          this.CabinetCode = params['CabinetCode']
        }
      }
    );
  }

  ngOnInit() {
    this.user = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    if(this.CabinetCode !== undefined){
      this.title = "EDIT CABINET"
      this.CabinetForm.controls.CabinetCode.disable();
      this.Cabinet.CabinetCode = this.CabinetCode;
      this.http.post<CabinetObj>(this.UrlConstantNew.GetCabinetByCode, {Code: this.CabinetCode}).subscribe(
        (response) => {
          this.Cabinet = response;
          this.CabinetForm.controls['CabinetCode'].patchValue(response.CabinetCode);
          this.CabinetForm.controls['CabinetName'].patchValue(response.CabinetName);
          this.CabinetForm.controls['CabinetInfo'].patchValue(response.CabinetInfo);
          this.CabinetForm.controls['IsActive'].patchValue(response.IsActive);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  SaveForm(){
    this.Cabinet.CabinetCode = this.CabinetForm.controls['CabinetCode'].value;
    this.Cabinet.CabinetName = this.CabinetForm.controls['CabinetName'].value;
    this.Cabinet.CabinetInfo = this.CabinetForm.controls['CabinetInfo'].value;
    this.Cabinet.IsActive = this.CabinetForm.controls['IsActive'].value;

    if(this.CabinetCode !== undefined) {
      this.http.post<CabinetObj>(this.UrlConstantNew.EditCabinet, this.Cabinet, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Success!");
          this.router.navigateByUrl(NavigationConstant.DOC_MNGMNT_CABINET_PAGING);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.Cabinet.RefOfficeId = this.user.OfficeId;
      this.http.post<CabinetObj>(this.UrlConstantNew.AddCabinet, this.Cabinet, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage("Success!");
          this.router.navigateByUrl(NavigationConstant.DOC_MNGMNT_CABINET_PAGING);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}