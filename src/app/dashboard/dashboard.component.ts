import { Component, Input, OnInit } from '@angular/core';

import { ApiService, AuthService } from '../services';
import { StandingsSummary } from '../app.types';

@Component({
  selector: 'dashboard',
  styleUrls: [ './dashboard.component.scss' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public pageTitle: string = 'Dashboard';
  public predictionsLink: string = '/login';

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
      url: '/login',
      title: '30 days'
    };

    this.standings_widget_2 = {
      pos: 345,
      of: 1489,
      url: '/login',
      title: 'Season 2016-17'
    };

    this.upcomingMatchesCount = 12;
    this.upcomingPredictionsCount = 6;
  }
}
