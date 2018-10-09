import * as api from '../api';
import * as types from '../types/currentUser';
import {
  mapRawUserData,
  mapRawRolesData,
} from '../helpers/user';

export const set = (user, roles) => ({
  type: types.SET,
  payload: { user, roles }
});

export const unset = () => ({
  type: types.UNSET,
});

export const startFetch = () => ({
  type: types.FETCHING,
});

export const endFetch = () => ({
  type: types.FETCHED,
});

export const fetch = () => (dispatch) => {
  const requestFinished = api.getMe()
    .then((response) => {
      dispatch(set(mapRawUserData(response.data), mapRawRolesData(response.data)));
    })
    .catch(error => dispatch(handleError(error)));

  dispatch(startFetch());

  return requestFinished.then(() => dispatch(endFetch()));
};
