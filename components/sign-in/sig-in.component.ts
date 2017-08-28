import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as authActions from './../../actions/auth.actions';
import * as fromRoot from './../../../reducers';
import { AuthAbstractComponent } from 'app/auth/components/auth-abstract.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sig-in.component.html',
  styles: [`
    #subdomain {
      display:inline-block;
      width:50%;
      text-align: right;
    }

    #subdomain-label {
      width:48%;
    }
  `]
})
export class SignInComponent extends AuthAbstractComponent implements OnInit {

  public form: FormGroup;

  public constructor(
    protected fb: FormBuilder,
    protected store: Store<fromRoot.State>
  ) {
    super();
  }

  public ngOnInit() {
    this.triggerStoreSelects();

    this.form = this.fb.group({
      subdomain: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.store.dispatch(new authActions.CheckIfSubdoaminExistsAction(this.form.get('subdomain').value));
  }

}
