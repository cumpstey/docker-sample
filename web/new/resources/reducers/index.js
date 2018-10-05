import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from './app';
import currentUser from './currentUser';
import loginForm from './forms/loginForm';
import modal from './forms/loginForm';

export default combineReducers({
  routing,
  app,
  currentUser,
  loginForm,
  modal,
});
