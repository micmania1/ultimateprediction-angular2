import { Component, Input, OnInit } from '@angular/core';

import { ROUTE_MAP } from '../app.routes';
import { ApiService, AuthService } from '../services';
import { StandingsSummary } from '../app.types';

@Component({
  selector: 'dashboard',
  styles: [ require('!raw-loader!sass-loader!./dashboard.component.scss') ],
  template: require('!raw-loader!./dashboard.component.html')
})
export class DashboardComponent implements OnInit {
  public pageTitle: string = 'Dashboard';
  public predictionsLink: string = ROUTE_MAP['LOGIN'];

  // child component state
  public standings_widget_1: StandingsSummary = null;
  public standings_widget_2: StandingsSummary = null;
  public upcomingMatchesCount: number = 0;
  public upcomingPredictionsCount: number = 0;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.standings_widget_1 = {
      pos: 1,
      of: 567,
      url: ROUTE_MAP['LOGIN'],
      title: '30 days'
    };

    this.standings_widget_2 = {
      pos: 345,
      of: 1489,
      url: ROUTE_MAP['LOGIN'],
      title: 'Season 2016-17'
    };

    this.upcomingMatchesCount = 12;
    this.upcomingPredictionsCount = 6;
  }
}
