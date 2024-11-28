import { UcTemplateService } from '@adins/uctemplate';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-container-cust-attr',
  templateUrl: './self-custom-container-cust-attr.component.html'
})
export class SelfCustomContainerCustAttrComponent implements OnInit {

  @Input() CustDataMode: string;
  @Input() CustId: number = 0;
  @Input() parentForm: FormGroup;
  @Input() AttrGroupCustPersonalOther: string = CommonConstant.AttrGroupCustPersonalOther;
  @Input() listAttrCodes: Array<string> = [CommonConstant.AttrCodeDeptAml, CommonConstant.AttrCodeAuthAml];
  
  enjiForm: NgForm;

  constructor(private templateService: UcTemplateService) { }

  ngOnInit(): void {
    this.enjiForm = this.templateService.container.getEnjiForm();

    if (this.CustDataMode == undefined)
    {
      this.CustDataMode = CommonConstant.CustMainDataModeFamily;
    }
  }

}
