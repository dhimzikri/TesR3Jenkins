import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalJobDataEmpComponent } from './customer-view-personal-job-data-emp.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataEmpComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataEmpRoutingModule { }


