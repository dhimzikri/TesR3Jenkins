import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ref-trx-type-paging',
  templateUrl: './ref-trx-type-paging.component.html'
})
export class RefTrxTypePagingComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'RefTrxTypePaging';
  }


}
