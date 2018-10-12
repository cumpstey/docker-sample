import * as types from '../types/error';

export const handleError = (error) => ({
  type: types.HANDLE_ERROR,
  payload: { error },
});

export const handleFormError = (formId, error) => ({
  type: types.HANDLE_ERROR,
  payload: { formId, error },
});
