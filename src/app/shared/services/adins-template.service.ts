import {Injectable} from '@angular/core';
import {UcTemplateService} from '@adins/uctemplate';
import {AdInsHelper} from '../AdInsHelper';
import {CookieService} from 'ngx-cookie';
import {environment} from '../../../environments/environment';
import * as _moment from 'moment';
import {URLConstant} from '../constant/URLConstant';
import * as Module from 'app/components';
import { NavigationConstant } from '../NavigationConstant';
import { UrlConstantNew } from '../constant/URLConstantNew';


// ini yg kepake
@Injectable({
  providedIn: 'root'
})
export class AdinsTemplateService extends UcTemplateService {

  constructor(private UrlConstant: UrlConstantNew) {
    super();
    this.UrlConstant = UrlConstant;
    this.configure();
  }

  getCookie(cookieService: CookieService, key: string): any {
    return AdInsHelper.GetCookie(cookieService, key);
  }

  private configure() {
    const envi = URLConstant.env
    const listEnvironments = [
      { environment: 'FOU', url: envi.FoundationR3Url},
      { environment: 'FOU_WEB', url: envi.FoundationR3Web },
      { environment: 'LOSR3WEB', url: envi.losR3Web },
      { environment: 'LMSR3WEB', url: envi.lmsR3Web },
      { environment: 'LOS', url: envi.LosURL },
      { environment: 'CashBankUrl', url: envi.CashBankUrl },
      { environment: 'TAX', url: envi.TaxUrl},
      { environment: 'JOURNAL', url: envi.JournalR3Url},
    ];
    this.environment  = environment;
    this.envConfig    = this.UrlConstant.env;
    this.urlConstant  = this.UrlConstant;
    this.listEnvironments = listEnvironments;
    this.moment = _moment;
    this.module = Module;
    this.navConstant = NavigationConstant
    this.baseUrl = envi.FoundationR3Web;
  }
}
