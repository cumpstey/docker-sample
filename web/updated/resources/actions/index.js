import { push, replace } from 'connected-react-router';
import config from '../configuration';
import * as api from '../api';
import * as layoutTypes from '../types/ui';
import { reduceServerFormFields } from '../helpers/form';
// import { mapRawPaginationData } from '../helpers';

// // // Table

// // export const setTableSort = (sortBy, orderBy) => ({
// //   type: 'SET_TABLE_SORT',
// //   sortBy,
// //   orderBy,
// // });

// // export const setTableParams = params => ({
// //   type: 'SET_TABLE_PARAMS',
// //   params,
// // });



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





// // // account settings form

// // export const submitAccountSettingsForm = () => (dispatch, getState) => {
// //   const formId = 'accountSettingsForm';
// //   const state = getState();
// //   const data = reduceServerFormFields(state[formId].fields);

// //   const requestFinished = api.updateMe(data)
// //     .then((response) => {
// //       dispatch(formSubmitSuccess(formId, response.data.message));
// //       dispatch(fetchUserData());
// //     })
// //     .catch(error => dispatch(handleError(error, formId)));

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };

// // // account password form

// // export const submitAccountPasswordForm = () => (dispatch, getState) => {
// //   const formId = 'accountPasswordForm';
// //   const state = getState();
// //   const data = reduceServerFormFields(state[formId].fields);

// //   const requestFinished = api.updateMyPassword(data)
// //     .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
// //     .catch(error => dispatch(handleError(error, formId)));

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };

// // // create password form

// // export const submitCreatePasswordForm = token => (dispatch, getState) => {
// //   const formId = 'createPasswordForm';
// //   const state = getState();
// //   const data = reduceServerFormFields(state[formId].fields);

// //   const requestFinished = api.createPassword(data, token)
// //     .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
// //     .catch(error => dispatch(handleError(error, formId)));

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };

// // // forgot password form

// // export const submitForgotPasswordForm = () => (dispatch, getState) => {
// //   const formId = 'forgotPasswordForm';
// //   const state = getState();
// //   const data = reduceServerFormFields(state[formId].fields);

// //   const requestFinished = api.submitForgotPassword(data)
// //     .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
// //     .catch(error => dispatch(handleError(error, formId)));

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };

// // // reset password form

// // export const submitResetPasswordForm = token => (dispatch, getState) => {
// //   const formId = 'resetPasswordForm';
// //   const state = getState();
// //   const fieldData = reduceServerFormFields(state[formId].fields);
// //   const data = { ...fieldData, token };

// //   const requestFinished = api.submitResetPassword(data)
// //     .then(response => dispatch(formSubmitSuccess(formId, response.data.message)))
// //     .catch(error => dispatch(handleError(error, formId)));

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };

// // export const submitValidatePasswordToken = token => (dispatch) => {
// //   const formId = 'errorForm';

// //   const requestFinished = api.validatePasswordToken(token)
// //     .catch((error) => {
// //       dispatch(replace(config.routes.error));
// //       dispatch(handleError(error, formId));
// //     });

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };

// // export const submitValidatePasswordResetToken = token => (dispatch) => {
// //   const formId = 'errorForm';

// //   const requestFinished = api.validatePasswordResetToken(token)
// //     .catch((error) => {
// //       dispatch(replace(config.routes.error));
// //       dispatch(handleError(error, formId));
// //     });

// //   dispatch(formSubmitStart(formId));

// //   return requestFinished.then(() => dispatch(formSubmitEnd(formId)));
// // };
