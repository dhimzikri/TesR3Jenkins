import { Injectable } from '@angular/core';
import { UrlConstantNew } from './shared/constant/URLConstantNew';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from './shared/AdInsHelper';
import {UcTemplateService} from '@adins/uctemplate';
import { environment } from 'environments/environment';
import { NavigationConstant } from './shared/NavigationConstant';
import * as _moment from 'moment';
import * as env from "assets/config/enviConfig.json";
import * as Module from '././form-template';

const listEnvironments = [
  { environment: 'FOU', url: env.FoundationR3Url},
  { environment: 'FOUR3WEB', url: env.FoundationR3Web },
  { environment: 'LOSR3WEB', url: env.losR3Web },
  { environment: 'LOS', url: env.LosURL },
  { environment: 'TAX', url: env.TaxUrl},
  ];

@Injectable({
  providedIn: 'root'
})
export class AdinsTemplateService extends UcTemplateService{
  
  constructor(private UrlConstant: UrlConstantNew) {
    super();
    this.UrlConstant = UrlConstant;
    this.configure();
  }

  getCookie(cookieService: CookieService, key: string): any {
    return AdInsHelper.GetCookie(cookieService, key);
  }

  private configure() {
    this.environment  = environment;
    this.envConfig    = env;
    this.urlConstant  = this.UrlConstant;
    this.navConstant  = NavigationConstant;
    this.listEnvironments = listEnvironments;
    this.moment = _moment;
    this.module = Module;
  }
}
