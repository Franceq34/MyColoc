import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'sortArchived'
})
export class SortArchivedPipe implements PipeTransform {

  transform(allTasks: Task[]): Task[] {
    if (allTasks == null) {
      return [];
    }
    return allTasks.sort(this.compare);
  }

  compare(a:Task, b:Task):number {
  if (a.isArchivedTask < b.isArchivedTask)
    return -1;
  if (a.isArchivedTask > b.isArchivedTask)
    return 1;
  if (a.dateTask < b.dateTask)
    return 1;
  else
    return -1;
  }

}
