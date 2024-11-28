import { Component, Input, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ResCustListIframeViewObj } from 'app/shared/model/response/cust-list-iframe-View/res-cust-list-iframe-view-obj.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-customer-view-iframe-generic',
  templateUrl: './customer-view-iframe-generic.component.html'
})
export class CustomerViewIframeGenericComponent implements OnInit {
  @Input() inputObj: any;
  @Input() iframeObj: ResCustListIframeViewObj = new ResCustListIframeViewObj;

  rootServer: string;
  IsReady: boolean = false;
  urlLink: string = '';

  constructor(private UrlConstantNew: UrlConstantNew, private cookieService: CookieService) { }

  ngOnInit() {
    let queryParam: string = '';
    queryParam = this.genQueryParam();
    queryParam = this.addToken(queryParam);
    queryParam = this.addEmbedded(queryParam);
    this.urlLink = this.UrlConstantNew.env.losR3Web + this.iframeObj.Url + queryParam;
    this.IsReady = true;
  }

  genQueryParam() {
    let arrList = {};

    for(let i = 0; i < this.iframeObj.Params.length; i++){
      if(this.inputObj[this.iframeObj.Params[i].Value] != null && this.inputObj[this.iframeObj.Params[i].Value] != undefined) {
        arrList[this.iframeObj.Params[i].Key] = this.inputObj[this.iframeObj.Params[i].Value];
      }
    }
    let queryParam: string = '?' + Object.keys(arrList).map(key => `${key}=${arrList[key]}`).join('&');
    return queryParam;
  }

  addToken(param: string) {
    const token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
    return `${param}&Token=${token}`;
  }

  addEmbedded(param: string) {
    return `${param}&IsEmbedded=true`;
  }
}
