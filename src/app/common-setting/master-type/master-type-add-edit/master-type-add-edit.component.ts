import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefRoleObj } from 'app/shared/model/ref-role-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-master-type-add-edit',
  templateUrl: './master-type-add-edit.component.html',
  //providers: [NGXToastrService]
})
export class MasterTypeAddEditComponent implements OnInit {

  parents: any;
  refRoleObj: RefRoleObj;
  type: any = 'Add';
  roleCodeModel: any;
  roleNameModel: any;
  isActive: any;
  refRoleId: any;
  resultData: any;
  masterType: any;
  masterTypeCodeModel: any;
  descrModel: any;
  sandiBiModel: any;
  

  constructor(private route: ActivatedRoute, private location: Location, private spinner: NgxSpinnerService, 
    private http: HttpClient, private service: NGXToastrService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.type = queryParams['mode'];
      }
      if (queryParams['efRoleId'] != null) {
        this.refRoleId = queryParams['refRoleId'];
      }
    });
  }


  ngOnInit() {
    if (this.type == 'edit') {
      this.refRoleObj = new RefRoleObj()
      this.refRoleObj.RefRoleId = +this.refRoleId
      this.http.post(this.UrlConstantNew.GetRefRoleByRefRoleId, {Id : this.refRoleObj.RefRoleId}).subscribe(
        (response) => {
          this.refRoleObj = response['returnObject'];
          this.roleCodeModel = response['returnObject']['roleCode']
          this.roleNameModel = response['returnObject']['roleName']
          this.isActive = this.refRoleObj.IsActive;

        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(RoleAddEditForm: NgForm): void {
    this.spinner.show();
    var roleObj: RefRoleObj;
    roleObj = new RefRoleObj()
    roleObj.RoleCode = RoleAddEditForm.value.roleCodeModel;

    //MODE-ADD
    if (this.type != 'edit') {
      //CHECK-DUPLICATE-CODE
      this.http.post(this.UrlConstantNew.GetRefRole, roleObj).subscribe(
        (response) => {
          roleObj = response['returnObject'];
          if (roleObj != null) {
            this.service.typeErrorCustom(ExceptionConstant.CODE_HAS_BEEN_USED);
          }
          else {
            this.refRoleObj = new RefRoleObj();
            this.refRoleObj.RoleCode = RoleAddEditForm.value.roleCodeModel;
            this.refRoleObj.RoleName = RoleAddEditForm.value.roleNameModel;
            this.refRoleObj.IsActive = RoleAddEditForm.value.isActive;

            //SAVE
            this.http.post(this.UrlConstantNew.AddRefRoleV2, this.refRoleObj, AdInsConstant.SpinnerOptions).subscribe(
              (response) => {
                this.service.typeSave(ExceptionConstant.SAVE_SUCCESSED);
                this.location.back();
                this.spinner.hide();

              },
              (error) => {
                this.service.typeErrorCustom(error);
                this.spinner.hide();
              }
            );
          }
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );


    }
    //MODE-EDIT
    else {
      this.refRoleObj.RefRoleId = this.refRoleId;
      this.refRoleObj.RoleCode = RoleAddEditForm.value.roleCodeModel;
      this.refRoleObj.RoleName = RoleAddEditForm.value.roleNameModel;
      this.refRoleObj.IsActive = RoleAddEditForm.value.isActive;

      //SAVE
      this.http.post(this.UrlConstantNew.EditRefRole, this.refRoleObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.service.typeSave(ExceptionConstant.EDIT_SUCCESSED);
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );

    }

  }

  FillFormEdit() {
  }
}
