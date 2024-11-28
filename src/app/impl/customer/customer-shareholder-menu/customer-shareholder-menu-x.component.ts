import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-customer-shareholder-menu-x',
  templateUrl: './customer-shareholder-menu-x.component.html',
  styles: []
})
export class CustomerShareholderMenuXComponent implements OnInit {
  @ViewChild('ucPaging') ucPaging: UcpagingComponent;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/impl/ucpaging/searchCustShareholderX.json";
    this.inputPagingObj.pagingJson = "./assets/impl/ucpaging/searchCustShareholderX.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;
  }

  getEvent(e: any){
    if(e.Key == "UpdateIsCustomer"){
      if(confirm("Update to Main Customer?")){
        var ReqByIdObj = new GenericObj();
        ReqByIdObj.Id = e.RowObj.ShareholderId;
        this.http.post(this.UrlConstantNew.UpdateToMainCustomer, ReqByIdObj).subscribe(
          (response) => {
            this.toastr.successMessage(response['message']);
            this.ucPaging.reset();
            this.ucPaging.clearPaging();
          }
        )
      }
    }
  }
}

