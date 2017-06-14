import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './../../../reducers';
import * as authActions from './../../actions/auth.actions';

import { AuthAbstractComponent } from './../auth-abstract.component';

/**
 * RegisterComponent Class.
 *
 * @author Johan Alvarez <llstascreamll@hotmail.com>
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends AuthAbstractComponent implements OnInit, OnDestroy {

  /**
   * Account form.
   */
  public account: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    protected store: Store<fromRoot.State>,
  ) { super(); }

  public ngOnInit() {
    this.triggerStoreSelects();
    this.buildForm();
  }

  /**
   * Build the register form.
   */
  private buildForm() {
    this.account = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      agree_terms: [false, [Validators.requiredTrue]],
    });
  }

  /**
   * Submit the form.
   */
  public submitForm() {
    this.store.dispatch(new authActions.CreateAccountAction(this.account.value));
  }
}
