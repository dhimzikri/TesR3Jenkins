import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-alloc-group-d-detail',
  templateUrl: './payment-alloc-group-d-detail.component.html'
})
export class PaymentAllocGroupDDetailComponent implements OnInit {
  pageName = '';

  constructor() { }

  ngOnInit(): void {
    this.pageName = 'Paymentallocgrpddetail';
  }
}
