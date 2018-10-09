import * as types from '../types/authentication';

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: { token },
});
