import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
@Injectable()

export class UrlConstantService {
    private urlConstant: any;
    constructor(private _http: HttpClient){ }

    async loadConfig(){
      const _getUrl = this._http.get('assets/urlConstant.json');
      this.urlConstant = await lastValueFrom(_getUrl);
      return this.urlConstant;
    }


    getConfig() {
        return this.urlConstant;
    }
}
