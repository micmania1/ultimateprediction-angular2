import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'facebook-button',
  styleUrls: [ './facebook-button.component.scss' ],
  templateUrl: './facebook-button.component.html'
})
export class FacebookButton {
  @Output() onAttemptLogin: EventEmitter<any> = new EventEmitter<any>();;
  @Input() disableButton: boolean = false;

  doLogin(): void {
    this.onAttemptLogin.emit();
  }
}
