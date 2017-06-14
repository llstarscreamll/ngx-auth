import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { go } from '@ngrx/router-store';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import * as authActions from './../actions/auth.actions';

import { Actions, Effect } from '@ngrx/effects';

import { AuthService } from './../services/auth.service';
import { LocalStorageService } from './../.././core/services/local-storage.service';
import { LoginCredentials } from './../models/loginCredentials';
import { AuthUser } from './../models/authUser';
import { Account } from './../models/account';

import { AccessToken } from './../interfaces/accessToken';

@Injectable()
export class AuthEffects {

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  @Effect()
  logIn$: Observable<Action> = this.actions$
    .ofType(authActions.LOGIN)
    .map((action: Action) => action.payload as LoginCredentials)
    .switchMap((credentials: LoginCredentials) => {
      return this.authService.login(credentials.email, credentials.password)
        // set on session storage the access token data
        .do((accessToken: AccessToken) => this.localStorageService.setToken(accessToken))
        // now get the authenticated user info
        .switchMap(() => this.authService.getUser())
        .map((user: AuthUser) => { return new authActions.LoginSuccessAction(user); })
        .catch((error) => {
          error.type = 'danger';
          this.localStorageService.clear();
          return of(new authActions.SetMessagesAction(error));
        })
    });

 @Effect()
  loginFromLocalStorage$: Observable<Action> = this.actions$
    .ofType(authActions.LOGIN_FROM_LOCALSTORAGE)
    .startWith(new authActions.LoginFromLocalStorageAction(null))
    .switchMap(() => {
      return this.authService.getUser()
        .map((user: AuthUser) => {
          this.authService.loginFromLocalStorage = true;
          return new authActions.LoginSuccessAction(user);
        })
        .catch(error => {
          this.localStorageService.clear();
          return empty();
        });
    });

  @Effect()
  loginSuccess$: Observable<Action> = this.actions$
    .ofType(authActions.LOGIN_SUCCESS)
    .map((action) => action.payload as AuthUser)
    .do((user: AuthUser) => this.localStorageService.setUser(user))
    .mergeMap(() => {
      const actions: Action[] = [];

      // redirect user if isn't login from local storage
      if (!this.authService.loginFromLocalStorage) {
        actions.push(go(['/welcome']));
      }

      return actions;
    });

  @Effect()
  createAccount$: Observable<Action> = this.actions$
    .ofType(authActions.CREATE_ACCOUNT)
    .map((action: Action) => action.payload)
    .switchMap((accountData: Account) => {
      return this.authService
        .registerUser(accountData)
        .map(data => new authActions.CreateAccountSuccessAction(data))
        .catch((error) => {
          error.type = 'danger';
          return of(new authActions.SetMessagesAction(error))
        });
    });

  @Effect()
  createAccountSuccess$: Observable<Action> = this.actions$
    .ofType(authActions.CREATE_ACCOUNT_SUCCESS)
    .mergeMap(() => [
      go(['auth', 'login']),
      new authActions.SetMessagesAction({
        date: new Date(),
        errors: {},
        exception: null,
        message: 'Account creation success!! Now login.',
        status_code: 201,
        type: 'success',
      }),
    ]);

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(authActions.LOGOUT)
    .switchMap(() => {
      return this.authService.logout()
        .map(() => new authActions.LogoutSuccessAction(true))
        .catch((error) => of(new authActions.LogoutSuccessAction(true))); // true = redirect the user
    });

  @Effect()
  logoutSuccess$: Observable<Action> = this.actions$
    .ofType(authActions.LOGOUT_SUCCESS)
    .do(() => this.localStorageService.clear())
    .map((action: Action) => action.payload)
    .map((redirect: boolean) => {
      return redirect
        ? go(['/auth/login'])
        : empty();
    });
}
