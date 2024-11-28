import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ucgrid-footer',
  templateUrl: './ucgrid-footer.component.html',
  styleUrls: ['./ucgrid-footer.component.scss']
})
export class UCGridFooterComponent implements OnInit {

  @Output() select: EventEmitter<any> = new EventEmitter();

  pageNow: any;
  orderByKey: any;
  orderByValue: any;
  pageSize:any;
  apiUrl:any;
  resultData:any;
  totalData:any;

  constructor() {
    
  }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
  }

  searchPagination(event: number) {
    this.pageNow = event;
    var paging = {pageNow:event,pageSize:this.pageSize};
    this.select.emit(paging);
  }

  onChange()
  {
    var paging = {pageNow:this.pageNow,pageSize:this.pageSize};
    this.select.emit(paging);
  }

}
