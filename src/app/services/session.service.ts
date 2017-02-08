import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SessionService {

  get(prop) {
    let value = window.localStorage.getItem(prop);
    if(value) {
      value = JSON.parse(value);
    }
    return value;
  }

  set(prop, value) {
    window.localStorage.setItem(prop, JSON.stringify(value));
  }

  public remove(prop) {
    window.localStorage.removeItem(prop);
  }

  public clear() {
    window.localStorage.clear();
  }

}
