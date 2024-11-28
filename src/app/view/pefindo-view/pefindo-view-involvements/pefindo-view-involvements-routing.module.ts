import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewInvolvementsComponent } from './pefindo-view-involvements.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewInvolvementsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewInvolvementsRoutingModule { }
