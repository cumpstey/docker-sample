import * as api from '../api';
import * as types from '../types/users';
import { mapRawUsersData } from '../helpers/user';
import { mapRawMetaData } from '../helpers/data';
import * as errorActions from './error';

export const set = (data, meta) => ({
  type: types.SET,
  payload: { data, meta }
});

export const startFetch = () => ({
  type: types.FETCHING,
});

export const endFetch = () => ({
  type: types.FETCHED,
});

export const fetch = (query) => (dispatch) => {
  const requestFinished = api.getUsers(query)
    .then((response) => {
      dispatch(set(mapRawUsersData(response.data.users), mapRawMetaData(response.data.meta)));
    })
    .catch(error => dispatch(errorActions.handleError(error)));

  dispatch(startFetch());

  return requestFinished.then(() => dispatch(endFetch()));
};
