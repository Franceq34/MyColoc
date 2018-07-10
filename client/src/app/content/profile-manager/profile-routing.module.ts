import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileManagerComponent } from './profile-manager.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProfileManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
 