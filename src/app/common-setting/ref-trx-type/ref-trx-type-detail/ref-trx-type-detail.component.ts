import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ref-trx-type-detail',
  templateUrl: './ref-trx-type-detail.component.html'
})
export class RefTrxTypeDetailComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'Reftrxtypedetail';
  }


}
