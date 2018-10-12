import * as api from '../../api';
import * as types from '../../types/currentUser';
import { mapRawTwoFactorAuthData } from '../../helpers/user';
import * as errorActions from '../error';

export const set = twoFactorAuth => ({
  type: types.TWOFACTORAUTH_SET,
  payload: { twoFactorAuth }
});

export const startFetch = () => ({
  type: types.TWOFACTORAUTH_FETCHING,
});

export const endFetch = () => ({
  type: types.TWOFACTORAUTH_FETCHED,
});

export const fetch = () => (dispatch) => {
  const requestFinished = api.getTwoFactorAuthStatus()
    .then((response) => {
      dispatch(set(mapRawTwoFactorAuthData(response.data)));
    })
    .catch(error => dispatch(errorActions.handleError(error)));

  dispatch(startFetch());

  return requestFinished.then(() => dispatch(endFetch()));
};
