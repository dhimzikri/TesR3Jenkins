import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-self-custom-container-dms-iframe-project',
  templateUrl: './self-custom-container-dms-iframe-project.component.html'
})
export class SelfCustomContainerDmsIframeProjectComponent implements OnInit {

  @Input() ProjectNo: string;

  dmsObj: DMSObj;

  constructor(private cookieService: CookieService, private http: HttpClient,
    private UrlConstantNew: UrlConstantNew,) { }

  ngOnInit(){

    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.dmsObj = new DMSObj();
    this.dmsObj.User = currentUserContext.UserName;
    this.dmsObj.Role = currentUserContext.RoleCode;
    this.dmsObj.ViewCode = CommonConstant.DmsViewCodeProject;
    this.dmsObj.MetadataParent = null;
    this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoProject, this.ProjectNo));
    this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadDownloadView));
  }

  getValue(ev: any)
  {

  }
}
