import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewPersonalAppListingComponent } from './customer-view-personal-app-listing.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalAppListingComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalAppListingRoutingModule { }


