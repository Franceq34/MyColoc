import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostManagerComponent } from './cost-manager.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CostManagerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class CostRoutingModule { }
