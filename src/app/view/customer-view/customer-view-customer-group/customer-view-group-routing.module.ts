import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewCustomerGroupComponent } from './customer-view-customer-group.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCustomerGroupComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewGroupRoutingModule { }


