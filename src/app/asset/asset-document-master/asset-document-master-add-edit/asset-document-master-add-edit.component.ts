import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefAssetDocObj } from 'app/shared/model/ref-asset-doc-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-document-master-add-edit',
  templateUrl: './asset-document-master-add-edit.component.html'
})

export class AssetDocumentMasterAddEditComponent implements OnInit {
  pageType: string = 'add';
  RefAssetDocId: number;
  result: RefAssetDocObj = new RefAssetDocObj();
  refAssetObj: RefAssetDocObj = new RefAssetDocObj();

  RefAssetDocForm = this.fb.group({
    AssetDocCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetDocName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["RefAssetDocId"] != null) {
        this.RefAssetDocId = queryParams["RefAssetDocId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.RefAssetDocForm.controls.AssetDocCode.disable();
      this.http.post(this.UrlConstantNew.GetRefAssetDocByRefAssetDocId, {Id: this.RefAssetDocId }).subscribe(
        (response: RefAssetDocObj) => {
          this.result = response;
          this.RefAssetDocForm.patchValue({
            AssetDocCode: this.result.AssetDocCode,
            AssetDocName: this.result.AssetDocName,
            IsActive: this.result.IsActive
          })
        });
    }else{
      this.checkIsAutoFormNoFromSetting('AD')
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refAssetObj = new RefAssetDocObj();
      this.refAssetObj.AssetDocCode = this.RefAssetDocForm.controls["AssetDocCode"].value;
      this.refAssetObj.AssetDocName = this.RefAssetDocForm.controls["AssetDocName"].value;
      this.refAssetObj.IsActive = this.RefAssetDocForm.controls["IsActive"].value;

      this.http.post(this.UrlConstantNew.AddNewRefAssetDocData, this.refAssetObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_DOC_MASTER_PAGING],{});
        }
      );
    }
    else {
      this.refAssetObj = this.result;
      this.refAssetObj.AssetDocCode = this.RefAssetDocForm.controls["AssetDocCode"].value;
      this.refAssetObj.AssetDocName = this.RefAssetDocForm.controls["AssetDocName"].value;
      this.refAssetObj.IsActive = this.RefAssetDocForm.controls["IsActive"].value;

      this.http.post(this.UrlConstantNew.EditRefAssetDocData, this.refAssetObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_DOC_MASTER_PAGING],{});
        });
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
            //patch value form no
            this.RefAssetDocForm.patchValue({
              AssetDocCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}
