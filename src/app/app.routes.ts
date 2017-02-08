import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LostPasswordComponent } from './lostpassword';
import { SignupComponent } from './signup';
import { DashboardComponent } from './dashboard';
import { NoContentComponent } from './no-content';
import { AuthGuardService } from './services';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'lost-password',  component: LostPasswordComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: '**',    component: NoContentComponent },
];

export const ROUTE_MAP: { [key: string]: string } = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOSTPASSWORD: '/lost-password',
  HOW_TO_PLAY: '/how-to-play',
  DASHBOARD: '/dashboard'
}
