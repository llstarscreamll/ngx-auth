/* tslint:disable:no-unused-variable */
import { reducer, initialState } from './auth.reducer';
import * as authActions from './../actions/auth.actions';
import { TEST_USER } from './../../core/tests/util';
import { AppMessage } from 'app/core/models/appMessage';

describe('Auth reducer', () => {

  it('should handle LOGIN action', () => {
    const actual = reducer(undefined, new authActions.LoginAction({ email: 'foo', password: 'bar' }));

    expect(actual).toEqual({ ...initialState, loading: true });
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const actual = reducer(undefined, new authActions.LoginSuccessAction(TEST_USER));

    const expected = {
      ...initialState,
      loggedIn: true,
      loading: false,
      user: TEST_USER,
    };

    expect(actual).toEqual(expected);
  });

  it('should handle CREATE_ACCOUNT action', () => {
    const actual = reducer(undefined, new authActions.CreateAccountAction({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'john.123',
      agree_terms: true,
    }));

    expect(actual).toEqual({ ...initialState, loading: true });
  });

  it('should handle CREATE_ACCOUNT_SUCCESS action', () => {
    const actual = reducer(undefined, new authActions.CreateAccountSuccessAction(null));

    expect(actual).toEqual({ ...initialState, loading: false });
  });

  it('should handle LOGOUT_SUCCESS action', () => {
    const actual = reducer(undefined, new authActions.LogoutSuccessAction(null));

    expect(actual).toEqual({ ...initialState, loading: false });
  });

  it('should handle SET_MESSAGES action', () => {
    const APIerror: AppMessage = {
      errors: { email: ['error'] },
      message: 'foo',
      status_code: 1,
      date: new Date(),
      exception: null,
      type: 'danger',
    };
    const actual = reducer(undefined, new authActions.SetMessagesAction(APIerror));

    expect(actual.messages).toEqual(APIerror);
    expect(actual.loading).toEqual(false);
  });

});
