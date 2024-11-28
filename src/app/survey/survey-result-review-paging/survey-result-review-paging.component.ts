import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-result-review-paging',
  templateUrl: './survey-result-review-paging.component.html'  
})
export class SurveyResultReviewPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  AppNo: string;
  AppId: number;

  constructor(private UrlConstantNew: UrlConstantNew) { }  

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyResultReview.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyResultReview.json";
  }

  viewApp(event: any){
    this.AppNo = event['RowObj']['TrxRefNo'];
    window.open(this.UrlConstantNew.env.losR3Web + "/View/AppView?AppId=" + this.AppId + "&AppNo=" + this.AppNo, "_blank");
  }

}
