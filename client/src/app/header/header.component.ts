import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { JwtToken } from '../shared/models/jwt-token.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public jwtToken: JwtToken;
  public subscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.jwtToken.subscribe( (jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public logout(): void {
    this.authService.logout();
  }

}
