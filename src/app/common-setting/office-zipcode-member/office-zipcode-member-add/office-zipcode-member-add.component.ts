import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-zipcode-member-add',
  templateUrl: './office-zipcode-member-add.component.html',
  //providers: [NGXToastrService]
})
export class OfficeZipcodeMemberAddComponent implements OnInit {
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
  arrCrit: any;

  orderByKey: any = null;
  orderByValue: boolean = true;

  arrAddCrit = new Array<CriteriaObj>();
  tempListId: Array<any> = [];
  tempData: Array<any> = [];
  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  data = [];

  readonly CancelLink: string = NavigationConstant.CS_OFFICE_ZIPCODE_MBR_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
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
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetOfficeZipcodeMemberAddPaging;

    this.pageNow = 1;
    this.pageSize = 10;

    this.arrCrit = new Array();

    this.initiateForm();
  }

  initiateForm() {
    var officeId = { refOfficeId: this.refOfficeId };
    this.http.post(this.UrlConstantNew.GetRefOfficeObj, officeId).subscribe(
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
    this.searchComponent.search(this.UrlConstantNew.GetOfficeZipcodeMemberAddPaging, this.pageNow, this.pageSize, order);
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
    this.searchComponent.search(this.UrlConstantNew.GetOfficeZipcodeMemberAddPaging, this.pageNow, this.pageSize, order);
  }

  Checked(refZipcodeId: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(refZipcodeId);
    } else {
      let index = this.listSelectedId.indexOf(refZipcodeId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }

  AddToTemp() {
    if (this.listSelectedId.length != 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
        var object = this.resultData.data.find(x => x.refZipcodeId == this.listSelectedId[i]);
        this.tempData.push(object);
      }
      this.arrAddCrit = this.arrCrit;
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "RZ.REF_ZIPCODE_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.tempListId;
      this.arrAddCrit.push(addCrit);
      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.searchComponent.search(this.UrlConstantNew.GetOfficeZipcodeMemberAddPaging, this.pageNow, this.pageSize, order, this.arrAddCrit);

      this.listSelectedId = [];
    } else {
      this.toastr.typeErrorCustom(ExceptionConstant.PLEASE_SELECT_MIN_1_ZIPCODE);
    }
  }

  deleteFromTemp(refZipcodeId) {
    this.arrAddCrit = this.arrCrit;
    var index = this.tempListId.indexOf(refZipcodeId);
    if (index > -1) {
      this.tempListId.splice(index, 1);
      this.tempData.splice(index, 1);
    }
    var addCrit = new CriteriaObj();
    addCrit.DataType = "numeric";
    addCrit.propName = "RZ.REF_ZIPCODE_ID";
    addCrit.restriction = AdInsConstant.RestrictionNotIn;
    addCrit.listValue = this.tempListId;
    if (this.tempListId.length != 0) {
      this.arrAddCrit.push(addCrit);
    }
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      };
    }
    this.searchComponent.search(this.UrlConstantNew.GetOfficeZipcodeMemberAddPaging, this.pageNow, this.pageSize, order, this.arrAddCrit);
  }
  
  saveZipMember() {
    var listObj = new Array();
    for (var i = 0; i < this.tempData.length; i++) {
      var arrZipMember = {
        ZipcodeNumber: this.tempData[i].zipcodeNumber,
        RefOfficeId: this.refOfficeId
      }
      
      listObj.push(arrZipMember);
    }
    var zipCodeMemberList = { listOfOfficeZipcodeMember: listObj };

    this.http.post(this.UrlConstantNew.AddOfficeZipcodeMember, zipCodeMemberList, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.CS_OFFICE_ZIPCODE_MBR_PAGING],{ "refOfficeId": this.refOfficeId });
      });

  }
}
