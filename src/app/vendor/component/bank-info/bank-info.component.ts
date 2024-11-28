import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { VendorBankAccObj } from 'app/shared/model/vendor-bank-acc-obj.model';
import { VendorService } from 'app/vendor/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
  providers: [VendorService, NGXToastrService]
})
export class BankInfoComponent implements OnInit {
  @Input() objInput: any;
  modal: any;
  closeResult: any;
  inputLookupBankObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  mode: string = "add";
  VendorBankAcc: VendorBankAccObj = new VendorBankAccObj();
  VendorBankAccId: number;
  ListData: any = new Array();
  BankRegisForm = this.fb.group({
    AccNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    AccName: ['', [Validators.required]],
    IsDefault: [false],
    IsActive: [false],
    RefBankId: [],
    BankBranchRegCode: [],
    BankBranch: ['', [Validators.required]],
    Notes: ['']
  });
  objEdit: VendorBankAccObj;

  constructor(private toastr: NGXToastrService, private route: ActivatedRoute, private modalService: NgbModal, private fb: FormBuilder, private vendorService: VendorService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.getListData();
    this.setLookup();
  }

  open(content) {
    this.mode = "add";
    this.title = "Add Bank Account";
    this.setLookup();
    this.ResetValue();

    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  SaveForm(enjiForm: NgForm) {
    if (this.objInput.Type == "Vendor") {
      if (this.objInput.VendorId == undefined) {
        this.toastr.warningMessage("Please add main data first");
        return false;
      }
      this.VendorBankAcc.VendorId = this.objInput.VendorId;
      this.VendorBankAcc.VendorEmpId = null;
    } else if (this.objInput.Type == "VendorEmployee") {
      if (this.objInput.VendorEmpId == undefined) {
        this.toastr.warningMessage("Please add main data first");
        return false;
      }
      this.VendorBankAcc.VendorId = null;
      this.VendorBankAcc.VendorEmpId = this.objInput.VendorEmpId;
    }
    this.VendorBankAcc.RefBankId = this.BankRegisForm.controls.RefBankId.value
    this.VendorBankAcc.BankAccountNo = this.BankRegisForm.controls.AccNumber.value;
    this.VendorBankAcc.BankAccountName = this.BankRegisForm.controls.AccName.value;
    this.VendorBankAcc.IsDefault = this.BankRegisForm.controls.IsDefault.value;
    this.VendorBankAcc.IsActive = this.BankRegisForm.controls.IsActive.value;
    this.VendorBankAcc.Notes = this.BankRegisForm.controls.Notes.value;
    this.VendorBankAcc.BankBranch = this.BankRegisForm.controls.BankBranch.value;

    if (this.mode == "add") {
      this.VendorBankAcc.VendorBankAccId = 0;
      this.vendorService.AddVendorBankAcc(this.VendorBankAcc).subscribe(
        response => {
          this.getListData();
          this.setLookup();
          this.toastr.successMessage(response["Message"]);
          this.modal.close();
          this.ResetValueForm(enjiForm);
        }
      );
    } else {
      this.VendorBankAcc.VendorBankAccId = this.VendorBankAccId;
      this.VendorBankAcc.RowVersion = this.objEdit.RowVersion;
      this.vendorService.EditVendorBankAcc(this.VendorBankAcc).subscribe(
        response => {
          this.getListData();
          this.setLookup();
          this.toastr.successMessage(response["Message"]);
          this.modal.close();
          this.ResetValueForm(enjiForm);
        }
      );
    }
  }

  ResetValue() {
    this.BankRegisForm.patchValue({
      AccNumber: "",
      AccName: "",
      RefBankId: "",
      IsDefault: false,
      IsActive: false,
      BankBranch: "",
      Notes: ""
    });
    this.SetDefault();
    this.inputLookupBankObj.jsonSelect = { bankName: "" };
    this.inputLookupBankObj.nameSelect = { bankName: "" };
    this.BankRegisForm.controls.AccNumber.updateValueAndValidity();
    this.BankRegisForm.controls.AccName.updateValueAndValidity();
    this.BankRegisForm.controls.BankBranch.updateValueAndValidity();
  }
  ResetValueForm(enjiForm: NgForm) {
    this.ResetValue();
    enjiForm.reset();
  }

  title: string = "";
  async editBank(id, content) {
    this.mode = "edit";
    this.title = "Edit Bank Account";
    this.VendorBankAccId = id;
    await this.vendorService.GetVendorBankAccByVendorBankAccId({ Id: this.VendorBankAccId }).toPromise().then((response: VendorBankAccObj) => {
      this.objEdit = response;
      this.BankRegisForm.patchValue({
        AccNumber: response.BankAccountNo,
        AccName: response.BankAccountName,
        RefBankId: response.RefBankId,
        IsDefault: response.IsDefault,
        IsActive: response.IsActive,
        BankBranch: response.BankBranch,
        Notes: response.Notes,
        RowVersion: response.RowVersion
      });
      this.SetDefault();
      this.setLookup();
    })

    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });
  }

  Back() {
    this.modal.close();
  }

  getLookupBankResponse(e) {
    this.BankRegisForm.patchValue({
      RefBankId: e.RefBankId,
      BankBranchRegCode: e.RegRptCode
    });
  }

  deleteBank(vendorBankAccId) {
    if (confirm("Are you sure to delete this record?")) {
      this.vendorService.DeleteVendorBankAcc({ Id: vendorBankAccId }).subscribe(response => {
        this.toastr.successMessage(response["Message"]);
        this.getListData();
      });
    }
  }

  getListData() {
    if (this.objInput.Type == "Vendor") {
      if (this.objInput.VendorId != undefined && this.objInput.VendorId != null) {
        this.vendorService.GetListVendorBankAccByVendorId({ Id: this.objInput.VendorId }).subscribe(
          response => {
            this.ListData = response[CommonConstant.ReturnObj];
          }
        );
      }
    } else if (this.objInput.Type == "VendorEmployee") {
      if (this.objInput.VendorEmpId != undefined && this.objInput.VendorEmpId != null) {
        let ReqGetListVendorBankAccByVendorEmpId: GenericObj = new GenericObj();
        ReqGetListVendorBankAccByVendorEmpId.Id = this.objInput.VendorEmpId;
        this.vendorService.GetListVendorBankAccByVendorEmpId(ReqGetListVendorBankAccByVendorEmpId).subscribe(
          response => {
            this.ListData = response[CommonConstant.ReturnObj];
          }
        );
      }
    }
  }

  SetDefault() {
    let isDefault: boolean = this.BankRegisForm.get("IsDefault").value;
    let tempIsActive: AbstractControl = this.BankRegisForm.get("IsActive");
    tempIsActive.enable();
    if (isDefault) {
      tempIsActive.setValue(true);
      tempIsActive.disable();
    }
    tempIsActive.updateValueAndValidity();
  }

  setLookup() {
    this.inputLookupBankObj.isReady = false;
    this.inputLookupBankObj.urlJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.pagingJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.genericJson = "./assets/uclookup/Bank/lookupBank.json";
    this.inputLookupBankObj.isRequired = true;

    if (this.objEdit != null && this.mode == "edit") {
      this.inputLookupBankObj.jsonSelect = { BankName: this.objEdit.BankName };
      this.inputLookupBankObj.nameSelect = { BankName: this.objEdit.BankName };
    } else {
      this.inputLookupBankObj.jsonSelect = { BankName: "" };
      this.inputLookupBankObj.nameSelect = { BankName: "" };
    }
    this.inputLookupBankObj.isReady = true;
  }
}
