import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ref-amrtz-add-edit',
  templateUrl: './ref-amrtz-add-edit.component.html'
})
export class RefAmrtzAddEditComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'RefAmortizeItemDetail';
  }

}
