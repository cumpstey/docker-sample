import * as formTypes from '../../types/form'
import * as uiTypes from '../../types/ui'
import * as routerTypes from '../../types/router'

const formFieldsReducer = (state, action) => {
  switch (action.type) {

    case formTypes.UPDATE_FIELD: {
      const { fieldId, value } = action.payload;

      return { ...state, [fieldId]: { ...state[fieldId], value } };
    }

    case formTypes.UPDATE_FIELD_OPTIONS: {
      const { fieldId, options } = action.payload;

      return { ...state, [fieldId]: { ...state[fieldId], options } };
    }

    default:
      return state;
  }
};

const formErrorsReducer = (state, action) => {
  switch (action.type) {

    case formTypes.UPDATE_ERRORS: {
      return action.payload.errors;
    }

    case uiTypes.MODAL_CLOSE:
    case formTypes.UPDATE_FIELD:
    case routerTypes.LOCATION_CHANGE: {
      return {};
    }

    default:
      return state;
  }
};

const formSubmitReducer = (state, action) => {
  switch (action.type) {

    case formTypes.SUBMIT_START: {
      return true;
    }

    case formTypes.SUBMIT_END: {
      return false;
    }

    default:
      return state;
  }
};

export default (state, action) => {
  switch (action.type) {

    case formTypes.SUBMIT_START: {
      const isLoading = formSubmitReducer(state.isLoading, action);

      return { ...state, isLoading };
    }

    case formTypes.SUBMIT_END: {
      const isLoading = formSubmitReducer(state.isLoading, action);

      return { ...state, isLoading };
    }

    case formTypes.UPDATE_FIELD:
    case formTypes.UPDATE_FIELD_OPTIONS: {
      const fields = formFieldsReducer(state.fields, action);
      const errors = formErrorsReducer(state.errors, action);

      return { ...state, fields, errors };
    }

    case formTypes.UPDATE_ERRORS: {
      const errors = formErrorsReducer(state.errors, action);

      return { ...state, errors };
    }

    default:
      return state;
  }
};
