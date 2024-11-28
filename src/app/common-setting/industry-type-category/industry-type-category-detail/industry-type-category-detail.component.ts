import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { IndustryTypeCategoryObj } from 'app/shared/model/industry-type-category-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';

@Component({
  selector: 'app-industry-type-category-detail',
  templateUrl: './industry-type-category-detail.component.html'
})
export class IndustryTypeCategoryDetailComponent implements OnInit {
  
  title: string = "Industry Type Category - Add"
  pageType: string = "add";
  RefIndustryTypeCategoryId: number;
  industryTypeCategoryObj: IndustryTypeCategoryObj;
  resultData: any;
  inputLookupObj : InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  RefIndustryTypeCategoryForm = this.fb.group({
    RefIndustryTypeCategoryCode: ['', [Validators.required, Validators.maxLength(100)]],
    RefIndustryTypeCategoryName: ['', [Validators.required, Validators.maxLength(200)]],
    RefEconomicSectorId: ['', Validators.required],
    RegRptCode: ['',[Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["IndustryTypeCategoryId"] != null) {
        this.RefIndustryTypeCategoryId = queryParams["IndustryTypeCategoryId"];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj.urlJson =  "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.pagingJson =  "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.genericJson =  "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.isRequired = false;


    if (this.pageType == "edit") {
      console.log("aa")
      this.title = "Industry Type Category - Edit"
      this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryCode"].disable();
      this.industryTypeCategoryObj = new IndustryTypeCategoryObj();
      this.industryTypeCategoryObj.RefIndustryTypeCategoryId = this.RefIndustryTypeCategoryId ;
      this.http.post(this.UrlConstantNew.GetIndustryTypeCategoryByIndustryTypeCategoryId, this.industryTypeCategoryObj).subscribe(
        response => {
          this.resultData = response;
          console.log(response)
          this.RefIndustryTypeCategoryForm.patchValue({ 
             RefIndustryTypeCategoryCode: this.resultData. RefIndustryTypeCategoryCode,
            RefIndustryTypeCategoryName: this.resultData.RefIndustryTypeCategoryName,
            RefEconomicSectorId: this.resultData.RefEconomicSectorId,
            RegRptCode: this.resultData.RegRptCode, 
            IsActive: this.resultData.IsActive
          });
          this.inputLookupObj.nameSelect = this.resultData.RefEconomicSectorName; 
          this.inputLookupObj.jsonSelect = { EconomicSectorName: this.resultData.RefEconomicSectorName};
        }
      );
    }else{
      this.checkIsAutoFormNoFromSetting('IC');
    } 
  }
  SaveForm() {
    if (this.pageType == "add") {
      this.industryTypeCategoryObj = new IndustryTypeCategoryObj();
      this.industryTypeCategoryObj.RefIndustryTypeCategoryCode = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryCode"].value
      this.industryTypeCategoryObj.RefIndustryTypeCategoryName = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryName"].value;
      this.industryTypeCategoryObj.RefEconomicSectorId = this.RefIndustryTypeCategoryForm.controls["RefEconomicSectorId"].value;
      this.industryTypeCategoryObj.RegRptCode = this.RefIndustryTypeCategoryForm.controls["RegRptCode"].value;
      this.industryTypeCategoryObj.IsActive = this.RefIndustryTypeCategoryForm.controls["IsActive"].value;
   
    } else {
      this.industryTypeCategoryObj = this.resultData;
      this.industryTypeCategoryObj.RefIndustryTypeCategoryCode = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryCode"].value
      this.industryTypeCategoryObj.RefIndustryTypeCategoryName = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryName"].value;
      this.industryTypeCategoryObj.RefEconomicSectorId = this.RefIndustryTypeCategoryForm.controls["RefEconomicSectorId"].value;
      this.industryTypeCategoryObj.RegRptCode = this.RefIndustryTypeCategoryForm.controls["RegRptCode"].value;
      this.industryTypeCategoryObj.IsActive = this.RefIndustryTypeCategoryForm.controls["IsActive"].value;
    }

    this.http.post(this.UrlConstantNew.AddEditIndustryTypeCategory, this.industryTypeCategoryObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,["/CommonSetting/IndustryTypeCategory/Paging"],{});         
      }
    );
  }
  getEconomicSector(ev: any){
    console.log(ev)
    this.RefIndustryTypeCategoryForm.patchValue({
      RefEconomicSectorId: ev.RefEconomicSectorId
    });
  }

  //check is automatic/not form no 4
  isAuto: boolean = false;
  checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      rowVersion: "",
      code: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).subscribe(
      (response) => {
        result = response;

        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true;
            this.RefIndustryTypeCategoryForm.patchValue({
              RefIndustryTypeCategoryCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}
