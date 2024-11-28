import { Component, OnInit, Input, ViewChild, ElementRef, Inject, Renderer2, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { formatDate, DOCUMENT } from '@angular/common';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { RequestCriteriaObj } from 'app/shared/model/request-criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

import { ExcelService } from '../excel-service/excel-service';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from '../AdInsHelper';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ExcelService]
})
export class SearchComponent implements OnInit {
  @ViewChild('formIdSearch') myForm: ElementRef;
  @Input() searchInput: any;
  @Output() result: EventEmitter<any> = new EventEmitter();
  pageSize: any = 10;
  pageNow: any = 1;
  orderByKey: any;
  orderByValue: any;
  tempUrl: string;
  urlGet: string;
  server: any;
  configuration: any;
  itemUrl: any;
  exportData: any;
  ExcelData: any;
  isDataLoaded: boolean = false;
  isHidden: boolean = false;

  form: FormGroup;
  payLoad = '';
  countForm = 0;
  formattedAmount = '';
  amount = 0;
  apiUrl: string;
  arrCrit: any;
  constructor(private http: HttpClient, private excelService: ExcelService, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.apiUrl = this.searchInput.enviromentUrl + this.searchInput.apiQryPaging;
    this.arrCrit = this.searchInput.arrCritObj;
    let js = this._renderer2.createElement('script');
    js.text = `
          $(document).ready(function(){
            $("#flip").click(function(){
              $("#panel").slideToggle("slow");
            });
          });
        `;
    this._renderer2.appendChild(this._document.body, js);
    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.searchInput._url).subscribe(data => {
      this.configuration = data;
      this.urlGet = data.url;
      this.exportData = data.exportExcel;
      this.countForm = data.component.length;
      this.isDataLoaded = true;

      for (var i = 0; i < this.countForm; i++) {

        //ini kalau datanya di load dari URL
        if (data.component[i].isFromURL == true) {
          var request = new RequestCriteriaObj();
          var arrayCrit = new Array();
          var criteriaObject = new CriteriaObj();
          criteriaObject.DataType = "text";
          criteriaObject.propName = data.component[i].criteriaPropName;
          criteriaObject.value = data.component[i].criteriaPropValue;
          criteriaObject.restriction = "eq";
          arrayCrit.push(criteriaObject);
          request.criteria = arrayCrit;
          
          //lempar objectnya sekalian sama urlnya, nnti di bind di dalem karena masalah di asyncnya
          //biar tiap function ada state2nya sendiri
          this.resolveObject(data.component[i], data.component[i].url, request);
        }

        if (data.component[i].type == "numeric") {
          data.component[i].value = parseFloat(data.component[i].value).toLocaleString('en');
        }

        //pengecekan tanggal
        if (data.component[i].type == "datepicker") {
          if (data.component[i].value.includes("BD")) {
            let businessDate = new Date(JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS)).BusinessDate);
            var operator = data.component[i].value.charAt(2);
            var dateShow = new Date();
            if (operator == "-") {
              var tempMinus = data.component[i].value.split("-", 2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate() - numDay);
            }
            else if (operator == "+") {
              var tempMinus = data.component[i].value.split("+", 2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate() + numDay);
            }
            var dateText = formatDate(dateShow, 'yyyy-MM-dd', 'en-US')
            data.component[i].value = dateText;
          }
        }
      }
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  public postJSON(url: string, criteria: any = null): Observable<any> {
    return this.http.post(url, criteria);
  }

  searchClick() {
    this.orderByKey = null
    this.orderByValue = true
    this.pageNow = 1;
    this.search(this.apiUrl, this.pageNow, this.pageSize, null, this.arrCrit);
  }

  reset() {
    this.initiateForm();
  }

