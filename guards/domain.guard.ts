import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import * as fromRoot from './../../reducers';
import * as authActions from './../actions/auth.actions';
import { AuthService } from './../services/auth.service';
import { environment as ENV } from '../../../environments/environment';
import { DomainService } from 'app/core/services/domain.service';

@Injectable()
export class DomainGuard implements CanActivate {

  public ENV = ENV;

  public constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private domainService: DomainService) { }

  public canActivate(): boolean {
    const host = this.domainService.getDomainData();

    if (!host.subdomain) {
      this.store.dispatch(go(['/auth/sign-in']));
    }

    return !host.subdomain ? false : true;
  }

}
