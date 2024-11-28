import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewTrustingSocialComponent } from './customer-view-trusting-social.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewTrustingSocialComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewTrustingSocialRoutingModule { }


