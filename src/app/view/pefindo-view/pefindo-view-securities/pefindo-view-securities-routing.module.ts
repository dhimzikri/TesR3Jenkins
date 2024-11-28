import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewSecuritiesComponent } from './pefindo-view-securities.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewSecuritiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewSecuritiesRoutingModule { }
