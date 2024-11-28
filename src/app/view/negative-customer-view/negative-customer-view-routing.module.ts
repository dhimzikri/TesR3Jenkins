import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NegativeCustomerViewComponent } from './negative-customer-view.component';
import { SelfCustomNegativeCustomerViewPersonalComponent } from './self-custom-negative-customer-view-personal/self-custom-negative-customer-view-personal.component';
import { SelfCustomNegativeCustomerViewCompanyComponent } from './self-custom-negative-customer-view-personal/self-custom-negative-customer-view-company.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lost',
        component: NegativeCustomerViewComponent,
        data: {
          title: 'Negative Customer View'
        }
      },
      {
        path: 'ViewPersonal',
        component: SelfCustomNegativeCustomerViewPersonalComponent,
        data: {
          title: 'Negative Customer View Personal'
        }
      },
      {
        path: 'ViewCompany',
        component: SelfCustomNegativeCustomerViewCompanyComponent,
        data: {
          title: 'Negative Customer View Company'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegativeCustomerViewRoutingModule { }
