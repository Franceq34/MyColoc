import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invitation } from '../models/invitation.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class InvitationService {

  constructor(private http: HttpClient) { }

  public sendInvitation(user: User): Observable<any>{
    return this.http.post<any>('/api/invitations/send', user);
  }

  public readAll(): Observable<Invitation[]>{
    return this.http.get<Invitation[]>('/api/invitations/readAll');
  }

  public deleteInvitations(): Observable<any>{
    return  this.http.delete<any>('/api/invitations/deleteAllCurrent');
  }

  public declineInvitation(idColoc:number): Observable<any>{
    return  this.http.delete<any>('/api/invitations/delete/'+ idColoc);
  }
}
