import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsHelper } from '../AdInsHelper';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { formatDate } from '@angular/common';
import { CommonConstant } from '../constant/CommonConstant';
import { NavigationConstant } from '../NavigationConstant';
import { AdInsConstant } from '../AdInstConstant';
import { StorageService } from '../services/StorageService';
import { UcDropdownSearchConstant, UcDropdownSearchObj } from '../model/library/uc-dropdown-search-obj.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UrlConstantNew } from '../constant/URLConstantNew';
import { ExceptionConstant } from '../constant/ExceptionConstant';

@Component({
  selector: 'app-rolepick',
  templateUrl: './rolepick-new.component.html',
  styleUrls: ['./rolepick.component.css'],
})
export class RolepickComponent implements OnInit, AfterViewInit {
  listRole: any;
  refUser: any;
  cookieOptions: CookieOptions;
  officeDropdownSearchObj: UcDropdownSearchObj = new UcDropdownSearchObj(this.UrlConstantNew);
  rolesDropdownSearchObj: UcDropdownSearchObj = new UcDropdownSearchObj(this.UrlConstantNew);
  selectedOffice: number = -1;
  selectedRole: number= -1;
  tempList: Array<any> = new Array<any>();
  gsValueExpiredUser: number;
  warningMessage: string = "";

