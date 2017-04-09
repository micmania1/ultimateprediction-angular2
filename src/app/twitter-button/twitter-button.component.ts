import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'twitter-button',
  styleUrls: [ './twitter-button.component.scss' ],
  templateUrl: './twitter-button.component.html'
})
export class TwitterButton {
  @Output() onAttemptLogin: EventEmitter<any> = new EventEmitter<any>();;
  @Input() disableButton: boolean = false;

  doLogin(): void {
    this.onAttemptLogin.emit();
  }
}
