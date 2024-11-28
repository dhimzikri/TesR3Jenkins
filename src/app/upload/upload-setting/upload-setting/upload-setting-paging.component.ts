import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { SearchComponent } from 'app/shared/search/search.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { InputSearchObj } from 'app/shared/model/input-search-obj.model';
import { Observable } from 'rxjs';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-upload-setting-paging',
  templateUrl: './upload-setting-paging.component.html',
 // providers: [NGXToastrService]
})
export class UploadSettingPagingComponent implements OnInit {
  // ** Start Query Paging */
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlQryPaging: any;
  urlEnviPaging: any;
  // ** End Query Paging */

  urlJson: any;
  resultData: any;
  verficationObj: any;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  pageType: any;
  apiUrl: any;
  deleteUrl: any;
  orderByKey: any = null;
  orderByValue = true;
  inputObj: any;
  verfTrxTypeId: any;
  exportData: any;

  readonly CancelLink: string = NavigationConstant.UPLOAD_SETTING_EDIT;
  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj(this.UrlConstantNew);
    this.inputObj._url = './assets/search/searchUploadTypePaging.json';
    this.inputObj.apiQryPaging = this.UrlConstantNew.GetUploadTypePaging;
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.UrlConstantNew.GetUploadTypePaging;
    this.initiateForm()
  }

  initiateForm() {
    this.getJSON(this.inputObj._url).subscribe(data => {
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  // ** Start UC Search **/

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
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
    let order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  searchPagination(event: number) {
    this.pageNow = event;
    let order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
  // ** End UC Search **/
}
