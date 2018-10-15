import * as types from '../types/app';

// General message

export const showMessage = (text, type) => ({
  type: types.MESSAGE_SHOW,
  payload: { text, type },
});

export const hideMessage = id => ({
  type: types.MESSAGE_HIDE,
  payload: { id },
});

// Role

export const setRole = role => ({
  type: types.ROLE_SET,
  payload: { role },
});
