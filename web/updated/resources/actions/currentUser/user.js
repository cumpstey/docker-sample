import * as api from '../../api';
import * as types from '../../types/currentUser';
import {
  mapRawUserData,
  mapRawRolesData,
} from '../../helpers/user';
import * as errorActions from '../error';

export const set = (user, roles) => ({
  type: types.USER_SET,
  payload: { user, roles }
});

export const unset = () => ({
  type: types.USER_UNSET,
});

export const startFetch = () => ({
  type: types.USER_FETCHING,
});

export const endFetch = () => ({
  type: types.USER_FETCHED,
});

export const fetch = () => (dispatch) => {
  const requestFinished = api.getMe()
    .then((response) => {
      dispatch(set(mapRawUserData(response.data), mapRawRolesData(response.data)));
    })
    .catch(error => dispatch(errorActions.handleError(error)));

  dispatch(startFetch());

  return requestFinished.then(() => dispatch(endFetch()));
};
