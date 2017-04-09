import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { NavigationList } from '../app.types';

@Component({
  selector: 'navigation-list',
  styleUrls: [ './navigation-list.component.scss' ],
  templateUrl: './navigation-list.component.html'
})
export class NavigationListComponent {
  @Input() title: string = '';
  @Input() list: Array<NavigationList> = [];

  constructor(private state: AppState, private router: Router) { }

  public navigateTo(url: string) {
    this.state.set('showNavigation', false);
    this.router.navigate([url]);
  }

}
