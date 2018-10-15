import * as api from '../api';
import * as authenticationActions from './authentication';
import * as errorActions from './error';
import * as types from '../types/impersonateRole';

// Role

export const startFetch = () => ({
  type: types.FETCHING,
});

export const endFetch = () => ({
  type: types.FETCHED,
});

export const fetch = role => (dispatch) => {
  const requestFinished = api.impersonateRole(role)
    .then((response) => {
      dispatch(authenticationActions.setToken(response.data.token));
    })
    .catch(error => dispatch(errorActions.handleError(error)));

  dispatch(startFetch());

  return requestFinished.then(() => dispatch(endFetch()));
};
