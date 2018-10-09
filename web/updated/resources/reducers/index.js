import { combineReducers } from 'redux';

import app from './app';
import currentUser from './currentUser';
import loginForm from './forms/login';
import registerForm from './forms/register';
// import modal from './modal';
import ui from './ui';

export default combineReducers({
  app,
  currentUser,
  loginForm,
  registerForm,
  // modal,
  ui,
});
