import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalFinancialDataComponent } from './customer-view-personal-financial-data.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalFinancialDataComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalFinancialDataRoutingModule { }


