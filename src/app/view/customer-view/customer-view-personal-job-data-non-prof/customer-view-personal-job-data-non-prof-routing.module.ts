import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalJobDataNonProfComponent } from './customer-view-personal-job-data-non-prof.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataNonProfComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataNonProfRoutingModule { }


