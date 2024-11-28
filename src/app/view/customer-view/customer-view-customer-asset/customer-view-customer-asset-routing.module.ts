import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCustomerAssetComponent } from './customer-view-customer-asset.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerViewCustomerAssetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerViewCustomerAssetRoutingModule { }
