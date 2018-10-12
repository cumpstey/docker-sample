import { push } from 'connected-react-router';
import config from '../../configuration';
import { FORM_ID, default as formDefinition } from '../../configuration/forms/register';
import * as api from '../../api';
import { reduceServerFormFields } from '../../helpers/form';
import * as appActions from '../app';
import * as errorActions from '../error';
import * as formActions from './';

export const submit = () => (dispatch, getState) => {
  const state = getState();
  const data = reduceServerFormFields(formDefinition.fields, state[FORM_ID].fields);

  const requestFinished = api.register(data)
    .then((response) => {
      // Display confirmation message
      dispatch(appActions.showMessage(response.data.message));

      // Redirect to login
      dispatch(push(config.routes.login));
    })
    .catch(error => dispatch(errorActions.handleFormError(FORM_ID, error)));

  dispatch(formActions.submitStart(FORM_ID));

  return requestFinished.then(() => dispatch(formActions.submitEnd(FORM_ID)));
};
