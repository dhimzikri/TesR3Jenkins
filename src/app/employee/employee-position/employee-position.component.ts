import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { EmpPositionObj } from 'app/shared/model/emp-position-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeObj } from 'app/shared/model/ref-office-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { DecimalPipe } from '@angular/common';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-employee-position',
  templateUrl: './employee-position.component.html',
  providers: [DecimalPipe]
})
export class EmployeePositionComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  refEmpId: any;
  refOfficeId: any;
  empNo: any
  empName: any
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj
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
  getEmpUrl:any;

  readonly CancelLink: string = NavigationConstant.EMP_PAGING;
  readonly AddLink: string = NavigationConstant.EMP_POS_DETAIL;
  readonly EditLink: string = NavigationConstant.EMP_POS_DETAIL;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.apiUrl = this.UrlConstantNew.GetEmpPositionPaging;
    this.deleteUrl = this.UrlConstantNew.DeleteEmpPosition;
    
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['refEmpId'] != null) {
        this.refEmpId = queryParams['refEmpId'];
      }
      if (queryParams['empNo'] != null) {
        this.empNo = queryParams['empNo'];
      }
      if (queryParams['empName'] != null) {
        this.empName = queryParams['empName'];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchEmpList.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetEmpPositionPaging;
    this.getEmpUrl = this.UrlConstantNew.GetRefEmployeeById;
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
    critObj.propName = 'refEmpId';
    critObj.value = this.refEmpId
    this.arrCrit.push(critObj);
    this.inputObj.arrCritObj = this.arrCrit;

    this.http.post(this.getEmpUrl, {Id : this.refEmpId}).subscribe(
      (response) => {
        this.empNo = response["returnObject"].empNo;
        this.empName = response["returnObject"].empName;
      });
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

  delete(empPositionId: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj.empPositionId = empPositionId;
      this.http.post(this.deleteUrl, this.empPositionObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(this.pageNow);
        });
    }
  }

  reset() {
    this.searchComponent.initiateForm();
  }

  //** Start UC Search **/
  getResult(event){
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }
}