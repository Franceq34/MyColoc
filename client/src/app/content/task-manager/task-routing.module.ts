import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskManagerComponent } from './task-manager.component';
import { TaskUnrepeatableComponent } from './task-unrepeatable/task-unrepeatable.component';
import { TaskRepeatableComponent } from './task-repeatable/task-repeatable.component';
import { TaskRepeatableDetailsComponent } from './task-repeatable/task-repeatable-details/task-repeatable-details.component';

const ROUTES: Routes = [
  
  { path: '',
    component: TaskManagerComponent,
    children:[
      {path: 'unrepeatable', component: TaskUnrepeatableComponent},
      {path: 'repeatable', component: TaskRepeatableComponent},
      {path: 'repeatable/:id', component: TaskRepeatableDetailsComponent},
      {path: '', redirectTo: 'unrepeatable', pathMatch: 'full'},
      {path: '**', redirectTo: 'unrepeatable'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