  search(apiUrl: string, pageNo: number, rowPerPage: number, orderBy: any, addCrit: CriteriaObj[] = null) {
    var request = new RequestCriteriaObj();
    var arrCrit = new Array();

    request.pageNo = pageNo;
    request.rowPerPage = rowPerPage;
    request.orderBy = orderBy;

    for (var i = 0; i < this.countForm; i++) {
      var critObj = new CriteriaObj();
      var component = this.myForm.nativeElement[i];
      critObj.DataType = component.getAttribute('data-type');
      //Ini khusus kalau dari Drop Down
      if (component.value != "") {
        if (component.nodeName == 'SELECT') {
          var ddl = component.options;
          var text = ddl[ddl.selectedIndex].value;
          if (text != "All") {
            //Kalau Dari Dropdown udah pasti pake Eq
            critObj.restriction = AdInsConstant.RestrictionEq;
            critObj.propName = component.name;
            critObj.value = text;
            arrCrit.push(critObj);
          }
        }
        else {
          //Kalau ada Percent maka yang dipake nnti adalah Restrictions Like
          critObj.propName = component.name;
          critObj.value = component.value;
          if (component.value.includes("%")) {
            critObj.restriction = AdInsConstant.RestrictionLike;
          }
          //kalau componentnya Date, restrictionsnya lgsg ambil dari property JSONnya
          else if (component.getAttribute('data-restriction') != "" && component.getAttribute('data-restriction') != null) {
            critObj.restriction = component.getAttribute('data-restriction');
          }
          else {
            critObj.restriction = AdInsConstant.RestrictionEq
          }
          arrCrit.push(critObj);
        }
      }

    }
    if (addCrit != null) {
      for (var i = 0; i < addCrit.length; i++) {
        arrCrit.push(addCrit[i]);
      }
    }
    else if (this.searchInput.addCritInput != null || this.searchInput.addCritInput != undefined) {
      for (var i = 0; i < this.searchInput.addCritInput.length; i++) {
        arrCrit.push(this.searchInput.addCritInput[i]);
      }
    }

    request.criteria = arrCrit;
    this.http.post(apiUrl, request).subscribe((response) => {
      var qryPaging = {
        response: response,
        pageNow: pageNo
      }
      this.result.emit(qryPaging);
      return response;
    });
  }

  lessThanFour(): boolean {
    if (this.countForm > 3) {
      return false;
    }
    else {
      return true;
    }
  }

  resolveObject(obj: any, url: string, crit: RequestCriteriaObj = null) {
    const val = this.postJSON(url, crit);
    val.subscribe(tempData => {
      obj.itemsUrl = tempData.returnObject;
      
    });
  }

  transformAmount(element: any) {
    this.formattedAmount = parseFloat(element.target.value).toLocaleString('en');
    // Remove or comment this line if you dont want
    // to show the formatted amount in the textbox.
    element.target.value = this.formattedAmount;
  }

  transformToDecimal(element: any) {
    element.target.value = parseFloat(element.target.value.toString().replace(/,/g, ''));
  }

  exportAsXLSX(): void {
    var request = new RequestCriteriaObj();
    request.pageNo = 1;
    request.rowPerPage = 9999;
    request.orderBy = null;
    request.criteria = [];

    this.http.post(this.apiUrl, request).subscribe(
      response => {
        this.ExcelData = response["returnObject"]["data"];
        this.excelService.exportAsExcelFile(this.ExcelData, 'sample');
      });
  }

  onChangeEvent(optValue, afFilter) {
    var jsonComp = this.configuration.component;

    for (var i = 0; i < afFilter.affectedFilter.length; i++) {
      for (var j = 0; j < jsonComp.length; j++) {
        if (jsonComp[j].name == afFilter.affectedFilter[i]) {
          var request = new RequestCriteriaObj();
          var arrayCrit = new Array();

          if (optValue != "All") {
            var critObj = new CriteriaObj();
            critObj.DataType = afFilter.datatype;
            critObj.propName = afFilter.name;
            critObj.value = optValue;
            critObj.restriction = AdInsConstant.RestrictionEq;
            arrayCrit.push(critObj);
          }
          request.criteria = arrayCrit;
          this.resolveObject(jsonComp[j], jsonComp[j].url, request);
        }
      }
    }
  }
}
