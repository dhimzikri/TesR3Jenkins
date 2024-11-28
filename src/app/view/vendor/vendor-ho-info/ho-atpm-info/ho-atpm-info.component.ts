import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { VendorAtpmMappingObj } from 'app/shared/model/vendor-atpm-mapping-obj.model';

@Component({
    selector: 'app-ho-atpm-info',
    templateUrl: './ho-atpm-info.component.html',
})
export class HoAtpmInfoComponent implements OnInit {

    @Input() VendorId: number = 0;
    vendorAtpmList: Array<VendorAtpmMappingObj> = new Array();
    constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    }
    ngOnInit() {
        this.http.post(this.UrlConstantNew.GetListVendorAtpmMappingByVendorId, { Id: this.VendorId }).subscribe(
            (response: GenericListObj) => {
                this.vendorAtpmList = response.ReturnObject;
            });
    }

}
