import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { RefRoleObj } from 'app/shared/model/ref-role-obj.model';
import { ExcelService } from 'app/shared/excel-service/excel-service';
import { environment } from 'environments/environment';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from '@angular/common';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-master-type-paging',
  templateUrl: './master-type-paging.component.html',
  providers: [ ExcelService, DecimalPipe]
})
export class MasterTypePagingComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  refRoleObj: RefRoleObj;
  orderByKey: any = null;
  orderByValue: boolean = true;

  readonly EditLink: string = NavigationConstant.SYSTEM_SETTING_ROLE_DETAIL;
  constructor(
    private service: NGXToastrService,
    private https: HttpClient,
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.inputObj._url = "./assets/search/searchRefMasterType.json";
    
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.UrlConstantNew.GetRefRolePaging;
    this.initiateForm()
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }
  searchPagination(event: number) {
    this.pageNow = event;

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  initiateForm() {

  }

  del(id: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      this.deleteUrl = this.UrlConstantNew.DeleteRefRole;
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RefRoleId = +id;
      this.https.post(this.deleteUrl, this.refRoleObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.service.successMessage(response['message']);
          var order = null;
          if (this.orderByKey != null) {
            order = {
              key: this.orderByKey,
              value: this.orderByValue
            }
          }
          this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
        });
    }
  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

}
