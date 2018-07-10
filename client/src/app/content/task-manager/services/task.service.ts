import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient
  ) {}

  public addTask(task: Task): Observable<any>{
    return this.http.post<any>('/api/tasks/addTasks', task);
  }

  public readAllTask():Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks/getAllTasks');
  }

  public updateTask(task:Task): Observable<any> {
    return this.http.put<any>('/api/tasks/updateTask', task);
  }

  public deleteTask(id:number): Observable<any> {
    return this.http.delete<any>('/api/tasks/deleteTask/' + id);
  }

}

