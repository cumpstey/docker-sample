import { push, replace } from 'react-router-redux';
import config from '../configuration';
import * as api from '../api';
import moment from 'moment';

import {
  mapRawUserData,
  mapRawRolesData,
} from '../helpers/user';
import { reduceServerFormFields } from '../helpers/form';
// import { mapRawPaginationData } from '../helpers';

// Errors

export const handleError = (error, formId) => ({
  type: 'HANDLE_ERROR',
  error,
  formId,
});

// Application

export const handleEscapeKey = () => ({
  type: 'HANDLE_ESCAPE_KEY',
});

export const openMobileNav = () => ({
  type: 'OPEN_MOBILE_NAV',
});

export const closeMobileNav = () => ({
  type: 'CLOSE_MOBILE_NAV',
});

// Dropdown menu

export const openDropdownMenu = dropdownMenuId => ({
  type: 'OPEN_DROPDOWN_MENU',
  dropdownMenuId,
});

export const closeDropdownMenu = () => ({
  type: 'CLOSE_DROPDOWN_MENU',
});

// Modal

export const showModal = modalId => ({
  type: 'SHOW_MODAL',
  modalId,
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});

// Table

export const setTableSort = (sortBy, orderBy) => ({
  type: 'SET_TABLE_SORT',
  sortBy,
  orderBy,
});

export const setTableParams = params => ({
  type: 'SET_TABLE_PARAMS',
  params,
});

// Authentication

export const setAuthenticationToken = token => ({
  type: 'SET_AUTHENTICATION_TOKEN',
  token,
});

export const unsetCurrentUser = () => ({
  type: 'UNSET_CURRENT_USER',
});

// Page loading

export const loadPage = () => (dispatch) => {
  dispatch({ type: 'LOAD_PAGE' });
};

// // // Values

// // export const fetchValuesDataStart = () => ({
// //   type: 'FETCH_VALUES_DATA_START',
// // });

// // export const fetchValuesDataEnd = () => ({
// //   type: 'FETCH_VALUES_DATA_END',
// // });

// // export const setValuesData = (data, message) => ({
// //   type: 'SET_VALUES_DATA',
// //   data,
// //   message,
// // });

// // export const fetchValuesData = (params) => (dispatch) => {
// //   const requestsFinished = api.getValues(params)
// //     .then((response) => {
// //       dispatch(setValuesData(mapRawValuesData(response.data.data), response.data.message));
// //       dispatch(setPaginationData(mapRawPaginationData(response.data.meta.pagination)));
// //     })
// //     .catch(error => dispatch(handleError(error)));

// //   dispatch(fetchValuesDataStart());

// //   requestsFinished.then(() => dispatch(fetchValuesDataEnd()));
// // };

// Forms

export const formUpdateServerError = (formId, serverMessage) => ({
  type: 'FORM_UPDATE_SERVER_ERROR',
  formId,
  serverMessage,
});

export const formSubmitStart = formId => ({
  type: 'FORM_SUBMIT_START',
  formId,
});

export const formSubmitEnd = formId => ({
  type: 'FORM_SUBMIT_END',
  formId,
});

export const formSubmitSuccess = (formId, serverMessage) => ({
  type: 'FORM_SUBMIT_SUCCESS',
  formId,
  serverMessage,
});

export const formUpdateField = (id, formId, value) => ({
  type: 'FORM_UPDATE_FIELD',
  id,
  formId,
  value,
});

export const formUpdateFieldOptions = (id, formId, options) => ({
  type: 'FORM_UPDATE_FIELD_OPTIONS',
  id,
  formId,
  options,
});

export const formUpdateErrors = (errors, formId) => ({
  type: 'FORM_UPDATE_ERRORS',
  errors,
  formId,
});

// User

export const setCurrentUser = (user, roles) => ({
  type: 'SET_CURRENT_USER',
  user,
  roles,
});

export const fetchCurrentUserStart = () => ({
  type: 'FETCH_CURRENT_USER_START',
});

export const fetchCurrentUserEnd = () => ({
  type: 'FETCH_CURRENT_USER_END',
});

export const fetchCurrentUser = () => (dispatch) => {
  const requestFinished = api.getMe()
    .then((response) => {
      dispatch(setCurrentUser(mapRawUserData(response.data), mapRawRolesData(response.data)));
    })
    .catch(error => dispatch(handleError(error)));

  dispatch(fetchCurrentUserStart());

  return requestFinished.then(() => dispatch(fetchCurrentUserEnd()));
};

// Login form

export const submitLoginForm = () => (dispatch, getState) => {
  const formId = 'loginForm';
  const state = getState();
  const data = reduceServerFormFields(state[formId].fields);

  const requestFinished = api.submitLogin(data)
    .then((response) => {
      dispatch(setAuthenticationToken(response.data.token));
      console.log('pushing');
      console.log(push(config.routes.dashboard));
      dispatch(push(config.routes.dashboard));
      console.log('pushed');
    })
    .catch(error => dispatch(handleError(error, formId)));

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

// account settings form

export const submitAccountSettingsForm = () => (dispatch, getState) => {
  const formId = 'accountSettingsForm';
  const state = getState();
  const data = reduceServerFormFields(state[formId].fields);

  const requestFinished = api.updateMe(data)
    .then((response) => {
      dispatch(formSubmitSuccess(formId, response.data.message));
      dispatch(fetchUserData());
    })
    .catch(error => dispatch(handleError(error, formId)));

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

// account password form

export const submitAccountPasswordForm = () => (dispatch, getState) => {
  const formId = 'accountPasswordForm';
  const state = getState();
  const data = reduceServerFormFields(state[formId].fields);

  const requestFinished = api.updateMyPassword(data)
    .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
    .catch(error => dispatch(handleError(error, formId)));

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

// create password form

export const submitCreatePasswordForm = token => (dispatch, getState) => {
  const formId = 'createPasswordForm';
  const state = getState();
  const data = reduceServerFormFields(state[formId].fields);

  const requestFinished = api.createPassword(data, token)
    .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
    .catch(error => dispatch(handleError(error, formId)));

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

// forgot password form

export const submitForgotPasswordForm = () => (dispatch, getState) => {
  const formId = 'forgotPasswordForm';
  const state = getState();
  const data = reduceServerFormFields(state[formId].fields);

  const requestFinished = api.submitForgotPassword(data)
    .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
    .catch(error => dispatch(handleError(error, formId)));

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

// reset password form

export const submitResetPasswordForm = token => (dispatch, getState) => {
  const formId = 'resetPasswordForm';
  const state = getState();
  const fieldData = reduceServerFormFields(state[formId].fields);
  const data = { ...fieldData, token };

  const requestFinished = api.submitResetPassword(data)
    .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
    .catch(error => dispatch(handleError(error, formId)));

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

export const submitValidatePasswordToken = token => (dispatch) => {
  const formId = 'errorForm';

  const requestFinished = api.validatePasswordToken(token)
    .catch((error) => {
      dispatch(replace(config.routes.error));
      dispatch(handleError(error, formId));
    });

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};

export const submitValidatePasswordResetToken = token => (dispatch) => {
  const formId = 'errorForm';

  const requestFinished = api.validatePasswordResetToken(token)
    .catch((error) => {
      dispatch(replace(config.routes.error));
      dispatch(handleError(error, formId));
    });

  dispatch(formSubmitStart(formId));

  return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
};
