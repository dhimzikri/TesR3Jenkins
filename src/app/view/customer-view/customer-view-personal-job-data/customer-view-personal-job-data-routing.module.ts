import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewPersonalJobDataComponent } from './customer-view-personal-job-data.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataRoutingModule { }


