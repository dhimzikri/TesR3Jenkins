import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewRelationsComponent } from './pefindo-view-relations.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewRelationsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewRelationsRoutingModule { }
