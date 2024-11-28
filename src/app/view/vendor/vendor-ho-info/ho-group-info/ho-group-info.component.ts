import { Component, OnInit } from '@angular/core';
import { VendorGroupObj } from 'app/shared/model/vendor-group-obj.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-ho-group-info',
  templateUrl: './ho-group-info.component.html',
  styleUrls: ['./ho-group-info.component.scss']
})
export class HoGroupInfoComponent implements OnInit {
  VendorGroupObj: any;
  VendorId: any;
  resultData: any;
  
  constructor(private route: ActivatedRoute,  private http: HttpClient, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.VendorId = queryParams['VendorId'];
    });
  }

  ngOnInit() {
    this.loadTableListData();
  }

  loadTableListData(){
    this.VendorGroupObj = new VendorGroupObj();
    this.VendorGroupObj.VendorId = this.VendorId;

    this.http.post(this.UrlConstantNew.GetListVendorGrpByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.resultData = response[CommonConstant.ReturnObj];
      }
    );
  }
}
