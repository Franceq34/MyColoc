import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { JwtToken } from '../../shared/models/jwt-token.model';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {

  public subscription: Subscription;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initToken();
    if(!this.subscription){
      //this.subscription = this.initRefresh();
    }
  }

  public initRefresh(){
    // return timer(2000, 15000).pipe(
    //   switchMap( () => {
    //     if (localStorage.getItem('jwt')) {
    //       return this.http.get<string>('api/auth/refresh').pipe(
    //         tap((token: string) => {
    //           this.jwtToken.next({
    //             isAuthenticated: true,
    //             token: token
    //           });
    //           localStorage.setItem('jwt', token);
    //         })
    //       );
    //     } else {
    //       this.subscription.unsubscribe();
    //       return of(null);
    //     }
    //   })
    // ).subscribe( () => {
    // }, err => {
    //   this.jwtToken.next({
    //     isAuthenticated: false,
    //     token: null
    //   });
    //   localStorage.removeItem('jwt');
    //   this.subscription.unsubscribe();
    // });
  }

  private initToken():void {
    const token = localStorage.getItem('jwt');
    if(token){
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(user: User):Observable<User>{
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: {email: string, password: string}):Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials).pipe(
      tap( (token: string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token
        });
        localStorage.setItem('jwt', token);
        //this.subscription = this.initRefresh();
      })
    );
  }

  public logout():void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/auth/signin']);
  }

}
