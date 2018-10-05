const formFieldsReducer = (state, action) => {
  switch (action.type) {

    case 'FORM_UPDATE_FIELD': {
      const { id, value } = action;

      return { ...state, [id]: { ...state[id], value } };
    }

    case 'FORM_UPDATE_FIELD_OPTIONS': {
      const { id, options } = action;

      return { ...state, [id]: { ...state[id], options } };
    }

    default:
      return state;
  }
};

const formErrorsReducer = (state, action) => {
  switch (action.type) {

    case 'FORM_UPDATE_ERRORS': {
      return action.errors;
    }

    case 'CLOSE_MODAL':
    case 'FORM_UPDATE_FIELD':
    case '@@router/LOCATION_CHANGE': {
      return {};
    }

    default:
      return state;
  }
};

const formSubmitReducer = (state, action) => {
  switch (action.type) {

    case 'FORM_SUBMIT_START': {
      return true;
    }

    case 'FORM_SUBMIT_END': {
      return false;
    }

    default:
      return state;
  }
};

const formServerMessageReducer = (state, action) => {
  switch (action.type) {

    case 'FORM_SUBMIT_START': {
      return null;
    }


    case 'FORM_UPDATE_SERVER_ERROR':
    case 'FORM_SUBMIT_SUCCESS': {
      return action.serverMessage;
    }

    default:
      return state;
  }
};

export default (state, action) => {
  switch (action.type) {

    case 'FORM_SUBMIT_START': {
      const isLoading = formSubmitReducer(state.isLoading, action);
      const serverMessage = formServerMessageReducer(state.serverMessage, action);
      const serverMessageType = '';

      return { ...state, serverMessage, serverMessageType, isLoading };
    }

    case 'FORM_SUBMIT_END': {
      const isLoading = formSubmitReducer(state.isLoading, action);

      return { ...state, isLoading };
    }

    case 'FORM_UPDATE_SERVER_ERROR': {
      const serverMessage = formServerMessageReducer(state.serverMessage, action);
      const serverMessageType = 'error';

      return { ...state, serverMessage, serverMessageType };
    }

    case 'FORM_SUBMIT_SUCCESS': {
      const serverMessage = formServerMessageReducer(state.serverMessage, action);
      const serverMessageType = 'success';

      return { ...state, serverMessage, serverMessageType };
    }

    case 'FORM_UPDATE_FIELD':
    case 'FORM_UPDATE_FIELD_OPTIONS': {
      const fields = formFieldsReducer(state.fields, action);
      const errors = formErrorsReducer(state.errors, action);

      return { ...state, fields, errors };
    }

    case 'FORM_UPDATE_ERRORS': {
      const errors = formErrorsReducer(state.errors, action);

      return { ...state, errors };
    }

    default:
      return state;
  }
};
