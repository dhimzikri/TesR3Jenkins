import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComponent } from 'app/shared/search/search.component';
import { environment } from 'environments/environment';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder } from '@angular/forms';
import { UploadService } from 'app/shared/upload/upload.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-upload-setting-edit',
  templateUrl: './upload-setting-edit.component.html',
  styleUrls: ['./upload-setting-edit.component.scss'],
 // providers: [NGXToastrService]
})
export class UploadSettingEditComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild('uclRole') ucLookupRole;
  inputLookupObj: any;
  resultData: string;
  apiUrl: any;
  nameSelect: any;
  idSelect: any;
  jsonSelect: any;
  isActive: any;
  mode: any;
  orderByKey: any = null;
  orderByValue = true;
  pageNow: any;
  pageSize: any;
  pageType: any;
  uploadTypeCode: any;
  uploadTypeName: any;
  uploadSettingSomethingAddEdit: any;
  uploadSettingHId: any;
  uploadSettingObj: any;

  uploadTypeId: any;
  uploadTypeObject: any; z
  userTitleRoleObj: any;
  empPositionId: any;
  addCritLookup: any;
  tempRefRole: any;
  listRefRoleId: Array<any> = [];

  UploadForm = this.fb.group({});

  readonly CancelLink: string = NavigationConstant.UPLOAD_SETTING_PAGING;
  constructor(private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private ngxRouter: NgxRouterService,
    private uploadService: UploadService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.tempRefRole = new Array();
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['param'] != null) {
        this.pageType = queryParams['param'];
      } else {
        this.pageType = 'add';
      }
      if (queryParams['uploadTypeId'] != null) {
        this.uploadTypeId = queryParams['uploadTypeId'];
      }

      if (this.pageType === 'edit') {
        this.uploadTypeObject = { uploadTypeId: this.uploadTypeId };
        this.uploadService.getUploadTypeByUploadTypeId(this.uploadTypeObject).subscribe(
          response => {
            this.uploadTypeCode = response['returnObject'].uploadTypeCode;
            this.uploadTypeName = response['returnObject'].uploadTypeName;
            if (response['isActive']) {
              this.isActive = true;
            } else {
              this.isActive = false;
            }
          });

        this.uploadService.getListRefRoleByUploadTypeId(this.uploadTypeObject).subscribe(
          response => {
            this.tempRefRole = response['returnObject'];
            for (let index = 0; index < this.tempRefRole.length; index++) {
              this.listRefRoleId.push(this.tempRefRole[index].refRoleId);
            }
          });
      }

      this.pageNow = 1;
      this.pageSize = 10;
      this.inputLookupObj = new InputLookupObj(this.UrlConstantNew);
      this.inputLookupObj.urlJson = "./assets/lookup/lookupRole.json";
      this.inputLookupObj.pagingJson = "./assets/lookup/lookupRole.json";
      this.inputLookupObj.genericJson = "./assets/lookup/lookupRole.json";

      this.apiUrl = this.UrlConstantNew.GetRefRolePaging;
      this.initiateForm();
    });
  }

  initiateForm() {
    this.spinner.show();
  }

  Back(): void {
    this.location.back();
  }

  add(uclRoleObj: any) {
    const refRoleObj = uclRoleObj.jsonSelect;
    if (refRoleObj != null) {
      if (this.listRefRoleId != null) {
        if (this.listRefRoleId.includes(refRoleObj.RefRoleId)) {
          this.service.errorMessage('Cannot add same Role');
        } else {
          this.tempRefRole.push(refRoleObj);
          this.listRefRoleId.push(refRoleObj.RefRoleId);
        }
      }
      this.inputLookupObj.nameSelect = '';
      this.inputLookupObj.jsonSelect = null;
    } else {
      this.service.errorMessage('Please select Role First');
    }
  }

  delete(refRoleId: any) {
    const index = this.listRefRoleId.indexOf(refRoleId);
    if (index > -1) {
      this.listRefRoleId.splice(index, 1);
      this.tempRefRole.splice(index, 1);
    }
  }

  SaveForm(): void {
    const assignRoleToUpload = { uploadTypeId: this.uploadTypeId, listRoleId: this.listRefRoleId }
    this.spinner.show();

    this.apiUrl = this.UrlConstantNew.AssignRoleToUploadSetting;
    this.http.post(this.apiUrl, assignRoleToUpload, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {

        this.service.typeSave('Assign Role to Upload Setting Success');
        this.location.back();
        this.spinner.hide();

      }
    );
  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    const order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
}
