import * as types from '../../types/form';

export const submitStart = formId => ({
  type: types.SUBMIT_START,
  payload: { formId },
});

export const submitEnd = formId => ({
  type: types.SUBMIT_END,
  payload: { formId },
});

export const submitSuccess = (formId) => ({
  type: types.SUBMIT_SUCCESS,
  payload: { formId },
});

export const updateField = (formId, fieldId, value) => ({
  type: types.UPDATE_FIELD,
  payload: { formId, fieldId, value },
});

export const updateFieldOptions = (formId, fieldId, options) => ({
  type: types.UPDATE_FIELD_OPTIONS,
  payload: { formId, fieldId, options },
});

export const updateErrors = (formId, errors) => ({
  type: types.UPDATE_ERRORS,
  payload: { formId, errors },
});
