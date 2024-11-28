import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-customer-family-menu',
  templateUrl: './customer-family-menu.component.html',
  styles: []
})
export class CustomerFamilyMenuComponent implements OnInit {
  @ViewChild('ucPaging') ucPaging: UcpagingComponent;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  
  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;
  }

  getEvent(e: any){
    if(e.Key == "UpdateIsCustomer"){
      if(confirm("Update to Main Customer?")){
        var ReqByIdObj = new GenericObj();
        ReqByIdObj.Id = e.RowObj.FamilyId;
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
