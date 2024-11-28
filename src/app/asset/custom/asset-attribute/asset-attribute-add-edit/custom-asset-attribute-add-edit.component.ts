import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-asset-attribute-add-edit',
  templateUrl: './custom-asset-attribute-add-edit.component.html'
})
export class CustomAssetAttributeAddEditComponent implements OnInit {

  isReady: boolean = false;
  pageName: string;
  paramObj: Record<string,any> ={};
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
    this.pageName = "AssetAttributeDetail"
  }

  async ngOnInit() {

  }


}
