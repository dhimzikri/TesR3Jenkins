import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';

@Component({
  selector: 'app-payment-alloc-detail-attribute',
  templateUrl: './payment-alloc-detail-attribute.component.html',
  styles: ["input, select, textarea {height: 31px !important; border-radius: 8px  !important;border: 1px solid var(--gray-line, #DFE6E9);background: var(--white-1, #FDFEFF);}"]
})
export class PaymentAllocDetailAttributeComponent implements OnInit {

  @Input() index;
  @Input() AttrObj = null;

  Attrform = this.fb.group({
    PaymentAllocAttrCode: ["", [Validators.required]],
    PaymentAllocAttrName: ["", [Validators.required]],
    AttrInputType: ["", [Validators.required]],
    attributeTypeName: ["", [Validators.required]]
  })

  dropdownListObj: UcDropdownListObj = new UcDropdownListObj(this.UrlConstantNew);

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private UrlConstantNew: UrlConstantNew
  ) { 

  }

  ngOnInit(): void {

    if(this.AttrObj !== null){
      this.Attrform.patchValue({
        PaymentAllocAttrCode: this.AttrObj.PaymentAllocAttrCode,
        PaymentAllocAttrName: this.AttrObj.PaymentAllocAttrName,
        AttrInputType: this.AttrObj.AttrInputType,
        attributeTypeName: this.AttrObj.attributeTypeName
      });

      this.Attrform.get('PaymentAllocAttrCode').disable();
    }

    this.dropdownListObj.apiPath = this.UrlConstantNew.GetListActiveRefMasterDDL;
    this.dropdownListObj.requestObj = {RefMasterTypeCode : CommonConstant.RefMasterTypeCodeAttrInputType};
    this.dropdownListObj.isSelectOutput = true;
    this.dropdownListObj.isReady = true;
  }

  ddlCallback(ev){
    console.log(ev)
    this.Attrform.patchValue({
      attributeTypeName : ev.selectedObj.Value
    })
  }

  OnSubmit(){
    const RawVal = this.Attrform.getRawValue();
    console.log(RawVal)
    this.activeModal.close(RawVal);
  }


}
