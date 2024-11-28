import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./customer-view-child.module').then(m => m.CustomerViewChildModule)
            }
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewRoutingModule { }


