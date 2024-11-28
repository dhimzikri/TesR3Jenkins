import {Component, EventEmitter, OnInit} from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-custom-master-add-edit',
  templateUrl: './custom-master-add-edit.component.html'
})
export class CustomMasterAddEditComponent implements OnInit {

  pageName: string;
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
    this.pageName = "Refmasterdetail" //case sensitive di SIT
  }

  async ngOnInit() {
  }


}
