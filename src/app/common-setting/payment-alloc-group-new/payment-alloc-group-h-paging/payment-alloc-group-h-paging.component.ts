import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-alloc-group-h-paging',
  templateUrl: './payment-alloc-group-h-paging.component.html'
})
export class PaymentAllocGroupHPagingComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'PaymentAllocationGroup';
  }
}
