import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-working-hour-paging',
  templateUrl: './working-hour-paging.component.html',
  providers: [DecimalPipe]
})
export class WorkingHourPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  
  readonly AddLink: string = NavigationConstant.CS_WORKING_HOUR_ADD;
  constructor(private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchWorkingHourSchm.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchWorkingHourSchm.json";
  }
}
