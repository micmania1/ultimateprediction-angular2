import { Component, Input, Output } from '@angular/core';

import { AppState} from '../app.service';
import { AuthService } from '../services';

@Component({
  selector: 'toolbar',
  styleUrls: [ './toolbar.component.scss' ],
  templateUrl: './toolbar.component.html'
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

  constructor(private state: AppState, private auth: AuthService) {}

  public closeMenu() {
    this.state.set('showNavigation', false);
  }

  public showCompetitionsMenu() {
    this.state.set('navigationTitle', 'Competitions');
    this.state.set('navigationOptions', [
      { url: '/dashboard', text: 'Competition A' },
      { url: '/dashboard', text: 'Competition B' },
      { url: '/dashboard', text: 'Competition C' },
      { url: '/dashboard', text: 'Your leagues', style: 'alternate' },
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
}
