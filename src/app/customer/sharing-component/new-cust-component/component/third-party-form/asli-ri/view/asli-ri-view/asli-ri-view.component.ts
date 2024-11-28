import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustObj } from 'app/shared/model/cust-obj.model';

@Component({
  selector: 'app-asli-ri-view',
  templateUrl: './asli-ri-view.component.html',
  styleUrls: ['./asli-ri-view.component.css']
})
export class AsliRiViewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { 

  }

  @Input() custObj: CustObj;
  @Input() parentForm: FormGroup;
  @Input() MrCustTypeCode: string;



  async ngOnInit() {
    
  }


}