  RolepickForm = this.fb.group({
    Office: ['', [Validators.required]],
    Role: ['', [Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private http: HttpClient, private router: Router, public dialog: MatDialog, private cookieService: CookieService, private strService: StorageService, private UrlConstantNew: UrlConstantNew) {
    this.refUser = data["response"];
    this.listRole = data["response"]["RefUserRoles"];
  }

  ngOnInit() {
    this.officeDropdownSearchObj.ddsType = UcDropdownSearchConstant.DDL_TYPE_ONE;
    this.officeDropdownSearchObj.isObject = true;
    this.officeDropdownSearchObj.placeholder = "Choose your office";
    this.officeDropdownSearchObj.isSelectOutput = true;
    this.officeDropdownSearchObj.customKey = "OfficeCode";
    this.officeDropdownSearchObj.customValue = "OfficeName";
    this.officeDropdownSearchObj.isCustomList = true;

    this.rolesDropdownSearchObj.ddsType = UcDropdownSearchConstant.DDL_TYPE_ONE;
    this.rolesDropdownSearchObj.isObject = true;
    this.rolesDropdownSearchObj.placeholder = "Choose your role";
    this.rolesDropdownSearchObj.isSelectOutput = true;
    this.rolesDropdownSearchObj.customKey = "JobTitleAndRoleName";
    this.rolesDropdownSearchObj.customValue = "JobTitleAndRoleName";
    this.rolesDropdownSearchObj.isCustomList = true;

    this.warningMessageUserExpired();
  }

  ngAfterViewInit(): void {
  }

  setRole(event) {
    this.selectedRole = event.selectedObj.Index;
  }

  setOffice(event) {
    this.selectedOffice = event.selectedObj.Index;
    this.selectedRole = 0;
    this.rolesDropdownSearchObj.size = (this.listRole[event.selectedObj.Index].Roles.length) + 1;
    this.RolepickForm.patchValue({
      Office: event.selectedObj.OfficeName,
      Role: this.listRole[event.selectedObj.Index].Roles[0].JobTitleAndRoleName
    });
    this.rolesDropdownSearchObj.ddsValue = this.listRole[event.selectedObj.Index].Roles[0].JobTitleAndRoleName;
  }

  SpinnerHeaders = new HttpHeaders({
    'IsLoading': "true"
  });
  SpinnerOptions = { headers: this.SpinnerHeaders, withCredentials: true };
  chooseRole() {
    var UserIdentityObj = {
      RefUserId: this.refUser.RefUserId,
      UserName: this.refUser.Username,
      EmpNo: this.refUser.EmpNo,
      EmpName: this.refUser.EmpName,
      OfficeId: this.listRole[this.selectedOffice].RefOfficeId,
      OfficeCode: this.listRole[this.selectedOffice].OfficeCode,
      OfficeName: this.listRole[this.selectedOffice].OfficeName,
      MrOfficeTypeCode: this.listRole[this.selectedOffice].MrOfficeTypeCode,
      RoleId: this.listRole[this.selectedOffice].Roles[this.selectedRole].RefRoleId,
      RoleCode: this.listRole[this.selectedOffice].Roles[this.selectedRole].RoleCode,
      RoleName: this.listRole[this.selectedOffice].Roles[this.selectedRole].RoleName,
      JobTitleId: this.listRole[this.selectedOffice].Roles[this.selectedRole].RefJobTitleId,
      JobTitleCode: this.listRole[this.selectedOffice].Roles[this.selectedRole].JobTitleCode,
      JobTitleName: this.listRole[this.selectedOffice].Roles[this.selectedRole].JobTitleName,
      BusinessDt: this.refUser.BusinessDt,
      BusinessDtStr: this.refUser.BusinessDtStr,
      Email: this.refUser.Email1,
      CoyName: this.refUser.CoyName
    }
    var roleObject = {
      UserName: this.refUser.Username,
      Password: this.data.pwd,
      OfficeCode: this.listRole[this.selectedOffice].OfficeCode,
      RoleCode: this.listRole[this.selectedOffice].Roles[this.selectedRole].RoleCode,
      JobTitleCode: this.listRole[this.selectedOffice].Roles[this.selectedRole].JobTitleCode,
      RequestDateTime: this.refUser.BusinessDt,
      ModuleCode: environment.Module,
      RowVersion: "",
      UserIdentityObj: UserIdentityObj
    };

    if (this.data.pwd == null) {
      this.http.post(this.UrlConstantNew.UpdateTokenV2_1, roleObject, this.SpinnerOptions).subscribe(
        (response) => {
          //Cookie sudah diambil dari BE (Di set manual dulu)
          AdInsHelper.StoreSession(response, this.cookieService);

          this.http.post(this.UrlConstantNew.GetAllActiveRefFormByRoleCodeAndModuleCode, { RoleCode: this.listRole[this.selectedOffice].Roles[this.selectedRole].RoleCode, ModuleCode: environment.Module }, { withCredentials: true }).subscribe(
            (response) => {
              AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
              this.strService.set(AdInsConstant.WatchRoleState, true);
              this.router.navigateByUrl(NavigationConstant.DASHEMPTY, { skipLocationChange: true }).then(() => {
                AdInsHelper.RedirectUrl(this.router, [NavigationConstant.DASHBOARD], {}, true);
              });
              this.dialog.closeAll();
            });
        }
      );

    }
    else {
      this.http.post(this.UrlConstantNew.LoginByRole, roleObject, this.SpinnerOptions).subscribe(
        (response) => {
          //Cookie sudah diambil dari BE (Di set manual dulu)

          this.http.post(this.UrlConstantNew.CheckUserSessionLog, roleObject, this.SpinnerOptions).subscribe(
            (response) => {});
          
          AdInsHelper.StoreSession(response, this.cookieService);

          this.http.post(this.UrlConstantNew.GetAllActiveRefFormByRoleCodeAndModuleCode, { RoleCode: this.listRole[this.selectedOffice].Roles[this.selectedRole].RoleCode, ModuleCode: environment.Module }, { withCredentials: true }).subscribe(
            (response) => {
              AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
              this.router.navigate([NavigationConstant.DASHBOARD]);
              this.dialog.closeAll();
            });
        }
      );
    }
  }
  
  async warningMessageUserExpired() {
    await this.http.post<any>(this.UrlConstantNew.GetUserEmpByUsername, {Username: this.refUser.Username}).toPromise().then(
        async (response) => {
          var tempExpiredDt = new Date(response.ExpiredDt);
          tempExpiredDt.setHours(0, 0, 0, 0);
          var expiredDt = formatDate(tempExpiredDt, 'yyyy-MM-dd', 'en-US');
          
          let generalSettingCode = {
            Code: CommonConstant.GsCodeNDayWarningExpiredUser
          }
          
          await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, generalSettingCode).toPromise().then(
          (response) => {
            this.gsValueExpiredUser = parseInt(response['GsValue']);
          });
  
          var businessDt = new Date(this.refUser.BusinessDt);
  
          var differenceInTime = tempExpiredDt.getTime()- businessDt.getTime();
          var differenceInDays = differenceInTime / (1000 * 3600 * 24);
          var daysUntilExpiration = Math.ceil(differenceInDays);
  
          var tempDayWarningExpiredUser = businessDt.setDate(businessDt.getDate() + this.gsValueExpiredUser);
          var dayWarningExpiredUser = formatDate(new Date(tempDayWarningExpiredUser), 'yyyy-MM-dd', 'en-US');
          
          if (expiredDt <= dayWarningExpiredUser) {
            daysUntilExpiration = daysUntilExpiration < 0 ? 0 : daysUntilExpiration;
            this.warningMessage = ExceptionConstant.PASSWORD_WILL_BE_EXPIRED + daysUntilExpiration + " days. " + ExceptionConstant.CHANGE_PASSWORD;
          }
        }
      )
  }
}
