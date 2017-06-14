import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './../../reducers';
import * as authActions from './../actions/auth.actions';
import { AppMessage } from 'app/core/models/appMessage';

export abstract class AuthAbstractComponent {

  protected abstract store: Store<fromRoot.State>;

  public loading$: Observable<boolean>;
  public messages$: Observable<AppMessage>;

  public triggerStoreSelects() {
    this.loading$ = this.store.select(fromRoot.getAuthLoading);
    this.messages$ = this.store.select(fromRoot.getAuthMessages);
  }

  public ngOnDestroy() {
    this.store.dispatch(new authActions.SetMessagesAction(null));
  }
}
