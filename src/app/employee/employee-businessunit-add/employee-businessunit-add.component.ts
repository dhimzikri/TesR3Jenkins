import { Component, OnInit } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefUserRole } from 'app/shared/model/ref-user-role-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { BusinessUnitObj } from 'app/shared/model/business-unit-obj.model';
import { RefJobTitleObj } from 'app/shared/model/ref-job-title-obj.model';
import { RefUserObj } from 'app/shared/model/ref-user-obj.model';
import { OfficeObj } from 'app/shared/model/office-obj.model';
import { RefRoleObj } from 'app/shared/model/ref-role-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-employee-businessunit-add',
  templateUrl: './employee-businessunit-add.component.html'
})
export class EmployeeBusinessunitAddComponent implements OnInit {

  EmployeeBusinessUnitForm = this.fb.group({
    IsActive: [false]
  });

  title: string = "Business Unit-Add";
  lookupValue: any;
  mode: string;

  inputPagingObjBusinessUnit: InputLookupObj;
  inputPagingObjJobTitle: InputLookupObj;
  inputPagingObjSupervisor: InputLookupObj;
  inputPagingObjOffice: InputLookupObj;
  inputPagingObjRole: InputLookupObj;

  RefUserId: any;
  RefUserRoleId: any;
  criteria: CriteriaObj[] = [];
  result: any;
  userRole = new RefUserRole;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.EMP_BZ_UNIT_PAGING;
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private fb: FormBuilder, private toastr: NGXToastrService,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefUserId = queryParams["RefUserId"];
      this.RefUserRoleId = queryParams["RefUserRoleId"];
      this.mode = queryParams["mode"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewEmployeeBusinessUnitMember.json";
    this.initLookUp();

    if (this.mode == "edit") {
      this.title = "Business Unit-Edit";
      this.userRole.RefUserRoleId = this.RefUserRoleId;

      this.http.post(this.UrlConstantNew.GetRefUserRoleById, {Id : this.RefUserRoleId}).subscribe(
        (response) => {
          this.result = response;
          this.userRole = this.result;
          this.EmployeeBusinessUnitForm.patchValue({
            IsActive: this.result.IsActive
          });
          var BizUnit = new BusinessUnitObj();

          BizUnit.RefBizUnitId = this.result["RefBizUnitId"];

          this.http.post(this.UrlConstantNew.GetRefBizUnit, {Id : BizUnit.RefBizUnitId}).subscribe(
            (response) => {
              this.inputPagingObjBusinessUnit.nameSelect = response["BizUnitName"];
            }
          )

          var JobTitle = new RefJobTitleObj();
          JobTitle.RefJobTitleId = this.result["RefJobTitleId"];

          this.http.post(this.UrlConstantNew.GetRefJobTitleById, {Id: this.result["RefJobTitleId"]}).subscribe(
            (response) => {
              this.inputPagingObjJobTitle.nameSelect = response["JobTitleName"];
            }
          )

          var Supervisor = new RefUserObj();
          Supervisor.RefUserId = this.result["SpvId"];
          if (this.result["SpvId"] == null) {
            this.inputPagingObjSupervisor.nameSelect = "";
          }
          else {
            this.http.post(this.UrlConstantNew.GetEmpNameByRefUserId, {Id : Supervisor.RefUserId}).subscribe(
              (response) => {
                this.inputPagingObjSupervisor.nameSelect = response["EmpName"];
              }
            )
          }
          var Office = new OfficeObj();
          Office.RefOfficeId = this.result["RefOfficeId"];
          this.http.post(this.UrlConstantNew.GetRefOfficeByRefOfficeId, {Id : Office.RefOfficeId}).subscribe(
            (response) => {
              this.inputPagingObjOffice.nameSelect = response["OfficeName"];
            }
          )

          var Role = new RefRoleObj();
          Role.RefRoleId = this.result["RefRoleId"];
          this.http.post(this.UrlConstantNew.GetRefRoleByRefRoleId, {Id : Role.RefRoleId}).subscribe(
            (response) => {
              this.inputPagingObjRole.nameSelect = response["RoleName"];
            }
          )
        }
      );
    }
  }

  initLookUp() {
    this.inputPagingObjBusinessUnit = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjBusinessUnit.urlJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";
    this.inputPagingObjBusinessUnit.pagingJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";
    this.inputPagingObjBusinessUnit.genericJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";

    this.inputPagingObjJobTitle = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjJobTitle.urlJson = "./assets/lookup/lookupEmployeeJobTitle.json";
    this.inputPagingObjJobTitle.pagingJson = "./assets/lookup/lookupEmployeeJobTitle.json";
    this.inputPagingObjJobTitle.genericJson = "./assets/lookup/lookupEmployeeJobTitle.json";

    this.inputPagingObjSupervisor = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjSupervisor.urlJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.pagingJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.genericJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.isRequired = false;
    this.inputPagingObjSupervisor.addCritInput = [];
    var critObj = new CriteriaObj();
    critObj.propName = "REF_USER_ID";
    critObj.restriction = AdInsConstant.RestrictionNeq;
    critObj.value = this.RefUserId;
    this.inputPagingObjSupervisor.addCritInput.push(critObj);

    this.inputPagingObjOffice = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjOffice.urlJson = "./assets/lookup/lookupEmployeeOffice.json";
    this.inputPagingObjOffice.pagingJson = "./assets/lookup/lookupEmployeeOffice.json";
    this.inputPagingObjOffice.genericJson = "./assets/lookup/lookupEmployeeOffice.json";

    this.inputPagingObjRole = new InputLookupObj(this.UrlConstantNew);
    this.inputPagingObjRole.urlJson = "./assets/lookup/lookupEmployeeRole.json";
    this.inputPagingObjRole.pagingJson = "./assets/lookup/lookupEmployeeRole.json";
    this.inputPagingObjRole.genericJson = "./assets/lookup/lookupEmployeeRole.json";

  }
  //#region getLookup
  getBizUnitId(ev) {
    this.userRole.RefBizUnitId = ev.RefBizUnitId;

  }
  getJobTitleId(ev) {
    this.userRole.RefJobTitleId = ev.RefJobTitleId;

  }
  getSpvId(ev) {
    this.userRole.SpvId = ev.RefUserId;

  }
  getOfficeId(ev) {
    this.userRole.RefOfficeId = ev.RefOfficeId;

  }
  getRoleId(ev) {
    this.userRole.RefRoleId = ev.RefRoleId;

  }
  //#endregion


  SaveForm() {
    if (this.mode == "edit") {
      this.userRole.IsActive = this.EmployeeBusinessUnitForm.controls.IsActive.value;
      this.userRole.RefUserRoleId = this.RefUserRoleId;
      this.userRole.RefUserId = this.RefUserId;
      this.userRole.RowVersion = this.result["RowVersion"];

      this.http.post(this.UrlConstantNew.EditRefUserRole, this.userRole, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_BZ_UNIT_PAGING],{ "RefUserId": this.RefUserId });
        }
      );
    }
    else {
      this.userRole.IsActive = this.EmployeeBusinessUnitForm.controls.IsActive.value;
      this.userRole.RowVersion = "";
      this.userRole.RefUserId = this.RefUserId;
      this.http.post(this.UrlConstantNew.AddRefUserRole, this.userRole, AdInsConstant.SpinnerOptions).subscribe((response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.EMP_BZ_UNIT_PAGING],{ "RefUserId": this.RefUserId });
      });
    }
  }
}
