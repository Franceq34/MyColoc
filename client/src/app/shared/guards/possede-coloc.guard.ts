import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class PossedeColocGuard implements CanActivate {
  constructor(private userService: UserService){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getCurrentUser().pipe( 
      map((user : User) => {
      return user.idColoc !== null
    }));
  }
}
