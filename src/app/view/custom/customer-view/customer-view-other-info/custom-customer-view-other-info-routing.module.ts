import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomCustomerViewOtherInfoComponent } from './custom-customer-view-other-info.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CustomCustomerViewOtherInfoComponent,
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
export class CustomCustomerViewOtherInfoRoutingModule { }
