import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganizationObj } from 'app/shared/model/organization-obj.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  providers: [NgbPaginationConfig, DecimalPipe]
})
export class OrganizationComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchOrganization.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetRefOrgPaging;
    this.inputObj.ddlEnvironments = [
      {
        name: "parentId",
        environment: this.UrlConstantNew.env.FoundationR3Url
      }
    ];
    
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.UrlConstantNew.GetRefOrgPaging;
    this.show = AdInsConstant.showData.split(',');
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
      };
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
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

  del(id: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      var url = this.UrlConstantNew.env.FoundationR3Url + this.UrlConstantNew.DeleteRefOrg;
      var organizObj: OrganizationObj;
      organizObj = new OrganizationObj();
      organizObj.refOrgId = id;
      this.http.post(url, organizObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          var order = null;
          if (this.orderByKey != null) {
            order = {
              key: this.orderByKey,
              value: this.orderByValue
            }
          }
          this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
        }
      );
    }
  }
}
