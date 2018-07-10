import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoManagerComponent } from './photo-manager.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PhotoManagerComponent
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
export class PhotoRoutingModule { }
