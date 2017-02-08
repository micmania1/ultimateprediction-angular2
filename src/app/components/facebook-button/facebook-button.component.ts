import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'facebook-button',
  styles: [ require('!raw-loader!sass-loader!./facebook-button.component.scss') ],
  template: require('!raw-loader!./facebook-button.component.html')
})
export class FacebookButton {
  @Output() onAttemptLogin: EventEmitter<any> = new EventEmitter<any>();;
  @Input() disableButton: boolean = false;

  doLogin(): void {
    this.onAttemptLogin.emit();
  }
}
