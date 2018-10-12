import form from './form';
import { FORM_ID } from '../../configuration/forms/loginTwoFactor';
import * as routerTypes from '../../types/router';

const initialState = {
  isLoading: false,
  errors: {},
  fields: {
    code: {
      value: '',
    },
  },
};

export default (state = initialState, action) => {
  
  // If this is a relevant form action, pass it to the generic form reducer
  if (action.payload && action.payload.formId === FORM_ID) {
    return form(state, action);
  }

  // Clear form when loading new page
  if (action.type === routerTypes.LOCATION_CHANGE) {
    return initialState;
  }

  return state;
};
