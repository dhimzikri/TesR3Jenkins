import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import { RefRoleObj } from "app/shared/model/ref-role-obj.model";
import { Location, DecimalPipe } from "@angular/common";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from "app/shared/model/input-search-obj.model";
import { CriteriaObj } from "app/shared/model/criteria-obj.model";
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NgxRouterService } from "@adins/fe-core";
@Component({
  selector: "app-role-user",
  templateUrl: "./role-user.component.html",
  providers: [ExcelService, DecimalPipe]
})
export class RoleUserComponent implements OnInit {
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
  refRoleObj: RefRoleObj = new RefRoleObj();
  orderByKey: any = null;
  orderByValue: boolean = true;

  refRoleId: any;
  check: any;
  arrCrit: any;

  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];


  form: FormGroup;
  data = [];

  constructor(
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["refRoleId"] != null) {
        this.refRoleId = queryParams["refRoleId"];
      }
    });

    this.form = this.formBuilder.group({
      data: []
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchUser.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetListUserEmployee;
    
    this.initiateForm();
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.UrlConstantNew.GetListUserEmployee;
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'Numeric'
    critObj.restriction = 'In';
    critObj.propName = 'refRoleId';
    critObj.listValue = [this.refRoleId, 0];
    //this.arrCrit.push(critObj);

    this.inputObj.arrCritObj = this.arrCrit;
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;

    event.response.returnObject.data.forEach(element => {
      if (element.refRoleId == this.refRoleObj.RefRoleId) {
        this.listDeletedId.push(element.empPositionId);
        if (element.isActive == '1') { this.listSelectedId.push(element.empPositionId); }
      }
    });

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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
  }

  initiateForm() {
    this.spinner.show();
    /// GET INFO USER AND EMPLOYEE
    var urlGetRefRole: any = this.UrlConstantNew.GetRefRoleByRefRoleId;

    this.refRoleObj = new RefRoleObj();
    this.refRoleObj.RefRoleId = this.refRoleId;
    this.http.post(urlGetRefRole, {Id : this.refRoleId}).subscribe(
      response => {
        this.refRoleObj = response["returnObject"];
        this.spinner.hide();
      }
    );
  }

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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
  }

  Back(): void {
    this.location.back();
  }

  Save(RoleUserForm: NgForm): void {
    var urlAssignRole = this.UrlConstantNew.env.FoundationR3Url + this.UrlConstantNew.AssignRoleToUsers;
    this.refRoleObj.RefRoleId = this.refRoleId;
    // this.refRoleObj.listAddEmpPositionId = this.listSelectedId;
    // this.refRoleObj.listDelEmpPositionId = this.listDeletedId;
    this.http.post(urlAssignRole, this.refRoleObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.service.typeSave(response['message']);
        this.location.back();
        this.spinner.hide();
        this.listSelectedId = null;
        this.listDeletedId = null;
      }
    );
  }

  Checked(empPositionId: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(empPositionId);
    } else {
      let index = this.listSelectedId.indexOf(empPositionId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }
}
