import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { environment } from 'environments/environment';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { RefOfficeObj } from 'app/shared/model/ref-office-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { EmpPositionObj } from 'app/shared/model/emp-position-obj.model';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-emp-pos',
  templateUrl: './office-emp-pos.component.html',
  providers: [/*NGXToastrService*/, DecimalPipe]
})
export class OfficeEmpPosComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  refOfficeId: any;
  officeCode: any;
  officeName: any;
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj;
  empPositionObj: EmpPositionObj;
  apiUrl: any;
  deleteUrl: any;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  refEmpId: any;
  empNo: any;
  empName: any;

  readonly AddLink: string = NavigationConstant.OFFICE_EMP_POS_ADD;
  readonly EditLink: string = NavigationConstant.OFFICE_EMP_POS_ADD;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.apiUrl = this.UrlConstantNew.GetEmpPositionPaging;
    this.deleteUrl = this.UrlConstantNew.DeleteEmpPosition;

    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['refOfficeId'] != null) {
        this.refOfficeId = queryParams['refOfficeId'];
      }
      if (queryParams['officeCode'] != null) {
        this.officeCode = queryParams['officeCode'];
      }
      if (queryParams['officeName'] != null) {
        this.officeName = queryParams['officeName'];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchEmpList.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetEmpPositionPaging;
    this.inputObj.ddlEnvironments = [
      {
        name: "refOfficeId",
        environment: this.UrlConstantNew.env.FoundationR3Url
      }
    ];

    this.pageNow = 1;
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'Numeric'
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'refOfficeId';
    critObj.value = this.refOfficeId
    this.arrCrit.push(critObj);
    this.inputObj.arrCritObj = this.arrCrit;
  }
  searchSort(event: any) {
    if (this.resultData != null) {
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

  reset() {
    this.searchComponent.initiateForm();
  }

  delete(empPositionId: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj.empPositionId = empPositionId;
      this.http.post(this.deleteUrl, this.empPositionObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
        });
    }
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

}
