import { replace } from 'connected-react-router';
import pathToRegexp from 'path-to-regexp';
import * as currentUserActions from '../actions/currentUser/user';
import { routes } from '../configuration';
import { storage } from '../constants';
import * as user from '../helpers/user';
import * as authenticationTypes from '../types/authentication';
import * as currentUserTypes from '../types/currentUser';
import * as routerTypes from '../types/router';

const anonymousRoutes = [
  routes.login,
  routes.register,
  routes.verifyEmail,
  // routes.forgotPassword,
  // routes.resetPassword,
  // routes.createPassword,
];

const isAvailableAnonymously = (pathname) => {
  for (var i = 0; i < anonymousRoutes.length; i++) {
    var route = anonymousRoutes[i];
    if (pathToRegexp(route, []).exec(pathname)) {
      return true;
    }
  };

  return false;
}

export default store => next => (action) => {
  const result = next(action);

  const state = store.getState();

  // Ensure user is directed to login page or logged-in area as appropriate
  if (action.type === routerTypes.LOCATION_CHANGE) {
    const pathname = action.payload.location.pathname;
    const isLoggedIn = user.isLoggedIn();

    // If user is logged in, but user details are not in the state, load them.
    if (isLoggedIn && !state.currentUser.userIsLoaded && !state.currentUser.userIsLoading) {
      store.dispatch(currentUserActions.fetch());
    }

    // If user is not logged in and we're not on a page available when logged out, redirect to the login page.
    if (!isLoggedIn && !isAvailableAnonymously(pathname)) {
      return store.dispatch(replace(routes.login));
    }
    
    // If user is logged in, but we're on the login page, redirect to the dashboard.
    if (isLoggedIn && pathToRegexp(routes.login, []).exec(pathname)) {
      return store.dispatch(replace(routes.dashboard));
    }
  }

  // Store authentication token
  if (action.type === authenticationTypes.SET_TOKEN) {
    const { token } = action.payload;

    localStorage.setItem(storage.token, token);
  }

  // Remove stored authentication token
  if (action.type === currentUserTypes.USER_UNSET) {
    localStorage.removeItem(storage.token);
  }

  return result;
};
