import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import { AuthService } from './../services/auth.service';
import * as fromRoot from './../../reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>) { }

  canActivate(): boolean {
    const loggedIn = this.authService.loggedIn();

    if (!loggedIn) {
      // TODO: flash message informing that "User must be logged in"
      this.store.dispatch(go(['/auth/login']));
    }

    return loggedIn;
  }

}
