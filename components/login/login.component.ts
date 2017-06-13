import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';

import * as authActions from './../../actions/auth.actions';
import * as fromRoot from './../../../reducers';
import { AuthUser } from './../../models/authUser';

import { AuthAbstractComponent } from './../auth-abstract.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends AuthAbstractComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;

  public constructor(
    protected formBuilder: FormBuilder,
    protected store: Store<fromRoot.State>
  ) { super(); }

  public ngOnInit() {
    this.buildForm();
    this.triggerStoreSelects();
  }

  /**
   * Builds the login form.
   */
  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Submit the login form.
   */
  public onSubmit() {
    this.store.dispatch(new authActions.LoginAction(this.loginForm.value));
  }
}
