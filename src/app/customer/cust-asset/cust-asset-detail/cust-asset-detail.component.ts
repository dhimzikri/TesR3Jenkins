import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CustAssetObj } from 'app/shared/model/cust-asset-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-cust-asset-detail',
  templateUrl: './cust-asset-detail.component.html',
  styles: [],
 // providers: [NGXToastrService]
})
export class CustAssetDetailComponent implements OnInit {
  @Input() CustAssetId: number;
  @Input() CustId: number;
  CustAssetTypeList: Array<KeyValueObj>;
  Mode: string;
  gsValueMaxAssetQty: number;

  CustAssetForm = this.fb.group({
    CustAssetId: [0],
    CustId: [0],
    MrCustAssetTypeCode: ['', [Validators.required]],
    AssetDescr: [''],
    AssetValue: [0, [Validators.required, Validators.min(1)]],
    AssetQty: [0, [Validators.required, Validators.min(1)]],
    AssetTotalValue: [0],
    RowVersion: ['']
  });

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal, 
    private UrlConstantNew: UrlConstantNew
  ) {
    this.CustAssetTypeList = new Array<KeyValueObj>();
    this.Mode = "ADD";
   }

  ngOnInit() {
    let generalSettingCode = {
      Code: CommonConstant.GsCodeMaxAssetQtyValue
    }
    
    this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingCode).toPromise().then(
      (response) => {
        this.gsValueMaxAssetQty = parseInt(response['GsValue']);
      }
      );
      
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: CommonConstant.RefMasterTypeCustAsset }).toPromise().then(
      (response) => {
        this.CustAssetTypeList = response[CommonConstant.ReturnObj];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
    if(this.CustAssetId && this.CustAssetId > 0){
      this.Mode = "EDIT"
      this.http.post<CustAssetObj>(this.UrlConstantNew.GetCustAssetByCustAssetId, { Id: this.CustAssetId }).toPromise().then(
        (response) => {
          this.CustAssetForm.patchValue({
            CustAssetId: response.CustAssetId,
            CustId: this.CustId,
            MrCustAssetTypeCode: response.MrCustAssetTypeCode,
            AssetDescr: response.AssetDescr,
            AssetValue: response.AssetValue,
            AssetQty: response.AssetQty,
            AssetTotalValue: response.AssetTotalValue,
            RowVersion: response.RowVersion
          });
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.CustAssetForm.patchValue({
        CustId: this.CustId
      });
    }
  }

  SaveForm(){
    var formValue = this.CustAssetForm.value;
    formValue.AssetTotalValue = formValue.AssetValue * formValue.AssetQty;
    var url = "";

    if(formValue.AssetQty > this.gsValueMaxAssetQty){
      this.toastr.warningMessage("Asset Quantity cannot more than " + this.gsValueMaxAssetQty)
      return;
    }

    if(this.CustAssetId && this.CustAssetId > 0){
      url = this.UrlConstantNew.EditCustAsset;
    }
    else{
      url = this.UrlConstantNew.AddCustAsset;
    }
    this.http.post(url, formValue, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.activeModal.close(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
