import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-main-ho-info',
  templateUrl: './main-ho-info.component.html',
  styleUrls: ['./main-ho-info.component.scss']
})
export class MainHoInfoComponent implements OnInit {
  viewCObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewPObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  VendorId: any;
  MrVendorTypeCode: any;
  viewObj12345: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {    

    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorTypeCode = response["MrVendorTypeCode"];
      }
    )
    
    this.viewCObj.viewInput = "./assets/ucviewgeneric/viewHOInfoCompany.json";
    this.viewPObj.viewInput = "./assets/ucviewgeneric/viewHOInfoPersonal.json";

  }

}
