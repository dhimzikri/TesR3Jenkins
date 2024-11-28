import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ref-amrtz-item-paging',
  templateUrl: './ref-amrtz-item-paging.component.html'
})
export class RefAmrtzItemPagingComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'RefAmrtzItem';
  }

}
