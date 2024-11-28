import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ControlContainer, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lookupgeneric',
  templateUrl: './lookupgeneric.component.html',
  styleUrls: ['./lookupgeneric.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class LookupgenericComponent implements OnInit {

  @Input() lookupInput: any;
  @Input() parentForm: any;
  @Input() identifier: any = "lookupGeneric";
  @Output() lookup: EventEmitter<any> = new EventEmitter();
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  genericJson: any;

  value:any;
  id: any;
  configuration: any;
  urlGet: string;
  countForm = 0;
  isDataLoaded: boolean = false;
  title: string;
  closeResult: string;
  apiUrl:string;
  resultData: any;
  pageNow: any = 1;
  pageSize: any = 10;
  totalData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  isRequired: boolean;
  addCrit: Array<any>;

  constructor(private http: HttpClient, private modalService: NgbModal){

  }

  ngOnInit() {
    console.log("generic");
    var test = {
      _url : this.lookupInput.urlJson,
      enviromentUrl : this.lookupInput.urlEnviPaging,
      apiQryPaging : this.lookupInput.urlQryPaging,
      pagingJson : this.lookupInput.pagingJson
    }
    this.inputObj = test;

    /* #region   Additional Criteria*/
    if (this.lookupInput.addCritInput != null || this.lookupInput.addCritInput != undefined) {
      this.addCrit = new Array();
      for (var i = 0; i < this.lookupInput.addCritInput.length; i++) {
        this.addCrit.push(this.lookupInput.addCritInput[i]);
      }
    }
    /* #endregion */

    this.inputObj.addCritInput = this.addCrit;
    
    /*is Required */
    this.isRequired = this.lookupInput.isRequired;
    /* #endregion */

    this.initiateForm();
  }
  
  initiateForm() {
    this.getJSON(this.lookupInput.genericJson).subscribe(data => {
      this.genericJson = data;
      this.value = this.lookupInput.jsonSelect[this.genericJson.propertyName];
    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getSelect(event) {
    this.lookupInput.jsonSelect = event;
    this.value = event[this.genericJson.propertyName];
    this.lookupInput.nameSelect = event[this.genericJson.propertyName];
    this.lookupInput.idSelect = event[this.genericJson.propertyId];
    this.lookup.emit(event);
  }
  
  private getDismissReason(reason: any): string {
    if (reason == ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason == ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
