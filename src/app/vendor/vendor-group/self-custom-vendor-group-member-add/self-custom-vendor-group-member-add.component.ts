import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-group-member-add',
  templateUrl: './self-custom-vendor-group-member-add.component.html'
})
export class SelfCustomVendorGroupMemberAddComponent implements OnInit {

  pageName: string;
  @Output()
  onBtnClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.pageName = "SupplierGroupMemberAddVendor"
  }
  ngOnInit(): void {
  }

  btnClickHandler(ev)
  {
    if (ev.key == "addToTemp")
    {
      alert("x")
    }
  }

}
