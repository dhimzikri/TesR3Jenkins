import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { DatePipe, formatDate } from '@angular/common';
import { CustCompanyLegalDocObj } from 'app/shared/model/cust-company-legal-doc-obj.model';
import { String } from 'typescript-string-operations';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';


@Component({
  selector: 'app-cust-legal-doc-detail',
  templateUrl: './cust-legal-doc-detail.component.html'
})
export class CustLegalDocDetailComponent implements OnInit {
  @Input() CustCompanyId: number;
  @Input() CustLegalDocs: Array<CustCompanyLegalDocObj>;
  @Input() ListLegalDocCantDuplicate: Array<string>;
  @Input() CustCompanyLegalDocId: number;
  @Input() Mode: string = "Add";

  legalDocTypeList: any;
  businessDtMin: Date;
  businessDtMax: Date;

  CustCompanyLegalDocForm = this.fb.group({
    CustCompanyLegalDocId: [0, [Validators.required]],
    CustCompanyId: [0, [Validators.required]],
    MrLegalDocTypeCode: ['', [Validators.required]],
    DocNo: ['', [Validators.required]],
    DocDt: ['', [Validators.required]],
    DocExpiredDt: [''],
    DocNotes: [''],
    NotaryName: [''],
    NotaryLocation: [''],
    //IsExpDtMandatory: [false],
    RowVersion: ['']
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal, 
    private cookieService: CookieService,
    private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);

    var refMasterDocType: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterDocType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeLegalDocType;
    this.http.post(this.UrlConstantNew.GetListActiveRefMaster, refMasterDocType).subscribe(
      (response: any) => {
        this.legalDocTypeList = response;
        this.CustCompanyLegalDocForm.patchValue({
          CustCompanyId: this.CustCompanyId,
          MrLegalDocTypeCode: response.ReturnObject[0].Key
        });
      }
    );

    if(this.Mode == "Edit"){
      this.http.post(this.UrlConstantNew.GetCustCompanyLegalDocByCustCompanyLegalDocId, {Id : this.CustCompanyLegalDocId}).subscribe(
        (response: CustCompanyLegalDocObj) => {
          this.CustCompanyLegalDocForm.patchValue({
            CustCompanyLegalDocId: response.CustCompanyLegalDocId,
            CustCompanyId: response.CustCompanyId,
            MrLegalDocTypeCode: response.MrLegalDocTypeCode,
            DocNo: response.DocNo,
            DocDt: formatDate(response.DocDt, 'yyyy-MM-dd', 'en-US'),
            DocExpiredDt: response.DocExpiredDt != null ? formatDate(response.DocExpiredDt, 'yyyy-MM-dd', 'en-US') : '',
            DocNotes: response.DocNotes,
            NotaryName: response.NotaryName,
            NotaryLocation: response.NotaryLocation,
            RowVersion: response.RowVersion
          });
        }
      );
    }
  }

  async Save() {
    let datePipe = new DatePipe("en-US");
    var custCompanyLegalDocData = this.CustCompanyLegalDocForm.value;
    let docDt = new Date(custCompanyLegalDocData.DocDt);
    let docDtValidate = datePipe.transform(docDt, "yyyy-MM-dd");
    let expDt = custCompanyLegalDocData.DocExpiredDt != '' ? new Date(custCompanyLegalDocData.DocExpiredDt) : null;
    let expDtValidate = datePipe.transform(expDt, "yyyy-MM-dd");
    let businessDtValidate = datePipe.transform(this.businessDtMin, "yyyy-MM-dd");
    let existCustLegalDoc = this.CustLegalDocs.find(x => x.MrLegalDocTypeCode == this.CustCompanyLegalDocForm.value.MrLegalDocTypeCode
                                                && x.DocNo == this.CustCompanyLegalDocForm.value.DocNo
                                                && x.CustCompanyLegalDocId != this.CustCompanyLegalDocForm.value.CustCompanyLegalDocId);

    if(expDtValidate != null && expDtValidate <= businessDtValidate){
      this.toastr.warningMessage(ExceptionConstant.EXP_DT_MUST_HIGHER_THAN_BD);
      return;
    }

    if(docDtValidate > businessDtValidate){
      this.toastr.warningMessage(ExceptionConstant.ISSUE_DT_MUST_LESS_EQ_THAN_BD);
      return;
    }

    if(existCustLegalDoc != null){
      var checkGSValue = this.ListLegalDocCantDuplicate.find(x => x == existCustLegalDoc.MrLegalDocTypeCode);
      if(checkGSValue != null){
        var errorOutput = this.legalDocTypeList.ReturnObject.find(x => x.Key == this.CustCompanyLegalDocForm.value.MrLegalDocTypeCode);
        this.toastr.warningMessage(String.Format(ExceptionConstant.DUPLICATE_LEGAL_DOC, errorOutput.Value, this.CustCompanyLegalDocForm.value.DocNo));
        return;
      }
    }

    if(this.Mode == "Add"){
      this.http.post(this.UrlConstantNew.AddCustCompanyLegalDoc, custCompanyLegalDocData, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.activeModal.close(response);
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.EditCustCompanyLegalDoc, custCompanyLegalDocData, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.activeModal.close(response);
        }
      );
    }
  }
}
