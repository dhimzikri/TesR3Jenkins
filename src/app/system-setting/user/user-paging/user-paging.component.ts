import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { HttpClient } from "@angular/common/http";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { RefUserObj } from "app/shared/model/ref-user-obj.model";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from "@angular/common";
import { InputSearchObj } from "app/shared/model/input-search-obj.model";
import { AdInsHelper } from "app/shared/AdInsHelper";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";

@Component({
  selector: "app-user-paging",
  templateUrl: "./user-paging.component.html",
  providers: [NGXToastrService, ExcelService, DecimalPipe]
})
export class UserPagingComponent implements OnInit {
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  show: any;
  exportData: any;
  ExcelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  constructor(
    private service: NGXToastrService,
    private https: HttpClient,
    private router: Router, 
    private UrlConstantNew: UrlConstantNew
  ) {}

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchUser.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetRefUserPaging;
    
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.UrlConstantNew.GetRefUserPaging;

    this.initiateForm();
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
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  initiateForm() {}

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue;
    } else {
      this.orderByValue = true;
    }
    this.orderByKey = event.target.attributes.name.nodeValue;
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    };
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  resetPassword(id: any) {
    if (confirm("Are you sure to reset this password to default?")) {
      var resetPassUrl = this.UrlConstantNew.ResetPassword;
      var refUser = new RefUserObj();
      // refUser.refUserId = id;
      this.https.post(resetPassUrl, refUser, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.service.successMessage(response["message"]);
          this.router
            .navigateByUrl("/dashboard/dash-board", {
              skipLocationChange: true
            })
            .then(() => 
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SYSTEM_SETTING_REF_USER],{})
            );
        }
      );
    }
  }
}
