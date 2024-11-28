import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
@Component({
  selector: 'app-journal-media-paging',
  templateUrl: './journal-media-paging.component.html',
  styleUrls: ['./journal-media-paging.component.css']
})
export class JournalMediaPagingComponent implements OnInit {

  readonly JournalMediaDetailLink: string = NavigationConstant.JOURNAL_MEDIA_DETAIL;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/journal/paging-journal-media.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/journal/paging-journal-media.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.env.FoundationR3Url + "/v1" + "/Journal/DeleteJrMHeader";
  }

  onCallback(ev) {
    let key = ev.Key
    let row = ev.RowObj

    if (key == 'delete') {
      this.http.post<any>(this.UrlConstantNew.env.FoundationR3Url + '/v1' + '/Journal/DeleteJrMHeader', { JrMHeaderId: row.JrMHeaderId }).subscribe(
        response => {
          this.toastr.successMessage('Successfully remove TrxTypeCode: ' + response);

        },
        error => {
          console.log(error);
        }
      )

    }
  }
}
