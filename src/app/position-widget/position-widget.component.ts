import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StandingsSummary } from '../app.types';
import { NumeralPipe } from '../numeral.pipe';

@Component({
  selector: 'position-widget',
  styles: [ require('!raw-loader!sass-loader!./position-widget.component.scss') ],
  template: `
    <div class="widget"
      [ngClass]="{'widget--blue': style === 'blue', 'widget--pink': style === 'pink'}"
      (click)="navigateTo(standings.url)">
      <div class="widget__pos">
        <span>{{ standings.pos | numeral: "Oo" }}</span>
        <span class="of">out of {{ standings.of | numeral: "0,0" }}</span>
      </div>
      <div class="widget__title">
        <span>{{ standings.title }}</span>
      </div>
    </div>
  `
})
export class PositionWidget {
  @Input() style: string = '';
  @Input() standings: StandingsSummary;

  constructor(private router: Router) { }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
