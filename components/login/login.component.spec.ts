/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login.component';
import { IMPORTS } from './../../../core/tests/util';
import * as authActions from './../../actions/auth.actions';
import * as fromRoot from './../../../reducers';
import { VALIDATION_TESTING_COMPONENTS } from "app/validation/utils/validation-testing-utils";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...VALIDATION_TESTING_COMPONENTS, LoginComponent],
      imports: [
        ...IMPORTS
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    let html = fixture.nativeElement;

    // alert component to show errors
    expect(html.querySelector('app-alerts')).toBeTruthy('should have app-alerts cmp');

    // form fields
    expect(html.querySelector('form')).toBeTruthy('should have form');
    expect(html.querySelector('[formControlName=email]')).toBeTruthy('should have email field');
    expect(html.querySelector('[formControlName=password]')).toBeTruthy('should have password field');
    expect(html.querySelector('form button[type=submit]')).toBeTruthy('should have form submit btn');

    // links to another pages
    expect(html.querySelector('a[routerLink="/auth/register"]')).toBeTruthy('link to register page');
    expect(html.querySelector('a[routerLink="/front/landing"]')).toBeTruthy('link to landing page');
  });

  it('should dispatch store action when submit form login', fakeAsync(() => {
    let credentials = {
      email: 'john@doe.com',
      password: 'john.123'
    };

    fixture.detectChanges();
    tick();

    let html = fixture.nativeElement;

    // fields should be empty and button disabled, the form is invalid
    expect(component.loginForm.valid).toBe(false, 'form is invalid');
    expect(html.querySelector('form button[type=submit]:disabled')).toBeTruthy('form submit btn disabled');

    // fill the form fields
    component.loginForm.patchValue(credentials);
    component.loginForm.markAsDirty();
    component.loginForm.markAsTouched();

    spyOn(store, 'dispatch');

    fixture.detectChanges();
    tick();

    // the form is now valid
    expect(html.querySelector('form button[type=submit]:disabled')).toBeFalsy('form submit btn enabled');
    expect(component.loginForm.valid).toBe(true, 'the form is now valid');
    
    html.querySelector('form button[type=submit]').click();

    fixture.detectChanges();
    tick();

    expect(store.dispatch).toHaveBeenCalledWith(new authActions.LoginAction(credentials));
  }));

  it('should remove messages on component destroy hook', () => {
    spyOn(store, 'dispatch');

    component.ngOnDestroy();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new authActions.SetMessagesAction(null));
  });
});
