import { Injectable } from '@angular/core';
import { Chore } from '../models/chore.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Accomplished } from '../models/accomplished';

@Injectable()
export class ChoreService {

  constructor(
    private http: HttpClient
  ) {}

  public readChore(id:number):any{
    return this.http.get<any>('/api/chores/get/' + id);
  }

  public readAllChores():Observable<Chore[]> {
    return this.http.get<Chore[]>('/api/chores/getAllChores');
  }

  public getChartData(id:number):Observable<any> {
    return this.http.get<any[]>('/api/chores/getChartData/' + id);
  }
  
  public addChore(chore: Chore): Observable<any>{
    return this.http.post<any>('/api/chores/addChore', chore);
  }

  public checkChore(accomp: Accomplished): Observable<any>{
    return this.http.post<any>('/api/chores/checkChore', accomp);
  }

  public deleteChore(id:number): Observable<any> {
    return this.http.delete<any>('/api/chores/deleteChore/' + id);
  }

  public deleteChoreAccomplished(id:number){
    return this.http.delete<any>('/api/chores/deleteChoreAccomplished/' + id);
  }

}
