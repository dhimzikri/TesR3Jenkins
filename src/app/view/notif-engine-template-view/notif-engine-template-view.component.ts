import { NgxRouterService } from '@adins/fe-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-notif-engine-template-view',
  templateUrl: './notif-engine-template-view.component.html',
})
export class NotifEngineTemplateViewComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  TemplateCode: string = "";
  TemplateVersion: number;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["TemplateCode"] != null) {
        this.TemplateCode = queryParams["TemplateCode"];
      }
      if (queryParams["TemplateVersion"] != null) {
        this.TemplateVersion = queryParams["TemplateVersion"];
      }
    });
   }

  ngOnInit(): void {
    this.viewGenericObj.viewEnvironment = this.UrlConstantNew.env.NotifEngineURL + '/v1';
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/notification-template/view-template-header.json";
  }
}
