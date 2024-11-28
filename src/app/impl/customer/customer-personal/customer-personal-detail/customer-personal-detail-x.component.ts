import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CustGrpObj } from 'app/shared/model/cust-grp-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-customer-personal-detail-x',
  templateUrl: './customer-personal-detail-x.component.html'
})
export class CustomerPersonalDetailXComponent implements OnInit {

  @Output() outputTab: EventEmitter<any> = new EventEmitter();

  IdCust: number;
  flag: boolean;

  criteriaObj: CriteriaObj;
  lookUpObj: InputLookupObj;
  criteriaList: Array<CriteriaObj>;
  lookupCustGrpObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  CustGrpObj: CustGrpObj = new CustGrpObj();

  custObj: CustObj;
  custPersonalObj: CustPersonalObj;

  Country: any;
  tempCustObj: any;
  tempCountry: any;
  LocalCountry: string;
  LocalCountryCode: string;
  tempCountryCode: any;
  tempNationality: any;
  tempCustPersonalObj: CustPersonalObj = new CustPersonalObj();
  tempMrMaritalStatCode: any;

  Page: String;

  CustomerDetailForm = this.fb.group({
    CustFullName: ['', [Validators.maxLength(500)]],
    NickName: ['', [Validators.maxLength(500)]],
    MrSalutationCode: ['', [Validators.required]],
    CustPrefixName: [''],
    CustSuffixName: [''],
    NoOfDependents: ['', [Validators.pattern("^[0-9]+$")]],
    MrNationalityCode: ['', [Validators.required]],
    NoOfResidence: ['', Validators.pattern("^[0-9]+$")],
    FamilyCardNo: ['', Validators.pattern("^[0-9]+$")],
    MrEducationCode: ['', [Validators.required]],
    MrReligionCode: ['', [Validators.required]],
    IsRestInPeace: [false],
    IsVip: [false],
    VipNotes: [''],
    IsAffiliateWithMf: [false],
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, 
    private newCustService: NewCustSetData, private ngxRouter: NgxRouterService) {
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

  readonly RefMasterTypeCodeSalutation: string = CommonConstant.RefMasterTypeCodeSalutation;
  readonly RefMasterTypeCodeEducation: string = CommonConstant.RefMasterTypeCodeEducation;
  readonly RefMasterTypeCodeReligion: string = CommonConstant.RefMasterTypeCodeReligion;
  readonly RefMasterTypeCodeNationality: string = CommonConstant.RefMasterTypeCodeNationality;

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
      (response) => {
        this.Country = response;
        let splitCodeDesc = this.Country.GsValue.split(';');
        this.LocalCountryCode = splitCodeDesc[0];
        this.LocalCountry = splitCodeDesc[1];
        this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
        this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";
        this.criteriaList = new Array();
        this.criteriaObj = new CriteriaObj();
        this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        this.criteriaObj.propName = 'COUNTRY_CODE';
        this.criteriaObj.value = this.LocalCountryCode;
        this.criteriaList.push(this.criteriaObj);
        this.lookUpObj.addCritInput = this.criteriaList;
      });

    this.custObj = new CustObj()
    this.custObj.CustId = this.IdCust;

    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.tempCustObj = response;
        this.CustomerDetailForm.patchValue({
          IsVip: response.IsVip,
          VipNotes: response.VipNotes,
          IsAffiliateWithMf: response.IsAffiliateWithMf,
        });
        this.checkState();
        this.setLookupCustGrp();
      });
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post<CustPersonalObj>(this.UrlConstantNew.GetCustPersonalbyCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;
        this.http.post(this.UrlConstantNew.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeNationality }).subscribe(
          (response) => {
            this.tempNationality = response["RefMasterObjs"];

            if (this.tempCustPersonalObj.MrNationalityCode != null) {
              this.CustomerDetailForm.patchValue({
                MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode
              });
              if (this.tempCustPersonalObj.MrNationalityCode == CommonConstant.NationalityCodeLocal) {
                this.flag = true;
                this.lookUpObj.isRequired = false;
              } else {
                this.http.post(this.UrlConstantNew.GetRefCountryByCountryCode, { Code: this.tempCustPersonalObj.WnaCountryCode }).subscribe(
                  (response) => {
                    this.tempCountry = response;
                    this.lookUpObj.nameSelect = this.tempCountry.CountryName;
                    this.lookUpObj.jsonSelect = this.tempCountry;
                  });
                this.lookUpObj.isRequired = true;
              }
            } else {
              this.CustomerDetailForm.patchValue({
                MrNationalityCode: CommonConstant.NationalityCodeLocal
              });
              this.flag = true;
              this.lookUpObj.isRequired = false;
            }
          }
        );

        this.DictUcDDLObj[this.RefMasterTypeCodeSalutation] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeSalutation);
        this.DictUcDDLObj[this.RefMasterTypeCodeEducation] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeEducation);
        this.DictUcDDLObj[this.RefMasterTypeCodeReligion] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeReligion);
        this.DictUcDDLObj[this.RefMasterTypeCodeNationality] = this.newCustService.initDdlRefMaster(this.RefMasterTypeCodeNationality, null, true);

        this.CustomerDetailForm.patchValue({
          NickName: this.tempCustPersonalObj.NickName,
          MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode,
          MrEducationCode: this.tempCustPersonalObj.MrEducationCode,
          MrReligionCode: this.tempCustPersonalObj.MrReligionCode,
          MrSalutationCode: this.tempCustPersonalObj.MrSalutationCode,
          CustSuffixName: this.tempCustPersonalObj.CustSuffixName,
          CustPrefixName: this.tempCustPersonalObj.CustPrefixName,
          NoOfDependents: this.tempCustPersonalObj.NoOfDependents,
          NoOfResidence: this.tempCustPersonalObj.NoOfResidence,
          FamilyCardNo: this.tempCustPersonalObj.FamilyCardNo,
          IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace,
        });
      });
    this.http.post(this.UrlConstantNew.GetListCustGrpByMemberCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
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

  async SaveValue(IsParent: boolean = false): Promise<boolean> {
    if (this.CustomerDetailForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.CustomerDetailForm);
      return false;
    }
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj = this.tempCustPersonalObj;
    this.custPersonalObj.CustFullName = this.tempCustObj.CustName;
    this.custPersonalObj.NickName = this.CustomerDetailForm.controls["NickName"].value;
    this.custPersonalObj.MrSalutationCode = this.CustomerDetailForm.controls["MrSalutationCode"].value;
    this.custPersonalObj.MrMaritalStatCode = this.tempCustPersonalObj.MrMaritalStatCode;
    this.custPersonalObj.CustPrefixName = this.CustomerDetailForm.controls["CustPrefixName"].value;
    this.custPersonalObj.CustSuffixName = this.CustomerDetailForm.controls["CustSuffixName"].value;
    this.custPersonalObj.NoOfDependents = this.CustomerDetailForm.controls["NoOfDependents"].value;
    this.custPersonalObj.MotherMaidenName = this.tempCustPersonalObj.MotherMaidenName;
    this.custPersonalObj.MrGenderCode = this.tempCustPersonalObj.MrGenderCode;
    this.custPersonalObj.MrNationalityCode = this.CustomerDetailForm.controls["MrNationalityCode"].value;
    this.custPersonalObj.NoOfResidence = this.CustomerDetailForm.controls["NoOfResidence"].value;
    this.custPersonalObj.ParentCustId = this.CustGrpObj.CustId;
    this.custPersonalObj.CustId = this.IdCust;

    if (this.custPersonalObj.MrNationalityCode == CommonConstant.NationalityCodeLocal) {
      this.custPersonalObj.WnaCountryCode = this.LocalCountryCode;
    }
    else {
      if (this.tempCustPersonalObj.WnaCountryCode != null && this.tempCountryCode == null) {
        this.custPersonalObj.WnaCountryCode = this.tempCustPersonalObj.WnaCountryCode;
      } else {
        this.custPersonalObj.WnaCountryCode = this.tempCountryCode;
      }
    }

    this.custPersonalObj.FamilyCardNo = this.CustomerDetailForm.controls["FamilyCardNo"].value;
    this.custPersonalObj.MrEducationCode = this.CustomerDetailForm.controls["MrEducationCode"].value;
    this.custPersonalObj.MrReligionCode = this.CustomerDetailForm.controls["MrReligionCode"].value;
    this.custPersonalObj.IsRestInPeace = this.CustomerDetailForm.controls["IsRestInPeace"].value;
    this.custPersonalObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
    this.custPersonalObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
    this.custPersonalObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
    await this.http.post(this.UrlConstantNew.EditCustPersonal, this.custPersonalObj, AdInsConstant.SpinnerOptions).toPromise().then(
      response => {
        this.toastr.successMessage(response["Message"]);
        // this.wizard.goToNextStep();
        if (!IsParent) this.outputTab.emit({ CustPersonalId: this.tempCustPersonalObj.CustPersonalId, stepMode: "next" });
      }
    );
    return true;
  }
  onOptionsSelected(event: { selectedIndex: number, selectedObj: KeyValueObj, selectedValue: string }) {
    if (event.selectedValue == CommonConstant.NationalityCodeLocal) {
      this.flag = true;
      this.lookUpObj.isRequired = false;
    } else {
      this.flag = false;
      this.lookUpObj.isRequired = true;
    }
  }
  getLookUp(event) {
    this.tempCountryCode = event.CountryCode;
  }
  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    } else {
      AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.CUST_PAGING], {});
    }
  }
  
}
