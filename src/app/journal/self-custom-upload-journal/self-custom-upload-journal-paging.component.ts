import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { saveAs } from 'file-saver'; 
import { base64StringToBlob } from 'blob-util';

@Component({
  selector: 'app-self-custom-upload-journal-paging',
  templateUrl: './self-custom-upload-journal-paging.component.html'
})

export class SelfCustomUploadJournalPagingComponent implements OnInit {

  pageName: string;

  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.pageName = "JournalExcelFiles"
  }

  ngOnInit(): void {
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  callback(event) {
    if (event.Key === "Download") {
      let JrSourceFileId = event.RowObj.JrSourceFileId
      this.http.post(this.UrlConstantNew.DownloadJournalFile,{ Id: JrSourceFileId }).subscribe(
        response => {
          const b64Data = response['FileContents'];
          const contentType = response['ContentType'];
          const fileName = response['FileDownloadName'];
          const blob = base64StringToBlob(b64Data.toString(), contentType);
          saveAs(blob, fileName);
        }
      );
    }
  }
}
