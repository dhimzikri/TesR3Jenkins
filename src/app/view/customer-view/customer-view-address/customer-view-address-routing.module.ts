import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewAddressComponent } from './customer-view-address.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewAddressComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewAddressRoutingModule { }


