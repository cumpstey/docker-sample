import form from './form';
import { FORM_ID } from '../../configuration/forms/disableTwoFactorAuth';
import * as routerTypes from '../../types/router';

const initialState = {
  isLoading: false,
  errors: {},
  fields: {},
};

export default (state = initialState, action) => {
  
  // If this is a relevant form action, pass it to the generic form reducer
  if (action.payload && action.payload.formId === FORM_ID) {
    return form(state, action);
  }

  switch (action.type) {
    // Clear form when loading new page
    case routerTypes.LOCATION_CHANGE: {
      return initialState;
    }
  }

  return state;
};
