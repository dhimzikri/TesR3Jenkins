import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PefindoViewComponent } from './pefindo-view.component';

const routes: Routes = [
  {
    path: '',
    component: PefindoViewComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pefindo-view-child.module').then(m => m.PefindoViewChildModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewRoutingModule { }
