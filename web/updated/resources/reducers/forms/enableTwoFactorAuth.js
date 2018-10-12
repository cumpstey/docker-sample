import form from './form';
import { FORM_ID } from '../../configuration/forms/enableTwoFactorAuth';
import * as routerTypes from '../../types/router';
import * as types from '../../types/enableTwoFactorAuth';

const initialState = {
  isLoading: false,
  setupIsLoading: false,
  setupIsLoaded: false,
  errors: {},
  fields: {
    code: {
      value: '',
    },
  },
  setup: {
    sharedKey: '',
    authenticatorUrl: '',
  }
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

    case types.SETUP_SET: {
      const { setup } = action.payload;
      const setupIsLoaded = true;

      return { ...state, setup, setupIsLoaded };
    }

    case types.SETUP_FETCHING: {
      const setupIsLoading = true;
      const setupIsLoaded = false;

      return { ...state, setupIsLoading, setupIsLoaded };
    }

    case types.SETUP_FETCHED: {
      const setupIsLoading = false;

      return { ...state, setupIsLoading };
    }
  }

  return state;
};
