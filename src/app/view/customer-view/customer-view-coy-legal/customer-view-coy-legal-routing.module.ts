import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCoyLegalComponent } from './customer-view-coy-legal.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyLegalComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyLegalRoutingModule { }


