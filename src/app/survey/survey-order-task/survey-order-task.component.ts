import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SrvyTaskObj } from 'app/shared/model/srvy-task-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-survey-order-task',
  templateUrl: './survey-order-task.component.html'
})
export class SurveyOrderTaskComponent implements OnInit {

  SurveyTaskForm = this.fb.group({
    SrvyTaskId: [''],
    SrvyTaskNo: [''],
    MrSrvySubjCode: ['', [Validators.required]],
    MrSrvyObjCode: ['', [Validators.required]],
    SrvyFormSchmId: ['', [Validators.required]],
    SurveyorCode: ['', [Validators.required]]
  });

  modal: any;
  closeResult: any;
  SurveyTaskList: any;
  resultData: any;
  SrvyOrderId: number;
  SrvySubjList = [];
  SrvyObjList = [];
  FormSchmList = [];
  SrvyOrderObj: any;
  SrvyTaskObj: SrvyTaskObj = new SrvyTaskObj();
  VendorObj: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.SRVY_PAGING;
  readonly ViewLink: string = NavigationConstant.VIEW_SRVY_TASK;
  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams["SrvyOrderId"] != null) {
        this.SrvyOrderId = queryParams["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.SurveyTaskList = new Array();
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrderTask.json";

    this.generateSurveyTaskList();
    this.generateListSrvyObject();

    var SrvyObj = {
      SrvyOrderId: this.SrvyOrderId
    }
    this.http.post(this.UrlConstantNew.GetSrvyOrderBySrvyOrderId, {Id: this.SrvyOrderId}).subscribe(
      response => {
        this.SrvyOrderObj = response;        
        this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.SrvyOrderObj.VendorId}).subscribe(
          response => {
            this.VendorObj = response;
            this.SurveyTaskForm.patchValue({
              SurveyorCode: this.VendorObj.VendorCode
            });
          }
        );

      }
    );

    this.http.post(this.UrlConstantNew.GetListAllSrvyFormSchm, {}).subscribe(
      response => {
        this.FormSchmList = response["ReturnObject"];
        this.SurveyTaskForm.patchValue({
          SrvyFormSchmId: this.FormSchmList[0].SrvyFormSchmId
        });
      }
    );
  }

  SendSrvyOrder() {
    this.http.post(this.UrlConstantNew.SendSrvyOrder, this.SrvyOrderObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SRVY_PAGING],{ });
      }
    );
  }

  onChange(ev) {
    for (let i = 0; i < this.resultData.length; i++) {
      if (this.resultData[i].SurveySubject == ev) {
        this.setSrvyObjList(i);
        break;
      }
    }
  }

  AddModal(content) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });

    this.SurveyTaskForm.patchValue({
      SrvyTaskId: "",
      SrvyTaskNo: "",
      MrSrvySubjCode: this.SrvySubjList[0].Key,
      MrSrvyObjCode: "",
      SrvyFormSchmId: this.FormSchmList[0].SrvyFormSchmId
    });

    this.setSrvyObjList();
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

  Back() {
    this.modal.close();
  }

  editData(content, ev) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });

    // this.http.post<SrvyTaskObj>(this.UrlConstantNew.GetSrvyTaskBySrvyTaskId, {Id : ev}).subscribe(
    //   response => {
    //     this.SrvyTaskObj = response;
    //     this.onChange(this.SrvyTaskObj.MrSrvySubjCode);
    //     this.SurveyTaskForm.patchValue({
    //       SrvyTaskId: this.SrvyTaskObj.SrvyTaskId,
    //       SrvyTaskNo: this.SrvyTaskObj.SrvyTaskNo,
    //       MrSrvySubjCode: this.SrvyTaskObj.MrSrvySubjCode,
    //       MrSrvyObjCode: this.SrvyTaskObj.MrSrvyObjCode,
    //       SrvyFormSchmId: this.SrvyTaskObj.SrvyFormSchmId,
    //       SurveyorCode: this.SrvyTaskObj.SurveyorCode,
    //     });
    //   }
    // );
  }

  deleteData(ev) {
    if (confirm("Are you sure to delete this record?")) {
      var TaskObj = {
        SrvyTaskId: ev
      }
      this.http.post(this.UrlConstantNew.DeleteSrvyTask, TaskObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.generateSurveyTaskList();
        }
      );
    }
  }

  // SaveForm() {
  //   this.SrvyTaskObj.SrvyOrderId = this.SrvyOrderId;
  //   this.SrvyTaskObj.MrSrvySubjCode = this.SurveyTaskForm.controls["MrSrvySubjCode"].value;
  //   this.SrvyTaskObj.MrSrvyObjCode = this.SurveyTaskForm.controls["MrSrvyObjCode"].value;
  //   this.SrvyTaskObj.SrvyFormSchmId = this.SurveyTaskForm.controls["SrvyFormSchmId"].value;
  //   this.SrvyTaskObj.SurveyorCode = this.SurveyTaskForm.controls["SurveyorCode"].value;


  //   let srvySubj = this.SrvySubjList.find(x => x.Key == this.SrvyTaskObj.MrSrvySubjCode);
  //   this.SrvyTaskObj.MrSrvySubj = srvySubj.Value;
  //   let srvyObj = this.SrvyObjList.find(x => x.Key == this.SrvyTaskObj.MrSrvyObjCode);
  //   this.SrvyTaskObj.MrSrvyObj = srvyObj.Value;

  //   if (this.SurveyTaskForm.controls["SrvyTaskId"].value == "") {
  //     this.SrvyTaskObj.SrvyTaskNo = "";

  //     this.http.post(this.UrlConstantNew.AddSrvyTask, this.SrvyTaskObj).subscribe(
  //       response => {
  //         this.toastr.successMessage(response["Message"]);
  //         this.generateSurveyTaskList();
  //         this.modal.close();
  //       }
  //     );
  //   } else {
  //     this.SrvyTaskObj.SrvyTaskId = this.SurveyTaskForm.controls["SrvyTaskId"].value;
  //     this.SrvyTaskObj.SrvyTaskNo = this.SurveyTaskForm.controls["SrvyTaskNo"].value;
  //     this.SrvyTaskObj.RowVersion = this.SrvyTaskObj.RowVersion;

  //     this.http.post(this.UrlConstantNew.EditSrvyTask, this.SrvyTaskObj).subscribe(
  //       response => {
  //         this.toastr.successMessage(response["Message"]);
  //         this.generateSurveyTaskList();
  //         this.modal.close();
  //       }
  //     );
  //   }
  // }

  setSrvyObjList(arr = 0) {
    this.SrvyObjList = [];
    this.SurveyTaskForm.patchValue({
      MrSrvyObjCode: ""
    });

    if (this.resultData[arr].ListAddrArr != null && this.resultData[arr].ListAddrArr.length != 0) {
      for (let j = 0; j < this.resultData[arr].ListAddrArr.length; j++) {
        this.SrvyObjList.push(this.resultData[arr].ListAddrArr[j]);
      }
      this.SurveyTaskForm.patchValue({
        MrSrvyObjCode: this.SrvyObjList[0].Key
      });
    }
  }

  generateListSrvyObject() {
    var obj = {
      SrvyOrderId: this.SrvyOrderId
    }
    this.http.post(this.UrlConstantNew.GetListSryvObject, obj).subscribe(
      (response) => {
        this.resultData = response;
        if (this.resultData.length != 0) {
          for (let i = 0; i < this.resultData.length; i++) {
            this.SrvySubjList.push({ Key: this.resultData[i].SurveySubject, Value: this.resultData[i].CustomerName });
          }
          this.SurveyTaskForm.patchValue({
            MrSrvySubjCode: this.SrvySubjList[0].Key
          });
          this.setSrvyObjList();
        }
      }
    );
  }

  generateSurveyTaskList() {
    
    this.http.post(this.UrlConstantNew.GetListSrvyTaskBySrvyOrderId, {Id : this.SrvyOrderId}).subscribe(
      response => {
        this.SurveyTaskList = response;
      }
    );
  }
}
