import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CustCompanyObj } from 'app/shared/model/cust-company-obj.model';
import { RefIndustryTypeObj } from 'app/shared/model/ref-industry-type-obj.model';
import { DatePipe } from '@angular/common';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CookieService } from 'ngx-cookie';
import { String } from 'typescript-string-operations';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CustGrpObj } from 'app/shared/model/cust-grp-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-company-detail',
  templateUrl: './customer-company-detail.component.html',
  styleUrls: []
})
export class CustomerCompanyDetailComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  lookupCustGrpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  lookUpObj: InputLookupObj;
  CustGrpObj: CustGrpObj = new CustGrpObj();
  criteriaObj: CriteriaObj;
  criteriaList: Array<CriteriaObj>;

  tempCustObj: CustObj;
  tempCustCompanyObj: any;
  tempRefIndustryObj: any;

  custCompanyObj: CustCompanyObj;
  refIndustryTypeObj: RefIndustryTypeObj;

  IdCust: number;
  tempRefIndustryTypeId: number = 0;
  Page: String;
  UserAccess: CurrentUserContext;
  MaxDate: Date;
  MaxDtValidate: string;

  CustomerDetailForm = this.fb.group({
    NumOfEmp: ['', [Validators.maxLength(100), Validators.max(2147483647), Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]],
    MrCustModelCode: ['', [Validators.required]],
    IsSkt: [false],
    IsVip: [false],
    VipNotes: [''],
    IsAffiliateWithMf: [false],
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService,
    private newCustService: NewCustSetData) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["IdCust"] != null) {
        this.IdCust = queryParams["IdCust"];
      }
      if (queryParams["Page"] != null) {
        this.Page = queryParams["Page"];
      }
    });
  }

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;
  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    this.MaxDate = new Date(this.UserAccess.BusinessDt);
    this.MaxDate.setDate(this.MaxDate.getDate() - 1);
    this.MaxDtValidate = datePipe.transform(this.MaxDate, "yyyy-MM-dd");

    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, false, this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll);

    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.tempCustObj = response
        this.CustomerDetailForm.patchValue({
          MrCustModelCode: response.MrCustModelCode,
          IsVip: response.IsVip,
          VipNotes: response.VipNotes,
          IsAffiliateWithMf: response.IsAffiliateWithMf,
        });
        this.checkState();
        this.setLookupCustGrp();
      }
    );
    this.http.post(this.UrlConstantNew.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.CustomerDetailForm.patchValue({
          NumOfEmp: this.tempCustCompanyObj.NumOfEmp,
          EstablishmentDt: datePipe.transform(this.tempCustCompanyObj.EstablishmentDt, 'yyyy-MM-dd'),
          IsSkt: this.tempCustCompanyObj.IsSkt
        });

        if (this.tempCustCompanyObj.RefIndustryTypeId != null) {
          this.refIndustryTypeObj = new RefIndustryTypeObj();
          this.refIndustryTypeObj.RefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
          this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, { Id: this.tempCustCompanyObj.RefIndustryTypeId }).subscribe(
              (response) => {
                this.tempRefIndustryObj = response; 
                this.tempRefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
                this.lookUpObj.nameSelect = this.tempRefIndustryObj.IndustryTypeName; 
                this.lookUpObj.jsonSelect = response;
              });
          }
        });
    this.http.post(this.UrlConstantNew.GetListCustGrpByMemberCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        if(response[CommonConstant.ReturnObj].length > 0){
          let reqById: GenericObj = new GenericObj();
          reqById.Id = response[CommonConstant.ReturnObj][0].CustId;
          this.http.post(this.UrlConstantNew.GetCustByCustId, reqById).subscribe(
            (responseCustGrp) => {
              this.lookupCustGrpObj.nameSelect = responseCustGrp["CustName"];
              this.lookupCustGrpObj.jsonSelect = { CustName: responseCustGrp["CustName"] };
              this.lookupCustGrpObj.isReady = true;
              this.CustGrpObj.CustId = responseCustGrp["CustId"];
            });
        }
      }
    );
  }

  GetCustGrpData(event) {
    this.CustGrpObj.CustId = event.CustId != "" ? event.CustId : 0;
  }

  setLookupCustGrp() {
    this.lookupCustGrpObj.urlJson = "./assets/lookup/lookupCustomer.json";
    this.lookupCustGrpObj.pagingJson = "./assets/lookup/lookupCustomer.json";
    this.lookupCustGrpObj.genericJson = "./assets/lookup/lookupCustomer.json";
    this.lookupCustGrpObj.isRequired = false;
    this.lookupCustGrpObj.isReady = true;
    this.lookupCustGrpObj.isClear = true;

    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaObj.propName = 'C.CUST_NO';
    this.criteriaObj.value = this.tempCustObj.CustNo;
    this.criteriaList.push(this.criteriaObj);
    this.lookupCustGrpObj.addCritInput = this.criteriaList;
  }

  onFocusOutEstDate(event){
    if(event.target.value > this.MaxDtValidate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
      return;
    }
  }

  async SaveValue(IsParent: boolean = false): Promise<boolean> {
    if (this.CustomerDetailForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.CustomerDetailForm);
      return false;
    }
    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custCompanyObj.NumOfEmp = this.CustomerDetailForm.controls["NumOfEmp"].value;
    this.custCompanyObj.EstablishmentDt = this.CustomerDetailForm.controls["EstablishmentDt"].value;
    this.custCompanyObj.IsSkt = this.CustomerDetailForm.controls["IsSkt"].value;
    this.custCompanyObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
    this.custCompanyObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
    this.custCompanyObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
    this.custCompanyObj.MrCustModelCode = this.CustomerDetailForm.controls["MrCustModelCode"].value;
    this.custCompanyObj.ParentCustId = this.CustGrpObj.CustId;

    if(this.CustomerDetailForm.controls["EstablishmentDt"].value > this.MaxDtValidate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
      return false;
    }

    if (this.tempRefIndustryObj != null && this.tempRefIndustryTypeId === null) {
      this.custCompanyObj.RefIndustryTypeId = this.custCompanyObj.RefIndustryTypeId;
    }
    else {
      this.custCompanyObj.RefIndustryTypeId = this.tempRefIndustryTypeId;
    }

    await this.http.post(this.UrlConstantNew.EditCustCompany, this.custCompanyObj, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        if(!IsParent) this.outputTab.emit({ CustCompanyId: this.tempCustCompanyObj.CustCompanyId, stepMode: 'next' });
      }
    );
    return true;
  }

  getLookUp(event) {
    this.tempRefIndustryTypeId = event.RefIndustryTypeId;
  }

  checkState() {
    if (!this.CustomerDetailForm.controls.IsVip.value) {
      this.CustomerDetailForm.patchValue({
        VipNotes: null
      });
      this.CustomerDetailForm.controls.VipNotes.disable();
      this.CustomerDetailForm.controls.VipNotes.clearAsyncValidators();

    } else {
      this.CustomerDetailForm.controls.VipNotes.enable();
      this.CustomerDetailForm.controls.VipNotes.setValidators(Validators.required);

    }
    this.CustomerDetailForm.controls.VipNotes.updateValueAndValidity();
  }

  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    }
    else {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_PAGING], {});
    }
  }
}