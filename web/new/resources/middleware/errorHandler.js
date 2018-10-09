import { replace } from 'react-router-redux';
import * as actions from '../actions';
import config from '../configuration';

export default store => next => (action) => {
  if (action.type === 'HANDLE_ERROR') {
    console.log('An error has occurred:', action.error);

    if (action.error.response && action.error.response.status === 422) {
      store.dispatch(actions.formUpdateErrors(action.error.response.data, action.formId));
    } else if (action.error.response && action.error.response.status === 400) {
      store.dispatch(actions.formUpdateServerError(action.formId, action.error.response.data.error));
    } else if (action.error.response && action.error.response.status === 403) {
      store.dispatch(actions.formUpdateServerError(action.formId, action.error.response.data.error));
    } else if (action.error.response && action.error.response.status === 429) {
      store.dispatch(actions.formUpdateServerError(action.formId, action.error.response.data.error));
    } else if (action.error.response && action.error.response.status === 401) {
      store.dispatch(actions.unsetCurrentUser());
      return store.dispatch(replace(config.routes.login));
    } else {
      throw action.error;
    }
  }

  return next(action);
};
