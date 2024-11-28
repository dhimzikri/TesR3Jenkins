import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCbasSlikComponent } from './customer-view-cbas-slik.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCbasSlikComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCbasSlikRoutingModule { }


