import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewOthersComponent } from './pefindo-view-others.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewOthersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewOthersRoutingModule { }
