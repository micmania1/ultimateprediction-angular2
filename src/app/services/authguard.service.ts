import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.hasLoggedInUser()) {
      return true;
    }

    this.router.navigate(['']);
  }
}
