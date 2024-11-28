import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-master-cod-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { VendorAtpmMappingObj } from 'app/shared/model/vendor-atpm-mapping-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { Subscription } from 'rxjs';
import { UcTemplateService } from '@adins/uctemplate';
import { SelfCustomVendorAtpmSelectComponent } from 'app/vendor/vendor-ATPM/self-custom-vendor-atpm-select/self-custom-vendor-atpm-select.component';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-self-custom-container-vendor-ho-info',
  templateUrl: './self-custom-container-vendor-ho-info.component.html'
})
export class SelfCustomContainerVendorHoInfoComponent implements OnInit, OnDestroy {

  @Input() MrVendorCategoryCode: string;
  @Input() parentForm: FormGroup;

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  enjiForm: NgForm;

  result: any;
  ListVendorAttrContent = new Array<any>();
  VendorAttrList = new Array<any>();
  ListInputLookUpObj = new Array<any>();
  vendorAtpmList = new Array();
  resultAtpmMapping: Array<VendorAtpmMappingObj> = new Array();

  VendorId: number = 0;
  MrVendorTypeCode: string = "C";
  inputLookupParentObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);

  DictDDLVendorAttr: { [id: string]: Array<any> } = {};

  isFormReady: boolean = false;

  subscriber: Subscription;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, 
    private toastr: NGXToastrService, private modalService: NgbModal,private spinner: NgxSpinnerService, 
    private UrlConstantNew: UrlConstantNew, private ngxRouter: NgxRouterService,
    private ucTemplateSvc: UcTemplateService) {
      this.route.queryParams.subscribe(params => {
        const queryParams = this.ngxRouter.getQueryParams(params);
        if (queryParams["VendorId"] != null) {
          this.VendorId = queryParams["VendorId"];
        }
      });
    }

  async ngOnInit() {
    this.SetTitleHoInfo();

    if (this.VendorId > 0)
    {
      await this.getData();
    }

    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO)
    {
      this.parentForm.addControl("VendorParentId", this.fb.control(''));
    }

    await this.http.post(this.UrlConstantNew.GetListVendorAttrContentByVendorId, { Id: this.VendorId }).toPromise().then(
      async(response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj]
        if (this.ListVendorAttrContent != null) {
          let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
          reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
          if (this.ListVendorAttrContent.length < 1) {
            await this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).toPromise().then(
              async (response: any) => {
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];

                let tempLookup = {};
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    var formGroupObject = new Object();
                    formGroupObject["VendorAttrContentId"] = [0];
                    formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
                    if (vendorAttr["AttrInputType"] == 'T') {
                      formGroupObject["VendorAttrValue"] = [''];
                    }
                    else if (vendorAttr["AttrInputType"] == 'L') {
                      var temp = vendorAttr["AttrValue"].split(";");
                      this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[0]];
                    }
                    else {
                      formGroupObject["VendorAttrValue"] = [''];
                    }
                    parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
  
                    if (vendorAttr["AttrInputType"] == 'RM') {
                      tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                      tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["AttrCode"]].urlQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
                      tempLookup[vendorAttr["AttrCode"]].urlEnviPaging = this.UrlConstantNew.env.FoundationR3Url;
                      tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                      tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                      var arrAddCrit = new Array();
                      var critAssetObj = new CriteriaObj();
                      critAssetObj.DataType = 'text';
                      critAssetObj.restriction = AdInsConstant.RestrictionEq;
                      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                      critAssetObj.value = vendorAttr.AttrValue;
                      arrAddCrit.push(critAssetObj);
                      tempLookup[vendorAttr["AttrCode"]].addCritInput = arrAddCrit;
                    }
                  }
                  this.ListInputLookUpObj.push(tempLookup);
                  this.parentForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              }
            );
          }
          else {
            await this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).toPromise().then(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                if(this.VendorAttrList != null){
                  for (const vendorAttr of this.VendorAttrList) {
                    var item = this.ListVendorAttrContent.find(x => x.AttrCode == vendorAttr.AttrCode);
                    if (item == undefined) {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
  
                      if (vendorAttr["AttrInputType"] == 'L') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [temp[0]];
                      } else {
                        formGroupObject["VendorAttrValue"] = [''];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
  
                      if (vendorAttr["AttrInputType"] == 'RM') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].urlQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
                        tempLookup[vendorAttr["AttrCode"]].urlEnviPaging = this.UrlConstantNew.env.FoundationR3Url;
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        tempLookup[vendorAttr["AttrCode"]].jsonSelect = vendorAttr["AttrCode"];
  
                        var arrAddCrit = new Array();
                        var critAssetObj = new CriteriaObj();
                        critAssetObj.DataType = 'text';
                        critAssetObj.restriction = AdInsConstant.RestrictionEq;
                        critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                        critAssetObj.value = vendorAttr.AttrValue;
                        arrAddCrit.push(critAssetObj);
                        tempLookup[vendorAttr["AttrCode"]].addCritInput = arrAddCrit;
                      }
                    }
                    else {
                      var formGroupObject = new Object();
                      formGroupObject["VendorAttrContentId"] = [0];
                      formGroupObject["AttrCode"] = [vendorAttr["AttrCode"]];
  
                      if (vendorAttr["AttrInputType"] == 'T') {
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'L') {
                        var temp = vendorAttr["AttrValue"].split(";");
                        this.DictDDLVendorAttr[vendorAttr["AttrCode"]] = temp;
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else if (vendorAttr["AttrInputType"] == 'RM') {
                        tempLookup[vendorAttr["AttrCode"]] = new InputLookupObj(this.UrlConstantNew);
                        tempLookup[vendorAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].urlQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
                        tempLookup[vendorAttr["AttrCode"]].urlEnviPaging = this.UrlConstantNew.env.FoundationR3Url;
                        tempLookup[vendorAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                        tempLookup[vendorAttr["AttrCode"]].title = vendorAttr.AttrName;
                        tempLookup[vendorAttr["AttrCode"]].isRequired = false;
                        var arrAddCrit = new Array();
                        var critAssetObj = new CriteriaObj();
                        critAssetObj.DataType = 'text';
                        critAssetObj.restriction = AdInsConstant.RestrictionEq;
                        critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                        critAssetObj.value = vendorAttr.AttrValue;
                        arrAddCrit.push(critAssetObj);
                        tempLookup[vendorAttr["AttrCode"]].addCritInput = arrAddCrit;
                        let refMaster: ReqRefMasterByTypeCodeAndMasterCodeObj = {
                          RefMasterTypeCode: vendorAttr.AttrValue,
                          MasterCode: item["AttrContent"]
                        };
                        await this.http.post(this.UrlConstantNew.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).toPromise().then(
                          (response: KeyValueObj) => {
                            tempLookup[vendorAttr["AttrCode"]].jsonSelect = { Descr: response.Value }
                          });
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      else {
                        formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                      }
                      parentFormGroup[vendorAttr["AttrCode"]] = this.fb.group(formGroupObject);
                    }
                  }
  
                  this.ListInputLookUpObj.push(tempLookup);
                  this.parentForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                  this.isFormReady = true;
                }
              });
          }
        }
      }
    );

    for (const vendorAttr of this.VendorAttrList) {
      if(vendorAttr["AttrCode"] == 'PROPORTIONAL_DAYS_PER_YEAR'){
        this.parentForm.controls.VendorAttrList['controls'][vendorAttr["AttrCode"]]['controls'].VendorAttrValue.setValidators(Validators.max(366));
      }
    }

    this.setLookup();

    this.subscriber = this.ucTemplateSvc.callback.subscribe((ev) => {
      if (ev != null && !ev.hasOwnProperty("pageId")) {
        if (ev === "MrVendorTypeCode") {
          const _MrVendorTypeCode = this.parentForm.get(ev).value;
          if (_MrVendorTypeCode) {
            this.MrVendorTypeCode = _MrVendorTypeCode;
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  HoTitle: string = "";
  SetTitleHoInfo() {
    switch (this.MrVendorCategoryCode) {
      case CommonConstant.SUPPLIER_HO:
        this.HoTitle = "Supplier ";
        break;
      case CommonConstant.ASSET_INSCO_HO:
        this.HoTitle = "Insurance HO ";
        break;
    }
  }

  async getData() {
    let ReqGetVendorAndVendorAddr : GenericObj = new GenericObj();
    ReqGetVendorAndVendorAddr.Id = this.VendorId;
    await this.http.post(this.UrlConstantNew.GetVendorAndVendorAddr, ReqGetVendorAndVendorAddr).toPromise().then(
      async (response) => {
        this.result = response;

        this.setLookup();
      }
    );

    await this.http.post(this.UrlConstantNew.GetListVendorAtpmMappingByVendorId, { Id: this.VendorId }).toPromise().then(
      (response: GenericListObj) => {
        this.resultAtpmMapping = response.ReturnObject;

        this.vendorAtpmList = this.resultAtpmMapping;

        const data = {
          "vendorAtpmList": this.vendorAtpmList
        }
    
        this.data.emit(data)
      });
  }

  setLookup() {
    this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupSupplierHolding.json";
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupSupplierHolding.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupSupplierHolding.json";
    this.inputLookupParentObj.addCritInput = new Array();

    var critVendorClass = new CriteriaObj();
    critVendorClass.propName = "MR_VENDOR_CLASS";
    critVendorClass.restriction = AdInsConstant.RestrictionEq;
    critVendorClass.value = "HOLDING";
    this.inputLookupParentObj.addCritInput.push(critVendorClass);

    var critInput = new CriteriaObj();
    critInput.propName = "MR_VENDOR_CATEGORY_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = "SUPPLIER_HOLDING";
    this.inputLookupParentObj.addCritInput.push(critInput);
    this.inputLookupParentObj.title = "Supplier Holding";

    if (this.VendorId > 0) {
      if (this.result.VendorObj.VendorParentId != null) {
        this.inputLookupParentObj.jsonSelect = { VendorName: this.result.VendorParentName };
      }
    }

    this.inputLookupParentObj.isRequired = true;
    this.inputLookupParentObj.isReady = true;
  }

  getLookupParent(event) {
    this.parentForm.patchValue({
      VendorParentId: event.VendorId
    });
  }

  AddAtpmClick()
  {
    const modalAddAtpm = this.modalService.open(SelfCustomVendorAtpmSelectComponent);

    if(this.vendorAtpmList.length > 0)
      modalAddAtpm.componentInstance.listExistingAtpmCode = this.vendorAtpmList.map(a => a.VendorAtpmCode);

    modalAddAtpm.result.then(
      (response) => {
        this.spinner.show();
        
        this.spinner.hide();
        this.toastr.successMessage(response["message"]);
      }
    ).catch(
      (error) => {
        if(error != 0){
          console.log(error);
        }
      }
    );

    modalAddAtpm.componentInstance.emitData.subscribe(($e) => {
      var obj = 
      {
        VendorAtpmId: $e.VendorId,
        VendorAtpmCode: $e.VendorCode,
        VendorAtpmName: $e.VendorName,
        VendorAtpmLegalAddr: $e.LegalAddr
      };

      this.vendorAtpmList.push(obj);

      const data = {
        "vendorAtpmList": this.vendorAtpmList
      }
  
      this.data.emit(data)
    })
  }

  deleteAtpm(item)
  {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION))
    {
      let index = this.vendorAtpmList.map(function(e) { return e.VendorAtpmCode; }).indexOf(item.VendorAtpmCode);
      this.vendorAtpmList.splice(index,1);

      const data = {
        "vendorAtpmList": this.vendorAtpmList
      }
  
      this.data.emit(data)
    }
  }

}
