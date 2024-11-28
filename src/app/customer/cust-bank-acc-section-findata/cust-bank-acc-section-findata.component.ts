import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustBankAccObj } from 'app/shared/model/cust-bank-acc-obj.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustBankAccDetailSectionFindataComponent } from '../cust-bank-acc-detail-section-findata/cust-bank-acc-detail-section-findata.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-cust-bank-acc-section-findata',
  templateUrl: './cust-bank-acc-section-findata.component.html'
})
export class CustBankAccSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  cbaFinDataList: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService,
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    var custBankAccObj = new CustBankAccObj();
    custBankAccObj.CustId = this.CustId;
    this.http.post(this.UrlConstantNew.GetCBAForCustFinDataByCustId, { id: this.CustId }).subscribe(
      (response: any) => {
        this.cbaFinDataList = response.ListCBAForCustFinData;
      }
    );
  }

  custBankHandler(type, custBankAccId) {

    if (type === 'delete') {
      if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
        this.spinner.show();
        let reqObj = {
          Id: custBankAccId
        };
        this.http.post(this.UrlConstantNew.DeleteCustBankAccAndStmnt, reqObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.http.post(this.UrlConstantNew.GetCBAForCustFinDataByCustId, { id: this.CustId }).subscribe(
              (response: any) => {
                this.cbaFinDataList = response.ListCBAForCustFinData;
                this.toastr.successMessage(response["message"]);
                this.spinner.hide();
              }
            );
          });
      }
      return;
    }

    const modalCustBank = this.modalService.open(CustBankAccDetailSectionFindataComponent);
    modalCustBank.componentInstance.CustId = this.CustId;
    modalCustBank.componentInstance.pageType = type;
    modalCustBank.componentInstance.CustBankAccId = custBankAccId;
    modalCustBank.componentInstance.isAddBankStatement = type == "editStmnt" ? true : false;
    switch (type) {
      case "add":
        modalCustBank.componentInstance.modalTitle = "Add New Debtor Bank Account";
        break;

      case "editStmnt":
        modalCustBank.componentInstance.modalTitle = "Add New Debtor Bank Statement";
        break;

      case "edit":
        modalCustBank.componentInstance.modalTitle = "Edit Debtor Bank Account";
        break;

      default:
        break;
    }

    modalCustBank.result.then(
      (response) => {
        this.spinner.show();
        this.http.post(this.UrlConstantNew.GetCBAForCustFinDataByCustId, { id: this.CustId }).subscribe(
          (response: any) => {
            this.cbaFinDataList = response.ListCBAForCustFinData;
            this.spinner.hide();
            this.toastr.successMessage(response["message"]);
          }
        );
      }
    ).catch(
      (error) => {
        if (error != 0) {
          console.log(error);
        }
      }
    );
  }
}
