import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-asset-category-add-edit',
  templateUrl: './custom-asset-category-add-edit.component.html'
})
export class CustomAssetCategoryAddEditComponent implements OnInit {

  isReady: boolean = false;
  pageName: string;
  paramObj: Record<string,any> ={};
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
    this.pageName = "AssetCategoryDetail"
  }

  async ngOnInit() {
    await this.checkIsAutoFormNoFromSetting('AC');
  }

  isAuto: string = "0";
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
            this.isAuto = "1";
          }
        }
        this.paramObj['isAuto'] = "1";
        this.isAuto = "1";
        this.isReady = true;
      });
  }


}
