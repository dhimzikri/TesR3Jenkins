import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";


@Injectable()

export class EnviConfigService {
    private appConfig: any;
    constructor(private _http: HttpClient){ }

    async loadConfig(){
      const _getEnvi = this._http.get('assets/config/enviConfig.json');
      this.appConfig = await lastValueFrom(_getEnvi);
      return this.appConfig;
    }

    getConfig() {
        return this.appConfig;
    }
}