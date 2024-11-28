import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardComponent } from 'app/dashboard/dash-board/dash-board.component';
import { PathConstant } from 'app/shared/PathConstant';
import { DashEmptyComponent } from './dash-empty/dash-empty.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.DASHBOARD,
        component: DashBoardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: PathConstant.DASHEMPTY,
        component: DashEmptyComponent,
        data: {
          title: 'Dashboard Empty'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
