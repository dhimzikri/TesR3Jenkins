import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewCoyDetailComponent } from './customer-view-coy-detail.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyDetailComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyDetailRoutingModule { }


