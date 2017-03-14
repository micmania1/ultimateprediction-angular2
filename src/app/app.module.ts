import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/*
 * Platform and providers/directives/pipes
 */
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LostPasswordComponent } from './lostpassword';
import { SignupComponent } from './signup';
import { DashboardComponent } from './dashboard';
import { NoContentComponent } from './no-content';

import { FacebookButton } from './facebook-button';
import { TwitterButton } from './twitter-button';
import { NavigationListComponent } from './navigation-list';
import { PositionWidget } from './position-widget';
import { Toolbar } from './toolbar';

import {
  ApiService,
  AuthGuardService,
  AuthService,
  SessionService } from './services';
import { PredictionProgressComponent } from './prediction-progress/prediction-progress.component';
import { NumeralPipe } from './numeral.pipe';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  ApiService,
  AuthGuardService,
  AuthService,
  SessionService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
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
    NumeralPipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
    NgbModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
}

