import {Component, EventEmitter, OnInit} from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-economic-sector-add-edit',
  templateUrl: './custom-economic-sector-add-edit.component.html'
})
export class CustomEconomicSectorAddEditComponent implements OnInit {

  pageName: string;
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
    this.pageName = "EconomicSectorDetail"
  }

  async ngOnInit() {
    await this.checkIsAutoFormNoFromSetting('ES');
    this.dataEvent.emit({IsAuto: this.isAuto});
  }

  isAuto: boolean = false;
  async checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      rowVersion: "",
      code: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    await this.http.post(this.UrlConstantNew.GetGeneralSettingByCode, generalSettingObj).toPromise().then(
      (response) => {
        result = response;
        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true
          }
        }
      });
  }

}
