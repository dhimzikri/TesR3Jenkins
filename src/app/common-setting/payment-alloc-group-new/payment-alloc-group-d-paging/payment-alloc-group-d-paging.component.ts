import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-alloc-group-d-paging',
  templateUrl: './payment-alloc-group-d-paging.component.html'
})
export class PaymentAllocGroupDPagingComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'Paymentallocgrpdpaging';
  }
}
