import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCoyContactComponent } from './customer-view-coy-contact.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyContactComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyContactRoutingModule { }


