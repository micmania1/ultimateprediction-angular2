import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'twitter-button',
  styles: [ require('!raw-loader!sass-loader!./twitter-button.component.scss') ],
  template: require('!raw-loader!./twitter-button.component.html')
})
export class TwitterButton {
  @Output() onAttemptLogin: EventEmitter<any> = new EventEmitter<any>();;
  @Input() disableButton: boolean = false;

  doLogin(): void {
    this.onAttemptLogin.emit();
  }
}
