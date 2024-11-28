import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-container-cust-attr-section',
  templateUrl: './self-custom-container-cust-attr-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SelfCustomContainerCustAttrSectionComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() parentForm: FormGroup;
  @Input() MrCustTypeCode: string = CommonConstant.CustTypePersonal;

  @Output()
  data: EventEmitter<any> = new EventEmitter<any>();

  identifierCustAttr: string = "CustAttrForm";
  enjiForm: NgForm;
  attrGroup: string;

  constructor() { }

  ngOnInit() {
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther : CommonConstant.AttrGroupCustPersonalOther;
  }

  ngAfterViewInit() {
    let Data: any[];
    console.log(this.parentForm)
    alert("X")
    this.data.emit(Data);
  }

}
