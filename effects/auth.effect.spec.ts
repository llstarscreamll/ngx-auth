/* tslint:disable:no-unused-variable */
import { fakeAsync, TestBed, getTestBed, async, inject, tick } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as routerActions from '@ngrx/router-store/src/actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { AuthRoutingModule } from './../auth-routing.module';
import { AuthUser } from './../models/authUser';
import { AuthEffects } from './auth.effects';
import { AuthService } from './../services/auth.service';
import { LocalStorageService } from './../../core/services/local-storage.service';
import * as actions from './../actions/auth.actions';
import { TEST_USER, ACCESS_TOKEN } from './../../core/tests/util';


describe('AuthEffects', () => {
  let testbed: TestBed;
  let authService: AuthService;
  let localStorageService: LocalStorageService;
  let runner: EffectsRunner;
  let authEffects: AuthEffects;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EffectsTestingModule, HttpModule],
      providers: [
        AuthEffects,
        AuthService,
        LocalStorageService
      ]
    });

    testbed = getTestBed();
    authService = testbed.get(AuthService);
    localStorageService = testbed.get(LocalStorageService);
    runner = testbed.get(EffectsRunner);
    authEffects = testbed.get(AuthEffects);
  }));

  it('should return LOGIN_SUCCESS action on LOGIN success', () => {
    spyOn(authService, 'login').and.returnValue(Observable.of(ACCESS_TOKEN));
    spyOn(authService, 'getUser').and.returnValue(Observable.of(TEST_USER));
    spyOn(localStorageService, 'setToken');

    runner.queue(new actions.LoginAction({ email: 'admin@admin.com', password: '123456' }));

    authEffects.logIn$.subscribe(result => {
      expect(authService.login).toHaveBeenCalled();
      expect(authService.getUser).toHaveBeenCalled();
      expect(localStorageService.setToken).toHaveBeenCalled();

      expect(result.type).toEqual(actions.LOGIN_SUCCESS);
    });
  });

  it('should return SET_MESSAGE action on LOGIN error 401', () => {
    spyOn(localStorageService, 'clear');
    spyOn(authService, 'login').and.returnValue(Observable.throw({ message: 'Credentials incorrect!!' }));

    runner.queue(new actions.LoginAction({ email: 'foo', password: 'bar' }));

    authEffects.logIn$.subscribe(result => {
      expect(localStorageService.clear).toHaveBeenCalled();
      expect(authService.login).toHaveBeenCalled();

      expect(result.type).toEqual(actions.SET_MESSAGES);
    });
  });

  it('should return LOGIN_SUCCESS action if exist valid access token on storage', () => {
    // if we can get the user data, then valid access token where found
    spyOn(authService, 'getUser').and.returnValue(Observable.from([TEST_USER]));

    runner.queue(new actions.LoginFromLocalStorageAction(null));

    authEffects.loginFromLocalStorage$.subscribe(result => {
      expect(authService.getUser).toHaveBeenCalled();
      expect(authService.loginFromLocalStorage).toBe(true);

      expect(result.type).toEqual(actions.LOGIN_SUCCESS);
    });
  });

  it('should redirects on LOGIN_SUCCESS action', () => {
    spyOn(localStorageService, 'setUser').and.returnValue(null);

    runner.queue(new actions.LoginSuccessAction(TEST_USER));

    authEffects.loginSuccess$.subscribe(result => {
      expect(localStorageService.setUser).toHaveBeenCalled();

      // redirects to welcome page
      expect(result.type).toEqual(routerActions.routerActions.GO);
      expect(result.payload.path).toEqual(['/welcome']);
    });
  });

  it('should return LOGOUT_SUCCESS action if not exist access token on storage', () => {
    // bad response, there is no valid token
    spyOn(authService, 'getUser').and.returnValue(Observable.throw({ message: 'No valid access token!!' }));
    spyOn(localStorageService, 'clear');

    runner.queue(new actions.LoginFromLocalStorageAction(null));

    authEffects.loginFromLocalStorage$.subscribe(result => {
      expect(authService.getUser).toHaveBeenCalled();
      expect(localStorageService.clear).toHaveBeenCalled();

      expect(result.type).toEqual(actions.LOGOUT_SUCCESS);
    });
  });

  it('should return LOGOUT_SUCCESS action', () => {
    spyOn(authService, 'logout').and.returnValue(Observable.of({ message: 'Logout Success!!' }));

    runner.queue(new actions.LogoutAction(null));

    authEffects.logout$.subscribe(result => {
      expect(authService.logout).toHaveBeenCalled();

      expect(result.type).toEqual(actions.LOGOUT_SUCCESS);
    });
  });

  it('should redirect on LOGOUT_SUCCESS action', () => {
    spyOn(localStorageService, 'clear');

    runner.queue(new actions.LogoutSuccessAction(true));

    authEffects.logoutSuccess$.subscribe(result => {
      expect(localStorageService.clear).toHaveBeenCalled();

      // redirects to login page
      expect(result.type).toEqual(routerActions.routerActions.GO);
      expect(result.payload.path).toEqual(['/auth/login']);
    });
  });
});
