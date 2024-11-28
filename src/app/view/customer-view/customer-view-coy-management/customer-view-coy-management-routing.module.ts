import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCoyManagementComponent } from './customer-view-coy-management.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyManagementComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  CustomerViewCoyManagementRoutingModule { }


