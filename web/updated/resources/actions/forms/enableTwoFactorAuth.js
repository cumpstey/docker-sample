import { push } from 'connected-react-router';
import config from '../../configuration';
import { FORM_ID, default as formDefinition } from '../../configuration/forms/enableTwoFactorAuth';
import * as api from '../../api';
import { reduceServerFormFields } from '../../helpers/form';
import { mapRawTwoFactorAuthSetupData } from '../../helpers/form';
import * as errorActions from '../error';
import * as formActions from './';
import * as uiActions from '../ui';
import * as types from '../../types/enableTwoFactorAuth';

export const set = (setup) => ({
  type: types.SETUP_SET,
  payload: { setup }
});

export const startFetch = () => ({
  type: types.SETUP_FETCHING,
});

export const endFetch = () => ({
  type: types.SETUP_FETCHED,
});

export const fetch = () => (dispatch) => {
  const requestFinished = api.getTwoFactorAuthSetup()
    .then((response) => {
      dispatch(set(mapRawTwoFactorAuthSetupData(response.data)));
    })
    .catch(error => dispatch(errorActions.handleError(error)));

  dispatch(startFetch());

  return requestFinished.then(() => dispatch(endFetch()));
};

export const submit = () => (dispatch, getState) => {
  const state = getState();
  const data = reduceServerFormFields(formDefinition.fields, state[FORM_ID].fields);

  const requestFinished = api.enableTwoFactorAuth(data)
    .then((response) => {
      dispatch(uiActions.closeModal);
    })
    .catch(error => dispatch(errorActions.handleFormError(FORM_ID, error)));

  dispatch(formActions.submitStart(FORM_ID));

  return requestFinished.then(() => dispatch(formActions.submitEnd(FORM_ID)));
};
