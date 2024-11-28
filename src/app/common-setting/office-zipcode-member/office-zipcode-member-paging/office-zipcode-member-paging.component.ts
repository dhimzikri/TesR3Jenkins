import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-zipcode-member-paging',
  templateUrl: './office-zipcode-member-paging.component.html',
  //providers: [NGXToastrService]
})
export class OfficeZipcodeMemberPagingComponent implements OnInit {
  //** Start UC Search **//
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  refOfficeId: any;
  officeCode: any;
  officeName: any;
  city: any;
  //** End UC Search **//
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  officeUrl: any;
  arrCrit: any;

  orderByKey: any = null;
  orderByValue: boolean = true;

  readonly CancelLink: string = NavigationConstant.CS_OFFICE_ZIPCODE_MBR;
  readonly AddLink: string = NavigationConstant.CS_OFFICE_ZIPCODE_MBR_ADD;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['refOfficeId'] != null) {
        this.refOfficeId = queryParams['refOfficeId'];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchOfficeZipcodeMember.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetRefOfficeZipcodePaging;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.UrlConstantNew.GetRefOfficeZipcodePaging;
    this.officeUrl = this.UrlConstantNew.GetRefOfficeObj;
    this.deleteUrl = this.UrlConstantNew.DeleteOfficeZipcodeMember;

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'numeric'
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'refOfficeId';
    critObj.value = this.refOfficeId;
    this.arrCrit.push(critObj);
    this.inputObj.arrCritObj = this.arrCrit;

    this.initiateForm();
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null, this.arrCrit);
  }

  initiateForm() {
    var officeId = {refOfficeId: this.refOfficeId};
    this.http.post(this.officeUrl, officeId).subscribe(
      (response) => {
        this.officeCode = response['returnObject']['officeCode'];
        this.officeName = response['returnObject']['officeName'];
        this.city = response['returnObject']['city'];
      });

  }
  //** Start UC Search **/
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
  }
  // delete(refJobId: any) {
  //   if (confirm("Are you sure to delete this record?")) {
  //     this.rjtObj = new RefJobTitleObj();
  //     this.rjtObj.RefJobTitleId = refJobId;
  //     this.http.post(this.deleteUrl, this.rjtObj).subscribe(
  //       (response) => {
  //         this.toastr.successMessage(response['message']);
  //         this.searchPagination(this.pageNow);
  //       });
  //   }
  // }
  delete(officeZipcodeMemberId: any) {
    if (confirm("Are you sure to delete this record?")) {
      var officeZipcodeMemberObj = {officeZipcodeMemberId : officeZipcodeMemberId};
      this.http.post(this.deleteUrl, officeZipcodeMemberObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(this.pageNow);
        });
    }
  }
}
