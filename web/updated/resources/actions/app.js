import * as types from '../types/app';

// General message

export const showMessage = (message) => ({
  type: types.MESSAGE_SHOW,
  payload: { message },
});

export const hideMessage = (id) => ({
  type: types.MESSAGE_HIDE,
  payload: { id },
});
