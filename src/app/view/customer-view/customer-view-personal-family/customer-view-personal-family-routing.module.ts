import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalFamilyComponent } from './customer-view-personal-family.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalFamilyComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalFamilyRoutingModule { }


