import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewAsliRiComponent } from './customer-view-asli-ri.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewAsliRiComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewAsliRiRoutingModule { }


