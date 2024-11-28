import { OrgMdlStrucObj } from 'app/shared/model/org-mdl-struc-obj';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { ExcelService } from 'app/shared/excel-service/excel-service';
import { environment } from 'environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { OrgMdlObj } from 'app/shared/model/org-mdl-obj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from "@angular/common";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-org-mdl-struc-paging',
  templateUrl: './org-mdl-struc-paging.component.html',
  providers: [ExcelService, DecimalPipe]
})
export class OrgMdlStrucPagingComponent implements OnInit {

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
  addCrit: CriteriaObj[];

  orgMdlObj: OrgMdlObj;
  orgMdlStrucObj: OrgMdlStrucObj;
  orgMdlId: any;

  refOrgId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private https: HttpClient,
    private location: Location, 
    private ngxRouter: NgxRouterService,
    private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['orgMdlId'] != null) {
        this.orgMdlId = +queryParams['orgMdlId'];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = "./assets/search/searchOrgMdlStruc.json";
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetOrgMdlStrucPaging;
    
    this.spinner.show();
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.UrlConstantNew.GetOrgMdlStrucPaging;
    this.initiateForm();
    this.spinner.hide();
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  initiateForm() {
    var getOrgMdlUrl = this.UrlConstantNew.GetOrgMdlByOrgMdlId;
    this.orgMdlObj = new OrgMdlObj();
    this.orgMdlObj.orgMdlId = +this.orgMdlId;
    this.https.post(getOrgMdlUrl, this.orgMdlObj).subscribe(
      (response) => {
        this.orgMdlObj = response['returnObject'];
        this.refOrgId += response['returnObject']['refOrgId'];
      },
      (error) => {
        this.service.typeErrorCustom(error);
      });

    this.addCrit = new Array();
    var additionCrit = new CriteriaObj();
    additionCrit.propName = "orgMdlId";
    additionCrit.value = this.orgMdlId;
    additionCrit.DataType = 'numeric';
    additionCrit.restriction = AdInsConstant.RestrictionEq;

    this.addCrit.push(additionCrit);
    this.inputObj.addCritInput = this.addCrit;
  }

  del(id: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.deleteUrl = this.UrlConstantNew.DeleteOrgMdlStruc;
      this.orgMdlStrucObj = new OrgMdlStrucObj();
      this.orgMdlStrucObj.orgMdlStrucId = +id;

      this.https.post(this.deleteUrl, this.orgMdlStrucObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.service.successMessage(response['message']);
          var order = null;
          if (this.orderByKey != null) {
            order = {
              key: this.orderByKey,
              value: this.orderByValue
            }
          }
          this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  Back(): void {
    this.location.back();
  }

}

