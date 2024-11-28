import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewCoyOtherComponent } from './customer-view-coy-other.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyOtherComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyOtherRoutingModule { }


