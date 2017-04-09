import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { User } from '../model';

@Injectable()
export class AuthService {

  private _currentUser: User;

  constructor(private session: SessionService) {
    this.refresh();
  }

  get currentUser(): User {
    return this._currentUser;
  }

  set currentUser(user: User) {
    this._currentUser = user;
  }

  public hasLoggedInUser(): boolean {
    return validUser(this._currentUser);
  }

  public clearSession(): void {
    this.session.set('user', null);
    this.refresh();
  }

  public refresh(): void {
    const user = new User();
    const data = this.session.get('user');

    if(data) {
      user.id = data['id'] || 0;
      user.displayName = data['displayName'] || null;
    }

    if(validUser(user)) {
      this.currentUser = user;
    }
  }
}

const validUser = (user: User): boolean => {
  return user instanceof User && user.id > 0;
}
