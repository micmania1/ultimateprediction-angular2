import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LostPasswordComponent } from './lostpassword';
import { SignupComponent } from './signup';
import { DashboardComponent } from './dashboard';
import { NoContentComponent } from './no-content';
import { PredictionPageComponent } from './prediction-page/prediction-page.component';

import { FacebookButton } from './facebook-button';
import { TwitterButton } from './twitter-button';
import { NavigationListComponent } from './navigation-list';
import { PositionWidget } from './position-widget';
import { Toolbar } from './toolbar';
import { PredictionProgressComponent } from './prediction-progress/prediction-progress.component';
import { NumeralPipe } from './numeral.pipe';

import {
  ApiService,
  AuthService,
  AuthGuardService,
  SessionService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LostPasswordComponent,
    SignupComponent,
    DashboardComponent,
    NoContentComponent,
    Toolbar,
    NavigationListComponent,
    FacebookButton,
    TwitterButton,
    PositionWidget,
    PredictionProgressComponent,
    NumeralPipe,
    PredictionPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    AppState,
    ApiService,
    SessionService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private appState: AppState) {}
}
