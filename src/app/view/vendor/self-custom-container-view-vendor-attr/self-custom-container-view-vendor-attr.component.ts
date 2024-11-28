import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/request/ref-attr/req-ref-attr-by-attr-group-obj.model';

@Component({
  selector: 'app-self-custom-container-view-vendor-attr',
  templateUrl: './self-custom-container-view-vendor-attr.component.html'
})
export class SelfCustomContainerViewVendorAttrComponent implements OnInit {

  @Input() VendorId: number = 0;
  @Input() MrVendorCategoryCode: string;
  IsReady: boolean = false;
  ListVendorAttrContent: any;
  VendorAttrList: any;

  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit(): void {
    let mrVendorCategoryCodes = ['SUPPLIER', 'ASSET_INSCO_BRANCH'];
    if (!mrVendorCategoryCodes.includes(this.MrVendorCategoryCode)) return;
    this.http.post(this.UrlConstantNew.GetListActiveAttrVendorAttrContentByVendorId, { Id: this.VendorId ,Code:this.MrVendorCategoryCode}).subscribe(
      (response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj];
        if (this.ListVendorAttrContent != null) {
          let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
          reqByAttrGroup.AttrGroup = this.MrVendorCategoryCode;
          this.http.post(this.UrlConstantNew.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe( 
            (res) => {
              this.VendorAttrList = res[CommonConstant.ReturnObj];
              if (this.VendorAttrList == null) return;
              this.VendorAttrList.forEach((x, index) => {
                if(!this.ListVendorAttrContent.find(({AttrCode}) => AttrCode == x.AttrCode)){
                  this.ListVendorAttrContent.splice(index,0,{'AttrContent':''});
                }
              });
              this.IsReady = true;
            });
        }
      }
    )
  }
}