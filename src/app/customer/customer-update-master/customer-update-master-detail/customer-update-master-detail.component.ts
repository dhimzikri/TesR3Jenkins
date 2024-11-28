import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ClaimTaskService } from 'app/shared/claimTask.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import Stepper from 'bs-stepper';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-customer-update-master-detail',
  templateUrl: './customer-update-master-detail.component.html',
  styles: []
})
export class CustomerUpdateMasterDetailComponent implements OnInit {
  private CompanyWizard: Stepper;
  private PersonalWizard: Stepper;
  ViewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  CustNoObj: GenericObj = new GenericObj();
  CustDataTrxId: number;
  CustNo: string;
  StepIdx: number;
  MrCustTypeCode: string;
  CompanyConstant: string;
  PersonalConstant: string;
  WfTaskListId: any;
  SubjectType: string;
  IdCust: number = 0;
  isMarried: boolean = false;
  currentUserContext : CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

  CustPersonalStep = {
    "CUST": 1,
    "ADDR": 2,
    "FAMILY": 3,
    "EMERGENCY": 4,
    "JOB": 5,
    "FIN": 6
  };
  CustCompanyStep = {
    "CUST": 1,
    "ADDR": 2,
    "SHAREHOLDER": 3,
    "CONTACT": 4,
    "FIN": 5,
    "LEGAL": 6
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private claimTaskService: ClaimTaskService, 
    private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService,
    private adInsHelperService: AdInsHelperService
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["CustDataTrxId"] != null) {
        this.CustDataTrxId = queryParams["CustDataTrxId"];
      }
      if (queryParams["CustNo"] != null) {
        this.CustNo = queryParams["CustNo"];
      }
      if (queryParams["WfTaskListId"] != null) {
        this.WfTaskListId = queryParams["WfTaskListId"];
      }
      if (queryParams["SubjectTypeDescr"] != null) {
        this.SubjectType = queryParams["SubjectTypeDescr"];
      }
    });
    this.StepIdx = 1;
    this.PersonalConstant = CommonConstant.CustTypePersonal;
    this.CompanyConstant = CommonConstant.CustTypeCompany;
    this.ViewGenericObj.viewInput = "./assets/ucviewgeneric/viewUpdateMasterCust.json";
  }

  async ngOnInit() {
    this.claimTask();

    this.CustNoObj.CustNo = this.CustNo;
    await this.http.post(this.UrlConstantNew.GetCustByCustNo, this.CustNoObj).toPromise().then(
      (response: CustObj) => {
        this.MrCustTypeCode = response.MrCustTypeCode;
        this.IdCust = response.CustId;
        if (response.MrCustTypeCode == CommonConstant.CustTypePersonal) {
          this.PersonalWizard = new Stepper(document.querySelector('#PersonalWizard'), {
            linear: false,
            animation: true
          });
          document.getElementById('PersonalWizard').style.display = 'block';
          document.getElementById('CompanyWizard').style.display = 'none';
        }
        else {
          this.CompanyWizard = new Stepper(document.querySelector('#CompanyWizard'), {
            linear: false,
            animation: true
          });
          document.getElementById('PersonalWizard').style.display = 'none';
          document.getElementById('CompanyWizard').style.display = 'block';
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )

    await this.http.post<CustPersonalObj>(this.UrlConstantNew.GetCustPersonalbyCustId, {Id : this.IdCust}).toPromise().then(
      (response) => {
        if(response.MrMaritalStatCode == CommonConstant.MasteCodeMartialStatsMarried){
          this.isMarried = true;
        }
      }
    );
  }

  claimTask() {
    this.claimTaskService.ClaimTaskV2(this.WfTaskListId);
  }

  EnterTab(step) {
    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      switch (step) {
        case "CUST":
          this.StepIdx = this.CustPersonalStep["CUST"];
          break;
        case "ADDR":
          this.StepIdx = this.CustPersonalStep["ADDR"];
          break;
        case "FAMILY":
          this.StepIdx = this.CustPersonalStep["FAMILY"];
          break;
        case "EMERGENCY":
          this.StepIdx = this.CustPersonalStep["EMERGENCY"];
          break;
        case "JOB":
          this.StepIdx = this.CustPersonalStep["JOB"];
          break;
        case "FIN":
          this.StepIdx = this.CustPersonalStep["FIN"];
          break;
        default:
          break;
      }
    }
    else {
      switch (step) {
        case "CUST":
          this.StepIdx = this.CustCompanyStep["CUST"];
          break;
        case "ADDR":
          this.StepIdx = this.CustCompanyStep["ADDR"];
          break;
        case "SHAREHOLDER":
          this.StepIdx = this.CustCompanyStep["SHAREHOLDER"];
          break;
        case "CONTACT":
          this.StepIdx = this.CustCompanyStep["CONTACT"];
          break;
        case "FIN":
          this.StepIdx = this.CustCompanyStep["FIN"];
          break;
        case "LEGAL":
          this.StepIdx = this.CustCompanyStep["LEGAL"];
          break;
        default:
          break;
      }
    }
  }

  StepperHandler(e) {
    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      if (this.StepIdx == this.CustPersonalStep["FIN"]) {
        // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
      }
      else {
        this.StepIdx++;
        this.PersonalWizard.next();
      }
    }
    else {
      if (this.StepIdx == this.CustCompanyStep["LEGAL"]) {
        // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
        AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_UPDATE_DATA_PAGING], {});
      }
      else {
        this.StepIdx++;
        this.CompanyWizard.next();
      }
    }
  }

  GetCallback(e) {
    this.adInsHelperService.OpenProdOfferingViewByCodeAndVersion(e.ViewObj.ProdOfferingCode, e.ViewObj.ProdOfferingVersion);
  }
}
