import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/services/auth.service';
import { map } from 'rxjs/operators';
import { JwtToken } from '../models/jwt-token.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
  private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.jwtToken.pipe(
      map((jwtToken: JwtToken)=>{
        if (jwtToken.isAuthenticated) {
          return jwtToken.isAuthenticated;        
        } else {
          this.router.navigateByUrl("/auth/signin");
        }
      })
    );
  }
}