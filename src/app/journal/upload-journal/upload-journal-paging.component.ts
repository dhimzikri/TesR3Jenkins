import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { saveAs } from 'file-saver'; 
import { base64StringToBlob } from 'blob-util';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-upload-journal-paging',
  templateUrl: './upload-journal-paging.component.html'
})


export class UploadJournalPagingComponent implements OnInit {
    inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
    user: any;
    Id: number;
    constructor(
      private http: HttpClient, 
      private UrlConstantNew: UrlConstantNew
    ){
      
    }

    ngOnInit() {
        this.inputPagingObj._url = "./assets/ucpaging/journal/searchUploadJournal.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/journal/searchUploadJournal.json";

    }

    getCallBack(event) {
      if (event.Key === "Download") {
        this.Id = event.RowObj.JrSourceFileId
        this.http.post(this.UrlConstantNew.DownloadJournalFile,{ Id: this.Id }).subscribe(
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

    // clickEvent(){
    //   this.service.getPDF().subscribe((response)=>{
    
    //   let file = new Blob([response], { type: 'application/pdf' });            
    //   var fileURL = URL.createObjectURL(file);
    //   window.open(fileURL);
    // })


    // getPDF(){
    //   const url = `${this.serviceUrl}/pdf`;
      
    //   const httpOptions = {
    //     'responseType'  : 'arraybuffer' as 'json'
    //      //'responseType'  : 'blob' as 'json'        //This also worked
    //   };
      
    //   return this.http.get<any>(url, httpOptions);
      
    //   }
}