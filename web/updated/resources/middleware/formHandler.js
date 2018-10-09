import { push } from 'connected-react-router';
import * as actions from '../actions';
import config from '../configuration';

// TODO!
export default store => next => (action) => {
  var result = next(action);

  // if (action.type === 'FORM_SUBMIT_SUCCESS' && action.formId === 'createPasswordForm') {
  //   return store.dispatch(push(config.routes.login));
  // }

  // if (action.type === 'FORM_SUBMIT_SUCCESS' && action.formId === 'resetPasswordForm') {
  //   return store.dispatch(push(config.routes.login));
  // }

  // if (action.type === 'FORM_SUBMIT_SUCCESS' && action.formId === 'modalUpdateUserForm') {
  //   store.dispatch(actions.closeModal());
  //   store.dispatch(actions.fetchUsersData());
  // }

  // if (action.type === 'FORM_SUBMIT_SUCCESS' && action.formId === 'modalCreateUserForm') {
  //   store.dispatch(actions.closeModal());
  //   store.dispatch(actions.fetchUsersData());
  // }

  return result;
};
