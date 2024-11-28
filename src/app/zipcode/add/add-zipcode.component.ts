import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/ref-zipcode-obj.model';
import { RefProvDistrictObj } from 'app/shared/model/ref-prov-district-obj.model'
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'add-zipcode',
  templateUrl: './add-zipcode.component.html',
 // providers: [NGXToastrService]
})
export class ZipcodeAddComponent implements OnInit {
  pageType: string = "add";
  refZipcodeId: number;
  rzcObj: RefZipcodeObj;
  resultData: any;
  inputPagingObj: any;
  inputDistrictLookupObj;
  refDistrict: RefProvDistrictObj;
  resultDistrictData: any;

  RefZipCodeForm = this.fb.group({
    AreaCode1: ['', [Validators.required, Validators.maxLength(50)]],
    AreaCode2: ['', [Validators.required, Validators.maxLength(50)]],
    City: ['', [Validators.required, Validators.maxLength(50)]],
    Zipcode: ['', [Validators.pattern("^[0-9]+$"), Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    SubZipcode: ['', [Validators.pattern("^[0-9]+$"), Validators.maxLength(4)]],
    IsActive: [true, Validators.required]
  });

  readonly CancelLink: string = NavigationConstant.CS_ZIPCODE_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["refZipcodeId"] != null) {
        this.refZipcodeId = queryParams["refZipcodeId"];
      }
    });
  }

  ngOnInit() {
    this.inputDistrictLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputDistrictLookupObj.urlJson = "./assets/lookup/lookupDistrict.json";
    this.inputDistrictLookupObj.pagingJson = "./assets/lookup/lookupDistrict.json";
    this.inputDistrictLookupObj.genericJson = "./assets/lookup/lookupDistrict.json";

    if (this.pageType == "edit") {
      this.rzcObj = new RefZipcodeObj();
      this.rzcObj.RefZipcodeId = this.refZipcodeId;
      this.http.post(this.UrlConstantNew.GetRefZipCodeById, {Id : this.refZipcodeId}).subscribe(
        response => {
          this.resultData = response;
          this.refZipcodeId = this.resultData.RefZipcodeId;
          this.inputDistrictLookupObj.idSelect = this.resultData.RefProvDistrictId;
          this.RefZipCodeForm.patchValue({
            AreaCode1: this.resultData.AreaCode1,
            AreaCode2: this.resultData.AreaCode2,
            City: this.resultData.City,
            Zipcode: this.resultData.Zipcode,
            SubZipcode: this.resultData.SubZipcode,
            RefProvDistrictId: this.resultData.RefProvDistrictId,
            IsActive: this.resultData.IsActive
          });
          this.refDistrict = new RefProvDistrictObj();
          this.refDistrict.RefProvDistrictId = this.resultData.RefProvDistrictId;
          this.http.post(this.UrlConstantNew.GetRefProvDistrictById, {Id : this.resultData.RefProvDistrictId}).subscribe(
            (response) => {
              this.resultDistrictData = response;
              this.inputDistrictLookupObj.jsonSelect = this.resultDistrictData;
              this.inputDistrictLookupObj.nameSelect = this.resultDistrictData.ProvDistrictName;
            });
        });
    }
  }

  SaveForm() {
    this.rzcObj = new RefZipcodeObj();
    this.rzcObj = this.RefZipCodeForm.value;
    this.rzcObj.RefProvDistrictId = this.inputDistrictLookupObj.idSelect;
    if (this.rzcObj.SubZipcode == "") {
      this.rzcObj.SubZipcode = " ";
    }
    if (this.pageType == "add") {
      this.rzcObj.RowVersion = "";
      this.http.post(this.UrlConstantNew.AddRefZipcodeV2, this.rzcObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_ZIPCODE_PAGING],{});
        }
      );
    } else {
      this.rzcObj.RefZipcodeId = this.refZipcodeId;
      this.rzcObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.UrlConstantNew.EditRefZipcodeV2, this.rzcObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_ZIPCODE_PAGING],{});
        }
      );
    }
  }
}
