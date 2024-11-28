import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-self-custom-surveyor-task-assignment-paging',
  templateUrl: './self-custom-surveyor-task-assignment-paging.component.html',

})
export class SelfCustomSurveyorTaskAssignmentPagingComponent implements OnInit {
  pageName: string;
  TransactionNo: string;
  AppId: number;

  token: string = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);

  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew, private cookieService: CookieService) {
    this.pageName = "SurveyTaskAssignment"
  }

  ngOnInit(): void {
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  callback(event) {
    let row = event.RowObj;
    
    if (event.Key === "view") {
      if (row.SurveyInitial == "MOU")
      {
        this.TransactionNo = row.TransactionRefNo;
        window.open(this.UrlConstantNew.env.losR3Web + "/View/Mou/CustView?MouNo=" + this.TransactionNo +"&Token=" + this.token, "_blank");
      }

      if (row.SurveyInitial == "LEAD")
      {
        this.TransactionNo = row.TransactionRefNo;
        window.open(this.UrlConstantNew.env.losR3Web + "/View/Lead?LeadNo=" + this.TransactionNo +"&Token=" + this.token, "_blank");
      }

      if (row.SurveyInitial == "NAP")
      {
        this.TransactionNo = row.TransactionRefNo;
        window.open(this.UrlConstantNew.env.losR3Web + "/View/AppView?AppNo=" + this.TransactionNo +"&Token=" + this.token, "_blank");
      }
    }
  }
}
