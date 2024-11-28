import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewContractsComponent } from './pefindo-view-contracts.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewContractsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewContractsRoutingModule { }
