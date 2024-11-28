import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CabinetPagingComponent } from "./cabinet/cabinet-paging/cabinet-paging.component";
import { CabinetAddEditComponent } from "./cabinet/cabinet-add-edit/cabinet-add-edit.component";
import { RackPagingComponent } from "./rack/rack-paging/rack-paging.component";
import { RackAddEditComponent } from "./rack/rack-add-edit/rack-add-edit.component";
import { FilingPagingComponent } from "./filing/filing-paging/filing-paging.component";
import { FilingAddEditComponent } from "./filing/filing-add-edit/filing-add-edit.component";
import { ViewCabinetComponent } from "./view/cabinet/view-cabinet.component";
import { ViewRackComponent } from "./view/rack/view-rack.component";
import { PathConstant } from "app/shared/PathConstant";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: PathConstant.CABINET_PAGING,
                component: CabinetPagingComponent,
                data: {
                    title: 'CABINET'
                }
            },
            {
                path: PathConstant.CABINET_ADD_EDIT,
                component: CabinetAddEditComponent,
                data: {
                    title: 'CABINET'
                }
            },
            {
                path: PathConstant.RACK_PAGING,
                component: RackPagingComponent,
                data: {
                    title: 'RACK'
                }
            },
            {
                path: PathConstant.RACK_ADD_EDIT,
                component: RackAddEditComponent,
                data: {
                    title: 'RACK'
                }
            },
            {
                path: PathConstant.FILING_PAGING,
                component: FilingPagingComponent,
                data: {
                    title: 'FILING'
                }
            },
            {
                path: PathConstant.FILING_ADD_EDIT,
                component: FilingAddEditComponent,
                data: {
                    title: 'FILING'
                }
            },
            {
                path: PathConstant.VIEW_CABINET,
                component: ViewCabinetComponent,
                data: {
                    title: 'View Cabinet'
                }
            },
            {
                path: PathConstant.VIEW_RACK,
                component: ViewRackComponent,
                data: {
                    title: 'View Rack'
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DocumentManagementRoutingModule{}