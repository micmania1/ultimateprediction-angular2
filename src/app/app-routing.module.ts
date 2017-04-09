import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LostPasswordComponent } from './lostpassword';
import { SignupComponent } from './signup';
import { DashboardComponent } from './dashboard';
import { PredictionPageComponent } from './prediction-page';
import { NoContentComponent } from './no-content';
import { AuthGuardService } from './services';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'lost-password',  component: LostPasswordComponent },
  { path: 'signup',  component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'predictions',
    component: PredictionPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: ':competition',
        component: PredictionPageComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  { path: '**',    component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
