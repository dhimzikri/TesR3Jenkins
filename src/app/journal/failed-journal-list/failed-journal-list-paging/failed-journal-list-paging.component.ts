import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-failed-journal-list-paging',
  templateUrl: './failed-journal-list-paging.component.html',
  styleUrls: ['./failed-journal-list-paging.component.css']
})
export class FailedJournalListPagingComponent implements OnInit {
  ucTempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  user: any;

  listTemp = [];

  isSelected
  constructor(private http: HttpClient, private toastr: NGXToastrService, private router: Router, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.ucTempPagingObj.urlJson = "./assets/ucpaging/journal/paging-failed-journal-result-list.json";
    this.ucTempPagingObj.pagingJson = "./assets/ucpaging/journal/paging-failed-journal-result-list.json";
  }

  CallBack(ev: any) {
    this.listTemp = ev.TempListObj;
  }

  RerunJournal() {
    var req = [];
    if(this.listTemp.length == 0) {
      this.toastr.warningMessage(ExceptionConstant.SELECT_ONE_JOURNAL);
      return
    }
    for (let i = 0; i < this.listTemp.length; i++) {
      if (!req.some(x => x == this.listTemp[i].JrNo)) {
        req.push(this.listTemp[i].JrNo)
      }
    }

    this.http.post<any>(this.UrlConstantNew.env.FoundationR3Url + this.UrlConstantNew.RerunJournal, {
      ListTransactionNo: req
    }, AdInsConstant.SpinnerOptions).subscribe(
      res => {
        this.toastr.warningMessage('Rerun journal success, Process may take several time');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.FAILED_JOURNAL_RESULT_LIST_PAGING],{});
        });
      },
      err => {
        this.toastr.errorMessage(ExceptionConstant.RERUN_JOURNAL_FAILED)
      }
    )



  }

}
