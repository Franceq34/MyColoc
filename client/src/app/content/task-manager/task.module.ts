import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskService } from './services/task.service';
import { SortArchivedPipe } from './pipes/sort-archived.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskUnrepeatableComponent } from './task-unrepeatable/task-unrepeatable.component';
import { TaskRepeatableComponent } from './task-repeatable/task-repeatable.component';
import { ChoreService } from './services/chore.service';
import { PastDaysPipe } from './pipes/past-days.pipe';
import { TaskRepeatableDetailsComponent } from './task-repeatable/task-repeatable-details/task-repeatable-details.component';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
      TaskManagerComponent,
      SortArchivedPipe,
      PastDaysPipe,
      TaskUnrepeatableComponent,
      TaskRepeatableComponent,
      TaskRepeatableDetailsComponent
    ],
  providers:[
    TaskService,
    ChoreService
  ],
  exports: [
  ]
})
export class TaskModule { }
