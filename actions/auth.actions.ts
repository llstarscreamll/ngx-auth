import { Action } from '@ngrx/store';

import { AuthUser } from './../models/authUser';
import { Account } from './../models/account';
import { LoginCredentials } from './../models/loginCredentials';
import { AppMessage } from 'app/core/models/appMessage';

export const LOGIN = '[Auth] Login';
export const LOGIN_FROM_LOCALSTORAGE = '[Auth] Login From LocalStorage';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const CREATE_ACCOUNT = '[Auth] Create Account';
export const CREATE_ACCOUNT_SUCCESS = '[Auth] Create Account Success';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const SET_MESSAGES = '[Auth] Set Messages';

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: LoginCredentials) { }
}

export class LoginFromLocalStorageAction implements Action {
  readonly type = LOGIN_FROM_LOCALSTORAGE;
  constructor(public payload: null = null) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AuthUser) { }
}

export class CreateAccountAction implements Action {
  readonly type = CREATE_ACCOUNT;
  constructor(public payload: Account) { }
}

export class CreateAccountSuccessAction implements Action {
  readonly type = CREATE_ACCOUNT_SUCCESS;
  constructor(public payload: AuthUser) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
  constructor(public payload: AuthUser = null) { }
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public payload: boolean) { }
}

export class SetMessagesAction implements Action {
  readonly type = SET_MESSAGES;
  constructor(public payload: AppMessage = null) { }
}

export type Actions
  = LoginAction
  | LoginFromLocalStorageAction
  | LoginSuccessAction
  | CreateAccountAction
  | CreateAccountSuccessAction
  | LogoutAction
  | LogoutSuccessAction
  | SetMessagesAction;
