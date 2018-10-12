import { push } from 'connected-react-router';
import config from '../../configuration';
import { FORM_ID, default as formDefinition } from '../../configuration/forms/loginTwoFactor';
import * as api from '../../api';
import { reduceServerFormFields } from '../../helpers/form';
import * as errorActions from '../error';
import * as formActions from '.';
import * as authenticationActions from '../authentication';

export const submit = () => (dispatch, getState) => {
  const state = getState();
  const data = reduceServerFormFields(formDefinition.fields, state[FORM_ID].fields);

  const requestFinished = api.loginTwoFactor(data)
    .then((response) => {
      // Store authentication token
      dispatch(authenticationActions.setToken(response.data.token));

      // Redirect to dashboard
      dispatch(push(config.routes.dashboard));
    })
    .catch(error => dispatch(errorActions.handleFormError(FORM_ID, error)));

  dispatch(formActions.submitStart(FORM_ID));

  return requestFinished.then(() => dispatch(formActions.submitEnd(FORM_ID)));
};
