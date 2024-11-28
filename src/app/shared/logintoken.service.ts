import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from './AdInstConstant';
import { environment } from 'environments/environment';
import { CurrentUserContextService } from './current-user-context/current-user-context.service';
import { formatDate } from '@angular/common';
import { UrlConstantNew } from './constant/URLConstantNew';

@Injectable({
  providedIn: 'root'
})
export class LogintokenService {
  

  constructor(private http: HttpClient,private currentUserContextService: CurrentUserContextService, private UrlConstantNew: UrlConstantNew) {

  }

  LoginWithToken(token: string) {
    this.http.post(this.UrlConstantNew.LoginWithToken, { ModuleCode: environment.Module }, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
        //window.location.href = url;
      }
    );
  }


}
