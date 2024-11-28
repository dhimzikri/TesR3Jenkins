import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalDetailComponent } from './customer-view-personal-detail.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalDetailRoutingModule { }


