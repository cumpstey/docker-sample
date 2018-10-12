import { push } from 'connected-react-router';
import config from '../../configuration';
import { FORM_ID } from '../../configuration/forms/verifyEmail';
import * as api from '../../api';
import * as appActions from '../app';
import * as errorActions from '../error';
import * as formActions from './';

export const submit = (userId, token) => (dispatch, getState) => {
  //const state = getState();
  console.log('Checking email verification token', userId, token);

  const requestFinished = api.verifyEmail({ userId, token })
    .then((response) => {
      // Give the user a friendly message
      dispatch(appActions.showMessage(response.data.message));

      // Redirect to login
      dispatch(push(config.routes.login));
    })
    .catch(error => dispatch(errorActions.handleFormError(FORM_ID, error)));

  dispatch(formActions.submitStart(FORM_ID));

  return requestFinished.then(() => dispatch(formActions.submitEnd(FORM_ID)));
};
