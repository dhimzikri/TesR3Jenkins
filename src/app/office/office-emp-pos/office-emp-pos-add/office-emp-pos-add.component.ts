import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { RefOfficeObj } from 'app/shared/model/ref-office-obj.model';
import { EmpPositionObj } from 'app/shared/model/emp-position-obj.model';
import { OrgJobTitleObj } from 'app/shared/model/org-job-title-obj.model';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-emp-pos-add',
  templateUrl: './office-emp-pos-add.component.html',
 // providers: [NGXToastrService]
})
export class OfficeEmpPosAddComponent implements OnInit {

  pageType: string = "add";
  refEmpId: any;
  empPositionId: any;
  empNo: any;
  empName: any;
  officeCode: any;
  officeName: any;
  isActive: boolean = false;
  allRefOffice: any;
  refOfficeId: any;
  allSupervisor: any;
  superiorRefEmpId: any = '';
  allBiz: any;
  refBizUnitId: any = 'selectOne';
  allOrgJobTitle: any;
  orgJobTitleId: any = 'selectOne';
  positionStartDt: any;
  positionFinishDt: any;
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj;
  empPositionObj: EmpPositionObj;
  orgJobTitleObj: OrgJobTitleObj;
  empPositionVisible: boolean = true;
  addEditVisible: boolean = false;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  readonly CancelLink: string = NavigationConstant.OFFICE_EMP_POS;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private cookieService: CookieService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['param'] != null) {
        this.pageType = queryParams['param'];
      }
      if (queryParams['refEmpId'] != null) {
        this.refEmpId = queryParams['refEmpId'];
      }
      if (queryParams['empNo'] != null) {
        this.empNo = queryParams['empNo'];
      }
      if (queryParams['empName'] != null) {
        this.empName = queryParams['empName'];
      }
      if (queryParams['refOfficeId'] != null) {
        this.refOfficeId = queryParams['refOfficeId'];
      }
      if (queryParams['officeCode'] != null) {
        this.officeCode = queryParams['officeCode'];
      }
      if (queryParams['officeName'] != null) {
        this.officeName = queryParams['officeName'];
      }
      if (queryParams['empPositionId'] != null) {
        this.empPositionId = queryParams['empPositionId'];
      }
      if (queryParams['refBizUnitId'] != null) {
        this.refBizUnitId = queryParams['refBizUnitId'];
      }
    });
  }

  ngOnInit() {
    const getuserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.refOfficeId = getuserAccess.refOfficeId
    this.refOfficeObj = new RefOfficeObj()
    this.http.post(this.UrlConstantNew.GetAllRefOffice, null).subscribe(
      (response) => {
        this.allRefOffice = response['returnObject']
      })
    this.refOfficeObj.RefOfficeId = this.refOfficeId
    this.http.post(this.UrlConstantNew.GetEmpListByOfficeIdAndIsActive, this.refOfficeObj).subscribe(
      (response) => {
        this.allSupervisor = response['returnObject']
      })
    this.http.post(this.UrlConstantNew.GetRefBizUnitByOffice, this.refOfficeObj).subscribe(
      (response) => {
        this.allBiz = response['returnObject']
      })
    if (this.pageType == "edit") {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj.empPositionId = this.empPositionId
      this.onChangeBiz(this.refBizUnitId)
      this.http.post(this.UrlConstantNew.GetEmpByEmpPositionId, this.empPositionObj).subscribe(
        (response) => {
          this.resultData = response['returnObject'];
          this.refOfficeId = response['returnObject']['refOfficeId']
          this.orgJobTitleId = response['returnObject']['orgJobTitleId']
          this.positionStartDt = formatDate(response['returnObject']['positionStartDt'], 'yyyy-MM-dd', 'en-US')
          this.positionFinishDt = formatDate(response['returnObject']['positionFinishDt'], 'yyyy-MM-dd', 'en-US')
          this.superiorRefEmpId = response['returnObject']['superiorRefEmpId']
          if (this.resultData.isActive == CommonConstant.TRUE_CONDITION) {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }
        })
    } else {
    }
  }
  onChangeBiz(bizValue) {
    this.orgJobTitleId = 'selectOne';
    this.orgJobTitleObj = new OrgJobTitleObj()
    if (bizValue == 'selectOne') {
      bizValue = 0
    }
    this.orgJobTitleObj.orgMdlStrucId = bizValue
    this.http.post(this.UrlConstantNew.GetOrgJobTitleByMdlStruc, this.orgJobTitleObj).subscribe(
      (response) => {
        this.allOrgJobTitle = response['returnObject']
      })
  }

  SaveForm(ReqForm: NgForm) {
    if (this.pageType == 'add') {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj = ReqForm.value
      this.empPositionObj.refEmpId = this.refEmpId
      if (this.isActive == false) {
        this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
      }
      else {
        this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
      }

      this.http.post(this.UrlConstantNew.AddEmpPosition, this.empPositionObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          if (response['isError'] != true) {
            this.toastr.successMessage(response['message']);
            AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.EMP], {});
          }
        }
      );
    } else {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj = ReqForm.value
      this.empPositionObj.refEmpId = this.refEmpId
      this.empPositionObj.empPositionId = this.empPositionId
      if (this.isActive == false) {
        this.empPositionObj.isActive = CommonConstant.FALSE_CONDITION;
      }
      else {
        this.empPositionObj.isActive = CommonConstant.TRUE_CONDITION;
      }
      this.http.post(this.UrlConstantNew.EditEmpPosition, this.empPositionObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.OFFICE], {});
        }
      );

    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
  }

}
