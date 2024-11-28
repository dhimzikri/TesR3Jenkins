import { Component, OnInit } from '@angular/core';
import { RefIndustryTypeObj } from 'app/shared/model/ref-industry-type-obj.model';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ref-industry-type-detail',
  templateUrl: './ref-industry-type-detail.component.html',
 // providers: [NGXToastrService]
})
export class RefIndustryTypeDetailComponent implements OnInit {
  refIndustryType: RefIndustryTypeObj;
  industryTypeCategoryObj: any;
  type: String = 'add';
  RefIndustryTypeId: number = 0;
  resultData: any;
  inputLookupObj: InputLookupObj;

  RefIndustryTypeForm = this.fb.group({
    RefIndustryTypeId: [0, [Validators.required]],
    IndustryTypeCode: ['', [Validators.required]],
    IndustryTypeName: ['', [Validators.required]],
    RefIndustryTypeCategoryId: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: [""]
  });

  readonly CancelLink: string = NavigationConstant.CS_INDUSTRY_TYPE_PAGING;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NGXToastrService,
    private fb: FormBuilder,
    private http: HttpClient,
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['mode'] != null) {
        this.type = queryParams['mode'];
      }
      if (queryParams['RefIndustryTypeId'] != null) {
        this.RefIndustryTypeId = queryParams['RefIndustryTypeId'];
      }
    });
  }


  async ngOnInit() {
    this.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.inputLookupObj.urlJson = "./assets/lookup/lookupIndustryTypeCategory.json";
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupIndustryTypeCategory.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupIndustryTypeCategory.json";

    if (this.type == 'edit') {
      this.refIndustryType = new RefIndustryTypeObj();
      this.refIndustryType.RefIndustryTypeId = this.RefIndustryTypeId;
      await this.http.post(this.UrlConstantNew.GetRefIndustryTypeById, {Id: this.RefIndustryTypeId}).toPromise().then(
        response => {
          this.resultData = response;
          this.industryTypeCategoryObj = this.resultData;
          this.RefIndustryTypeForm.patchValue({
            RefIndustryTypeId: this.resultData.RefIndustryTypeId,
            IndustryTypeCode: this.resultData.IndustryTypeCode,
            IndustryTypeName: this.resultData.IndustryTypeName,
            RefIndustryTypeCategoryId: this.resultData.RefIndustryTypeCategoryId,
            IsActive: this.resultData.IsActive,
            RowVersion: this.resultData.RowVersion
          });
        });

        await this.http.post(this.UrlConstantNew.GetIndustryTypeCategoryByIndustryTypeCategoryId, this.industryTypeCategoryObj).toPromise().then(
          response => {
            this.industryTypeCategoryObj = response;
           
          this.inputLookupObj.nameSelect = this.industryTypeCategoryObj.RefIndustryTypeCategoryName;
           
          }); 
    }else{
      this.checkIsAutoFormNoFromSetting('IT');
    }
  }

  getLookupResponse(e) {
    this.RefIndustryTypeForm.patchValue({
      RefIndustryTypeCategoryId: e.RefIndustryTypeCategoryId,
    });
  }

  Save() {
    var refIndustryTypeObj = new RefIndustryTypeObj();
    refIndustryTypeObj.IndustryTypeCode = this.RefIndustryTypeForm.controls["IndustryTypeCode"].value;
    refIndustryTypeObj.IndustryTypeName = this.RefIndustryTypeForm.controls["IndustryTypeName"].value;
    refIndustryTypeObj.RefIndustryTypeCategoryId = this.RefIndustryTypeForm.controls["RefIndustryTypeCategoryId"].value;
    refIndustryTypeObj.IsActive = this.RefIndustryTypeForm.controls["IsActive"].value;
    if(this.type == 'edit') {
      refIndustryTypeObj.RefIndustryTypeId = this.RefIndustryTypeForm.controls["RefIndustryTypeId"].value;
      refIndustryTypeObj.RowVersion = this.RefIndustryTypeForm.controls["RowVersion"].value;
      refIndustryTypeObj.IsActive = this.RefIndustryTypeForm.controls["IsActive"].value;
    }


    //MODE-ADD
    if (this.type != 'edit') {
      this.http.post(this.UrlConstantNew.AddRefIndustryType, refIndustryTypeObj, AdInsConstant.SpinnerOptions).subscribe(
        //SAVE
        (response) => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_INDUSTRY_TYPE_PAGING],{});
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      //SAVE
      this.http.post(this.UrlConstantNew.EditRefIndustryType, refIndustryTypeObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_INDUSTRY_TYPE_PAGING],{});
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
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
            this.RefIndustryTypeForm.patchValue({
              IndustryTypeCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}
