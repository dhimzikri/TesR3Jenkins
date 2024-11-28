import { Component, OnInit } from '@angular/core';
import { AssetDocListObj } from 'app/shared/model/asset-doc-list-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefAssetDocObj } from 'app/shared/model/ref-asset-doc-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericListByCodeObj } from 'app/shared/model/generic/generic-list-by-code-obj.model';
import { ResGeneralSettingObj, ResListGeneralSettingObj } from 'app/shared/model/response/general-setting/res-general-setting-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-asset-document-add-edit',
  templateUrl: './asset-document-add-edit.component.html'
})

export class AssetDocumentAddEditComponent implements OnInit {

  AssetDocumentForm = this.fb.group({
    AssetDocName: [''],
    IsMainDoc: [false],
    IsValueNeeded: [false],
    IsPledge: [false],
    IsBorrow: [false],
    IsMandatoryNew: [false],
    IsMandatoryUsed: [false],
    IsActive: [true],
    IsExpDtMandatory: [false]
  });
  assetTypeName: string;
  assetDocName: string;
  pageType: string;
  AssetTypeId: number;
  AssetDocListId: number;
  result: AssetDocListObj = new AssetDocListObj();
  assetDocListObj: AssetDocListObj = new AssetDocListObj();
  tempAssetName: any;
  temp: RefAssetDocObj = new RefAssetDocObj();
  isShowCbxBorrow: boolean;
  isShowCbxPledge: boolean;
  
  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["AssetTypeId"] != null) {
        this.AssetTypeId = queryParams["AssetTypeId"];
      }
      if (queryParams["mode"] != null) {
        this.pageType = queryParams["mode"];
      }
      if (queryParams["AssetDocListId"] != null) {
        this.AssetDocListId = queryParams["AssetDocListId"];
      }
    });
  }
  ngOnInit() {
    this.http.post(this.UrlConstantNew.GetListRefAssetDoc, this.assetDocListObj).subscribe(
      (response) => {
        this.tempAssetName = response[CommonConstant.ReturnObj];
        if (this.tempAssetName.length > 0) {
          this.AssetDocumentForm.patchValue({
            AssetDocName: this.tempAssetName[0].RefAssetDocId
          });
        }
      }
    );
    this.http.post(this.UrlConstantNew.GetAssetTypeById, {Id: this.AssetTypeId }).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      }
    );

    let ReqGetListGSByListGsCode: GenericListByCodeObj = new GenericListByCodeObj();
    ReqGetListGSByListGsCode.Codes = [CommonConstant.GSCodeIsShowCbxBorrow, CommonConstant.GSCodeIsShowCbxPledge];
    this.http.post<ResListGeneralSettingObj>(this.UrlConstantNew.GetListGeneralSettingByListGsCode, ReqGetListGSByListGsCode).subscribe(
      (response) => {
        let tempResponse: Array<ResGeneralSettingObj> = response.ResGetListGeneralSettingObj;
        let GSIsShowCbxBorrow = tempResponse.find(x => x.GsCode == "IS_SHOW_CBX_BORROW");
        let GSIsShowCbxPledge = tempResponse.find(x => x.GsCode == "IS_SHOW_CBX_PLEDGE");
        
        if (GSIsShowCbxBorrow != undefined || GSIsShowCbxBorrow != null)
          this.isShowCbxBorrow = GSIsShowCbxBorrow["GsValue"];
        if (GSIsShowCbxPledge != undefined || GSIsShowCbxPledge != null)
          this.isShowCbxPledge = GSIsShowCbxPledge["GsValue"];
      }
    );

    if (this.pageType == "edit") {
      this.http.post(this.UrlConstantNew.GetAssetDocListByAssetDocListId, { Id: this.AssetDocListId }).subscribe(
        (response: AssetDocListObj) => {
          this.result = response;
          this.http.post(this.UrlConstantNew.GetRefAssetDocByRefAssetDocId, {Id: this.result.RefAssetDocId }).subscribe(
            (response: RefAssetDocObj) => {
              this.temp = response;
              this.assetDocName = this.temp.AssetDocName;
            });

          this.AssetDocumentForm.patchValue({
            IsMainDoc: this.result.IsMainDoc,
            IsValueNeeded: this.result.IsValueNeeded,
            IsPledge: this.result.IsPledge,
            IsBorrow: this.result.IsBorrow,
            IsMandatoryNew: this.result.IsMandatoryNew,
            IsMandatoryUsed: this.result.IsMandatoryUsed,
            IsActive: this.result.IsActive,
            IsExpDtMandatory: this.result.IsExpDtMandatory
          })
        }
      );
    }
  }
  SaveForm() {
    if (this.pageType == "add") {
      this.assetDocListObj = new AssetDocListObj();
      this.assetDocListObj.RefAssetDocId = this.AssetDocumentForm.controls["AssetDocName"].value;
      this.assetDocListObj.IsValueNeeded = this.AssetDocumentForm.controls["IsValueNeeded"].value;
      this.assetDocListObj.IsMainDoc = this.AssetDocumentForm.controls["IsMainDoc"].value;
      this.assetDocListObj.IsPledge = this.AssetDocumentForm.controls["IsPledge"].value;
      this.assetDocListObj.IsBorrow = this.AssetDocumentForm.controls["IsBorrow"].value;
      this.assetDocListObj.IsMandatoryNew = this.AssetDocumentForm.controls["IsMandatoryNew"].value;
      this.assetDocListObj.IsMandatoryUsed = this.AssetDocumentForm.controls["IsMandatoryUsed"].value;
      this.assetDocListObj.IsActive = this.AssetDocumentForm.controls["IsActive"].value;
      this.assetDocListObj.IsExpDtMandatory = this.AssetDocumentForm.controls["IsExpDtMandatory"].value;
      this.assetDocListObj.AssetTypeId = this.AssetTypeId;

      this.http.post(this.UrlConstantNew.AddNewAssetDocList, this.assetDocListObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_DOC_PAGING],{ "AssetTypeId": this.assetDocListObj.AssetTypeId });
        }
      );
    }
    else {
      this.assetDocListObj = this.result;
      this.assetDocListObj.IsValueNeeded = this.AssetDocumentForm.controls["IsValueNeeded"].value;
      this.assetDocListObj.IsMainDoc = this.AssetDocumentForm.controls["IsMainDoc"].value;
      this.assetDocListObj.IsPledge = this.AssetDocumentForm.controls["IsPledge"].value;
      this.assetDocListObj.IsBorrow = this.AssetDocumentForm.controls["IsBorrow"].value;
      this.assetDocListObj.IsMandatoryNew = this.AssetDocumentForm.controls["IsMandatoryNew"].value;
      this.assetDocListObj.IsMandatoryUsed = this.AssetDocumentForm.controls["IsMandatoryUsed"].value;
      this.assetDocListObj.IsActive = this.AssetDocumentForm.controls["IsActive"].value;
      this.assetDocListObj.IsExpDtMandatory = this.AssetDocumentForm.controls["IsExpDtMandatory"].value;

      this.http.post(this.UrlConstantNew.EditAssetDocList, this.assetDocListObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.ASSET_DOC_PAGING],{ "AssetTypeId": this.assetDocListObj.AssetTypeId });
        }
      );
    }
  }
}
