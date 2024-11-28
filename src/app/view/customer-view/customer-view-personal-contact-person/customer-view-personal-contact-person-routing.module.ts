import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewPersonalContactPersonComponent } from './customer-view-personal-contact-person.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalContactPersonComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalContactPersonRoutingModule { }


