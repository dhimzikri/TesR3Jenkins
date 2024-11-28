import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomNegativeCustomerViewComponent } from './custom-negative-customer-view.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CustomNegativeCustomerViewComponent,
        data: {
          title: 'Negative Customer View'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomNegativeCustomerViewRoutingModule { }
