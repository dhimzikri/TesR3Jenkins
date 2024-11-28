import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustAssetDetailComponent } from './cust-asset-detail/cust-asset-detail.component';

@Component({
  selector: 'app-cust-asset',
  templateUrl: './cust-asset.component.html',
  styles: [],
 // providers: [NGXToastrService]
})
export class CustAssetComponent implements OnInit {
  @Input() CustId: number;
  @Output() ResponseCustAsset: EventEmitter<any>;
  inputGridObj: InputGridObj;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService, 
    private UrlConstantNew: UrlConstantNew
  ) { 
    this.inputGridObj = new InputGridObj();
    this.inputGridObj.pagingJson = "./assets/ucgridview/gridAppCustAsset.json";
    this.inputGridObj.resultData = {
      Data: []
    }
    this.inputGridObj.resultData["Data"] = new Array();
    this.ResponseCustAsset = new EventEmitter<any>();
  }

  ngOnInit() {
    if(this.CustId && this.CustId > 0){
      this.GetCustAssetData();
    }
  }

  Continue(){
    this.ResponseCustAsset.emit({ stepMode: "next" });
  }

  GetCustAssetData(){
    this.spinner.show();
    this.http.post(this.UrlConstantNew.GetListCustAssetByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.inputGridObj.resultData = {
          Data: []
        }
        this.inputGridObj.resultData["Data"] = new Array();
        this.inputGridObj.resultData.Data = response["CustAssetList"];
        this.spinner.hide();
      }
    ).catch(
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  GetCallback(e){
    if(e.Key == "EditAppCustAsset"){
      this.EditCustAsset(e.RowObj.AppCustAssetId);
    }
    else if(e.Key == "DeleteAppCustAsset"){
      this.DeleteCustAsset(e.RowObj.AppCustAssetId);
    }
  }

  OpenModalHandler(custAssetId: number) {
    // const modal = this.modalService.open(CustAssetDetailComponent, {size: 'lg', windowClass: 'modal-sm'});
    const modal = this.modalService.open(CustAssetDetailComponent);
    modal.componentInstance.CustAssetId = custAssetId;
    modal.componentInstance.CustId = this.CustId;
    modal.result.then(
      (response) => {
        this.GetCustAssetData();
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  AddCustAsset(){
    this.OpenModalHandler(0);
  }

  EditCustAsset(custAssetId: number){
    this.OpenModalHandler(custAssetId);
  }

  DeleteCustAsset(custAssetId){
    var confirmation = confirm("Are you sure to delete this data ?");
    if(confirmation){
      this.http.post(this.UrlConstantNew.DeleteCustAsset, { Id: custAssetId }, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          if(response["StatusCode"] == 200){
            this.toastr.successMessage(response["Message"]);
            this.GetCustAssetData();
          }
          else{
            this.toastr.errorMessage("Error Deleting AppCustAsset");
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
