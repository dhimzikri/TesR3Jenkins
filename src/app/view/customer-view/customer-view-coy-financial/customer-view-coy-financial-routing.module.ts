import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCoyFinancialComponent } from './customer-view-coy-financial.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyFinancialComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyFinancialRoutingModule { }


