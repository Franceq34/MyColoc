import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PossedeColocGuard } from './shared/guards/possede-coloc.guard';


const APP_ROUTE: Route[] = [
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  { path: '',
    canActivate: [AuthGuard],
    component: ContentComponent,
    children:[
      { path: 'profile', loadChildren: 'app/content/profile-manager/profile.module#ProfileModule'},
      { path: 'costs', canActivate: [PossedeColocGuard], loadChildren: 'app/content/cost-manager/cost.module#CostModule'},
      { path: 'tasks', canActivate: [PossedeColocGuard], loadChildren: 'app/content/task-manager/task.module#TaskModule'},
      { path: 'photos', canActivate: [PossedeColocGuard], loadChildren: 'app/content/photo-manager/photo.module#PhotoModule'},
      { path: 'settings', loadChildren: 'app/content/settings/settings.module#SettingsModule'},
      { path: '', redirectTo: '/profile', pathMatch: 'full'},
      { path: '**', redirectTo: '/profile'}
    ]
  }
]

export const AppRouting = RouterModule.forRoot(APP_ROUTE);
