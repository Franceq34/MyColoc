import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coloc } from '../models/coloc.model';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class ColocService {
  public currentColoc: BehaviorSubject<Coloc> = new BehaviorSubject(null);
  public currentMembersColoc: BehaviorSubject<User[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public getCurrentColoc():Observable<Coloc> {
  
      return this.http.get<Coloc>('api/colocs/current').pipe(
          tap ((coloc: Coloc) =>  {
              this.currentColoc.next(coloc);
          }),
          switchMap( () => {
              return this.currentColoc;
          })
          )
  }

  public getMembersColoc():Observable<User[]> {
  
    return this.http.get<User[]>('api/colocs/members').pipe(
        tap ((user: User[]) =>  {
            this.currentMembersColoc.next(user);
        }),
        switchMap( () => {
            return this.currentMembersColoc;
        })
        )
    }

    public addColoc(coloc: Coloc): Observable<Coloc>{
        return this.http.post<Coloc>('/api/colocs/createColoc', coloc);
    }

}
