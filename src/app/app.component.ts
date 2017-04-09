import { Component } from '@angular/core';

import { AppState } from './app.service';
import { NavigationList } from './app.types';

@Component({
  selector: 'app',
  styleUrls: [ './app.component.scss' ],
  template: `

    <div class="container" [hidden]="!showNavigation">
      <navigation-list [title]="navigationTitle" [list]="navigationOptions"></navigation-list>
    </div>

    <div class="container" [hidden]="showNavigation">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  public logo = 'assets/img/angularclass-avatar.png';
  public name = 'UltimatePrediction.com';
  public url = 'https://www.ultimateprediction.com';

  constructor(private state: AppState) {
  }

  get showNavigation(): boolean {
    return this.state.get('showNavigation') === true || false;
  }

  get navigationTitle(): string {
    return this.state.get('navigationTitle') || '';
  }

  get navigationOptions(): Array<NavigationList> {
    return this.state.get('navigationOptions') || [];
  }

}
