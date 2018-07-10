import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(private http: HttpClient) { }

    public getCurrentUser():Observable<User> {
    
        return this.http.get<User>('api/users/current').pipe(
            tap ((user: User) =>  {
                this.currentUser.next(user);
            }),
            switchMap( () => {
                return this.currentUser;
            })
            )
    }

    public updateCurrentUser(user:User): Observable<any> {
        return this.http.put<any>('/api/users/updateUser', user);
    }
}