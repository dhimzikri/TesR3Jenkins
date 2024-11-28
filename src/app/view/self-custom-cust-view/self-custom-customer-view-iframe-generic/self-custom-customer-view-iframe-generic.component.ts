import { Component, Input, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ResCustListIframeViewObj } from 'app/shared/model/response/cust-list-iframe-View/res-cust-list-iframe-view-obj.model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-self-custom-customer-view-iframe-generic',
  templateUrl: './self-custom-customer-view-iframe-generic.component.html'
})
export class SelfCustomCustomerViewIframeGenericComponent implements OnInit {
  @Input() CustId: any;
  @Input() Title: any;

  custResultData: any;
  iframeObj: any;
  rootServer: string;
  IsReady: boolean = false;
  urlLink: string = '';

  constructor(private UrlConstantNew: UrlConstantNew, private cookieService: CookieService, private http: HttpClient) { }

  async ngOnInit() {
    if (this.Title) {
      await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }).toPromise().then(
        (response) => {
          this.custResultData = response;
        }
      );

      await this.http.post(this.UrlConstantNew.GetCustListIframeView, {}).toPromise().then(
        (response) => {
          let listIframe = response[CommonConstant.ReturnObj];
          this.iframeObj = listIframe.find(i => i.Title.toLowerCase() == this.Title.toLowerCase());
        }
      );

      let queryParam: string = '';
      queryParam = this.genQueryParam();
      queryParam = this.addToken(queryParam);
      queryParam = this.addEmbedded(queryParam);
      this.urlLink = this.UrlConstantNew.env.losR3Web + this.iframeObj.Url + queryParam;
      console.log("Ndod1: " + this.urlLink);
      this.IsReady = true;
    }
  }

  genQueryParam() {
    let arrList = {};

    for(let i = 0; i < this.iframeObj.Params.length; i++){
      if(this.custResultData[this.iframeObj.Params[i].Value] != null && this.custResultData[this.iframeObj.Params[i].Value] != undefined) {
        arrList[this.iframeObj.Params[i].Key] = this.custResultData[this.iframeObj.Params[i].Value];
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
