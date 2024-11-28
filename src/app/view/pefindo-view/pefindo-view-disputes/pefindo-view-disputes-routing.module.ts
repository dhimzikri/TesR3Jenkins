import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewDisputesComponent } from './pefindo-view-disputes.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewDisputesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewDisputesRoutingModule { }
