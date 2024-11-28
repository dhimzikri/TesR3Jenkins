import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalJobDataSmeComponent } from './customer-view-personal-job-data-sme.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataSmeComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataSmeRoutingModule { }


