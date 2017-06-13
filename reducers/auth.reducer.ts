import * as authActions from '../actions/auth.actions';

import { AuthUser } from './../models/authUser';
import { AppMessage } from "app/core/models/appMessage";

export interface State {
  user: AuthUser | null;
  loggedIn: boolean;
  loading: boolean;
  messages: AppMessage;
}

export const initialState: State = {
  loggedIn: false,
  loading: false,
  user: null,
  messages: null,
};

export function reducer(state = initialState, action: authActions.Actions): State {
  switch (action.type) {

    case authActions.LOGIN: {
      return { ...state, loading: true, };
    }

    case authActions.LOGIN_SUCCESS: {
      let user = action.payload as AuthUser;
      return { ...state, loggedIn: true, loading: false, user: user, }
    };

    case authActions.CREATE_ACCOUNT: {
      return { ...state, loading: true };
    }

    case authActions.CREATE_ACCOUNT_SUCCESS: {
      return { ...state, loading: false };
    }

    case authActions.LOGOUT_SUCCESS: {
      return { ...state, loggedIn: false, loading: false, user: null, };
    }

    case authActions.SET_MESSAGES: {
      let msg = action.payload as AppMessage;

      // if messages already exists and you want to clean that messages,
      // exists messages must have been shown at least for 2 seconds
      // before they can be removed
      if (state.messages && state.messages.date && !msg) {
        let endTime = new Date().getTime();
        let startTime = state.messages.date.getTime();

        // at least 2 seconds must have happened to set the messages no null
        msg = ((endTime - startTime) / 1000 > 2) ? msg : state.messages;
      }

      return { ...state, messages: msg, loading: false };
    }

    default: {
      return state;
    };

  }
}

export const user = (state: State) => state.user;
export const loading = (state: State) => state.loading;
export const messages = (state: State) => state.messages;
export const isLoggedIn = (state: State) => state.loggedIn;
