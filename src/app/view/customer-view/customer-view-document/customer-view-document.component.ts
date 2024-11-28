import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';
@Component({
  selector: 'app-customer-view-document',
  templateUrl: './customer-view-document.component.html'
})


export class CustomerViewDocumentComponent implements OnInit {

  CustId: number;
  isReady : boolean = false;
  dmsObj: DMSObj;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private ngxRouter: NgxRouterService,
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew
  ) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['CustId'] != null) {
        this.CustId = queryParams['CustId'];
      }
    });
  }

  async ngOnInit() {
    var custObj = { "CustId": this.CustId };
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
