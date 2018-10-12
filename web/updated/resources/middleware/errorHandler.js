import { replace } from 'connected-react-router';
import config from '../configuration';
import { FORM_ID as LOGIN_FORM_ID } from '../configuration/forms/login';
import * as appActions from '../actions/app';
import * as currentUserActions from '../actions/currentUser/user';
import * as formActions from '../actions/forms';
import * as types from '../types/error';

const isString = (value) => {
  return Object.prototype.toString.call(value) === "[object String]";
}

// Extract the messages from errors being delivered in different formats
const reduceErrors = (data) => {
  const errors = data.errors || data;

  const list = Object.keys(errors).map(key => {
    var error = errors[key];
    var e = error.map(i => isString(i) ? i : i.description)
    return ({ [key]: e }); 
  });

  return list.reduce((prev, next) => ({ ...prev, ...next }), {});
};

// TODO!
export default store => next => (action) => {
  var result = next(action);

  if (action.type === types.HANDLE_ERROR && action.payload && action.payload.error) {
    console.log('An error has occurred:', action.payload.error);

    const { formId } = action.payload;
    
    if (!action.payload.error.response) {
      // If there is no response in the error, it's because the api is not reachable.
      // TODO: This is actually possible from a JS exception too. Need to distinguish somehow
      store.dispatch(appActions.showMessage("Network error", "error"));
    } else {
      const { status, data } = action.payload.error.response;
      
      if (status === 400 && data.errors[''].some(i => i.code === "UserNotFound")) {
        // This is returned if there's a valid user in the token, but that user no longer exists
        store.dispatch(currentUserActions.unset());
        return store.dispatch(replace(config.routes.login));
      } else if (status === 401 && formId !== LOGIN_FORM_ID) {
        // If any non-login request comes back as unauthorised, return to login page
        store.dispatch(currentUserActions.unset());
        return store.dispatch(replace(config.routes.login));
      } else if (formId) {
        // If any other form request commes back with an error response, update state with errors
        const errors = reduceErrors(data);
        store.dispatch(formActions.updateErrors(formId, errors));
      } else {

      }

      // if (action.error.response && action.error.response.status === 422) {
      //   store.dispatch(actions.formUpdateErrors(action.error.response.data, action.formId));
      // } else if (action.error.response && action.error.response.status === 400) {
      //   store.dispatch(actions.formUpdateServerError(action.formId, action.error.response.data.error));
      // } else if (action.error.response && action.error.response.status === 403) {
      //   store.dispatch(actions.formUpdateServerError(action.formId, action.error.response.data.error));
      // } else if (action.error.response && action.error.response.status === 429) {
      //   store.dispatch(actions.formUpdateServerError(action.formId, action.error.response.data.error));
      // } else if (action.error.response && action.error.response.status === 401) {
      //   store.dispatch(actions.unsetCurrentUser());
      //   return store.dispatch(replace(config.routes.login));
      // } else {
      //   throw action.error;
      // }
    }
  }

  return result;
  // return next(action);
};
