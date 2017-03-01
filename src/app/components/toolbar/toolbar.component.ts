import { Component, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

import { AppState} from '../../app.service';
import { AuthService } from '../../services';
import { ROUTE_MAP } from '../../app.routes';

@Component({
  selector: 'toolbar',
  styles: [ require('!raw-loader!sass-loader!./toolbar.component.scss') ],
  template: require('!raw-loader!./toolbar.component.html')
})
export class Toolbar {
  @Input() verticalAlign: string = 'top';
  @Input() title: string = '';

  // Type of menu to show in the top left/right
  @Input() leftMenu: string = '';
  @Input() rightMenu: string = '';

  // If no type is set we fallback to links
  @Input() leftNavLink: string = '';
  @Input() rightNavLink: string = '';

  constructor(
    private state: AppState,
    private auth: AuthService,
    private location: Location
  ) {}

  public closeMenu() {
    this.state.set('showNavigation', false);
  }

  public showCompetitionsMenu() {
    this.state.set('navigationTitle', 'Competitions');
    this.state.set('navigationOptions', [
      { url: ROUTE_MAP['DASHBOARD'], text: 'Competition A' },
      { url: ROUTE_MAP['DASHBOARD'], text: 'Competition B' },
      { url: ROUTE_MAP['DASHBOARD'], text: 'Competition C' },
      { url: ROUTE_MAP['LOGIN'], text: 'Your leagues', style: 'alternate' },
    ]);
    this.state.set('showNavigation', true);
  }

  public showUserMenu() {
    if(this.auth.hasLoggedInUser()) {
      this.state.set('navigationTitle', this.auth.currentUser.displayName);
      this.state.set('navigationOptions', [
      ]);
      this.state.set('showNavigation', true);
    }
  }

  public navigateBack() {
    this.location.back();
  }
}
