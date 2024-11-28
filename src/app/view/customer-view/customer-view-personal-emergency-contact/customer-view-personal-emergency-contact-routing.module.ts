import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalEmergencyContactComponent } from './customer-view-personal-emergency-contact.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalEmergencyContactComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalEmergencyContactRoutingModule { }


