
import { RefRoleObj } from 'app/shared/model/ref-role-obj.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html'
})
export class RoleAddEditComponent implements OnInit {
  refRoleObj: RefRoleObj;
  type: string = 'Add';
  RefRoleId: any;
  resultData: any;
  title : string = "Role-Add";
  RefRoleForm = this.fb.group({
    RoleCode: ['', [Validators.required, Validators.maxLength(50)]],
    RoleName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_ROLE;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.type = queryParams['mode'];
      }
      if (queryParams['RefRoleId'] != null) {
        this.RefRoleId = queryParams['RefRoleId'];
      }
    });
  }


  ngOnInit() {
    if (this.type == 'edit') {
      this.title="Role-Edit";
      this.RefRoleForm.controls["RoleCode"].disable();
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RefRoleId = this.RefRoleId;
      this.http.post(this.UrlConstantNew.GetRefRoleByRefRoleId, {Id : this.RefRoleId}).subscribe(
        response => {
          this.resultData = response;
          this.RefRoleForm.patchValue({
            RoleCode: this.resultData.RoleCode,
            RoleName: this.resultData.RoleName,
            IsActive: this.resultData.IsActive
          });
        }
      );
    }
  }

  SaveForm() {
    if (this.type == "Add") {
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RoleCode = this.RefRoleForm.controls["RoleCode"].value
      this.refRoleObj.RoleName = this.RefRoleForm.controls["RoleName"].value;
      this.refRoleObj.IsActive = this.RefRoleForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.AddRefRoleV2, this.refRoleObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
            this.service.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYSTEM_SETTING_ROLE],{ });
        }
      );
    } else {
      this.refRoleObj = this.resultData;
      this.refRoleObj.RefRoleId = this.RefRoleId;
      this.refRoleObj.RoleCode = this.RefRoleForm.controls["RoleCode"].value;
      this.refRoleObj.RoleName = this.RefRoleForm.controls["RoleName"].value;
      this.refRoleObj.IsActive = this.RefRoleForm.controls["IsActive"].value;
      this.http.post(this.UrlConstantNew.EditRefRole, this.refRoleObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYSTEM_SETTING_ROLE],{ });
        }
      );
    }
  }
}
