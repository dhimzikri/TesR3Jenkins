import { NgxRouterService } from '@adins/fe-core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
@Component({
  selector: 'app-journal-result',
  templateUrl: './journal-result.component.html',
  styleUrls: ['./journal-result.component.css']
})
export class JournalResultComponent implements OnInit {
  JrMsgHId: number = null;
  JournalLogFailedHId: number = null;
  IsReadyJrMsgH: boolean = false;
  IsReadyJournalLogFailedH: boolean = false;

  JrMsgH: any = {};
  JournalLogFailedH: any = {};
  JournalLogFailedD = [];
  ErrMsg = [];
  JrResult = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew,
    private ngxRouter: NgxRouterService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['JrMsgHId'] != null) {
        this.JrMsgHId = queryParams['JrMsgHId'];
      }
      if (queryParams['JournalLogFailedHId'] != null) {
        this.JournalLogFailedHId = queryParams['JournalLogFailedHId'];
      }

    })

    if (this.JrMsgHId != null) {
      this.http.post<any>(this.UrlConstantNew.GetJournalResultByJrMsgHId, {
        Id: this.JrMsgHId
      }).subscribe(res => {
        this.JrMsgH = res.JrMsgH[0]
        this.JrResult = res.JrResult

        if ((this.JrMsgH.Status == 'ERROR' || this.JrMsgH.Status == 'NOT BALANCE') && this.JrMsgH.ErrMsg != null) {
          this.ErrMsg = this.JrMsgH.ErrMsg.split(';')
        }
        this.IsReadyJrMsgH = true;
      },
        error => {

        })
    }
    if (this.JournalLogFailedHId != null) {
      this.http.post<any>(this.UrlConstantNew.GetJournalLogFailedByJournalLogId, {
        Id: this.JournalLogFailedHId
      }).subscribe(res => {
        this.JrMsgH = res.JrMsgH
        this.JrResult = res.JrResult
        this.JrMsgH.JrTypeText = "JrNormal"

        if ((this.JrMsgH.Status == 'ERROR' || this.JrMsgH.Status == 'NOT BALANCE') && this.JrMsgH.ErrMsg != null) {
          this.ErrMsg = this.JrMsgH.ErrMsg.split(';')
        }

        this.IsReadyJournalLogFailedH = true;
      },
        error => {

        })
    }
  }

}
