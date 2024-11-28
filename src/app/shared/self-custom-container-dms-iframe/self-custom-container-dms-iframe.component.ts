import { Component, Input, OnInit } from '@angular/core';
import { DMSObj } from '../model/dms/dms-obj.model';
import { DMSLabelValueObj } from '../model/dms/dms-label-value-obj.model';
import { AdInsHelper } from '../AdInsHelper';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from '../model/cust-obj.model';

@Component({
  selector: 'app-self-custom-container-dms-iframe',
  templateUrl: './self-custom-container-dms-iframe.component.html'
})
export class SelfCustomContainerDmsIframeComponent implements OnInit {

  @Input() CustNo: string;

  dmsObj: DMSObj;

  constructor(private cookieService: CookieService, private http: HttpClient,
    private UrlConstantNew: UrlConstantNew,) { }

  ngOnInit(){

    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.dmsObj = new DMSObj();
    this.dmsObj.User = currentUserContext.UserName;
    this.dmsObj.Role = currentUserContext.RoleCode;
    this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
    this.dmsObj.MetadataParent = null;
    this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, this.CustNo));
    this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadDownloadView));
  }

  getValue(ev: any)
  {

  }

}
