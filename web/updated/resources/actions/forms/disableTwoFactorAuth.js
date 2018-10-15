import { FORM_ID } from '../../configuration/forms/disableTwoFactorAuth';
import * as api from '../../api';
import * as errorActions from '../error';
import * as formActions from './';
import * as twoFactorAuthActions from '../currentUser/twoFactorAuth';

export const submit = () => (dispatch) => {
  const requestFinished = api.disableTwoFactorAuth()
    .then(() => {
      dispatch(twoFactorAuthActions.fetch());
    })
    .catch(error => dispatch(errorActions.handleFormError(FORM_ID, error)));

  dispatch(formActions.submitStart(FORM_ID));

  return requestFinished.then(() => dispatch(formActions.submitEnd(FORM_ID)));
};
