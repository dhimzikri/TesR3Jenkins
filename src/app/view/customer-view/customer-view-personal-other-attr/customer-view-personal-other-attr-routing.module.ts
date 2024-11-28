import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewPersonalOtherAttrComponent } from './customer-view-personal-other-attr.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalOtherAttrComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalOtherRoutingModule { }


