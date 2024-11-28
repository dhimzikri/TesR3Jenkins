import { Component, Input, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NotificationTemplateObj } from 'app/shared/model/notif-engine/notification-template-obj.model';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-notif-engine-template-view-main',
  templateUrl: './notif-engine-template-view-main.component.html',
})
export class NotifEngineTemplateViewMainComponent implements OnInit {
  @Input() TemplateCode: string;
  @Input() TemplateVersion: string;
  stringBodyEmail: string = "";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    this.viewGenericObj.viewEnvironment = this.UrlConstantNew.env.NotifEngineURL + '/v1';
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/notification-template/view-template-main-data.json";
    await this.GetListTemplateHist();
  }

  async GetListTemplateHist() {
    await this.http.post(this.UrlConstantNew.GetNotificationTemplateByNotificationTemplateCodeAndVersion, { Code: this.TemplateCode, Version: this.TemplateVersion }).toPromise().then(
      (response: NotificationTemplateObj) => {
        if(response.MrNotificationTypeCode != CommonConstant.RefMasterTypeCodeNotificationTypesEmail) return;
        this.stringBodyEmail = response.Body;
      }
    );
  }

}
