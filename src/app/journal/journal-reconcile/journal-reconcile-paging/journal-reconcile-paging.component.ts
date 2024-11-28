import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';


@Component({
  selector: 'app-journal-reconcile-paging',
  templateUrl: './journal-reconcile-paging.component.html',
  styleUrls: ['./journal-reconcile-paging.component.css']
})
export class JournalReconcilePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  isReady: boolean;
  user: any;

  listTemp = [];

  isSelected
  constructor(private http: HttpClient, private toastr: NGXToastrService, private router: Router, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/journal/paging-journal-reconcile.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.FoundationR3Url + '/v1';
    this.inputPagingObj.apiQryPaging = this.UrlConstantNew.GetJournalResultPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/journal/paging-journal-reconcile.json";
    this.isReady = true;
  }

  CallBack(ev: any) {
    this.listTemp = ev.TempListObj;
  }

  // RerunJournal() {
  //   var req = [];
  //   if(this.listTemp.length == 0)
  //   {
  //     this.toastr.warningMessage(ExceptionConstant.SELECT_ONE_JOURNAL);
  //     return
  //   }

  //   var executedJournal = this.listTemp.find(x => x.Status == CommonConstant.JOURNAL_STAT_EXE_DESCR);

  //   if(executedJournal != undefined && executedJournal != null){
  //     this.toastr.warningMessage(String.Format(ExceptionConstant.JOURNAL_ALREADY_EXECUTED, executedJournal.JrNo));
  //     return;
  //   }

  //   for (let i = 0; i < this.listTemp.length; i++) {
  //     if (!req.some(x => x == this.listTemp[i].JrNo)) {
  //       req.push(this.listTemp[i].JrNo)
  //     }
  //   }

  //   this.http.post<any>(this.UrlConstantNew.env.FoundationR3Url + this.UrlConstantNew.RerunJournal, {
  //     ListTransactionNo: req
  //   }).subscribe(
  //     res => {
  //       this.toastr.successMessage('Rerun journal success, Process may take several time');
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         AdInsHelper.RedirectUrl(this.router,[NavigationConstant.JOURNAL_RECONCILE_PAGING],{});
  //       });
  //     },
  //     err => {
  //       this.toastr.errorMessage(ExceptionConstant.RERUN_JOURNAL_FAILED)
  //     }
  //   )
  // }

}
