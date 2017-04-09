import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public loginLink: string = '/login';
  public signupLink: string = '/signup';
  public howToPlayLink: string = '/how-to-play';
}

