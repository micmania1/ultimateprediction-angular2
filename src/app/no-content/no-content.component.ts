import { Component } from '@angular/core';

import { ROUTE_MAP } from '../app.routes';

@Component({
  selector: 'no-content',
  styles: [ require('!raw-loader!sass-loader!./no-content.component.scss') ],
  template: require('!raw-loader!./no-content.component.html')
})
export class NoContentComponent {
  pageTitle: string = 'Not Found';
  homeLink: string = ROUTE_MAP['HOME'];
}
