import * as types from '../types/error';

export const handleError = (formId, error) => ({
  type: types.HANDLE_ERROR,
  payload: { formId, error },
});

