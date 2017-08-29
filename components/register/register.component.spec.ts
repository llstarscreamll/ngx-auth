/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';

import { IMPORTS } from './../../../core/tests/util';
import * as authActions from './../../actions/auth.actions';

import { RegisterComponent } from './register.component';
import { VALIDATION_TESTING_COMPONENTS } from 'app/validation/utils/validation-testing-utils';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ...VALIDATION_TESTING_COMPONENTS, RegisterComponent ],
      imports: [IMPORTS]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    const html = fixture.nativeElement;

    // alert component to show errors
    expect(html.querySelector('app-alerts')).toBeTruthy('should have app-alerts cmp');

    // form fields
    expect(html.querySelector('form')).toBeTruthy('should have form');
    expect(html.querySelector('[formControlName=name]')).toBeTruthy('should have name field');
    expect(html.querySelector('[formControlName=email]')).toBeTruthy('should have email field');
    expect(html.querySelector('[formControlName=password]')).toBeTruthy('should have password field');
    expect(html.querySelector('[formControlName=password_confirmation]')).toBeTruthy('should have password_confirmation field');
    expect(html.querySelector('[formControlName=agree_terms]')).toBeTruthy('should have agree_terms field');

    // form button
    expect(html.querySelector('form button[type=submit]')).not.toBeNull('form submit btn');

    // links to another pages
    expect(html.querySelector('a[routerLink="/auth/login"]')).toBeTruthy('link to login');
    expect(html.querySelector('a[routerLink="/front/landing"]')).toBeTruthy('link to landing page');
  });

  it('should init with invalid reactive form and validation errors not shown', () => {
    expect(component.form.valid).toBe(false, 'account reactive form invalid');

    // errors appear on .text-danger and .has-error elements
    expect(fixture.nativeElement.querySelector('.has-error')).toBeFalsy('no .has-errors elements');
    expect(fixture.nativeElement.querySelector('.text-danger')).toBeFalsy('no .text-danger elements');
    expect(fixture.nativeElement.querySelector('form button:disabled')).toBeTruthy('form submit button disabled');
  });

  it('should dispath store action when form is submited', () => {
    expect(component.form.valid).toBe(false, 'account reactive form invalid');
    expect(fixture.nativeElement.querySelector('form button:disabled')).toBeTruthy('form submit button disabled');

    const account = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'john.123',
      password_confirmation: 'john.123',
      agree_terms: true,
    };

    // fill the form
    component.form.patchValue(account);
    component.form.markAsDirty();
    component.form.markAsTouched();

    const store = fixture.debugElement.injector.get(Store);
    spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(component.form.valid).toBe(true, 'form valid after filling');
    expect(fixture.nativeElement.querySelector('form button:disabled')).toBeFalsy('form submit button enabled');

    //submit the form
    fixture.nativeElement.querySelector('form button[type=submit]').click();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new authActions.CreateAccountAction(account));
  });

  it('should remove messages on component destroy hook', () => {
    spyOn(store, 'dispatch');

    component.ngOnDestroy();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new authActions.SetMessagesAction(null));
  });
});
