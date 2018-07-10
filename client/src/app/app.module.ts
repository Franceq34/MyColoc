import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { NavLinksComponent } from './content/nav-links/nav-links.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { PossedeColocGuard } from './shared/guards/possede-coloc.guard';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { UserService } from './shared/services/user.service';
import { ColocService } from './shared/services/coloc.service';
import { OwnColocDirective } from './content/nav-links/directives/own-coloc.directive';
import { InvitationService } from './shared/services/invitation.service';
import { ThemeService } from './shared/services/theme.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    NavLinksComponent,
    FooterComponent,
    OwnColocDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    PossedeColocGuard,
    UserService,
    ColocService,
    InvitationService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public authService: AuthService,
  ){}
}
