import form from './form';
import { FORM_ID } from '../../configuration/forms/enableTwoFactorAuth';
import * as routerTypes from '../../types/router';
import * as types from '../../types/enableTwoFactorAuth';
import * as uiTypes from '../../types/ui';

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
  },
  success: false,
  recoveryCodes: [],
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

    case types.SUCCESS: {
      const { recoveryCodes } = action.payload;
      const success = true;

      return { ...state, success, recoveryCodes };
    }
    
    // TODO: This should probably be a specific CLEAR event, fired when this modal is closed
    case uiTypes.MODAL_CLOSE: {
      return { ...state, ...initialState };
    }
  }

  return state;
};
