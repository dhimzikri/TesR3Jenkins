import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewOtherInfoComponent } from './customer-view-other-info.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewOtherInfoComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  CustomerViewOtherInfoRoutingModule { }