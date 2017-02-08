import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { ROUTE_MAP } from '../app.routes';

@Component({
  selector: 'home',
  providers: [],
  styles: [ require('!raw-loader!sass-loader!./home.component.scss') ],
  template: require('!raw-loader!./home.component.html')
})
export class HomeComponent {
  public loginLink: string = ROUTE_MAP['LOGIN'];
  public signupLink: string = ROUTE_MAP['SIGNUP'];
  public howToPlayLink: string = ROUTE_MAP['HOW_TO_PLAY'];
}

