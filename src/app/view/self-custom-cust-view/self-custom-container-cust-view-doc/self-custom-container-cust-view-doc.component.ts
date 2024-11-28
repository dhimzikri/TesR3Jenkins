import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';

@Component({
  selector: 'app-self-custom-container-cust-view-doc',
  templateUrl: './self-custom-container-cust-view-doc.component.html'
})
export class SelfCustomContainerCustViewDocComponent implements OnInit {

  @Input() CustId: number = 0;

  dmsObj: DMSObj;
  isReady: boolean = false;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    await this.http.post(this.UrlConstantNew.GetCustByCustId, {Id : this.CustId}).toPromise().then(
      (response: any) => {
        let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.dmsObj = new DMSObj();
        this.dmsObj.User = currentUserContext.UserName;
        this.dmsObj.Role = currentUserContext.RoleCode;
        this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
        this.dmsObj.MetadataParent = null;
        this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, response["CustNo"]));
        this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideViewDownload));
        this.isReady = true;
      }
    );
  }

}
