import { replace } from 'react-router-redux';
import pathToRegexp from 'path-to-regexp';
import * as actions from '../actions';
import config from '../configuration';
import { storage } from '../constants';
import * as user from '../helpers/user';

const anonymousRoutes = [
  config.routes.login,
  config.routes.error,
  config.routes.forgotPassword,
  config.routes.resetPassword,
  config.routes.createPassword,
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
  const state = store.getState();

  if (action.type === '@@router/LOCATION_CHANGE') {
    const pathname = action.payload.pathname;
    const isLoggedIn = user.isLoggedIn();

    // If user is logged in, but user details are not in the state, load them.
    if (isLoggedIn && !state.currentUser.isLoaded && !state.currentUser.isLoading) {
      store.dispatch(actions.fetchCurrentUser());
    }

    // If user is not logged in and we're not on a page available when logged out, redirect to the login page.
    if (!isLoggedIn && !isAvailableAnonymously(pathname)) {
      return store.dispatch(replace(config.routes.login));
    }
    
    // If user is logged in, but we're on the login page, redirect to the dashboard.
    if (isLoggedIn && pathToRegexp(config.routes.login, []).exec(pathname)) {
      return store.dispatch(replace(config.routes.dashboard));
    }
  }

  if (action.type === 'SET_AUTHENTICATION_TOKEN') {
    localStorage.setItem(storage.token, action.token);
  }

  if (action.type === 'UNSET_CURRENT_USER') {
    localStorage.removeItem(storage.token);
  }

  return next(action);
};
