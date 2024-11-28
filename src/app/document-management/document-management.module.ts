import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharingModule } from "app/shared/sharing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UcpagingModule } from "@adins/ucpaging";
import { DocumentManagementRoutingModule } from "./document-management-routing.module";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { UcSubsectionModule } from "@adins/uc-subsection";
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { CabinetPagingComponent } from './cabinet/cabinet-paging/cabinet-paging.component';
import { CabinetAddEditComponent } from './cabinet/cabinet-add-edit/cabinet-add-edit.component';
import { FilingPagingComponent } from './filing/filing-paging/filing-paging.component';
import { FilingAddEditComponent } from './filing/filing-add-edit/filing-add-edit.component';
import { RackPagingComponent } from './rack/rack-paging/rack-paging.component';
import { RackAddEditComponent } from './rack/rack-add-edit/rack-add-edit.component';
import { ViewCabinetComponent } from './view/cabinet/view-cabinet.component';
import { ViewRackComponent } from './view/rack/view-rack.component';
import { AdInsModule } from "app/components/adins-module/adins.module";

@NgModule({
    imports:[
        AdInsModule,
        DocumentManagementRoutingModule,
        CommonModule,
        SharingModule,
        FormsModule,
        ReactiveFormsModule,
        UcpagingModule,
        UcShowErrorsModule,
        UcSubsectionModule,
        UcgridfooterModule,
        UcviewgenericModule
    ],
    exports: [],
    declarations:[
        CabinetPagingComponent,
        CabinetAddEditComponent,
        FilingPagingComponent,
        FilingAddEditComponent,
        RackPagingComponent,
        RackAddEditComponent,
        ViewCabinetComponent,
        ViewRackComponent
    ],
    //providers:[NGXToastrService]
})

export class DocumentManagementModule{}