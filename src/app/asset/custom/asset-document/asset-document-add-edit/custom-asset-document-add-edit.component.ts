import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-asset-document-add-edit',
  templateUrl: './custom-asset-document-add-edit.component.html'
})
export class CustomAssetDocumentAddEditComponent implements OnInit {

  isReady: boolean = false;
  pageName: string;
  paramObj: Record<string,any> ={};
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
    this.pageName = "Assetdocumentdetail"
  }

  async ngOnInit() {

  }


}
