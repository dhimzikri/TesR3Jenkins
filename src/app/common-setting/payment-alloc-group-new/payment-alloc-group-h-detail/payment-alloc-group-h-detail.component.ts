import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-alloc-group-h-detail',
  templateUrl: './payment-alloc-group-h-detail.component.html'
})
export class PaymentAllocGroupHDetailComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'Paymentallocgroupdetail';
  }
}
